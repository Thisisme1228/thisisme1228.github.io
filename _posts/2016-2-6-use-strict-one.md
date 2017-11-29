---
layout: post
title:  使用严格模式下的js代码规范一
date:   2016-2-6 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
### JavaScript 严格模式(use strict)
`JavaScript 严格模式（strict mode）即在严格的条件下运行。`
<hr>
### 为什么使用严格模式:
+ 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
<br/>
<br/>
+ 消除代码运行的一些不安全之处，保证代码运行的安全；
<br/>
<br/>
+ 提高编译器效率，增加运行速度；
<br/>
<br/>
为未来新版本的Javascript做好铺垫。
<br/>
<br/>
"严格模式"体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。
<br/>
<br/>
另一方面，同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。掌握这些内容，有助于更细致深入地理解Javascript，让你变成一个更好的程序员。
<!-- more -->

<hr>
### 使用 "use strict" 指令

"use strict" 指令在 JavaScript 1.8.5 (ECMAScript5) 中新增。

它不是一条语句，但是是一个字面量表达式，在 JavaScript 旧版本中会被忽略。

"use strict" 的目的是指定代码在严格条件下执行。
严格模式下你不能使用未声明的变量。 

<hr>
### 严格模式声明

`严格模式通过在脚本或函数的头部添加 "use strict"; 表达式来声明。`

在函数内部声明是局部作用域 (只在函数内使用严格模式)

<hr>
### 严格模式的限制

1、不允许使用未声明的变量

```js
"use strict";
x = {p1:10, p2:20};      // 报错 (x 未定义)
```

2、不允许删除变量或对象

```js
"use strict";
var x = 3.14;
delete x;                // 报错
```

3、不允许删除函数

```js
"use strict";
function x(p1, p2) {}; 
delete x;                // 报错 
```

4、不允许变量重名:

```js
"use strict";
function x(p1, p1) {};   // 报错
```

5、不允许使用八进制:

```js
"use strict";
var x = 010;             // 报错
```

6、不允许使用转义字符:

```js
"use strict";
var x = \010;            // 报错
```

7、不允许对只读属性赋值:

```js
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;            // 报错
```

8、禁止this关键字指向全局对象。

```js
function f(){
    return !this;
} 
// 返回false，因为"this"指向全局对象，"!this"就是false

function f(){ 
    "use strict";
    return !this;
} 
// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```

因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。

```js
function f(){
    "use strict";
    this.a = 1;
};
f();// 报错，this未定义
```

<hr>
### arguments对象和函数属性

在严格模式下,访问arguments.callee, arguments.caller, anyFunction.caller以及anyFunction.arguments都会抛出异常.唯一合法的使用应该是在其中命名一个函数并且重用之

```js
// example taken from vanillajs: http://vanilla-js.com/
var s = document.getElementById('thing').style;
s.opacity = 1;
(function(){ 
  if((s.opacity-=.1) < 0)
    s.display="none";
  else
    setTimeout(arguments.callee, 40);
})();
```

可以重新写成:

```js
"use strict";
var s = document.getElementById('thing').style;
s.opacity = 1;
(function fadeOut(){ // name the function
  if((s.opacity-=.1) < 0)
    s.display="none";
  else
    setTimeout(fadeOut, 40); // use the name of the function
})();
```
<hr>
### 严格中立的代码

迁移严格代码至严格模式的一个潜在消极面是，在遗留的老版本浏览器上，由于没有实现严格模式，javascript语义可能会有所不同。在一些罕见的机会下（比如差劲的关联关系或者代码最小化），你的代码可能不能按照你书写或者测试里的模式那样运行。这里有一些让你的代码保持中立的规范：

1.按照严格模式书写你的代码，并且确保你的代码不会发生仅仅在严格模式下发生的错误（比如上文所说的运行时错误）

2.远离语义差异

+ eval: 仅仅在你知道你在干什么的情况下使用它

+ arguments: 总是通过形参的名字获取函数参数，或者在函数的第一行拷贝arguments 

    var args = Array.prototype.slice.call(arguments)

+ this: 仅在this指向你自己创建的对象时使用它 

<hr>
### 开启严格模式

> 合并均为严格模式的脚本或均为非严格模式的都没问题，只有在合并严格模式与非严格模式有可能有问题。建议按一个个函数去开启严格模式（至少在学习的过渡期要这样做）.
 
> 您也可以将整个脚本的内容用一个函数包括起来，然后在这个外部函数中使用严格模式。这样做就可以消除合并的问题，但是这就意味着您必须要在函数作用域外声明一个全局变量。

如果你想改变你的代码，让其工作在JavaScript的限制变体, 请参阅[转换成严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)。
<hr>

阅读了本文的小伙伴还读了以下文章：

+ [严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

+ [转换成严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)。
