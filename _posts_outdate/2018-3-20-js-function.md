---
layout: left-none
title:  JavaScript函数
date:   2018-3-20 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。

任何函数通过return语句，后面跟着返回的值来实现返回值。
说明：
1、函数会在执行完return之后停止并立即退出。
2、return语句也可以不带有任何返回值，用于提前停止函数执行又不需要返回值的情况。
```

```
arguments

ECMAScript中的参数在内部用一个数组来表示，在函数体内通过arguments对象来访问这个数组参数。

说明：
1、arguments对象只是与数组类似，并不是Array的实例。
2、[]语法访问它的每一个元素
3、length属性确定传递参数的个数
4、非严格模式，arguments可以使用下标的方式修改传递的参数
```

```
arguments的应用

function inner() {
    console.log()
}

inner(1,2)
```
