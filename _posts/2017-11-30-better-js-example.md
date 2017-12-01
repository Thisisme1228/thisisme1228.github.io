---
layout: left-none
title:  我见青山多妩媚，料青山、见我应如是
date:   2017-11-30 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
`看代码好，多看代码，看好代码`
<br/>
`实践好，多实践，总结经验`
<br/>
`X墨守成规X，循序渐进，闻一知十，这是一场思想上的战争`
<!-- more -->

### 1.闭包之外的问题

```js
var mult = (function () {
    var cache = {};

    var calculate = function () {
        var a = 1;
        for(var i = 0, l = arguments.length; i < l; i++){
            a = a * arguments[i];
        }
        return a;
    }

    return function () {
        var args = Array.prototype.join.call(arguments,',');//1
        console.log(args);
        console.log(cache[args]);
        if(cache[args]){
            return cache[args];
        }

        return cache[args] = calculate.apply(null,arguments);//2
    }//3
})();
```

**结果：**

```js
1,2
undefined
3,4
undefined
5,6
undefined
1,2
2
3,4
12
5,6
30
```

`解答：`

**难点一Array.prototype.join.call对于arguments的作用**

函数的参数列表arguments是一个类数组的对象，虽然有下标，但它并非真正的数组，不能向数组一样，进行排序或者往集合里面添加一个新的元素。我们常借用Array.prototype对象上的方法。这里借用使用这个方法操作arguments是它的元素以逗号为分割点返回一个字符串，进而缓存成对象的键名。

**难点二.apply(null,arguments)作用，不使用apply，直接调用会怎么样**

apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply方法把这个集合中的元素作为参数传递给比调用的函数。如果传入的第一个参数是null，函数体内的this会指向默认的数组对象，在浏览器中则是window。

这里如果不使用.apply(null,arguments)的形式，而直接使用calculate(arguments)的话，可以有以下两种方法：

```
1.给calculate设置个形参，这个形参就是arguments对象

2.calculate方法里面arguments写成arguments[0]进行遍历
```

运行得知，return function里面的argument和calculate方法里面arguments是不一样的，return function里面arguments是下面这种：

<img src="{{ '/styles/images/javascript/03.jpg' | prepend: site.baseurl }}" alt="" width="300" />

calculate方法里面arguments是下面这种

<img src="{{ '/styles/images/javascript/04.jpg' | prepend: site.baseurl }}" alt="" width="300" />

<div style='text-decoration: line-through;'>那么这里使用.apply(null,arguments)的形式就是想要把当前作用域的arguments传递给calculate方法</div>

**此时可以想到，为什么使用以上方式2时，要arguments[0]这么写，return cache[args] = calculate(arguments);这种形式传递的参数究竟为什么又比之前多包了一层？**

好吧，纠结了两个小时的小问题，刚才转念一想，参数为什么会多报了一层，其实这个如果不去深究原理，只是看表面上还是 很容易理解的，调用mult函数的时候，里面的参数不也是多包了一层么，也就是调用一次就多包一层，然后刚才试验，发现确实是这样的。可是还是想知道到底为什么？？

```
1.当给一个没有形参的函数传递实参调用，所得到的arguments为什么多加了一层？

2.当给一个有形参的函数传递实参调用，所得的arguments为什么就是所传递的实参？

3.当时用.apply(null,arguments)调用函数，所得的arguments为什么就是所传递的实参？
```

**难点三var args = Array.prototype.join.call(arguments,',');为什么在return function定义，而不在上级作用域定义？**


