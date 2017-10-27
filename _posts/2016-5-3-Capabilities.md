---
layout: post
title:  js的性能优化
date:   2016-5-3 00:00:00 +0800
tag: 性能
---

* content
{:toc}


1、避免全局查找			{#one}
====================================
函数中将全局变量赋值给局部变量以减少全局查找次数，因为访问局部变量的速度要比访问全局变量的速度快些
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
function search() {
    //当我要使用当前页面地址和主机域名
    alert(window.location.href + window.location.host);
}

//最好的方式是如下这样  先用一个简单变量保存起来
function search() {
    var location = window.location;
    alert(location.href + location.host);
}
        </code>
    </pre>
</div>

2、定时器			{#two}
====================================
如果是需要不断运行的代码，则应该使用setInterval而不是setTimeout,因为setTimeout每一次都会初始化一个定时器，而setinterval只会在开始的时候初始化一个定时器
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
var timeoutTimes = 0;
function timeout() {
    timeoutTimes++;
    if (timeoutTimes < 10) {
        setTimeout(timeout, 10);
    }
}
timeout();

//可以替换为：
var intervalTimes = 0;
function interval() {
    intervalTimes++;
    if (intervalTimes >= 10) {
        clearInterval(interv);
    }
}
var interv = setInterval(interval, 10);
        </code>
    </pre>
</div>

3、字符串连接			{#three}
====================================
如果要连接多个字符串，应该少使用+=，如
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
s+=a;

s+=b;

s+=c;

应该写成s+=a + b + c；
        </code>
    </pre>
</div>
而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
var buf = [];
for (var i = 0; i < 100; i++) {
    buf.push(i.toString());
}
var all = buf.join("");
        </code>
    </pre>
</div>

4、数字转换成字符串			{#four}
====================================
最好使用"" + 1来将数字转换成字符串，性能上来说
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
("" +) > String() > .toString() > new String()
        </code>
    </pre>
</div>

5、浮点数转换成整型			{#five}
====================================
很多人喜欢使用parseInt()，其实parseInt()是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用Math.floor()或者Math.round()
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
("" +) > String() > .toString() > new String()
        </code>
    </pre>
</div>

6、多个类型声明			{#six}
====================================
JavaScript中所有变量都可以使用单个var语句来声明,但是可以将他们组合在一起进行声明，以减少整个脚本的执行时间
<div class="language-js highlighter-rouge">
    <pre class="highlight">
        <code>
var myVar = "3.14159",
        str = "" + myVar, //  to string
        i_int = ~ ~myVar,  //  to integer
        f_float = 1 * myVar,  //  to float
        b_bool = !!myVar,  /*  to boolean - any string with length
                                and any number except 0 are true */
        array = [myVar];  //  to array
        </code>
    </pre>
</div>

7、插入迭代器			{#seven}
====================================
如var name=values[i]; i++;前面两条语句可以写成var name=values[i++]<div class="language-js highlighter-rouge">


8、使用直接量			{#eight}
====================================
<div>
    <pre class="highlight">
        <code>
var aTest = new Array(); //替换为
var aTest = [];
var aTest = new Object; //替换为
var aTest = {};
var reg = new RegExp(); //替换为
var reg = /../;
//如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
var oFruit = new O;
oFruit.color = "red";
oFruit.name = "apple";
//前面的代码可用对象字面量来改写成这样：
var oFruit = { color: "red", name: "apple" };
        </code>
    </pre>
</div>

9、使用DocumentFragment优化多次append			{#nine}
====================================
一旦需要更新DOM,请考虑使用文档碎片来构建DOM结构，然后再将其添加到现存的文档中。

<div>
    <pre class="highlight">
        <code>
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    document.body.appendChild(el);
}

//可以替换为：
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
        </code>
    </pre>
</div>


10、使用一次innerHTML赋值代替构建dom元素			{#ten}
====================================
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。

<div>
    <pre class="highlight">
        <code>
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
//可以替换为：
var html = [];
for (var i = 0; i < 1000; i++) {
    html.push("<p>" + i + "</p>");
}
document.body.innerHTML = html.join('');
        </code>
    </pre>
</div>

11、使用firstChild和nextSibling代替childNodes遍历dom元素			{#eleven}
====================================

<div>
    <pre class="highlight">
        <code>
var nodes = element.childNodes;
for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    //……
}
//可以替换为：
var node = element.firstChild;
while (node) {
    //……
    node = node.nextSibling;
        </code>
    </pre>
</div>

12、删除DOM节点			{#twelve}
====================================
删除dom节点之前,一定要删除注册在该节点上的事件,不管是用observe方式还是用attachEvent方式注册的事件,否则将会产生无法回收的内存。另外，在removeChild和innerHTML=’’二者之间,尽量选择后者. 因为在sIEve(内存泄露监测工具)中监测的结果是用removeChild无法有效地释放dom节点

13、重复使用的调用结果，事先保存到局部变量			{#thirteen}
====================================

<div>
    <pre class="highlight">
        <code>
//避免多次取值的调用开销
var h1 = element1.clientHeight + num1;
var h4 = element1.clientHeight + num2;

//可以替换为：
var eleHeight = element1.clientHeight;
var h1 = eleHeight + num1;
var h4 = eleHeight + num2;
        </code>
    </pre>
</div>

14、注意NodeList			{#fourteen}
====================================
最小化访问NodeList的次数可以极大的改进脚本的性能

<div>
    <pre class="highlight">
        <code>
var images = document.getElementsByTagName('img');
for (var i = 0, len = images.length; i < len; i++) {

}
        </code>
    </pre>
</div>

编写JavaScript的时候一定要知道何时返回NodeList对象，这样可以最小化对它们的访问

进行了对getElementsByTagName()的调用
获取了元素的childNodes属性
获取了元素的attributes属性
访问了特殊的集合，如document.forms、document.images等等
要了解了当使用NodeList对象时，合理使用会极大的提升代码执行速度

15、避免双重解释			{#fifteen}
====================================
不要给setTimeout或者setInterval传递字符串参数

<div>
    <pre class="highlight">
        <code>
var num = 0;
setTimeout('num++', 10);
//可以替换为：
var num = 0;
function addNum() {
    num++;
}
setTimeout(addNum, 10);
        </code>
    </pre>
</div>

16、条件分支			{#sixteen}
====================================
<ul>
<li>将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数</li>
<li>在同一条件子的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半。</li>
<li>使用三元运算符替代条件分支</li>
</ul>
<div>
    <pre class="highlight">
        <code>
if (a > b) {
    num = a;
} else {
    num = b;
}
//可以替换为：
num = a > b ? a : b;
         </code>
    </pre>
</div>

17、使用常量			{#seventeen}
====================================
<ul>
<li>重复值:任何在多处用到的值都应该抽取为一个常量</li>
<li>用户界面字符串:任何用于显示给用户的字符串，都应该抽取出来以方便国际化</li>
<li>URLs:在Web应用中，资源位置很容易变更，所以推荐用一个公共地方存放所有的URL</li>
<li>任意可能会更改的值:每当你用到字面量值的时候，你都要问一下自己这个值在未来是不是会变化，如果答案是“是”，那么这个值就应该被提取出来作为一个常量。</li>
</ul>

18、条件分支			{#erighteen}
====================================
<ul>
<li>将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数</li>
<li>在同一条件子的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半。</li>
<li>使用三元运算符替代条件分支</li>
</ul>
<div>
    <pre class="highlight">
        <code>
if (a > b) {
    num = a;
} else {
    num = b;
}
//可以替换为：
num = a > b ? a : b;
         </code>
    </pre>
</div>

19、避免全局量			{#nineteen}
====================================
全局变量应该全部字母大写，各单词之间用_下划线来连接。尽可能避免全局变量和函数, 尽量减少全局变量的使用，因为在一个页面中包含的所有JavaScript都在同一个域中运行。所以如果你的代码中声明了全局变量或者全局函数的话，后面的代码中载入的脚本文件中的同名变量和函数会覆盖掉（overwrite）你的。

<div>
    <pre class="highlight">
        <code>
//糟糕的全局变量和全局函数
var current = null;
function init(){
//...
}
function change() {
    //...
}
function verify() {
    //...
}
//解决办法有很多，Christian Heilmann建议的方法是：
//如果变量和函数不需要在“外面”引用，那么就可以使用一个没有名字的方法将他们全都包起来。
(function(){
var current = null;
function init() {
    //...
}
function change() {
    //...
}
function verify() {
    //...
}
})();
//如果变量和函数需要在“外面”引用，需要把你的变量和函数放在一个“命名空间”中
//我们这里用一个function做命名空间而不是一个var，因为在前者中声明function更简单，而且能保护隐私数据
myNameSpace = function() {
    var current = null;

    function init() {
        //...
    }

    function change() {
        //...
    }

    function verify() {
        //...
    }

//所有需要在命名空间外调用的函数和属性都要写在return里面
    return {
        init: init,
        //甚至你可以为函数和属性命名一个别名
        set: change
    };
};
         </code>
    </pre>
</div>

20、松散耦合			{#twenty}
====================================
解耦CSS/JavaScript

显示问题的唯一来源应该是CSS，行为问题的唯一来源应该是JavaScript，层次之间保持松散耦合才可以让你的应用程序更加易于维护，所以像以下的代码element.style.color=”red”尽量改为element.className=”edit”，而且不要在css中通过表达式嵌入JavaScript

21、性能方面的注意事项			{#twenty-one}
====================================
1、尽量使用原生方法

2、switch语句相对if较快

通过将case语句按照最可能到最不可能的顺序进行组织

3、巧用||和&&布尔运算符
<div>
    <pre class="highlight">
        <code>
function eventHandler(e) {
    if (!e) e = window.event;
}
//可以替换为：
function eventHandler(e) {
    e = e || window.event;
}

if (myobj) {
    doSomething(myobj);
}
//可以替换为：
myobj && doSomething(myobj);
         </code>
    </pre>
</div>

22、==和===的区别			{#twenty-two}
====================================
避免在if和while语句的条件部分进行赋值，如if (a = b)，应该写成if (a == b)，但是在比较是否相等的情况下，最好使用全等运行符，也就是使用===和!==操作符会相对于==和!=会好点。==和!=操作符会进行类型强制转换

<div>
    <pre class="highlight">
        <code>
var valueA = "1";
var valueB = 1;
if (valueA == valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Equal"
if (valueA === valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Not equal"
         </code>
    </pre>
</div>

23、何时用单引号，何时用双引号			{#twenty-three}
====================================
虽然在JavaScript当中，双引号和单引号都可以表示字符串, 为了避免混乱，我们建议在HTML中使用双引号，在JavaScript中使用单引号，但为了兼容各个浏览器，也为了解析时不会出错，定义JSON对象时，最好使用双引号

24、何时用单引号，何时用双引号			{#twenty-four}
====================================
虽然在JavaScript当中，双引号和单引号都可以表示字符串, 为了避免混乱，我们建议在HTML中使用双引号，在JavaScript中使用单引号，但为了兼容各个浏览器，也为了解析时不会出错，定义JSON对象时，最好使用双引号

<div>
    <pre class="highlight">
        <code>
var valueA = "1";
var valueB = 1;
if (valueA == valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Equal"
if (valueA === valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Not equal"
         </code>
    </pre>
</div>