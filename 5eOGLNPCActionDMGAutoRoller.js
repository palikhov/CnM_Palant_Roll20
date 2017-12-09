on('chat:message', function(msg) {
// ROLL LISTENER
    if(msg.playerid.toLowerCase() != "api" && msg.rolltemplate) {
        if (msg.rolltemplate === "npcaction"){
            let desc = ((msg.content.split("{{description=")[1]||'').split("}}")[0]||'');
            if (desc.match(/\(\d+(d)\d+.*\)/g)) {
                let output =[];
                let roll = desc.match(/\(\d+(d)\d+.*\)/g);
                let type = desc.match(/\)\s\w+/g);
                for (let n = 0; n < roll.length; n++) {
                    output[n] = {die: roll[n].replace(/\(/g, "[[").replace(/\)/g, "]]"), type: type[n].replace(") ", "")};
                }
                for (let x of output) {
                    sendChat(msg.who, "&{template:npcdmg} {{damage=1}} {{dmg1=" + x.die + "}} {{dmg1flag=1}} {{dmg1type=" + x.type + "}}");
                }
            }
        }
    }
});
