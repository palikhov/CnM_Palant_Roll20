var applyDamage = applyDamage || (function () {
	'use strict';
	const version = '1.0',
		boundedBar = false,
		checkInstall = function () {
			log('-=> ApplyDamage v' + version + ' <=-');
		},
		defaultOpts = {
			type: 'half',
			ids: '',
			saves: '',
			DC: '-1',
			dmg: '0',
			bar: '1'
		},
		statusMarkers = [
			'red', 'blue', 'green', 'brown', 'purple', 'pink', 'yellow', 'dead', 'skull', 'sleepy', 'half-heart', 'half-haze', 'interdiction', 'snail', 'lightning-helix', 'spanner', 'chained-heart', 'chemical-bolt', 'death-zone', 'drink-me', 'edge-crack', 'ninja-mask', 'stopwatch', 'fishing-net', 'overdrive', 'strong', 'fist', 'padlock', 'three-leaves', 'fluffy-wing', 'pummeled', 'tread', 'arrowed', 'aura', 'back-pain', 'black-flag', 'bleeding-eye', 'bolt-shield', 'broken-heart', 'cobweb', 'broken-shield', 'flying-flag', 'radioactive', 'trophy', 'broken-skull', 'frozen-orb', 'rolling-bomb', 'white-tower', 'grab', 'screaming', 'grenade', 'sentry-gun', 'all-for-one', 'angel-outfit', 'archery-target'],
		getWhisperPrefix = function (playerid) {
			let player = getObj('player', playerid);
			if (player && player.get('_displayname')) {
				return '/w "' + player.get('_displayname') + '" ';
			}
			else {
				return '/w GM ';
			}
		},
		parseOpts = function (content, hasValue) {
			return _.chain(content.replace(/<br\/>\n/g, ' ')
					.replace(/({{(.*?)\s*}}\s*$)/g, '$2')
					.split(/\s+--/))
				.rest()
				.reduce(function (opts, arg) {
					let kv = arg.split(/\s(.+)/);
					(_.contains(hasValue, kv[0])) ? (opts[kv[0]] = (kv[1] || '')) :
					(opts[arg] = true);
					return opts;
				}, {})
				.value();
		},
		processInlinerolls = function (msg) {
			if (_.has(msg, 'inlinerolls')) {
				return _.chain(msg.inlinerolls)
					.reduce(function (m, v, k) {
						let ti = _.reduce(v.results.rolls, function (m2, v2) {
							if (_.has(v2, 'table')) {
								m2.push(_.reduce(v2.results, function (m3, v3) {
									m3.push(v3.tableItem.name);
									return m3;
								}, []).join(', '));
							}
							return m2;
						}, []).join(', ');
						m['$[[' + k + ']]'] = (ti.length && ti) || v.results.total || 0;
						return m;
					}, {})
					.reduce((m, v, k) => m.replace(k, v), msg.content)
					.value();
			}
			else {
				return msg.content;
			}
		},
		handleError = function (whisper, errorMsg) {
			let output = whisper+'<div style="border:1px solid black;background-color:' +
				'#FFBABA;padding:3px 3px;"><h4>Error</h4><p>' + errorMsg + '</p></div>';
			sendChat('ApplyDamage', output);
		},
		finalApply = function (results, dmg, type, bar, status) {
			const barCur = `bar${bar}_value`,
				barMax = `bar${bar}_max`;
			_.each(results, function (saved, id) {
				let token = getObj('graphic', id),
					prev = JSON.parse(JSON.stringify(token || {})), newValue;
				if (token && !saved) {
					if (boundedBar) {
						newValue = Math.min(Math.max(parseInt(token.get(barCur)) - dmg, 0), parseInt(token.get(barMax)));
					} else {
						newValue = parseInt(token.get(barCur)) - dmg;
					}
					if (status) token.set(`status_${status}`, true);
				}
				else if (token && type === 'half') {
					if (boundedBar) {
						newValue = Math.min(Math.max(parseInt(token.get(barCur)) - Math.floor(dmg / 2), 0), parseInt(token.get(barMax)));
					} else {
						newValue = parseInt(token.get(barCur)) - Math.floor(dmg / 2);
					}
				}
				if (!_.isUndefined(newValue)) {
					if (_.isNaN(newValue)) newValue = token.get(barCur);
					token.set(barCur, newValue);
					if('undefined' !== typeof HealthColors && HealthColors.Update) {
						HealthColors.Update(token, prev);
					}
				}
			});
		},
		handleInput = function (msg) {
			if (msg.type === 'api' && msg.content.search(/^!apply-damage\b/) !== -1) {
				const hasValue = ['ids', 'saves', 'DC', 'type', 'dmg', 'bar', 'status'],
					opts = _.defaults(parseOpts(processInlinerolls(msg), hasValue),
						defaultOpts);
				opts.ids = opts.ids.split(/,\s*/g);
				opts.saves = opts.saves.split(/,\s*/g);
				opts.DC = parseInt(opts.DC);
				opts.dmg = parseInt(opts.dmg);
				if (!playerIsGM(msg.playerid) && getObj('player', msg.playerid)) {
					handleError(getWhisperPrefix(msg.playerid), 'Permission denied.');
					return;
				}
				if (!_.contains(['1', '2', '3'], opts.bar)) {
					handleError(getWhisperPrefix(msg.playerid), 'Invalid bar.');
					return;
				}
				if (opts.status === 'none') {
					delete opts.status;
				}
				if (opts.status && !_.contains(statusMarkers, opts.status)) {
					handleError(getWhisperPrefix(msg.playerid), 'Invalid status.');
					return;
				}
				const results = _.reduce(opts.ids, function (m, id, k) {
					m[id] = parseInt(opts.saves[k] || '0') >= opts.DC;
					return m;
				}, {});
				finalApply(results, opts.dmg, opts.type, opts.bar, opts.status);
				let output = getWhisperPrefix(msg.playerid) + '<div style="border:1px ' +
					'solid black;background-color:#FFFFFF;padding:3px;"><p>' +
					(opts.dmg ? opts.dmg + ' damage applied to tokens, with ' +
					(opts.type === 'half' ? 'half ' : 'no ') +
					'damage on a successful saving throw.' : '') +
					(opts.status ? ` ${opts.status} status marker applied to tokens that failed the save.` : '') +
					'</p></div>';
				sendChat('ApplyDamage', output, null, {noarchive: true});
			}
			return;
		},
		registerEventHandlers = function () {
			on('chat:message', handleInput);
		};
	return {
		CheckInstall: checkInstall,
		RegisterEventHandlers: registerEventHandlers
	};
}());
on('ready', function () {
	'use strict';
	applyDamage.CheckInstall();
	applyDamage.RegisterEventHandlers();
});
