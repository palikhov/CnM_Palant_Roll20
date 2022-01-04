# Советы по поводу настройки бросков костей в Roll20

Conditional Statements \(Math Only\) Using the multiplicative properties of 0\(absorption\) and 1\(identity\) you can write conditional statements for integer values\(and to some extent floating point values too\) An example of this is the formula "if x greater than or equal to A, then T; else F," where T and F are some values. If x or A are dice rolls, surround them with \[\[\]\] inside these formulas. This can be written as a macro with

```text

[[{{x,something-less-than-A}>A}*(T-F) + F]]
```

 Example 1:

```text

[[{{3,0}>2}*(4) + 3]]
```

 Example 2:

```text

[[{{[[1d4]],0}>2}*(4) + 3]]
```

 The above examples will multiply \(4\) with however many times the statement '{X}&gt;2' was true and add +3 to the result. For example 1 that is true 1 time, since 3 &gt; 2, but 0  
\[\[{{x,something-less-than-A}&gt;\[\[A+1\]\]}\*\(T-F\) + F\]\]  
 \(Assuming A is an integer\)  
 Alternatively, you can multiply one minus the \(x==A\) check below with the \(x&gt;=A\) check above, like so:

```text

[[({{x,something-less-than-A}>A})*(1-{0,floor(1-abs(x-A))}dl1)*(T-F)+F]]
```

 "x equals A" is simpler.

```text

[[({0,floor(1-abs(x-A))}dl1)*(T-F) +F]]
```

Now for some identities: "x less than A" is the inverse of "x greater than or equal to A," so the conditional can be written as "x greater than or equal to A, then F; else T" using the formulas above. Similarly with "x less than or equal to A" and "x greater than A," as well as with "x not equal to A" and "x equal to A."

