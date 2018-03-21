---
layout: left-none
title:  JavaScript内置对象-JavaScript对象之Date
date:   2018-3-21 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
掌握创建日期对象的方法

掌握date对象中获取日期时间的方法

掌握date对象中设置日期时间的方法
```

```
如何创建一个日期对象

语法：
new Date()

功能：
创建一个日期时间对象

返回值：
不传参的情况下，返回当前的日期时间对象
```

```
获取年月日时分秒及星期的方法

1、getFullYear:返回4位数的年份
2、getMonth()：返回日期中的月份，返回值为0-11
3、getDate()：返回月份中的天数
4、getDay()：返回星期，返回值为0-6
5、getHours()：返回小时
6、getMinutes()：返回分
7、getSeconds()：返回秒
8、getTime()：返回表示日期的毫秒数
```

```
设置年月日时分秒及星期的方法

1、setFullYear（year）：设置4位数的年份
2、setMonth(mon)：设置日期中的月份，从0开始，0表示1月
3、setDate()：设置日期
4、setDay()：设置星期，从0开始，0表示星期日
5、setHours()：设置小时
6、setMinutes()：设置分
7、setSeconds()：设置秒
8、setTime()：以毫秒数设置日期，会改变整个日期
```