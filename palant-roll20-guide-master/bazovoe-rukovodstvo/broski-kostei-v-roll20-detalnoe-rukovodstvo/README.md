# Броски костей в Roll20   детальное руководство

### How to Roll Dice

Rolling dice in Roll20 is easy. Just type the /roll command into the text chat box, followed by a formula. In most cases, the formula is the same as the one that's printed in your game's instructions. For example, you might know that to roll an attack roll you need to roll a "D20 plus your attack modifier". In Roll20, you would just type /roll d20+5. If you hit and you need to roll 3d6+2 damage, you would just type /roll 3d6+2. Finally, you can also string multiple rolls together. If you have an attack that does two types of damage, you might do /roll 2d6+5 + d8.

`/roll 1d20+5`

After the roll is performed, you'll see the results of the roll in the text chat area. Notice that for each group of dice that were rolled, there will be a group of numbers in parentheses, representing the result of each individual dice that was rolled. \(The number sits on an outline of the dice type rolled, and this outline is in the same color as the square of color in the dice-roller's player portrait in the Player Area.\) You'll also see the total of all the dice values plus modifiers to the right of the equal sign. Rolling in Secret

By default, any rolls that you make are seen by everyone in the game with you \(including all players\). If you want to roll in secret, you can use the /gmroll command to perform a roll that only the GM and the original player who made the roll can see. So if you're the GM, doing a /gmroll will only be visible to you. It's a great way to perform skill checks in secret. Including Additional Information

You can also include non-formula text in your roll to indicate what that roll is for. For example, when rolling for initiative you might enter /roll 1d20+5 Roll for Initiative. The extra text won't affect your roll in any way, but it's included in the chat log so that others can see what you're rolling for. It's entirely optional to do this, by the way, but some GMs find it helps keep everything organized a little better.

`/roll 1d20+5 Roll for Initiative`

If you want to include any numbers, parentheses, or +, -, \*, /, or % in your additional text, you can preface it with a  to separate the formula from the text and keep the roller from getting confused. So for example you can do /roll 1d20+5  +5 Roll for Initiative.

If you want to include additional comments before the end of the roll \(we call them "inline labels"\), use square brackets. For example, /roll 2d20+5\[Fire Damage\] + 3d6+5\[Ice Damage\]. When these comments are applied directly after a die roll they show up as tool-tips on the dice:

`/roll 2d10+2d6[crit]+5` Critical Hit! Inline Dice Rolls

If you want a more compact roll representation, you can take advantage of inline dice rolls. Inline rolls are just like regular rolls, with the following exceptions:

```text
You can use them in any chat message, not just a roll. For example, you can do a regular chat message, an emote, or a whisper, with an inline roll included.
They are evaluated completely before any /roll commands, so you can use them as "random variables" in your rolls.
You will only see the result of the total roll, and you can hover over the result to see the individual dice rolls.
If an inline roll contains a crit success, it will be highlighted with a green box. If there's a crit failure, it's highlighted in red. If it has both (because there was more than one roll), it's in blue. Also when you mouse-over the inline roll to see the details of the roll, it'll show red and green highlights for the rolls themselves for crits/fumbles. 
```

To do an inline roll, just include two brackets in any chat message or roll, like so:

`/em Riley is filled with [[3d6]] points of anger! /roll [[2d6]]d5`

You can also nest inline rolls, one inside the other, like so:

`/em Steve gets slapped with [[ 3d6>[[1+3]] ]] carp!` 

### Roll Queries

Sometimes you may have a roll \(or a macro\) which you want to change every time it is rolled. For example, you may want to roll a variable number of dice, or add a different modifier onto the roll each time you perform the action. Roll Queries allow you to prompt whoever is performing the roll to fill in a value when the roll is made. The syntax for a roll query is:

`?{Prompt Message} //Example: /roll ?{Number of Dice}d20 //You can also include a default value: /roll ?{Number of Dice|1}d20 // 1 would be the default`

You can use Roll Queries in rolls, macros, abilities, emotes, whispers -- pretty much anywhere in the app. Note that if you use the same exact wording for a Query, Roll20 will only ask for the value the first time it's encountered in the roll. So in this example:

`/roll 1d20 + ?{Bonus1} vs ?{MinToSucceed} + ?{Bonus1}`

Roll20 will ask for "Bonus1" only once and use it in both places. Math-Only Rolls

You can do math-only rolls by adding a math expression after the roll command.

For example, if you want Roll20 to do a simple addition like 5 + 3, you'd enter the following:

`/roll 5+3`

Or if you want to do this in an inline roll you'd use:

`[[5+3]]`

### Exploding Dice

Roll20 supports exploding dice -- you may also know it as "rule of 6", "rule of 10s", or "acing" depending on your game system. With exploding dice, if you roll the maximum number on the dice \(a 6 with a d6, a 10 with a d10, etc.\) you get to re-roll again and add the additional roll to your total for that roll. If the additional roll is also a maximum number, you get to keep rolling!

To perform a roll with exploding dice, just add an exclamation point after the number of sides in the formula. For example, /roll 3d6! would roll 3 d6 dice with exploding re-rolls. You can also define the exploding point for the dice using the greater-than and less-than symbols. For example, /roll 3d6!&gt;4 would explode on any dice greater-than or equal-to 4. /roll 3d6!3 would explode only if a 3 is rolled.

`/roll 10d6!`

Compounding Exploding Dice \(Shadowrun-Style Exploding Dice\)

Shadowrun \(and some other systems\) use a special style of exploding dice where the the additional rolls for each dice are added together as a single "roll". To do this, just use two exclamation marks instead of one. So for example to roll 5 d6's, you would do /roll 5d6!!. A common Shadowrun roll would be exploding dice compared to a target number, for example /roll {5d6!!}&gt;8 \(notice the use of the brackets to show that we don't mean "explode on anything greater than 8", but rather "explode on 6's compounding, then compare to 8 for successes\). Even though the target number \(8\) is higher than the possible roll from a single die, with the compounding exploding rolls a single roll can be infinitely high!

`/roll {5d6!!}>8`

Penetrating Exploding Dice \(Hackmaster-Style Exploding Dice\)

HackMaster \(and some other systems\) use a special style of exploding dice where the the additional rolls for each dice have 1 subtracted from the roll. To do this, add a p after the exclamation mark. So for example to roll 5 d6's, you would do /roll 5d6!p.

/roll 5d6!p Drop/Keep

Some game systems ask you to roll a large number of dice, and then either drop a certain number of the lowest rolls, or keep only a certain number of the highest rolls. Roll20 supports this type of roll through the d and k commands, respectively.

For example, you might roll 8 d100 dice and only be allowed to keep the top 4 rolls. In Roll20 this would be expressed with /roll 8d100k4. When Roll20 prints the output from that roll, you'll see each individual d100's rolled value, and all but the top 4 rolls will be greyed out. Roll20 will then give you the total of the top 4 rolls. Doing a roll to drop the 3 lowest rolls would be very similar: /roll 8d100d3. Again, the value of each dice rolled will be displayed, with the 3 lowest rolls greyed out.

`/roll 8d100d3`

The d and k commands are shortcuts for the full dl and kh commands. If you need to drop the highest dice use dh and if you need to keep the lowest dice use kl. For example /roll 8d100dh3 would drop the highest three rolls and keep the lowest 5 and /roll 8d100kl3 would keep the lowest three rolls and drop the highest 5. Target Number \(Successes\)

Normally when you perform a roll, Roll20 reports back the total value of all the dice rolled, plus any modifiers. Some game systems, though, work by rolling a set of dice versus a target number, and then adding up the total number of successes instead. Roll20 uses the greater-than symbol &gt; to indicate when the roll is greater-than or equal-to &gt;= the target number. The less-than symbol &lt; is used to indicate when the roll is less-than or equal-to &lt;= the target number.

For example, you might be performing an action that requires a target number of 3, and you get to roll 3 d6's to see how many successes you have. In Roll20, you would do /roll 3d6&gt;3. Note the inclusion of the greater-than symbol to indicate that this is a target roll versus 3. Roll20 will show you each dice that was rolled, and then tell you the number of dice with a value of 3 or greater \(note that ties with the target number count as a success!\). You can also roll less-than target numbers, for example /roll 10d6&lt;4, which would give you a success for each dice rolled that is equal to 4 or less.

You can also add modifiers onto your target rolls, and the modifier will be added to each individual dice roll before it is compared to the target number. However, if you're going to do so, it's recommended that you use a group just to make sure the parser fully understands what you want to do. So, /roll {3d6+1}&lt;3 would roll 3 d6 dice, and for each dice roll add on 1, then compare it versus the target number of 3.

`/roll 3d6>3` 

### Critical Success and Fumble Points

You can also modify your dice rolls to allow you to specify set at which point a roll is considered to be a "Critical Success" or "Critical Failure \(Fumble\)".

To show any roll equal to 10 or greater as a critical success, just do /roll 1d20cs&gt;10. To show any roll equal to or less than 3 as a critical failure, just do /roll 1d20cf&lt;3. To show any roll equal to 20 or 10 exactly as a critical success, just do /roll 1d20cs20cs10.

Note: These values will not affect other things that by default work on max roll value \(including exploding, penetrating, etc.\). It only affects the display of the roll result to the player. For example, if you want dice to explode on 18 or higher, and you want to show an 18 or higher as a critical, you would need to do /roll 1d20!&gt;18cs&gt;18.

`/roll 1d20cs>10` 

### Rerolling Dice

Several systems require that certain dice be reroll, for example brutal weapons in D&D 4e require any 1s or 2s to be re-rolled and the orignal die value ignored.

To use reroll, just do /roll 2d8r and &lt; can be used as comparisons and the r suffix can be specified multiple times. /roll 2d8r1r3r5r7 would roll 2d8 and re-roll any odd number.

/roll 2d8r&lt;2 FATE Dice

Roll20 also supports FATE dice \(used for FATE, FUDGE, and other systems\). Roll20 accurately simulates FATE dice as 6-sided dice in which two sides are 0, two sides are +1, and two sides are -1.

To roll 4 FATE dice, just do /roll 4dF. Roll20 will show you the result of each individual FATE dice roll, then give you the total of all the dice rolls added up together. You can also add a modifier onto the total, with /roll 4dF+1.

`/roll 4dF` 

### Rounding Rolls and Math Functions

You may want to use rounding in your roll formulas to emulate mechanics such as "half a level, rounded down to the nearest level." Roll20 provides several functions to accomplish this: floor\(\) which will always round the number down \(e.g. 5.7 becomes 5\), ceil\(\) which will always round the number up \(e.g. 5.1 becomes 6\), and round\(\) which will always round to the nearest whole number \(e.g. 4.4 becomes 4 and 4.5 becomes 5\). You can use these functions almost anywhere in your roll formulas \(around a single math expression, groups of math expressions, or even the entire roll\). For example:

`/roll floor(7/2) + 2d6`

We also provide other Math functions:

```text
abs() will calculate the absolute value of the roll 
```

### Grouping Rolls

Sometimes you may want to perform a series of rolls, and then compare each roll to a common check \(like a success roll\). Roll20 provides a "grouped rolls" functionality for this purpose. For example, you can roll two different pools of dice, then keep the highest dice roll across any of the pools:

`/roll {4d6+3d8}kh1`

If you separate the rolls inside the group with a comma, then we'll sum each individual dice expression in the group before applying any modifiers. For example, if we change the above example to use a comma, instead of keeping the highest single roll, it will instead keep the highest group total:

`/roll {4d6,3d8}kh1`

This is needed in games based on the Savage Worlds system, where important characters roll a "wild die" in parallel with their main die and choose the highest roll.

Grouped rolls can be a very powerful features in Roll20. See more detail about them in the full dice specification below.

Below you'll find the entire Roll20 dice engine specification. This is the "advanced" documentation. If you're looking to do something totally crazy with Roll20 dice, this is a great place to see if we can support it. Roll To Initiative

To add a roll directly into Roll20's Turn Track \(Rolling for Initiative\), you'll need to incorporate a "roll option". A roll option is a special Roll20 flag that you can set anywhere in a roll to tell the roll system you'd like to do special things with the roll. For adding an initiative number to the turn track, you'll first need to select the token you wish to roll for and use this formula:

`/roll 1d20 + 5 &{tracker}`

The &{} part is where you put your options for the roll, and the "tracker" option is what says "Show the results of this roll, but also use the result as the value in the turn tracker." If the token that you have selected doesn't already have a turn in the turn order, one will be added. If it already has at least one turn, all current turns will be updated with the new value. Roll Templates

Roll Templates are a special facet of the Character Sheets system which provide additional layout and styling options for the display of roll results. Using a Roll Template is very easy to use. Just include a special flag in your chat message which tells Roll20 that you want to use a Roll Template, and then provide all of the data that you want to include.

Here's an example that uses the 'default' template \(which all games have access to, regardless of the game system or Character Sheets you are using\): `&{template:default}`   

{% hint style="info" %}
Note: If you're interested in using Roll Templates in your own custom macros or creating your own custom templates please vist the wiki entry on Roll Templates.
{% endhint %}

&{template:default}    Roll20 Dice Specification Math Operators and Functions

Roll20 supports the basic arithmetic operators you learned in school: +, -, \* \(multiply\), and / \(divide\).

In addition to the basic four, you have access to:

```text
%, for modulus division. The result of a % b is the remainder of a / b. If you think back to when you were first learning long division without getting into decimals, you were learning how to perform modulus division. Modulus is useful, for example, to test whether a value is even or odd: a % 2 will be 0 if a is even (and positive) and 1 if a is odd (and positive). In general, the result of a % b when a and b are both whole numbers will be a whole number in the range [0, |b| - 1] where |b| is the absolute value of b. (If a is less than 0, the result will be negative, including -0. -0 is functionally equivalent to 0.)
**, for exponentiation. You may be more familiar with a^b as the notation for "raising a to the power of b", but in Roll20 you would use a**b instead. Also note that finding roots is simply raising a number to a fractional exponent; square root is simply an exponent of 0.5, for example. 
```

You also have access to a small set of mathematical functions:

```text
floor(x) rounds x towards negative infinity.
round(x) rounds x towards 0 if the fractional portion of x is less than 0.5, and round x towards positive infinity if the fractional portion of x is 0.5 or greater.
ceil(x) rounds x towards positive infinity.
abs(x) returns the absolute value of x. 
```

Operations are performed by order of precedence, just like in normal mathematics. From highest to lowest precedence:

```text
Grouping with parentheses (( and )); just like in real math, you can modify the precedence ordering by wrapping parentheses around things
Calling floor/round/ceil/abs
Exponentiation (**)
Multiplication (*), division (/), and modulus (%), in the order they appear (left-to-right) in the formula
Addition (+) and subtraction (-), in the order they appear (left-to-right) in the formula 
```

### Order of Operations

While the Roll20 dice engine does support basic math and functions such as floor\(\) and ceil\(\), it is first and foremost a dice engine, and so it has its own order of operations. This means that putting parentheses inside of your dice formula will not always affect the outcome of the roll \(for example, you can't force a variable to be interpreted before a macro\). Here is the general order of operations:

```text
Abilities are expanded (meaning the definition of the ability is placed in the formula anywhere that ability appears).
Macros are expanded, including nested macros up to 99 levels deep.
Variables are substituted
Roll queries are executed (the player making the roll is asked to provide a value for each query, and that value is substituted in where the roll query appears in the formula)
All previous steps are repeated until there are no longer any unresolved abilities, macros, variables, or queries. This allows for nesting (e.g. putting an attribute in a macro).
Inline rolls are executed, starting with the most deeply nested inline roll working upward. The overall result of the inline roll is substituted in place where it appeared in the formula.
The remaining roll is executed: first, dice are rolled for any dice (e.g. "2d6" is rolled; including any special dice such as dropped or exploding), then the result of that roll is substituted into the formula. Next, floor() and ceil() functions are executed. Finally, the entire remaining formula is evaluated, including observing proper math order of operations (parentheses first, then multiplication/division, then addition/subtraction). 
```

### Types Of Dice

Roll20 supports more than just your standard polyhedrons when rolling dice, below are the available die types you can use in your games. Basic Roll NdX

Rolls N traditional \(almost, you can have any number of sides that you want\) dice with X sides per die. N must be greater than or equal to 0 and X must be greater than or equal to 1. Fate/Fudge Roll NdF

Rolls N Fate/Fudge dice. These dice have three sides with values of -1, 0, and 1. Computed Dice Roll \(N+Y\)dX/Nd\(X+Y\)

Computes the number of dice to roll or the number of sides on the dice based on the mathematical expression in the parentheses. Dice computation can be used with both Basic and Fate dice.

Within \(N+Y\)dX, the number of dice \(N+Y\) is rounded to the nearest whole number, just like round\(N+Y\). Roll Modifiers

Modfiers that can change the behavior or outcome of dice rolls. Each modifier states which Types Of Dice it can be applied to in parentheses after the modifier name. Rolls can have multiple modifiers applied to a single roll to allow for complex dice expressions.

```text
B - Basic Roll
F - Fate/Fudge Roll 
```

Many modifiers compare each die to a target number to decided if the modifier action should be applied. We'll call this a Compare Point or CP for short in the roll modifiers below. A Compare Point consists of an optional compare operation &lt;,=,&gt; and a target number. If the operation is not specified = is assumed and for most modifiers the entire Compare Point can be left off for the default behavior.

```text
Example Compare Points
3 - If the roll is equal to 3
>2 - If the roll is greater than or equal to 2
<18 - If the roll is less than or equal to 18 
```

Target Number / Successes \(B,F\) - CP

Normally when you perform a roll, Roll20 reports back the total value of all the dice rolled, plus any modifiers. Some game systems, though, work by rolling a set of dice versus a target number, and then adding up the total number of successes instead.

```text
Example Success Checks
3d6>3 - Roll 3 d6's and count one success for each roll of 3 or higher
10d6<4 - Roll 10 d6's and count one success for each roll of 4 or less 
```

Failures \(B,F\) - fCP

Some systems build on success checks by also including failures. Failure checks only work when a success check is already being done and each failure subtracts one from the total number of successes.

```text
Example Failure Checks
3d6>3f1 - Roll 3 d6's and count one success for each roll of 3 or higher and one failure for each 1
10d6<4f>5 - Roll 10 d6's and count one success for each roll of 4 or less and one failure for each roll of 5 or more 
```

Exploding Dice \(B,F\) !CP

Exploding dice, also known as "rule of 6" or "rule of 10s" depending on your gaming system, rolls an additional die if the maximum is rolled. If the additional roll is also the maximum number the additional rolls keep on going! The Compare Point can be specified to change the exploding trigger.

```text
Example Exploding Dice
3d6! - Rolls 3d6 and explodes every time a 6 is rolled
3d6!>5 - Rolls 3d6 and explodes every time a 5 or 6 is rolled 
```

Compounding Dice \(B,F\) !!CP

Shadowrun \(and some other systems, such as 7th Sea and L5R\) use a special style of exploding dice where the the additional rolls for each dice are added together as a single "roll". To do this, just use two exclamation marks instead of one. With the compounding exploding rolls a single roll can be infinitely high! The Compare Point can be specified to change the exploding trigger.

```text
Example Compounding Dice
5d6!! - Rolls 5d6 and compound every time a 6 is rolled
5d6!!5 - Rolls 5d6 and compound every time a 5 is rolled, 6's will be treated as a normal roll 
```

Penetrating Dice \(B,F\) !pCP

HackMaster \(and some other systems\) use a special style of exploding dice where the additional rolls for each dice have 1 subtracted from the roll. To do this, add a p after the exclamation mark. A die can penetrate multiple times but the modifier is only ever -1 to each additional die.

```text
Example Compounding Dice
5d6!p - Rolls 5d6 and explode with a -1 modifier every time a 6 is rolled
5d6!p>5 - Rolls 5d6 and explode with a -1 modifier every time a 5 or higher is rolled. 
```

Keep / Drop Dice \(B,F\) khN/klN/dhN/dlN

Some game systems ask you to roll a large number of dice, and then either drop a certain number \(N\) of the lowest rolls, or keep only a certain number \(N\) of the highest rolls. Roll20 supports this type of roll through the d and k commands, respectively. The optional h/l parameter can either be h to keep or drop the highest N dice or l to keep or drop the lowest N dice. If not specified when keeping rolls the high rolls will be kept and when dropping rolls the low rolls will be dropped.

```text
Example Keep Rolls
8d100k4 - Roll 8 d100's and keep the four largest rolls.
8d100kl4 - Roll 8 d100's and keep the four smallest rolls.
Example Drop Rolls
8d100d4 - Roll 8 d100's and drop the four smallest rolls.
8d100dh4 - Roll 8 d100's and drop the four largest rolls. 
```

Rerolling Dice \(B,F\) rCP

Several systems require that certain dice be reroll, for example brutal weapons in D&D 4e require any 1s or 2s to be re-rolled and the original die value ignored. The reroll modifier can be specified multiple times to allow rerolling at multiple Compare Points. By default the dice will continue to reroll until the result is inside the defined parameters. Optionally you can set the results to only reroll once regardless of the outcome.

```text
Example Rerolls
2d10r<2 - Roll 2 d10's and reroll any time a 2 or lower is rolled
8d6r - Roll 8 d6's and reroll any time a 1 is rolled
8d6r2r4r6 - Roll 8 d6's and reroll any time a 2, 4, or 6 is rolled
2d6ro<2 - Roll 2 d6's and reroll anything less than 2 but only once 
```

Special Case: Reroll Once \(B,F\) roCP

In some systems \(such as D&D 5E\) you want to reroll dice below a certain value, but you only want to reroll the dice one time each. To do that, just use ro instead of r.

```text
Example Reroll Once Rolls
2d10ro<2 - Roll 2 d10's and reroll any time a 2 or lower is rolled, but only up to one time per dice. 
```

Sorting Dice \(B,F\) sa/sd

You may want to see your results in either ascending or descending order. The sorting modifier does just this. The order parameter is optional and specifies the order to sort with a for ascending and d for descending. Sorting defaults to ascending if order is not specified.

```text
Example Rerolls
8d6s - Roll 8 d6's and sort the results in ascending order
8d6sd - Roll 8 d6's and sort the results in descending order 
```

Order of Operations for Modifiers

Modifiers are applied in the following order:

```text
Exploding, Compounding, Penetrating, Rerolls
These are applied while the dice are still rolling. imagine that you roll some exploding 6d6 on your table and the instant one of them settles as a 6 another die is rolled
Keep, Drop, Success, Failure, Sorting
These are applied after all of the dice have "settled" and all of the result values are known. 
```

### Grouped Rolls

Mutliple rolls can be perfomed within a group via curly braces using a comma to seperate the sub-roll expressions {3d6+3d4+5, 2d8+4}. Grouped Rolls have their own set of Group Modifiers which perform actions across the whole group.

Note: each sub-roll expression within a Grouped Roll must contain elements of the same type:

```text
"Sum rolls", which can be Basic Rolls or nested Group Rolls.
"Success rolls".
("M rolls"—which are simply numbers—may be mentioned in an error message. However, unlike the other two roll types, M rolls are not required to be present within every sub-roll expression.) 
```

For example, `[[{1d6,5}kh1]]`  will fail, but `[[ {1d6, 5 + 0d0}kh1 ]]` or `[[ {1d6, {5}}kh1 ]] or [[ {[[1d6]], 5}kh1 ]]` will work. 

### Grouped Roll Modifiers

Modfiers that can change the behavior or outcome of grouped rolls. Grouped Rolls can have multiple modifiers applied to a group roll to allow for complex dice expressions. Keep / Drop khN/klN/dhN/dlN

To apply a keep or drop modifier across multiple types of dice wrap the roll in a group. With a single Sub-Roll in the group the keep/drop operation is applied across all rolls. To choose the best or worse roll expression multiple sub-groups can be used. In this case the keep/drop operation is applied to the final result of each subgroup.

```text
Single Sub-Roll Keep Example
{4d6+3d8}k4 - Roll 4 d6's and 3 d8's, out of those 7 dice the highest 4 are kept and summed up.
Multiple Sub-Roll Drop Example
{4d6+2d8, 3d20+3, 5d10+1}d1 - Roll each of the three sub-roll expressions and total them up. Drop the sub-roll expression with the lowest total and sum the other two totals as the result. 
```

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

[https://wiki.roll20.net/Dice\_Reference](https://wiki.roll20.net/Dice_Reference)

