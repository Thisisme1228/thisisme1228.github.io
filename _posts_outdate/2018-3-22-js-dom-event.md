---
layout: left-none
title:  JavaScript DOM事件-事件的绑定
date:   2018-3-22 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
什么是事件

事件就是文档或浏览器窗口中发生的一些特定的交互瞬间
```

```
HTML事件

直接在HTML元素标签内添加事件，执行脚本

语法：
<tag 事件="执行脚本"></tag>

功能：
在HTML元素上绑定事件

说明：
执行脚本可以是一个函数的调用

不建议使用HTML事件原因：
1、多元素绑定相同事件时，效率低
2、不建议在HTML元素中写JavaScript代码
```

```
鼠标事件

onload：页面加载时触发
onclick：鼠标点击时触发
onmouseover：鼠标滑过时触发
onmouseout：鼠标离开时触发
onfocus：获取焦点时触发
onblur：失去焦点时触发
onchange：域的内容改变时发生

关于this指向：在事件触发的函数中，this是对该DOM对象的引用
```


```
DOM0级事件

1、通过DOM获取HTML元素
2、（获取HTML元素）.事件=执行脚本

语法：
ele.事件=执行脚本

功能：
在DOM对象上绑定事件

说明：
执行脚本可以使一个匿名函数，也可以是一个函数的调用

例如：
ele.onclick=function(){console.log(this)}
ele.onclick=fun  //这种方法调用函数，函数后面一定不能写括号，否则当页面加载完成就会执行
```



