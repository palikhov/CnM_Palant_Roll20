# Используемые Roll20 API Scripts

❎️⛏ Все еще не завершено

**ВСЕ СКРИПТЫ ТРЕБУЮТ ПОДПИСКИ НА УРОВНЕ PRO**

## API scripts используемые при играх через Roll20

### Универсальные скрипты

#### 🌎**TokenMod**

**Описание:** _**This script lets you change just about any property of a token from a macro or the chat. You can only change tokens you control \(enforced by the ability to select them\), unless you are the GM, in which case you can specify token\_ids with the --ids command. The same operation is applied to all selected tokens, so it makes batch changes fast and easy.**_

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:Token_Mod) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/TokenMod) \|\|\|

#### 🌎**ChatSetAttr**

**Описание:** Позволяет изменять атрибуты листа персонажа командами из чата.

**Ссылки** [Roll20 Forum](https://app.roll20.net/forum/post/3737514/script-chatsetattr-set-character-attributes-via-chat-messages)

#### ROLL20 AUDIO MASTER

[Roll20 Audio Master FORUM](https://app.roll20.net/forum/post/4259010/script-roll20-audio-master-hear-the-dice-hear-the-action/?pagenum=1)

#### 🌎**GroupCheck**

**Описание:** Предназначен для групповых проверок от выделенных токенов.

**Ссылки** Roll20 \|\|\| GitHub \|\|\|

#### 🌎**GroupInitiative**

**Описание:** _**This script adds a command for rapidly adding large groups of tokens into the turn order. As of v0.3, there are quite a few configuration commands \(see Commands below\). The basic process followed by the script is this: Remove any tokens that already have a turn. For all selected tokens, find the character they represent. For each character, figure out the initiative bonus. Initiative bonuses are calculated using Bonus Stat Groups. Each Bonus Stat Group is a collection of Attribute Names and Stat Adjustment operations to apply to them. Bonus Stat Groups are evaluated in order. The first one that produces a bonus is used. If a character doesn't have one of the Attribute Names listed in the Bonus Stat Group \(or that Attribute Name does not contain a valid number\), that group does not produce a bonus. The selected Roller is used to generate the rolls for each token, with the bonus for its character applied \(or 0 if it doesn't have a character\). Add each token to the turn order.**_ 

**Ссылки** \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/blob/master/GroupInitiative/GroupInitiative.js) [nothing](https://wiki.roll20.net/Script:Group_Initiative) [https://github.com/Roll20/roll20-api-scripts/tree/master/GroupInitiative](https://github.com/Roll20/roll20-api-scripts/tree/master/GroupInitiative)

#### 🌎**Carry Tokens**

**Описание:** _**This script allows you to set tokens to carry each other, either as a character holding an item, or as a mount carrying a rider. The carried token will always set its position to that of the carrying token. When you move the carrier around, the carried token will follow.**_

**Ссылки** \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/CarryTokens) \|\|\| [Roll20 forums](https://app.roll20.net/forum/post/5503029/script-carry-tokens)

#### 🌎**TokenNameNumber**

**Описание:** Automatic Numbering of tokens with special placeholder.

**Ссылки** [Roll20](https://github.com/Roll20/roll20-api-scripts/tree/master/TokenNameNumber) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/TokenNameNumber) \|\|\| [Roll20 wiki](https://wiki.roll20.net/Script:Token_Name_Number) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/blob/master/TokenNameNumber/TokenNameNumber.js)

#### **Flight**

**Описание:** Flight creates the API command !fly, which sets statusmarkers on the selected tokens to represent how high they are flying.

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:Flight) [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/Flight)

#### **TokenStatus**

**Описание:**

**Ссылки** [Roll20 forum](https://app.roll20.net/forum/post/3408798/slug}) \|\|\| [GitHub backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/TokenStatus.js)

#### **TurnMarker**

**Описание:** Round counter and a moving marker that shows who's turn it is.

**Ссылки** \[Wiki Roll20\] \([https://wiki.roll20.net/Script:Turn\_Marker](https://wiki.roll20.net/Script:Turn_Marker)\) \|\|\| [GitHub](https://github.com/shdwjk/Roll20API/blob/master/TurnMarker1/TurnMarker1.js) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/931415/script-turnmarker1-turn-token-highlight-round-counter-player-advance-command-turn-announce-plus-spiny-graphics-if-you-want-them/?pagenum=1) \|\|\|[Roll20 forum updated](https://app.roll20.net/forum/post/3963829/script-update-turnmarker1-now-with-gm-activated-ping-pulling/?pagenum=1) [Roll20 wiki](https://wiki.roll20.net/Script:Turn_Marker)

#### **Tracker Jacker**

**Описание:** TrackerJacker is a cousin to TurnMarker made by The Aaron. Its logic however is quite different, and more rigid in function to simplify the most common use-cases. Like TurnMarker, it uses a graphic image that follows beneath tokens to indicate who's turn it is. The only animation TrackerJacker supports is the spinning graphic which is on by default \(to disable it you'd need to edit a simple script flag\). The real function however of TrackerJacker' is to track statuses and durations with an easily accessible graphical interface that's intuitive.

**Ссылки** [Roll20 Wiki](https://wiki.roll20.net/Script:TrackerJacker) \|\|\| [GitHub](https://github.com/FGKenL/Roll20_API_Scripts/blob/master/trackerjacker.js) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/2362024/script-trackerjacker-turn-tracker-combined-with-status-slash-marker-tracking/?pageforid=2362024#post-2362024) \|\|\| GitHub backup [Roll20 forum](https://app.roll20.net/forum/post/4868557/traker-jacker-dot-dot-dot)

#### **Table Export and Import**

**Описание:**

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:Table_Export)\|\|\| [Roll20 forum](https://app.roll20.net/forum/post/1144568/script-tableexport-a-script-for-exporting-and-importing-rollable-tables-between-accounts) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/TableExport)

#### 🌎**Rollable Table Macros**

**Описание:** _**This is a simple script that allows you to execute chat commands with a rollable table. Basically, this script will select an item on a table as normal, but instead of displaying the result as a rollable table result, it enters the title of the table item into the chat. This allows you to use things like inline rolls and macros.**_

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:Rollable_Table_Macros) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/RollableTableMacros)

#### 🌎**MapChange**

**Описание:** _**Provides an easy and user friendly way to move players between maps.**_

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:MapChange) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/MapChange) [Roll20 forum](https://app.roll20.net/forum/post/3448591/slug})

#### **Roof Removal**

**Описание:**

**Ссылки** \|\|\| [GitHub](https://gist.github.com/Bastlifa/1b5f78939ba5b40721e930567f77f033)\|\|\| [Roll20 forum](https://app.roll20.net/forum/post/5620795/roof-removal-script/)

#### 🌎**Page Navigator 2.x**

**Описание:** _**Page navigator simplifies moving your players from map to map and allows them to interact with destinations on the map directly by moving their token to the destination. Player movement between maps regardless of the trigger is controlled by the GM unless the GM has defined a page or pages as player accessible, or has turned off the player movement restriction. See below for a complete guide on using the script.**_

**Ссылки** [Roll20 Wiki](https://wiki.roll20.net/Script:Page_Navigator) \|\|\| [Github](https://github.com/Roll20/roll20-api-scripts/tree/master/Page%20Navigator)\|\|\| [Roll20 forum](https://app.roll20.net/forum/post/4905683/script-update-page-navigator-v2-dot-x)

#### 🌎**Walls**

**Описание:** Builds dynamic lighting walls with an exported SVG path file.

**Ссылки** \|\|\| [GitHub](https://github.com/shdwjk/Roll20API/blob/master/Walls/Walls.js) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/1337473/script-walls-svg-path-importer-for-dynamic-lighting-revisited#post-1338906) \|\|\|

#### 🌎**EasyExperience**

**Описание:** _**Make awarding XP simple. EasyExperience stores XP awards in a script created character and allows you to easily keep track of how much xp your players have earned throughout a session. At the end of the session awarding all that xp is as easy as typing "!xp session". You can also award xp directly to a specific character or group of characters for those moments when one player/character has distinguished themselves. The Script will also automatically send alerts when players level up based on what you set the thresholds at \(The script comes with preloaded settings for all official pathfinder progressions \(slow, medium, fast, and PFS\) as well as the standard D&D 5e progression. If you use a different progression, simply edit the threshold values stored in the script created ExperienceThresholds character to suit your needs.**_

**Ссылки** \|\|\| [Roll20 wiki](https://wiki.roll20.net/Script:EasyExperience) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/EasyExperience)

#### 🌎**Terrain Generator**

**Описание:** Automates creation of outdoor maps \(forests, deserts, etc.\)

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:Terrain_Generator) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/Terrain%20Generator) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/4554521/script-terrain-generator) \|\|\|

#### 🌎**Aura/Tint HealthColors**

**Описание:**

**Ссылки** [GitHub](https://github.com/dxwarlock/Roll20/blob/master/API/DND/Aura) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/2139713/script-aura-slash-tint-healthcolor/?pagenum=4)

#### 🌎**It's a Trap**

**Описание:** This is a script that allows GMs to quickly and very easily set up traps, secret doors, and other hidden things on the GM layer, and detect when tokens on the objects layer move over them. This trap detection even works for tokens moving by waypoints. **To set up traps:** Place the token for your trap on the GM layer. Give it the cobweb status marker. By default, traps will only affect characters on the ground \(ones that don't have a wing or angel status marker\). To have a trap also affect flying characters, give it the wing or angel status marker. By default, trap tokens won't appear when they are activated. If you would like the trap to become visible to the players when it is activated, give it the bleeding eye status marker. **To set off traps:**  If a token moves across a trap at ANY point during its movement, the trap will be activated!

**Ссылки** [Roll20 wiki](https://wiki.roll20.net/Script:It's_a_Trap) \|\|\| [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/Its%20A%20Trap) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/3280344/script-its-a-trap-v2-dot-3)

#### 🌎Marching Order

**Описание:** _**This script allows you to select tokens and tell them to follow each other in some specified marching order.**_

**Ссылки** GitHub \|\|\| Roll20 forum

#### Tongues

[Roll20 Forum](https://app.roll20.net/forum/post/5633578/script-tongues-a-simple-language-script) \| [github](https://github.com/sarkamist/Tongues-Script/blob/master/README.md)

#### 🌎**Welcome Package**

**Описание:**

**Ссылки** GitHub \|\|\| Roll20 forum

#### 🌎**Search**

**Описание:** Search provides full text searching across handouts and characters \(including attributes\). Search uses an Okapi BM25F+ search engine with Porter stemming and stop word removal to provide fast results after building initial indexes. Index construction occurs at API startup, in the background. The GM is notified when indexing is finished. Indexing can take a few minutes, but won't slow down any other processes due to a great deal of deferring of processing. Search respects permissions on handouts and characters. GMs can search on all things, where as players can only search based on what they can see. Seeing a handout allows a player to search on it's name and notes fields. Seeing a character allows a player to search on it's name and bio fields. Controlling a character allows searching on it's attributes as well. Only GMs can search on gmnotes.

**Ссылки** GitHub \|\|\| Roll20 forum

#### **Bloodied and Dead Status Markers**

**Описание:** _**Bloodied and Dead Status Markers automatically adds the Red marker to represent the "bloodied" state for any tokens that drop below half their health, and the "dead" marker for any that drop to 0 or less. It's assumed that health is stored in Bar 1.**_ 

**ДЛЯ ИСПОЛЬЗОВАНИЯ НЕОБХОДИМО МОДИФИЦИРОВАТЬ**

**Ссылки** [GitHub original](https://github.com/Roll20/roll20-api-scripts/tree/master/Bloodied%20and%20Dead%20Status%20Markers) \|\|\| [Roll20 forum - Extended version](https://app.roll20.net/forum/post/725584/slug}) \|\|\| [Roll20 wiki - Original](https://wiki.roll20.net/Script:Bloodied_and_Dead_Status_Markers) [https://github.com/Roll20/roll20-api-scripts/tree/master/Bloodied and Dead Status Markers](https://github.com/Roll20/roll20-api-scripts/tree/master/Bloodied%20and%20Dead%20Status%20Markers)

#### 🌎**MonsterHitDice**

**Описание:** Automatically fills in the hit points for a characters dragged onto the table top. The default token for the character needs to represent that creature but should not have the bar used for hit points linked to an attribute. Use the settings below to configure the script for how you calculate hit points in your game. There are several sheets for which the configurations are built in or you can use the more detailed settings. Details about each setting are included along with it. There are no in-game commands for this script as it is purely responsive to the event of adding a token to the table top.

**Ссылки** [GitHub](https://github.com/Roll20/roll20-api-scripts/tree/master/MonsterHitDice) \|\|\| Roll20 forum \|\|\| [Roll20 wiki](https://wiki.roll20.net/Script:Monster_Hit_Dice)

#### \[Script\] Hexploration

[Roll20 forum](https://app.roll20.net/forum/post/6179141/script-hexploration)

#### Page Navigator V2.X

[Roll20 forum](https://app.roll20.net/forum/post/6057767/script-update-page-navigator-v2-dot-x-thread-2)

#### Apply Damage

[Github](https://raw.githubusercontent.com/joesinghaus/roll20-scripts/master/ApplyDamage.js) \|\|\| [backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/applydamage.js)

#### TOKEN\_CONCENTRATING\_STATUS\_MARKER

```text
var TOKEN_CONCENTRATING_STATUS_MARKER = "status_" + "overdrive";

on("change:graphic:bar1_value", function(obj, prev) {
    if (obj.get(TOKEN_CONCENTRATING_STATUS_MARKER)) {
        var playerPage = Campaign().get("playerpageid");
        var tokenPage = obj.get("_pageid");
        if (prev["bar1_value"] > obj.get("bar1_value")) {
            var final_conc_DC = 10;
            var calc_conc_DC = (prev["bar1_value"] - obj.get("bar1_value")) / 2;
            if (calc_conc_DC > final_conc_DC) {
                final_conc_DC = Math.floor(calc_conc_DC);
            }

            sendChat("TokenDamage", "/w gm @{Macros|output_option} &{template:5e-shaped} {{character_name=@{Macros|character_name}}} @{Macros|show_character_name} {{title=Concentration Check}} {{action=1}}  @{Macros|hide_gm_info} {{@{Macros|shaped_d20}=1}} {{saving_throw_vs_ability=CONSTITUTION}} {{saving_throw_dc=" +final_conc_DC + "}} {{has_saving_throw_damage=0}} {{has_saving_throw_damage=0}}}} ");        }
    }
});
```

[ROLL20 FORUM](https://app.roll20.net/forum/post/5913265/new-pro-any-tips)

#### **Alter Bars**

**Описание:** _**This simple API script allows you and your players to use a macro to adjust the value of the three bars of a token. The script has been updated to use a more aesthetically pleasing emote and eventually support triggering the FX and Aura changes from the Aura/Tint HealthColor written by DXWarlock. I have provided several macros below to highlight possible uses for this script and a list of the variables the GM can set within the script itself \(some day I'll get a fancy chat menu and one click install\).**_

**Ссылки** [GitHub](https://gist.github.com/Sky-Captain-13/a503c35914644e6f885f170eaeedc705) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/4741812/alterbars-2-dot-0-new-and-improved/?pagenum=1) \([https://gist.github.com/Sky-Captain-13/a503c35914644e6f885f170eaeedc705](https://gist.github.com/Sky-Captain-13/a503c35914644e6f885f170eaeedc705)\)

#### **HazInspiration**

**Описание:**

**Ссылки** GitHub \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/5579750/help-5e-script-inspiration-tracking/?pageforid=5583293#post-5583293)

#### **Recursive Tables**

**Описание:** _**RecursiveTable provides a way to expand the results of Rollable Tables which have inline rolls within them. Now with options and support for whispering Roll Templates. When using Rolltemplates, your message must have at least one  is first.**_

**Ссылки** \[Roll20 forum\] \([https://app.roll20.net/forum/post/2845333/script-recursivetables-expands-inline-rolls-in-rollable-table-results/?pageforid=2845333\#post-2845333](https://app.roll20.net/forum/post/2845333/script-recursivetables-expands-inline-rolls-in-rollable-table-results/?pageforid=2845333#post-2845333)\) [https://app.roll20.net/forum/post/4954818/script-update-recursivetables-now-with-direct-support-for-whispering-roll-templates-and-more](https://app.roll20.net/forum/post/4954818/script-update-recursivetables-now-with-direct-support-for-whispering-roll-templates-and-more)

#### **Status Track**

**Описание:**

**Ссылки** GitHub \|\|\| Roll20 forum [Roll20 forum](https://app.roll20.net/forum/permalink/3346527/)

#### **Token Status Manager**

**Описание:** _**This script automatically adds status markers based on the bar values. The script can be configured to track any of the three bars, set any of the status markers for any ratio between 0 and 1. The script can manage multiple bars/tokens in a single instance. The example below watches bar 1 and sets the red marker when the value is &lt;= 50% and then sets the dead marker when the value is &lt;= 0.**_ **Ссылки** [Roll20 wiki - API](https://wiki.roll20.net/API:Advanced_Examples)

#### 🌎**Areas of Effect**

**Описание:** _**When the script is installed, it creates a macro for all GMs of the game to display its main menu in the chat. This macro is also visible and usable by all players in the game, but only GMs are allowed to save new areas of effect. Players can only spawn them.**_

**Ссылки** [GitHub original](https://github.com/Roll20/roll20-api-scripts/tree/master/AreasOfEffect) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/4041327/slug})

#### Automatic Death Tracking

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/Automatic%20Death%20Tracking.js)

#### MessageoftheDay

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/MessageoftheDay.js)

#### Turn Timer

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/turntimer.js)

#### Is GM

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/isgm.js)

#### Apply Damage

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/applydamage.js)

#### TableExport

[Backup](https://raw.githubusercontent.com/palikhov/palant_roll20_setup/master/tableexport.js)

#### Import macros between campaigns

[Roll20 forum](https://app.roll20.net/forum/post/4606812/import-macros-between-campaigns/?pageforid=4607824#post-4607824)

#### _**5e OGL NPC Action Damage Autoroller**_

[https://app.roll20.net/forum/post/5685463/scriptlet-5e-ogl-npc-action-damage-autoroller](https://app.roll20.net/forum/post/5685463/scriptlet-5e-ogl-npc-action-damage-autoroller)

### **Скрипты для OGL**

#### 🌎**5th Edition OGL by Roll20 Companion**

**Описание:** _**The Companion currently supports Ammo Tracking, Automatic NPC Tokens, Automatic Death Save Tracking, and Automatic Spell Slot Tracking.**_

**Ссылки** **Ссылки**: \|\|\| GitHub Roll20 forum

#### **TokenAction**

**Описание:**

**Ссылки**  
[Github](https://raw.githubusercontent.com/git-kor-av/TokenAction/master/TokenAction.js) \|\|\| [Roll20 forum](https://app.roll20.net/forum/post/5608775/script-update-tokenaction-creator-for-5e-ogl-sheet-version-2-dot-0) \|\|\| [Github David's fork](https://raw.githubusercontent.com/GrumpyOldDM/TokenActionEnhanced/master/tokenAction2.0.js)

#### **Token actions**

**Описание:**

**Ссылки** \|\|\| [Roll 20 forum](https://app.roll20.net/forum/post/5608775/script-update-tokenaction-creator-for-5e-ogl-sheet-version-2-dot-0/?pagenum=2) \|\|\| [Backup link here](https://github.com/palikhov/palant_roll20_setup/blob/master/5eOGL-ta.js)

#### **5eOGL-books**

**Описание:**

**Ссылки** Pastebin\|\|\| [Roll20 forum](https://app.roll20.net/forum/post/5671448/script-5e-ogl-automated-token-ability-spellbook-attackbook-actionbook-etc#post-5740063) \|\|\| [Backup link here](https://github.com/palikhov/palant_roll20_setup/blob/master/5eOGL-books.js)

#### **5eOGL-statblock**

**Описание:**

**Ссылки** [Pastebin](https://pastebin.com/raw/rJMSnGHn)\|\|\| [Roll20 forum](https://app.roll20.net/forum/post/5740240/script-5e-ogl-statblock) \|\|\| [Backup link here](https://github.com/palikhov/palant_roll20_setup/blob/master/5eOGL-statblock.js)

#### **5eOGL statblock**

#### **5e OGL Resource Tracker**

Once the script is installed it will look for a trait output to chat, looks for a resource with the same name, and if it exists reduces the number of uses by 1 [https://app.roll20.net/forum/post/5616244/scriptlet-5e-ogl-resource-tracker](https://app.roll20.net/forum/post/5616244/scriptlet-5e-ogl-resource-tracker)

#### **List and Toggle Equipment**

[https://app.roll20.net/forum/post/5447629/api-list-and-toggle-equipment-5e-ogl](https://app.roll20.net/forum/post/5447629/api-list-and-toggle-equipment-5e-ogl) [https://gist.github.com/oukag/bf92a517e7dfb2f1ce94b0e46e695d92](https://gist.github.com/oukag/bf92a517e7dfb2f1ce94b0e46e695d92)

#### **getAPL**

getAPL allows a DM to select PC tokens and auto calculate the party APL and strength for Adventure League Games .

[https://app.roll20.net/forum/post/5691994/script-getapl-average-party-level-apl-and-assigning-party-strength-for-5e-al-games](https://app.roll20.net/forum/post/5691994/script-getapl-average-party-level-apl-and-assigning-party-strength-for-5e-al-games) [https://github.com/GrumpyOldDM/getAPL](https://github.com/GrumpyOldDM/getAPL)

### **Shaped**

#### 🌎**Shaped Script**

**Описание:** _**This is a script designed for use with the API on Roll20. This script is specifically designed to provide services and enhancements for the 5e Shaped Sheet by Kryx.**_

**Ссылки** [Github original](https://github.com/mlenser/roll20-api-scripts/tree/master/5eShapedScript)

### Dependent API Scripts

* Vector Math
* Path Math
* MatrixMath
* HTML Builder

### Другие скрипты

Chultan Calendar \(Original Script Here: [https://github.com/Ciorstaidh/Roll20-API](https://github.com/Ciorstaidh/Roll20-API) -- see below for my Chultan weather modified script\)

#### **Triggered SFX**

[https://app.roll20.net/forum/post/2459136/slug}](https://app.roll20.net/forum/post/2459136/slug})

#### **Tongues**

[https://app.roll20.net/forum/post/5633578/slug}\#post-5695301](https://app.roll20.net/forum/post/5633578/slug}#post-5695301) [https://github.com/sarkamist/Tongues-Script](https://github.com/sarkamist/Tongues-Script)

#### **TokenSwapper**

[https://app.roll20.net/forum/post/3990127/slug}](https://app.roll20.net/forum/post/3990127/slug})

#### **Oh the weather outside is frightful! - Weather script.**

[https://app.roll20.net/forum/post/492726/slug}](https://app.roll20.net/forum/post/492726/slug})

#### **Event Tracking for The Aaron's Mystara Calendar Script**

[https://app.roll20.net/forum/post/2632578/slug}](https://app.roll20.net/forum/post/2632578/slug})

#### **Realmspace planetary orbits**

[https://app.roll20.net/forum/post/5709970/script-realmspace-planetary-orbits](https://app.roll20.net/forum/post/5709970/script-realmspace-planetary-orbits) [https://gist.github.com/SplenectomY/18d1aa4c76cd31749e5c95e9303ef910](https://gist.github.com/SplenectomY/18d1aa4c76cd31749e5c95e9303ef910)

#### **ChatSetAttr**

This is a variant on GroupSetAttr, from which I stole all the things I could understand and recreated the rest for myself, with a few extra features. Its basic principle is simple: you can supply a list of characters \(in multiple ways\) and a list of attributes and values, and for all characters in the list the attributes will be set to the values \(and created if they did not exist before\).

[https://app.roll20.net/forum/post/3737514/script-chatsetattr-set-character-attributes-via-chat-messages](https://app.roll20.net/forum/post/3737514/script-chatsetattr-set-character-attributes-via-chat-messages) [https://github.com/joesinghaus/roll20-api-scripts/blob/master/ChatSetAttr/ChatSetAttr.js](https://github.com/joesinghaus/roll20-api-scripts/blob/master/ChatSetAttr/ChatSetAttr.js)

#### **AOE Template Generator**

[https://app.roll20.net/forum/post/5824771/aoe-template-generator](https://app.roll20.net/forum/post/5824771/aoe-template-generator)

#### **Druid Shifting Script**

[https://app.roll20.net/forum/post/5345882/druid-shifting-script-5e-ogl](https://app.roll20.net/forum/post/5345882/druid-shifting-script-5e-ogl)

#### 🌎**Roll20 Audio Master**

[https://app.roll20.net/forum/post/4259010/script-roll20-audio-master-hear-the-dice-hear-the-action/?pageforid=5569465\#post-5569465](https://app.roll20.net/forum/post/4259010/script-roll20-audio-master-hear-the-dice-hear-the-action/?pageforid=5569465#post-5569465)

#### **Soundboard macro generator for \[Roll20 Audio Manager\]**

[https://app.roll20.net/forum/post/4866997/soundboard-macro-generator-for-roll20-audio-manager/?pageforid=4866997\#post-4866997](https://app.roll20.net/forum/post/4866997/soundboard-macro-generator-for-roll20-audio-manager/?pageforid=4866997#post-4866997)

#### Extension to OGL 5e character sheet \(Resource Tracking\)

[Roll20 forum](https://app.roll20.net/forum/post/6076743/extension-to-ogl-5e-character-sheet-resource-tracking) [Gist](https://gist.github.com/anonymous/8523d02095726dafe336653006ef7262)

#### 

[https://app.roll20.net/forum/post/5950228/script-cashmaster-5e-a-simple-script-to-manage-a-partys-money\#post-6072972](https://app.roll20.net/forum/post/5950228/script-cashmaster-5e-a-simple-script-to-manage-a-partys-money#post-6072972)

