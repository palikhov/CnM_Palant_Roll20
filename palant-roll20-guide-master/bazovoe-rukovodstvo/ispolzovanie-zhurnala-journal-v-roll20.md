# Использование Журнала \(Journal\) в Roll20

## Заметки и Журнал

Заметки - Handouts

Журнал - Journal

БИО - Bio

ИНФО - Info

АТТРИБУТ - Attribute

Способность? - Ability

Описание - Description

Мастерские заметки - GM Notes

## Форматирование handouts, внешний журнал, использование форума

### Journal Command Buttons

В пределах полей **БИО** и **ИНФО**, а также в **Мастерских замечаниях** или даже в **Описании** и **Заметках** м мастерских заметках Игрок \(а значит и Вы\) может создавать так называемые **Journal Command Buttons** - специальные гиперссылки, которые будут выводить результат выполнения макроса в чат Roll20.

Как создать Journal Command Button в одном из упомянутых выше текстовых полей? Следующим образом.

1. Вставить ссылку используя кнопку "ссылка" в редакторской панели инструментов. Insert a link using the link button on the redactor toolbar.
2. В самом начале поля  "URL" окна ссылок ввести `!&#13;` 
3. Добавить в макрос код после `!&#13;`
4. Установить заголовок !   !   Journal Command Button!   !    с использованием поля **Text** .
5. Нажать кнопку "Вставить" и "Сохранить изменения".
6. Journal Command Button была успешно создана.

> Note: при открытии ссылки Windows конвертирует HTML Entities ; соответственно обязательным после открытия является восстановления альтернативной записи используя `!&#13;` \(а также любые другие **Cущности HTML**\) прежде чем сохранять изменения в **Journal Command Button** используя окно "гиперссылки\*\*

Другой способ создания **Journal Command Button** заключается в копировании и вставке **API Command Button** или **Ability Command Button** из _**Текстового чата**_ в любое из вышеупомянутых текстовых полей.

> Note: **Journal Command Button** не будут работать если у вас включена функция всплывающиих окон при открытии листа персонажа.

### Ссылки между Записями Журнала

Вы также можете связывать с помощью гиперссылок Записи в Журнале внутри игры. Просто поставьте единичную `[` перед именем Персонажа или названием Заметки \(к примеру: “\[Mr. Bearington\] is most-known for his long, flowing hair”\), и когда после вашего сохранения записи Roll20 автоматически создаст нажимаемую кнопку которая будет открывать данную Запись в Журнале.

Эти ссылки работают как внутри приложения так и за его пределами, и Roll20 достаточно хорошо обрабатывает настройки доступа Игроков, что при отсутствии доступа к Заметке Игрок не сможет ее просмотреть даже если он получит прямую ссылку на эту Заметку.

Вы также можете использовать гиперссылки в описании предыстории персонажа, Мастерских заметках \(как для персонажей, так и для токенов\) и полях примечаний Заметок . Используйте гиперссылки для взаимосвязи сущностей, или даже создайте страницу "Оглавление", которая позволит получить быстрый доступ к наиболее используемым вами Заметкам.

### Внешний журнал

### Journal Command Buttons

Within the Bio & Info and GM Notes text fields of a Character, or the Description & Notes and GM Notes text fields of a Handout, you can create Journal Command Buttons; special hyperlinks that can output macros to the Text Chat when clicked.

Here's how to create a Journal Command Button within one of the aforementioned fields:

```text
Insert a link using the link button on the redactor toolbar.
At the very start of the "URL" field of the Link Window, type !&#13;
Add in your macro code after the !&#13;
Give your Journal Command Button a label using the "Text" field.
Press the "Insert" button and Save Changes; you have created a Journal Command Button! 
```

Note: opening the Link Window converts HTML Entities; it's necessary to restore the ! \(and any other HTML entities\) before saving changes to a Journal Command Button via the Link Window.

Another way to create Journal Command Buttons is to copy and paste an API Command Button or Ability Command Button from the Text Chat into one of the aforementioned text fields.

Note: Journal Command Buttons will not work if you have the Use Window Popouts for Characters option enabled.

