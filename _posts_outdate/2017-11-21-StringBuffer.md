---
layout: left-none
title:  对象实例----字符串连接
date:   2017-11-21 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
对象令人感兴趣的一点是用它们解决问题的方式。ECMAScript 中最常见的一个问题是字符串连接的性能。与其他语言类似，ECMAScript 的字符串是不可变的，即它们的值不能改变。
<!-- more -->

`请考虑下面的代码：`

```js
var str = "hello ";
str += "world";
```

实际上，这段代码在幕后执行的步骤如下：

```
创建存储 "hello " 的字符串。
创建存储 "world" 的字符串。
创建存储连接结果的字符串。
把 str 的当前内容复制到结果中。
把 "world" 复制到结果中。
更新 str，使它指向结果。
```

每次完成字符串连接都会执行步骤 2 到 6，使得这种操作非常消耗资源。如果重复这一过程几百次，甚至几千次，就会造成性能问题。解决方法是用 Array 对象存储字符串，然后用 join() 方法（参数是空字符串）创建最后的字符串。想象用下面的代码代替前面的代码：

```js
var arr = new Array();
arr[0] = "hello ";
arr[1] = "world";
var str = arr.join("");
```

这样，无论数组中引入多少字符串都不成问题，因为只在调用 join() 方法时才会发生连接操作。此时，执行的步骤如下：

```
创建存储结果的字符串
把每个字符串复制到结果中的合适位置
```

然这种解决方案很好，但还有更好的方法。问题是，这段代码不能确切反映出它的意图。要使它更容易理解，可以用 StringBuffer 类打包该功能：

```js
function StringBuffer () {
  this._strings_ = new Array();
}

StringBuffer.prototype.append = function(str) {
  this._strings_.push(str);
};

StringBuffer.prototype.toString = function() {
  return this._strings_.join("");
};
```

这段代码首先要注意的是 strings 属性，本意是私有属性。它只有两个方法，即 append() 和 toString() 方法。append() 方法有一个参数，它把该参数附加到字符串数组中，toString() 方法调用数组的 join 方法，返回真正连接成的字符串。要用 StringBuffer 对象连接一组字符串，可以用下面的代码：


```js
var buffer = new StringBuffer ();
buffer.append("hello ");
buffer.append("world");
var result = buffer.toString();
```

可用下面的代码测试 StringBuffer 对象和传统的字符串连接方法的性能：

```js
var d1 = new Date();
var str = "";
for (var i=0; i < 10000; i++) {
    str += "text";
}
var d2 = new Date();

document.write("Concatenation with plus: "
 + (d2.getTime() - d1.getTime()) + " milliseconds");

var buffer = new StringBuffer();
d1 = new Date();
for (var i=0; i < 10000; i++) {
    buffer.append("text");
}
var result = buffer.toString();
d2 = new Date();

document.write("<br />Concatenation with StringBuffer: "
 + (d2.getTime() - d1.getTime()) + " milliseconds");
```

```
这段代码对字符串连接进行两个测试，第一个使用加号，第二个使用 StringBuffer 类。每个操作都连接 10000 个字符串。日期值 d1 和 d2 用于判断完成操作需要的时间。请注意，创建 Date 对象时，如果没有参数，赋予对象的是当前的日期和时间。要计算连接操作历经多少时间，把日期的毫秒表示（用 getTime() 方法的返回值）相减即可。这是衡量 JavaScript 性能的常见方法。该测试的结果可以帮助您比较使用 StringBuffer 类与使用加号的效率差异。
```

> 结果显示使用加好运算符运行时间更短 O:)

