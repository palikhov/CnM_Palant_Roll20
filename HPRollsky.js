var RollHP = RollHP || (function () {
        'use strict';

        var barNumber = 1,
            attrName = 'npc_hpformula',

            setupManualAttribute = function (token) {
                const attr = findObjs({type: 'attribute', characterid: token.get('represents'), name: attrName})[0];
                if (attr) {
                    sendChat('', `[[${attr.get('current')}]]`, (results) => {
                        if (results && results.length === 1) {
                            if (!results[0].inlinerolls || !results[0].inlinerolls[0]) {
                                log('HP roll didn\'t have the expected structure. This is what we got back: ' + results[0]);
                            }
                            else {
                                const hp = results[0].inlinerolls[0].results.total;
                                token.set(`bar${barNumber}_value`, hp);
                                token.set(`bar${barNumber}_max`, hp);
                            }
                        }
                    });
                }
            },

            handleInput = function (msg) {
                var args;

                if (msg.type !== "api") {
                    return;
                }

                args = msg.content.split(/\s+/);
                switch (args.shift()) {
                    case '!roll-hp':
                        _.chain(msg.selected)
                            .map(function (o) {
                                return getObj('graphic', o._id);
                            })
                            .reject(_.isUndefined)
                            .reject(function (t) {
                                return undefined === t.get('represents');
                            })
                            .each(setupManualAttribute)
                        ;
                        break;
                }
            },

            registerEventHandlers = function () {
                on('chat:message', handleInput);
            };

        return {
            RegisterEventHandlers: registerEventHandlers
        };

    }());

on('ready', function () {
    'use strict';

    RollHP.RegisterEventHandlers();
});
