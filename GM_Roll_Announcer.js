on('chat:message', function(msg) {
  let gmrollSent = false;
  if (msg.type === 'gmrollresult') {
    // user used "/gmroll" or "/gr" command
    gmrollSent = true;
  } else if (msg.type === 'whisper') {
    // user use "/whisper" or "/w" command
    if (msg.target === 'gm' || playerIsGM(msg.target)) {
      // user whispered to "gm" or to a player with GM privilidges
      if (msg.inlinerolls && msg.inlinerolls.length) {
        // whisper contained at least one inline roll
        gmrollSent = true;
      }
    }
  }

  if (gmrollSent) {
    if (playerIsGM(msg.playerid)) {
      // user who sent the command has GM priviledges
      sendChat(`player|${msg.playerid}`, '/em mysteriously rolls some dice');
    } else {
      // user who sent the command does not have GM priviledges
      sendChat(`player|${msg.playerid}`, '/em rolls some dice so only the GM can see');
    }
  }
});
