---
layout: left-none
title:  JavaScript BOM基础 - window对象
date:   2018-3-22 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
目的：
1、掌握BOM的核心-window对象
2、掌握什么是BOM
3、掌握window对象的控制、弹出窗口的方法
```

```
什么是BOM

BOM（browser object model）浏览器对象模型
```

```
BOM对象有

window
navigator
screen
history
location
document
event
```

```
window

window是浏览器的一个实例，在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象

window-》全局对象


全局变量==》window声明==》window.变量名=值
全局变量==》关键字声明==》var 变量名=值
全局函数==》window声明==》window.函数名=function(){}
全局函数==》关键字声明==》function 函数名(){}

【所有全局变量和全局方法都被归在window上】
```

```
alert

语法：window.alert("content")
功能：显示带有一段消息和一个确认按钮的警告框

confirm

语法：window.confirm("message")
功能：显示一个带有指定消息和OK及取消按钮的对话框
返回值：如果用户点击确定按钮，则confirm()返回true
        如果用户点击取消按钮，则confirm()返回false

prompt

语法：window.prompt("text,defaultText")
参数说明：
text：要在对话框中显示的纯文本（而不是HTML格式的文本）
defaultText：默认的输入文本
返回值：如果用户单击提示框的取消按钮，则返回null
        如果用户单击确认按钮，则返回输入字段当前显示的文本
```

```
open

语法：window.open(pageURL, name, parameters)

功能：打开一个新的浏览器窗口或者查找一个已命名的窗口

参数说明：

pageURL：子窗口路径

name：子窗口句柄（name声明了新窗口的名称，方便后期通过name对子窗口进行引用）

parameters：窗口参数（各参数用逗号分隔）
```

```
close

语法：window.close()

功能：关闭浏览器窗口
```

```
JavaScript是单线程语言，单线程就是所执行的代码必须按照顺序

1、掌握超时调用
2、掌握间歇调用
```

```
超时调用

语法：window.setTimeout(code,millisec)

功能：在指定的毫秒数后调用函数或计算表达式

参数说明：
1、code：要调用的函数或要执行的JavaScript代码串
2、millisec：在执行代码前需要等待的毫秒数

说明：setTimeout()只执行code一次。如果要多次调用，可以让code自身再次调用setTimeout()
```

```
清楚超时调用

语法：clearTimeout(id_of_settimeout)

功能：取消由setTimeout()方法设置的timeout

参数说明：
1、id_of_settimeout：由setTimeout()返回的ID值，该值标识要取消的延迟执行代码块
```

```
间歇调用

语法：setInterval(code,millisec)

功能：每个指定时间执行一次代码

参数说明：
1、code：要调用的函数或要执行的代码串
2、millisec：周期性执行或调用code之间的时间间隔，以毫秒计算
```

```
清楚间歇调用

语法：clearInterval(code,millisec)

功能：取消由clearInterval()方法设置的Interval
```


