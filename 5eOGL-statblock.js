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

    if (msg.type === "api" && msg.content.indexOf("!statblock") !== -1 )
    {

        selected = msg.selected;
        var spellClass = -1;

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
                if (obj.get("name").indexOf("repeating_spell-") === -1 &&
                    obj.get("name").indexOf("repeating_attack") === -1 &&
                    obj.get("name").indexOf("repeating_npcaction") === -1 &&
                    obj.get("name").indexOf("repeating_npcreaction") === -1 &&
                    obj.get("name").indexOf("repeating_npctrait") === -1)
                    return;
                
                // If this is a name attribute, use that to add the base repeating attribute name to the array
                if (obj.get("name").indexOf("_spellname") !== -1){
                    rowIDs.push(obj.get("name").substr(0,obj.get("name").indexOf("_spellname")));
                }
                if (obj.get("name").indexOf("_atkname") !== -1){
                    attackIds.push(obj.get("name").substr(0,obj.get("name").indexOf("_atkname")));
                }
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
            var macroText = "/w "+characterName+" <div style='background-color:white;border: 1px solid rgb(126, 45, 64);padding: 5px;'><h3>@{"+characterName+"|character_name}</h3>";//@{selected|wtype}&{template:atk} {{rname=Spell List}} {{desc=SPELL LIST:<br><br>";   // Base macro text
            var linkStyle = 'style="background-color: transparent;color:blue;padding:0;border:none;"';
            var cellStyle = 'style="border-left: solid black 1px; border-right: solid black 1px; padding: 0 2px"';
            var divider = '<hr style="border-top: solid #afafaf 1px; border-bottom: solid #8a8a8a 1px;margin: 6px;">'
            // Add spells to macro by spell level
            var addButtons = function(actionlist, name_suffix, action_suffix, title){
                if (actionlist.length > 0)
                {
                    var lvlText = "";
                    actionlist.forEach(function(entry) {
                        // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                        if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry + name_suffix)))
                            return;
                        if(lvlText){
                            lvlText += ", ";
                        }
                        lvlText = lvlText + "<a "+linkStyle+" href='~"+characterName+"|"+entry+action_suffix+"'>@{"+characterName+"|"+entry+name_suffix+"}</a>";
                    });
                    if (lvlText !== "")
                        macroText = macroText+title+": <br>"+ lvlText+"<br><br>";
                }
            }

            macroText += divider;
            if(getAttrByName(characterObj.get("_id"), "npc") == 1){
                macroText += "<small style='color:black'>";
                macroText += "<b>AC</b>: @{"+characterName+"|npc_ac} (@{"+characterName+"|npc_actype})<br>";
                macroText += "<b>HP</b>: @{"+characterName+"|hp|max} (@{"+characterName+"|npc_hpformula})<br>";
                macroText += "<b>Speed</b>: @{"+characterName+"|npc_speed}<br>";
                macroText += "<b>Senses</b>: @{"+characterName+"|npc_senses}<br>";
                macroText += "<b>Languages</b>: @{"+characterName+"|npc_languages}<br>";
                macroText += "<b>CR</b>: @{"+characterName+"|npc_challenge} (@{"+characterName+"|npc_xp} XP)<br>";
                macroText += "</small>"+divider;

                macroText += "<table style='text-align:center;border-collapse: collapse;'><tr>";
                macroText += "<td "+cellStyle+"><b>STR</b><br>@{"+characterName+"|strength} (@{"+characterName+"|strength_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_str'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_str_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>DEX</b><br>@{"+characterName+"|dexterity} (@{"+characterName+"|dexterity_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_dex'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_dex_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>CON</b><br>@{"+characterName+"|constitution} (@{"+characterName+"|constitution_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_con'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_con_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>WIS</b><br>@{"+characterName+"|wisdom} (@{"+characterName+"|wisdom_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_wis'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_wis_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>INT</b><br>@{"+characterName+"|intelligence} (@{"+characterName+"|intelligence_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_int'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_int_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>CHA</b><br>@{"+characterName+"|charisma} (@{"+characterName+"|charisma_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|npc_cha'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|npc_cha_save'>Save</a> </small></td></tr></table>";

                macroText += divider+"<small>"
                macroText += "<a "+linkStyle+" href='~"+characterName+"|npc_Acrobatics'>Acrobatics</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Animal_Handling'>Animal Handling</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Arcana'>Arcana</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Athletics'>Athletics</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Deception'>Deception</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_History'>History</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Insight'>Insight</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Intimidation'>Intimidation</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Investigation'>Investigation</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Medicine'>Medicine</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Nature'>Nature</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Perception'>Perception</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Performance'>Performance</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Persuasion'>Persuasion</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Religion'>Religion</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Sleight_of_Hand'>Sleight of Hand</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Stealth'>Stealth</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|npc_Survival'>Survival</a> </small>";
            } else {
                macroText += "<td "+cellStyle+"><b>STR</b><br>@{"+characterName+"|strength} (@{"+characterName+"|strength_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|strength'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|strength_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>DEX</b><br>@{"+characterName+"|dexterity} (@{"+characterName+"|dexterity_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|dexterity'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|dexterity_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>CON</b><br>@{"+characterName+"|constitution} (@{"+characterName+"|constitution_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|constitution'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|constitution_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>WIS</b><br>@{"+characterName+"|wisdom} (@{"+characterName+"|wisdom_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|wisdom'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|wisdom_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>INT</b><br>@{"+characterName+"|intelligence} (@{"+characterName+"|intelligence_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|intelligence'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|intelligence_save'>Save</a> </small></td>";
                macroText += "<td "+cellStyle+"><b>CHA</b><br>@{"+characterName+"|charisma} (@{"+characterName+"|charisma_mod})<br>"
                macroText += "<small><a "+linkStyle+" href='~"+characterName+"|charisma'>Check</a><br><a "+linkStyle+" href='~"+characterName+"|charisma_save'>Save</a> </small></td></tr></table>";

                macroText += divider+"<small><a "+linkStyle+" href='~"+characterName+"|Acrobatics'>Acrobatics</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Animal_Handling'>Animal Handling</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Arcana'>Arcana</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Athletics'>Athletics</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Deception'>Deception</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|History'>History</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Insight'>Insight</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Intimidation'>Intimidation</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Investigation'>Investigation</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Medicine'>Medicine</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Nature'>Nature</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Perception'>Perception</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Performance'>Performance</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Persuasion'>Persuasion</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Religion'>Religion</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Sleight_of_Hand'>Sleight of Hand</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Stealth'>Stealth</a> ";
                macroText += ", <a "+linkStyle+" href='~"+characterName+"|Survival'>Survival</a> </small>";
            }

            macroText += divider+"<h4>Spells</h4>";
            addButtons(lvl0, "_spellname", "_spell", "Cantrips");
            addButtons(lvl1, "_spellname", "_spell", "Level 1");
            addButtons(lvl2, "_spellname", "_spell", "Level 2");
            addButtons(lvl3, "_spellname", "_spell", "Level 3");
            addButtons(lvl4, "_spellname", "_spell", "Level 4");
            addButtons(lvl5, "_spellname", "_spell", "Level 5");
            addButtons(lvl6, "_spellname", "_spell", "Level 6");
            addButtons(lvl7, "_spellname", "_spell", "Level 7");
            addButtons(lvl8, "_spellname", "_spell", "Level 8");
            addButtons(lvl9, "_spellname", "_spell", "Level 9");
            addButtons(npc, "_spellname", "_spell", "NPC");

            macroText += divider+"<h4>Traits</h4>";
            if (npcTraitIds.length > 0)
            {
                var text = "";
                npcTraitIds.forEach(function(entry) {
                    // Check for spell name attribute; was having orphaned row_id attributes creating buttons for repeating rows that didn't actually exist
                    if (_.isUndefined(getAttrByName(characterObj.get("_id"), entry+"_name")))
                        return;
                    if(text){
                        text += ", ";
                    }
                    text = text + "<small style='color:black'><b>@{"+characterName+"|"+entry+"_name}:</b> "+"@{"+characterName+"|"+entry+"_desc}</small>";
                });
                if (text !== "")
                    macroText = macroText+ text+"<br>";
            }

            macroText += divider+"<h4>Actions</h4>";
            addButtons(attackIds, "_atkname", "_attack", "Attacks");
            addButtons(npcActionIds, "_name", "_npc_action", "NPC Actions");
            addButtons(npcReactionIds, "_name", "_npc_action", "NPC Reactions");
            addButtons(legendaryActionIds, "_name", "_npc_action", "Legendary Actions");

            macroText += "</div>"
            
            sendChat("Statblock",macroText, null, {noarchive:true});
        });
    }
});
