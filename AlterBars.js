// VERSION INFO
var AlterBars_Author = "SkyCaptainXIII";
var AlterBars_Version = "2.0.5";
var AlterBars_LastUpdated = 1494507176;
// FUNCTION DECLARATION
var AlterScript = AlterScript || {};
on("chat:message", function (msg) {
	if (msg.type != "api") return;
	if (msg.content.split(" ", 1)[0] === "!alter") {
		msg.who = msg.who.replace(" (GM)", "");
		msg.content = msg.content.replace(/<br\/>\n/g, ' ').replace(/({{(.*?)}})/g, " $2 ");
		if (msg.content.indexOf("--target") == -1) {
		    sendChat("ERROR", "/w " + msg.who + " Your macro does not have a target specified.");
		    return;
		}
		AlterScript.Process(msg);
	}
});
on("ready", function () {
	log("-=> AlterBars v" + AlterBars_Version + " <=-  [" + (new Date(AlterBars_LastUpdated * 1000)) + "]");
	//log (Date.now().toString().substr(0, 10));
});
// FUNCTIONS
AlterScript.Process = function (msg) {
	// BAR CONFIGURATION - These are used to identify which bar to adjust. You can
	// also use any lowercase letters as well such as 'h' or 'hp' for hit points/health.
	var Bar1Key = "1";
	var Bar2Key = "2";
	var Bar3Key = "3";
	var BarGain = ["gains", "point", "points"];
	var BarLoss = ["loses", "point", "points"];
// OUTPUT FORMAT - The following variables are used to define how AlterBar
	// sends the output to chat. The first item is the verb, the second is the
	// singular name of the 'bar' and the third item is the plural version.
	// Example: Paladin heals 1 hit point.
	// Example: Paladin heals 8 hit points.
	// Example: Mage spends 3 mana.
	var Bar1Gain = ["heals", "hit point", "hit points"];
	var Bar1Loss = ["takes", "damage", "damage"];
	var Bar2Gain = ["recovers", "mana", "mana"]
	var Bar2Loss = ["spends", "mana", "mana"]
	var Bar3Gain = ["heals", "hit point", "hit points"];
	var Bar3Loss = ["takes", "damage", "damage"];
// ALTCOLORS - This uses a dark green or dark red emote for gain / loss instead
	// of the default orange for both.
	var ALT_COLORS = true;
// PREVENT OVERMAX - Set this variable to true to prevent the current value of
	// the bar from being greater than its max value. If there is no max value set,
	// it will not stop the current bar value from increasing.
	var PREVENT_OVERMAX = true;
// STOP AT ZERO - Prevents the current value of the bar from dropping below zero.
	var STOP_AT_ZERO = true;
// ANNOUNCE CHANGE IN CHAT - Set to true to send a message to the chat window
	// showing which token gained or lost points and how much.
	var ANNOUNCE_CHANGE = true;
// SEND TO GM - Set to true to send the results to the GM. This will also trigger
	// if a hidden change is sent.
	var ALERT_GM = false;
// Variables stuff...
	var n = msg.content.split(/\s+--/);
	var who = msg.who;
	var Target = "";
	var Bar = 0;
	var AlterValue = 0;
// Pull variables from n...
	n.shift();
	_.each(n, function (a) {
		Tag = a.substring(0, a.indexOf("|")).trim();
		Content = a.substring(a.indexOf("|") + 1).trim();
		if (Tag.toLowerCase() == "target") Target = getObj("graphic", Content);
		if (Tag.toLowerCase() == "bar") Bar = Content;
		if (Tag.toLowerCase() == "amount") AlterValue = Content;
		if (Tag.toLowerCase() == "show" && Content.toLowerCase() == "gm") {
            ANNOUNCE_CHANGE = false;
            ALERT_GM = true;
		}
        if (Tag.toLowerCase() == "show" && Content.toLowerCase() == "none") {
            ANNOUNCE_CHANGE = false;
            ALERT_GM = false;
		}
	});
	
    if(!Target) {
        sendChat("ERROR", `/w "${who}" Not a valid target id.`);
        return;
    }
    
	if (Bar == 1 || Bar == Bar1Key) {
		BarGain = Bar1Gain;
		BarLoss = Bar1Loss;
	} else if (Bar == 2 || Bar == Bar2Key) {
		BarGain = Bar2Gain;
		BarLoss = Bar2Loss;
	} else if (Bar == 3 || Bar == Bar3Key) {
		BarGain = Bar3Gain;
		BarLoss = Bar3Loss;
	} else {
        sendChat("ERROR", "/w " + who + " That is not a valid bar.");
		return;
	}
    
	// Get current and max values from the token...
	var CurrentValue = parseInt(Target.get("bar" + Bar + "_value"));
	var MaxValue = parseInt(Target.get("bar" + Bar + "_max"));
	   
	// Set current values as previous values for transit to Tint/Aura HealthColors...
	var Previous = JSON.parse(JSON.stringify(Target));
    
	// Check for a + or - sign...
	var Operand1 = AlterValue.charAt(0);
	var Operand2 = AlterValue.charAt(1);
	if (Operand2 === "+" || Operand2 === "-") AlterValue = AlterValue.substring(2);
	else if (Operand1 === "+" || Operand1 === "-") AlterValue = AlterValue.substring(1);
    
	// Save the value for the tooltip...
	var Expression = AlterValue;
    
	// Define CSS...
	var AlertGainStyle = "max-height: 20px; width: 100%; padding: 3px 40px 6px 0px; border: 1px solid #000; border-radius: 4px; background-color: " +  + "; background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)); font-family: Candal; font-style: normal; font-size: 1.05em; line-height: 1em; color: #FFF; font-weight: normal; text-align: left; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;";
	var AlertLossStyle = "max-height: 20px; width: 100%; padding: 3px 0px 6px 0px; border: 1px solid #000; border-radius: 4px; background-color: " + ((!ALT_COLORS) ? "#BF5700" : "#440000") + "; background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)); font-family: Candal; font-style: normal; font-size: 1.05em; line-height: 1em; color: #FFF; font-weight: normal; text-align: left; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;";
	var AlertOuterStyle = "max-height: 40px; width: 100%; margin: 10px 0px 5px -7px; line-height: 40px;";
	var AlertImageStyle = "height: 40px; width: 40px; float: right; margin: -11px 5px 0px 0px;";
// Main process...
	sendChat("", "/r " + AlterValue, function (outs) {
		AlterValue = parseInt(JSON.parse(outs[0].content).total);
		var Tooltip = "Rolling " + Expression + " = " + AlterValue + "' class='a inlinerollresult showtip tipsy-n'";
		var TargetName = (Target.get("name") == "" || Target.get("showplayers_name") == false && !ALERT_GM) ? "NPC" : Target.get("name");
		if (Operand1 != "-") {
			// Add to bar...
			if (PREVENT_OVERMAX) AlterValue = (AlterValue + CurrentValue > MaxValue) ? MaxValue - CurrentValue : AlterValue;
			var AlertGain = "" +
                "<div style='display: block; margin-left: -7px; margin-right: 2px; padding: 2px 0px;'>" +
                    "<div style='position: relative; border: 1px solid #000; border-radius: 5px; background-color: " + ((!ALT_COLORS) ? "#BF5700" : "#004400") + "; background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)); margin-right: -2px; padding: 2px 5px 5px 50px;'>" +
                        "<div style='position: absolute; top: -10px; left: 5px; height: 40px; width: 40px;'>" + 
                            "<img src='" + Target.get("imgsrc") + "' style='height: 40px; width: 40px;'></img>" + 
                        "</div>" +
                        "<div style='font-family: Candal; font-size: 13px; line-height: 15px; color: #FFF; font-weight: normal; text-align: center; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;'>" + 
                            TargetName + " " + BarGain[0] + " " + AlterValue + " " + ((AlterValue == 1) ? BarGain[1] : BarGain[2]) + "." + 
                        "</div>" + 
                    "</div>" +
                "</div>";
			if (ANNOUNCE_CHANGE) sendChat("", "/desc " + AlertGain);
			if (ALERT_GM) sendChat(who, "/w GM " + AlertGain);
			Target.set("bar" + Bar + "_value", CurrentValue += AlterValue);
		} else {
			// Subtract from bar...
			var AlertLoss = "" +
                "<div style='display: block; margin-left: -7px; margin-right: 2px; padding: 2px 0px;'>" +
                    "<div style='position: relative; border: 1px solid #000; border-radius: 5px; background-color: " + ((!ALT_COLORS) ? "#BF5700" : "#440000") + "; background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)); margin-right: -2px; padding: 2px 5px 5px 50px;'>" +
                        "<div style='position: absolute; top: -10px; left: 5px; height: 40px; width: 40px;'>" + 
                            "<img src='" + Target.get("imgsrc") + "' style='height: 40px; width: 40px;'></img>" + 
                        "</div>" +
                        "<div style='font-family: Candal; font-size: 13px; line-height: 15px; color: #FFF; font-weight: normal; text-align: center; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;'>" + 
                            TargetName + " " + BarLoss[0] + " " + AlterValue + " " + ((AlterValue == 1) ? BarLoss[1] : BarLoss[2]) + "." + 
                        "</div>" + 
                    "</div>" +
                "</div>";
			if (ANNOUNCE_CHANGE) sendChat("", "/desc " + AlertLoss);
			if (ALERT_GM) sendChat(who, "/w GM " + AlertLoss);
			if (STOP_AT_ZERO && (CurrentValue - AlterValue < 0)) AlterValue = CurrentValue;
			Target.set("bar" + Bar + "_value", CurrentValue -= AlterValue);
		}
		if ('undefined' !== typeof HealthColors && HealthColors.Update) HealthColors.Update(Target, Previous);
	});
};
