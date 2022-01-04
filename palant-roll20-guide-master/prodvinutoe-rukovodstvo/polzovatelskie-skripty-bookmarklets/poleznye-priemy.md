# Полезные приемы

#### 

Adding d0cf0 to the roll to add blue roll highlighting \(overwrites any other roll highlighting\), e.g. \[\[1d6 + d0cf0\]\]

#### alerting players when gm is rolling

[https://app.roll20.net/forum/post/5778460/alerting-the-players-when-gm-rolling/?pageforid=5790953\#post-5790953](https://app.roll20.net/forum/post/5778460/alerting-the-players-when-gm-rolling/?pageforid=5790953#post-5790953)

#### distance tool

[https://app.roll20.net/forum/post/1588022/slug}](https://app.roll20.net/forum/post/1588022/slug})

### Горячие клавиши на карте

Holding the "alt" key while dropping an image from your library to retain it's original aspect ratio and keep it from snapping to the grid. Shift-z while selecting a token to zoom it for all your players.

```text
that you can hold alt while dragging a graphic onto the map and it won't constrain it to a token size but will instead place it at it's original size. 


I just learned how to send handouts to new tabs of your browser by holding control and hitting the maximize button. Its fantastic when you have long adventure hand outs as i dont have to keep closing and reopening then scrolling to the section of the adventure anymore.


Another one that I use all the time. If you drag a handout to a player's Avatar/Video Chat it will pop it open for the player and put it in just their journal, as if you added the individually and then clicked show to them.


https://wiki.roll20.net/Dynamic_Lighting_Examples


https://wiki.roll20.net/Beginner%27s_Guide_to_GitHub
```

#### Creating effect of 3d using Dynamic Lightning

```text
Its really simple, all you do is take a map object like a table or something and draw a dynamic lighting occlusion box around it, you then give the table an Emits light value at 1/0. Now you get a lovely shadow effect. Wooo! :)
```

[Roll20 Forum](https://app.roll20.net/forum/post/313934/slug})

#### Another tip

GM's who use Discord, Skype, Hangouts, or simply if you don't use the Roll20 audio-video: Change Chat-Tech setting to "NONE" under Settings tab in the game tabletop.

I mean don't just turn "Send and Receive: Voice / Video" off --- that's a setting that both Players and GM's have. As GM, scroll down the Settings more and find the Chat Tech setting to truly disable it \(WebRTC\) from using any resources.

As player I've been invited into a few games where Video/Voice was not being used, but it was still loading in the browser \(showing camera icon in Chrome browser\) because the GM hadn't turned it fully off in the settings.

Not sure if this is an unconventional tip per-se, just the first Dummy's Guide tip that came to mind.

#### Another tip 2

a tip i came across if you want to make a night or dark themed map without using fog of war. you can use a token on the lighting layer give it a black arua the covers the map. all players see the darkness you can even stack more tokens to get a darker area.

This works for Shaded areas or even moving areas as well.

#### Techniques of rolling

/roll 1d10+floor\(@{Agility} /10\) &{tracker}.

PLAYER'S Weapon Skill test: /roll -1\*\(1d100\) +@{Characteristic} +?{modifier\|0}

/roll \(\(?{Skill value} + ?{modifier\|0}\)-1d100\)/10

&{template:default}    

&{template:default}    

/w gm &{template:default}  

&{template:default}  ?{Number of Hits\|1, 

\[\[ 1d20 + ?{What's Your Initiative Bonus?\|0} &{tracker} \]\]

\[\[ 1d20 + @{Selected\|InitBonus} &{tracker} \]\]

\[\[1d10 + \[\[floor\(@{selected\|Agility}/10\) \]\] &{tracker} \]\]

/roll \[\[floor\(\(@{selected\|BS} + ?{Modifier\|0} - d100\)/10\)\]\]d1&gt;0

/roll floor\(\(@{selected\|BS} + ?{Modifier\|0} - d100\)/10\)

&{template:default}    

@{selected\|token\_name} rolls \[\[1d10 +\(floor\(@{Selected\|Agility}/10\)\) &{tracker}\]\]for initiative!

Primitive \[\[ {1d10, 0d1+7}kl1 \]\]

Proven \[\[ {1d10, 0d1+3}dl1 \]\] if so then {1d10!!,3d1}kh1+{1d10!!,3d1}kh1+{1d10!!,3d1}kh1+{1d10!!,3d1}kh1+{1d10!!,3d1}kh1 would give you your proven 5d10!!

skill test: /roll ?{Number of Dice\|1}d10!10&gt;7sd specialized test: /roll ?{Number of Dice\|1}d10!10&gt;6sd

Both \[\[ {{1d10, 3 + 0d0}kh1, 7 + 0d0}kl1 \]\]

Target Number / Successes \(B,F\) - CP

The same concept as when using on Dice Rolls but with different behavor for a group. For a Grouped Roll with a single sub-roll expression the success check is done after the remaining math expressions have been totaled into each roll. Single sub-roll groups are also useful when doing a success check on a roll that has another Compare Point enabled modifer. For a Grouped Roll with a multiple sub-roll expression the success check is applied to the esult of each sub-roll expression.

```text
Single Sub-Roll Success Example
{3d20+5}>21 - Roll 3 d20's, for each roll add 5 and then count a success for each result of 21 or more.
{2d6!}>4 - Roll 2d6 exploding and count a success for each roll of 4 or greater.
Multiple Sub-Roll Success Example
{4d6+2d8, 3d20+3, 5d10+1}>40 - Roll each of the three sub-roll expression and total them up. Count one success for each sub-roll total of 40 or more. 
```

Failures \(B,F\) - fCP

Failure checks on groups work just like success checks.

```text
Single Sub-Roll Failure Example
{3d20+5}>21f<10 - Roll 3 d20's, for each roll add 5 and then count a success for each result of 21 or more and count a failure for each result of 10 or less.
{2d6!}>4f1 - Roll 2d6 exploding and count a success for each roll of 4 or greater and a failure for each roll of 1.
Multiple Sub-Roll Failure Example
{4d6+2d8, 3d20+3, 5d10+1}>40f<10 - Roll each of the three sub-roll expression and total them up. Count one success for each sub-roll total of 40 or more and one failure for each sub-roll total of 10 or less. 
```

#### TIPS AND TECHNIQUES:

Spacing: Spacing inside a roll rarely matters, as it does not generally effect the results of a roll. When I make macros I space everything far apart so its easier to see where I might have made an error, and to make it easier to adjust later on as needed.

When figuring out result spacing in the chat window, I try to get things to fit on as few lines as possible. I can be a bit obsessive about this, but it makes for cleaner macros and speeds the game along if you can see and comprehend the results easily.

Group your Macros: To save your own screen space and to avoid having dozens of macros I combine similar rolls into one macro:

Ex: Conversation skills \(bluff,sense motive, diplomacy, etc\) can all be rolled at once in a single macro, rather than a macro button for each one.

Boolean Math: Using the Identity property of 1 and the multiplicative property of 0, combined with Queries, you can make ON / OFF type switches in your macros. This is as close as you can get to conditionals in the Macro system. Real If/Then/Else requires Mentor subscriptions and the API.

Note: Pathfinder almost always rounds down, so always use the "Floor" function to force it when finding the 1/2 of something.

Example: \(Two-Handed Weapon Damage\) \[\[ 1d12 + 5\[STR\] + \( ?{Two-Handed Weapon?\|0}\[TwoHanded?\]  _floor\( 5\[STR\]_  .5\) \) \]\] Reason: Since regular weapon damage adds 1x your strength, and a Two-handed Weapon adds 1.5x your Strength you can add Query \* HalfYourStrength. By using a 1 in your query result, you add the extra 1/2 str. If you reply 0, the added result is zero so effectively just your regular strength.

Calculated Dice Roll:

Mostly for Casters where damage of spells is often dependent on your level, you can use math and attributes to determine how many dice to roll. This is also an example of grouping rolls with { } and comparing them with KL1 \(keep Lowest\) Example: CureLightWounds would does 1d8+ Level, but only up to level 5 at max giving us \[\[ 1d8 + \( { 5 , @{Level} }kl1\) \]\] This takes the number 5, compares it to your @{Level} attribute, and keeps the lower of the two. So if you're level 2, you'll end up rolling 1d8+2. if you're level 12, you'll roll 1d8+5

Note: Grouped rolls like KL1 and Calculated Dice Roll's currently don't play nice with each other. The only way to combine them is to do a plain regular /roll and inside THAT, do your comparisons. For example, Fireball \(Your level of d6' up to 10d6\) would come out as /r \[\[ {10, @{CasterLevel} }kl1 \]\]d6

Unfortunately that leaves us with the messy graphical dice, but it does calculate correctly. In these cases, I'll often forgoe the level comparison and just put in my level attribute and replace it with the max number when I hit that level \(ie: \[\[ \(@level\)d6\]\] until I hit level 10 and just make it \[\[10d6\]\]

Passive Rolls for GMs:

If you have your players keep Perception, Sense Motive, etc attributes defined in their character journals, you can use @{Target\|Attribute} or @{Selected\|Attribute} to determine if the character made their check without notifying the player that it happened. This assumes that the Tokens are bound to the Character Journal correctly. Example: /w GM @{Selected\|TokenName} Passive Perception \[\[ @{Selected\|Perception} + 10\]\] Since it's the GM whispering to the GM, only they see the roll.

Corollary to Passive GM Roll:

If your player-base is consistent you can make one macro to test all their passive checks and use it for any NPC or monster that might try to stealth, bluff, or traps, etc. NOTE: Spacing gets a bit messy after 4 players without reworking it

Example: \(Secretly rolling generic monster's stealth check and comparing it to player's rolled perceptions\)

```text
/w GM NPC Stealth[[ (1d20 + ?{Stealth bonus?|0} ) ]]
/w GM Player's Name:[[ 1d20 + @{PlayerName1|Perception} ]]
/w GM Player's Name:[[ 1d20 + @{PlayerName2|Perception} ]]
/w GM Player's Name:[[ 1d20 + @{PlayerName3|Perception} ]]
/w GM Player's Name:[[ 1d20 + @{PlayerName4|Perception} ]]
```

Calculating Crits: Aside from using plain text to describe what constitutes a crit, you can use inline rolls to tell you the actual final roll value.

ex: Rapiers crit on an 18-20. If I have a +6 attack bonus, that means you would crit on a total roll of 24,25, or 26. \(18+6 or higher\)

You essentially repeat your attack roll portion and replace 1d20 with your lowest crit range \(18\). Note that when you don't use a roll, you can't use the \[ \] descriptions inside an inline roll. Game Note: Pathfinder Crits are your damage and bonus' rolled multiple times, not the result multiplied.

```text
/me stabs with his Keen LongSpear!
Attack:[[1d20 + 6[AttackBonus] ]] for [[1d6 + 4[STR] ]] Dmg
Crits on [[ 19 + 6 ]] for addt'l [[ ( 1d6 + 4[STR] ) + ( 1d6 + 4[STR] ) ]]
```

#### Journal Command Buttons

```text
Within the Bio & Info and GM Notes text fields of a Character, or the Description & Notes and GM Notes text fields of a Handout, you can create Journal Command Buttons; special hyperlinks that can output macros to the Text Chat when clicked.
Here's how to create a Journal Command Button within one of the aforementioned fields:
1. Insert a link using the link button on the redactor toolbar.
2. At the very start of the "URL" field of the Link Window, type !&#13;
3. Add in your macro code after the !&#13;
4. Give your Journal Command Button a label using the "Text" field.
5. Press the "Insert" button and Save Changes; you have created a Journal Command Button!
Note: opening the Link Window converts HTML Entities; it's necessary to restore the !&#13; (and any other HTML entities) before saving changes to a Journal Command Button via the Link Window.
Another way to create Journal Command Buttons is to copy and paste an API Command Button or Ability Command Button from the Text Chat into one of the aforementioned text fields.
Note: Journal Command Buttons will not work if you have the Use Window Popouts for Characters option enabled.
```

[Roll20 Wiki](https://wiki.roll20.net/Journal#Reorganizing_Journal_Items)

#### Visual improvement of Roll20 5e OGL Character Sheet

Tired of your character sheet that is hard to read ? Did you try to find how to text format in the Wiki and found that it is sadly impossible ? Well, there's a way I found a few days ago, and I want to share it for those of you that are not already aware of this. Here's a tip for you Use Unicode converters ! Unicode converters allows you to change the font of your text in a large variety of styles compatible with a lot of websites, including Roll20. Be aware that I only tested this with fonts and that some custom symbols might be replaced by empty squares on some devices \(according to Scott. C just below\). There are plenty available online for free, so just google for them \(or look at SkyCaptainXIII's post just below\). You can copy/paste a converted text on your D&D5 Roll20 OGL Sheets, Page names, Handout Names, Jukebox's Music Titles, and so on ! Here are some of the fonts you can get using this method : \(I personally recommend using Math Bold and Math Bold Italic for D&D5 Sheets, see the examples above\)

Link: [https://app.roll20.net/forum/post/4673290/slug}](https://app.roll20.net/forum/post/4673290/slug})

#### Link Between Journal Entries

You can easily link your journal entries together inside the game. Just put single brackets around the name of a character or handout \(for example: “\[Mr. Bearington\] is most-known for his long, flowing hair”\), and when you save the entry we’ll automatically create a clickable link that will open that other journal entry.

It works both inside and outside the app, and it’s smart enough to obey player permissions as well \(so a player can’t open a handout they don’t have access to, even if they see a link to that handout\). You can use the links in character bios, GM notes \(both for characters and tokens\), and handout notes fields. Use links to tie entries together, or even create a “table of contents” page for your game to quickly access your most-used journal items Roll20Wiki- [https://wiki.roll20.net/Journal\#Reorganizing\_Journal\_Items](https://wiki.roll20.net/Journal#Reorganizing_Journal_Items)

#### Ability Command Buttons

Ability Command Buttons can be used to call Abilities \(or sheet button rolls\) from a clickable button in the Text Chat. They are very closely related to API Command Buttons.

Their syntax is as follows:

```text
[Label](~<keyword>|<ability name>)
```

As with Attribute and Ability calls, the keyword is your choice of selected, target or a character\_name. You can also use a character\_id as a keyword.

If you have an Ability Command Button saved somewhere within one of the tabs of the Character Window, you can choose to omit a keyword: `[Label](~<ability name>)` Continuing the example from Abilities, Bob the Slayer might insert `[Swing Axe!!](~Massive Axe)` into another one of his other Abilities so that he could more-accessibly fillet his foes.

Advanced Usage for Roll Queries Roll Queries currently end at the first closing curly brace the parser encounters. Within a Roll Query, other characters that serve as Roll Query syntax \(vertical bars and commas\) will always be treated as such by the parser, potentially causing unwanted behavior when placed within the Roll Query for other purposes. To work around this, replace some but not all of these "problematic" characters with their HTML entities \(see notes below\). Character Replacement \| \| , , } } Due to the order of operations, calls \(i.e. @{Attribute}, %{Ability}, \#Macro\) are parsed to their values before Roll Queries are executed. For example, Attribute calls \(e.g. @{selected\|HP}\) are parsed to \(i.e. replaced by\) either their Current value or their Max value \(depending on whether that call contains the "max" flag, i.e. @{selected\|HP\|max}\). Again, the \(normally-problematic\) characters that are part of Attribute and Ability calls are parsed to their values before they can affect a Roll Query. Hence, calls are not problematic! Do not subject them to character replacements! Never do this: @{target\|token\_name} \[edit\]Roll Query Troubleshooting Locate and replace all problematic characters within the values of any Attributes, Abilities or Macros. Since those values now contain HTML entities, they are probably unable be able to be called individually \(i.e. outside of a Roll Query\). So, you might now consider directly inserting these values into your Roll Query, replacing their call. Macros which contain HTML entities may no longer function autonomously. At this time, reopening a Macro saved under the Collections tab of the Sidebar causes HTML entities within to be reverted; if the Macro is then saved, so are those reversions. This behaviour is not present within Abilities. To reiterate an important point: do not subject any @{Attribute}, %{Ability} or \#Macro calls to any character replacements. Example \(nesting Roll Queries\) \`\`\`?{Name of Query\| Label 1, ?{value1\| Label 1A, value1A \| Label 1B, value1B } \|

Label 2, ?{value2\|value2} }`It is possible to achieve further levels of nesting by "stacking" HTML entities: Character Replacement &`&`Example`?{Name of Query\| Label 1, ?{value1\| Label 1A, ?{value1A&\#124; Label 1Ai&\#44; value1Ai &\#124; Label 1Aii&\#44; value1Aii &\#125; \|

```text
  Label 1B&#44; ?{value1B&amp;#124;
     Label 1Bi&amp;#44; value1Bi &amp;#124;
     Label 1Bii&amp;#44; value1Bii
  &amp;#125;
```

} \| Label 2, ?{value2\|value2}}

```text
[Wiki Roll20](https://wiki.roll20.net/Macros#Example_4)


## Ability Command Buttons
Ability Command Buttons can be used to call Abilities (or sheet button rolls) from a clickable button in the Text Chat. They are very closely related to API Command Buttons. 

Their syntax is as follows:
```[Label](~<keyword>|<ability name>)
```

As with Attribute and Ability calls, the keyword is your choice of selected, target or a character\_name. You can also use a character\_id as a keyword.

If you have an Ability Command Button saved somewhere within one of the tabs of the Character Window, you can choose to omit a keyword: `[Label](~<ability name>)` Continuing the example from Abilities, Bob the Slayer might insert `[Swing Axe!!](~Massive Axe)` into another one of his other Abilities so that he could more-accessibly fillet his foes.

Джерело: [https://wiki.roll20.net/Macros\#Nesting\_in\_a\_Roll\_Query](https://wiki.roll20.net/Macros#Nesting_in_a_Roll_Query)

### Quick hack to get map tiles placed at the right size.

[Roll20 forum](https://app.roll20.net/forum/post/5597951/quick-hack-to-get-map-tiles-placed-at-the-right-size/?pageforid=5597951#post-5597951)

### How to make your D&D5 OGL Character Sheet shine like a Pro

```text
        Tired of your character sheet that is hard to read ? Did you try to find how to text format in the Wiki and found that it is sadly impossible ? Well, there's a way I found a few days ago, and I want to share it for those of you that are not already aware of this. Here's a tip for you 
        Use Unicode converters !
        Unicode converters allows you to change the font of your text in a large variety of styles compatible with a lot of websites, including Roll20. Be aware that I only tested this with fonts and that some custom symbols might be replaced by empty squares on some devices (according to Scott. C just below). There are plenty available online for free, so just google for them (or look at SkyCaptainXIII's post just below).

        You can copy/paste a converted text on your D&D5 Roll20 OGL Sheets, Page names, Handout Names, Jukebox's Music Titles, and so on ! Here are some of the fonts you can get using this method : (I personally recommend using Math Bold and Math Bold Italic for D&D5 Sheets, see the examples above)



        Alright ! I hope you liked it and I hope to share this find for people like me that like clean, easy to read character sheets ! :p
```

Rolling from Handouts [https://app.roll20.net/forum/post/5691962/rolling-from-handouts](https://app.roll20.net/forum/post/5691962/rolling-from-handouts) [https://wiki.roll20.net/Journal\#Journal\_Command\_Buttons](https://wiki.roll20.net/Journal#Journal_Command_Buttons)

### NPC directory Macro and spreadsheet

[https://app.roll20.net/forum/post/5698432/npc-directory-macro-and-spreadsheet/?pageforid=5698432\#post-5698432](https://app.roll20.net/forum/post/5698432/npc-directory-macro-and-spreadsheet/?pageforid=5698432#post-5698432) [https://1drv.ms/x/s!Atcrhwwo1lBArcUoB8tbYNd\_\_CoCPw](https://1drv.ms/x/s!Atcrhwwo1lBArcUoB8tbYNd__CoCPw)

The purpose of the linked spreadsheet is to generate macro code for creating a directory of NPC macros for yourself and your players.This is intended to generate the code for ability Macros to be created on a blank character sheet called "NPCs". All info is displayed to the GM and/or players in the Chat tab. The output is given as an image, name and public info, and whispered GM info. The reason I created this was to have a nice library of NPCs within the play environment without clogging up the game with sheets that wouldn't really serve any purpose. By using web-hosted images, you also avoid any overhead in your image library. This macro does not require any API to run, but is engineered for the Roll Template created by the Shaped Sheet. Sorry, I'm not really familiar enough with any others to adapt it, but it should prove too difficult for someone with spreadsheet and template facility.

To make this work, you will need to create a character sheet called "NPCs" and give it an ability macro for each group of NPCs and a special menu ability macro to serve as a directory to all of the others. The directory menu is whispered to the GM, but the subdirectories \(groups\) can be made public or secret. Additionally, individual NPCs can be made public or secret. Once an NPC is clicked for display however, it will send an image to the chat window, along with publicly-available information and private whispered GM notes.

Example of master menu macro, whispered to GM:

Example of subdirectory or group menu. This can be secret or public. Individually hidden characters will display as a gap in the list:

Final Output. This show a web-hosted image, public info and whispered GM notes:

Notes on how to use the spreadsheet. These are repeated on the spreadsheet itself. To use it, go to the link, save yourself a local copy and start entering information.

The Columns are used as follows: Code = Enter a "W" next to a group name if you want that particular directory of NPCs to be whispered to the GM. Enter a "S" next to a particular NPC you want to remain secret. If there is no code, any player will be able to see the full NPC list and the portrait and public Description of that NPC. An NPC marked with an "S" will just show as a blank line in the directory. A list marked with a ""W"" won't show at all for a player, though any NPC you the DM click on will be displayed.

Name or Group: Enter the name of a group \(example: "Patrons of the Tavern"\) for a group directory macro, or an NPC name for an NPC within that group. If you do not add a title in the next column, the spreadsheet will know that this is the name of a group and not an NPC and format the code accordingly. An NPC name might be "Darion Heartshield"

Subtitle: This is a very short description that will display in the NPC group directory. Example: "Elven Paladin" or "Mayor of Town". If you leave this blank, the code will assume the name in the Name column is a group name, not an NPC name.

Public Description: This is a longer description of the NPC, designed to display under the portrait. Example: "Elven Paladin of Kord, who once aided your party in getting through the Mountains of Terror. Has a halfling squire. Rather stuck-up"

GM notes: These will not display to the players, and contains reminders of information you want secret. Example from above: "He is being hunted by a group of assassins, and hopes that by traveling with the NPCs, he will have the numbers to defend himself when they inevitably catch up to him. His sword is a Luck Blade."

Image URL: This is the URL of an image to display to the players when you click the name of the NPC. Note that if you have not Whispered the Group Name or made the NPC Secret with the appropriate codes, players will be able to click on any displayed name in the group directory. This is useful if you want the players to be able to remind themselves who frequents the Broken Moon Tavern or are the Lords of the Council. The pictures are not drawn from the Image Library, but from the web at large, so an image repository such as Imgur or Photobucket is recommended, to avoid the possibility of broken links. All images will be reduced to fit the width of the chat window.

Code to Paste: This is the final code to paste into individual ability macros on the "NPCs" character sheet. A sample block is highlighted below. Each group has its own macro block beginning with "&{template" or "/w gm &template" depending on whether or not that group is whispered. The code block always ends with "}}" which closes the roll template. The NPC Ability action on the NPCs sheet MUST be named identically to the group name with the exception that any spaces will need to be replaced by hyphens. This is essential for the special directory menu to function properly.

Menu Code: At the top right is a special field called "Menu Code" This is placed into it's own Ability macro on the NPCs sheet. It's purpose is to provide a menu for calling all the other macros. For it to function properly, copy that block into its own Ability Macro , but REMOVE THE QUOTE MARKS from the beginning and end of the code block. These are an unavoidable artifact of concatenating strings in Google Sheets.

If you have any questions or problems, please me by PM on the Roll20 forums or respond in this thread for as long as it remains open.

### OGL 2.1 NPC Spellbook

[https://app.roll20.net/forum/post/5662185/ogl-2-dot-1-npc-spellbook-help\#post-5664510](https://app.roll20.net/forum/post/5662185/ogl-2-dot-1-npc-spellbook-help#post-5664510) Use a text editor with find and replace feature and find -npc and replace -1 for level 1, 2 for 2 ect. Should look like \[@{selected\|repeating_spell-4_$0\_spellname}\] when done.

My macro

\[@{selected\|repeating_spell-cantrip_$0\_spellname}\]\(!

## Cantrip0\)

\[@{selected\|repeating_spell-1_$0\_spellname}\]\(!

## Spell1-0\)

\[@{selected\|repeating_spell-1_$1\_spellname}\]\(!

## Spell1-1\)

\[@{selected\|repeating_spell-1_$2\_spellname}\]\(!

## Spell1-2\)

### Using more then one shot of ammo in OGL

Resource\_name,amount Arrows,2

#### Crossing passages with dynamic lighting

[R20 forum](https://app.roll20.net/forum/post/6180324/crossing-passages-with-dynamic-lighting)

#### hex, city and dungeongrapher

Кейгены для ленивых.

Hexographer \(Python\): [http://pastebin.com/4SvPLXih](http://pastebin.com/4SvPLXih) Dungeonographer \(Python\): [http://pastebin.com/YeX8Zu6D](http://pastebin.com/YeX8Zu6D) Cityographer \(Java\): [http://pastebin.com/SttCtAYs](http://pastebin.com/SttCtAYs)

Вбиваете в онлайн-компиляторы и получаете ключи.

Джерело: [https://2ch.hk/bg/res/1149706.html](https://2ch.hk/bg/res/1149706.html)

