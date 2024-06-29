---
layout: left-none
title:  JavaScript语法-JavaScript数据类型之
date:   2018-3-17 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```

### JavaScript的数据类型

```
typeof

功能    检测变量类型

语法    typeof 变量 或 typeof(变量)

返回值  有可能是：string、number、boolean、object、undefined、function
```

```
undefined类型只有一个值，即特殊的undefined。

说明：

一般而言，不存在需要显示地把一个变量设置为undefined值得情况。只声明不赋值的变量就是undefined
```

```
null

1、null值表示一个空对象指针

2、如果定义的变量准备在将来用于保存对象，那么最好将变量初始化为null而不是其他值。

说明：

undefined值是派生自null的，所以undefined==null的返回结果是true
```

```
Number

表示整数和浮点数

NaN:即非数值（Not a Number）是一个特殊的数值

说明：

1、任何涉及NaN的操作（例如NaN/10）都会返回NaN
2、NaN与任何值都不相等，包括本身
```

```
语法：isNaN(n)

功能：检测n是否是“非数值”

返回值：boolean

说明：

isNaN()对接收的数值，先尝试转换为数值，再检测为是否为数值
```

```
有3个函数可以把非数值转换为数值：

1、Number()

2、parseInt()

3、parseFloat()

Number()可以用于任何数据类型，但是像用于字符串转不了就会返回一个结果NaN
parseInt()和parseFloat()则专门用于把字符串转换为数值
parseInt()会忽略字符串前面的空格，直至找到第一个非空格字符

 说明：

 (1)parseInt()：转换空字符串返回NaN
 (2)parseInt()这个函数提供第二个参数：转换时使用的基数（即多少进制）

 parseFloat：从第一个字符开始解析每个字符，直至遇见一个无效的浮点数字符为止
```

```
String

String类型用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。字符串可以由双引号（"）和单引号（'）表示
```

```
toString()与String()

语法：str.toString()

功能：将str转换为字符串

返回值：str的一个副本

参数：str是要转换的内容，可以是数值、布尔值、对象和字符串

说明：在不知道要转换的值是不是null或undefined的情况下，还可以使用String()函数，它能够将任何类型的值转换为字符串
```

```
Boolean()

用于表示真假的类型，即true表示真，false表示假

类型转换：
1、除0之外的所有数字，转换为布尔型都是true
2、除""之外的所有字符，转换为布尔型都为true
3、null和undefined转换为布尔型为false
```

