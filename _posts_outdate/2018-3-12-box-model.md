---
layout: left-none
title:  CSS盒模型
date:   2018-3-12 00:00:00 +0800
tag: 面试
---
* content
{:toc}
<hr>

> 基本概念：标准模型+IE模型

```
CSS中Box mode是分为两种：W3C标准和IE标准盒子模型
大多数浏览器采用W3C标准模型，而IE中则采用Microsoft自己的标准。
怪异模式是“部分浏览器在支持W3C标准的同时还保留了原来的解析模式”，怪异模式主要表现在IE内核的浏览器。
在不对doctype进行定义时，会触发怪异模式。
1.在标准模式下，一个块的总宽度 = width + margin(左右) + padding(左右) + border(左右)
2.在怪异模式下，一个块的总宽度 = width + margin(左右)（即width已经包含了padding和border的值）
```

### CSS3如何设置这两种模型

```
box-sizing: content-box || border-box || inherit（继承）

当设置为box-sizing:content-box时，将采用标准模式解析计算，也就是默认模式；
当设置为box-sizing:border-box时，将采用怪异模式解析计算
```

### 标准模型和IE模型的区别

```
1.在标准模式下，一个块的总宽度 = width + margin(左右) + padding(左右) + border(左右)
2.在怪异模式下，一个块的总宽度 = width + margin(左右)（即width已经包含了padding和border的值）
```

### JS如何设置获取盒模型对应的宽和高

```
dom.style.width/height(这种取法只能取出内联样式的宽度和高度，取不出style节点或者外链的css样式表的宽度和高度的)
dom.currentStyle.width/height(这种方法拿到的宽度和高度是渲染以后的宽度和高度，相对是比较准确的，但是这个属性只有IE支持)
window.getComputedStyle(dom).width/height（这种方法兼容firefox以及chrome）
dom.getBoundingClientRect().width/height(方法返回元素的大小及其对应于视口的位置)
```
### BFC（边距重叠解决方案）

```
https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html
```

>  IE8及更早IE版本不支持设置填充的宽度和边框的宽度属性。解决IE8及更早版本不兼容问题可以在HTML页面声明<!DOCTYPE html>即可

