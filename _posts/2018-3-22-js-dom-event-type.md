---
layout: left-none
title:  JavaScript DOM事件-事件类型
date:   2018-3-22 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
 onload

定义和用法：
onload事件会在页面或者图像加载完成后立即出发
onload通常用于<body>元素，在页面完全载入后（包括图片、css文件等等）执行脚本代码

语法：

在 HTML 中:
<body onload="SomeJavaScriptCode">
在 JavaScript 中:
window.onload=function(){SomeJavaScriptCode};
```

```
onchange

常用于select标签，单选按钮，复选框

【options】

定义和用法：
option集合可返回包含<select>元素中所有<option>的一个数组
注释：数组中的每个元素对应一个<option>标签-由0起始

语法：
selectObject.options[]

说明：
options[]集合并非一个普通的HTMLcollection。为了和早期的浏览器向后兼容，这个集合有某种特殊的行为：允许用过Select对象来改变显示的选项：
1、如果把options.length属性设置为0，select对象中的所有选项都会被清除
2、如果options.length属性的值比当前值小，出现在数组尾部的元素就会被丢弃
3、如果把options[]数组中的一个元素设置为null，那么选项就会从select对象中删除
4、可以通过构造函数option()来创建一个新的option对象（需要设置option.length属性）

【selectedIndex】

selectedIndex属性可以设置或返回下拉列表中备选选项的索引号
注释：若允许多重选择，则仅会返回第一个备选选项的索引号
```

```
鼠标事件

onsubmit：表单中的确认按钮被点击时发生
onmousedown：鼠标按钮在元素上按下时触发
onmousemove：在鼠标指针移动时发生
onmouseup：在元素上松开鼠标按钮时触发
onresize：当调整浏览器窗口大小时触发
onscroll：拖动滚动条滚动时触发
```

```
onsubmit事件不是加在按钮上，而是表单上
```