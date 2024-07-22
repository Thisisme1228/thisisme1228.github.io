---
layout: left-none
title:  JavaScript内置对象-JavaScript对象之String
date:   2018-3-21 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
掌握字符串对象的方法：
charAt()
charCodeAt()
indexOf()
lastIndexOf()
```

```
charAt()

语法：
stringObject.chartAt(index)

功能：
返回stringObject中index位置的字符
```

```
charCodeAt()

语法：
stringObject.charCodeAt(index)

功能：返回stringObject中index位置字符的字符编码
```

```
ECMAScript5可以使用“方括号加字符索引”来访问字符串中特定的字符，但是IE7及更早的浏览器会返回undefined，所以使用charAt() charCodeAt()更适合
```

```
indexOf()

语法：
stringObject.indexOf('o')

功能：
从一个字符串中搜索给定的子字符串，返回子字符串的位置

返回值：数值

说明：如果没有找到该子字符串，则返回-1
```

```
lastIndexOf()

语法：
stringObject.lastIndexOf('o')

功能：
从一个字符串中搜索给定的子字符串，返回子字符串的位置

返回值：数值

说明：
如果没有找到该子字符串，则返回-1
```

```
掌握字符串对象的截取方法：

slice()
substring()
substr()
```

```
slice()

语法：
stringObject.slice(start,end)

功能：
截取子字符串

参数说明：
1、start：必须，指定子字符串的开始位置
2、end：可选，表示子字符串到哪里结束，end本身不在截取范围之内，省略时截取至字符串的末尾
3、当参数为负数时，会将传入的负值与字符串的长度相加
```

```
substring()

说明：
语法及功能同slice完全一样

区别在于：
1、当参数为负数时，自动将参数转换为0
2、substring()会将较小的数作为开始位置，将较大的数作为结束位置
```

```
substr()

语法：
stringObject.substr(start,len)

功能：
截取子字符串

参数说明：
1、start：必须，指定子字符串的开始位置
2、len：可选，表示截取的字符总数，省略时截取至字符串的末尾
3、当start为负数时，会将传入的负值与字符串的长度相加
4、当len为负数时，返回空字符串
```

```
split()

语法：
stringObject.split(separator)

功能：
把一个字符串分割成字符串数组

返回值：Array

说明：
separator：必须，分隔符
```

```
replace()

语法：
stringObject.replace(regexp/substr,replacement)

功能：
在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串

返回值：String

参数：
regexp：必须。规定子字符串或要替换的模式的RegExp对象
replace门头：必须，一个字符串值
```

```
toUpperCase()

语法：
stringObject.toUpperCase()

功能：
把字符串转换为大写
```

```
toLowerCase()

语法：
stringObject.toLowerCase()

功能：
把字符串转换为小写
```