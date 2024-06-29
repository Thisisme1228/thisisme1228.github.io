---
layout: post
title:  8种办法解决 JS 闭包经典面试题之 for 循环取 i
date:   2017-3-2 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
**闭包**
<br/>
<br/>
1.正确的说,应该是指一个闭包域,每当声明了一个函数,它就产生了一个闭包域(可以解释为每个函数都有自己的函数栈),每个闭包域(Function 对象)都有一个 function scope(不是属性),function scope内默认有个名为Global的全局引用(有了这个引用,就可以直接调用 Global 的属性或方法)
<br/>
<br/>
2.凡是在闭包域内声明的变量或方法,外部无法直接访问
<br/>
<br/>
3.闭包域可以访问外部的变量或方法
<br/>
<br/>
当在一个闭包域内包含另一个闭包域时(简单的说就是在一个函数内有另一个函数,当然这个内部函数的生命周期是依附于外部函数的), 此时,若子闭包域(内部的闭包域,内部函数)使用了父闭包域(外部闭包域,外部函数)的私有变量(在父闭包域中声明的变量,父闭包域的外部空间无法直接访问,但子闭包域可以访问),子闭包域即当前的子函数的 function scope 会产生一个 closure 对象属性,这个对象属性内包含的是子闭包域对父闭包域的所有引用(只要子闭包域(内部函数)还存活,其父闭包域(外部函数)就依旧存活),倘若在父闭包域存活期间对其私有变量内容进行修改,则对这些父闭包域的私有变量进行引用的子闭包域中 function scope 的 closure 对象属性的内容也会发生变化,因为这只是引用.
<!-- more -->

举例:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script type="text/javascript" charset="utf-8">
        //函数 a 有一个私有变量 p 和一个内部函数 innerA
        function a() {                      //外部闭包域 ,一个名为 a 的 Function 对象
            var p = 0;                      //私有变量 p
            var innerA = function () {      //内部闭包域 ,一个名为 innerA 的 Function 对象
                console.log(p);             //对外部闭包域的私有变量进行了引用,故 innerA 对象的 function scope 会产生一个名为 closure 的对象属性,closure 对象内含有一个名为 p 的引用
            }
 
            innerA();//输出0
            p++;
            innerA();//输出1
        }
        a();
    </script>
</body>
</html>
```

结果如下:

第一次调用innerA

<img src="{{ '/styles/images/closure/01.png' | prepend: site.baseurl }}" alt="" width="50%" />

第二次调用 innerA

<img src="{{ '/styles/images/closure/02.png' | prepend: site.baseurl }}" alt="" width="50%" />

控制台输出

<img src="{{ '/styles/images/closure/03.png' | prepend: site.baseurl }}" alt="" width="50%" />


## 回到主题 面试经典问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script type="text/javascript">
        //面试经典问题:
 
        function onMyLoad(){
            /*
            抛出问题:
                此题的目的是想每次点击对应目标时弹出对应的数字下标 0~4,但实际是无论点击哪个目标都会弹出数字5
            问题所在:
                arr 中的每一项的 onclick 均为一个函数实例(Function 对象),这个函数实例也产生了一个闭包域,
                这个闭包域引用了外部闭包域的变量,其 function scope 的 closure 对象有个名为 i 的引用,
                外部闭包域的私有变量内容发生变化,内部闭包域得到的值自然会发生改变
            */
            var arr = document.getElementsByTagName("p");
            for(var i = 0; i < arr.length;i++){
                arr[i].onclick = function(){
                    alert(i);
                }
            }
        }
    </script>
</head>
<body onload="onMyLoad()">
    <p>产品一</p>
    <p>产品二</p>
    <p>产品三</p>
    <p>产品四</p>
    <p>产品五</p>
</body>
</html>
```

解决办法:

### 1.解决办法一

```js
/*
解决思路:
    增加若干个对应的闭包域空间(这里采用的是匿名函数),专门用来存储原先需要引用的内容(下标),不过只限于基本类型(基本类型值传递,对象类型引用传递)
 */
for(var i = 0;i<arr.length;i++){
 
    //声明一个匿名函数,若传进来的是基本类型则为值传递,故不会对实参产生影响,
    //该函数对象有一个本地私有变量arg(形参) ,该函数的 function scope 的 closure 对象属性有两个引用,一个是 arr,一个是 i
    //尽管引用 i 的值随外部改变 ,但本地私有变量(形参) arg 不会受影响,其值在一开始被调用的时候就决定了.
    (function (arg) {
        arr[i].onclick = function () {  //onclick函数实例的 function scope 的 closure 对象属性有一个引用 arg,
            alert(arg);                 //只要 外部空间的 arg 不变,这里的引用值当然不会改变
        }
    })(i);                              //立刻执行该匿名函数,传递下标 i(实参)
}
```

### 2.解决办法二

```js
/*
解决思路:
    将下标作为对象属性(name:"i",value:i的值)添加到每个数组项(p对象)中
*/
for(var i = 0;i<arr.length;i++){
    //为当前数组项即当前 p 对象添加一个名为 i 的属性,值为循环体的 i 变量的值,
    //此时当前 p 对象的 i 属性并不是对循环体的 i 变量的引用,而是一个独立p 对象的属性,属性值在声明的时候就确定了
    //(基本类型的值都是存在栈中的,当有一个基本类型变量声明其等于另一个基本变量时,此时并不是两个基本类型变量都指向一个值,而是各自有各自的值,但值是相等的)
    arr[i].i = i;
    arr[i].onclick = function () {
        alert(this.i);
    }
}
```

### 3.解决办法三

```js
/*
解决思路:
    与解决办法一有点相似但却有点不太相似.
    相似点:同样是增加若干个对应的闭包域空间用来存储下标
    不同点:解决办法一是在新增的匿名闭包空间内完成事件的绑定,而此例是将事件绑定在新增的匿名函数返回的函数上
 
    此时绑定的函数中的 function scope 中的 closure 对象的 引用 arg 是指向将其返回的匿名函数的私有变量 arg
 */
for(var i = 0; i<arr.length;i++){
    arr[i].onclick = (function(arg){
        return function () {
            alert(arg);
        }
    })(i);
}
```

### 4.解决办法四


```js
/*
解决思路与解决办法一相同
 */
for(var i = 0; i<arr.length;i++){
    (function(){
       var temp = i;
        arr[i].onclick = function () {
            alert(temp);
        }
    })();
}
```

### 5.解决办法五

```js
/*
解决思路与解决办法三及四相同
 */
for(var i = 0;i<arr.length;i++){
    arr[i].onclick = (function () {
        var temp = i;
        return function () {
            alert(temp);
        }
    })();
}
```

### 6.解决办法六

```js
/*
解决思路:
    将下标添加为绑定函数的属性
 */
for(var i = 0;i<arr.length;i++){
    (arr[i].onclick = function () {
        alert(arguments.callee.i);      //arguments 参数对象  arguments.callee 参数对象所属函数
    }).i = i;
}
```

### 7.解决办法七

```js
/*
解决思路:
    通过 new 使用 Function 的构造函数 创建 Function 实例实现,由于传入的函数体的内容是字符串,故 Function 得到的是一个字符串拷贝,而没有得到 i 的引用(这里是先获取 i.toString()然后与前后字符串拼接成一个新的字符串,Function 对其进行反向解析成 JS 代码)
 */
for(var i = 0;i<arr.length;i++){
    arr[i].onclick = new Function("alert("+i+");");//每 new 一个 Function 得到一个 Function 对象(一个函数),有自己的闭包域
}
```

### 8.解决办法八

```js
/*
解决思路:
    直接通过 Function 返回一个函数
    与解决办法七的不同之处在于:
        解决办法七使用 new,使用了 new,此时 Function 函数就被当成构造器可以用来构造一个 Function 实例返回
        当前解决办法没有使用 new ,即将 Function 函数当成一个函数,传入参数返回一个新函数;
        其实此处 new 与不 new 只是的区别在于:
            使用了 new 即 Function 函数充当构造器,由 JS 解析器生产一个新的对象,构造器内的 this 指向该新对象;
            不实用 new 即 Function 函数依旧是函数,由函数内部自己生产一个实例返回.
 */
for(var i = 0;i<arr.length;i++){
    arr[i].onclick = Function("alert("+i+");");
}
```

解决办法大同小异,只要理解其中的实质,可以写出多多的解决办法
