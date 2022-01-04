# Полезные видео



[Using Dynamic Lighting in Roll20 - Night Map](https://www.youtube.com/watch?v=t4KvbZEU04Q)

[Roll20 - Environmental Effects, City Preview](https://www.youtube.com/watch?v=XsRlQiMRbn8)

[Roll20 - Script Terrain Generator](https://www.youtube.com/watch?v=JsGfFX5-RBk)

[Setting up a D&D5e Roll20 Campaign](https://www.youtube.com/watch?v=bXTPetYV5Uc)

```text
!token-mod {{
--set bar3_value|0
statusmarkers|dead
--order back
}}
/desc @{selected|token_name} has been defeated.
/fx splatter-blood @{selected|token_id} @{selected|token_id}
/fx glow-blood @{selected|token_id} @{selected|token_id}
/fx bubbling-blood @{selected|token_id} @{selected|token_id}
```

[Roll20 Shaped Sheet - New Player Tutorial](https://www.youtube.com/watch?v=Qxu6GWb0sd4)

Macros listed

Attack/Utility:

```text
/w @{selected|character_name} &{template:5e-shaped} {{character_name=@{selected|character_name}}} @{selected|show_character_name} {{title=^{OFFENSE}}} {{offense=1}} {{text_big=@{selected|offense_macro_var}}}
```

```text
/w @{selected|character_name} &{template:5e-shaped} {{character_name=@{selected|character_name}}} @{selected|show_character_name} {{title=^{UTILITY}}} {{utility=1}} {{text_big=@{selected|utility_macro_var}}}
```

Statblock:

```text
%{selected|shaped_statblock}
```

Spells:

```text
@{selected|spells_macro_var}
```

Advantage/Normal/Disadvantage \(separate macros\):

```text
!shaped-at  --advantage
```

```text
!shaped-at  --normal
```

```text
!shaped-at  --disdvantage
```

Short rest:

```text
!shaped-rest --short
```

Long Rest:

```text
!shaped-rest --long
```

