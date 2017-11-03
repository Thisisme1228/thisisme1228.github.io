---
layout: post
title:  jQuery源码解析
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



