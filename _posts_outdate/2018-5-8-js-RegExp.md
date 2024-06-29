---
layout: left-none
title:   JavaScript正则表达式
date:   2018-5-8 00:00:00 +0800
tag: 进击JavaScript核心
---
* content
{:toc}
<hr>

#### 什么是正则表达式

```
由以下两种字符串组成的文字模式

1、普通字符（例如26个英文字母、数字等）
2、特殊字符（有特殊含义的，例如.\等）

说明：该模式描述在查找文字主体时待匹配的一个或多个字符串。正则表达式作为一个模板，将某个字符模式与所搜索的字符串进行匹配。
```

#### 为什么使用正则表达式

```
查找

替换

数据有效性验证
```

#### 创建正则表达式的两种方式

```
1、字面量或直接量

/js/

2、构造函数

//regular expression
new RegExp()
```

#### 正则对象方法

```
test()检索字符串中指定的值。返回true或false

例子：
var str = 'T love js'
var pattern = /js/;
pattern.test(str);

exec() 找到返回数组，找不到返回null
例子：
var str = 'T love js'
var pattern = /js/;
pattern.exec(str);
```

#### 正则模式修饰符

```
i ignoreCase  正则表达式正常是区分大小写的，可以让它不区分大小写
g global 全局匹配
m multiline 多行匹配

例子：
var str = 'T love js';
var pattern = /js/i; //模式修饰符是写在/str/之后的
pattern.test(str);

模式匹配修饰符多个在一起使用方式：
/str/igm  //igm没有特定顺序，gmi也可以

构造函数怎么使用模式修饰符呢？

var str = 'I love Js';
var pattern = new RegExp('js',"i");
patterm.test(str);
```

#### 使用哪种方式创建正则表达式的区别

```
/js/i;  //直观、简介、方便，一般情况下使用的字面量方式的，而构造函数方式笨重复杂
new RegExp('js','i');  //构造函数的方式可以将变量传递给正则进而随意的改变正则
```

#### 正则表达式测试工具

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>正则表达式测试工具</title>
    <style type="text/css">
        html * {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            font-size: 14px;
            font-family: Arial;
        }

        #content {
            margin: 100px auto 0 auto;
            width: 600px;
            height: auto;
            background-color: #f9f9f9;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 20px 10px;
        }

        #content h4 {
            text-align: center;
            line-height: 40px;
        }

         textarea {
            width: 100%;
            resize: none;
            outline:none;
        }

        #content .control {
            margin: 10px 0;
        }

         input {
            outline: none;
        }

        button {
            border: none;
            color: white;
            background-color: #29a9ff;
            padding: 5px 10px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
        }

        button:hover {
            background-color: dodgerblue;
        }
    </style>
</head>
<body>
<div id="content">
    <div id="regExp">
        <h4>正则表达式测试工具</h4>
        <textarea cols="30" rows="20" id="str"></textarea>
        <div class="control">
            <label for="pattern">正则表达式：</label>
            <input type="text" name="regExp" id="pattern">
            <input type="checkbox" name="modifier" id="ignoreCase" value="i"><label for="ignoreCase">忽略大小写</label>
            <input type="checkbox" name="modifier" id="global" value="g"><label for="global">全局匹配</label>
            <input type="checkbox" name="modifier" id="multiline" value="m"><label for="multiline">多行匹配</label>
            <button id="compare">测试匹配</button>
        </div>
        <div>
            <label for="result">匹配结果：</label>
            <textarea disabled id="result"  cols="30" rows="20"></textarea>
        </div>
    </div>
</div>
<script>
    var str = _getID('str');
        pattern = _getID('pattern'),
        modifierItem = document.getElementsByName('modifier'),
        compare = _getID('compare'),
        result = _getID('result');

    compare.addEventListener('click',function (e) {
        e.stopPropagation();
        var strValue = str.value,
            patternValue = pattern.value,
            modifier = '';
        if(!strValue){
            alert('请输入要匹配的字符串');
            str.focus();
            return;
        }
        if(!patternValue){
            alert('请输入正则');
            pattern.focus();
            return;
        }
        for(var i=0;i<modifierItem.length;i++){
            if(modifierItem[i].checked){
                modifier += modifierItem[i].value;
            }
        }
        result.value = _exec(strValue,patternValue,modifier) || '匹配失败';
    });

    function _getID(param) {
        if((typeof  param) != 'string') return param;
        return document.getElementById(param);
    }

    function _exec(str,pattern,modifier){
        pattern = new RegExp(pattern,modifier);
        return pattern.exec(str);
    }

    function _text(str,pattern,modifier) {
        pattern = new RegExp(pattern,modifier);
        return pattern.test(str);
    }
</script>
</body>
</html>
```

#### 简单的转义字符

```
\   转义字符

例子：
var str = '//我是注释';
var pattern = /\//;
console.log(pattern.exec(str));
```

#### 字符类

```
 [] 方括号用于查找某个范围内的字符

 . 除了反斜杠n能匹配到任意字符

 [^]  字符类中取反

 \w 代表[a-zA-Z0-9_]

 \W 代表[^a-zA-Z0-9_]

 \d 代表[0-9]   \d等这种也可以写在[]里面也可以不写在里面，但是要按照规则

 \D 代表[^0-9]

 \s 可以匹配空格或制表符tab键（\t）

 \S 除了空格制表符Unicode等空白字符之外的所有字符

 例子：
var str = 'sjavascript';
var pattern = /[js]/;
pattern.exec(str);

result:s; 找到str中首次在pattern中出现的字符。

[^]  字符类中取反

例子：
var str = 'sjavascript';
var pattern = /[^js]/;
pattern.exec(str);

result:a;

[a-z] 查找26个英文字母

 例子：
var str = 'sjavascript';
var pattern = /[a-z]/;//匹配从a-z      [e-g]匹配从e到g，一定遵循前面的比后面的小或者等于也可以但一定不能大，否则会报错  [a-zA-Z]匹配a到z和A-Z  [0-9]匹配数字0到9，没有比9大的了
pattern.exec(str);
result:s;

例子：
var str = '2.141592657';
var pattern = /./;
pattern.exec(str);

result:2;
```

#### 重复

```
{3} 匹配3个
{1,1} 匹配1-1个
{1,2} 匹配1-2个
{1,} 至少匹配一个
+ 等于{1,} 至少匹配1个
{0,1} 匹配0个或者1个
? 等于 {0,1} 匹配0个或者1个
* 等于{0，} 0次或者更多

正常情况下，类似\d一次只能匹配一个字符，想要验证多个字符，需要使用到{}

例子：
var str = '肯德基豪华午餐：￥15.5!';
var pattern = /\d+\.?\d*/; //等同于/\d{1,}\.{0,1}\d{0,}/
pattern.exec(str);
```

#### 选择

```
|  或者  写在前面的事先进行匹配

例子：

var str = 'js html';
var pattern = /html|js|css/;
console.log(pattern.exec(str));//html

例子：
var str = 'ab';
var pattern = /a|ab/;
console.log(pattern.exec(str));
```

#### 分组和引用

```
() 代表分组

\1 代表第一个分组，()中的文字
\2 代表第二个分组

例子：

var str = 'abab';
var pattern = /(ab)+/;
pattern.exec(str);//['abab','ab'];

例子：
//捕获

var str = 'abab';
var pattern = /(ab)a/;
pattern.exec(str);//[aba,ab];

例子：
?:非捕获   参见[https://www.jianshu.com/p/5150863e7f7a]

var str = 'abab';
var pattern = /(?:ab)a/;
pattern.exec(str); //aba

例子：

var str = 'abab';
var pattern = /(ab)(a)/;
pattern.exec(str);//[aba,ab,a];

例子：

var str = 'abab';
var pattern = /(a(b(a)))/;
pattern.exec(str);// ["aba", "aba", "ba", "a"]

例子：

var str = '<p><a>这是一段文字</a></p><p><a>这是一段文字</a></p>';
var pattern = /<(?:[a-zA-Z]+)>(.*?)<\/\1>/;
pattern.exec(str);//["<p><a>这是一段文字</a></p>","p","<a>这是一段文字</a>"]

例子：

var str = '1.jpgpng';
var pattern = /\.(gif|jpg|jpeg|png)/i;
pattern.exec(str);
```

#### 指定位置匹配

```
^  字符串中开头开始匹配（手匹配）

千万不要和[^]字符类搞混了，[^]是表示除了

例子：

var str = 'html';
var pattern = /^html/;
pattern.exec(str); //["html", index: 0, input: "html"]

例子：

var str = 'html';
var pattern = /^tml/;
pattern.exec(str); //null

$ 字符串中末尾开始匹配（尾匹配）

例子

var str = 'htmlaaaa';
var pattern = /aa$/;
pattern.exec(str); //aa

例子

var str = 'htmlaaaa11';
var pattern = /aa$/;
pattern.exec(str); //null

匹配数字：

方法一：例子：

var str = '110119aab120';
var pattern = /^\d+$/;
pattern.test(str);

方法二：例子：

var str = '110119aab120';
var pattern = '\D';
pattern.test(str);
```

#### 位置匹配之单词边界匹配

```
\b 边界匹配

例子：

var str = 'js';
var pattern = /\bjs\b/;//js
pattern.test(str);//true

例子：

var str = 'js cssa';
var patetrn = /\bcss\b/;
pattern.test(str);//false
```

#### 实现getElementsByClassName()

```
<body>
<ul>
    <li class="odd">1</li>
    <li class="even">2</li>
    <li class="odd">3</li>
    <li class="even">4</li>
</ul>
<script>
    function getClass(className,parentNode) {
        parentNode = parentNode || document;
        if(document.getElementsByClassName){
            return document.getElementsByClassName(className);
        }else{
            parentNode = parentNode || document;
            var nodeList = [];
            var allNodes = parentNode.getElementsByTagName('*');
            var pattern = new RegExp('(^|\\s+)' + className + '($|\\s+)');

            for(var i = 0;i<allNodes.length;i++){
                if(pattern.test(allNodes[i].className)){
                    nodeList.push(allNodes[i]);
                }
            }
            return nodeList;
        }
    }

    var oddItem = getClass('odd');
    var evenItem = getClass('even');

    for(var i = 0;i<oddItem.length;i++){
        oddItem[i].style.backgroundColor = 'red';
    }

    for(var j = 0;j<evenItem.length;j++){
        evenItem[j].style.backgroundColor = 'green';
    }
</script>
</body>
```

#### 位置匹配之单词前瞻性匹配和负向前瞻性匹配

```
可以将上面匹配类的正则改为

new RegExp('\\b' + className + '\\b');


前瞻性匹配

例子：

var str = 'javascript';
var pattern = /java(?=script)/;
console.log(pattern.exec(str));//java

例子：

var str = 'java';
var pattern = /java(?=script)/;
console.log(pattern.exec(str));//null

负向前瞻性

例子：

var str = 'java';
var pattern = /java(?!script)/;
console.log(pattern.exec(str));//java
```

#### RegExp对象的实例方法

```
new RegExp需要双重转义

例如：

new RegExp('\\b');
```

####
#### String对象中与正则相关方法之search，match，split

```
serach()  ==== >有没有全局匹配都是没有作用的

例子：

var str = 'html js';
var pattern = /js/;
str.search(pattern);//5

var str = 'html j1s';
var pattern = /js/;
str.search(pattern);//-1


match() ====> 非全局的情况下才会返回分组中匹配到的内容，全局匹配只能匹配到所有匹配到的字符。
exec：无论是否全局匹配都会返回分组中匹配到的内容，都只会返回当前匹配的一个内容，而不是全部返回。

例子：
var str = 'html js';
var pattern = /js/;
str.match(pattern);//js

例子：
var str = 'html js';
var pattern = /j(s)/;
str.match(pattern);//[js,s]

例子：
var str = 'html js';
var pattern = /j(s)/g;
str.match(pattern);//[js,js,js]

例子：

var str = '1.js\n2.js\n3.js';
var pattern = /js$/mg;
str.match(pattern);//[js,js,js]

例子：

var str = '1.js\n2.js\n3.js';
var pattern = /js$/g;
str.match(pattern);//[js]


split

例子：

var str = 'html,css,js';
str.split(',');//[html,css.js]

例子：

var str = 'html,css,js';
var pattern = /,/;
str.split(pattern);//[html,css.js]

例子：

var str = 'html,  css,  js';
var pattern = /\s*,\s*/;
str.split(pattern);//[html,css.js]

replace

例子：

var str = 'I love js js';
str.replace('js','html');//I love html js

例子：

var str = 'I love js js';
var pattern = /js/g;
str.replace(pattern,'html');//I love html html

例子：

var str = '1111-11-11';
var pattern = /-/g;
str.replace(pattern,'.');//1111.11.11

例子：

var str = 'I love js';
var pattern = /(js)/;
str.replace(pattern,'<strong style="color:red">$1</strong>');//"I love <strong style="color:red">js</strong>"

例子：（敏感词过滤）

var str = '中国军队和阿扁一起办证';//[国军，阿扁，办证]敏感词
var pattern = /国军|阿扁|办证/g;
str.replace(pattern,'*');
```


#### 常用的正则表达式

```
/*
*QQ号判断规则
*全是数字
*首位不能为0
* 最少5位（10000）
*目前最多11位
* /

// /^[1-9]/d{4,10}$/  //后面写着10太严格了，也许以后还需要修改，那么就写成放开下线
/^[1-9/d{4,}]$/

/*
*昵称判断规则
*中、英文、数字以及下划线
*2-18位
* /

//中文正则范围 /^[\u4e00-\u9fa5\w]{2,18}$/

/*
*密码判断规则
*6-16位
* 不能用空白字符
*区分大小写
*/

/^\S{6-16}$/

/*
*去除字符串首尾空白字符
*/


var str = '    Alex     ';
var pattern = /^\s+|\s+$/g;//不使用*是不想浪费执行，当使用*的时候不管有无空格都会匹配一次
var str1 = str.replace(pattern,'');
console.log('|'+str1+'|');

//或者

var str2 = '    Alex     ';
var pattern1 = /^\s+/;
var pattern2 = /\s+$/;
var str22 = str.replace(pattern1,'').replace(pattern2,'');
console.log(str22);

/*
*封装js去除空格首尾的方法
*/

function trim(str) {
    return str.replace(/^\s+/,'').replace(/\s+$/,'');
}

/*
*转驼峰正则
* css：background-color:red;
* js：elem.style.backgroundColor = 'red';
* jquery:$(elem).css('background-color','red');
*/

var str4 = 'background-color';
var pattern3 = /-([a-z])/ig;
str4.replace(pattern3,function (all,letter) {
    return letter.toUpperCase();
});

function toCamelCase(str) {
    return str.replace(/-([a-z])/ig,function (all,letter) {
        return letter.toUpperCase();
    });
}

/*
*匹配html标签
*/

var str5 = '<p class="odd" id="odd" name=">"><a>123</a></p>';
var pattern5 = /<\/?[a-zA-Z]+(\s+\w+=".*")*>/g;


/*
*email邮箱
* alex@yahoo.com.cn
* alex_1@yahoo.com.cn
* alex_1.asdasd.asdasd.com@yahoo.com.cn
*
*/

/(?:\w+\.)*\w+@(?:\w+\.)+[a-z]+/i
```

#### 创建自己的正则表达式验证程序

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>正则表达式测试工具</title>
    <style type="text/css">
        html * {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            font-size: 14px;
            font-family: Arial;
        }

        #content {
            margin: 100px auto 0 auto;
            width: 1000px;
            height: auto;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 20px 10px;
            overflow: auto;
        }

        #content h4 {
            text-align: center;
            line-height: 40px;
        }

        #content #regExp {
            width: 600px;
            height: auto;
            float: left;
        }

        #content #regList {
            width: 340px;
            height: 100%;
            float: right;
            border: 1px solid #ddd;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            background-color: #f9f9f9;
        }

        #content #regList dt {
            color: #666;
            font-size: 16px;
            line-height: 40px;
        }

        #content #regList dd a {
            display: block;
            color: #1A7DFF;
            line-height: 30px;
            text-decoration: none;
        }

        #content #regList dd a:hover {
            color: #29a9ff;
        }

        textarea {
            width: 100%;
            resize: none;
            outline:none;
        }

        #content .control {
            margin: 10px 0;
        }

         input {
            outline: none;
        }

        button {
            border: none;
            color: white;
            background-color: #29a9ff;
            padding: 5px 10px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
        }

        button:hover {
            background-color: dodgerblue;
        }

        #result {
            background-color: #ebebe4;
            width: 100%;
            height: 200px;
            border:1px solid #ddd;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: white;
            background-color: #999999;
        }
    </style>
</head>
<body>
<div id="content">
    <h4>正则表达式测试工具</h4>
    <div id="regExp">
        <textarea cols="30" rows="20" id="str"></textarea>
        <div class="control">
            <label for="pattern">正则表达式：</label>
            <input type="text" name="regExp" id="pattern">
            <input type="checkbox" name="modifier" id="ignoreCase" value="i"><label for="ignoreCase">忽略大小写</label>
            <input type="checkbox" name="modifier" id="global" value="g"><label for="global">全局匹配</label>
            <input type="checkbox" name="modifier" id="multiline" value="m"><label for="multiline">多行匹配</label>
            <button id="compare">测试匹配</button>
        </div>
        <div>
            <label for="result">匹配结果：</label>
            <div disabled id="result"  cols="30" rows="20"></div>
        </div>
    </div>
    <dl id="regList">
       <dt>常用正则表达式</dt>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
       <dd><a href="javascript:void(0);" title="[\u4e00-\u9fa5]">匹配中文字符</a></dd>
    </dl>
</div>
<div class="footer">本程序由<strong>Helene</strong>制作</div>
<script>
    var str = _getID('str');
        pattern = _getID('pattern'),
        modifierItem = document.getElementsByName('modifier'),
        compare = _getID('compare'),
        result = _getID('result'),
        regLists = _getID('regList').getElementsByTagName('a');

    compare.addEventListener('click',function (e) {
        e.stopPropagation();
        var strValue = str.value,
            patternValue = pattern.value,
            modifier = '';
        if(!strValue){
            alert('请输入要匹配的字符串');
            str.focus();
            return;
        }
        if(!patternValue){
            alert('请输入正则');
            pattern.focus();
            return;
        }
        for(var i=0;i<modifierItem.length;i++){
            if(modifierItem[i].checked){
                modifier += modifierItem[i].value;
            }
        }
        var matchResult = new RegExp('('+patternValue+')',modifier);
        result.innerHTML = matchResult.exec(strValue) ? strValue.replace(matchResult,'<span style="color:red">$1</span>') : '(没有匹配)';
    });

    for(var j=0;j<regLists.length;j++) {
        regLists[j].onclick = function () {
            pattern.value = this.title;
        };
    }

    function _getID(param) {
        if((typeof  param) != 'string') return param;
        return document.getElementById(param);
    }

    function _exec(str,pattern,modifier){
        pattern = new RegExp(pattern,modifier);
        return pattern.exec(str);
    }

    function _text(str,pattern,modifier) {
        pattern = new RegExp(pattern,modifier);
        return pattern.test(str);
    }

</script>
</body>
</html>
```


