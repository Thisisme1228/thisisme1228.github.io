---
layout: post
title: JavaScript
date: 2020-10-20 00:00:00 +0800
tag: 2020/JavaScript
---
* content
{:toc}
<hr>

### 1、this

>想要了解this，看mdn关于this的总结就已经足够<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this>

### 2、Promise

>想要了解Promise，看mdn关于Promise的总结就已经足够
><https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises>>以及<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise>


#### 3、箭头函数相对普通函数的区别

> 引入箭头函数有两方面的作用：更简短的函数和不绑定this

> 箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或new.target。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

``` 
通过call或apply或者bind调用

由于箭头函数没有自己的this指针，通过call或apply或者bind方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。

箭头函数不能用作构造器，和new一起使用会抛出错误

箭头函数没有prototype属性

不能使用yield命令，因此箭头函数不能用作Generetor函数
```

#### 4、const

``` 
常量是块级范围的，非常类似用 let 语句定义的变量。但常量的值是无法（通过重新赋值）改变的，也不能被重新声明。
```

```
与var变量不同，全局常量不会变为 window 对象的属性。

const声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。
例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）。
```

``` 
简单概括：

1、不允许重复声明

2、不属于顶层对象window

3、不存在变量提升

4、暂时性死区

5、块级作用域
```

#### 5、null和undefined趋避

> 值 null 特指对象的值未设置。它是 JavaScript 基本类型 之一，在布尔运算中被认为是falsy。

``` 
值 null 是一个字面量，不像 undefined，它不是全局对象的一个属性。

null 是表示缺少的标识，指示变量未指向任何对象。把 null 作为尚未创建的对象，也许更好理解。

在 API 中，null 常在返回类型应是一个对象，但没有关联的值的地方使用。
```

```
简单概述

1、值 null 是一个字面量，不像 undefined，它不是全局对象的一个属性。

2、null 是表示缺少的标识，指示变量未指向任何对象。undefined代表变量没被赋值

3、typeof null        // "object"   typeof undefined   // "undefined"

4、isNaN(1 + null) // false     isNaN(1 + undefined) // true
```

#### 6、let

``` 
1、不属于顶层对象

2、不允许重复声明

3、不存在变量提升

4、暂时性死区

5、块级作用域
```


```
不属于顶层对象(与var区别)：

var a = 5;
undefined
b = 6;//属于window的属性
6
let c = 7;
window.a //5
window.b //6
window.c //报错，因为let声明的变量不属于顶层对象的属性

上面变量a和属性b的区别就是可以使用delete删除b，但是不能删除a

delete a //false
delete b //true

var声明的变量是windows属性，let和const声明的不是，防止了污染顶层对象的属性，弥补了之前js设计的不足。
```

```
不允许重复声明(与var区别)：
var a = 1
undefined
var a = 5;
undefined
let b = 1
undefined
let b =2//VM537:1 Uncaught SyntaxError: Identifier 'b' has already been declared
              at <anonymous>:1:1

//var声明的变量允许重复声明，let声明的变量不允许重复声明
```

```
不存在变量提升(与var区别)：

a //undefined
var a = 1

b //VM753:1 Uncaught ReferenceError: Cannot access 'b' before initialization
                at <anonymous>:1:1
let b = 2
```

```
暂时性死区(与var区别)：

var a = 5;
if(true){
	a = 6;
	var a;
}//不会报错 window属性a返回6


var a = 5;
if(true){
	a = 6;
	let a;
}
VM890:3 Uncaught ReferenceError: Cannot access 'a' before initialization
    at <anonymous>:3:4
//第二段写的会报错，因为在一个块级作用于之中，声明a之前给a赋值就会报错，因为存在了暂时性死区
```

#### 7、Array

``` 
for循环（支持break和continue）

forEach:没有返回值，只是针对每个元素调用function（三个参数，第一个当前元素，第二个当前元素下标，第三个当前遍历的对象，不支持break和continue）

map()：返回新的Array，不会改变原有的数组，每个元素为调用function的结果

filter：返回 符合function条件的元素数组

some：返回boolean，判断是否有元素符合function条件

every：返回boolean，判断是否每个元素都符合function条件

reduce：接受一个函数作为累加器

for in?

find()：返回第一个通过测试的元素

findIndex():返回的值为第一个通过的值得索引

for of (values()/keys()/entries())
```

#### 8、判断是否为数组

``` 
1.instanceof

[1,2,3] instanceof Array
true

2、push

伪数组没有数组原型链上面的push方法

[].push(1)

3、Array.isArray(要判断的对象)

4、Object.prototype.toString.call(要判断的额对象)

const arr = Object.prototype.toString.call([])
 
"[object Array]"

arr.slice(8,-1) /// "Array"
```

### 9、js将伪数组转化为真的数组的三种方法(下面也可以换成带上.length属性的对象,除了扩展运算符)

```js
//1、Array.prototype.slice.call(arguments)

function cc(){
	let a=	Array.prototype.slice.call(arguments)
	console.log(a instanceof Array)
}
cc(1,2,3) //true

//2、[...arguments]//扩展运算符

function cc(){
	let a=	[...arguments]
	console.log(a instanceof Array)
}
cc(1,2,3)//true

//3、Array.from

function cc(){
	let a=	Array.from(arguments)
	console.log(a instanceof Array)
}
cc(1,2,3)//true
```

#### 10、数组的扩展

``` 
1.类数组/伪数组

具有.length属性，但是并不具有数组的方法，比如.push()属性，称之为类数组/伪数组

2、Array.from

将伪数组转化为数组

3、Array of

数组初始化

和new Array()区别

new Array(3) //代表初始化长度为3的数组
Array.of(3) //代表初始化的数组为[3]

4.copyWidthin()

替换数组中元素
const arr = [1,2,3,4,5]
arr.copyWithin(1,4)
(5) [1, 5, 3, 4, 5]0: 11: 32: 43: 54: 5length: 5__proto__: Array(0)
arr.copyWithin(1,2)
(5) [1, 3, 4, 5, 5]
arr.copyWidthin(1,3)//参数代表：第一个代表从下标第几个元素开始替换，第二个代表从下标为第几个元素开始的元素作为替换内容

5.fill()

填充数组

let arr = new Array(3).fill(4) //初始化时填充数组
(3) [4, 4, 4]

arr.fill('wd',1,3)
(3) [4, "wd", "wd"] //替换数组，从下标为1的开始，到下班为3的结束

arr.fill('ss')
(3) ["ss", "ss", "ss"] //替换数组中的全部元素

6.includes()

包含

let arr = [1,2,3]

arr.indexOf(4) //-1

let arr = [1,2,3,NaN]

arr.indexOf(NaN) //-1 //indexOf不能检查是否包含NaN

NaN === NaN
false

arr.includes(NaN)
true

indexOf 和 includes区别 是  includes可以检查数组中是否包含NaN,第二个区别是返回值不同，indexOf返回Number类型，includes返回boolean类型
```

#### 11、函数的扩展

``` 
function fun(x,y,z=1){}

fun.length //代表没有指定参数默认值的参数的个数

fun.name //fun

console.log((new Function).name)
VM4163:1 anonymous
```

#### 12、扩展运算符与rest参数

```
扩展运算符：把数组或者类数组展开成用逗号隔开的值

将数组打散

例子：
function foo(a,b,c){
    console.log(foo)
}

let arr = [1,2,3]
foo(...arr)

let arr1 = [1,2,3]
let arr2 = [4,5,6]

arr1.push(...arr2)

rest参数：把逗号隔开的值组合成一个数组

将打散的值合成一个数组

function foo(...args){
    console.log(args)
}

foo(1,2)
foo(1,2,3)
```

#### 13、Object

``` 
1.属性简洁表示法

const name = 'dd'
let obj = {
    name
}

//属性名是变量
let s = 'school'
let obj = {[s]:'dldr'}

let obj3 = {
    name:'dd',
	a(){
		console.log(this.name)
	}
}

obj3.a() //'dd'

2.属性名表达式

3.Object.is()

Object.is(NaN,NaN)
//true

Object.is(+0,-0) //false



4.扩展运算符与Object.assign()

let x ={
    a:3,
    b:4
}
let y = {...x}

Object.assign()是合并对象，第一个参数是目标对象，其他是要合并的对象

let z = {}
Object.assign(z,x)

5.in
let x ={
    a:3,
    b:4
}

'a' in x //true

in也可以用作数组，用作数组的时候就代表当前位置是否有值


6.对象的遍历方式

let x ={
    a:3,
    b:4
}

for(let key in x){
    
}

Object.keys() ==>[]
```

#### 14、深浅拷贝

> 拷贝之后的数据不会和原数据的值互相影响就是深拷贝，反正就是浅拷贝。

``` 
1、Object.assign()

let target = {}
let source = {a:1,b:2}

Object.assign(target,source) //target   {a: 1, b: 2}

//Object.assign()拷贝对象的时候，只是浅拷贝，并不是深拷贝（深拷贝两个值并不影响）
```

``` 
深拷贝：

1.
JSON.stringify()//将对象转化为字符串
JSON.parse()//将字符串转化为对象

例子：
const obj = {a:1,b:2}
const str = JSON.stringify(obj);
const obj2 = JSON.parse(str)

2.递归

const currentType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1);
}

const deepClone = (target) => {
    const targetType = currentType(target);
    let result
    if (targetType === 'Array') {
        result = []
    } else if (targetType === 'Object') {
        result = {}
    } else {
        return target
    }
    for (let i in target) {
        if (currentType(target[i] === 'Array' || currentType(target[i] === 'Object'))) {
            result[i] = deepClone(target[i])
        } else {
            result[i] = target[i]
        }
    }
    return result
}

const obj = {a: 1, b: {c: '11'}}
deepClone(obj)
```

#### 15、闭包

[闭包MDN介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

``` 
1、什么是闭包
闭包是指有权限访问另一个函数作用域中的变量的函数

最常见的闭包结构如下

function aaa(){
  var name = "xxx"
  return function bbb(){
    alert(name);
  }
}

如上代码，bbb函数内可以访问aaa函数作用域内的变量

2.闭包的三个特性:

①函数嵌套函数
②内部函数可以访问外部函数作用域
③参数和变量不会被垃圾回收机制回收

3.
使用闭包主要是为了设计私有的方法和变量。
闭包的优点是可以避免全局变量污染，
缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

4.闭包副作用：违背垃圾回收机制

垃圾回收机制：
JS具有自动垃圾回收机制。js中最常见的垃圾回收机制是标记清除。
```

#### 16、垃圾回收机制

[违背垃圾回收机制](https://www.imooc.com/article/78743?block_id=tuijian_wz)

```
javascript是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。
这种垃圾收集机制的原理就是：找出那些不再继续使用的变量，然后释放其占用的内存。

垃圾收集器必须追踪到哪个变量有用哪个变量没用，对于不再有用的变量打上标记，
用来以后收回其占用的内存，具体实现到浏览器中，通常有两个策略。

1.标记清除
  
javascript中最常用的垃圾收集方式就是标记清除。

2.引用计数
```

#### 17、Js中数组去重的几种方法

``` 
1、利用ES6中的 Set 方法去重[...(new Set(arr))]

2、new Map()和filter()结合使用
function unique (arr) {
      const arr1 = new Map()
      return arr.filter(ietm => !arr1.has(ietm) && arr1.set(ietm, ietm))
}

3.数组遍历和includes方法
function ar(arr){
	const arr2 = []
	arr.forEach((item,index)=>{
		if(!arr2.includes(item)){
			arr2.push(item)
		}
	})
return arr2
}

4.new Map() //遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果。[...(map.keys())]
```

### 18、get和post区别

```
1、GET在浏览器回退时是无害的，而post会再次提交请求
2、Get请求会被浏览器主动缓存，而post不会，除非手动设置
3、get请求在URL传送的参数是有限的，而post没有限制
4、get比post更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
5、get参数通过url传递，post参数放在请求体中
6、一般用get获取查询数据，不会修改服务器上的数据，post可以向服务器发送修改请求，从而修改数据。
```

#### 19、js的typeof返回的数据类型

``` 
string

number

boolean

undefined

function

symbol

bigint

object  //其中null和数组实力都是返回object
```

#### 20、cookie sessionStorage 和localStorage区别

``` 
1.访问：
cookie：服务端和客户端都可以访问
sessionStorage 和 localStorage只能在客户端访问，除非通过post，或get发送存储数据

2.大小限制：
cookie：大小不超过4K，
sessionStorage 和 localStorage更大些，5M左右

3.声命周期：
cookie：有有效期，过期后将会删除
sessionStorage：生命周期为当前窗口或者标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
localStorage：生命周期永久，除非用户清除缓存，或者使用clear方法主动删除
```

#### 21、持久登录怎么做

```
localStorage 和cookie（需要设置过期时间）
```

#### 22、HTTP状态码

```text
200 成功：一般用于get和post

304 未修改：所请求的资源未修改，服务器返回此状态码时不会返回任何资源，此时请求的是浏览器缓存的内容

401 请求要求用户身份验证

403 服务器理解用户请求，但是拒绝执行此请求

500 服务器内部错误，无法完成请求
```

#### 23、事件冒泡和事件捕获

``` 
事件捕获：事件从最不精确的对象（document对象）开始触发，然后到最精确的对象。

事件冒泡：事件按照从特定的事件目标到最不特定的事件目标（document对象）的顺序触发。
```

#### 24、如何阻止事件冒泡和默认事件

``` 
event.preventDefault()
取消事件的默认动作 //例如通过调用该方法，可以阻止提交表单


event.stopPropagation()
该方法将停止事件的传播，阻止它被分派到其他 Document 节点。
```

#### 25、事件代理（事件委托）

``` 
利用事件冒泡原理，把事件加到父级上，触发效果。

可以用addEventListener实现事件委托  （第三个参数，true捕获。false冒泡=》默认）
```

### 26、事件委托,不冒泡的情况怎么实现事件代理，哪些事件没有冒泡

```text
事件委托就是利用事件冒泡的机制，用父元素代替子元素绑定触发事件
```

#### 27、构造函数

``` 
1、构造函数也是普通函数，创建方式和普通函数一样，但构造函数习惯上首字母大写

2、构造函数和普通函数区别

调用方式不一样，作用也不一样，构造函数用来新建实例对象

普通函数调用方式：直接调用person()

构造函数调用方式：使用new关键字调用new Person()

3.构造函数内部用this构造属性和方法
```

#### 28、数组的方法（至少说出6个）

``` 
concat() //连接两个或更多的数组，并返回结果

join() //通过指定分隔符分割数组

push() //向数组的末尾添加一个或更多元素，并返回新的长度。

reverse() //颠倒数组中元素的顺序

toString() //把数组转换为字符串，并返回结果。

map() //循环数组，返回每次函数调用的结果组成的数组

every() //判断数组中每一项都是否满足条件,只有所有选项都满足条件,才会返回true

some() //判断数组中是否存在满足条件的项,只要有一项满足条件,就返回true

filter() //过滤功能,数组中的每一项运行给定函数,返回满足过滤条件组成的数组

indexOf() //接受两个参数,要查找的项和表示查找起点位置的索引,返回查找的项在数组的位置,没找到的情况下返回-1

includes //接受两个参数,要查找的项和搜索的起始位置，默认为0。如果第二个参数为负数，
则表示倒数的位置，返回Boolean值，和indexof区别是indexof不能辨别数组中是否存在NaN
```

#### 29、web前端开发性能优化方法总结

``` 
1、在js中尽量减少闭包的使用（闭包会产生不销毁的作用域和不销毁的栈内存）

2、尽量合并css和js文件（把需要引用的css和js分别合并成一个）原理是减少http请求次数，尽可能的把合并后的代码压缩，减小http请求资源大小

3、尽量使用字体图标或者svg图标代替传统的png等格式的图片，因为字体图标和svg是矢量图，放大也不会失真，而且渲染速度快，相对小

4、采用图片的懒加载，目的是减少页面第一次加载过程http请求次数，让页面打开速度变快

5、尽可能使用事件委托去处理事件绑定的操作，减少DOM的频繁操作，例如给每个dom元素做事件绑定

6、css导入时尽量减少使用@import,因为@import是同步操作，只有把这个对应的css导入，才会向下加载，而link是异步操作

7、避免使用iframe

8、利用H5中提供的localstorage本地存储，做一些信息的本地存储，下一次加载页面的时候直接从本地获取，减少HTTP请求次数

9、 能用CSS搞定的绝对不用JS，能用原生JS搞定的绝对不用插件，绝对不使用FLASH（除了音视频的低版本浏览器播放）

10、我们一般都把CSS放到BODY上，把JS放到BODY下面（原因：让其先加载CSS在加载JS， 先加载CSS是为了保证页面渲染的过程中，元素是带着样式渲染的，而JS一般都是用来操作DOM元素的，需要等到元素加载完再操作）
```

#### 30、this指向改变的方法

``` 
apply/call/bind

共同点：改变函数运行时this的指向，若第一个参数为undefined、null，this默认指向window

call（无数个参数）

bind（无数个参数）

bind方法不会立即执行，bind返回值是返回一个改变了上下文this后的函数，而原函数中的this并没有被改变

apply（两个参数，第二个参数为数组）
```

#### 31、javascript——原型与原型链

一、prototype

``` 
js中，每个函数（箭头函数除外）都有一个prototype属性，这个属性指向函数的原型对象。

原型的概念：
每个js对象（null除外）创建的时候，都会与之关联另一个对象，这个被关联的对象就是我们所说的原型，每个对象都会从原型中继承属性。
```

二、__proto__

``` 
这是每个对象都有的属性（null除外），这个属性会指向该对象的原型

也就是：

对象的实例.__proto__ = 对象构造函数.prototype
```

三、constructor

```
每个原型都有一个constructor属性，指向该关联的构造函数。
```

四、原型链

```
https://segmentfault.com/a/1190000020470749

每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）
指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，
层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。
```

#### 32、es6继承

```  
class extends和super结合使用

extends就是代表继承的意思，super就是指向父类的构造函数，指代了整个prototype对象或__proto__指针指向的对象。

如果子类中也写入了和父类同样的重名方法，这样就会覆盖父类的，但是想调用父类的同名方法，
可以在子类中使用super.showName
```

#### 33、js作用域

``` 
作用域就是代码的执行环境
```

#### 34、js作用域链

``` 
通俗的讲，声明一个函数时，局部作用域一级一级向上包裹起来，就是作用域链
```

#### 35、模块化

``` 
ES6模块自动开启严格模式

可以导入导出各种类型变量

每个模块都有自己的上下文，每个模块内部声明的变量都是局部变量，不会污染全局作用域

每个模块只加载一次，如再去加载同路径下的文件，直接从内存中读取
```

#### 36、Promise 构造函数是同步执行还是异步执行，那么.then方法呢？

``` 
Promise构造函数是同步执行的.then方法是异步执行的
```

#### 37、Promise有几种状态，什么时候会进入catch？

``` 
三种状态：

pending：初始状态，不是成功或者失败状态

fulfilled：操作完成，成功

rejected：意味着操作失败

两个过程：

pending-》Resolved 

pending-》Rejected

当pending-》Rejected时，会进入catch
```

#### 38、event loop

_[Event Loop的规范和实现](https://zhuanlan.zhihu.com/p/33087629)_
[彻底搞懂浏览器Event-loop](https://www.jianshu.com/p/766c127197c7)

```  
1、为什么要有Event Loop?

JavaScript设计之初是一门单线程语言，因此为了实现主线程的不堵塞，event loop这样的方案应运而生了。

event loop是什么？

主线程从任务队列中读取执行事件，这个过程是循环不断地，这个机制被称为事件循环。
此机制具体如下:主线程会不断从任务队列中按顺序取任务执行，
每执行完一个任务都会检查microtask队列是否为空（执行完一个任务的具体标志是函数执行
栈为空），如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去任务队列中
取下一个任务执行。

2、JavaScript运行机制

（1）所有同步任务都在主线程上执行，形成一个执行栈。

（2）主线程之外还存在着任务队列。只要异步任务有了运行结果，就在任务队列中放置一个事件。

（3）一旦执行栈之中的所有同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件。
哪些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的三个步骤

概括即使：

调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，
这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，
都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作

JavaScript中有两种异步任务：

1、宏任务：setTimeout/setInterval，nodejs的setImmediate
2、微任务：Promise、nodejs的process
```

#### 39、setTimeout、Promise、Async、Await的区别

_这题主要考察这三者在event loop中的区别，event loop中分为宏任务队列和微任务队列。_

``` 
1、js是单线程语言，包括同步任务和异步任务，异步任务包括宏任务列和微任务

2、js运行机制：同步任务-》微任务-》宏任务

3、宏任务：setTimeout、setInterval

4、微任务：Promise.then async/await(实际上是promise+generator的语法糖，也是Promise，也是微任务)

Promise本身是同步的立即执行函数，在执行reject或resolve的时候是异步操作。

async函数返回一个Promise对象，当函数执行的时候，一旦遇到await就会先返回，等到
触发的异步任务完成，在执行函数体后面的语句，可以理解为，是让出了主线程，跳出了
async函数体。
```

#### 40、Proxy

```js
let obj = {
    name: 'wd',
    age: 34,
    _salary: 25000
}

obj = new Proxy(obj, {
    set(target, p, value, receiver) {
        if (p.startsWith('_')) {
            throw new Error('设置失败')
        } else {
            target[p] = value
            return true
        }
    },
    get(target, p, receiver) {
        if (p.startsWith('_')) {
            throw new Error('访问失败')
        } else {
            return p in target ? target[p] : undefined
        }
    },
    has(target, p) {
        if (p.startsWith('_')) {
            throw new Error('访问失败')
        } else {
            return p in target
        }
    },
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'))
    },
    deleteProperty(target, p) {
        if (p.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            delete target[p]
            return true
        }
    }
})

try {
    delete obj['name']
    console.log(obj.name)
} catch (e) {
    console.log(e)
}
```

#### 41、Reflect

``` 
1、将Object内部的方法放到Reflect上
Object.defineProperty()=> Reflect.defineProperty()

2、修改某些Object方法的返回结果，使它变得合理
Object.defineProperty() 定义属性必须使用try，catch监听
Reflect.defineProperty()直接会返回布尔值

3、让Object操作变成函数行为

'name' in obj=> Reflect.has(obj,'name')

4、Reflect对象的方法与Proxy对象的方法一一对应
```

```js
let obj = {
    name: 'wd',
    age: 34,
    _salary: 25000
}

obj = new Proxy(obj, {
    set(target, p, value, receiver) {
        if (p.startsWith('_')) {
            throw new Error('设置失败')
        } else {
            return Reflect.set(target, p, value)
        }
    },
    get(target, p, receiver) {
        if (p.startsWith('_')) {
            throw new Error('访问失败')
        } else {
            return Reflect.has(target, p) ? target[p] : undefined
        }
    },
    has(target, p) {
        if (p.startsWith('_')) {
            throw new Error('访问失败')
        } else {
            // return p in target
            return Reflect.has(target, p)
        }
    },
    ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
    },
    deleteProperty(target, p) {
        if (p.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            // return delete target[p]
            return Reflect.deleteProperty(target, p)
        }
    }
})

try {
    // console.log(Reflect.has(obj, 'name'))
    console.log(obj['name1'] = 100)
    console.log(obj)
} catch (e) {
    console.log(e)
}
```