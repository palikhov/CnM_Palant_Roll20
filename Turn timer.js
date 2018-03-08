// GitHub:    https://github.com/JamesMowery/turn-timer
// By:        James Mowery
// Contact:   https://app.roll20.net/users/1001679/james-mowery

var seconds = 0;
var interval = null;

var TurnTimer = TurnTimer || (function() {
    'use strict';

    var version = "0.0.1";
});

function countDown() {
    'use strict';

    seconds = seconds - 1;

    if (seconds == 121) {
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>\
        2 Minutes Remaining</div></div>");
    }

    if (seconds == 61) {
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>\
        1 Minute Remaining</div></div>");
    }

    if (seconds == 16) {
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>\
        15 Seconds Remaining!</div></div>");
    }

    if (seconds <= 0) {
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>\
        Time\'s Up!</div></div>");

        clearInterval(interval);
    }
}

on("chat:message", function(msg) {
    'use strict'

    // When the GM types !t <number>, start a timer for <number> seconds
    if(msg.type == "api" && msg.content.indexOf("!timer ") !== -1) {
        // Clear the previous timer if running.
        clearInterval(interval);

        log("Detected Typing");
        // Extracts the number of seconds in the command
        seconds = Number(msg.content.replace("!timer ", ""));
        log(seconds);

        // Begin the countdown
        interval = setInterval(countDown, 1000, seconds);

        // Inform the players that the timer has started
               sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
            font-weight: bold;'><img src=\
            'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
            width='32px' height='32px' style='float: left;'> \
            <div style='float: left; height: 16px; \
            vertical-align:middle; margin: 8px 0 0 10px;'>\
            Timer Started</div></div>");
    }
    // When the GM types !t, start a timer for a default number of seconds
    else if(msg.type == "api" && msg.content.indexOf("!timer") !== -1) {
        clearInterval(interval);    // Clear the previous timer if running.
        seconds = 60;               // Sets the default number of seconds

        // Begins the countdown
        interval = setInterval(countDown, 1000, seconds);
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
            font-weight: bold;'><img src=\
            'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
            width='32px' height='32px' style='float: left;'> \
            <div style='float: left; height: 16px; \
            vertical-align:middle; margin: 8px 0 0 10px;'>\
            Timer Started - 1 Minute</div></div>");
    }
});

on("ready", function() {
    'use strict';

});
