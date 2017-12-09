var getAPL = getAPL || (function() {
    'use strict';
    var version = 1.1,

    checkInstall = function() {
        log('getAPL v'+version+' is ready!  Designed for 5e AL APL Calculation');
    },
	
    isLevel = function(id) {
        var isLevel = findObjs({_type: 'attribute', _characterid: id, name: 'level'});
        if (_.isUndefined(isLevel[0])) {
            return false;
        } else {
            return isLevel[0].get('current');
        }
    },

	getSelectedCharacters = function(selected) {
        return _.chain(selected)
            .map(function(s){
                return getObj(s._type,s._id);
            })
            .reject(_.isUndefined)
            .map(function(c){
                return getObj('character', c.get('represents'));
            })
            .filter(_.identity)
            .value();        
    },

	round = function(value, decimals) {
		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	},
	
	partyStr = function(partySize, targetAPL, currAPL) {
		if ((partySize > 2 && partySize < 5) && currAPL < targetAPL) {
			return "Very weak"
		} else if ((partySize >= 3 && partySize <= 4) && currAPL == targetAPL) {
			return "Weak"
		} else if ((partySize >= 3 && partySize <= 4) && currAPL > targetAPL) {
			return "Average"
		} else if (partySize == 5 && currAPL < targetAPL) {
			return "Weak"
		} else if (partySize == 5 && currAPL == targetAPL) {
			return "Average"
		} else if (partySize == 5 && currAPL > targetAPL) {
			return "Strong"
		} else if ((partySize >= 6 && partySize <= 7) && currAPL < targetAPL) {
			return "Average"
		} else if ((partySize >= 6 && partySize <= 7) && currAPL == targetAPL) {
			return "Strong"
		} else if ((partySize >= 6 && partySize <= 7) && currAPL > targetAPL) {
			return "Very Strong"
		}
	},
	
	handleInput = function(msg) {
		var args;
		var char;
		var players;
		
		try {
		   players = msg.selected.length
		}
		catch (e) {
		   players = 0 
		}
		
		
		if (msg.type !== "api") {
			return;
		}
		args = msg.content.split(/\s+/);
		if(args[0].toLowerCase() == "!getapl") {
				char = _.uniq(getSelectedCharacters(msg.selected));
				var selTot = "0"
				_.each(char, function(a) {
					if (isLevel(a.id) !== "0") {
						selTot = Number(selTot) + Number(isLevel(a.id))
					}
				});
				if (players == 0) {
				    sendChat ("getAPL", "/w "+msg.who+" **No Tokens Selected, try again.**");
				} else if (players < 3 || players > 7) {
					sendChat ("getAPL", "/w "+msg.who+" **Not AL Legal** (less than 3 or more than 7) - please check your token selection and try again.")	
				} else if (_.range(1,21).includes(parseInt(args[1],10)||0)) {
					sendChat ("getAPL", "/w "+msg.who+" **"+players+"** Players at APL: **"+round(selTot/players,0)+"** (**"+partyStr(players,args[1],round(selTot/players,0))+"**) - Target APL: **"+args[1]+"**.")
				} else {
					sendChat ("getAPL", "/w "+msg.who+" **"+players+"** Players at APL: **"+round(selTot/players,0)+"**.<br /><em>Try adding your target APL to the end for more information such as:</em><br />**!getAPL 3**")
				}
		}
    },

    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };
}());


on('ready',function(){
	'use strict';
	
    getAPL.CheckInstall();
    getAPL.RegisterEventHandlers();
});
