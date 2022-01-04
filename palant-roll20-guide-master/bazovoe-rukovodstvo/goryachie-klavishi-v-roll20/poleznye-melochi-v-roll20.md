# Полезные мелочи в Roll20

#### Быстро открыть лист персонажа <a id="&#x431;&#x44B;&#x441;&#x442;&#x440;&#x43E;-&#x43E;&#x442;&#x43A;&#x440;&#x44B;&#x442;&#x44C;-&#x43B;&#x438;&#x441;&#x442;-&#x43F;&#x435;&#x440;&#x441;&#x43E;&#x43D;&#x430;&#x436;&#x430;"></a>

Shift + двойной клик левой кнопкой мыши на токене

#### Отцентрировать экран на заданной точке \(для ГМ-а\) <a id="&#x43E;&#x442;&#x446;&#x435;&#x43D;&#x442;&#x440;&#x438;&#x440;&#x43E;&#x432;&#x430;&#x442;&#x44C;-&#x44D;&#x43A;&#x440;&#x430;&#x43D;-&#x43D;&#x430;-&#x437;&#x430;&#x434;&#x430;&#x43D;&#x43D;&#x43E;&#x439;-&#x442;&#x43E;&#x447;&#x43A;&#x435;-&#x434;&#x43B;&#x44F;-&#x433;&#x43C;-&#x430;"></a>

Shift + клик левой кнопкой мыши на точке и задержать

#### Выключать видео-чат в Roll20 <a id="&#x432;&#x44B;&#x43A;&#x43B;&#x44E;&#x447;&#x430;&#x442;&#x44C;-&#x432;&#x438;&#x434;&#x435;&#x43E;-&#x447;&#x430;&#x442;-&#x432;-roll20"></a>

GM’s who use Discord, Skype, Hangouts, or simply if you don’t use the Roll20 audio-video: Change Chat-Tech setting to “NONE” under Settings tab in the game tabletop.

I mean don’t just turn “Send and Receive: Voice / Video” off — that’s a setting that both Players and GM’s have. As GM, scroll down the Settings more and find the Chat Tech setting to truly disable it \(WebRTC\) from using any resources.

As player I’ve been invited into a few games where Video/Voice was not being used, but it was still loading in the browser \(showing camera icon in Chrome browser\) because the GM hadn’t turned it fully off in the settings.

Not sure if this is an unconventional tip per-se, just the first Dummy’s Guide tip that came to mind.

#### Как сделать темную карту в Roll20 <a id="&#x43A;&#x430;&#x43A;-&#x441;&#x434;&#x435;&#x43B;&#x430;&#x442;&#x44C;-&#x442;&#x435;&#x43C;&#x43D;&#x443;&#x44E;-&#x43A;&#x430;&#x440;&#x442;&#x443;-&#x432;-roll20"></a>

a tip i came across if you want to make a night or dark themed map without using fog of war. you can use a token on the lighting layer give it a black arua the covers the map. all players see the darkness you can even stack more tokens to get a darker area.

This works for Shaded areas or even moving areas as well.

#### Пробелы в макросах <a id="&#x43F;&#x440;&#x43E;&#x431;&#x435;&#x43B;&#x44B;-&#x432;-&#x43C;&#x430;&#x43A;&#x440;&#x43E;&#x441;&#x430;&#x445;"></a>

Spacing: Spacing inside a roll rarely matters, as it does not generally effect the results of a roll. When I make macros I space everything far apart so its easier to see where I might have made an error, and to make it easier to adjust later on as needed.

When figuring out result spacing in the chat window, I try to get things to fit on as few lines as possible. I can be a bit obsessive about this, but it makes for cleaner macros and speeds the game along if you can see and comprehend the results easily.

#### Journal Command Buttons <a id="journal-command-buttons"></a>

Within the Bio & Info and GM Notes text fields of a Character, or the Description & Notes and GM Notes text fields of a Handout, you can create Journal Command Buttons; special hyperlinks that can output macros to the Text Chat when clicked. Here’s how to create a Journal Command Button within one of the aforementioned fields:

1. Insert a link using the link button on the redactor toolbar.
2. At the very start of the “URL” field of the Link Window, type !
3. Add in your macro code after the !
4. Give your Journal Command Button a label using the “Text” field.
5. Press the “Insert” button and Save Changes; you have created a Journal Command Button! Note: opening the Link Window converts HTML Entities; it’s necessary to restore the ! \(and any other HTML entities\) before saving changes to a Journal Command Button via the Link Window. Another way to create Journal Command Buttons is to copy and paste an API Command Button or Ability Command Button from the Text Chat into one of the aforementioned text fields. Note: Journal Command Buttons will not work if you have the Use Window Popouts for Characters option enabled.

#### Link Between Journal Entries <a id="link-between-journal-entries"></a>

You can easily link your journal entries together inside the game. Just put single brackets around the name of a character or handout \(for example: “\[Mr. Bearington\] is most-known for his long, flowing hair”\), and when you save the entry we’ll automatically create a clickable link that will open that other journal entry.

It works both inside and outside the app, and it’s smart enough to obey player permissions as well \(so a player can’t open a handout they don’t have access to, even if they see a link to that handout\). You can use the links in character bios, GM notes \(both for characters and tokens\), and handout notes fields. Use links to tie entries together, or even create a “table of contents” page for your game to quickly access your most-used journal items Roll20Wiki- https://wiki.roll20.net/Journal\#Reorganizing\_Journal\_Items

#### Link Between Journal Entries <a id="link-between-journal-entries-1"></a>

You can easily link your journal entries together inside the game. Just put single brackets around the name of a character or handout \(for example: “\[Mr. Bearington\] is most-known for his long, flowing hair”\), and when you save the entry we’ll automatically create a clickable link that will open that other journal entry.

It works both inside and outside the app, and it’s smart enough to obey player permissions as well \(so a player can’t open a handout they don’t have access to, even if they see a link to that handout\). You can use the links in character bios, GM notes \(both for characters and tokens\), and handout notes fields. Use links to tie entries together, or even create a “table of contents” page for your game to quickly access your most-used journal items Roll20Wiki-

#### How to make your D&D5 OGL Character Sheet shine like a Pro <a id="how-to-make-your-dd5-ogl-character-sheet-shine-like-a-pro"></a>

```text
	Tired of your character sheet that is hard to read ? Did you try to find how to text format in the Wiki and found that it is sadly impossible ? Well, there's a way I found a few days ago, and I want to share it for those of you that are not already aware of this. Here's a tip for you 
```

Use Unicode converters ! Unicode converters allows you to change the font of your text in a large variety of styles compatible with a lot of websites, including Roll20. Be aware that I only tested this with fonts and that some custom symbols might be replaced by empty squares on some devices \(according to Scott. C just below\). There are plenty available online for free, so just google for them \(or look at SkyCaptainXIII’s post just below\).

You can copy/paste a converted text on your D&D5 Roll20 OGL Sheets, Page names, Handout Names, Jukebox’s Music Titles, and so on ! Here are some of the fonts you can get using this method : \(I personally recommend using Math Bold and Math Bold Italic for D&D5 Sheets, see the examples above\)

Alright ! I hope you liked it and I hope to share this find for people like me that like clean, easy to read character sheets ! :p

#### Using more then one shot of ammo in OGL <a id="using-more-then-one-shot-of-ammo-in-ogl"></a>

Resource\_name,amount Arrows,2

#### Горячие клавиши на карте <a id="&#x433;&#x43E;&#x440;&#x44F;&#x447;&#x438;&#x435;-&#x43A;&#x43B;&#x430;&#x432;&#x438;&#x448;&#x438;-&#x43D;&#x430;-&#x43A;&#x430;&#x440;&#x442;&#x435;"></a>

Holding the “alt” key while dropping an image from your library to retain it’s original aspect ratio and keep it from snapping to the grid.

#### Увеличение токена <a id="&#x443;&#x432;&#x435;&#x43B;&#x438;&#x447;&#x435;&#x43D;&#x438;&#x435;-&#x442;&#x43E;&#x43A;&#x435;&#x43D;&#x430;"></a>

Shift-z while selecting a token to zoom it for all your players.

\#\#\#

#### Где найти ссылку на библиотеку загруженных в Ролл20 изображений? <a id="&#x433;&#x434;&#x435;-&#x43D;&#x430;&#x439;&#x442;&#x438;-&#x441;&#x441;&#x44B;&#x43B;&#x43A;&#x443;-&#x43D;&#x430;-&#x431;&#x438;&#x431;&#x43B;&#x438;&#x43E;&#x442;&#x435;&#x43A;&#x443;-&#x437;&#x430;&#x433;&#x440;&#x443;&#x436;&#x435;&#x43D;&#x43D;&#x44B;&#x445;-&#x432;-&#x440;&#x43E;&#x43B;&#x43B;20-&#x438;&#x437;&#x43E;&#x431;&#x440;&#x430;&#x436;&#x435;&#x43D;&#x438;&#x439;"></a>

Ответ - [здесь](https://marketplace.roll20.net/library/)

