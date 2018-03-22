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
