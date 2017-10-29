---
layout: post
title:  前端代码规范
date:   2017-1-15 00:00:00 +0800
tag: 前端维护
---

* content
{:toc}

```
时至今日，我已经深刻意识到整理好代码对程序员来说是一件多重要的事情，它不仅关系到方便维护、别人容易看的明白，更深层的表明了你对你工作的认真甚至负责的程度，所以只知道写不动脑思考怎么去让你的代码看起来更整洁更直观，那写出来的东西只会让所有人感到头疼包括你自己。养成好习惯，从学会整理代码开始
```

## 一、代码格式
### 1、[规则]HTML、CSS、JSON等缩进2个字符

举例：

```js
<div id="fcontainer">
  <div id="footer">
    <div id="copy">Copyright &copy; 2000-2004 JetBrains. All rights reserved</div>
  </div>
</div>
```

### 2、[规则]JS等缩进4个字符

举例：

```js
return {
    backgroundMusic : backgroundMusic
}
```

### 3、[建议]每行代码不超过120个字符

```
每行代码的字符数过多不利于阅读，可能需要横向滚动，因此建议控制每行代码的字符数。以往由于DOS系统限制或显示器分辨率等原因，一般认为控制在80个字符以内，但现在可以考虑放宽这个限制。
```


## 二、文件命名规范

```
[规则]JS、HTML、CSS等使用小写字母、数字命名，第一个字符为字母，多个单词间“-”分割
该规则适用于项目内自建的文件名，引用的第三方组件文件可以保留原名字。
举例： common.js、common-ui.js、admin-panel.html、my-style.css
反例：Common.js、adminPanel.html
```


# [建议]文件名使用英文单词命名，对于过长的单词或有习惯性缩写的使用缩写

```
举例：my-style.css、admin.js
反例：guanlimuban.js
```



```
[建议]文件名避免使用广告、有歧义的单词
反例：ad.js
```


# 变量函数命名

```
[规则]普通变量名使用小驼峰格式
举例：isFunction、myStyle
反例：IsFunction、my_style
```


# [建议]常量使用全大写、下划线分割

```
举例：COLOR_RED、STATUS_ACTIVE
```


# [建议]jQuery对象名以“$”开头

```
举例：$el、$container
```


# [规则]普通函数名使用小驼峰格式

```
举例：myFunction、doSomething
反例：MyFunction、do_someting
```


# [规则]类对象使用大驼峰格式

```
举例：Product、ProductList
```


# [规则]CSS类名使用小写字母、“-”分割

```
举例：.product-list、.page-container
```


# [规则]HTML的id属性使用小驼峰格式

```
举例：someContainer、someList
```


# [规则]所有变量必须声明

```
JavaScript变量在使用前并非必须声明，如果在未声明的情况下直接使用变量名，会默认为全局变量，这样会导致变量意外的扩大了有效范围。
```


# [规则]局部变量不允许与全局变量重名

```
重名的局部变量和全局变量会让人产生困扰，很容易引起错误的使用。
```


```
反例：
var count = 1;

function() {
    var count = 2;
    …
}
```


## 三、HTML规范

```
[规则]如无特殊情况，文件内容字符集一律使用无BOM的UTF-8、并在HTML头声明
<meta charset="UTF-8">
```


# [建议]使用meta标签定义优先使用高版本浏览器

```
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="renderer" content="webkit" />
```


# [规则]使用HTML5格式的文档类型

```
<!DOCTYPE html>
```



```
[规则]DOM的自定义属性增加固定前缀，如“data-”
<li data-type="1" data-name="XX商品">
```



```
[规则]一个HTML页面内不允许出现相同ID的DOM
一些浏览器不支持带有相同ID的DOM，会出现HTML解析错误，而且相同ID的DOM在获取时很容易取到错误的DOM。
```


# [建议]原则上CSS文件引用在<head>中，JS引用在<body>末尾

```
考虑到页面展示性能，一般不建议在<head>中引用脚本，除非特殊需求的必要。
```


## 四、CSS规范
# [建议]不要将样式写到一行，应该每行一个样式
#### 如果考虑性能原因可以在打包时对CSS进行压缩，但不要在编写源码时将样式写成一行，导致不利于维护。

```
示例：
.hotel-content {margin: 10px; background-color: #efefef;}
反例：
.hotel-content {margin: 10px; background-color: #efefef;}
```


## 五、JavaScript规范
#### [建议]函数代码行数不超过100行

```
为了便于理解，清晰地划分函数功能，推荐代码行数不超过100行，最高上限也不要超过200行。
无论是减少函数代码行数、还是降低圈复杂度的角度，都应该对函数功能进行合理的划分，一个函数只实现单一的功能，不要将很多功能都放到一个函数内实现。
```


# [规则]语句结束必须添加分号
#### 虽然JS解析器一般都允许在语句结束省略分号，但是不排除个别解析器出现错误，而且在使用一些代码压缩工具时很可能造成压缩后的代码逻辑出现错误。

```
反例：
var index = 1
var getIndex = function() {
    ……
}
示例：
var index = 1;
var getIndex = function() {
    ……
};
```


# [建议]推荐使用"use strict"
#### "use strict"已经被众多浏览器支持，这样可以避免一些不规范的写法，"use strict"可以加载文件头、或者模块定义的头部。
示例：

```
define(function (require, exports, module) {
    "use strict";

    ……
});
```


# [建议]尽量在作用域顶部声明变量

#### [规则]禁止在逻辑运算语句内进行赋值

```
虽然在逻辑运算语句是可以进行赋值操作的，但这样的代码会很容易让人产生迷惑，对代码产生错误的理解。
反例：
if(index = someIndex) {
    …
}
示例：
index = someIndex;
if(index) {
    …
}
```

# [规则]数字类型转换必须添加进制参数

```
使用parseInt()函数将字符串转换为数字时，必须添加进制参数，否则在某些 浏览器上可能进行错误的转换。某些浏览器会将“0”开头的字符串按照八进制转换，所以很可能将“010”转换为8，而非10。
```


# [建议]字符串变量使用单引号

```
JS中字符串变量的标识既可以使用单引号又可以使用双引号，但建议使用单引号而不是双引号作为字符串变量的标识。
```


# [建议]数组和对象声明尽量使用“{}”和“[]”

```
使用“new Object()”和“new Array()”创建对象和数组性能较低，不建议使用。
例如：
var userInfo = {}; // 建议写法
var userInfo = new Object(); // 不建议写法
var userList = []; // 建议写法
var userList = new Array(); // 不建议写法
```


# [建议]for-in循环只能用于object

```
不要将for-in循环用于array，这可能会导致遍历array成员之外的prototype属性，除非增加hasOwnProperty判断。
反例：
var list = [1, 2, 3];
for(var i in list) {
    console.log(list[i]);
}
```


# [建议]不要将自增和自减运算符与其它运算符混用

```
程序代码并非用于考试，必须要易于理解，不要将一些考试题的写法用于实际开发中，有必要混合使用时必须增加小括号。
反例：
var index = 1;
var base = 1;
var subIndex1 = base + ++index;
var subIndex2 = base + index++;
```


# [建议]不要使用两层或两层以上的三目运算符

```
还是本着利于理解的原则，过多的三目运算符嵌套会大大降低代码的可读性，即使使用括号明示了运算符优先级也不推荐嵌套三目运算符。
反例：
index = index > 9 ? (index < 100 ? 10 : 100) : 0
```


# [建议]拼接长字符串时最好不要使用"+"而用"join()"

```
这条建议一般都是针对老版本IE的，因为IE浏览器对字符串处理的性能实在太低。虽然现在IE的市场占有率降低了很多，而且IE自身也有了极大的改进，但实际工作中遇到这种场景还是尽量用"join()"吧。
```


```
举例：
var strList = [];
strList.push('一大串字符串…');
strList.push('又一大串字符串…');
strList.push('还是一大串字符串…');
var strResult = strList.join('');
```

# [建议]对频繁使用的DOM查询结果要进行缓存

```
DOM查询是很好性能的操作，频繁对同一DOM进行查询无疑是对性能的浪费。
反例：
var name = $('#someContainer').attr('name');
var value = $('#someContainer').val();
$('#someContainer').hide();
示例：
var container = $('#someContainer');
var name = container.attr('name');
var value= container.val();
container.hide();
```



```
注释规范
[建议]比较复杂的HTML结构增加内容或结构注释

[建议]CSS文件头或特定内容区域增加注释
举例：
/* 详情页 */
[规则]JS模块或文件头增加注释，详细写明该文件或模块的功能

[规则]所有函数头必须增加必要的注释说明

[建议]关键代码逻辑，重要的模块级或全局变量增加必要的注释说明

[建议]注释符号与注释内容之间增加一个空格
这个“习俗”也许起源于C语言，但不必去刨根问底，建议都这么做就是了，尤其是使用中文注释时。
例如：
// 这是一个单行注释
/* 这是一个块注释 */
```