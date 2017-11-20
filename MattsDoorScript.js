//=========== name spacing ==========
state.DoorControls = state.DoorControls || {};
var statusDoors = {};
//=========== user customization ==========
statusDoors.interactRange = 2; //max range in map units
statusDoors.detectionRange = 2; //max range in map units
statusDoors.DoorPathColor = "#FFFF00";
statusDoors.attribFindHidden = "Perc";
statusDoors.attribOpenLocks = "TT";
statusDoors.attribFindTraps = "FT";
statusDoors.attribRemoveTraps = "TT";
statusDoors.hFlipOnOpen = true;  // flip switch control horizontally when opened
statusDoors.vFlipOnOpen = true;  // flip switch control vetically when opened
// usePercentageChecks determines how checks against skills are rolled
// when true:  attribute score + door modifier >= d100 equals success
// when false:  d20 + attribute score >= door modifier equals success
statusDoors.usePercentageChecks = false;
statusDoors.detectHiddenDC = 10;
// =========== script constants - do not modify ==========
statusDoors.lockStatus = "bar1_value";
statusDoors.lockQualityAdj = "bar1_max";
statusDoors.isUnlocked = "0";
statusDoors.isLocked = "1";
statusDoors.trapStatus = "bar2_value";
statusDoors.trapQualityAdj = "bar2_max";
statusDoors.trapNone = "0";
statusDoors.trapActive = "1";
statusDoors.trapResets = "2";
statusDoors.trapTriggered = "3";
statusDoors.trapDisabled = "4";
statusDoors.sideDoorOpen = "bar3_value";
statusDoors.sideDoorClosed = "bar3_max";
statusDoors.doorType = "aura1_radius";
statusDoors.doorTypeVisible = "0";
statusDoors.doorTypeHidden = "1";
statusDoors.doorTypeRevealed = "2";
statusDoors.doorSideActive = "aura2_radius";
statusDoors.doorSideBoth = "0";
statusDoors.doorSideNorth = "1";
statusDoors.doorSideSouth = "2";
// Clean image source:  https://wiki.roll20.net/API:Cookbook#getCleanImgsrc
var getCleanImgsrc = function (imgsrc) {
   var parts = imgsrc.match(/(.*\/images\/.*)(thumb|med|original|max)([^\?]*)(\?[^?]+)?$/);
   if(parts) {
      return parts[1]+'thumb'+parts[3]+(parts[4]?parts[4]:`?${Math.round(Math.random()*9999999)}`);
   }
   return;
};
//=========== constructors ==========
//define a door object
function DungeonDoorControl() {
    "use strict";
    var thisSwitch,
        thisDoor,
        thisWall;
    this.Load = function (SwitchID) {
        try {
            thisSwitch = getObj("graphic", SwitchID);
            if (thisSwitch === undefined){
                throw "Error loading Switch from id: " + SwitchID;
            }
            thisDoor = getObj("graphic", state.DoorControls[SwitchID].DoorID);
            if (thisDoor === undefined){
                throw "Error loading Door from id: " + SwitchID;
            }
            thisWall = getObj("path", state.DoorControls[SwitchID].PathID);
            if (thisWall === undefined){
                throw "Error loading Wall from id: " + SwitchID;
            }
            return true;
        } catch (err) {
            log(err);
            return false;
        }
    };
    var SetMultiSide = function (side) {
        if(/^\s*[0-9]+\s*$/.test(`${side}`)){
            let imgurl =decodeURIComponent(thisDoor.get("sides").split(/\|/)[parseInt(side,10)]);
            let img=getCleanImgsrc(imgurl);
            if(img){
                thisDoor.set({
                    currentSide: side,
                    imgsrc: img,
                });
            } else {
                sendChat("Matt's Door Script",`/w gm Not a marketplace image: <code>${imgurl}</code>`);
            }
        } else {
            sendChat("Matt's Door Script",`/w gm Door side indexes need to be set in bar3 current (open) and max (closed).`); 
        }
    };
    this.Open = function (pc) {
        //do nothing if door already open
        if (!this.IsClosed()) return;
        //trigger trap if armed and not GM
        if (!pc.IsGM() && SameSide(pc) &&( thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapActive || thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapResets)) {
            var trapNotes = decodeURIComponent(thisSwitch.get("gmnotes")).replace(/PC/g, pc.CharacterSheet().get("name"));
            sendChat("","/desc TRAP!  " + trapNotes);
            //record the trap was found
            state.DoorControls[thisSwitch.get("_id")].TrapFound = true;
            //flag trap as triggered if not resetting
            if (thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapActive) thisSwitch.set(statusDoors.trapStatus, statusDoors.trapTriggered);
            return;
        }
        //do not open if locked and not GM
        if(!pc.IsGM() && SameSide(pc) && thisSwitch.get(statusDoors.lockStatus) === statusDoors.isLocked) {
            //sendChat("","/desc This door appears to be locked.");
            pc.Announce("cannot open the door because it is locked.");
            return;
        }
        //set the door controls for open state
        thisWall.set("layer","gmlayer");
        thisSwitch.set({
            fliph: statusDoors.hFlipOnOpen,
            flipv: statusDoors.vFlipOnOpen,
        });
        SetMultiSide(thisSwitch.get(statusDoors.sideDoorOpen));
        if (!pc.IsGM()) pc.Announce("opens the door.");
    };
    this.Close = function (pc) {
        //do nothing if door already closed
        if (this.IsClosed()) return;
        //set the door controls for closed state
        thisWall.set("layer", "walls");
        thisSwitch.set({
            fliph: false,
            flipv: false,
        });
        SetMultiSide(thisSwitch.get(statusDoors.sideDoorClosed));
        if (!pc.IsGM()) pc.Announce("closes the door.");
    };
    this.PickLock = function(pc) {
        //do nothing if door is open or is GM
        if (!this.IsClosed() || pc.IsGM()) return;
        //do nothing if door is not locked
        if (thisSwitch.get(statusDoors.lockStatus) !== statusDoors.isLocked || !SameSide(pc)) {
            pc.Whisper(null, "The door does not appear to be locked.");
            return;
        }
        //do nothing if character can't pick locks
        if(!pc.HasSkill(statusDoors.attribOpenLocks)) {
            pc.Announce("does not possess the skill to unlock this door.");
            return;
        }
        //check if character has attempted to unlock this lock before
        try {
            var prevAttempt = state.DoorControls[thisSwitch.get("_id")].UnlockAttempts[pc.CharacterSheet().get("_id")];
            if (prevAttempt === undefined) throw "character has not seen this lock before";
            //respond based on first attempt
            if (prevAttempt) {
                pc.Announce("is familiar with this lock, and quickly unlocks it again.");
                thisSwitch.set(statusDoors.lockStatus, statusDoors.isUnlocked);
            } else {
                pc.Announce("continues to fail at picking this lock");
            }
            return;
        } catch (err) { }
        //roll the dice
        var charSkill = pc.SkillLevel();
        var lockAdjust = (isNaN(thisSwitch.get(statusDoors.lockQualityAdj))) ? 0 : parseInt(thisSwitch.get(statusDoors.lockQualityAdj));
        if (statusDoors.usePercentageChecks) {
            var rollResult = randomInteger(100);
            var actionSuccess = (Math.min(charSkill + lockAdjust, 95) >= rollResult) ? true : false;
            sendChat("Doors", "/w GM PICK LOCK: " + charSkill + "% chance with " + lockAdjust + "% lock modifier versus a roll of " + rollResult + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        } else {
            var rollResult = randomInteger(20);
            var actionSuccess = (rollResult + charSkill >= lockAdjust) ? true : false;
            sendChat("Doors", "/w GM PICK LOCK: d20 roll of " + rollResult + " plus skill " + charSkill + " vs DC " + lockAdjust + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        }
        //record the results
        state.DoorControls[thisSwitch.get("_id")].UnlockAttempts[pc.CharacterSheet().get("_id")] = actionSuccess;
        //announce the results to the party
        if (actionSuccess) {
            pc.Announce("has successfully unlocked the door.");
            thisSwitch.set(statusDoors.lockStatus, statusDoors.isUnlocked);
        } else {
            pc.Announce("does not possess the skill to unlock this door.");
        }
    };
    this.FindTraps = function(pc) {
        //do nothing if GM
        if (pc.IsGM()) return;
        //do nothing if character can't find traps, there is no trap, or on the wrong side
        if (!pc.HasSkill(statusDoors.attribFindTraps) || thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapNone || !SameSide(pc)) {
            pc.Announce("is confident there are no active traps on this side of the door.");
            return;
        }
        //no need to check if trap has already been found
        if (state.DoorControls[thisSwitch.get("_id")].TrapFound === true) {
            pc.Announce("believes a trap has already been found.");
            return;
        }
        //check if this character as attempted to find traps before on this door
        try {
            var prevAttempt = state.DoorControls[thisSwitch.get("_id")].TrapFinding[pc.CharacterSheet().get("_id")];
            if (prevAttempt === undefined) throw "character has not seen this trap before"
            //respond based on previous search
            if (prevAttempt) {
                pc.Announce("is familiar with this trap, and quickly identifies it.");
            } else {
                pc.Announce("is confident there are no active traps on this side of the door.");
            }
            return;
        } catch (err) { }
        //roll the dice
        var charSkill = pc.SkillLevel();
        var trapAdjust = (isNaN(thisSwitch.get(statusDoors.trapQualityAdj))) ? 0 : parseInt(thisSwitch.get(statusDoors.trapQualityAdj));
        if (statusDoors.usePercentageChecks) {
            var rollResult = randomInteger(100);
            var actionSuccess = (Math.min(charSkill + trapAdjust, 95) >= rollResult) ? true : false;
            sendChat("Doors", "/w GM FIND TRAPS: " + charSkill + "% chance with " + trapAdjust + "% trap modifier versus a roll of " + rollResult + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        } else {
            var rollResult = randomInteger(20);
            var actionSuccess = (rollResult + charSkill >= trapAdjust) ? true : false;
            sendChat("Doors", "/w GM FIND TRAPS: d20 roll of " + rollResult + " plus skill " + charSkill + " vs DC " + trapAdjust + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        }
        //record the character's results
        state.DoorControls[thisSwitch.get("_id")].TrapFinding[pc.CharacterSheet().get("_id")] = actionSuccess;
        //announce the results to the party
        if (actionSuccess) {
            pc.Announce("believes there is a trap on this door.");
            state.DoorControls[thisSwitch.get("_id")].TrapFound = true;
        } else {
            pc.Announce("is confident there are no active traps on this side of the door.");
        }
    };
    this.RemoveTrap = function(pc) {
        //do nothing if GM
        if (pc.IsGM()) return;
        //verify trap has been found
        if (state.DoorControls[thisSwitch.get("_id")].TrapFound !== true) {
            pc.Whisper(null, "No one has found a trap to remove.");
            return;
        }
        if (!SameSide(pc)) {
            pc.Whisper(null, "I am on the wrong side of the door to disarm this trap.");
            return;
        }
        //do nothing if character can't remove traps
        if (!pc.HasSkill(statusDoors.attribRemoveTraps)) {
            pc.Announce("is confident there are no active traps on this door.");
            return;
        }
        //check if this character as attempted to remove trap before on this door
        try {
            var prevAttempt = state.DoorControls[thisSwitch.get("_id")].TrapDisarming[pc.CharacterSheet().get("_id")];
            if (prevAttempt === undefined) throw "character has not tried removing this trap before"
            //respond based on previous search
            if (prevAttempt) {
                switch(thisSwitch.get(statusDoors.trapStatus)) {
                    case statusDoors.trapDisabled:
                        pc.Announce("believes this trap has already been disarmed.");
                        break;
                    case statusDoors.trapTriggered:
                        pc.Announce("believes this trap has already been triggered.");
                        break;
                    default:
                        pc.Announce("is familiar with this trap, and disarms it without a problem.");
                        thisSwitch.set(statusDoors.trapStatus, statusDoors.trapDisabled);
                        break;
                }
            } else {
                //always fail if first attempt was failed
                pc.Announce("believes any trap present has been disabled.");
            }
            return;
        } catch (err) { }
        //do not count as an attempt if trap is not active
        if (thisSwitch.get(statusDoors.trapStatus) !== statusDoors.trapActive && thisSwitch.get(statusDoors.trapStatus) !== statusDoors.trapResets) {
            pc.Announce("believes any trap present has been disabled.");
            return;
        }
        //roll the dice
        var charSkill = pc.SkillLevel();
        var trapAdjust = (isNaN(thisSwitch.get(statusDoors.trapQualityAdj))) ? 0 : parseInt(thisSwitch.get(statusDoors.trapQualityAdj));
        if (statusDoors.usePercentageChecks) {
            var rollResult = randomInteger(100);
            var actionSuccess = (Math.min(charSkill + trapAdjust, 95) >= rollResult) ? true : false;
            sendChat("Doors", "/w GM REMOVE TRAP: " + charSkill + "% chance with " + trapAdjust + "% trap modifier versus a roll of " + rollResult + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        } else {
            var rollResult = randomInteger(20);
            var actionSuccess = (rollResult + charSkill >= trapAdjust) ? true : false;
            sendChat("Doors", "/w GM REMOVE TRAP: d20 roll of " + rollResult + " plus skill " + charSkill + " vs DC " + trapAdjust + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
        }
        //record the character's results
        state.DoorControls[thisSwitch.get("_id")].TrapDisarming[pc.CharacterSheet().get("_id")] = actionSuccess;
        //disarm trap if attempt was successful
        if (actionSuccess) {
            thisSwitch.set(statusDoors.trapStatus, statusDoors.trapDisabled);
        }
        //announce pseudo-results to the party
        pc.Announce("believes any trap present has been disabled.");
    };
    var SameSide = function(pc) {
        //true if set to both sides
        if (thisSwitch.get(statusDoors.doorSideActive) === statusDoors.doorSideBoth) return true;
        //determine angle to door based on rotation
        var a = (Math.atan2(pc.MapToken().get("top") - thisDoor.get("top"), thisDoor.get("left") - pc.MapToken().get("left")) * 180 / Math.PI + 180 + thisDoor.get("rotation")) % 360;
        var isNorth = (a >= 0 && a <=180) ? true : false;
        //return true if same side
        if (isNorth && thisSwitch.get(statusDoors.doorSideActive) === statusDoors.doorSideNorth) return true;
        if (!isNorth && thisSwitch.get(statusDoors.doorSideActive) === statusDoors.doorSideSouth) return true;
        return false;
    };
    this.DetectSecret = function(pc) {
        if (IsPathInRange(pc)) {
            //roll the dice
            var charSkill = pc.SkillLevel();
            if (statusDoors.usePercentageChecks) {
                var rollResult = randomInteger(100);
                var actionSuccess = (charSkill >= rollResult) ? true : false;
                sendChat("Doors", "/w GM DETECTION (" + pc.CharacterSheet().get("name") + "): " + charSkill + "% chance vs roll of " + rollResult + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
            } else {
                var rollResult = randomInteger(20);
                var actionSuccess = (rollResult + charSkill >= statusDoors.detectHiddenDC) ? true : false;
                sendChat("Doors", "/w GM DETECTION: d20 roll of " + rollResult + " plus skill " + charSkill + " vs DC " + statusDoors.detectHiddenDC + ": " + ((actionSuccess) ? "SUCCESS" : "FAILED"));
            }
            //reveal door if detected
            if (actionSuccess) {
                thisSwitch.set({
                    layer: "objects",
                    aura1_radius: statusDoors.doorTypeRevealed,
                });
                pc.Announce("has discovered a hidden door.");
                sendPing(thisDoor.get("left"), thisDoor.get("top"), thisDoor.get("_pageid"), null, false);
            }
        }
    };
    var IsPathInRange = function (pc) {
        //split lastmove into array
        var lastmove = pc.MapToken().get("lastmove").split(",");
        var P1 = {X: pc.MapToken().get("left"), Y: pc.MapToken().get("top")};
        var P2 = {X: 0, Y: 0};
        var P3 = {X: thisDoor.get("left"), Y: thisDoor.get("top")};
        var dX = 0;
        var dY = 0;
        var u = 0;
        var d = 0;
        //loop for each move segment, stop if ever true
        for (var i = lastmove.length; i > 0; i -=2) {
            //read the next point
            P2 = {X: parseInt(lastmove[i-2]), Y: parseInt(lastmove[i-1])};
            log("Segment (" + P1.X + "," + P1.Y + ") and (" + P2.X + "," + P2.Y + ") to point (" + P3.X + "," + P3.Y + ")");
            //set up delta values
            dX = P2.X - P1.X;
            dY = P2.Y - P1.Y;
            u = ((P3.X - P1.X) * dX + (P3.Y - P1.Y) * dY) / (Math.pow(dX, 2) + Math.pow(dY, 2));
            //limit resuts to the move segment
            u = ( u > 1) ? 1 : (u < 0) ? 0 : u;
            log( "  u factor: " + u.toFixed(2));
            //calculate distance between segment and point
            d = Math.sqrt(Math.pow(((P1.X + u * dX) - P3.X),2) + Math.pow(((P1.Y + u * dY) - P3.Y),2));
            log("  distance: " + d.toFixed(2));
            if ( d <= statusDoors.detectionRange * 70) return true;
            //move P2 to P1
            P1 = {X: P2.X, Y: P2.Y};
        }
        return false;
    };
    this.IsClosed = function() {
        return (thisWall.get("layer") === "walls") ? true : false;
    };
    this.OnPage = function() {
        try { return thisSwitch.get("_pageid") } catch (err) { return undefined; };
    };
    this.Icon = function() {
        return thisDoor;
    };
    this.Control = function() {
        return thisSwitch;
    };
    this.IsLocked = function() {
       return (thisSwitch.get(statusDoors.lockStatus) ===  statusDoors.isLocked) ? true : false;
    };
    this.IsTrapped = function() {
        return (thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapActive || thisSwitch.get(statusDoors.trapStatus) === statusDoors.trapResets) ? true : false;
    };
    this.IsHidden = function() {
        return (thisSwitch.get(statusDoors.doorType) === statusDoors.doorTypeHidden) ? true : false;
    };
};
//define a player object
function PlayerControl() {
    var thisAs;
    var thisCharacter;
    var thisToken;
    var roleGM = false;
    var thisAttrib;
    this.Load = function (msgWho, pageID, proximityObj) {
        //set the current speaker
        thisAs = msgWho;
        //find a character sheet
        thisCharacter = findObjs({
            _type: "character",
            name: msgWho,
        })[0];
        //determing if running as GM
        roleGM = (msgWho.indexOf("(GM)") !== -1) ? true : false;
        //find a token on map if not GM
        if (thisCharacter) {
            thisToken = _.chain(findObjs({
                    type: 'graphic',
                    pageid: pageID,
                    represents: thisCharacter.id
                }))
                .reduce((m,o)=>{
                    let dist=0;
                    if(proximityObj){
                        dist = Math.pow(o.get("top") - proximityObj.get("top"),2) + Math.pow(o.get("left") - proximityObj.get("left"),2);
                    }
                    if(dist<m.dist){
                        m.pick=o;
                    }
                    return m;
                },{pick: null, dist:100000})
                .value().pick;
        }
        //clear any previous attributes
        thisAttrib = undefined;
    }
    this.Whisper = function(SendAs, SendMsg) {
        sendChat((SendAs === null ? thisAs : SendAs), "/w " + thisAs.split(" ")[0] + " " + SendMsg);
    }
    this.Announce = function(SendMsg) {
        sendChat("character|" + thisCharacter.get("_id"), "/em " + SendMsg);
    }
    this.InRange = function(obj) {
        var distance = Math.sqrt(Math.pow(thisToken.get("top") - obj.get("top"),2) + Math.pow(thisToken.get("left") - obj.get("left"),2));
        return (distance > statusDoors.interactRange * 70) ? false : true;
    }
    this.HasSkill = function(attribName) {
        thisAttrib = findObjs({
            _type: "attribute",
            _characterid: thisCharacter.get("_id"),
            name: attribName,
        })[0];
        try{
            if (isNaN(thisAttrib.get("current")) || thisAttrib.get("current") <= 0) throw "character attribute <= 0 or NaN";
            return true;
        } catch (err) { return false; }
    }
    this.SkillLevel = function() {
        try {
            return (isNaN(thisAttrib.get("current"))) ? 0 : parseInt(thisAttrib.get("current"));
        } catch (err) { return 0; }
    }
    this.IsGM = function() {
        return roleGM;
    }
    this.CharacterSheet = function() {
        return thisCharacter;
    }
    this.MapToken = function() {
        return thisToken;
    }
    this.OnPage = function() {
        return thisToken.get("_pageid");
    }
}
//=========== events ==========
on("chat:message", function (msg) {
    //handle only player commands
    var cmdNames = ["!OpenDoor", "!CloseDoor", "!PickLock", "!RemoveTrap", "!FindTraps"];
    if (msg.type !== "api" || cmdNames.indexOf(msg.content) === -1) return;
    //selection must be a single item
    try {
        if (msg.selected.length !== 1) throw "multiple items selected";
    } catch (err) { return; }
    //load the door control
    var door = new DungeonDoorControl();
    if (!door.Load(msg.selected[0]["_id"])) return;
    //load the player
    var pc = new PlayerControl();
    pc.Load(msg.who, getObj(msg.selected[0]["_type"], msg.selected[0]["_id"]).get("_pageid"), door.Icon());
    //do nothing if not playing as a Character or GM
    if (!pc.CharacterSheet() && !pc.IsGM()) {
        pc.Whisper("GM","Please set your 'AS' drop option to a character first.");
        return;
    }
    if (!pc.IsGM()) {
        //verify character has token on the map
        if (pc.MapToken() === undefined) {
            pc.Whisper(null, "I don't have a token on this map.");
            return;
        }
        //verify character token is close enough to the door
        if (!pc.InRange(door.Icon())) {
            pc.Whisper(null, "I am too far from the door to do that.");
            return;
        }
    }
    switch(msg.content) {
        case "!OpenDoor":
            door.Open(pc);
            break;
        case "!CloseDoor":
            door.Close(pc);
            break;
        case "!PickLock":
            door.PickLock(pc);
            break;
        case "!RemoveTrap":
            door.RemoveTrap(pc);
            break;
        case "!FindTraps":
            door.FindTraps(pc);
            break;
    }
});  //player chat commands
on("chat:message", function (msg) {
    //handle only GM commands
    var cmdNames = ["!ObjectList","!DoorsLink","!DoorsResetUse","!DoorsAllOpen","!DoorsAllClose","!DoorsAlign","!DoorsCount","!DoorsDeleteAllLinks","!SideID","!DoorsTableUpdate"];
    if (msg.type !== "api" || msg.who.indexOf(" (GM)") === -1 || cmdNames.indexOf(msg.content) === -1) return;
    var pc = new PlayerControl();
    pc.Load(msg.who, null);
    switch(msg.content.split(" ")[0]) {
        case "!DoorsLink":
            //make sure three items are selected
            try {
                if (msg.selected.length !== 3) throw "invalid selection";
            } catch (err) {
                sendChat("Doors", "/w GM Select a graphic named 'Switch', a graphic named 'Door' and a path to use as a wall.");
                return;
            }
            //set up count variables
            var linkSet = {};
            linkSet.SwitchID = [];
            linkSet.PathID = [];
            linkSet.DoorID = [];
            //identify each type of selected
            _.each(msg.selected, function(obj) {
                try {
                    var o = getObj(obj["_type"], obj["_id"]);
                    if (o.get("_type") === "graphic" && o.get("name") === "Switch") {
                        linkSet.SwitchID.push(o);
                    } else if (o.get("_type") === "graphic" && o.get("name") === "Door") {
                        linkSet.DoorID.push(o);
                    } else if (o.get("_type") === "path") {
                        linkSet.PathID.push(o);
                    }
                } catch (err) { }
            });
            //verify only one of each type role in selection
            if (linkSet.SwitchID.length !== 1 || linkSet.DoorID.length !== 1 || linkSet.PathID.length !== 1) {
                sendChat("Doors", "/w GM Select a graphic named 'Switch', a graphic named 'Door' and a path to use as a wall.");
                return;
            }
            //add the selected as a door
            AddSwitchControl(linkSet.SwitchID[0], linkSet.DoorID[0], linkSet.PathID[0]);
            break;
        case "!DoorsResetUse":
            _.each(state.DoorControls, function(obj) {
                obj.UnlockAttempts = {};
                obj.TrapFinding = {};
                obj.TrapDisarming = {};
                obj.TrapFound = false;
            });
            sendChat("Doors","/w GM All doors have been reset to 'never been seen' status.");
            break;
        case "!ObjectList":
            _.each(msg.selected, function(obj) {
                try {
                    log(getObj(obj["_type"], obj["_id"]));
                } catch (err) { }
            });
            break;
        case "!DoorsAllOpen":
            var door = new DungeonDoorControl();
            _.each(state.DoorControls, function(obj) {
               door.Load(obj.SwitchID);
               if (door.OnPage() === Campaign().get("playerpageid")) door.Open(pc);
            });
            break;
        case "!DoorsAllClose":
            var door = new DungeonDoorControl();
            _.each(state.DoorControls, function(obj) {
               door.Load(obj.SwitchID);
               if (door.OnPage() === Campaign().get("playerpageid")) door.Close(pc);
            });
            break;
        case "!DoorsAlign":
            var door = new DungeonDoorControl();
            _.each(state.DoorControls, function(obj) {
                door.Load(obj.SwitchID);
                if(door.OnPage() === Campaign().get("playerpageid")) {
                    obj.Left = door.Icon().get("left");
                    obj.Top = door.Icon().get("top");
                    obj.Rotation = door.Icon().get("rotation");
                    obj.Width = parseInt(door.Icon().get("width") / 4);
                   obj.Height = parseInt(door.Icon().get("height") / 4);
                    door.Control().set({
                        left: obj.Left,
                        top: obj.Top,
                        rotation: obj.Rotation,
                        width: obj.Width,
                        height: obj.Height,
                    });
                }
            });
            break;
        case "!DoorsCount":
            var iDoors = 0;
            var iLocks = 0;
            var iTraps = 0;
            var iHidden = 0;
            var iErrors = 0;
            var door = new DungeonDoorControl();
            _.each(state.DoorControls, function(obj) {
                if (door.Load(obj.SwitchID)) {
                    iDoors++;
                    if (door.IsHidden()) iHidden++;
                    if (door.IsLocked()) iLocks++;
                    if (door.IsTrapped()) iTraps++;
                } else { iErrors++; }
            });
            sendChat("Doors","/w GM Doors:" + iDoors + ", Locked:" + iLocks + ", Trapped:" + iTraps + ", Hidden:" + iHidden);
            if (iErrors > 0) sendChat("","/w GM There were " + iErrors + " doors that did not load properly.");
            break;
        case "!DoorsDeleteAllLinks":
            _.each(state.DoorControls, function(obj) {
                getObj("graphic", obj.SwitchID).set("layer","objects");
                getObj("graphic", obj.DoorID).set("layer","objects");
                getObj("path", obj.PathID).set("layer","objects");
            });
            state.DoorControls = {};
            sendChat("Doors","/w GM All door links have been deleted from state.  No doors will function until relinked with !DoorsLink command.");
            break;
        case "!SideID":
            try {
                if (msg.selected.length !== 1) throw "selection error";
                var obj = getObj(msg.selected[0]["_type"], msg.selected[0]["_id"]);
                sendChat("Doors", "/w GM SIDEID: obj [" + obj.get("name") + "] is set to side: " + obj.get("currentSide"));
            } catch (err) { sendChat ("SIDE", err); }
            break;
        case "!DoorsTableUpdate":
            //make sure we have one door image selected
            if (!msg.selected || msg.selected.length !== 1) {
                sendChat("Doors","/w GM Select a single door graphic");
                return;
            }
            var newDoor = getObj("graphic", msg.selected[0]["_id"]);
            if (newDoor.get("name") !== "Door") {
                sendChat("Doors","/w GM Selected door must be named 'Door'.");
                return;
            }
            //update all doors' 'sides' to selected door's 'sides'
            var iErrors = 0;
            _.each(state.DoorControls, function(obj) {
                try {
                    thisDoor = getObj("graphic", obj.DoorID);
                    thisDoor.set({
                        //imgsrc: decodeURIComponent(newDoor.get("sides").split("|")[thisDoor.get("currentSide")]).replace(/med\.png/g, "thumb.png"),
                        imgsrc: getCleanImgsrc(decodeURIComponent(newDoor.get("sides").split("|")[thisDoor.get("currentSide")])),
                        sides: newDoor.get("sides"),
                    });
                } catch (err) {
                    iErrors++;
                    log("Error updating door " + obj.DoorID);
                }
            });
            //display results of update
            if (iErrors === 0) {
                sendChat("Doors","GM Table images updated sucessfully.");
            } else {
                sendChat("Doors","Table images updated, but " + iErrors + " error(s) occured.");
            }
            break;
    }
});  //GM chat commands
on("change:graphic", function(obj) {
    //only reset a valid switch
    var o = state.DoorControls[obj.get("_id")];
    if (!o) return;
    //keep the switch in place
    try {
        obj.set({
            top: o.Top,
            left: o.Left,
            rotation: o.Rotation,
            width: o.Width,
            height: o.Height,
            layer: (obj.get(statusDoors.doorType) === statusDoors.doorTypeHidden) ? "gmlayer" : "objects",
            aura1_color: "transparent",
            aura2_color: "transparent",
            lastmove: "",
            statusmarkers: "",
        });
    } catch (err) { }
}); //prevents switch movement
on("destroy:graphic", function(obj) {
    try {
        var o = state.DoorControls[obj.get("_id")];
        if (!o) return ;
        //move door back to objects layer
        try {
            getObj("graphic", o.DoorID).set("layer","objects");
        } catch (err) { }
        //move wall back to objects layer
        try {
            getObj("path", o.PathID).set("layer","objects");
        } catch (err) { }
        //remove data from state
        delete state.DoorControls[obj.get("_id")];
        sendChat("Doors","/w GM A door control has been deleted.  Associated controls have been moved to the objects layer.");
    } catch (err) { log (err); }
});  //remove link in state when switch deleted
on("change:graphic", function(obj) {
    //do nothing if not a character
    if(obj.get("represents") === "" || state.DoorControls[obj.get("_id")]) return;
    //check controlledby for character
    var pcSheet = getObj("character", obj.get("represents"));
    if (pcSheet.get("controlledby").replace("all","") === "") return;
    //load the player
    var pc = new PlayerControl()
    pc.Load(pcSheet.get("name"), obj.get("_pageid"),obj);
    //dm cannot detect secret doors
    if(pc.IsGM()) return;
    //no proximity check needed if no skill
    if (!pc.HasSkill(statusDoors.attribFindHidden)) return;
    //find all secret doors on the same page as the token
    var secretSwitches = findObjs({
        _type: "graphic",
        _pageid: pc.OnPage(),
        aura1_radius: statusDoors.doorTypeHidden,
    });
    //check detection for each hidden door
    var door = new DungeonDoorControl();
    _.each(secretSwitches, function(secretSwitch) {
        if (door.Load(secretSwitch.get("_id"))) door.DetectSecret(pc);
    });
}); //check movement for proximity to secret doors
//=========== functions ==========
var AddSwitchControl = function(thisSwitch, thisDoor, thisPath) {
    //use the switch as a reference ID in state
    var thisID = thisSwitch.get("_id");
    //pair items in state data
    state.DoorControls[thisID] = ({
        SwitchID: thisID,
        PathID: thisPath.get("_id"),
        DoorID: thisDoor.get("_id"),
        Left: thisSwitch.get("left"),
        Top: thisSwitch.get("top"),
        Rotation: thisSwitch.get("rotation"),
        Width: thisSwitch.get("width"),
        Height: thisSwitch.get("height"),
    });
    //set additional state variables
    state.DoorControls[thisID].UnlockAttempts = {};
    state.DoorControls[thisID].TrapFinding = {};
    state.DoorControls[thisID].TrapDisarming = {};
    state.DoorControls[thisID].TrapFound = false;
    //set default values for locks as traps
    thisSwitch.set({
        bar1_value: statusDoors.isUnlocked,
        bar1_max: "0",
        bar2_value: statusDoors.trapNone,
        bar2_max: "0",
        aura1_radius: statusDoors.doorTypeVisible,
        aura1_color: "transparent",
        aura2_radius: statusDoors.doorSideBoth,
        aura2_color: "transparent",
        gmnotes: "PC has triggered a trap.",
    });
    //format the switch to default role settings
    thisSwitch.set({
        layer: "objects",
        isdrawing: true,
        showplayers_name: false,
        showplayers_bar1: false,
        showplayers_bar2: false,
        showplayers_bar3: false,
        showplayers_aura1: false,
        showplayers_aura2: false,
        playersedit_name: false,
        playersedit_bar1: false,
        playersedit_bar2: false,
        playersedit_bar3: false,
        playersedit_aura1: false,
        playersedit_aura2: false,
        controlledby: "all",
    });
    //move the door graphic to the map layer
    thisDoor.set({
        layer: "map",
    })
    //move the lighting path to the walls layer
    thisPath.set({
        layer: "walls",
        stroke: statusDoors.DoorPathColor,
        stroke_width: 5,
        fill: "transparent",
    });
    try {
        var door = new DungeonDoorControl();
        if (!door.Load(thisID)) throw "could not load new door";
        sendChat("Doors","/w GM Door has been successfully linked. ID:" + thisID);
    } catch (err) { sendChat ("Doors", "/w GM ERROR: " + err); }
} //adds trio as a door control
//=========== non-essential ==========
on("chat:message", function(msg) {
    cmdName = "!CleanUp";
    if (msg.type !== "api" || msg.content.indexOf(cmdName) === -1) return;
    _.each(findObjs({ _type: "graphic", name: "Switch"}), function(o) {
        o.set({
            layer: "gmlayer",
            width: 140,
            height: 140,
            top: 70,
            left: 70,
        });
    });
    _.each(findObjs({ _type: "graphic", name: "Door"}), function(o) {
        o.set({
            layer: "gmlayer",
            width: 140,
            height: 140,
            top: 70,
            left: 70,
        });
    });
    _.each(findObjs({ _type: "path", stroke: statusDoors.DoorPathColor, stroke_width: 5, fill: "transparent"}), function(o) {
        o.set({
            layer: "gmlayer",
            top: 70,
            left: 70,
        });
    });
});
