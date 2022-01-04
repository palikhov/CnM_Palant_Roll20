# Советы по организации рабочего пространства, кнопок у токенов и поля \(bar\) для кнопок макросов

### Организация макросов с помощью созданных листов персонажа

Создаем два листа персонажа - `PCUtils` & `GMUtils`

#### PCUtils

Включает в себя следующие макросы \(созданные в виде Ability\)

#### GMUtils

Включает в себя следующие макросы \(созданные в виде Ability\)

### Token Actions

Token Actions are specially-designated macros and character abilities which appear whenever a token is selected on the screen. They appear in a bar along the top of your screen, and the contents of the bar are context-sensitive. When you select a token, all macro token actions will be shown, as well as ability token actions for the token's linked character \(if applicable\). This means, for example, if you designate that 3 abilities for the Character "Mr. Bearington" are token actions \(1.\), those actions will only show up for tokens that are linked to \(2.\) "Mr. Bearington", not for all tokens. This allows you to easily setup abilities and macros to be used as token actions for both you and your players, without them needing to mess around with creating their own macros. When creating Token Actions, you can also use the @{selected} token variables along with token actions to great effect, creating macros for system-wide rolls \(e.g. Bluff\) that show up when a token is selected, and pull information from the selected token to perform the roll \(3.\).

You can also, for example, set up a monster's abilities in a Character for that monster type, and then have easy access as GM to those abilities whenever you select a token of that type, without cluttering your macro bar or hunting in the journal tab to use them. For example, create a Character called "Dire Bear", link all tokens that are dire bears to that character, and then set up abilities designated as token actions such as "Swipe" and "Roar". You can then just click a dire bear token, then click the button for "Swipe". You'll find a new checkbox when editing Macros to designate it as a token action\(4.\), and you'll find a similar checkbox when editing an ability, below where you enter the name of the ability. Just check the respective box and save the macro/ability, and the next time you select a token you'll see it as an action.

#### Sorting Token Actions

**Default**

By default, _Token Actions_ are sorted alphabetically. Under the default, you can preface Token Actions \(Macros or Abilities\) with something to affect sorting. Some options: • Numbers -- using numbers like 1, 2, 3 will get sorted as you would expect. If you have more than 9 macros, you'll want to zero-pad them to maintain the order: 01, 02, 03, 04, ... • Symbols -- There are various UTF-8 symbols you can use to categorize your Token Actions with icons. All Token Actions with the same symbol will be grouped together. This will require some trial and error as different operating systems have different symbols they support. Search Google for "UTF-8 Symbols" to start finding some. ☀, ☄, ★, ☯, ... • Zero-width Spaces -- You can also use zero-width spaces, if you are concerned about the length of your Token Actions names growing. Simply put some number of them before the name of your Token Action, the more there are, the earlier it will be listed. You can use this code to represent one zero-width space: ​ • Some Combination of the above -- You might decide to use zero-width spaces with UTF-8 symbols to get just the right iconography and sorting.

**Legacy**

If you have grown accustom to the old way of ordering Token Actions, you can revert to the legacy behavior by disabling the alphabetical sorting of Token Actions. This is a per player setting which can be found in the My Settings Panel. Under this system, the order in which Token Actions are shown in the Abilities section of a Character determines the order they are shown in the Token Action menu bar. _Note:_ This only works for Abilities that are shown as Token Actions; If you have any Macros set as Token Actions, the order of the tokens will not be predictable.

