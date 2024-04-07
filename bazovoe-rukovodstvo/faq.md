---
description: >-
  Наиболее часто задаваемые вопросы. Задавайте их больше и это руководство будет
  расширяться
---

# FAQ



### Как сделать Elven accuracy в стандартном листе персонажа Roll20?

> найти в чарнике переменную rtype (в настройках должно стоять выбирать как бросать при броске) и заменить ее на
>
>

```
{{query=1}} ?{Advantage?|Normal Roll,&#123&#123normal=1&#125&#125 &#123&#123r2=[[0d20|Advantage,&#123&#123advantage=1&#125&#125 &#123&#123r2=[[1d20|Elven Accuracy,&#123&#123advantage=1&#125&#125 &#123&#123r2=[[2d20k1|Disadvantage,&#123&#123disadvantage=1&#125&#125 &#123&#123r2=[[1d20}
```

Подпишитесь на наш [Телеграм канал](https://t.me/cyborgs_and_mages), присоединитесь к нашему [Дискорд сообществу](https://discord.gg/yrJqvCqU3w) и поддерживайте нас на [Boosty](https://boosty.to/cyborgsandmages) или [Patreon](https://www.patreon.com/palikhov).

[Актуальная версия руководства по Roll20](https://cyborgsandmages.com/roll20-guide)

[Старая версия руководства](https://cyborgsandmages.gitbook.io/palant-roll20-guide)
