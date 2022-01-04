# Пользовательские скрипты bookmarklets

### Что такое букмарклет

```text
javascript:alert("Hi, I'm a Bookmarklet!");
```

```text
javascript:(function(){$("#floatingtoolbar").css("display",function(i,o){return ('block' === o ? 'none' : 'block');});})();
```

```text
javascript:(function(){$("#zoomslider").css("display","none");$("#floatingtoolbar").css("display","none");$("#sidebarcontrol").click();$("#playerzone").css("display","none");})();
```

```text
javascript:(function(){ var links=$('#libraryview .library-container').map(function(idx,block){ var $block=$(block), img=$block.find('img'),name=$block.find('.library-labelcontainer span').text(), ext = img.attr('src').match(/\b(?:thumb|max|original)\b\.(\w*)/)[1]; return $('<a style="border:1px solid #999;float:left;display:block;width:52px;height:52px;" href="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'" download="'+name+'.'+ext+'"><img class="UserLibraryImage" style="max-width:50px;max-height:50px;" src="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'"></a>').click(function(){$(this).css('opacity',0.5);});}).toArray(); $('<div style="position:absolute;width:100%;height:100%;overflow-y:auto;top:0;left0;z-index:1000000;background-color: #ccc;"></div>').html(links).appendTo('body');}());
```

```text
javascript:(function(){ "use strict"; $('body').keydown(function(e) { var n,o,t; if( e && e.altKey && (48 <= e.keyCode) && (58 >= e.keyCode) ){ n=e.keyCode - ( 48===e.keyCode ? 38 : 49 ); o=$('#secondary-toolbar ul.mode.tokenactions'); if(o && 'none' !== o.css('display')) { t=o.children()[0].children[n]; if(t) { t.click(); } } } }); }());
```

[Aaron Enhancement Pack](https://app.roll20.net/forum/post/2344777/slug})

### Firefox

### Chromium

Roll20 Clear Ui

```text
javascript:(function(){$("#zoomslider").css("display","none");$("#floatingtoolbar").css("display","none");$("#sidebarcontrol").css("display","none").click();$("#playerzone").css("display","none");$("#initiativewindow").parent().css("left","-10000px")})();
```

Sort Maps

```text
javascript:(function(){ $('#page-toolbar').height('800px');$('#page-toolbar .container').css({height: '800px','white-space': 'normal'});}());
```

Highlight Active Song in Jukebox

```text
javascript:(function(){_.each($('#jukebox').find('tr'),function(r){var $r=$(r),$b=$($r.find('button'));if($b.hasClass('pause')){$r.css({backgroundColor: '#ff0000'});}});}());
```

expand page toolbar

```text
javascript:(function(){ $('#page-toolbar').height('480px') .width('80%');$('#page-toolbar .container').css({height: '480px', 'width':'80%', 'white-space': 'normal'});}());
```

Clear ui gm

```text
javascript:(function(){$("#zoomslider").css("display","none");$("#floatingtoolbar").css("display","none");$("#sidebarcontrol").css("display","none").click();$("#playerzone").css("display","none");$("#initiativewindow").parent().css("left","-10000px");$("#page-toolbar").css("display","none")})();
```

Copy all api scripts \(only .js\)

```text
javascript:$('<textarea></textarea>').attr({id: 'TheAaronAllScripts'}).css({width:'100%',height: '30em'}).text($('.script .editor').map(function(idx,e){return e.env.editor.getValue();}).toArray().join("\n/* ############################### */;\n\n")).appendTo('body');
```

Copy all active api scripts

```text
javascript: (function(){let disabledScripts=$('ul.nav.nav-tabs li a.disabled').map((idx,e)=>$(e).attr('href').substr(1));$('<textarea></textarea>').attr({id: 'TheAaronAllScripts'}).css({width:'100%',height: '30em'}).text($('.script.tab-pane').filter((idx,e)=>!_.contains(disabledScripts,$(e).attr('id'))).map((i,e)=>$('.editor',e)[0]).map(function(idx,e){return e.env.editor.getValue();}).toArray().join("\n/* ############################### */;\n\n")).appendTo('body'); }());
```

User Library Image Download Helper

```text
javascript:(function(){ var links=$('#libraryview .library-container').map(function(idx,block){ var $block=$(block), img=$block.find('img'),name=$block.find('.library-labelcontainer span').text(), ext = img.attr('src').match(/\b(?:thumb|max|original)\b\.(\w*)/)[1]; return $('<a style="border:1px solid #999;float:left;display:block;width:52px;height:52px;" href="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'" download="'+name+'.'+ext+'"><img style="max-width:50px;max-height:50px;" src="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'"></a>').click(function(){$(this).css('opacity',0.5);});}).toArray(); $('<div style="position:absolute;width:100%;height:100%;overflow-y:auto;top:0;left0;z-index:1000000;background-color: #ccc;"></div>').html(links).appendTo('body');}());
```

pages

```text
javascript:(function(){ $('#page-toolbar').height('800px');$('#page-toolbar .container').css({height: '800px','white-space': 'normal'});}());
```

Macro bar on multiple lines - [Roll20 forum](https://app.roll20.net/forum/post/476678/slug})

```text
javascript:(function(){ $("#playerzone .player").css("display", "none"); $("#macrobar_macros").css("white-space", "normal"); $("#macrobar").css("height", "auto"); $("#macrobar_macros .macrobox .btn").each(function(){ $(this).text( $(this).text().replace(/[^:]+: /, "")); }); $("#initiativewindow").css("width", "100px").parent().css("width", "100px"); })();
```

### Expand page toolbar

```text
javascript:(function(){%20$('#page-toolbar').height('480px')%20.width('80%');$('#page-toolbar%20.container').css({height:%20'480px',%20'width':'80%',%20'white-space':%20'normal'});}());
```

### pages

```text
javascript:(function(){%20$('#page-toolbar').height('800px');$('#page-toolbar%20.container').css({height:%20'800px','white-space':%20'normal'});}());
```

### sort maps

```text
javascript:(function(){%20$('#page-toolbar').height('800px');$('#page-toolbar%20.container').css({height:%20'800px','white-space':%20'normal'});}());
```

### sort transmogripher

```text
javascript:$('iframe').contents().find('.objects').each((c,e)=>{%20let%20$e=$(e);%20$e.children().sort(%20(a,b)=>{%20let%20name1=$(a).find(".name").text().toLowerCase(),%20name2=$(b).find(".name").text().toLowerCase(),%20comp%20=%20name1.localeCompare(name2);%20return%20comp;%20})%20.each((i,c)=>$e.append(c));%20});
```

### bookmarklet scripts

```text
javascript:$('<textarea></textarea>').attr({id:%20'TheAaronAllScripts'}).css({width:'100%',height:%20'30em'}).text($('.script%20.editor').map(function(idx,e){return%20e.env.editor.getValue();}).toArray().join(
```

### roll20:clear UI

```text
javascript:(function(){$("#zoomslider").css("display","none");$("#floatingtoolbar").css("display","none");$("#sidebarcontrol").css("display","none").click();$("#playerzone").css("display","none");$("#initiativewindow").parent().css("left","-10000px")})();
```

### roll20:clearUIgm

```text
javascript:(function(){$("#zoomslider").css("display","none");$("#floatingtoolbar").css("display","none");$("#sidebarcontrol").css("display","none").click();$("#playerzone").css("display","none");$("#initiativewindow").parent().css("left","-10000px");$("#page-toolbar").css("display","none")})();
```

### tes

```text
javascript:(function(){%20var%20links=$('#libraryview%20.library-container').map(function(idx,block){%20var%20$block=$(block),%20img=$block.find('img'),name=$block.find('.library-labelcontainer%20span').text(),%20ext%20=%20img.attr('src').match(/\b(?:thumb|max|original)\b\.(\w*)/)[1];%20return%20$('<a%20style="border:1px%20solid%20#999;float:left;display:block;width:52px;height:52px;"%20href="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'"%20download="'+name+'.'+ext+'"><img%20style="max-width:50px;max-height:50px;"%20src="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'"></a>').click(function(){$(this).css('opacity',0.5);});}).toArray();%20$('<div%20style="position:absolute;width:100%;height:100%;overflow-y:auto;top:0;left0;z-index:1000000;background-color:%20#ccc;"></div>').html(links).appendTo('body');}());
```

### Highlight Audio Playing Jukebox

```text
javascript:(function(){_.each($('#jukebox').find('tr'),function(r){var $r=$(r),$b=$($r.find('button'));if($b.hasClass('pause')){$r.css({backgroundColor: '#ff0000'});}});}());
```

### Copy ALL API Scripts

```text
javascript:$('<textarea></textarea>').attr({id: 'TheAaronAllScripts'}).css({width:'100%',height: '30em'}).text($('.script .editor').map(function(idx,e){return e.env.editor.getValue();}).toArray().join("\n/* ############################### */;\n\n")).appendTo('body');
```

### Copy Only ACTIVE API Scripts

```text
javascript: (function(){let disabledScripts=$('ul.nav.nav-tabs li a.disabled').map((idx,e)=>$(e).attr('href').substr(1));$('<textarea></textarea>').attr({id: 'TheAaronAllScripts'}).css({width:'100%',height: '30em'}).text($('.script.tab-pane').filter((idx,e)=>!_.contains(disabledScripts,$(e).attr('id'))).map((i,e)=>$('.editor',e)[0]).map(function(idx,e){return e.env.editor.getValue();}).toArray().join("\n/* ############################### */;\n\n")).appendTo('body'); }());
```

### User Library Image Download Helper

```text
javascript:(function(){ var links=$('#libraryview .library-container').map(function(idx,block){ var $block=$(block), img=$block.find('img'),name=$block.find('.library-labelcontainer span').text(), ext = img.attr('src').match(/\b(?:thumb|max|original)\b\.(\w*)/)[1]; return $('<a style="border:1px solid #999;float:left;display:block;width:52px;height:52px;" href="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'" download="'+name+'.'+ext+'"><img style="max-width:50px;max-height:50px;" src="'+img.attr('src').replace(/\b(?:thumb|max)\b/,'original')+'"></a>').click(function(){$(this).css('opacity',0.5);});}).toArray(); $('<div style="position:absolute;width:100%;height:100%;overflow-y:auto;top:0;left0;z-index:1000000;background-color: #ccc;"></div>').html(links).appendTo('body');}());
```

### copy api

In Chrome, make a bookmark with that text as the URL. When on an API page, click it and it will append a textarea to the bottom of the page with all the scripts concatenated together into a single block of text \(with a nice divider\). Then you can just click in and hit ctrl-A \(or cmd-A on the Mac\) and copy it.

```text
javascript:$('<textarea></textarea>').attr({id: 'TheAaronAllScripts'}).css({width:'100%',height: '30em'}).text($('.script .editor').map(function(idx,e){return e.env.editor.getValue();}).toArray().join("\n/* ############################### */;\n\n")).appendTo('body');
```

```text
javascript:(function(){$('#textchat-input textarea').val('SOMETEXT');$('#textchat-input button').click();})();
```

javascript:\(function\(\){$\('\#textchat-input textarea'\).val\('%{Macros\|Game}'\);$\('\#textchat-input button'\).click\(\);}\)\(\);

...will invoke the ability macro 'Game' on the character 'Macros'. This can be saved to a bookmarklet in Chrome. \(it should work in any browser that supports javascript in the URL bar\). Basically, create a blank bookmark, and assign the code to it. It must start with "javascript:". Some browsers blank that out unless you specifically type it, so make sure it's there at the beginning. Give the Bookmarklet a unique name. For the one above, I used 'JMGame', for Javascript Menu Game. You can also put in API commands, boilerplate text, or anything you could physically type.

Resize Turn Tracker: a per-session bookmarklet that reduces the size of the turn tracker. ref:\([https://app.roll20.net/forum/permalink/2317121/](https://app.roll20.net/forum/permalink/2317121/)\)

javascript:\(function\(\){ $\('\#initiativewindow .characterlist .name'\).hide\(\);$\('\#initiativewindow'\).parent\(\).css\('width','100px'\); }\)\(\); Here's one that sets it back: javascript:\(function\(\){ $\('\#initiativewindow .characterlist .name'\).show\(\);$\('\#initiativewindow'\).parent\(\).css\('width','200px'\); }\)\(\);

You can actually do this locally via a Bookmarklet:

Sort Transmogrifier list ref.\([https://app.roll20.net/forum/permalink/4891027/](https://app.roll20.net/forum/permalink/4891027/)\)

javascript:$\('iframe'\).contents\(\).find\('.objects'\).each\(\(c,e\)=&gt;{ let $e=$\(e\); $e.children\(\).sort\( \(a,b\)=&gt;{ let name1=$\(a\).find\(".name"\).text\(\).toLowerCase\(\), name2=$\(b\).find\(".name"\).text\(\).toLowerCase\(\), comp = name1.localeCompare\(name2\); return comp; }\) .each\(\(i,c\)=&gt;$e.append\(c\)\); }\);

This is a bookmarklet that will sort your transmogrifier lists. In Chrome, just make a new bookmark with the above as the link. When you have the transmogrifier open and select this link, it will sort the currently open lists. You'll need to run it again when you choose a new list or after dragging things across to get the list back in order.

Cycle thru Token Ability Macros ref.\([https://app.roll20.net/forum/permalink/4891568/](https://app.roll20.net/forum/permalink/4891568/)\)

javascript:\(function\(\){ "use strict"; $\('body'\).keydown\(function\(e\) { var n,o,t; if\( e && e.altKey && \(48 &lt;= e.keyCode\) && \(58 &gt;= e.keyCode\) \){ n=e.keyCode - \( 48===e.keyCode ? 38 : 49 \); o=$\('\#secondary-toolbar ul.mode.tokenactions'\); if\(o && 'none' !== o.css\('display'\)\) { t=o.children\(\)\[0\].children\[n\]; if\(t\) { t.click\(\); } } } }\); }\(\)\);

It lets you hit alt-1 through alt-0 to activate one of the first 10 Token Action buttons on the selected token.

[Roll20 forum](https://app.roll20.net/forum/post/2783252/copy-scripts-to-new-game/?pageforid=2783639#post-2783639)

\[script REQ\] Aaron's Roll20 Enhancement pack - [Roll20 forum](https://app.roll20.net/forum/post/2344777/slug})

