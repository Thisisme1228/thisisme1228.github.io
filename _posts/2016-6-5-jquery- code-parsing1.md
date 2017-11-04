---
layout: post
title:  jQuery源码解析（架构与依赖模块）
date:   2016-6-5 00:00:00 +0800
tag: jQuery
---
* content
{:toc}
使用jQuery快一年了，各种方法已经很熟练，打算研究一下2.1.4这个版本的源码，正好看见有人抛出了对应的JavaScript代码，那我就自己看看研究一下，还能加深了对JavaScript运用。疑难解析部分纯属个人所写，转载请注明出处`life.thisisme1228.com`，Baby go!
<!-- more -->
<hr>

### 一、理解架构

#### 1、jQuery设计理念

引用百科的介绍：

jQuery是继prototype之后又一个优秀的Javascript框架。它是轻量级的js库 ，它兼容CSS3，还兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+），jQuery2.0及后续版本将不再支持IE6/7/8浏览器。jQuery使用户能更方便地处理HTML（标准通用标记语言下的一个应用）、events、实现动画效果，并且方便地为网站提供AJAX交互。jQuery还有一个比较大的优势是，它的文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择。jQuery能够使用户的html页面保持代码和html内容分离，也就是说，不用再在html里面插入一堆js来调用命令了，只需定义id即可。

`The Write Less,Do More（写更少，做更多），无疑就是jQuery的核心理念`，简洁的API、优雅的链式、强大的查询与便捷的操作。从而把jQuery打造成前端世界的一把利剑，所向披靡！

简洁的API: 

```html
$.on
$.css
$.ajax
….
```

优雅的链式:

```
var jqxhr = $.ajax( "example.php" )
    .done(function() { alert("success"); })
    .fail(function() { alert("error"); })
    .always(function() { alert("complete"); });
```

强大的选择器：

```
$("div, span, p.myClass" )
$("div span:first-child")
$("tr:visible")
…
```

便捷的操作：

```
$("p").removeClass("myClass noClass").addClass("yourClass");
$("ul li:last").addClass(function(index) {
   return"item-" + index;
});
$('.container').append($('h2'));
…
```

为什么要做jQuery源码解析？

虽然jQuery的文档很完善，潜意识降低了前端开发的入门的门槛，要实现一个动画随手拈来，只要简单的调用一个animate方法传递几个执行的参数即可，但如果要我们自己实现一个定制的动画呢？我们要考虑的问题太多太多了，浏览器兼容、各种属性的获取、逻辑流程、性能等等，这些才是前端开发的基础核心。

如果我们只知道使用jQuery，而不知道其原理，那就是“知其然,而不知其所以然


#### 2、jQuery整体架构

任何程序代码不是一开始就复杂的，成功也不是一躇而蹴的，早期jQuery的作者John Resig在2005年提议改进Prototype的“Behaviour”库时，只是想让其使用更简单才发布新的jQuery框架。起初John Resig估计也没料想jQuery会如此的火热。我们可以看到从发布的第一个1.0开始到目前最新的2.1.1其代码膨胀到了9000多行，它兼容CSS3，还兼容各种浏览器，jQuery使用户能更方便地处理DOM、事件、实现动画效果，并且方便地为网站提供AJAX交互。

1、最新jQuery2.1.1版本的结构：

```html
<script type="text/javascript">
;(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	};
	jQuery.fn = jQuery.prototype = {};
	// 核心方法
	// 回调系统
	// 异步队列
	// 数据缓存
	// 队列操作
	// 选择器引
	// 属性操作
	// 节点遍历
	// 文档处理
	// 样式操作
	// 属性操作
	// 事件体系
	// AJAX交互
	// 动画引擎
	return jQuery;
}));
```

2、jQuery的模块依赖网：

<img src="{{ '/styles/images/jquery/04.png' | prepend: site.baseurl }}" alt="" />


jQuery一共13个模块，从2.1版开始jQuery支持通过AMD模块划分，jQuery在最开始发布的1.0版本是很简单的，只有CSS选择符、事件处理和AJAX交互3大块。其发展过程中，有几次重要的变革：

☑  1.2.3 版发布，引入数据缓存，解决循环引用与大数据保存的问题

☑  1.3 版发布，它使用了全新的选择符引擎Sizzle，在各个浏览器下全面超越其他同类型JavaScript框架的查询速度，程序库的性能也因此有了极大提升

☑  1.5 版发布，新增延缓对像(Deferred Objects)，并用deferred重写了Ajax模块

☑  1.7 版发布，抽象出回调对象，提供了强大的的方式来管理回调函数列表。

每一次大的改进都引入了一些新的机制、新的特性，通过这些新的机制就造就了如今jQuery库，一共13个模块，模块不是单一的，比如jQuery动画，都会依赖异步队列、动画队列、回调队列与数据缓存模块等。

jQuery抽出了所有可复用的特性，分离出单一模块，通过组合的用法，不管在设计思路与实现手法上jQuery都是非常高明的。


**五大块：**

jQuery按我的理解分为五大块，选择器、DOM操作、事件、AJAX与动画，那么为什么有13个模块？因为jQuery的设计中最喜欢的做的一件事，就是抽出共同的特性使之“模块化”，当然也是更贴近S.O.L.I.D五大原则的“单一职责SRP”了，遵守单一职责的好处是可以让我们很容易地来维护这个对象，比如，当一个对象封装了很多职责的时候，一旦一个职责需要修改，势必会影响该对象的其它职责代码。通过解耦可以让每个职责更加有弹性地变化。

我们来看看jQuery文档针对业务层的Ajax的处理提供了一系列的门面接口：

```html
.ajaxComplete()
.ajaxError()
.ajaxSend()
.ajaxStart()
.ajaxStop()
.ajaxSuccess()
```

底层接口：

```html
jQuery.ajax()
jQuery.ajaxSetup()
```

快捷方法：

```
jQuery.get()
jQuery.getJSON()
jQuery.getScript()
jQuery.post()
```

**jQuery接口的设计原理**

业务逻辑是复杂多变的，jQuery的高层API数量非常多，而且也非常的细致，这样做可以更友好的便于开发者的操作，不需要必须在一个接口上重载太多的动作。我们在深入内部看看Ajax的高层方法其实都是统一调用了一个静态的jQuery.ajax方法

```js
jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type     = type || callback;
			callback = data;
			data     = undefined;
		}
		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});
```

在jQuery.ajax的内部实现是非常复杂的，首先ajax要考虑异步的处理与回调的统一性，所以就引入了异步队列模块（Deferred）与回调模块（Callbacks）, 所以要把这些模块方法在ajax方法内部再次封装成、构建出一个新的jQXHR对象，针对参数的默认处理，数据传输的格式化等等。


#### 3、立即调用表达式

任何库与框架设计的第一个要点就是`解决命名空间与变量污染的问题`。jQuery就是利用了JavaScript函数作用域的特性，采用`立即调用表达式`包裹了自身的方法来解决这个问题。

jQuery的立即调用函数表达式的写法有三种：

**写法1：**

```js
(function(window, factory) {
    factory(window)
}(this, function() {
    return function() {
       //jQuery的调用
    }
}))
```

可以看出上面的代码中嵌套了2个函数，而且把一个函数作为参数传递到另一个函数中并且执行，这种方法有点复杂，我们简化一下写法：


**写法2：**

```js
var factory = function(){
    return function(){
        //执行方法
    }
}
var jQuery = factory();
```

上面的代码效果和方法1是等同的，但是这个factory有点变成了简单的工厂方法模式，需要自己调用，不像是一个单例的jQuery类，所以我们需要改成“自执行”，而不是另外调用。

**写法3：**

```js
(function(window, undefined) {
    var jQuery = function() {}
    // ...
    window.jQuery = window.$ = jQuery;
})(window);
```

从上面的代码可看出，自动初始化这个函数，让其只构建一次。详细说一下这种写法的优势：

  1、window和undefined都是为了减少变量查找所经过的scope作用域。当window通过传递给闭包内部之后，在闭包内部使用它的时候，可以把它当成一个局部变量，显然比原先在window scope下查找的时候要快一些。
 
  2、undefined也是同样的道理，其实这个undefined并不是JavaScript数据类型的undefined，而是一个普普通通的变量名。只是因为没给它传递值，它的值就是undefined，undefined并不是JavaScript的保留字。
  
有童鞋留言到，为什么要传递undefined？

```
Javascript 中的 undefined 并不是作为关键字，因此可以允许用户对其赋值。
```

我们看一个

```js
var undefined = 'hello'
;(function(window) {
  alert(undefined);//IE8 'hello'
})(window)
```

IE8存在这个问题，当然，大部分浏览器都是不能被修改的

如果函数调用不传递，参数默认就是undefined

```js
;(function(window,undefined) {
    //undefined
})(window)
```

**jQuery为什么要创建这样的一个外层包裹，其原理又是如何？**

这里要区分2个概念一个是匿名函数，一个是自执行。顾名思义，匿名函数，就是没有函数名的函数，也就是不存在外部引用。但是是否像下面代码实现呢：

```js
function(){
//代码逻辑
}
```
 
上面这种写法是错了，声明了它但是又不给名字又没有使用，所以在语法上错误的，那么怎么去执行一个匿名的函数呢？

要调用一个函数，我们必须要有方法定位它、引用它。所以，我们要取一个名字：

```js
var jQuery = function(){
//代码逻辑
}
```

jQuery使用()将匿名函数括起来，然后后面再加一对小括号（包含参数列表），那么这小括号能把我们的表达式组合分块，并且每一块（也就是每一对小括号），都有一个返回值。这个返回值实际上也就是小括号中表达式的返回值。所以，当我们用一对小括号把匿名函数括起来的时候，实际上小括号返回的，就是一个匿名函数的Function对象。因此，小括号对加上匿名函数就如同有名字的函数般被我们取得它的引用位置了。所以如果在这个引用变量后面再加上参数列表，就会实现普通函数的调用形式。

最后，我们回到写法1看看jQuery利用写法3的写法，然后把整个函数作为参数传递给另外一个函数，主要是为了判断jQuery在不同平台的下的加载逻辑，主流的库一般都有对 AMD 和 CommonJS 的支持代码，看看jQuery的代码：

```js
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
        factory(global, true) :
        function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
    };
} else {
    factory(global);
}
```

总结：全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次。

#### 4、jQuery的类数组对象结构

**为什么是类数组对象呢？** 

很多人迷惑的jQuery为什么能像数组一样操作，通过对象get方法或者直接通过下标0索引就能转成DOM对象。

首先我们看jQuery的入口都是统一的$, 通过传递参数的不同，实现了9种方法的重载：

```
1. jQuery([selector,[context]])
2. jQuery(element)
3. jQuery(elementArray)
4. jQuery(object)
5. jQuery(jQuery object)
6. jQuery(html,[ownerDocument])
7. jQuery(html,[attributes])
8. jQuery()
9. jQuery(callback)
``` 

9种用法整体来说可以分三大块：选择器、dom的处理、dom加载。

换句话说jQuery就是为了获取DOM、操作DOM而存在的！所以为了更方便这些操作，让节点与实例对象通过一个桥梁给关联起来，jQuery内部就采用了一种叫“类数组对象”的方式作为存储结构，所以我们即可以像对象一样处理jQuery操作，也能像数组一样可以使用push、pop、shift、unshift、sort、each、map等类数组的方法操作jQuery对象了。

**jQuery对象可用数组下标索引是什么原理？**

通过$(".Class")构建的对象结构如下所示：

<img src="{{ '/styles/images/jquery/05.png' | prepend: site.baseurl }}" alt="" />

整个结构很明了，通过对象键值对的关系保存着属性，原型保存着方法。我们来简单的模拟一个这样的数据结构

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://img.mukewang.com/down/540812440001e40e00000000.js" type="text/javascript"></script>
<style type="text/css">
    div{
		width: 30px;
		height: 10px;
		float:left;
	}
</style>
<title>无标题文档</title>
</head>
<body>

<button id="test1">jQuey[0]</button>
<button id="test2">jQuey.get</button>
<button id="test3">aQuery[0]</button>
<button id="test4">aQuery.get</button>

<p id="book">book</p>

<div id="show1"></div>
<div id="show2"></div>
<div id="show3"></div>
<div id="show4"></div>

<script type="text/javascript">

var aQuery = function(selector) {
    //强制为对象
	if (!(this instanceof aQuery)) {
		return new aQuery(selector);
	}
	var elem = document.getElementById(/[^#].*/.exec(selector)[0]);
	this.length = 1;
	this[0] = elem;
	this.context = document;
	this.selector = selector;
	this.get = function(num) {
		return this[num];
	}
	return this;
}

//结果是一个dom元素,可以把代码放到Google Chrome下运行
//按F12通过调试命令 console.log() 打印出对象
$("#test1").click(function() {
	$('#show1').append($('#book')[0])
})

$("#test2").click(function() {	
	$('#show2').append($('#book').get(0))
})

$("#test3").click(function() {
	$('#show3').append(aQuery("#book")[0])
})

$("#test4").click(function() {
	$('#show4').append(aQuery("#book").get(0))
})


</script>

</body>
</html>
```

以上是模拟jQuery的对象结构，通过aQuery方法抽象出了对象创建的具体过程，这也是软件工程领域中的广为人知的设计模式-工厂方法。

**jQuery的无new构建原理**

函数aQuery()内部首先保证了必须是通过new操作符构建。这样就能保证当前构建的是一个带有this的实例对象，既然是对象我们可以把所有的属性与方法作为对象的key与value的方式给映射到this上，所以如上结构就可以模拟出jQuery的这样的操作了，即可通过索引取值，也可以链式方法取值，但是这样的结构是有很大的缺陷的，每次调用ajQuery方法等于是创建了一个新的实例，那么类似get方法就要在每一个实例上重新创建一遍，性能就大打折扣，所以jQuery在结构上的优化不仅仅只是我们看到的，除了实现类数组结构、方法的原型共享，而且还实现方法的静态与实例的共存，这是我们之后将会重点分析的。



#### 5、jQuery中ready与load事件

jQuery有3种针对文档加载的方法

```js
$(document).ready(function() {
    // ...代码...
})
//document ready 简写
$(function() {
    // ...代码...
})
$(document).load(function() {
    // ...代码...
})
```

一个是ready一个是load，这两个到底有什么区别呢？

ready与load谁先执行：

大家在面试的过程中，经常会被问到一个问题：ready与load那一个先执行，那一个后执行？答案是ready先执行，load后执行。

**DOM文档加载的步骤：**

要想理解为什么ready先执行，load后执行就要先了解下DOM文档加载的步骤：

```html
(1) 解析HTML结构。
(2) 加载外部脚本和样式表文件。
(3) 解析并执行脚本代码。
(4) 构造HTML DOM模型。//ready
(5) 加载图片等外部文件。
(6) 页面加载完毕。//load
```

从上面的描述中大家应该已经理解了吧，ready在第（4）步完成之后就执行了，但是load要在第（6）步完成之后才执行。

**结论：**

ready与load的区别就在于资源文件的加载，ready构建了基本的DOM结构，所以对于代码来说应该越快加载越好。在一个高速浏览的时代，没人愿意等待答案。假如一个网站页面加载超过4秒，不好意思，你1/4的用户将面临着流失，所以对于框架来说用户体验是至关重要的，我们应该越早处理DOM越好，我们不需要等到图片资源都加载后才去处理框架的加载，图片资源过多load事件就会迟迟不会触发。


我们看看jQuery是如何处理文档加载时机的问题：

```js
jQuery.ready.promise = function( obj ) {
    if ( !readyList ) {
        readyList = jQuery.Deferred();
        if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout( jQuery.ready );
        } else {
            document.addEventListener( "DOMContentLoaded", completed, false );
            window.addEventListener( "load", completed, false );
        }
    }
    return readyList.promise( obj );
};
```

jQuery的ready是通过promise给包装过的，这也是jQuery擅长的手法，统一了回调体系，以后我们会重点谈到。
可见jQuery兼容的具体策略：针对高级的浏览器，我们当前很乐意用DOMContentLoaded事件了，省时省力。

那么旧的IE如何处理呢？

继续看jQuery的方案：

```js
// Ensure firing before onload, maybe late but safe also for iframes
document.attachEvent( "onreadystatechange", completed );
// A fallback to window.onload, that will always work
window.attachEvent( "onload", completed );
// If IE and not a frame
// continually check to see if the document is ready
var top = false;
try {
    top = window.frameElement == null && document.documentElement;
} catch(e) {}
if ( top && top.doScroll ) {
    (function doScrollCheck() {
        if ( !jQuery.isReady ) {
            try {
                // Use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                top.doScroll("left");
            } catch(e) {
                return setTimeout( doScrollCheck, 50 );
            }
            // detach all dom ready events
            detach();

            // and execute any waiting functions
            jQuery.ready();
        }
    })();
}
```

如果浏览器存在 document.onreadystatechange 事件，当该事件触发时，如果 document.readyState=complete 的时候，可视为 DOM 树已经载入。不过，这个事件不太可靠，比如当页面中存在图片的时候，可能反而在 onload 事件之后才能触发，换言之，它只能正确地执行于页面不包含二进制资源或非常少或者被缓存时作为一个备选吧。

**针对IE的加载检测**

Diego Perini 在 2007 年的时候，报告了一种检测 IE 是否加载完成的方式，使用 doScroll 方法调用，详情可见http://javascript.nwbox.com/IEContentLoaded/。

原理就是对于 IE 在非 iframe 内时，只有不断地通过能否执行 doScroll 判断 DOM 是否加载完毕。在上述中间隔 50 毫秒尝试去执行 doScroll，注意，由于页面没有加载完成的时候，调用 doScroll 会导致异常，所以使用了 try -catch 来捕获异常。

结论：所以总的来说当页面 DOM 未加载完成时，调用 doScroll 方法时，会产生异常。那么我们反过来用，如果不异常，那么就是页面DOM加载完毕了。

这都是我们在第一时间内处理ready加载的问题，如果ready在页面加载完毕后呢？

jQuery就必须针对这样的情况跳过绑定了：

```js
if ( document.readyState === "complete" ) {
     // Handle it asynchronously to allow scripts the opportunity to delay ready
     setTimeout( jQuery.ready );
 }
```

直接通过查看readyState的状态来确定页面的加载是否完成了。这里会给一个定时器的最小时间后去执行，主要保证执行的正确。

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://img.mukewang.com/down/540812440001e40e00000000.js" type="text/javascript"></script>
<script src="http://img.mukewang.com/down/541f6ff70001a0a500000000.js" type="text/javascript"></script>
<title>dom加载</title>
</head>
<body>

<script type="text/javascript">

function show(data) {
  if (!data) {
    return $("body").append('</br>')
  }
  if (typeof data === 'object') {
    for (var key in data) {
      $("body").append('<li>key->' + key + '; value->'+ data[key] +'</li>')
    }
  } else {
    $("body").append('<li>' + data + '</li>')
  }
}


show('观察脚本加载的顺序')

document.addEventListener("DOMContentLoaded", function() {
    show('DOMContentLoaded回调')
}, false);

window.addEventListener("load", function() {
    show('load事件回调')
}, false);


show('脚本解析一')

//测试加载
$(function(){
    show('脚本解析二')
})

show('脚本解析三')



</script>
</head>
</body>
</html>
```

#### 6、jQuery多库共存处理

多库共存换句话说可以叫`无冲突处理`

总的来说会有2种情况会遇到：

1、$太火热，jQuery采用$作为命名空间，不免会与别的库框架或者插件相冲突。

2、jQuery版本更新太快，插件跟不上，导致不同版本对插件的支持度不一样。

出于以上的原因，jQuery给出了解决方案–– noConflict函数。

引入jQuery运行这个noConflict函数将变量$的控制权让给第一个实现它的那个库，确保jQuery不会与其他库的$对象发生冲突。

在运行这个函数后，就只能使用jQuery变量访问jQuery对象。例如，在要用到$("aaron")的地方，就必须换成jQuery("aaron")，因为$的控制权已经让出去了。

使用DEMO：

```js
jQuery.noConflict();
// 使用 jQuery
jQuery("aaron").show();
// 使用其他库的 $()
$("aaron").style.display = ‘block’;
```

这个函数必须在你导入jQuery文件之后，并且在导入另一个导致冲突的库之前使用。当然也应当在其他冲突的库被使用之前，除非jQuery是最后一个导入的。

由于比较简单，我们直接上代码解说：

```js
Var _jQuery = window.jQuery,
    _$ = window.$;

jQuery.noConflict = function( deep ) {
    if ( window.$ === jQuery ) {
        window.$ = _$;
    }
if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
    }
    return jQuery;
};
```

如果我们需要同时使用jQuery和其他JavaScript库，我们可以使用 $.noConflict()把$的控制权交给其他库。旧引用的$ 被保存在jQuery的初始化; noConflict() 简单的恢复它们。

通过类似swap交换的概念，先把之前的存在的命名空间给缓存起来，通过对比当前的命名空间达到交换的目的，首先，我们先判断下当前的的$空间是不是被jQuery接管了，如果是则让出控制权给之前的_$引用的库，如果传入deep为true的话等于是把jQuery的控制权也让出去了。

如果不通过noConflict处理的话其后果可想而知，香喷喷的$大家都“觊觎已久”。

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://img.mukewang.com/down/540812440001e40e00000000.js" type="text/javascript"></script>
<title>多库共存</title>
</head>
<body>
    
<div id="aaron">测试noConflict效果</div>

<script type="text/javascript">

    $("#aaron").click(function() {

        $.noConflict(); //让出控制权

		if (!$) {
			show("使用noConflict后，$不存在")
		}

		if (jQuery) {
			show("使用noConflict后，jQuery存在")
		}

		//通过闭包隔离出$
		;(function($) {
			if ($) {
				show("通过闭包隔离后，转为局部变量$存在")
			}
		})(jQuery);

    })

    function show(data) {
    	jQuery("body").append('<li>' + data + '</li>')
    }

</script>
</body>
</html>
```