---
layout: left-none
title:  JavaScript BOM基础 - history对象
date:   2018-3-23 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
 history对象保存了用户在浏览器中访问页面的历史记录，从浏览器窗口被打开的那一刻起，都会地址被保存起来
```

```
history历史对象

语法：history.back()

功能：回到历史记录的上一步

说明：相当于使用了history.go(-1)

go()方法是用来加载history列表中的某个具体页面

语法：history.forward()

功能：回到历史记录的下一步

说明：相当于使用了history.go(1)

语法：history.go(-n)

功能：回到历史记录的前n步

语法：history.go(n)

功能：回到历史记录的后n步
```
