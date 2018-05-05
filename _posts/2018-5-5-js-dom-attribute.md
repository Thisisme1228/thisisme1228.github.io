---
layout: left-none
title:  JavaScriptDOM属性
date:   2018-5-5 00:00:00 +0800
tag: 进击JavaScript核心
---
* content
{:toc}
<hr>

###  属性系统

```
认识属性

布尔属性

字符串属性

data属性

class属性
```

#### 认识属性

```
Property(固有属性) 浏览器已经绑定好的属性叫固有属性

Attribute(自定义属性)  el.attribute 返回类数组对象namedNodeMap，提供getNamedItem()获取属性，removeNamedItem()移除属性，setNamedItem()创建属性

getAttribute，setAttribute(IE7之前不支持)，removeAttribute以上两种皆可使用

例子：

<body>
<input type="text" id="num" name="nun" a="a">
<script>
    var el = document.getElementById('num');
    console.log(el.id);//num
    console.log(el.name);//num
    console.log(el.title);//''
    console.log(el.a);//undefined
    console.log(el.attributes);//返回的是一个类数组NamedNodeMap对象

    //获取自定义属性  删除属性 创建自定义属性的方法
    console.log(el.attributes.getNamedItem('a').nodeValue);//获取自定义属性的值
    console.log(el.attributes.getNamedItem('id').nodeValue);//获取固有属性的值1
    console.log(el.attributes['id'].nodeValue);//获取固有属性的值2
    console.log(el.nodeName);//节点名称
    console.log(el.attributes.removeNamedItem('a'));//删除自定义属性
    console.log(el.attributes.removeNamedItem('name'));//删除固有属性

    //添加属性
    var attr = document.createAttribute('name');
    attr.value = 'b';
    el.attributes.setNamedItem(attr);
</script>
</body>
```

#### 认识属性之其他属性

```
布尔属性

checked

select option 将下拉列表的某一项进行选中

readonly

disabled
readonly和disabled的区别是readonly只能读不能改但能被后台收到，但是disabled不能被后台收到

multiple

hidden -- H5新增属性，IE8以下浏览器不支持

字符串属性

id  每个元素的唯一标识

title 可见元素，在鼠标掠过时出现的提示信息

href 用于<a>/<link>表示超链接

src 用于img，object，radio，script等等

lang language表示辅助，搜索引擎，读音机，印刷器等等

dir 用于文本的输出方法，一般有两个值一个是ltr一个是rtl

accesskey 提供了能为当前元素生成快捷键的方式

name 用于表单元素

value 用于表单元素

class 定义在元素上引用的样式
```

##### W3C全局字符串属性

```
accesskey

class

contenteditable  是否可编辑元素的内容，一般和spellcheck组合使用，如果内容可以编辑了，就可以检查编辑的内容是不是符合语法

dir

hidden 隐藏元素

id

lang

spellcheck

style 定义元素的样式

tabindex 可以定义按tab键的顺序

title

translate 规定是否应该翻译元素内容，目前所有主流浏览器都无法正确支持该属性
```

##### data属性

```
dataset旧的浏览器不支持，新的浏览器都支持，在做移动端的时候可以放心使用

例子：

<body>
<button id="btn" type="button" data-xxx-yyy="abc" data-toggle="modal">small modal</button>

<script>
var btn = document.getElementById('btn');
console.log(btn.dataset.toggle);
console.log(btn.dataset.xxxYyy);
</script>
</body>
```

##### class属性

###### classList属性 IE10及以上浏览器支持
