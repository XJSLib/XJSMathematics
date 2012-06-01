The main idea here is that you don't want methods where you should have operators.

So insteand of writing:
```
matrix1.add( matrix2 );
```
or
```
Matrix.sum( matrix1, matrix2 );
```
you'll write
```
matrix1[ '+' ]( matrix2 );
```

Of course, you can use the dot notation for some operators:
```
matrix1.x( matrix2 );
```

And as you would expect,
```
integer.x( matrix );
```
doesn't give the same result.

In fact, th core of this script is made of 3 functions:

1) XJSMathematics.defineType that lets you define a type (Matrix, Integer etc.).
When doing so, you also make your type inherit from another (e.g. integers inherit from rational number).
Every type must at least inherit XJSMathematicalObject because it have the properties used to call the operators.

2) XJSMathematics.defineOperator that lets you define oeprators by:
- the type of their operands
- the output type (it is useless at the moment but one day, it'll be used to apply operators on expressions that will remember what actions they kmust apply and will do it later when they get the arguments needed)
- whether the operator is commutative or not (note that this is not the mathematical notion of commutativity. The production from (matrix, matrix) is commutative but the one from (integer, matrix) isn't. In fact, it is just used to let you define it only once and not have to add the exact same operator with the input types in the reverse order)
- the action
- whether inputs should be trabsformed or not. If you have integer + rationalNumber, it should return integer.toRationalNumber( ) + rationalNumber but when you do integer x matrix, you don't want the integer transformed into a rational number because you'll only need to do it if the matrix contains rational numbers that aren't integers)
- its symbol. If the symbol hasn't already been used, a function using applyOperator is added to the prototype of XJSMathematicalObject so that all objects can use it.

3) applyOperator that decides what operator to apply and transforms the input if needed. This function is not part of the exposed API.

[Here is a demo](http://xjslib.github.com/src/XJSMathematics/demo/XJSMathematics.html)
It ouputs a matrix in the console.
You can try the operators defined.
You have several predefined variables:
- i1 to i3 containing their index as integer
- f12, f23 and f31 containing the fraction reprented by firstDigit / secondDigit
- m contraining the matrix shown