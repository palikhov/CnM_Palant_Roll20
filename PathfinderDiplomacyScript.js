//Pathfinder Diplomacy Script v1.3 -- Last Updated 09/22/15
//Written by Brent T. contact: https://app.roll20.net/users/391008/brent-t
//GitHub: https://github.com/Cephalopd/Roll20ScriptsMASTER/blob/master/DiplomacyScript.js

(function(){

//This function checks that the selected token represents a character
var tokenCharacterCache = {};

var checkTokenRepresents = function (tokenID) {
    if(_.has(tokenCharacterCache,tokenID)){
        return tokenCharacterCache[tokenID].character;
    } 

    var token = getObj('graphic', tokenID );
    if(token) {
      var character = getObj('character', token.get('represents'));
    }

    tokenCharacterCache[tokenID]={
        token: token,
        character: character
    };
    return character
}
//This function gets the target attribute of the chracter represented by the selected token. 
//If the target attribute does not exist then it creates it and sets and returns the defalut value specified by the defaultAttributeValue function
var getCharacterAttribute = function (tokenID, target) {
    var character = checkTokenRepresents (tokenID);
    var attribute = findObjs({ type: 'attribute', characterid: character.id, name: target   })[0];
    if (attribute) {
    return attribute.get ('current')
    } else {
        createObj ("attribute", {name: target, current: defaultAttributeValue (target), characterid: character.id});
        return defaultAttributeValue (target)
    }
};

//This funciton stores the default values for new attributes that may get created
//Any attribute not specified as a case will have the default value
var defaultAttributeValue = function (input) {
   switch (input) {
        case 'Disposition':
            return 'Indifferent';
        break;
        case 'CHA-base':
            return 12;
        break;
        default:
            return 0;
    }
};

// This function sets the target attribute to the specified value on the character represented by the selected token when the script command is run
var setCharacterAttribute = function (tokenID, target, value) {
    var character = checkTokenRepresents(tokenID);
    var attribute = findObjs({ type: 'attribute', characterid: character.id, name: target   })[0];
    attribute.set('current', value)
};

//This function gets the diplomacy DC of the selected token
var diplomacyDCDisposition = function (start) {
    var dispositions = {'Hostile':25, 'Unfriendly':20, 'Indifferent':15, 'Friendly':10, 'Helpful':0};
    return ( _.has(dispositions, start) ? dispositions[start] : 15 );
};

//This function gets the CHA-mod of the character represented by the selected token.   
    var getCHAMod = function (tokenID) {
    var chaBaseValue = parseInt(getCharacterAttribute(tokenID, 'CHA-base'))
    var chaEnhanceValue = parseInt(getCharacterAttribute(tokenID, 'CHA-enhance'))
    var chaMiscValue = parseInt(getCharacterAttribute(tokenID, 'CHA-misc'))
    var chaTempValue = parseInt(getCharacterAttribute(tokenID, 'CHA-temp'))
    var chaDamageValue = parseInt(getCharacterAttribute(tokenID, 'CHA-damage'))
    var chaPenaltyValue = parseInt(getCharacterAttribute(tokenID, 'CHA-penalty'))
    var chaDrainValue = parseInt(getCharacterAttribute(tokenID, 'CHA-drain'))
    var chaModValue = ((Math.floor((chaBaseValue + chaEnhanceValue + chaMiscValue + chaDrainValue)/2)-5) + Math.floor(chaTempValue/2) - (Math.floor(Math.abs(chaDamageValue)/2)) - (Math.floor(Math.abs(chaPenaltyValue)/2)))
    return chaModValue
}

//This function returns the new disposition of a character based on the Pathfinder diplomacy rules.
var adjustedDisposition = function(start,steps){
  var dispositions = ['Hostile', 'Unfriendly', 'Indifferent', 'Friendly', 'Helpful'];
  return dispositions[ 
    Math.max(0,Math.min(dispositions.length-1,
      ( -1 !== _.indexOf(dispositions, start) ? _.indexOf(dispositions, start) : 2 )
      + (_.isNumber(steps) ? steps : 0)
    ))
  ];
};

//This section of the code handles the code input of the script.    
on("chat:message", function(msg) {
var cmdName = "!diplomacyCheck";
var msgTxt = msg.content;
var cmdNamePortion = msgTxt.slice (0, cmdName.length);

var diplomacyCheckScore = parseInt(msgTxt.slice (cmdName.length));
if (msg.type !== 'api' || !playerIsGM(msg.playerid)) return;
if (cmdNamePortion !== cmdName) return;

if (msg.selected) {
    
var selectedTokenID = msg.selected[0]._id

if (checkTokenRepresents (selectedTokenID)) {

var totalDC = diplomacyDCDisposition (getCharacterAttribute(selectedTokenID, 'Disposition')) + getCHAMod (selectedTokenID);

if (diplomacyCheckScore) {
    if (diplomacyCheckScore >= totalDC + 5) {
    var newDisposition = adjustedDisposition (getCharacterAttribute(selectedTokenID, 'Disposition'), 2);
    setCharacterAttribute (selectedTokenID, 'Disposition', newDisposition);
    sendChat (msg.who, "/w gm Diplomacy Check VERY Successful! Character is now " + getCharacterAttribute(selectedTokenID, 'Disposition'))
} else if (diplomacyCheckScore >= totalDC) {
    var newDisposition = adjustedDisposition (getCharacterAttribute(selectedTokenID, 'Disposition'), 1);
    setCharacterAttribute (selectedTokenID, 'Disposition', newDisposition)
    sendChat (msg.who, "/w gm Diplomacy Check Successful! Character is now " + getCharacterAttribute(selectedTokenID, 'Disposition'))
} else if (diplomacyCheckScore >= totalDC - 4) {
    sendChat (msg.who, "/w gm Diplomacy check is ineffectual. Character remains " + getCharacterAttribute(selectedTokenID, 'Disposition'))
} else {
    var newDisposition = adjustedDisposition (getCharacterAttribute(selectedTokenID, 'Disposition'), -1);
    setCharacterAttribute (selectedTokenID, 'Disposition', newDisposition);
    sendChat (msg.who, "/w gm Diplomacy Check Fails! Character is now " + getCharacterAttribute(selectedTokenID, 'Disposition'))
}
} else {
    var currentDisposition = getCharacterAttribute (selectedTokenID, 'Disposition')
    sendChat (msg.who, "/w gm Character is " + currentDisposition + " and has a base DC of " + totalDC)   
}
//END CODE FOR SELECTED TOKEN
} else {
    sendChat (msg.who, "/w gm Selected token does not represent a character")
}
}
else {
    sendChat(msg.who, "/w gm Please select a token")
}
});

}());
