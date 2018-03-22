---
layout: left-none
title:  JavaScript DOM基础
date:   2018-3-22 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
JavaScript的组成

完整的JavaScript是由ECMAScript（语法）、Browser Objects(DOM 、Bom)（特性）组成的
```

```
学习目标

1、掌握基本的DOM查找方法
document.getElementById()
document.getElementsByTagName()

2、掌握如何设置DOM元素的样式
```

```
语法：document.getElementById("id")

功能：返回对拥有指定ID的第一个对象的引用

返回值：DOM对象

说明：id为DOM元素上id的属性
```

```
语法：document.getElementsByTagName('tag')

功能：返回一个对所有tag标签的引用的集合

返回值：数组

说明：
tag为要获取的标签名称
```

```
设置元素样式

语法：ele.style.styleName = styleValue

功能：设置ele元素的css样式

说明：
1、ele为要设置样式的DOM元素
2、styleName为要设置的样式名称
3、styleValue未设置的样式值


styleName，不能使用“-”连字符形式font-size，应使用驼峰命名形式fontSize
```

```
学习目标

1、掌握innerHTML属性的应用
2、掌握className属性的应用
3、掌握如何在DOM元素上添加删除获取属性
```

```
innerHTML

语法：ele.innerHTML

功能：返回ele元素开始和结束标签之间的HTML

语法：ele.innerHTML = "html"

功能：设置ele元素开始和结束标签之间的html内容为html
```

```
className

语法：ele.className

功能：返回ele元素的class属性

语法：ele.className = "cls"  //动态添加class替换元素本身的class;ele.className是重新设置类，替换元素本身class

功能：设置ele元素的class属性为cls
```

```
获取属性

语法：ele.getAttribute("attribute")

功能：获取ele元素的attribute属性

说明：
1、ele是要操作的dom对象
2、attribute是要获取的html属性（如：id、type）
```

```
设置属性

语法：ele.setAttribute("attribute",value)

功能：在ele元素上设置属性

说明：
1、ele是要操作的dom对象
2、attribute为要设置的属性名称
3、value为设置的attribute属性的值

注意：
1、setAttribute方法必须要有两个参数
2、如果value是字符串，需加引号
3、setAttribute()有兼容性问题
```

```
删除属性

语法：ele.removeAttribute("attribute")

功能：删除ele上的attribute属性

说明：
1、ele是要操作的dom对象
2、attribute是要删除的属性名称
```

