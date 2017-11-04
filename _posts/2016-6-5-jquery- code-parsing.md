---
layout: post
title:  jQuery源码解析（DOM与核心模块）
date:   2016-6-5 00:00:00 +0800
tag: jQuery
---
* content
{:toc}
使用jQuery快一年了，各种方法已经很熟练，打算研究一下2.1.4这个版本的源码，正好看见有人抛出了对应的JavaScript代码，那我就自己看看研究一下，还能加深了对JavaScript运用。疑难解析部分纯属个人所写，转载请注明出处`life.thisisme1228.com`，Baby go!
<!-- more -->

<hr>

### 一、节点遍历

#### 1.遍历祖先

**代码**

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <title></title>
</head>
<body>

<button id="test1">jQuery遍历祖先</button>
<button id="test2">模拟遍历祖先</button>

<ul class="level-1">
    <li class="item-i">I</li>
    <li class="item-ii">II
        <ul class="level-2">
            <li class="item-a">A</li>
            <li class="item-b">B
                <ul class="level-3">
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                </ul>
            </li>
            <li class="item-c">C</li>
        </ul>
    </li>
    <li class="item-iii">III</li>
</ul>


<script type="text/javascript">


    function parent(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    }


    function parents(elem){
        var matched = [];
        while ( (elem = elem[ 'parentNode' ]) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                matched.push( elem );
            }
        }
        return matched;
    }

    function parentsUntil(elem, filter) {
        var matched = [],
            until,
            truncate = filter !== undefined;
        while ((elem = elem['parentNode']) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate) {
                    if(elem.nodeName.toLowerCase() ==filter){
                        break;
                    }
                }
                matched.push(elem);
            }
        }
        return matched;
    }


    $("#test1").click(function(){
        var item = $('.item-1');
        console.log(item.parent()[0])
        console.log( item.parents().length)
        console.log( item.parentsUntil('body').length)
    })

    $("#test2").click(function(){
        var item = document.querySelectorAll('.item-1')[0]
        console.log(parent(item))
        console.log(parents(item).length)
        console.log(parentsUntil(item, 'body').length)
    })




</script>

</body>
</html>
```

**疑难点分析**

（1）nodeType

定义和用法：

```html
 nodeType 属性返回以数字值返回指定节点的节点类型。
 
 如果节点是元素节点，则 nodeType 属性将返回 1。
 
 如果节点是属性节点，则 nodeType 属性将返回 2。
```

```html
Node Types

文档、元素、属性以及 HTML 或 XML 文档的其他方面拥有不同的节点类型。

存在 12 种不同的节点类型，其中可能会有不同节点类型的子节点：
```
 
本段代码中使用到的`nodeType === 1` 和 `nodeType === 9`，其中1是代表元素--`Element`，9代表整个文档（DOM 树的根节点）--`Document`



 （2）elem['parentNode']
 
 某个元素elem.parentNode，elem['parentNode']两种表示方式一样
 
 例子：
 
 ```js
document.write("Parent node: " + x['parentNode'].nodeName);

document.write("Parent node: " + x.parentNode.nodeName);
```

以上两种方式一样，当然，由此可以这么写，都是一样的

 ```js
document.write("Parent node: " + x['parentNode']['nodeName']);

document.write("Parent node: " + x.parentNode.nodeName);
```


#### 2、遍历同胞

**代码**

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<title></title>
</head>
<body>

<button id="test1">jQuery遍历同胞</button>
<button id="test2">模拟遍历同胞</button>

<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>



<script type="text/javascript">


function dir(elem, dir, until) {
  var matched = [],
    truncate = until !== undefined;
  while ((elem = elem[dir]) && elem.nodeType !== 9) {
    if (elem.nodeType === 1) {
      if (truncate) {
        if (elem.nodeName.toLowerCase() == until || elem.className == until) {
          break;
        }
      }
      matched.push(elem);
    }
  }
  return matched;
}


function nextAll(elem) {
  return dir(elem, "nextSibling");
}

function prevAll(elem) {
  return dir(elem, "previousSibling");
}

function nextUntil(elem, until) {
  return dir(elem, "nextSibling", until);
}

function prevUntil(elem, until) {
  return dir(elem, "previousSibling", until);
}


$("#test1").click(function(){
  var item = $('li.item-ii');
  console.log(item.nextAll()[0].className)
  console.log(item.prevAll()[0].className)
  console.log(item.nextUntil('.end')[0].className)
  console.log(item.prevUntil('.first')[0].className)
})

$("#test2").click(function(){
  var item = document.querySelectorAll('li.item-ii')[0]
  console.log(nextAll(item)[0].className)
  console.log(prevAll(item)[0].className)
  console.log(nextUntil(item, '.end')[0].className)
  console.log(prevUntil(item, '.first')[0].className)
})


</script> 

</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<title></title>
</head>
<body>

<button id="test1">模拟遍历上一个节点</button>
<button id="test2">模拟遍历下一个节点</button>

<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>


<script type="text/javascript">


function sibling(cur, dir) {
  while ((cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur;
}

function next(elem) {
  return sibling(elem, "nextSibling");
}

function prev(elem) {
  return sibling(elem, "previousSibling");
}


var thirdItem = document.querySelectorAll('.third-item')[0]



$("#test1").click(function(){
  var thirdItem = document.querySelectorAll('.third-item')[0]
  console.log(prev(thirdItem).innerHTML)
})


$("#test2").click(function(){
  var thirdItem = document.querySelectorAll('.third-item')[0]
  console.log(next(thirdItem).innerHTML)
})

</script> 

</body>
</html>
```

**疑难点分析**

（1）DOM nextSibling 属性

定义和用法

```html
nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中。

被返回的节点以 Node 对象返回。

注释：如果没有 nextSibling 节点，则返回值为 null。
```

（2）DOM previousSibling 属性

定义和用法

```html
previousSibling 属性返回同一树层级中指定节点的前一个节点。

被返回的节点以 Node 对象的形式返回。

注释：如果没有 previousSibling 节点，则返回值是 null。
```

（3）while ((cur = cur[dir]) && cur.nodeType !== 1) {}

`为什么必须要写"cur.nodeType !== 1"这句话，不写这句话或者改成别的,cur返回的值都是“text”`

啊，折磨我好几个小时终于能解释了，豁然开朗，好开心，哈哈哈哈，写个小例子说明一下：

1.
```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
```
2.
```html
<ul>
    <li>list item 1</li><li>list item 2</li><li class="third-item">list item 3</li><li>list item 4</li><li>list item 5</li>
</ul>
```

看到了吗？看到了吗？为啥返回的TEXT，因为html的空格的节点类型时3，标签的是1，你整那么多空格完了就直接赋值，完了那个值就成了空格并不是你想要的那个，听懂了吧。然后“cur.nodeType !== 1”是当值等于1就结束循环，因为这个时候的cur已经是元素了并不是垃圾空格，哼，骗了我好几个小时，你化成灰我都认识你了!

#### 3、遍历后代

**代码**

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <title></title>
</head>
<body>

<button id="test1">jQuery children方法</button>
<button id="test2">模拟children方法</button>

<div></div>

<ul class="level-1">
    <li class="item-i">I</li>
    <li class="item-ii">II
        <ul class="level-2">
            <li class="item-a">A</li>
            <li class="item-b">B
                <ul class="level-3">
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                </ul>
            </li>
            <li class="item-c">C</li>
        </ul>
    </li>
    <li class="item-iii">III</li>
</ul>


<script type="text/javascript">


    $("#test1").click(function(){
        $('.level-2').children().each(function(i,ele){
            $('div').append('<li>jQuery.children方法,子元素的className为:'+ ele.className + '</li>')
        })
    })

    $("#test2").click(function() {
        function sibling(n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) { //如果存在下一个兄弟节点
                if (n.nodeType === 1 && n !== elem) { //是元素节点，且不是当前选择器元素
                    matched.push(n);
                }
            }
            return matched;
        }

        var ul = document.querySelectorAll('.level-2')[0];

        //遍历所有元素
        $.each(sibling(ul.firstChild), function(i, ele) {
            $('div').append('<li>模拟children方法,子元素的className为:' + ele.className + '</li>')
        })
    })

</script>
</body>
</html>
```

**疑难点分析**

`null`

#### 4、jQuery的遍历结构设计

**代码**

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <title></title>
</head>
<body>


<button id="test1">jQuery遍历祖先</button>
<button id="test2">模拟遍历祖先</button>

<ul class="level-1">
    <li class="item-i">I</li>
    <li class="item-ii">II
        <ul class="level-2">
            <li class="item-a">A</li>
            <li class="item-b">B
                <ul class="level-3">
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                </ul>
            </li>
            <li class="item-c">C</li>
        </ul>
    </li>
    <li class="item-iii">III</li>
</ul>


<script type="text/javascript">

    var ajQuery = {};

    function dir(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate) {
                    if (elem.nodeName.toLowerCase() == until || elem.className == until) {
                        break;
                    }
                }
                matched.push(elem);
            }
        }
        return matched;
    }

    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, until) {
            return dir(elem, "parentNode", until);
        }
    }, function(name, fn) {
        ajQuery[name] = function(until, selector) {
            return  fn(until, selector);
        };
    });


    $("#test1").click(function() {
        var item = $('.item-1');
        alert(item.parent()[0])
        alert(item.parents().length)
        alert(item.parentsUntil('body').length)
    })

    $("#test2").click(function() {
        var item = document.querySelectorAll('.item-1')[0]
        alert(ajQuery.parent(item))
        alert(ajQuery.parents(item).length)
        alert(ajQuery.parentsUntil(item, 'body').length)
    })


</script>

</body>
</html>
```

**疑难点分析**

就是这了jQuery.each({})，把这个看明白就好了，这设计的思想太值得学习，这里不明白的可以看我的另一篇文章`详谈jQuery.each() 和 .each()`


### 二、文档处理

#### 1、节点操作

**代码代码**

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <title></title>
</head>
<body>

<button id="test1">append操作</button>
<button id="test2">after操作</button>
<button id="test3">html操作</button>

<h2>Greetings</h2>
<div class="container">
    <div class="inner">Hello</div>
    <div class="inner">Goodbye</div>
</div>

<script type="text/javascript">


    $('#test1').click(function(){
        $('.inner').append('<p>Test</p>')
    })

    $('#test2').click(function(){
        $('.inner').after('<p>Test</p>');
    })

    $('#test3').click(function(){
        console.log($('h2').html())
    })

</script>
</body>
<!-- 1 -->
</html>
<!-- 1 -->
<!-- 1 -->
```

**疑难点分析**

append操作：

```html
<div class="container">
    <div class="inner">Hello<p>Test</p></div>
    <div class="inner">Goodbye<p>Test</p></div>
</div>
```

after操作：

```html
<div class="container">
    <div class="inner">Hello</div><p>Test</p>
    <div class="inner">Goodbye</div><p>Test</p>
</div>
```

#### 2、深入domManip

domManip()是jQuery DOM操作的核心函数。dom即Dom元素，Manip是Manipulate的缩写，连在一起就是Dom操作的意思。

针对节点的操作有几个重点的细节：

保证最终操作的永远是dom元素，浏览器的最终API只认识那么几个接口，所以如果传递是字符串或者其他的，当然需要转换
针对节点的大量操作，我们肯定是需要引入文档碎片做优化的，这个必不可少

我们知道jQuery的的接口是支持多种参数传递的，那么就需要有一个过滤器的中介来处理各种参数类型。

这个任务就交给了domManip，除此之外domManip在设计上需要做的处理：

```html
1：解析参数，字符串，函数，对象

2：针对大数据引入文档碎片处理

3：如果参数中包含script的处理
```
其中还有很多细节的问题：

1：IE下面innerHTML会忽略没作用域元素,no-scope element(script,link,style,meta,noscript)等，所以这类通过innerHTML创建需要加前缀

2：innerHTML在IE下面会对字符串进行trimLeft操作，去掉空白

3: innerHTML不会执行脚本的代码，如果支持defer除外

4：很多标签不能作为div的子元素、td、tr, tbody等等

5：jQuery是合集对象，文档碎片的与事件的复制问题

针对innerHTML不会执行脚本的代码，如果支持defer除外的解释：

```
div.innerHTML = "<script>alert(1)</srcript>"  
这个代码不会执行
```

例外的情况：IE9之前满足几个条件

1：script设定defer属性

2: script元素必须位于有作用域元素之后，因为script被认为是无作用域的（页面中不可见）

换句话说，这样设置

```
div.innerHTML = "<div><script defer>alert(1)</srcript></div>"  可以执行
```

Query在内部通过会有一个domManip方法，把这些问题都方方面面处理掉了

综合上面一系列的问题，jQuery引入了domManip方法

原因清楚了，我们再来看jQuery是如何处理tbody问题，jQuery是兼容IE 6浏览器的。append、prepend、before和after都是操作Dom元素的函数，如果被插入的对象是table，那就要在table中加入tbody标签啊

所以domManip，主要是处理这个问题的，他还处理插入元素的顺序等等

在结构上首先用extend在原型上拓展了一堆方法，其实每一个的实现都很简单，重点就是要看懂domManip的使用。可以重点挑两个方法的实现看一看，不用每个都看。

然后就是appendTo和append之类的处理，大同小异，因为实现差不多，所以就放在一起了

```
jQuery.fn.extend({ 
     text: function() {}, 
     append: function() {}, 
     prepend: function() {}, 
     before: function() {}, 
     after: function() {}, 
     clone: function() {}, 
     html: function() {},   
     replaceWith: function() {},  
     domManip: function() {},  
})
```

其中append方法：

```
append: function() {
    return this.domManip(arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
        }
    });
}
```

1:函数调用了domManip函数，传进去的参数第一个是arguments，这个大家都知道arguments是函数参数对象，是一个类数组对象。这里arguments可能是包含dom元素的数组，或者html字符串

2:第二参数是一个回调函数，target.appendChild(elem);看到这个代码就很明了，在回调函数中分离各自的处理方法，通过domManip抽象出公共的处理，其余的prepend 、before 、after等接口也是类似的处理


**代码**

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <title></title>
</head>
<body>
<button>模拟append</button>
<div id="test"></div>

<script type="text/javascript">
    /**
     *	一个简单的流程
     *	用于描述文档处理的设计结构与流程
     * *
     */
    function buildFragment(elems, context) {
        var fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            elem,
            l = elems.length;

        for (; i < l; i++) {
            elem = elems[i];
            //创一个元素div做为容器
            tmp = fragment.appendChild(context.createElement("div"));
            //放到文档碎片中
            tmp.innerHTML = elem;
        }
        return fragment;
    }

    function domManip(parentEles, target, callback) {
        var l = parentEles.length;
        var iNoClone = l - 1;

        if (l) {
            var fragment = buildFragment([target], parentEles[0].ownerDocument);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
                fragment = first;
            }
            if (first) {
                callback.call(parentEles, first);
            }
        }

    }

    function append(parentEles, target) {
        return domManip([parentEles], target, function(elem) {
            parentEles.appendChild(elem)
        });
    }

    $("button").click(function(){
        append(document.getElementById('test'),'<div>this is Helene</div>' )
    })

</script>
</body>
</html>
```

**疑难点分析**


`第二章开始过后重新看`


