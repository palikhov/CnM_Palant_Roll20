/* 
A script to remove and restore rooftops when a player gets within range of the building. 
To use this:
1: After first loading, use !RooftopCommands to make the use macros
2: Use the polygon tool to make your dynamic lighting lines on the building.
3: Move the player flag to the page you want to use this on. 
4: Use a roof token, best if it's rotation is an integer multiple of 90 degrees (0, 90, 180, 270)
5: Name the roof token "roof", without the quotes.
6: Drag in player tokens. That is, tokens either assigned to players, or representing characters assigned to player
7: Type !RoofReady into chat, or better yet, use it from the macro.
8: !RoofDLOff and !RoofDLOn will now turn off or on the dynamic lighting interaction of the script. Default is 'on'.
9: Use RooftopRange x, with x being the number of 5 ft squares away from which the interaction will happen. Default is 0.
*/

on("ready", function() {
    "use strict";

    if( ! state.BastRooftops ) {
        state.BastRooftops = {
            version: 1.0,
            RooftopRange: 0,
            dlInteraction: true
        };
    }

    var allPlayerTokens = [];
    var allRoofTokens = [];
    var allPaths = [];
    var allHidden = [];
    var campaign = findObjs({type: "campaign"})[0];
    var allTokens = findObjs({type: 'graphic', pageid: campaign.get("playerpageid"), layer: "objects"});


    function getPlayerTokens()
    {       
        //empty the player token array
        allPlayerTokens = [];
        //nested for loop which finds all tokens which are assigned, or which represent a character which is assigned and adds to player tokens array
        for (var i = 0; i<allTokens.length; i++)
        {
            if (allTokens[i].get("controlledby") != "" || allTokens[i].get("represents"))
            {
                if (allTokens[i].get("represents"))
                {
                    if (getObj('character', allTokens[i].get("represents")).get("controlledby"))
                    {
                        allPlayerTokens.push(allTokens[i]);        
                    }
                }
                else
                {
                    allPlayerTokens.push(allTokens[i]);
                }
            }
        }
    }

    //find all the map tokens, the find the ones named "roof"
    function getRoofTokens()
    {
        var allMapTokens = findObjs({type: 'graphic', pageid: campaign.get("playerpageid")});
        allRoofTokens = [];
        for (var i = 0; i<allMapTokens.length; i++)
        {
            if (allMapTokens[i].get("name") == "roof")
            {
                allRoofTokens.push(allMapTokens[i]);
            }
        }
    }

    //sets a selected object's name to roof
    function setRoofToken(selectedObject)
    {
        selectedObject.set("name", "roof");
    }

    //empty the path array, then find all the paths on the page
    function getPaths()
    {
        allPaths = [];
        allPaths = findObjs({type: 'path', pageid: campaign.get("playerpageid")});
    }

    //finds if an object with id aID is inside an object with id bID.
    function AinsideB(aToken, bID)
    {
        //var aToken = getObj('graphic', aID);
        var bToken = getObj('graphic', bID);

        if (bToken.get("rotation") != 90 && bToken.get("rotation") != 270)
        {
            if (bToken.get("left") - (bToken.get("width")/2 + 70*state.BastRooftops.RooftopRange) < aToken.get("left") &&
                bToken.get("left") + (bToken.get("width")/2 + 70*state.BastRooftops.RooftopRange) > aToken.get("left") &&
                bToken.get("top") - (bToken.get("height")/2 + 70*state.BastRooftops.RooftopRange) < aToken.get("top") &&
                bToken.get("top") + (bToken.get("height")/2 + 70*state.BastRooftops.RooftopRange) > aToken.get("top"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if (bToken.get("left") - (bToken.get("height")/2 + 70*state.BastRooftops.RooftopRange) < aToken.get("left") &&
                bToken.get("left") + (bToken.get("height")/2 + 70*state.BastRooftops.RooftopRange) > aToken.get("left") &&
                bToken.get("top") - (bToken.get("width")/2 + 70*state.BastRooftops.RooftopRange) < aToken.get("top") &&
                bToken.get("top") + (bToken.get("width")/2 + 70*state.BastRooftops.RooftopRange) > aToken.get("top"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    //check if any player tokens are within the interaction range of the roof token.
    function roofInsideCheck(roofToken)
    {
        var anyoneInside = false;
        for (var i = 0; i < allPlayerTokens.length; i++)
        {
            if(AinsideB(allPlayerTokens[i], roofToken.id)) { anyoneInside = true; }
        }

        return anyoneInside;
    }

    //removes a roof, sets any contained paths to DL layer, shows objects which aren't intended to remain on the GM Layer.
    function removeRoof(roofID)
    {
        getObj('graphic', roofID).set("layer", "walls");
        if(state.BastRooftops.dlInteraction) { restorePath(roofID); }
        //showObjectsUnderRoof(roofID);
    }
    //restores the roof, hiding paths on the GM layer, and hiding objects on the gm layer.
    function restoreRoof(roofID)
    {
        getObj('graphic', roofID).set("layer", "objects");
        toFront(getObj('graphic', roofID));
        if(state.BastRooftops.dlInteraction) { removePath(roofID); }
        //hideObjectsUnderRoof(roofID);
    }


/* This commented section is an alternative way of dealing with hiding token objects. It involves
altering the gm notes of tokens which are meant to be hidden, and putting objects on the gm layer
when the roof is shown, then bringing anything not "roofhidden" back to the object layer when
the roof is removed.

    //adds "roofhidden" to the gmnotes of the selected objects
    function setHide(msg)
    {
        var allSelected = msg.selected;
        if (!allSelected[0]) { sendChat("", "/w gm no token selected"); }
        else 
        {
            for(var i=0; i < allSelected.length; i++)
            {
                var notes = allSelected[i].get("gmnotes");
                if (notes == "") { notes = "roofhidden";   }
                else if (notes.includes("roofhidden"))  {  }
                else             { notes += " roofhidden"; }
                allSelected[i].set("gmnotes", notes);
            }
        }
    }

    //hides the objects which are under the roof.
    function hideObjectsUnderRoof(roofID)
    {
        var interactingObjects = [];
        //remove intentionally hidden objects from the array of interacting objects
        for (var j = 0; j < allTokens.length; j++)
        {
            if (!allTokens[j].get("gmnotes").includes("roofhidden") && allTokens[j].get("name") != "roof") { interactingObjects.push(allTokens[j]); }
        }

        for (var i = 0; i < interactingObjects.length; i++)
        {
            if (AinsideB(interactingObjects[i], roofID)) { interactingObjects[i].set("layer", "gmlayer"); }
        }
    }

    //gets all of the gmlayer tokens, and adds "roofhidden" to their gmnotes property. 
    function getSetHidden()
    {
        allHidden = findObjs({_type: 'graphic', _pageid: campaign.get("playerpageid"), layer: "gmlayer"});
        for (var i = 0; i < allHidden.length; i++)
        {
            var notes = allHidden[i].get("gmnotes");
            if (notes == "") { notes = "roofhidden";   }
            else if (notes.includes("roofhidden"))  {  }
            else             { notes += " roofhidden"; }
            allHidden[i].set("gmnotes", notes);
        }
    }

    function showObjectsUnderRoof(roofID)
    {
        var interactingObjects = [];
        //remove intentionally hidden objects from the array of interacting objects
        for (var j = 0; j < allTokens.length; j++)
        {
            if (!allTokens[j].get("gmnotes").includes("roofhidden") && allTokens[j].get("name") != "roof") { interactingObjects.push(allTokens[j]); }
        }

        for (var i = 0; i < interactingObjects.length; i++)
        {
            if (AinsideB(interactingObjects[i], roofID)) { interactingObjects[i].set("layer", "objects"); }
        }
    }

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RoofHiddenObjects"){
            getSetHidden();
            sendChat("", "/w gm &{template:default} {{name=Rooftops Hidden Tokens}} {{Hidden tokens will not change layer when the roof does}}");
        }
    });

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RoofHideThis"){
            setHide(msg);
            sendChat("", "/w gm &{template:default} {{name=Hide Selected Tokens}} {{Hidden tokens will not change layer when the roof does}}");
        }
    });
    
*/

    //remove the paths under the roof (set to gm layer)
    function removePath(roofID)
    {
        for (var i = 0; i < allPaths.length; i++)
        {
            if(AinsideB(allPaths[i], roofID)) { allPaths[i].set("layer", "gmlayer"); }
        }
    }
    //restore the paths under the roof (set to walls layer)
    function restorePath (roofID)
    {
        for (var i = 0; i < allPaths.length; i++)
        {
            if(AinsideB(allPaths[i], roofID)) { allPaths[i].set("layer", "walls"); }
        }
    }

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RoofReady"){
            allTokens = findObjs({type: 'graphic', pageid: campaign.get("playerpageid")});
            getPlayerTokens();
            getRoofTokens();
            getPaths();
            sendChat("", "/w gm &{template:default} {{name=Rooftops Ready}} {{Player Tokens=" + allPlayerTokens.length + 
            "}} {{Roof Tokens=" + allRoofTokens.length + "}}")
        }
    });

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RoofDLOn"){
            state.BastRooftops.dlInteraction = true;
            sendChat("", "/w gm &{template:default} {{name=Rooftops DL Interaction}} {{Now set to On}}");
        }
    });

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RoofDLOff"){
            state.BastRooftops.dlInteraction = false;
            sendChat("", "/w gm &{template:default} {{name=Rooftops DL Interaction}} {{Now set to Off}}");
        }
    });

    on("change:graphic", function(obj){
        if (allPlayerTokens.includes(obj)) 
        { 
            for (var i = 0; i < allRoofTokens.length; i++)
            {
                if (roofInsideCheck(allRoofTokens[i])) { removeRoof(allRoofTokens[i].id);  }
                else                                   { restoreRoof(allRoofTokens[i].id); }
            }
        }
    });

    on("chat:message", function (msg) {
        var args = msg.content.split(" ");
        if (msg.type === 'api' && args[0] === "!RooftopRange"){
            if (args[1]) { state.BastRooftops.RooftopRange = args[1]; }
            else         { state.BastRooftops.RooftopRange = 0; }
            sendChat("", "/w gm &{template:default} {{name=Rooftops Range}} {{Now set to " + state.BastRooftops.RooftopRange*5 + "}}");
        }
    });

    

    on("chat:message", function (msg) {
        if (msg.type === 'api' && msg.content === "!RooftopCommands"){
            createObj('macro', {
                name: 'Roof-Command',
                _playerid: msg.playerid,
                action: ("", "/w gm &{template:default} {{name=Rooftops}} {{[RoofReady](!RoofReady)=[**Range**](!&#13;#RooftopRange)}} {{[DL On](!RoofDLOn)=[**RoofDLOff**](!RoofDLOff)}}")
            });
            createObj('macro', {
                name: 'RooftopRange',
                _playerid: msg.playerid,
                action: ("", "!RooftopRange ?{number of squares away}")
            });
            sendChat("", "/w gm &{template:default} {{name=Rooftop Commands}} {{A macro for rooftop commands has been created in your collections}}");
        }
    });
});
