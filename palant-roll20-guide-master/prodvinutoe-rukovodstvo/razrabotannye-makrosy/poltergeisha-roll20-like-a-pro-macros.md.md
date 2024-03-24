# poltergeisha roll20 like a pro macros.md



I also have a set of macros that I use with my custom shopping rules. You can find those here: [https://gist.github.com/poltergeisha/41fb953a21c32323b66f6beb0bce2c21](https://gist.github.com/poltergeisha/41fb953a21c32323b66f6beb0bce2c21)

## Как организовать макросы

Самый простой способ организовать макросы - поместить их во вкладку "Атрибуты и способности" таблицы персонажей. Создайте новую таблицу персонажей для каждой категории макросов и поместите туда все ваши макросы. Это дает дополнительный бонус: вы не испортите html-замену символов в макросах. Затем вы можете использовать флажки под каждым макросом способностей, чтобы поместить его в свой бар.

Если вы хотите поделиться макросами с игроками, поделитесь с ними листом персонажа и поручите им поместить макросы в свои макробары и назвать их так, как они хотят.

Исключение составляют макросы, которые вы хотите использовать, набирая текст вместо того, чтобы нажимать кнопку макроса. Тогда их следует сделать обычными макросами, чтобы можно было набрать \#как угодно, чтобы вызвать макрос в чате.

#### Именование макросов

Макросы могут занимать много места на панели макросов! Самый простой способ решить эту проблему - использовать для их названия эмодзи. При переименовании макроса в панели макросов вы можете либо скопировать-вставить эмодзи из [https://emojipedia.org/](https://emojipedia.org/), либо, если у вас самая новая версия windows, набрать Windows Key + ., чтобы вызвать панель выбора эмодзи в любом текстовом поле.

Вы также можете использовать цвета, чтобы упорядочить макросы по типу. Вот как выглядит моя панель макросов:  ![My Macro Bar](https://i.imgur.com/lpkw7AJ.png)

Макрокнопки можно перекрашивать и переименовывать, щелкая на них правой кнопкой мыши.

#### Бары

Все эти макросы предполагают следующую конфигурацию баров:

Бар 1: КЗ

Bar 2: Other\_Resource

Бар 3: HP

Я использую полосу 3 для HP, потому что она находится над верхним краем жетона, а это значит, что если жетоны сложены друг над другом, то полоса здоровья не будет случайно сыромятным доспехом. На странице настроек я изменил цвет Bar 1 на синий, Bar 2 на красный, а Bar 3 на зеленый.

## Макросы GM

У меня они организованы так же, как на картинке выше, по цветам, с эмодзи, которые я использую \(если вы хотите скопировать меня прямо.\) **Все макросы ниже хранятся в листе персонажа под названием "GM", если не указано иное.**

### Розовый \(Таблицы и генераторы\)

#### Генератор НИПов 👤

Скоро будет!

#### Сокровища 💰

Бросает сокровища, основываясь на врагах.

```text
!treasure ?{Selected or manual?|
Selected,s ?{Individual or Hoard?&#124;individual&#124;hoard&#125;|
Manual,?{Individual or Hoard?&#124;individual&#124;hoard &#125; ?{CR &#125; ?{How many?&#125; }
```

#### Wild Magic Surge 💥.

Бросается по таблице "Дикая магия". Требуется таблица Wild-Magic. Этот макрос должен храниться в **Листе макросов ПИ**, потому что ПИ также могут его использовать, но ГМ также должен держать его в своем баре.
```text
!rt &{template:npcaction} {{rname=Wild Magic Surge}} {{description=[[1t[Wild-Magic]]]}}
```

### Синий \(Движение\)

#### Маршевый порядок 🏃‍♂️

Это просто меню маршевого порядка.


_Uses: Marching Order_

```text
!showMarchingOrderMenu
```

#### Carry Tokens 🏋️‍♂️

Used for riding mounts or carrying torches. This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

_Uses: Carry Tokens_

```text
!CARRY_TOKENS_MENU
```

#### Flight 🕊

Use for flying. This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

_Uses: Flight_

```text
!fly ?{How many feet?|0}
```

### Orange \(Token and Character Effects\)

#### Exhaustion 😫

Adds one level of exhaustion. Exhaustion must be stored in the first class resource on every PC's sheet \(which you should have set up  
already if you're using my long/short rest macros, right? ;\)

_Uses: ChatSetAttr_

```text
!setattr --modb --silent --sel --class_resource|?{Add or Subtract?|Add,+1|Subtract,-1}
/desc Exhaustion ?{Add or Subtract?|Add,gain|Subtract,lose}
```

#### Status ⚠

This allows anyone to quickly assign a condition status marker to themself. Easy to edit to add more. Nice becaues you can type to find something in a dropdown and because this standardizes the condition markers.

This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

_Uses: TokenMod, \(optional\) Status Info -- if you want to use this macro with Status Info, you will need to import my Status Settings:_ [https://gist.github.com/poltergeisha/459cd75a433163fc141034c9a116fb76](https://gist.github.com/poltergeisha/459cd75a433163fc141034c9a116fb76)

```text
!token-mod --set statusmarkers|?{Status|
Concentrating,!blue|
Readying,!stopwatch|
―, |
Prone,!back-pain|
Restrained,!fishing-net|
Grappled,!grab|
―, |
Incapacitated,!interdiction|
Stunned,!pummeled|
Unconscious,!sleepy|
―, |
Charmed,!chained-heart|
Frightened,!screaming|
―, |
Poisoned,!chemical-bolt|
Blinded,!bleeding-eye|
Deafened,!edge-crack|
Paralyzed,!padlock|
Petrified,!broken-skull|
―, |
Dodging,!bolt-shield|
Cover (half),!broken-shield:2|
Cover (three-quarters),!broken-shield:5|
Cover (full),!white-tower|
Invisible,!ninja-mask|
―, |
Blessed,!angel-outfit|
Bardic Inspiration,!half-heart|
Raging,!overdrive|
Marked,!archery-target|
Heroism,!strong|
Light,!yellow|
Mage Armor,!aura|
Slowed,!snail|
Hasted,!tread|
Tides of Chaos,!rolling-bomb|
Vow of Enmity,!fist|
―, |
Dying,!skull --set tint_color&#124;C40000|
Dead,!dead --set tint_color&#124;ffffff|
―, |
Clear All, --set statusmarkers#-red#-blue#-green#-brown#-purple#-pink#-yellow#-dead#-skull#-sleepy#-half-heart#-half-haze#-interdiction#-snail#-lightning-helix#-spanner#-chained-heart#-chemical-bolt#-death-zone#-drink-me#-edge-crack#-ninja-mask#-stopwatch#-fishing-net#-overdrive#-strong#-fist#-padlock#-three-leaves#-fluffy-wing#-pummeled#-tread#-arrowed#-aura#-back-pain#-black-flag#-bleeding-eye#-bolt-shield#-broken-heart#-cobweb#-broken-shield#-flying-flag#-radioactive#-trophy#-broken-skull#-frozen-orb#-rolling-bomb#-white-tower#-grab#-screaming#-grenade#-sentry-gun#-all-for-one#-angel-outfit#-archery-target --set tint_color&#124;transparent|
―, |
C O L O R S, |
Red,!red|
Brown,!brown|
Green,!green|
Orange,!orange|
Purple,!purple|
Pink,!pink|
U N A S S I G N E D, |
Skull,!skull|
Half Haze,!half-haze|
Spanner,!spanner|
Death Zone,!death-zone|
Drink Me,!drink-me|
Three Leaves,!three-leaves|
Fluffy Wing,!fluffy-wing|
Arrowed,!arrowed|
Black Flag,!black-flag|
Broken Heart,!broken-heart|
Cobweb,!cobweb|
Flying Flag,!flying-flag|
Radioactive,!radioactive|
Trophy,!trophy|
Frozen Orb,!frozen-orb|
Grenade,!grenade|
Sentry Gun,!sentry-gun|
All For One,!all-for-one|
}
```

#### Light 💡

Set the light and sight of a token to standard values, like that of a torch or candle.

_Uses: Token Mod_

```text
!token-mod --set ?{Vision|
Torch, light_radius#40 light_dimradius#20 light_hassight#yes light_angle#360 light_otherplayers#yes|
Hooded Lantern, light_radius#60 light_dimradius#30 light_hassight#yes light_angle#360 light_otherplayers#yes|
Bullseye Lantern, light_radius#120 light_dimradius#60 light_angle#60 light_hassight#yes light_otherplayers#yes|
Lamp, light_radius#30 light_dimradius#15 light_hassight#yes light_angle#360 light_otherplayers#yes|
Candle, light_radius#5 light_dimradius#=0 light_hassight#yes light_angle#360 light_otherplayers#yes|
Darkvision, light_radius#60 light_dimradius#=-5 light_hassight#yes light_angle#360 light_otherplayers#no|
Darkvision (90'), light_radius#90 light_dimradius#=-5 light_hassight#yes light_angle#360 light_otherplayers#no|
Warlock Devil's Sight, light_radius#120 light_dimradius#=120 light_hassight#yes light_angle#360 light_otherplayers#no|
No light source(Dusk), light_radius#120 light_dimradius#=-5 light_hassight#yes light_angle#360 light_otherplayers#no|
Fog, light_radius#200 light_dimradius#=5 light_hassight#yes light_angle#360 light_otherplayers#no|
No light source, light_radius#5 light_dimradius#=-5 light_hassight#yes light_angle#360 light_otherplayers#no|
Blinded, light_hassight#no light_angle#360 light_otherplayers#no}
```

#### Inspirtion 🎉

Adds or removes inspiration from the selected PC \(will also work for NPCs if you create the Inspiration attribute on their sheets.\)

_Uses: Robin Kueper's Inspiration Tracker_

```text
!inspiration
```

### Green \(Combat\)

#### Combat ⚔

Opens combat menu. Select tokens and click Start to start combat.

_Uses: Robin Kueper's Combat Tracker_

```text
!ct
```

#### End of Turn 🔚

Moves the turn tracker forward. This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

_Uses: Robin Kueper's Combat Tracker_

```text
!ct next
```

#### GM Sheet 📄

Brings up a party sheet for the selected tokens.

_Uses: GMSheet_

```text
!gmsheet
```

### Red \(Damage and Healing\)

#### Deal Damage 💢

Deals damage to a targeted token. I store this macro on the **PC Macro Sheet** because I have me PCs deal damage to the baddies after rolling. This saves me time, especially when the roll20 token bubbles are very slow to load.

_Uses: TokenMod_

```text
!token-mod --set bar3_value|-[[(?{Damage})/?{Resistance?|No,1|Yes,2}*?{Vulnerability?|No,1|Yes,2}]]  --ids @{target|Target 1|token_id}
/em damaged @{target|Target 1|token_name}.
```

#### Deal Multiple Damage 💢👥

Same as above, but can target up to 5 tokens. If you want to target less than 5, just select the same token multiple times to fill up the remaining targets \(it will still only apply the damage once.\)

_Uses: TokenMod_

```text
!token-mod --set bar3_value|-[[(?{Damage})/?{Resistance?|No,1|Yes,2}*?{Vulnerability?|No,1|Yes,2}]]  --ids @{target|Target 1|token_id} @{target|Target 2|token_id} @{target|Target 3|token_id} @{target|Target 4|token_id} @{target|Target 5|token_id}
/em damaged @{target|Target 1|token_name}, @{target|Target 2|token_name}, @{target|Target 3|token_name}, @{target|Target
4|token_name}, @{target|Target 5|token_name}.
```

#### Heal 💉

Heals by the normal healing point amounts or a custom amount. This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

_Uses: TokenMod_

```text
!token-mod --set bar3_value|+[[?{Type|Common,2d4+2|Greater,4d4+4|Superior,8d4+4|Supreme,10d4+20|Other,?{Custom Heal&#125;}]]  --ids @{target|Target 1|token_id}
/em healed @{target|Target 1|token_name}.
```

### Purple \(Saves, Checks, Skills\)

#### Group Save

Does a group save, with option for whisper/public, kind of save, and DC.

_Uses: GroupCheck_

```text
!group-check {{
--hideformula
--?{Output|Public,public|Whisper,whisper}
--?{Ability Save|Strength,Strength Save|Dexterity,Dexterity Save|Constitution,Constitution Save|Intelligence,Intelligence Save|Wisdom,Wisdom Save|Charisma,Charisma Save}
--ro ?{Roll Type|Normal,roll1|Advantage,adv|Disadvantage,dis}
--subheader vs DC ?{DC}
--process
}}
```

#### Group Check

Same as Group Save but with checks.

_Uses: GroupCheck_

```text
!group-check {{
--hideformula
--?{Output|Whisper,whisper|Public,public}
--?{Ability Check|Strength,Strength Check|Dexterity,Dexterity Check|Constitution,Constitution Check|Intelligence,Intelligence Check|Wisdom,Wisdom Check|Charisma,Charisma Check}
--ro ?{Roll Type|Normal,roll1|Advantage,adv|Disadvantage,dis}
--subheader vs DC ?{DC}
--process
}}
```

#### Group Skill

Same as Group Save but with skills.

_Uses: GroupCheck_

```text
!group-check {{
--hideformula
--?{Output|Whisper,whisper|Public,public}
--?{Ability Check|Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival}
--ro ?{Roll Type|Normal,roll1|Advantage,adv|Disadvantage,dis}
--subheader vs DC ?{DC}
--process
}}
```

### Dark Red \(Time and Weather\)

#### Calendar 📅

Just the calendar menu because I can't remember these commands.

_Uses: Calendar_

```text
!cal
```

#### Tomb of Annihilation Day & Weather Generator 🌄

Coming Soon!

### White \(Speaking\)

#### Languages 🗣

Allows you and PCs to "speak" other languages. This macro should be stored in the **PC Macro Sheet** because PCs can also use it.

This one requires some set up: Create a character sheet for every language in your game, then assign that character to the players whose characters can speak that language. If you have more languages or different languages than are listed in the macro, you'll  
need to edit the macro to reflect that.

```text
/w ?{What language?|Draconic|Dwarven|Chultan|Elven|Gnomish|Goblin|Halfling|Infernal|Thieves' Cant} ?{Message}
/em speaks in a language you don't understand.
```

#### Whisper to a Token 🤐

This is stored in the Macro tab because it can also be called as \#wch \(see below.\) I just like having a button for it.

### Token Macros for the GM

Token macros require a token to be selected, so they're good for things that act on tokens. Store this macro in the normal Macro Tab and set it to be a token macro, since you'll only ever need it when having tokens selected.

#### Bump

Make sure you have bump set to auto push and auto slave in the script library settings, and you can basically control the whole script with this button.

_Uses: Bump_

```text
!bump
```

### Chat Macros for the GM

#### Default Token

Sets currently selected token as the default token for the character its assigned to. Make this a button at the beginning of the game when people are making lots of characters but after that it can just be a chat macro.

```text
!token-mod --set defaulttoken
```

## PC Macros

All the below macros should be stored on a character sheet called "Macros" that is shared with and editable by all players. Instruct your players to put these macros in their macro bar and rename/recolor them to their liking.

Find the code for these macros in the above GM section.

* Carry Tokens 🏋️‍♂️
* Flight 🕊
* Status ⚠
* End of Turn 🔚
* Deal Damage 💢
* Deal Multiple Damage 💢👥
* Heal 💉
* Language 🗣

## Resting

All the below macros should be stored on a character sheet called "Resting" that is shared with and editable by all players.

It's important that your players use ONE of the below long rest and ONE of the below short rest macros depending on how many class resources they have which refill on a short and/or long rest. Once they choose the correct macro, they should add it to their macro bar and rename/recolor it to their liking.

You MUST instruct your players to organize their class resources from left to right, top to bottom, like this:

* Exhuastion is FIRST
* Next are all abilities that come back on a short AND/OR long rest
* Next are al abilities that come back on ONLY a long rest.

ALL of the long rest macros use these scripts: 5e OGL Companion, ChatSetAttr ALL of the short rest macros use these scripts: ChatSetAttr

### Long Rest

#### Long Rest 0

Removes 1 exhaustion and refills spell slots, hp, and hd.

```text
!longrest @{selected|character_name}
!modbattr --modb --sel --class_resource|-1 --fb-header Long Rest Taken --fb-content Refilled HP, Hit Dice, and Spell Slots. Exhaustion is _CUR0_. **Don't forget to prepare spells!**
```

#### Long Rest 1

Removes 1 exhuastion, refills spell slots, hp, and hd, and refills one class resource.

```text
!longrest @{selected|character_name}
!modbattr --sel --class_resource|-1 --other_resource|@{selected|other_resource|max} --fb-header You took a long rest. --fb-content Refilled HP, Hit Dice, Spell Slots, and @{selected|other_resource_name}. Exhaustion is _CUR0_. **Don't forget to prepare spells!**
```

#### Long Rest 2

Same song and dance as above, 2 class resources.

```text
!longrest @{selected|character_name}
!modbattr --sel --class_resource|-1 --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --fb-header You took a long rest. --fb-content Reset HP, Hit Dice, Spell Slots, @{selected|other_resource_name}, and @{selected|repeating_resource_$0_resource_left_name}. Exhaustion is _CUR0_. **Don't forget to prepare spells!**
```

#### Long Rest 3

Same song and dance as above, 3 class resources.

```text
!longrest @{selected|character_name}
!modbattr --sel --class_resource|-1 --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --repeating_resource_$0_resource_right|@{selected|repeating_resource_$0_resource_right|max} --fb-header You took a long rest. --fb-content Refilled HP, Hit Dice, Spell Slots, @{selected|other_resource_name}, @{selected|repeating_resource_$0_resource_left_name}, and @{selected|repeating_resource_$0_resource_right_name}. Exhaustion is _CUR0_. **Don't forget to prepare spells!**
```

#### Long Rest 4

Same song and dance as above, 4 class resources.

```text
!longrest @{selected|character_name}
!modbattr --sel --class_resource|-1 --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --repeating_resource_$0_resource_right|@{selected|repeating_resource_$0_resource_right|max} --repeating_resource_$1_resource_left|@{selected|repeating_resource_$1_resource_left|max} --fb-header You took a long rest. --fb-content Refilled HP, Hit Dice, Spell Slots, @{selected|other_resource_name}, @{selected|repeating_resource_$0_resource_left_name}, @{selected|repeating_resource_$0_resource_right_name}, and @{selected|repeating_resource_$1_resource_left_name}. Exhaustion is _CUR0_. **Don't forget to prepare spells!**
```

### Short Rest

#### Short Rest 0

Basically just gives players a button to hit to roll hit dice.

```text
!modbattr --replace --sel --other_resource|@{selected|other_resource|0} --fb-header You took a short rest. --fb-content [Roll Hit Dice](~selected|hit_dice)
```

#### Short Rest 1

Refills one class resource + button to roll hit dice.

```text
!setattr --replace --sel --other_resource|@{selected|other_resource|max} --fb-header You took a short rest. --fb-content Refilled @{selected|other_resource_name}. [Roll Hit Dice](~selected|hit_dice)
```

#### Short Rest 2

Refills two class resources + button to roll hit dice.

```text
!setattr --replace --sel --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --fb-header You took a short rest. --fb-content Refilled @{selected|other_resource_name} and @{selected|repeating_resource_$0_resource_left_name}. [Roll Hit Dice](~selected|hit_dice)
```

#### Short Rest 3

Refills three class resources + button to roll hit dice.

```text
!setattr --replace --sel --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --repeating_resource_$0_resource_right|@{selected|repeating_resource_$0_resource_right|max} --fb-header You took a short rest. --fb-content Refilled @{selected|other_resource_name}, @{selected|repeating_resource_$0_resource_left_name}, and @{selected|repeating_resource_$0_resource_right_name}. [Roll Hit Dice](~selected|hit_dice)
```

#### Short Rest 4

Refills four class resources + button to roll hit dice.

```text
!setattr --replace --sel --other_resource|@{selected|other_resource|max} --repeating_resource_$0_resource_left|@{selected|repeating_resource_$0_resource_left|max} --repeating_resource_$0_resource_right|@{selected|repeating_resource_$0_resource_right|max} --repeating_resource_$1_resource_left|@{selected|repeating_resource_$1_resource_left|max} --fb-header You took a short rest. --fb-content Refilled @{selected|other_resource_name}, @{selected|repeating_resource_$0_resource_left_name}, @{selected|repeating_resource_$0_resource_right_name}, and @{selected|repeating_resource_$1_resource_left_name}. [Roll Hit Dice](~selected|hit_dice)
```

## Макросы чата для всех

Эти макросы можно найти на вкладке коллекции или набрав \# в чате. Не настолько важны, чтобы загромождать их кнопками. Игроки могут добавить их в свою панель макросов, если захотят.

#### Update-Token-Actions

Создание действий с токенами.


_Uses: Token Macro-Book Generator_

```text
!generate-spellbook
!generate-attackbook
!generate-checkbook
```

#### calc

Калькулятор.
```text
**=** [[?{Калькулятор}]]
```

#### img

Отправьте картинку в чат.

```text
[Image](?{Image URL})
```

#### link

Опубликуйте ссылку В чатЕ.

```text
Link: **[?{Link Title}](?{Link URL})**
```

#### roll

Сделайте красивый, отформатированный бросок d20.

```text
/me rolls a [[1d20+?{modifier|0}]] for ?{reason|no reason}.
```

#### ttms

Сокращает talktomyself

```text
/talktomyself
```

#### wch

Whisper to a target token

```text
/emas @{selected|token_name} speaks low.
/w @{target|token_name} ?{"What"|um}
```

#### whisper-gm

Whisper to the gm

```text
/w gm ?{Message}
```

#### fx-burst

Create an FX centered on a target token

```text
/fx ?{Type|Bomb, bomb|Bubbling,bubbling|Burn,burn|Burst,burst|Explode,explode|Glow,glow|Missile,missile|Nova,nova}-?{Color|Green Acid,acid|Blood,blood|Pink Charm,charm|Black Death,death|Fire,fire|Frost,frost|Holy Light,holy|Rainbow Magic,magic|Neon Slime,slime|Smoke,smoke|Water,water} @{target|token_id}
```

#### fx-directed

Create an FX in a directed line

```text
/fx ?{Type|Beam, beam|Breath, breath|Splatter, splatter}-?{Color|Green Acid, acid|Blood, blood|Pink Charm, charm|Black Death, death|Fire, fire|Frost, frost|Holy Light, holy|Rainbow Magic, magic|Neon Slime, slime|Smoke, smoke|Water, water} @{target|Caster|token_id} @{target|Foe|token_id}
```

