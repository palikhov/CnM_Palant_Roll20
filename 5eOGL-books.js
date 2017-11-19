function getCharacterObj(obj) {
    "use strict";

    //send any object and returns the associated character object
    //returns character object for attribute, token/graphic, and ability, and... character

    var objType = obj._type,
        att, characterObj, tok;

    if ((objType !== "attribute") && (objType !== "graphic") && (objType !== "character")) {
        sendChat("API"," cannot be associated with a character.");
        return;
    } 

    if ((objType === "attribute") || (objType === "ability")) {
        att = getObj(objType, obj._id);
        if (att.get("_characterid") !== "") {
            characterObj = getObj("character", att.get("_characterid"));
        }
    }

    if (objType === "graphic") { 
        tok = getObj("graphic", obj._id);
        if (tok.get("represents") !== "") {
            characterObj = getObj("character", tok.get("represents"));
        } else {
            sendChat("API"," Selected token does not represent a character.");
            return;
        }
    }

    if (objType === "character") {
        characterObj = getObj("character", obj._id);
    }

    return characterObj;
}
on("chat:message", function(msg) {
    "use strict";

    var msg,
        selected,
        Parameters,
        statusName,
        aName,
        ids,
        attributeName,
        newValue,
        characterObj,
        attributeObjArray,
        tok;

    if (msg.type === "api" && msg.content.indexOf("!generate-spellbook") !== -1 )
    {

        selected = msg.selected;
        var parameters = msg.content.split(" ");

        // Set filter for what spell class to generate a spellbook for
        // Defaults to -1 for no filter
        var spellClass = -1;
        if (parameters.length > 1)
            spellClass = parameters[1];

        // Set the name of the ability the macro will be put into
        // Defaults to "Spells"
        var abilityName = "Spells";
        if (parameters.length > 2)
            abilityName = parameters[2];

        // Set the title to use in the template header
        // Defaults to "Spells"
        var title = "Spells";
        if (parameters.length > 3)
            title = parameters[3];

        //loop through selected tokens
        _.each(selected, function(obj) {
            tok = getObj("graphic", obj._id);
            // Get the character token represents
            characterObj = getCharacterObj(obj);
            if ( ! characterObj) {
                return;
            }

            var characterName = characterObj.get("name");
            var rowIDs = new Array();   // Create array for repeating spell attribute names
            getAllObjs().forEach(function(obj) {    
                // Filter down to just attribute objects belonging to the character, whose name indicates it's a spell
                if (obj.get("type") !== "attribute")
                    return;
                if (obj.get("_characterid") !== characterObj.get("_id"))
                    return;
                if (obj.get("name").indexOf("repeating_spell-") === -1)
                    return;
                
                // If this is a name attribute, use that to add the base repeating attribute name to the array
                if (obj.get("name").indexOf("_spellname") !== -1)
                    rowIDs.push(obj.get("name").substr(0,obj.get("name").indexOf("_spellname")));
            });
            
            // Create arrays for individual spell levels
            var lvl0 = new Array();
            var lvl1 = new Array();
            var lvl2 = new Array();
            var lvl3 = new Array();
            var lvl4 = new Array();
            var lvl5 = new Array();
            var lvl6 = new Array();
            var lvl7 = new Array();
            var lvl8 = new Array();
            var lvl9 = new Array();
            var npc = new Array();
            
            // Sort rowIDs into spell levels
            rowIDs.forEach(function(entry){
                // Grab the spell level from attribute name repeating_spell-1
                var lvl = entry.substr(16,1);
                if(entry.indexOf("cantrip") >= 0){
                    lvl = "cantrip";
                }
                if(entry.indexOf("npc") >= 0){
                    lvl = "npc";
                }

                // Put spell into the correct spell level
                switch (lvl) {
                    case "cantrip":
                        lvl0.push(entry);
                        break;
                    case "1":
                        lvl1.push(entry);
                        break;
                    case "2":
                        lvl2.push(entry);
                        break;
                    case "3":
                        lvl3.push(entry);
                        break;
                    case "4":
                        lvl4.push(entry);
                        break;
                    case "5":
                        lvl5.push(entry);
                        break;
                    case "6":
                        lvl6.push(entry);
                        break;
                    case "7":
                        lvl7.push(entry);
                        break;
                    case "8":
                        lvl8.push(entry);
                        break;
                    case "9":
                        lvl9.push(entry);
                        break;
                    case "npc":
                        npc.push(entry);
                        break;
                }
            });
            var macroText = "/w @{character_name} @{selected|wtype}&{template:atk} {{rname=Spell List}} {{desc=SPELL LIST:\n\n";   // Base macro text

            // Add spells to macro by spell level
            var addSpells = function(spells, title){
                if (spells.length > 0)
                {
                    var lvlText = "";
                    spells.forEach(function(entry) {
                        // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                        if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry + "_spellname")))
                            return;
                        if(lvlText){
                            lvlText += ", ";
                        }
                        lvlText = lvlText + "[@{"+entry+"_spellname}](~"+characterName+"|"+entry+"_spell) ";
                    });
                    if (lvlText !== "")
                        macroText = macroText+title+": "+ lvlText+"\n\n";
                }
            }
            addSpells(lvl0, "Cantrips");
            addSpells(lvl1, "Level 1");
            addSpells(lvl2, "Level 2");
            addSpells(lvl3, "Level 3");
            addSpells(lvl4, "Level 4");
            addSpells(lvl5, "Level 5");
            addSpells(lvl6, "Level 6");
            addSpells(lvl7, "Level 7");
            addSpells(lvl8, "Level 8");
            addSpells(lvl9, "Level 9");
            addSpells(npc, "NPC");

            macroText += "}}"
            
            // Check for existing ability with chosen ability name
            var abil = findObjs({  _type: "ability", _characterid: characterObj.get("_id"), name: abilityName });
            if (abil.length === 0){
                createObj("ability", {
                    name: abilityName,
                    characterid: characterObj.get("_id"),
                    action: macroText,
                    istokenaction: true
                });
            }else{
                abil[0].set("action", macroText);
            }
        });
    }
});
on("chat:message", function(msg) {
    "use strict";

    var msg,
        selected,
        Parameters,
        statusName,
        aName,
        ids,
        attributeName,
        newValue,
        characterObj,
        attributeObjArray,
        tok;

    if (msg.type === "api" && msg.content.indexOf("!generate-attackbook") !== -1 )
    {

        selected = msg.selected;
        var parameters = msg.content.split(" ");

        // Set filter for what spell class to generate a spellbook for
        // Defaults to -1 for no filter
        var spellClass = -1;
        if (parameters.length > 1)
            spellClass = parameters[1];

        // Set the name of the ability the macro will be put into
        // Defaults to "Spells"
        var abilityName = "Attacks";
        if (parameters.length > 2)
            abilityName = parameters[2];

        // Set the title to use in the template header
        // Defaults to "Spells"
        var title = "Attacks";
        if (parameters.length > 3)
            title = parameters[3];

        //loop through selected tokens
        _.each(selected, function(obj) {
            tok = getObj("graphic", obj._id);
            // Get the character token represents
            characterObj = getCharacterObj(obj);
            if ( ! characterObj) {
                return;
            }

            var characterName = characterObj.get("name");
            var attackIds = new Array();   // Create array for repeating spell attribute names
            var npcActionIds = new Array();   // Create array for repeating spell attribute names
            var npcReactionIds = new Array();   // Create array for repeating spell attribute names
            var npcTraitIds = new Array();   // Create array for repeating spell attribute names
            var legendaryActionIds = new Array();   // Create array for repeating spell attribute names
            getAllObjs().forEach(function(obj) {    
                // Filter down to just attribute objects belonging to the character, whose name indicates it's a spell
                if (obj.get("type") !== "attribute")
                    return;
                if (obj.get("_characterid") !== characterObj.get("_id"))
                    return;
                if (obj.get("name").indexOf("repeating_attack") === -1 &&
                    obj.get("name").indexOf("repeating_npcaction") === -1 &&
                    obj.get("name").indexOf("repeating_npcreaction") === -1 &&
                    obj.get("name").indexOf("repeating_npctrait") === -1)
                    return;
                
                // If this is a name attribute, use that to add the base repeating attribute name to the array
                if (obj.get("name").indexOf("_atkname") !== -1)
                    attackIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_atkname")));
                if (obj.get("name").indexOf("npcaction_") !== -1 && obj.get("name").indexOf("_name") !== -1){
                    npcActionIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_name")));
                }
                if (obj.get("name").indexOf("npcreaction_") !== -1 && obj.get("name").indexOf("_name") !== -1){
                    npcReactionIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_name")));
                }
                if (obj.get("name").indexOf("npctrait_") !== -1 && obj.get("name").indexOf("_name") !== -1){
                    npcTraitIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_name")));
                }
                if (obj.get("name").indexOf("npcaction-l_") !== -1 && obj.get("name").indexOf("_name") !== -1){
                    legendaryActionIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_name")));
                }
            });

            var macroText = "/w @{character_name} @{selected|wtype}&{template:atk} {{rname=Attack List}} {{desc= ATTACK LIST\n";   // Base macro text

            // Add spells to macro by spell level
            if (attackIds.length > 0)
            {
                var lvlText = "";
                attackIds.forEach(function(entry) {
                    // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                    if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry + "_atkname")))
                        return;
                    lvlText = lvlText + "\n[@{"+entry+"_atkname}](~"+characterName+"|"+entry+"_attack) ";
                });
                if (lvlText !== "")
                    macroText = macroText+"Attacks: "+ lvlText+"\n\n";
            }
            if (npcActionIds.length > 0)
            {
                var lvlText = "";
                npcActionIds.forEach(function(entry) {
                    // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                    if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry + "_name")))
                        return;
                    lvlText = lvlText + "\n[@{"+entry+"_name}](~"+characterName+"|"+entry+"_npc_action) ";
                });
                if (lvlText !== "")
                    macroText = macroText+"Actions: "+ lvlText+"\n\n";
            }
            if (legendaryActionIds.length > 0)
            {
                var lvlText = "";
                legendaryActionIds.forEach(function(entry) {
                    // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                    if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry + "_name")))
                        return;
                    lvlText = lvlText + "\n[@{"+entry+"_name}](~"+characterName+"|"+entry+"_npc_action) ";
                });
                if (lvlText !== "")
                    macroText = macroText+"Legendary Actions: "+ lvlText+"\n\n";
            }

            macroText += "}}"
            
            // Check for existing ability with chosen ability name
            var abil = findObjs({  _type: "ability", _characterid: characterObj.get("_id"), name: abilityName });
            if (abil.length === 0){
                createObj("ability", {
                    name: abilityName,
                    characterid: characterObj.get("_id"),
                    action: macroText,
                    istokenaction: true
                });
            }else{
                abil[0].set("action", macroText);
            }
        });
    }
});
on("chat:message", function(msg) {
    "use strict";

    var msg,
        selected,
        Parameters,
        statusName,
        aName,
        ids,
        attributeName,
        newValue,
        characterObj,
        attributeObjArray,
        tok;

    if (msg.type === "api" && msg.content.indexOf("!generate-checkbook") !== -1 )
    {

        selected = msg.selected;
        var parameters = msg.content.split(" ");

        // Set the name of the ability the macro will be put into
        // Defaults to "Spells"
        var abilityName = "Other";

        // Set the title to use in the template header
        // Defaults to "Spells"
        var title = "Other";

        //loop through selected tokens
        _.each(selected, function(obj) {
            tok = getObj("graphic", obj._id);
            // Get the character token represents
            characterObj = getCharacterObj(obj);
            if ( ! characterObj) {
                return;
            }
            var characterName = characterObj.get("name");

            var macroText = "/w @{character_name} @{selected|wtype}&{template:atk} {{rname=Other}} {{desc=";   // Base macro text
            if(getAttrByName(characterObj.get("_id"), "npc") == 1){
                macroText += "Checks: \n"
                macroText += "[Str](~"+characterName+"|npc_str) ";
                macroText += ", [Dex](~"+characterName+"|npc_dex) ";
                macroText += ", [Con](~"+characterName+"|npc_con) ";
                macroText += ", [Wis](~"+characterName+"|npc_wis) ";
                macroText += ", [Int](~"+characterName+"|npc_int) ";
                macroText += ", [Cha](~"+characterName+"|npc_cha) ";

                macroText += "\n\n[Acrobatics](~"+characterName+"|npc_Acrobatics) ";
                macroText += ", [Animal Handling](~"+characterName+"|npc_Animal_Handling) ";
                macroText += ", [Arcana](~"+characterName+"|npc_Arcana) ";
                macroText += ", [Athletics](~"+characterName+"|npc_Athletics) ";
                macroText += ", [Deception](~"+characterName+"|npc_Deception) ";
                macroText += ", [History](~"+characterName+"|npc_History) ";
                macroText += ", [Insight](~"+characterName+"|npc_Insight) ";
                macroText += ", [Intimidation](~"+characterName+"|npc_Intimidation) ";
                macroText += ", [Investigation](~"+characterName+"|npc_Investigation) ";
                macroText += ", [Medicine](~"+characterName+"|npc_Medicine) ";
                macroText += ", [Nature](~"+characterName+"|npc_Nature) ";
                macroText += ", [Perception](~"+characterName+"|npc_Perception) ";
                macroText += ", [Performance](~"+characterName+"|npc_Performance) ";
                macroText += ", [Persuasion](~"+characterName+"|npc_Persuasion) ";
                macroText += ", [Religion](~"+characterName+"|npc_Religion) ";
                macroText += ", [Sleight of Hand](~"+characterName+"|npc_Sleight_of_Hand) ";
                macroText += ", [Stealth](~"+characterName+"|npc_Stealth) ";
                macroText += ", [Survival](~"+characterName+"|npc_Survival) ";

                macroText += "\n\nSaves: \n"
                macroText += "[Str](~"+characterName+"|npc_str_save) ";
                macroText += ", [Dex](~"+characterName+"|npc_dex_save) ";
                macroText += ", [Con](~"+characterName+"|npc_con_save) ";
                macroText += ", [Wis](~"+characterName+"|npc_wis_save) ";
                macroText += ", [Int](~"+characterName+"|npc_int_save) ";
                macroText += ", [Cha](~"+characterName+"|npc_cha_save) ";
            } else {
                macroText += "Checks: \n"
                macroText += "[Str](~"+characterName+"|strength) ";
                macroText += ", [Dex](~"+characterName+"|dexterity) ";
                macroText += ", [Con](~"+characterName+"|constitution) ";
                macroText += ", [Wis](~"+characterName+"|wisdom) ";
                macroText += ", [Int](~"+characterName+"|intelligence) ";
                macroText += ", [Cha](~"+characterName+"|charisma) ";

                macroText += "\n\n[Acrobatics](~"+characterName+"|Acrobatics) ";
                macroText += ", [Animal Handling](~"+characterName+"|Animal_Handling) ";
                macroText += ", [Arcana](~"+characterName+"|Arcana) ";
                macroText += ", [Athletics](~"+characterName+"|Athletics) ";
                macroText += ", [Deception](~"+characterName+"|Deception) ";
                macroText += ", [History](~"+characterName+"|History) ";
                macroText += ", [Insight](~"+characterName+"|Insight) ";
                macroText += ", [Intimidation](~"+characterName+"|Intimidation) ";
                macroText += ", [Investigation](~"+characterName+"|Investigation) ";
                macroText += ", [Medicine](~"+characterName+"|Medicine) ";
                macroText += ", [Nature](~"+characterName+"|Nature) ";
                macroText += ", [Perception](~"+characterName+"|Perception) ";
                macroText += ", [Performance](~"+characterName+"|Performance) ";
                macroText += ", [Persuasion](~"+characterName+"|Persuasion) ";
                macroText += ", [Religion](~"+characterName+"|Religion) ";
                macroText += ", [Sleight of Hand](~"+characterName+"|Sleight_of_Hand) ";
                macroText += ", [Stealth](~"+characterName+"|Stealth) ";
                macroText += ", [Survival](~"+characterName+"|Survival) ";

                macroText += "\n\nSaves: \n"
                macroText += "[Str](~"+characterName+"|strength_save) ";
                macroText += ", [Dex](~"+characterName+"|dexterity_save) ";
                macroText += ", [Con](~"+characterName+"|constitution_save) ";
                macroText += ", [Wis](~"+characterName+"|wisdom_save) ";
                macroText += ", [Int](~"+characterName+"|intelligence_save) ";
                macroText += ", [Cha](~"+characterName+"|charisma_save) ";
            }

            macroText += "}}"
            
            // Check for existing ability with chosen ability name
            var abil = findObjs({  _type: "ability", _characterid: characterObj.get("_id"), name: abilityName });
            if (abil.length === 0){
                createObj("ability", {
                    name: abilityName,
                    characterid: characterObj.get("_id"),
                    action: macroText,
                    istokenaction: true
                });
            }else{
                abil[0].set("action", macroText);
            }
        });
    }
});
