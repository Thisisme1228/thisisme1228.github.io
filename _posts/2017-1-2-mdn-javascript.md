---
layout: post
title:  Web 技术文档 JavaScript
date:   2017-1-2 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
<!-- more -->

### JavaScript 指南

#### 语法和数据类型

**变量的作用域**

ECMAScript 6 之前的JavaScript没有 语句块 作用域；相反，语句块中声明的变量将成为语句块所在代码段的局部变量。例如，如下的代码将在控制台输出 5，因为 x 的作用域是声明了 x 的那个函数（或全局范围），而不是 if 语句块。

```js
if (true) {
  var x = 5;
}
console.log(x); // 5
```

如果使用 ECMAScript 6 中的 let 声明，上述行为将发生变化。

```js
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

**变量声明提升**

在 ECMAScript 2015 中，let（const）将不会提升变量到代码块的顶部。因此，在变量声明之前引用这个变量，将抛出错误ReferenceError。这个变量将从代码块一开始的时候就处在一个“暂时性死区”，直到这个变量被声明为止。

```js
console.log(x); // ReferenceError
let x = 3;
```

**函数提升**

对于函数，只有函数声明会被提升到顶部，而不包括函数表达式。

```js
/* 函数声明 */

foo(); // "bar"

function foo() {
  console.log("bar");
}


/* 函数表达式   表达式定义的函数，称为匿名函数。匿名函数没有函数提升。*/

baz(); // TypeError: baz is not a function
//此时的"baz"相当于一个声明的变量，类型为undefined。
由于baz只是相当于一个变量，因此浏览器认为"baz()"不是一个函数。
var baz = function() {
  console.log("bar2");
};
```

**常量(Constants)**

你可以用关键字 const 创建一个只读(read-only)的常量。常量标识符的命名规则和变量相同：必须以字母、下划线或美元符号开头并可以包含有字母、数字或下划线。

```js
const prefix = '212';
```

常量不可以通过赋值改变其值，也不可以在脚本运行时重新声明。它必须被初始化为某个值。

常量的作用域规则与 let 块级作用域变量相同。若省略const关键字，则该标识符将被视为变量。

在同一作用域中，不能使用与变量名或函数名相同的名字来命名常量。例如：

```js
// THIS WILL CAUSE AN ERROR
function f() {};
const f = 5;

// THIS WILL CAUSE AN ERROR ALSO
function f() {
  const g = 5;
  var g;

  //statements
}
```

然而,对象属性是不受保护的,所以可以使用如下语句来执行。

```js
const MY_OBJECT = {"key": "value"};
MY_OBJECT.key = "otherValue";
```

数据类型的转换

JavaScript是一种动态类型语言(dynamically typed language)。这意味着你声明变量时可以不必指定数据类型，而数据类型会在脚本执行时根据需要自动转换。

在涉及其它运算符（译注：如下面的减号'-'）时，JavaScript语言不会把数字变为字符串。例如（译注：第一例是数学运算，第二例是字符串运算）：

```js
"37" - 7 // 30
"37" + 7 // "377"
```

**字符串转换为数字**

parseInt()和parseFloat()

单目加法运算符

将字符串转换为数字的另一种方法是使用单目加法运算符。

```js
"1.1" + "1.1" = "1.11.1"
(+"1.1") + (+"1.1") = 2.2   // 注：加入括号为清楚起见，不是必需的。
```

**字面量**

1、数组字面量

数组字面值是一个封闭在方括号对([])中的包含有零个或多个表达式的列表，其中每个表达式代表数组的一个元素。当你使用数组字面值创建一个数组时，该数组将会以指定的值作为其元素进行初始化，而其长度被设定为元素的个数。

下面的示例用3个元素生成数组coffees，它的长度是3。

```js
var coffees = ["French Roast", "Colombian", "Kona"];

var a=[3];

console.log(a.length); // 1

console.log(a[0]); // 3
```

数组字面值中的多余逗号

你不必列举数组字面值中的所有元素。若你在同一行中连写两个逗号（,），数组中就会产生一个没有被指定的元素，其初始值是undefined。以下示例创建了一个名为fish的数组：

```js
var fish = ["Lion", , "Angel"];
```

在这个数组中，有两个已被赋值的元素，和一个空元素（fish[0]是"Lion"，fish[1]是undefined，而fish[2]是"Angel"；译注：此时数组的长度属性fish.length是3)。

如果你在元素列表的尾部添加了一个逗号，它将会被忽略。在下面的例子中，数组的长度是3，并不存在myList[3]这个元素.元素列表中其它所有的逗号都表示一个新元素（的开始）。

> 注意：尾部的逗号在早期版本的浏览器中会产生错误，因而编程时的最佳实践方式就是移除它们。

(译注：而“现代”的浏览器似乎鼓励这种方式，因为好多网页中都这么写？)

```js
var myList = ['home', , 'school', ];
```

在下面的例子中，数组的长度是4，元素myList[0]和myList[2]缺失（译注：没被赋值，因而是undefined）。

```js
var myList = [ , 'home', , 'school'];
```

再看一个例子。在这里，该数组的长度是4，元素myList[1]和myList[3]被漏掉了。（但是）只有最后的那个逗号被忽略。

```js
var myList = ['home', , 'school', , ];
```

理解多余的逗号（在脚本运行时会被如何处理）的含义，对于从语言层面理解JavaScript是十分重要的。但是，在你自己写代码时：`显式地将缺失的元素声明为undefined，将大大提高你的代码的清晰度和可维护性`。

**对象字面量**

对象属性名字可以是任意字符串，包括空串。如果对象属性名字不是合法的javascript标识符，它必须用""包裹。属性的名字不合法，那么便不能用.访问属性值，而是通过类数组标记("[]")访问和赋值。

```js
var unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!"
}
console.log(unusualPropertyNames."");   // 语法错误: Unexpected string
console.log(unusualPropertyNames[""]);  // An empty string
console.log(unusualPropertyNames.!);    // 语法错误: Unexpected token !
console.log(unusualPropertyNames["!"]); // Bang!
```

#### 流程控制与错误处理

**if...else 语句**

不建议在条件表达式中使用赋值操作，因为在快速查阅代码时容易看成等值比较。不要使用下面的代码：

```js
if (x = y) {
  /* do the right thing */
}
```

如果你需要在条件表达式中使用赋值，通常在赋值语句前后额外添加一对括号。例如：

```js
if ((x = y)) {
  /* do the right thing */
}
```

**中断语句**

使用中断语句终止循环、开关或与标签语句连接。

```
当你使用没有带标签语句的中断语句（break）时，while，do-while，for或者switch封闭的内部语句将立即终止，并转移到后面的语句执行。

当你使用带有标签语句的中断语句（break）时，将终止在特定的标签语句。
```

中断语句的语法如下：

```
1、break;

2、break label;
```

第一种语法形式用于终止在循环体或者switch的封闭内部；第二种语法形式用于在特定的封闭标签语句。

#### 函数

**多层嵌套函数**

函数可以被多层嵌套。例如，函数A可以包含函数B，函数B可以再包含函数C。B和C都形成了闭包，所以B可以访问A，C可以访问B和A。因此，闭包可以包含多个作用域；他们递归式的包含了所有包含它的函数作用域。这个称之为作用域链。（稍后会详细解释）

思考一下下面的例子：

```js
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // logs 6 (1 + 2 + 3)
```

在这个例子里面，C可以访问B的y和A的x。这是因为：

B形成了一个包含A的闭包，B可以访问A的参数和变量

C形成了一个包含B的闭包

B包含A，所以C也包含A，C可以访问B和A的参数和变量。换言之，C用这个顺序链接了B和A的作用域

反过来却不是这样。A不能访问C，因为A看不到B中的参数和变量，C是B中的一个变量，所以C是B私有的。

**命名冲突**

当同一个闭包作用域下两个参数或者变量同名时，就会产生命名冲突。更近的作用域有更高的优先权，所以最近的优先级最高，最远的优先级最低。这就是作用域链。链的第一个元素就是最里面的作用域，最后一个元素便是最外层的作用域。

```js
function outside() {
  var x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

outside()(10); // returns 20 instead of 10
```

命名冲突发生在return x上，inside的参数x和outside变量x发生了冲突。这里的作用链域是{inside, outside, 全局对象}。因此inside的x具有最高优先权，返回了20（inside的x）而不是10（outside的x）。


**使用 arguments 对象**

函数的实际参数会被保存在一个类似数组的arguments对象中。在函数内，你可以按如下方式找出传入的引数：

arguments[i]

```js
function myConcat(separator) {
   var result = "", // initialize list
       i;
   // iterate through arguments
   for (i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
   }
   return result;
}


// returns "red, orange, blue, "
myConcat(", ", "red", "orange", "blue");

// returns "elephant; giraffe; lion; cheetah; "
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

// returns "sage. basil. oregano. pepper. parsley. "
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");
```

> 提示：arguments变量只是 ”类数组对象“，并不是一个数组。称其为类数组对象是说它有一个索引编号和length属性。尽管如此，它并不拥有全部的Array对象的操作方法。

**箭头函数**

箭头函数表达式（也称胖箭头函数）相比函数表达式具有较短的语法并以词法的方式绑定 this。箭头函数总是匿名的。另见 hacks.mozilla.org 的博文：“深度了解ES6：箭头函数”。

有两个因素会影响引入箭头函数：更简洁的函数和 this。

（一）更简洁的函数
   
有一些函数模式，更简洁的函数很受欢迎。对比一下：

```js
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium"
];

var a2 = a.map(function(s){ return s.length });

console.log(a2); // logs [ 8, 6, 7, 9 ]

var a3 = a.map( s => s.length );

console.log(a3); // logs [ 8, 6, 7, 9 ]
```

(二)this 的词法
   
在箭头函数出现之前，每一个新函数都重新定义了自己的 this 值（在严格模式下，一个新的对象在构造函数里是未定义的，以“对象方法”的方式调用的函数是上下文对象等）。以面向对象的编程风格，这样着实有点恼人。

```js
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this` 
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;//this是window
  }, 1000);
}

var p = new Person();
```

在ECMAScript 3/5里，通过把this的值赋值给一个变量可以修复这个问题。

```js
function Person() {
  var self = this; // Some choose `that` instead of `self`. 
                   // Choose one and be consistent.
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;//this是window，self指向上级函数中的this
  }, 1000);
}
```

另外，创建一个约束函数可以使得 this值被正确传递给 growUp() 函数。

箭头功能捕捉闭包上下文的this值，所以下面的代码工作正常。

```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```

#### 表达式和运算符


