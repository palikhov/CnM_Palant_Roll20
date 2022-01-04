# Расширенная логика обработки бросков

Because players roll a lot more dice using this variant than normal, it's important for them to know their roll modifiers for those new rolls. As such, it's be useful to have a tool for your players that allows them to look up all of their roll modifiers at any time \(as a macro token action accessible by all players\). Likewise, you'd want the tool to tell you what all of the various NPC/monster "scores" are that oppose those rolls, so you'd needed it to calculate the simple number which a player would need to beat.

That is, you'd need something that would output something like this:

Flat-Footed AC for Bob: +4 = 14 \(Subtract lost Dodge bonus\)

A number of these values have "conditionals" in them. For example, for Flat-Footed AC, you lose your Dex bonus \(if you had one\), but keep a Dex penalty. You'd need to represent these conditions in your tool, but the only tool you normally have available is macros/abilities unless you can afford Pro level \(for custom character sheets\). As-is, you can't do conditional math like the following because there's no "conditional" syntax available in macros/abilities.

```text
[[ @{selected|dexmod} < 1 ? @{selected|dexmod} : 0 ]]
```

That means that you'll have to use Dice Representation to display all of these modifiers and all of their innate conditionals, and display them through a GM whisper so no one but you and the GM can see that information.

```text
/w gm Flat-Footed AC for @{selected|character_name}: +[[ @{selected|modifier} ]] = [[ @{selected|modifier} +10 ]] (Subtract lost Dodge bonus)
```

The following formulas allow you to create very simple inequality-based conditionals using only Dice Representation. Assume that in the formulas all ALL\_CAPS variables are integers that you plan on replacing with actual integers \(or attributes that are integers\) when you implement them. \(Note: If you replace a variable with an explicit negative number, Roll20 Order of Operations must have that negative number in parentheses.\) Greater Than or Equal To

The formula below returns a 1 for all integers MINIMUM\_VALID\_NUMBER or more, and returns 0 for all other integers.

```text
[[ ( 1 - ( floor( ( MINIMUM_VALID_NUMBER - 1 - ATTRIBUTE ) / ( abs( MINIMUM_VALID_NUMBER - 1 - ATTRIBUTE ) + 0.001 ) ) + 1 ) ) ]]
```

The formula below returns ATTRIBUTE when it's an integer that is greater than or equal to the MINIMUM\_VALID\_NUMBER and will be 0 for all other integers.

```text
[[ ATTRIBUTE * ( 1 - ( floor( ( MINIMUM_VALID_NUMBER - 1 - ATTRIBUTE ) / ( abs( MINIMUM_VALID_NUMBER - 1 - ATTRIBUTE ) + 0.001 ) ) + 1 ) ) ]]
```

### Less Than or Equal To

The formula below returns a 1 for all integers MAXIMUM\_VALID\_NUMBER or less, and return 0 for all other integers. This is useful for situations where above a certain maximum you should ignore that value \(such as ignoring a Dex Bonus when flatfooted but keeping a penalty\).

```text
[[ ( floor( ( MAXIMUM_VALID_NUMBER - ATTRIBUTE ) / ( abs( MAXIMUM_VALID_NUMBER - ATTRIBUTE ) + 0.001 ) ) + 1 ) ]]
```

The formula below returns ATTRIBUTE when it's an integer that is less than or equal to the MAXIMUM\_VALID\_NUMBER and will be 0 for all other integers.

```text
[[ ATTRIBUTE * ( floor( ( MAXIMUM_VALID_NUMBER - ATTRIBUTE ) / ( abs( MAXIMUM_VALID_NUMBER - ATTRIBUTE ) + 0.001 ) ) + 1 ) ]]
```

#### Full Example In-Use

Thus, to accomplish ignoring a Dex Bonus but keeping a Dex Penalty, you can write the following default template to a macro token action visible to all players:

```text
/w gm &{template:default} {{name=AC Roll Modifiers for @{selected|character_name} }} {{Flat-Footed=+[[ @{selected|acitembonus} + @{selected|shieldbonus} + @{selected|size} + @{selected|armorclassnaturalarmor} + @{selected|armorclassdeflectionmod} + @{selected|armorclassmiscmod} + @{selected|dexmod} * ( floor( ( (-1) - @{selected|dexmod} ) / ( abs( (-1) - @{selected|dexmod} ) + 0.001 ) ) + 1 ) ]] = [[ @{selected|acitembonus} + @{selected|shieldbonus} + @{selected|size} + @{selected|armorclassnaturalarmor} + @{selected|armorclassdeflectionmod} + @{selected|armorclassmiscmod} + @{selected|dexmod} * ( floor( ( (-1) - @{selected|dexmod} ) / ( abs( (-1) - @{selected|dexmod} ) + 0.001 ) ) + 1 ) +10 ]] (Subtract lost Dodge bonus)}}
```

### Booleans

Say you run a version of the Defense Bonus variant where immaterial armor stacks with the Defense Bonus. You can't just use the @{selected\|acitembonus} attribute to determine whether the Defense Bonus applies, but if you have a custom attribute for all creatures called "Is Wearing Physical Armor?", you can make it a boolean 1 or 0 depending on whether or not that's the case.

```text
[[ @{selected|DefenseBonus}-(@{selected|DefenseBonus}*@{selected|Is Wearing Physical Armor?}) ]]
```

Admittedly, the formula could be made simpler if the attribute was "Is NOT Wearing Physical Armor".

```text
[[ @{selected|DefenseBonus}*@{selected|Is NOT Wearing Physical Armor?} ]]
```

However, when looking at a character's attributes list it's easier to wrap your head around the logic of a "1" affirming a positive rather than affirming a negative.

