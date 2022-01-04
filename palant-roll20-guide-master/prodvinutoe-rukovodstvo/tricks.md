# Tricks

### Mood Lighting Tokens

Sometimes you have the perfect map, but you are not sure at what time of day the characters will get there. It can hurt immersion if that forest ambush you had planned for noon instead had to go off at midnight because the PCs wanted to finish carousing at the local inn until last call. Your brightly lit woodland scene doesn't work as a spooky old forest at night. But you run with it and remind the players that it's really nighttime.

Enter mood lighting. This trick requires an invisible character token. I use one I call Info, that is normally employed to sprinkle notes around on the map. Use a blank transparent png as your token, and mark its place with a GM-visible-only aura. The one in my example is yellow. The name plate is also invisible to players, so they see nothing of it.

To set lighting, give it a second aura, large enough to easily cover the entire map. This will add a tint/shade to the entire VTT play area. If you use black for instance, you have now made it night time. The amount of black may not be quite enough to give the effect you want, so you can simply copy and paste a second instance of the token. The auras will multiply, making it as dark as you like. By using color, you can simulate moonlight, being underwater, lit by the faerie fire of a drow city and so forth. Different maps will have different saturation and brightness, so some experimentation is often necessary to achieve the right effect. If you have the API and can use Token-Mod, you can even save the most common ones to token macros, for quick and dirty lighting control.

Sample Token Settings:

Examples:

Normal

Night Time

Dark Night \(two tokens\)

Moonlight You can also use the tint to add environmental effects. For example, you might use a fog overlay on a map:

And then use the tint on the fog to create an acidic cloud effect: Creating a Dummy Account \(and why\)

This is a tip primarily for streamers, but is useful to anybody who wants to verify a player view. I think it qualifies as a Stupid Trick, since it's using account creation for a purpose other than simply playing a game.

If you find yourself wishing to stream or record your game, you often run into the problem that if you are also the DM, your view shows the DM layer, otherwise invisible notes you've left on the table top, or things hiding behind dynamic lighting. You might find yourself in a situation in which you want viewers to only see what the players see. If you can give the recording task to a player, that's good, but it still has some drawbacks. The recording only shows things the characters they control would see. If Shiela the Thief and Bobby the Barbarian on on opposite sides of a wall, the recording software can only record what one of them sees, not both. If you are doing it yourself, a simple solution presents itself.

Create a second dummy account and use that as a player connection. There are several benefits to doing this:

1\) You can set up your streaming/recording software \(I use OBS\) to record the action from the camera feed. Make sure that the dummy account can control all the PCs, and if they can see it, it shows on the recording.

2\) You can test out techniques to see how they will appear to players. Yes, you can rejoin your campaign as a player, but then you can't see how you DM actions appear to a player. In other words, perhaps you have set up a monster that you want to pull from the GM Layer with a Script that also invoke a Special Effect, or you want to set up Matt's Doors script and verify that they work for the PCs without having to repeatedly rejoin as DM to fine tune things.

3\) You have a macro with a public portion and some GM whispered content and want to verify that it is appearing correctly for players.

In these cases, being able to switch from your GM window to a player window needs to be quick since it can require cordinated action \(do something as GM and see what the players see\)

So create a dummy account. How to do this?

1\) Sign up for Roll20 again under a different email address. BIG HINT FOR GMAIL USERS: Gmail allows you to put a "+" after your user name, so that it looks like a different address, yet resolves to the same account. For example EricTheCavalier@gmail.com looks like a different email than EricTheCavalier+Shield@gmail.com to most every site on the web, including Roll20, but any mails sent to the second will also go to the first. It looks different to everyone else, but is treated the same for you. So you don't need to maintain a second email address. Do give it a unique user name \(I call mine Camera\).

2\) \(Important\) Send your dummy account an invite. :\)

3\) When signing on, use either a different browser, or preferably a Private Browsing window of the same browser. If you are logged on to two different games in regular browser windows of the same browser, and need to refresh one, it will always refresh to the latest account joined. This will leave you logged into two windows with the same account. So open a private browsing window and log into your second account with that. Final Hint: Remember to sign out of your dummy account if you come here to post on the forums. Not that I've done that...

### Query ordering without affecting functionality

Sometimes you may have a macro that asks a series of questions to the user but due to the mechanics of the system they may get asked in an undesirable order. I know, first world problem but still a problem. The answer: API command syntax! Accessible to all users regardless of subscription level you can prefix anything with a humble '!' to prevent it from writing to the chat. For example; you have a macro that asks for the answer to 3 queries but due to the order of operations of the game your macro would ask for them in reverse order which can be confusing, annoying or both. To get around this you can format your macro as below and the queries will get asked in the right order but the values will be used where needed:

! ?{Query1} ?{Query2} ?{Query3} /em Player 1 does something... \[\[ 1d20 + ?{Query3} \]\] vs \[\[ 1d20 - ?{Query2} \]\] for \[\[ 1d8 + ?{Query1} \]\] damage!

But wait, theres more! Who doesn't love the clack and clatter of 3d dice... someone with a migraine probably... but anyway... There are many systems out there that use non-standard dice mechanics, strange polyhedrons with arcane symbols instead of numbers or other such blasphemy. As it stands there is no way to have 3d dice with those rolls, even just for the aesthetic/auditory reasons. Using an exclamation mark you can have all the dice you want... as long as you don't expect the results to be meaningful ;\) Turn on 3d dice and use something like the following:

! ?{Number of dice}d10 /em Player 1 rolls ?{Number of dice} d11s: \[\[ ?{Number of dice}d11 \]\]

Its a niche market for sure but as long as you ignore the numbers on the dice you can still benefit from that digital bone throwing experience =D

### Keyboard Macro Shortcuts

With thanks to the Aaron for the basic Javascript Note: This method does not work with the current \(as of this writing\) version of Firefox Quantum, which does not support Javascript bookmarklets

If you are a person who prefers hotkeys rather than menus or on-screen buttons, here's a cool little tip for assigning macros to hotkeys. Note that I am writing this from a Macintosh user's perspective, but hopefully a Windows or other user will come along to suggest the easiest way to do the keybinding on that platform.

The basic idea is that anything that you can type into the chat box can be entered via a javascript bookmarklet. The basic syntax is:

javascript:\(function\(\){$\('\#textchat-input textarea'\).val\('SOMETEXT'\);$\('\#textchat-input button'\).click\(\);}\)\(\);

The only thing you need to replace in this bookmarklet is "SOMETEXT". Anything you place in between the single quotes will be sent to the chat window input box.

So, for instance,

javascript:\(function\(\){$\('\#textchat-input textarea'\).val\('%{Macros\|Game}'\);$\('\#textchat-input button'\).click\(\);}\)\(\);

...will invoke the ability macro 'Game' on the character 'Macros'. This can be saved to a bookmarklet in Chrome. \(it should work in any browser that supports javascript in the URL bar\). Basically, create a blank bookmark, and assign the code to it. It must start with "javascript:". Some browsers blank that out unless you specifically type it, so make sure it's there at the beginning. Give the Bookmarklet a unique name. For the one above, I used 'JMGame', for Javascript Menu Game. You can also put in API commands, boilerplate text, or anything you could physically type.

The next bit will vary from platform to platform. On the Mac, open up System Prefs from the Apple menu and select the Shortcuts Tab of the Keyboard pane. select "App Shortcuts" fromt eh menu on the left and add a shortcut specific to Chrome that is spelled exactly the same as the menu item in Chrome. Assign it a keystroke, Say "F3". You may need to actually choose it once manually from the Chrome menu just to make sure it has built all of the sub menus. Now, whenever I press the F3 key, it invokes the Game Menu.

You can build up a whole library of these.

This bookmarklet is smart enough that it will enter items into the chat window, even if it is not displayed. So if you have a macro that sends tokens to the tracker, you can select them and send them there even if you are currently browsing the Jukebox or the Compendium. It will not work if the chat box is popped out into its own window, though. The JM1..JM4 entries are blanks that are awaiting me to assign them text and a title.

For anyone who is wondering what all the other bookmarklets are, most of them come also from the Aaron and can be found in the Aaron's Roll20 Enhancement pack, maintained by Vince.

I hinted at this in the first post, but thought I might elaborate a little. The macro bar at the bottom of the screen can become a little crowded, especially if you are a GM. It's built to wrap around, but that eats up more screen real estate and can crowd into the avatar area. Emojis can help relieve this problem.

If you have a commonly used macro, such as passive perception in 5e, you have several choices if you want to want to keep a button donw in that bottom bar. You are unlikely to want to name it "Passive Perception", since that would make a huge button. "Pass-Perc" is much shorter, but we can get it even smaller that that. Emojis can be your friend here. You can replace all of those characters with a single eye-catching glyph: ️

Here is an example of my own macro bar. Some of the buttons are words, some are emojis. Sometimes the brain finds a word more quickly than a picture, you can season to taste.

Skipping the English word buttons, the emoji-entitled macros here show:

 My Soundboard ️ NPC Portraits  Healing Potions  Group-Initiative

 The chat macro for displaying a 5e Shaped character, with attacks, spells and GM Notes  The chat macro for displaying a 5e Shaped base character ⚔️ The chat macro for displaying a 5e Shaped character's attacks only  The chat macro for displaying a 5e Shaped character' spells only

 A macro that marks a token as using concentration  A macro that displays GM Notes

️ Passive Perception

The links are to macros or scripts or sheets that facilitate these functions. Or at least how I do it.

Of course, since emojis aren't really a font, but a collection of glyphs called by Unicode calls, they will display differently on different systems. The ones in my bar are a screen capture as they display on an Apple Macintosh. If you are reading this post on a Windows PC or Chromebook, you will see slightly different renderings. You may want to choose your emojis carefully if you work on multiple platforms.

Also note that you can still name the macro in your collection "Passive Perception" to make the intent clear. Once it is in you bar, you can right click on it to change the display name to an emoji or an abbreviation, as well as change the color. You can also change the order they display in.

[https://app.roll20.net/forum/post/5899495/stupid-roll20-tricks-and-some-clever-ones/?pagenum=1](https://app.roll20.net/forum/post/5899495/stupid-roll20-tricks-and-some-clever-ones/?pagenum=1)

