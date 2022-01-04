# Intro

I use the OGL sheet because of stability. The Shaped sheet has a lot of nice features, but it breaks a lot.

My philosophy on scripts is that I can add as many as I want, but:

- I avoid scripts that might step on each other's toes
- I try to find the simplest script to do one thing as possible. Several different scripts that do one thing each well > a script that  does a bunch of things. This means there are less things to break.
- They need to be either as easy to use as possible or easy to make macros for.

----------------------------------------------------------------------------------------------------------------------------------------
# From the Script Library

## Welcome Package

Makes and assigns a blank character when a player joins the game, gives players a macro in their collection tab to create their own  character.

*Requires HTML Builder.*

## 5th Edition OGL by Roll20 Companion

Allows spell and ammo tracking (note you might have to enable these in each character sheet individually, for some reason enabling  them in the global roll20 campaign settings wont work for me.)  Also enables the !longrest command to refill spell slots which I use  in my fancy longrest macro.

## Terrain Generator

Combined with like a billion map assets I uploaded to roll20 and turned into rollable tables, I can randomly generate wilderness 
battle maps and it's heckin awesome.

## TokenNameNumber

Add %%NUMBERED%% to the name off a baddy you're about to use in a group and bam, they each get numbered when you drag them to the map.

## Areas of Effect

I can create pretty spell effects using this macro which players can "draw" onto the battlemap using the AOE menu. It's really handy.

*Requires Vector Math, Path Math, MatrixMath.*

## ChatSetAttr

This script allows you to change the attributes of any character from the chat. It's extremely powerful and equally complicated. I use
this script to make my longrest and shortrest macros work.

## Bump

Lets me move tokens while they're hidden on the GM layer, and move them between GM and token layer easily.

## GroupCheck

Lets me make group saves, checks, and skill checks by selecting groups of tokens. Offers choice of whisper or public and looks nice.

## Roll20 Audio Master

Allows chat to change or play sound effects. Real complciated, but I just used it to add a "ding" sound to the turntimer script.

## TokenMod

Allows chat to change token attributes. I use this for a status effect macro that standardizes status effects (without all the over-
head that comes with some complicated status effect scripts.)

## Marching Order

Allows me to set a group of tokens to follow one token. Really useful for exploring dungeons without having to constantly yell at
everyone to move their tokens faster.

## Carry Tokens

Allows tokens to ride mounts or carry torches.

## Hexploration

Allows the party to explore my hex map (ToA) without me having to constantly delete hex covers.

----------------------------------------------------------------------------------------------------------------------------------------
# From External Sources

## Turn Timer

Allows me to set a simple turn timer. My version plays a sound when the time is up. (My version requires a sound effect called 
"Ding" and the Roll20AM script)

- Code: https://goo.gl/gNANZi
- My version: https://goo.gl/uNyD2t

## Table Export (And Import)

Allows me to import any table I can copy paste into a spreadsheet into roll20, and allows me to export and import tables between
campaigns more easily.

- Forum: https://goo.gl/WVQ1v4
- Wiki: https://goo.gl/pq6NFh
- Code: https://goo.gl/jUSWdU
- Spreadsheet: https://goo.gl/AZfesE

## Hit Dice Helper

Automatically decrements a hit dice and adds appropriate amount of hit points when a hit die is rolled.

- Forum: https://goo.gl/GLSRNW
- Code: https://goo.gl/MfQCXS

## Blind Roll

Allows players to roll in a way that whispers me the result but hides it from them.

- Forum: https://goo.gl/FBBmEU

## GM Roll Announcer

Announces "GM rolls some dice mysteriously" when the GM makes any gm roll, including those from NPC sheets.

- Forum: https://goo.gl/BRkud4
- Code: https://goo.gl/78osfV

## Token Macro-Book Generator

Generates token macros that whisper menus of options to the PC (attacks, spells, other.) Very useful for players with crappy
computers that can't open and close the character sheet all the time.

- Forum: https://goo.gl/E5Gv5P
- Code: https://goo.gl/qLJthq

## 5e OGL NPC Action Damage Autoroller

Autoroles damage from NPC abilities that list a damage die but don't role it (like dragon breath weapon.)

- Forum: https://goo.gl/tzdEt7
- Code: https://goo.gl/rc2r7E

## Tiny Token Center-er

Centers tiny tokens. Warning: Don't use with hex maps.

- Forum: https://goo.gl/JgAKGs

## Flight

Applies the fluffy-wing marker to tokens multiple times, each time representing a number in the number of feet you enter. So 
you can mark exact amounts of feet.

- Wiki: https://wiki.roll20.net/Script:Flight

## GMSheet

Lets you select a group of tokens and see all their stats together, like a party sheet.

- Forum: https://tinyurl.com/ya4tpmyo

## Calendar

This is a really nice way to keep track of days in game. No idea where I found it though. 

- Code: https://github.com/Ciorstaidh/Roll20-API

## Recursive Tables

Lets you roll on tables that roll on tables. Tableception. I use this to handle wildmagic and chaos bolt for my wild magic sorcerer,
but the possibilities are endless. Also it lets you format table rolls nicer.

- Forum: https://goo.gl/L6xcgn
- Code: https://goo.gl/AHNtBv

## Limit Hp Min/Max

This script snaps HP to the minimum or maximum when you go below/above it to keep the bars nice and clean.

- Code: https://gist.github.com/poltergeisha/50e4201f0afe96ad13690468ca381629

## Robin Kueper's Scripts

I use basically all of these very high quality scripts! Robin has created the best Combat Tracker, Concentration Reminder, Status
effect tracker, death marker, treasure generator, and more!

- Find them all here: https://github.com/RobinKuiper/Roll20APIScripts
