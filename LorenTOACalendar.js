// Calendar and down day counter for Faerun, Greyhawk, Eberron and Modern Settings - (https://github.com/Ciorstaidh/Roll20-API)
// Created by Kirsty (https://app.roll20.net/users/1165285/kirsty)
// Modified for Tomb of Annihilation by Loren (https://app.roll20.net/users/1300634/loren-s)
// Full Instructions on Roll20 Forum: (https://app.roll20.net/forum/post/4714258/script-faerun-calender-and-down-day-counter/?pagenum=1)

// API Commands:
// !cal - for the GM displays the menu in the chat window, for a player displays date, weather, moon and down days

// Notes:
// In this revision, Down Days count the amount of time the adventurers have been on their quest to stop the Soul Monger. This is useful for tracking Syndra's remaining life, as well as other creatures affected by the death curse. To use this, set your Down Day Divider to 1, and once you have set the starting date for your campaing, set your Down Days to 0.

// Red Colour: #7E2D40

var Calendar = Calendar || (function() {
    'use strict';
    
    var version = '3.0.2',
    
    setDefaults = function() {
        state.Calendar = {
            now: {
                version: '3.0.2',
				world: 1,
                ordinal: 1,
                year: 1486,
                down: 0,
                divider: 0,
                weather: "It is a cool but sunny day.",
                time: "OFF",
                startdate: "1,Hammer,1486"
            },
        };
    },
    
    checkDefaults = function() {
        if( state.Calendar.now.version != version ){
            state.Calendar.now.version = version;
        }
        if( ! state.Calendar.now.world){state.Calendar.now.world = 1};
        if( ! state.Calendar.now.ordinal){state.Calendar.now.ordinal = 1};
        if( ! state.Calendar.now.year){state.Calendar.now.year = 1486};
        if( ! state.Calendar.now.down){state.Calendar.now.down = '0'};
        if( ! state.Calendar.now.divider){state.Calendar.now.divider = '0'};
        if( ! state.Calendar.now.weather){state.Calendar.now.weather = "It is a cool but sunny day."};
        if( ! state.Calendar.now.time){state.Calendar.now.time = "OFF"};
        if( ! state.Calendar.now.startdate){state.Calendar.now.startdate = "1,Hammer,1486"};
    },
    
    handleInput = function(msg) {
        var args = msg.content.split(",");
        
        if (msg.type !== "api") {
			return;
		}
		
		if(playerIsGM(msg.playerid)){
		    switch(args[0]) {
		        case '!cal':
                    calmenu();
                    break;
                case '!setworld':
                    state.Calendar.now.world=args[1];
                    calmenu();
                    break;
                case '!startdate':
                    state.Calendar.now.startdate=args[1]+','+args[2]+','+args[3];
                    calmenu();
                    break;
                case '!setday':
                    switch(Number(state.Calendar.now.world)) {
                        case 1:
                            getFaerunOrdinal(msg);
                            break;
                        case 2:
                            getGreyhawkOrdinal(msg);
                            break;
                        case 3:
                            getModernOrdinal(msg);
                            break;
                        case 4:
                            getEberronOrdinal(msg);
                            break;
                    }
                    weather();
                    calmenu();
                    break;
                case '!setmonth':
                    switch(Number(state.Calendar.now.world)) {
                        case 1:
                            getFaerunOrdinal(msg);
                            break;
                        case 2:
                            getGreyhawkOrdinal(msg);
                            break;
                        case 3:
                            getModernOrdinal(msg);
                            break;
                        case 4:
                            getEberronOrdinal(msg);
                            break;
                    }
                    weather();
                    calmenu();
                    break;
                case '!setyear':
                    state.Calendar.now.year=args[1];
                    calmenu();
                    break;
                case '!setordinal':
                    state.Calendar.now.ordinal=args[1];
                    calmenu();
                    break;
                case '!settime':
                    state.Calendar.now.time=args[1];
                    calmenu();
                    break;
                case '!setdown':
                    var down = Number(args[1]);
                    state.Calendar.now.down = down;
                    getdown(down);
                    calmenu();
                    break;
                case '!setdiv':
                    state.Calendar.now.divider=Number(args[1]);
                    calmenu();
                    break;
                case '!addday':
                    addday(args[1]);
                    weather();
                    calmenu();
                    break;
                case '!weather':
                    if(args[1]=='Roll}'){
                        weather();
                    }else{
                        var string = args[1];
                        for (var i = 2; i < args.length; i++) {
                            string = string + ", " + args[i];
                        }
                        state.Calendar.now.weather = string;
                    }
                    calmenu();
                    break;
                case '!playercal':
                    showcal(msg);
                    break;
    	    }
		}else if(args[0]=='!cal'){
		    showcal(msg);
		}
    },
    
    calmenu = function() {
        var colour = '#7E2D40';
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ' + colour + '; margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: ' + colour + '; font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        
        var world = getworld();
        var down = Number(state.Calendar.now.down);
        down = getdown(down);
        var moMenu = getMoMenu();
        var ordinal = state.Calendar.now.ordinal;
        
        var nowdate;
        
        switch(Number(state.Calendar.now.world)) {
            case 1:
                nowdate = getFaerunDate(ordinal).split(',');
                break;
            case 2:
                nowdate = getGreyhawkDate(ordinal).split(',');
                break;
            case 3:
                nowdate = getModernDate(ordinal).split(',');
                break;
            case 4:
                nowdate = getEberronDate(ordinal).split(',');
                break;
        }
        
        var month = nowdate[0];
        var day = nowdate[1];
        
        var moon; 
        
        if (state.Calendar.now.world==1){
            moon = getFaerunMoon();
        }else if(state.Calendar.now.world==2){
            moon = getGreyhawkMoon();
        }else{
            moon = '';
        }
        
        var start = state.Calendar.now.startdate.split(',');
        var startdate = start[0]+getsuffix(start[0])+' '+start[1]+', '+start[2];
        
        sendChat('Calendar', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Calendar</div>' + //--
            '<div ' + substyle + '>Menu (v.' + state.Calendar.now.version + ')</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<table>' + //--
            '<tr><td>World: </td><td><a ' + astyle1 + '" href="!setworld,?{World?|Faern,1|Greyhawk,2|Modern,3|Eberron,4}">' + world + '</a></td></tr>' + //--
            '<tr><td>Start Date: </td><td><a ' + astyle1 + '" href="!startdate,?{Day},?{Month},?{Year}">' + startdate + '</a></td></tr>' + //--
            '<tr><td>Day: </td><td><a ' + astyle1 + '" href="!setday,?{Day?|1},' + month +'">' + day + '</a></td></tr>' + //--
            '<tr><td>Month: </td><td><a ' + astyle1 + '" href="!setmonth,' + day + moMenu + month + '</a></td></tr>' + //--
            '<tr><td>Year: </td><td><a ' + astyle1 + '" href="!setyear,?{Year?|1486}">' + state.Calendar.now.year + '</a></td></tr>' + //--
            '<tr><td>Ordinal: </td><td><a ' + astyle1 + '" href="!setordinal,?{Ordinal?|1}">' + ordinal + '</a></td></tr>' + //-
            '<tr><td>Time: </td><td><a ' + astyle1 + '" href="!settime,?{Time?|OFF|Early Morning|Morning (dawn)|Late Morning|Noon|Afternoon|Early Evening|Evening (dusk)|Late Evening|Midnight|After Midnight}">' + state.Calendar.now.time + '</a></td></tr>' + //-
            '<tr><td>Down Days: </td><td><a ' + astyle1 + '" href="!setdown,?{Down Days?|0}">' + down + '</a></td></tr>' + //--
            '<tr><td>Down Day<br>Divider: </td><td><a ' + astyle1 + '" href="!setdiv,?{Down Day Divider?|1}">' + state.Calendar.now.divider + '</a></td></tr>' + //--
            '</table>' + //--
            '<br>Weather: ' + state.Calendar.now.weather + //--
            '<br><br>' + moon + //--
            '<br><br><div style="text-align:center;"><a ' + astyle2 + '" href="!addday,?{Days to add?|1}">Advance the Date</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!weather,?{Weather|Roll|Edit,?{Edit Weather}}">Change Weather</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!playercal">Show to Players</a></div>' + //--
            '</div>'
        );
    },
    
    showcal = function(msg) {
        var nowdate;
        var ordinal = state.Calendar.now.ordinal;
        
        switch(Number(state.Calendar.now.world)) {
            case 1:
                nowdate = getFaerunDate(ordinal).split(',');
                break;
            case 2:
                nowdate = getGreyhawkDate(ordinal).split(',');
                break;
            case 3:
                nowdate = getModernDate(ordinal).split(',');
                break;
            case 4:
                nowdate = getEberronDate(ordinal).split(',');
                break;
        }
        
        var month = nowdate[0];
        var day = nowdate[1];
        var down = state.Calendar.now.down;
            down = getdown(down);
        var suffix = getsuffix(day);
        var world = getworld();
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        var moon; 
        
        if (state.Calendar.now.world==1){
            moon = getFaerunMoon();
        }else if(state.Calendar.now.world==2){
            moon = getGreyhawkMoon();
        }else{
            moon = '';
        }
        
        var timestr;
        var downstr;
        
        if(state.Calendar.now.time!="OFF"){
            timestr = '<br>The time is: '+state.Calendar.now.time;
        }else{
            timestr = '';
        }
        
        if(down!=0){
            downstr = '<br><br>Adventurers have been traveling for ' + down + ' days.<br>';
        }else{
            downstr = '';
        }
        
        sendChat(msg.who, '<div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Calendar</div>' + //--
            '<div ' + substyle + '>' + world + '</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            day + suffix + ' ' + month + ', ' + state.Calendar.now.year + //--
            timestr + //--
            downstr + //--
            '<br><br>Today\'s weather:<br>' + state.Calendar.now.weather + //--
            '<br><br>' + moon
        );
    },
    
    getworld = function() {
        var num = Number(state.Calendar.now.world);
        var world;
        
        switch(num) {
            case 1:
                world = 'Faern';
                break;
            case 2:
                world = 'Greyhawk';
                break;
            case 3:
                world = 'Modern';
                break;
            case 4:
                world = 'Eberron';
                break;
        }
        
        return world;
    },
    
    getdown = function(days) {
        var down = Number(days);
        var div = Number(state.Calendar.now.divider);
        
        if(div!=0){
            down = down/div;
        }
        
        return down;
    },
    
    getMoMenu = function() {
        var world = Number(state.Calendar.now.world);
        var leap = checkLeap();
        var moMenu;
        
        switch(world){
            case 1:
                if(leap==0){
                    moMenu = ',?{Month|Hammer|Midwinter|Alturiak|Ches|Tarsakh|Greengrass|Mirtul|Kythorn|Flamerule|Midsummer|Eleasias|Eleint|Highharvestide|Marpenoth|Uktar|Feast of the Moon|Nightal}">';
                }else{
                    moMenu = ',?{Month|Hammer|Midwinter|Alturiak|Ches|Tarsakh|Greengrass|Mirtul|Kythorn|Flamerule|Midsummer|Sheildmeet|Eleasias|Eleint|Highharvestide|Marpenoth|Uktar|Feast of the Moon|Nightal}">';
                }
                break;
            case 2:
                moMenu = ',?{Month|Needfest|Fire Seek|Readying|Coldeven|Growfest|Planting|Flocktime|Wealsun|Richfest|Reaping|Goodmonth|Harvester|Brewfest|Patchwall|Readyreat|Sunsebb}">';
                break;
            case 3:
                moMenu = ',?{Month|January|February|March|April|May|June|July|August|September|October|November|December}">';
                break;
            case 4:
                moMenu = ',?{Month|Zarantyr|Olarune|Therendor|Eyre|Dravago|Nymm|Lharvion|Barrakas|Rhaan|Sypheros|Aryth|Vult}">';
                break;
        }
        
        return moMenu;
    },
    
    checkLeap = function(){
        
        var leap;
        var remainder;
        var world = Number(state.Calendar.now.world);
        var year = Number(state.Calendar.now.year);
        
        switch(world){
            case 1:
                remainder = year % 4;
                if(remainder==0){
                    leap = 1;
                }else{
                    leap = 0;
                }
                break;
            case 2:
                leap = 0;
                break;
            case 3:
                if(year % 4 != 0){
                    leap = 0;
                }else if(year % 100 != 0){
                    leap = 1;
                }else if(year % 400 != 0){
                    leap = 0;
                }else{
                    leap = 1;
                }
                break;
            case 4:
                leap = 0;
                break;
        }
        
        return leap;
    },
    
    getFaerunDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=30){
            month="Hammer"; 
            date=day;
        }else if(day==31){
            month="Midwinter"; 
            date='festival';
        }else if(day>31 && day<=61){
            month="Alturiak"; 
            date=day-31;
        }else if(day>61 && day<=91){
            month="Ches";
            date=day-61;
        }else if(day>91 && day<=121){
            month="Tarsakh";
            date=day-91;
        }else if(day==122){
            month="Greengrass";
            date='festival';
        }else if(day>122 && day<=152){
            month="Mirtul";
            date=day-122;
        }else if(day>152 && day<=182){
            month="Kythorn";
            date=day-152;
        }else if(day>182 && day<=212){
            month="Flamerule";
            date=day-182;
        }else if(day==213){
            month="Midsummer";
            date='festival';
        }else if(day==214){
            month="Sheildmeet";
            date='festival';
        }else if(day>214 && day<=244){
            month="Eleasias"
            date=day-214;
        }else if(day>244 && day<=274){
            month="Eleint";
            date=day-244;
        }else if(day==275){
            month="Highharvestide";
            date='festival';
        }else if(day>275 && day<=305){
            month="Marpenoth";
            date=day-275;
        }else if(day>305 && day<=335){
            month="Uktar";
            date=day-305;
        }else if(day==336){
            month="Feast of the Moon";
            date='festival';
        }else if(day>336 && day<=366){
            month="Nightal";
            date=day-336;
        }else{
            month="Hammer";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getGreyhawkDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=7){
            month="Needfest"; 
            date=day;
        }else if(day>7 && day<=35){
            month="Fire Seek"; 
            date=day-7;
        }else if(day>35 && day<=63){
            month="Readying"; 
            date=day-35;
        }else if(day>63 && day<=91){
            month="Coldeven";
            date=day-63;
        }else if(day>91 && day<=98){
            month="Growfest";
            date=day-91;
        }else if(day>98 && day<=126){
            month="Planting";
            date=day-98;
        }else if(day>126 && day<=154){
            month="Flocktime";
            date=day-126;
        }else if(day>154 && day<=182){
            month="Wealsun";
            date=day-154;
        }else if(day>182 && day<=189){
            month="Richfest";
            date=day-182;
        }else if(day>189 && day<=217){
            month="Reaping";
            date=day-189;
        }else if(day>217 && day<=245){
            month="Goodmonth"
            date=day-217;
        }else if(day>245 && day<=273){
            month="Harvester";
            date=day-245;
        }else if(day>273 && day<=280){
            month="Brewfest";
            date=day-273;
        }else if(day>280 && day<=308){
            month="Patchwall";
            date=day-280;
        }else if(day>308 && day<=336){
            month="Readyreat";
            date=day-308;
        }else if(day>336 && day<=364){
            month="Sunsebb";
            date=day-336;
        }else{
            month="Needfest";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getModernDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=31){
            month="January"; 
            date=day;
        }else if(day>31 && day<=59){
            month="February"; 
            date=day-31;
        }else if(day>59 && day<=90){
            month="March"; 
            date=day-59;
        }else if(day>90 && day<=120){
            month="April";
            date=day-90;
        }else if(day>120 && day<=151){
            month="May";
            date=day-120;
        }else if(day>151 && day<=181){
            month="June";
            date=day-151;
        }else if(day>181 && day<=212){
            month="July";
            date=day-181;
        }else if(day>212 && day<=243){
            month="August";
            date=day-212;
        }else if(day>243 && day<=273){
            month="September";
            date=day-243;
        }else if(day>273 && day<=304){
            month="October";
            date=day-273;
        }else if(day>304 && day<=334){
            month="November"
            date=day-304;
        }else if(day>334 && day<=365){
            month="December";
            date=day-334;
        }else{
            month="January";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getEberronDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day<=28){
            month = 'Zarantyr';
            date = day;
        }else if(day<=56){
            month = 'Olarune';
            date = day-28;
        }else if(day<=84){
            month = 'Therendor';
            date = day-56;
        }else if(day<=112){
            month = 'Eyre';
            date = day-84;
        }else if(day<=140){
            month = 'Dravago';
            date = day-112;
        }else if(day<=168){
            month = 'Nymm';
            date = day-140;
        }else if(day<=196){
            month = 'Lharvion';
            date = day-168;
        }else if(day<=224){
            month = 'Rhaan';
            date = day-196;
        }else if(day<=252){
            month = 'Sypheros';
            date = day-224;
        }else if(day<=280){
            month = 'Aryth';
            date = day-252;
        }else if(day<=308){
            month = 'Vult';
            date = day-280;
        }else{
            month = 'Zarantyr';
            date = 1;
        }
        
        var array=month+','+String(date);
        return array;
    },
    
    getFaerunOrdinal = function(options){
        var args = options.content.split(",");
        var date = args[1];
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        if(date == 'festival'){
            date = 1;
        }else{
            date = Number(args[1]);
        }
        
        switch(month) {
            case 'Hammer':
                ordinal = date;
                break;
            case 'Midwinter':
                ordinal = 31;
                break;
            case 'Alturiak':
                ordinal = 31+date;
                break;
            case 'Ches':
                ordinal = 61+date;
                break;
            case 'Tarsakh':
                ordinal = 91+date;
                break;
            case 'Greengrass':
                ordinal = 122;
                break;
            case 'Mirtul':
                ordinal = 122+date;
                break;
            case 'Kythorn':
                ordinal = 152+date;
                break;
            case 'Flamerule':
                ordinal = 182+date;
                break;
            case 'Midsummer':
                ordinal = 213;
                break;
            case 'Sheildmeet':
                ordinal = 214;
                break;
            case 'Eleasias':
                ordinal = 214+date;
                break;
            case 'Eleint':
                ordinal = 244+date;
                break;
            case 'Highharvestide':
                ordinal = 275;
                break;
            case 'Marpenoth':
                ordinal = 275+date;
                break;
            case 'Uktar':
                ordinal = 305+date;
                break;
            case 'Feast of the Moon':
                ordinal = 335+date;
                break;
            case 'Nightal':
                ordinal = 336+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getGreyhawkOrdinal = function(options){
        var args = options.content.split(",");
        var date = args[1];
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        if(date == 'festival'){
            date = 1;
        }else{
            date = Number(args[1]);
        }
        
        switch(month) {
            case 'Needfest':
                ordinal = date;
                break;
            case 'Fire Seek':
                ordinal = 7+date;
                break;
            case 'Readying':
                ordinal = 35+date;
                break;
            case 'Coldeven':
                ordinal = 63+date;
                break;
            case 'Growfest':
                ordinal = 91+date;
                break;
            case 'Planting':
                ordinal = 98+date;
                break;
            case 'Flocktime':
                ordinal = 126+date;
                break;
            case 'Wealsun':
                ordinal = 154+date;
                break;
            case 'Richfest': 
                ordinal = 182+date;
                break;
            case 'Reaping':
                ordinal = 189+date;
                break;
            case 'Goodmonth':
                ordinal = 217+date;
                break;
            case 'Harvester':
                ordinal = 245+date;
                break;
            case 'Brewfest':
                ordinal = 273+date;
                break;
            case 'Patchwall':
                ordinal = 280+date;
                break;
            case 'Readyreat':
                ordinal = 308+date;
                break;
            case 'Sunsebb':
                ordinal = 336+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getModernOrdinal = function(options){
        var args = options.content.split(",");
        var date = Number(args[1]);
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        switch(month) {
            case 'January':
                ordinal = date;
                break;
            case 'February':
                ordinal = 31+date;
                break;
            case 'March':
                ordinal = 60+date;
                break;
            case 'April':
                ordinal = 91+date;
                break;
            case 'May':
                ordinal = 121+date;
                break;
            case 'June':
                ordinal = 152+date;
                break;
            case 'July':
                ordinal = 182+date;
                break;
            case 'August':
                ordinal = 213+date;
                break;
            case 'September':
                ordinal = 244+date;
                break;
            case 'October':
                ordinal = 274+date;
                break;
            case 'November':
                ordinal = 305+date;
                break;
            case 'December':
                ordinal = 366+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getEberronOrdinal = function(options){
        var args = options.content.split(",");
        var date = Number(args[1]);
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        switch(month) {
            case 'Zarantyr':
                ordinal = date;
                break;
            case 'Olarune':
                ordinal = 28+date;
                break;
            case 'Therendor':
                ordinal = 56+date;
                break;
            case 'Eyre':
                ordinal = 84+date;
                break;
            case 'Dravago':
                ordinal = 112+date;
                break;
            case 'Nymm':
                ordinal = 140+date;
                break;
            case 'Lharvion':
                ordinal = 168+date;
                break;
            case 'Barrakas':
                ordinal = 196+date;
                break;
            case 'Rhaan':
                ordinal = 224+date;
                break;
            case 'Sypheros':
                ordinal = 252+date;
                break;
            case 'Aryth':
                ordinal = 280+date;
                break;
            case 'Vult':
                ordinal = 308+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    addday = function(no){
        var leap = checkLeap();
        var days = Number(no);
        var ordinal = Number(state.Calendar.now.ordinal);
        var world = Number(state.Calendar.now.world);
        var div = state.Calendar.now.divider;
        
        if(div!=0){
            state.Calendar.now.down = Number(state.Calendar.now.down)+days;
        }
        
        var newordinal = ordinal+days;
        
        switch(world){
            case 1:
                if(leap==0 && ordinal <= 214 && newordinal >= 214){
                    state.Calendar.now.ordinal = newordinal+1;
                }else{
                    state.Calendar.now.ordinal = newordinal;
                }
                
                if(newordinal>366){
                    state.Calendar.now.ordinal=newordinal-366;
                    state.Calendar.now.year = Number(state.Calendar.now.year)+1;
                }
                break;
            case 2:
                if(newordinal>364){
                    state.Calendar.now.ordinal=newordinal-364;
                    state.Calendar.now.year = Number(state.Calendar.now.year)+1;
                }else{
                    state.Calendar.now.ordinal = newordinal;
                }
                break;
            case 3:
                if(leap==0 && ordinal <= 60 && newordinal >= 60){
                    state.Calendar.now.ordinal = newordinal+1;
                }else{
                    state.Calendar.now.ordinal = newordinal;
                }
                
                if(newordinal>366){
                    state.Calendar.now.ordinal=newordinal-366;
                    state.Calendar.now.year = Number(state.Calendar.now.year)+1;
                }
            case 4:
                state.Calendar.now.ordinal = newordinal;
                break;
        }
    },
    
    
    
    getsuffix = function(day) {
        
        var date = Number(day)
        var suffix
        
        if (date == 1 || date == 21 ){
            suffix = 'st';
        }else if (date == 2 || date == 22){
            suffix = 'nd';
        }else if (date == 3 || date == 23){
            suffix = 'rd';
        }else{
            suffix = 'th';
        }
        
        return suffix;
    },
    
    weather = function() {
        var roll;
        var temperature;
        var wind;
        var precipitation;
        var season;
        var ordinal = state.Calendar.now.ordinal;
        
       roll = Math.floor(Math.random()*(20-1+1)+1);
       if(roll>=1 && roll<=5){
            season = 'Winter'
        }else if(roll>=6 && roll<=10){
            season = 'Spring'
        }else if(roll>=11 && roll<=15){
            season = 'Summer'
        }else {
            season = 'Fall'
        }
        
        roll = Math.floor(Math.random()*(100-1+1)+1);
        if(roll>=1 && roll<=3){
            switch(season) {
                case 'Winter':
                    temperature = '105 Degrees. It is dangerously hot. Any activity will sorely test your Constitution. ';
                    break;
                case 'Spring':
                    temperature = '103 Degrees. It is an unbearably hot day. The sun bakes everything it touches with its relentless light. Any activity will sorely test your Constitution. ';
                    break;
                case 'Summer':
                    temperature = '104 Degrees. It is an incredibly hot and miserable summer day. The air is so dense with humidity it makes breathing difficult. Any activity will sorely test your Constitution. ';
                    break;
                case 'Fall':
                    temperature = '102 Degrees. It is a hot, steamy, dreadful day. Any activity will sorely test your Constitution. ';
                    break;
            }
        }else if(roll>=4 && roll<=9){
            switch(season) {
                case 'Winter':
                    temperature = '100 Degrees. It is incredibly hot. No air stirs, and the muggy closeness of the jungle presses in on you. Any activity will sorely test your Constitution. ';
                    break;
                case 'Spring':
                    temperature = '99 Degrees. It is very hot. It feels like a sauna, but there is no relief from the endless heat. ';
                    break;
                case 'Summer':
                    temperature = '101 Degrees. It is a blisteringly hot summer day. Even in the shade, it is miserable. Any activity will sorely test your Constitution. ';
                    break;
                case 'Fall':
                    temperature = '98 Degrees. It is an unbearably hot day. The heat saps at your energy, making even simple tasks a struggle. ';
                    break;
            }
        }else if(roll>=10 && roll<=40){
            switch(season) {
                case 'Winter':
                    temperature = '95 Degrees. It is hot. A weak breeze stirs the air, promising relief from the heat but providing little. ';
                    break;
                case 'Spring':
                    temperature = '94 Degrees. It is a very hot day. The air is so dense with humidity it makes breathing difficult. ';
                    break;
                case 'Summer':
                    temperature = '93 Degrees. It is a very hot day. The sun bakes everything it touches with its relentless light. ';
                    break;
                case 'Fall':
                    temperature = '95 Degrees. It is very hot. It feels like a sauna, but there is no relief from the endless heat. ';
                    break;
            }
        }else if(roll>=41 && roll<=65){
            switch(season) {
                case 'Winter':
                    temperature = '90 Degrees. It is hot. The heat embraces you like a warm (and damp) glove. ';
                    break;
                case 'Spring':
                    temperature = '91 Degrees. It is hot. A haze of heat rises from the ground, creating shimmering glimpses of a refracted world. ';
                    break;
                case 'Summer':
                    temperature = '92 Degrees. It is a hot day. The sun hangs in the sky, lighting the world with an intense heat. ';
                    break;
                case 'Fall':
                    temperature = '90 Degrees. It is hot. Shade provides mild relief, but nothing can stop the wet air from enveloping you in its hot embrace. ';
                    break;
            }
        }else if(roll>=66 && roll<=85){
            switch(season) {
                case 'Winter':
                    temperature = '89 Degrees. It is a hot, steamy day. ';
                    break;
                case 'Spring':
                    temperature = '88 Degrees. It is a hot day. ';
                    break;
                case 'Summer':
                    temperature = '86 Degrees. It is a mildly hot day. For once, the heat of the jungle is not all you can concentrate on. ';
                    break;
                case 'Fall':
                    temperature = '85 Degrees. It is mildy hot. The gods smile on you, at least for this day. ';
                    break;
            }
        }else{
            switch(season) {
                case 'Winter':
                    temperature = '82 Degrees. It is a warm day. The constant oppressive heat of the jungle has broken, providing a respite if but for a day. ';
                    break;
                case 'Spring':
                    temperature = '79 Degrees. It is warm, but not unbearable. The humidity still lingers, but the sun does not scald like normal. ';
                    break;
                case 'Summer':
                    temperature = '81 Degrees. It is warm and humid. The relentless heat of the jungle has broken, providing a day ripe for activity. ';
                    break;
                case 'Fall':
                    temperature = '78 Degrees. It is warm and pleasant, marred only by some light humidity. ';
                    break;
            }
            
        }
        
        roll = Math.floor(Math.random()*(20-1+1)+1);
        if(roll>=15 && roll<=17){
            wind='A light wind whisps through the jungle, providing occasional comfort. ';
        }else if(roll>=18 && roll<=20){
            wind='A strong wind blows, gusting around you. ';
        }else{
            wind='The air is still and calm. ';
        }
        
        roll = Math.floor(Math.random()*(75-1+1)+1);
        if(roll>=1 && roll<=8){
            precipitation="Light rain or snow.";
            if(season=='Winter'){
                precipitation = 'Periodic downpours punctuate the day, reducing visibility to 50 yards while they last.';
            }else{
                precipitation = 'The day is marked by periodic downpours that drench anyone and everything, and reduce visibility to 50 yards.';
            }
        }else if(roll>=9 && roll<=13){
            if(season=='Winter'){
                precipitation = 'A torrential downpour begins, instantly soaking the world and reducing visibility to 50 yards.';
            }else{
                precipitation = 'A deluge of rain maintains throughout the day, reducing visibility to 50 yards.';
            }
        }else if(roll>=14 && roll<=17){
            if(season=='Winter'){
                precipitation = 'Thick mist rolls in, reducing visibility to 50 yards.';
            }else{
                precipitation = 'Thick, wet mist and fog settle in, reducing visibility to 50 yards.';
            }
        }else if(roll>=18 && roll<=32){
            if(season=='Winter'){
                precipitation = 'A thin fog covers the ground.';
            }else{
                precipitation = 'A thin, misty rain continues off-and-on throughout the day.';
            }
        }else if(roll>=33 && roll<=35){
            if(season=='Winter'){
                precipitation = 'Then, the wind begins to pick up speed, and a tropical storm begins to rage around you. Sheets of rain pound, wind lashes around you, and lightning flashes dangerously. Visibility is reduced to 20 yards, and movement in the elements becomes treacherous.';
            }else{
                precipitation = 'Then, the wind begins to pick up speed, and a tropical storm begins to rage around you. Sheets of rain pound, wind lashes around you, and lightning flashes dangerously. Visibility is reduced to 20 yards, and movement in the elements becomes treacherous.';
            }
        }else if(roll>=36 && roll<=46){
            if(season=='Winter'){
                precipitation = 'As the day winds on, an afternoon rain storm begins.';
            }else{
                precipitation = 'Despite the clear blue sky, the afternoon brings a sudden rain, that after an hour ends as abruptly as it began.';
            }
        }else if(roll>=47 && roll<=57){
            if(season=='Winter'){
                precipitation = 'A steady drizzle of rain dogs you throughout the day.';
            }else{
                precipitation = 'A drizzle of rain begins and lasts the day.';
            }
        }else{
            roll = Math.floor(Math.random()*(2-1+1)+1);
            if(roll=1){
                precipitation = 'The sky is blue and bright.';
            }else{
                precipitation = 'The sky is clear.';
            }
        }
        
        var forecast=temperature+wind+precipitation;
        state.Calendar.now.weather = forecast;
    },
    
    getFaerunMoon = function() {
        var year = state.Calendar.now.year;
        var ordinal = Number(state.Calendar.now.ordinal);
        var moonOrdinal;
        var moon;
        
        var remainder = year/4 - Math.floor(year/4);
        if(remainder==0.25) {
            moonOrdinal=ordinal;
        }else if (remainder==0.5) {
            moonOrdinal=ordinal+365;
        }else if (remainder==0.75) {
            moonOrdinal=ordinal+730;
        }else if (remainder==0) {
            moonOrdinal=ordinal+1095;
        }
        
        var today = ordinal/30.4375 - Math.floor(ordinal/30.4375);
        var tomorrow = (ordinal+1)/30.4375 - Math.floor((ordinal+1)/30.4375);
        var perc = today + ',' + tomorrow + ',' + moonOrdinal;
        
        moon = 'Moon: ' + getMoon(perc);
        
        return moon;
    },
    
    getGreyhawkMoon = function() {
        var ordinal = Number(state.Calendar.now.ordinal);
        var today;
        var tomorrow;
        var LunaOrd = ordinal + 10;
        var CeleneOrd = ordinal + 87;
        
        today = LunaOrd/28 - Math.floor(LunaOrd/28);
        tomorrow = (LunaOrd+1)/28 - Math.floor((LunaOrd+1)/28);
        var perc = today + ',' + tomorrow + ',' + 0;
        var Luna = getMoon(perc);
        
        today = CeleneOrd/91 - Math.floor(CeleneOrd/91);
        tomorrow = (CeleneOrd+1)/91 - Math.floor((CeleneOrd+1)/91);
        perc = today + ',' + tomorrow + ',' + 0;
        var Celene = getMoon(perc)
        
        var moon = 'Luna: '+Luna+'<br>Celene: '+Celene;
        
        return moon;
    },
    
    getMoon = function(perc) {
        var args  = perc.split(',');
        var today = args[0];
        var tomorrow = args[1];
        var moonOrdinal = args[2];
        var moon;
        
        if(today==0 || tomorrow<today || moonOrdinal==1){
            moon = 'Full Moon'
        }else if(today<=0.25 && tomorrow>0.25){
            moon = 'Last Quarter';
        }else if(today<0.25){
            moon = 'Waning Gibbous';
        }else if(today<=0.5 && tomorrow>0.5){
            moon = 'New Moon';
        }else if(today<0.5){
            moon = 'Waning Crescent';
        }else if(today<=0.75 && tomorrow>0.75){
            moon = 'First Quarter';
        }else if(today<0.75){
            moon = 'Waxing Crescent';
        }else{
            moon = 'Waxing Gibbous';
        }
        
        return moon;
    },
    
    checkInstall = function() {
        if(typeof state.Calendar == "undefined"){
            setDefaults();
        }
        
        if ( state.Calendar.now.version != version ){
            checkDefaults();
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

on("ready",function(){
	'use strict';
	Calendar.CheckInstall();
	Calendar.RegisterEventHandlers();
});
