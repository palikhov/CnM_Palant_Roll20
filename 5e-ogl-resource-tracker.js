var ResourceTracker = ResourceTracker || (function () {
    'use strict';

    function ch(c) {
        var entities = {
            '<' : 'lt',
            '>' : 'gt',
            "'" : '#39',
            '@' : '#64',
            '{' : '#123',
            '|' : '#124',
            '}' : '#125',
            '[' : '#91',
            ']' : '#93',
            '"' : 'quot',
            '-' : 'mdash',
            ' ' : 'nbsp'
        };

        if(_.has(entities,c) ){
            return ('&'+entities[c]+';');
        }
        return '';
    }

    function sendWhisper(who, message) {
        sendChat("Resource Tracker", '/w "' + who + '" ' + message);
    }

    function findAttribute(character, name) {
        var resourceName = name;
        var attribute = findObjs({ type:'attribute', characterid:character.id, name: name}, {caseInsensitive: true})[0];
        if (attribute) {
            resourceName = getAttrByName(character.id, attribute.get("name") + "_name");
        }
        else {
            var resources = filterObjs(function(obj) {
                if(obj.get("type") === "attribute" && obj.get("characterid") === character.id && (obj.get("current") + "").toLowerCase() === name.toLowerCase() && obj.get("name").indexOf("resource") > -1) return true;
                else return false;
            });
            if (resources[0]) {
                var resname = resources[0].get("name").replace("_name","");
                var ammoid = findObjs({type: 'attribute', characterid: character.id, name: resname}, {caseInsensitive: true})[0].id;
                attribute = findObjs({type: 'attribute', characterid: character.id, id: ammoid}, {caseInsensitive: true})[0];
            }
        }
        return [ resourceName, attribute ];
    }

    function handleAdjustment(character, attribute, adjustment) {
        var rtn = parseInt(attribute.get("current")) + adjustment;
        attribute.set({current: rtn});
        var resourceItemId = getAttrByName(character.id, attribute.get("name") + "_itemid");
        if (resourceItemId) {
            var resourceItem =  findObjs({type: 'attribute', characterid: character.id, name: "repeating_inventory_" + resourceItemId + "_itemcount"}, {caseInsensitive: true})[0];
            if (resourceItem) {
                resourceItem.setWithWorker({current: rtn});
            }
        }
        return rtn;
    }

    function processInlinerolls(msg) {
        if (_.has(msg, 'inlinerolls')) {
            return _.chain(msg.inlinerolls)
                    .reduce(function(previous, current, index) {
                        previous['$[[' + index + ']]'] = current.results.total || 0;
                        return previous;
                    },{})
                    .reduce(function(previous, current, index) {
                        return previous.replace(index, current);
                    }, msg.content)
                    .value();
        } else {
            return msg.content;
        }
    }

    function handleChat(msg) {
        if (msg.type === "api") {
            var content = processInlinerolls(msg);
            var params = content.substring(1).splitArgs(" ");
            var command = params[0].toLowerCase();
            if (command === "resource") {
                // should be !resouce name modifier
                if (params.length === 4) {
                    var characters = findObjs({ type: 'character', name: params[1]});
                    if (characters && characters.length > 0) {
                        if (characters.length == 1)
                        {
                            var character = characters[0];
                            if (playerIsGM(msg.playerid) || _.contains(character.get('controlledby').split(','), msg.playerid) || _.contains(character.get('controlledby').split(','),'all') ) {
                                var [name, attribute] = findAttribute(character, params[2]);
                                if (attribute) {
                                    var adjustment = parseInt(params[3]);
                                    if (adjustment) {
                                        var newValue = handleAdjustment(character, attribute, adjustment);
                                        if(newValue < 0) {
                                            if(getAttrByName(character.id, "wtype") === "") {
                                                sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container' style='border-radius: 0px;'><div class='sheet-label' style='margin-top:5px;'><span style='display:block; color:red;'>OUT OF RESOURCE: " + name + "</span></div></div></div>");
                                            }
                                            else {
                                                sendChat(msg.who, "/w gm <div class='sheet-rolltemplate-desc'><div class='sheet-desc' style='border-radius: 0px;'><div class='sheet-label' style='margin-top:5px;'><span style='display:block; color:red;'>OUT OF RESOURCEL :" + name + "</span></div></div></div>");
                                            }
                                        }
                                        else if(state.FifthEditionOGLbyRoll20.ammotracking != "quiet") {
                                            if(getAttrByName(character.id, "wtype") === "") {
                                                sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container' style='border-radius: 0px;'><div class='sheet-label' style='margin-top:5px;'><span style='display:block;'>" + name + ": " + newValue + " LEFT</span></div></div></div>");
                                            }
                                            else {
                                                sendChat(msg.who, "/w gm <div class='sheet-rolltemplate-desc'><div class='sheet-desc' style='border-radius: 0px;'><div class='sheet-label' style='margin-top:5px;'><span style='display:block;'>" + name + ": " + newValue + " LEFT</span></div></div></div>");
                                            }
                                        }
                                    }
                                    else {
                                        sendWhisper(msg.who, "Invalid adjustment value: " + params[3]);
                                    }
                                }
                                else {
                                    sendWhisper(msg.who, "Could not find attribute: " + params[2]);
                                }
                            }
                            else {
                                sendWhisper(msg.who, "You do not control the specified character: " + params[1]);
                            }
                        }
                        else {
                            sendWhisper(msg.who, "Found more than one character that matches " + params[1]);
                        }
                    }
                    else {
                        sendWhisper(msg.who, "Could not find character " + params[1]);
                    }

                }
                else {
                    sendWhisper(msg.who, "Usage: !resource "+ch('<')+"character name"+ch('>')+" "+ch('<')+"resouce name"+ch('>')+" "+ch('<')+"modifier"+ch('>')+". ie: !resource Ki -2");
                }
            }
        }
    }

     function RegisterEventHandlers() {
        on('chat:message', handleChat);
    }

    return {
        RegisterEventHandlers: RegisterEventHandlers
    };
}());


on("ready",function(){
    'use strict';

    ResourceTracker.RegisterEventHandlers();
});
