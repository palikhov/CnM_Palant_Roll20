/**
 * Inventory Tracker for 5e OGL character sheet
 *
 * Allows for quick access to the equipped items of a character.
 *
 * Commands:
 *      !equipShow [--item|<ITEM_NAME> [--charid|<CHARACTER_ID>]]
 *          Shows the equipped item(s) for the character that belongs to the selected token.
 *              If no arguments are given, displays all equipped items of the character representing the selected token.
 *
 *              If --item|<ITEM_NAME> is given, will display the equipped status for the given item.
 *              If --charid|<CHARACTER_ID> is given, will attempt to find the item on the character with the given ID.
 *
 *          The name of the item(s) in the chat allow a player who can control that character to toggle the equipment
 *          status for that particular item utilizing the !equipToggle command.
 *
 *      !equipToggle --charid|<CHARACTER_ID> --item|<ITEM_NAME>
 *          Toggles the equipped status for the given item and outputs the new status. Clicking on the item name in the
 *          output will toggle the equipment status again. Only players who can control the character can use this command.
 *
 */

var InventoryTracker5eOGL = InventoryTracker5eOGL ||(function() {
    'use strict';
    var scriptName = '5e OGL Inventory Tracker',
        version = '0.0.4',

        ITEM = {
            // The item attribute template is:
            // ITEM_PREFIX ROW_ID ATTR_SUFFIX
            PREFIX : 'repeating_inventory_',
            EQUIPPED_SUFFIX : '_equipped',      // Actually determines whether the item is equipped in regards to other attributes (AC, modifiers, etc.)
            NAME_SUFFIX : '_itemname',

            // These have to be the string equivalent, otherwise the sheet worker will not pick up the change
            EQUIPPED : '1',
            UNEQUIPPED : '0',

            getRowIdFromAttribute : function(attrName) {
                var regex = new RegExp(this.PREFIX + '(.+?)(?:' + this.NAME_SUFFIX + '|' + this.EQUIPPED_SUFFIX + ')');
                return regex.exec(attrName) ? regex.exec(attrName)[1] : '';
            },

            isEquipped : function(equippedAttr) {
                // if the current status is blank, it means that the equipped status of the item has not been updated
                // since being added to the inventory.
                return equippedAttr && (equippedAttr.get('current') === this.EQUIPPED || equippedAttr.get('current') === '');
            },

            toggleEquip : function(charId, rowId) {
                var equipped = this.findEquippedForCharacterAndRowId(charId, rowId);
                equipped.setWithWorker({current: this.isEquipped(equipped) ? this.UNEQUIPPED : this.EQUIPPED});
                return this.getEquippedStatusForAttr(equipped);
            },

            getEquippedStatusForAttr : function(equipped) {
                return this.isEquipped(equipped) ? 'equipped' : 'unequipped';
            },

            getEquippedStatusForCharacterAndRow : function(charId, rowId) {
                return this.getEquippedStatusForAttr(this.findEquippedForCharacterAndRowId(charId, rowId));
            },

            findForCharacterAndRowIdAndSuffix : function(charId, rowId, suffix) {
                var existing = findObjs({
                    _type: 'attribute',
                    characterid: charId,
                    name: this.PREFIX + rowId + suffix
                })[0];

                return existing ? existing : createObj('attribute', {
                    characterid: charId,
                    name: this.PREFIX + rowId + suffix,
                    current: ''
                });
            },

            findNameForCharacterAndRowId : function(charId, rowId) {
                var nameAttr = this.findForCharacterAndRowIdAndSuffix(charId, rowId, this.NAME_SUFFIX);
                return nameAttr ? nameAttr.get('current') : '';
            },

            findEquippedForCharacterAndRowId : function(charId, rowId) {
                return this.findForCharacterAndRowIdAndSuffix(charId, rowId, this.EQUIPPED_SUFFIX);
            }
        },

        playerCanControlCharacter = function(charId, playerId) {
            var character = getObj('character', charId);
            var ctrl = character ? character.get('controlledby') : '';
            return playerIsGM(playerId) || ctrl.indexOf('all') !== -1 || ctrl.indexOf(playerId) !== -1;
        },

        findCharacterIdForToken = function(tokenId) {
            var token = getObj('graphic', tokenId);
            return token.get('represents');
        },

        filterItemAttrsForCharacterAndSuffixAndValue = function(charId, suffix, value){
            return filterObjs(function(obj){
                if(obj.get('type') === 'attribute'
                    && obj.get('characterid') === charId
                    && obj.get('name').indexOf(ITEM.PREFIX) !== -1 && obj.get('name').indexOf(suffix) !== -1
                    && obj.get('current') === value
                ) {
                    return obj;
                }
            });
        },

        findEquippedItemsForCharacter = function(charId){
            return filterItemAttrsForCharacterAndSuffixAndValue(charId, ITEM.EQUIPPED_SUFFIX, ITEM.EQUIPPED)
        },

        findRowIdForCharacterAndItemName = function(charId, itemName) {
            var nameAttr = filterItemAttrsForCharacterAndSuffixAndValue(charId, ITEM.NAME_SUFFIX, itemName)[0];
            return nameAttr ? ITEM.getRowIdFromAttribute(nameAttr.get('name')) : null;
        },

        STYLES = {
            DIV : 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"',
            HEAD : 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"',
            SUBHEAD : 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"',
            ARROW : 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"',
            ASTYLE : 'style="font-size: 12px; color: black; border: 0; margin 0px; background: none; padding: 0;"'
        },

        outputEquippedItemsForCharacter = function(charId, sender) {
            var character = getObj('character', charId);
            var equippedItems = findEquippedItemsForCharacter(charId);
            var tableRowsStr = '';
            _.each(equippedItems, function(equipAttr){
                var rowId = ITEM.getRowIdFromAttribute(equipAttr.get('name'));
                var name = ITEM.findNameForCharacterAndRowId(equipAttr.get('characterid'), rowId);
                if(name) {
                    tableRowsStr = tableRowsStr +
                        '<tr><td>'+ getToggleHyperlink(charId, rowId, name) + '</td></tr>';
                } else {
                    log('Could not find the name of item with character ID [' + charId + '] and row ID [' + rowId + ']');
                }
            });
            var content;
            if(tableRowsStr) {
                content = '<table>' + tableRowsStr + '</table>';
            } else {
                content = '<div>None</div>';
            }
            sendChat(scriptName,
                '/w ' + sender + ' ' +
                '<div ' + STYLES.DIV + '>' +
                '<div ' + STYLES.HEAD + '>' + character.get('name') + '</div>' +
                '<div ' + STYLES.SUBHEAD + '>Equipped Items</div>' +
                '<div ' + STYLES.ARROW + '></div>' +
                content + '</div>'
            );
        },

        outputSingleItemForCharacter = function(charId, itemName, sender) {
            var rowId = findRowIdForCharacterAndItemName(charId, itemName);
            if(!rowId) {
                sendChat(scriptName, '/w ' + sender + ' No item with name \'' + itemName + '\' found for the character.');
                return;
            }
            var equippedState = ITEM.getEquippedStatusForCharacterAndRow(charId, rowId);
            sendChat(scriptName,
                '/w ' + sender + ' ' +
                '<div ' + STYLES.DIV + '>' +
                '<div ' + STYLES.HEAD + '>' + getObj('character', charId).get('name') + '</div>' +
                '<div ' + STYLES.ARROW + '></div>' +
                '<div>' + getToggleHyperlink(charId, rowId, itemName) + ' -> ' + equippedState + '</div>' +
                '</div>'
            );
        },

        getToggleHyperlink = function(charId, rowId, itemName) {
            return '<a ' + STYLES.ASTYLE + ' href="!equipToggle ' +
                '--charid|' + charId + ' ' +
                '--item|' + itemName +
                '">' + itemName + '</a>';
        },

        toggleEquipment = function(charId, itemName, sender) {
            var rowId = findRowIdForCharacterAndItemName(charId, itemName);
            if(!rowId) {
                sendChat(scriptName, '/w ' + sender + ' No item with name \'' + itemName + '\' found for the character.');
                return;
            }
            var equippedState = ITEM.toggleEquip(charId, rowId);
            sendChat(scriptName,
                '/w ' + sender + ' ' +
                '<div ' + STYLES.DIV + '>' +
                '<div ' + STYLES.HEAD + '>' + getObj('character', charId).get('name') + '</div>' +
                '<div ' + STYLES.ARROW + '></div>' +
                '<div>Has ' + equippedState + ' ' + getToggleHyperlink(charId, rowId, itemName) + '.</div>' +
                '</div>'
            );
        },

        handleInput = function(msg) {
            var sender = msg.who.split(' ')[0];
            var charId, itemName;
            var parseCommandsAndAssertValidCharacter = function() {
                _.each(msg.content.split('--'), function(str){
                    var split = str.split('|');
                    switch(split[0].toLowerCase()) {
                        case 'charid': charId = split[1].trim(); break;
                        case 'item': itemName = split[1].trim(); break;
                    }
                });

                // We need a valid character id to proceed
                if(!charId && msg.selected) {
                    charId = findCharacterIdForToken(msg.selected[0]._id);
                } else if (!charId && !msg.selected){
                    sendChat(scriptName, '/w ' + sender + ' No character ID found. Either selected the token or add --charid|CHARACTER_ID to the command');
                    return false;
                }
                return true;
            };

            if(msg.type === 'api' && msg.content.indexOf('!equipShow') !== -1) {
                if(msg.content.indexOf('--item|') !== -1) {
                    // set the item name and charId from the message
                    if(!parseCommandsAndAssertValidCharacter()) { return; }
                    outputSingleItemForCharacter(charId, itemName, sender);
                } else {
                    if (!msg.selected) {
                        sendChat(scriptName, '/w ' + sender + ' must have a character selected to use !equipShow');
                        return;
                    }
                    _.each(msg.selected, function (sel) {
                        var charId = findCharacterIdForToken(sel._id);
                        outputEquippedItemsForCharacter(charId, sender);
                    });
                }
            } else if (msg.type === 'api' && msg.content.indexOf('!equipToggle') !== -1) {
                // set the item name and charId from the message
                if(!parseCommandsAndAssertValidCharacter()) { return; }

                // We need the item's name to proceed
                if(!itemName) {
                    sendChat(scriptName, '/w ' + sender + ' No item provided. Add --item|ITEM_NAME to the command');
                    return;
                }

                if(!playerCanControlCharacter(charId, msg.playerid)) {
                    sendChat(scriptName, '/w ' + sender + ' You cannot modify the equipment of a character you do not control.');
                    return;
                }

                toggleEquipment(charId, itemName, sender);
            }
        },

        checkInstall = function(){
            log(scriptName + ' v' + version + ' -> Ready');
        },

        registerEventHandlers = function() {
            on('chat:message', handleInput);
        };

        return {
            CheckInstall: checkInstall,
            RegisterEventHandlers: registerEventHandlers
        };
    }());

on('ready', function(){
    'use strict';
    InventoryTracker5eOGL.CheckInstall();
    InventoryTracker5eOGL.RegisterEventHandlers();
});
