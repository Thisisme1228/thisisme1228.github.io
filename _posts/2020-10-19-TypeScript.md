---
layout: post
title: TypeScript
date: 2020-10-19 00:00:00 +0800
tag: 2020/TypeScript
---
* content
{:toc}
<hr>

#### TypeScript究竟是什么

> JavaScript的超级。TypeScript是Javascript类型的超集，它可以编译成纯JavaScript。
> TypeScript可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。

#### 为什么使用TypeScript

```text
1、程序更容易理解（有了TypeScript，下面问题就可以使用代码本身进行回答）

> 问题：函数或者方法输入输出的参数类型，外部条件等

> 问题：动态语言的约束：需要手动调试等过程

2、效率更高

> 在不同代码块和定义之间进行跳转

> 代码自动补全

> 丰富的接口提示

3、更少的错误

> 编译期间能够发现大部分错误

> 杜绝比较常见错误

4、非常好的包容性

> 完全兼容JavaScript

> 第三方库都可以单独编写类型文件

> 流行项目都支持Typescript React Vue Angular、Ant design等
```

```text
1、一点小缺点

>增加了一些学习成本

>短期内增加了一些开发成本
```

#### 基础类型使用

> null 和 undefined是所有类型的子类型。

```
let isDone:boolean = false

let age:number = 28

let firstName:string = 'Helene'

let u:undefined = undefined

let  n:null = null
```

#### any类型和联合类型

```
//any类型

let notSure:any = 'may it s a string'

notSure = 'string'

notSure.getName()

//联合类型

let numberOrString:number | string = 234

numberOrString = '123'
```

#### Array和Tuple(元组)

```
//数组

let arrOfNumber:number[] = [1,2,3,4]

//元组(就是限定了数据类型的数组)

let user:[number,string] = [1,'1']
```

#### Interface接口

```text
> 对对象的形状进行描述

> 对类(class)进行抽象

> Duck Typing(鸭子)
```

```text
>接口命名规则：首字母要大写，有的编程语言最前面再加上I
>注意接口中属性定义结尾使用分号，而不是逗号
>接口属性如果都是必填的，那使用此接口的对象不能多写或者少写接口的属性，而且还必须一致（名称以及值得类型）
>可选属性：接口的属性名后面加？代表此属性可选有或者无
>只读属性：一些对象属性只能在刚刚创建的时候修改其值。此时可以在属性名前使用readonly来指定只读属性
 

interface Person{
    readonly id:number,
    name?:string;//?代表可选属性，可有可无，不会报错
    age:number;
}

let Helene:Person = {
    id: 1,
    name: 'Helene',
    age:1
}

Helene.id = 1111 //报错，因为只读
```

>readOnly看起来和const有点类型，但是他们是有区别的，readOnly是用在属性上面的，而const是用在变量上面的

#### 函数和类型推断

```text
>函数

//下面函数参数为两个number类型，返回值为number类型
//在调用此函数时，必填参数不能多也不能少
//可选参数用?加在参数名称后面，例如参数z    
//可选参数后面不能加确定参数，只能放在最后
//给函数添加默认值也可将参数变成可选参数，例如参数k

function add(x:number,y:number,z?:number,k:number = 10):number{//函数声明写法
    return x + y
}

const add = function(x:number,y:number,z?:number,k:number = 10):number{//函数表达式写法
    return x + y
}

const add2:(x:number,y:number,z?:number,k?:number):number = add
```

#### class

>类(class)：定义了一切事物的抽象特点
>对象(Object)：类的实例，通过new生成
>面向对象(OOP)三大特性：封装、继承、多态

```text
封装：将数据操作细节隐藏起来，只暴露对外接口，外界调用端不需要细节就能通过对外接口访问对象

继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更加具体的特性

多态：是由继承产生的不同的类，对同一方法可以有不同的响应
```

```
class Animal{
    name:string;
    constructor(name:string) {
        this.name = name
    }
    run(){
        return `${this.name} is running`
    }
}

const snake = new Animal('lily')
console.log(snake.run())

class Dog extends Animal{
    bark(){
        return `${this.name} is barking`
    }
}

const xiaobao = new Dog('xiaobao')

class Cat extends Animal{
    constructor(name) {
     super(name);//重写构造函数，在子类构造函数中必须使用super调用父类方法，不然就会报错
        console.log(this.name)
    }
    run(){
        return 'Meow' + super.run() //在子类中，调用父类方法，使用super关键字
    }
}

const maomao = new Cat('maomao')
console.log(maomao.run)
```

#### 类修饰符

```text
类修饰符：public、private、protected、readonly、static

public：修饰的属性和方法是公有的，可以在任何地方访问到，默认的所有属性和方法都是public，你可以随意访问它，也可以重新赋值

例如：
const snake = new Animal('lily')
snake.name = 'lucy'
console.log(snake.name)

private:外部不能访问到

例如：

class Animal{
    private name:string; //name前新增private
    constructor(name:string) {
        this.name = name
    }
    run(){
        return `${this.name} is running`
    }
}

在类的实例以及继承的子类中都无法访问private修饰的方法和属性

protected: 和private的唯一区别就是继承的子类中可以访问到它装饰的属性或者方法

readonly：readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

static: 静态属性,不需要将类实例化，直接就可以访问到静态属性修饰的属性或者方法
```

#### 类和接口

> 在面向对象中，一个类只能继承另外一类，不同类之间可以有不同的特性，使用子类继承父类方法很难完成，这时就可以把这些特性提取成接口，然后用implements（执行、实现的意思）关键字来实现,下面例子：

```
class car {
    switchRadio(){

    }
}

class phone {
    switchRadio(){
    
    }
}
```

>上面两个类有相同特性，所以可以考虑将他们提取出来，如果使用父类的形式，那必须给这两个class找一个何种的父类，很难实现，但这时可以选择把这些特性提取成interface，让两个类都去实现他，下面例子：

```
interface Radio{
    switchRadio(): void//这里什么都不返回，就写成void
}
interface Battery {
    checkBatteryStatus();
}


class car implements Radio{
    switchRadio(): void{
        
    }
}

class phone implements Radio,Battery{
    switchRadio(): void{
        
    } 
    checkBatteryStatus(){
    
    }
}
```

>上面两个接口之间还可以继承

```
interface Radio{
    switchRadio(): void//这里什么都不返回，就写成void
}

interface BatteryWithRadio extends Radio {
    checkBatteryStatus();
}

class phone implements BatteryWithRadio{ 
    checkBatteryStatus(){
    } 
    switchRadio(): void{
    }
}
```

#### 枚举

>在任何项目中我们都会遇到常量这种情况，常量是指执行程序中不能改变的值，我们通常使用const命名常量,比如说星期中的七天，颜色的几种，这些就可以使用枚举表示，下面例子：

```
//数字枚举

enum Direction{
    Up,
    Down,
    Left,
    Right
}

//枚举成员会被自动赋值0-N的数字

console.log(Direction.Up) // 0

//枚举还有反向映射，可以将枚举看成数组

console.log(Direction[0]) //Up

//可以将枚举项手动赋值，如果赋值为数字，那么之后的每一项也会依次在此基础上递增

//也可以为枚举的每一项都赋值为字符串，前面的赋值了后面的也必须赋值为字符串，否则会报错

enum Direction{
    Up,
    Down='DOWN',
    Left='Left',
    Right='Right',
}

//枚举可以用作比较，例如从服务器端返回数据可以使用枚举方法进行比较
```

>常量枚举：上面的枚举编译为js之后会有很大部分的逻辑，那么这时候在enum前面加上const关键字，可以称之为常量枚举，这时编译的文件会简洁很多，提升了性能

```
提问：是否所有的枚举都可以改写成常量枚举？

答案：否。枚举的值有两种类型，一种称之为常量值，一种称为计算值，只有常量值可以用作常量枚举，上面的例子就是常量值。
```

#### 泛型 （generics TypeScript中最难的一部分）

> 泛型出现的动机？要解决什么问题？

```
//看下面代码：

function echo(arg:any):any{
    return arg
}
const result:string = echo(123)

//上面代码不会报错，上面代码传入的是number，返回的也应该是number，那么怎么解决这个问题呢，这时候泛型就应运而生了
```

> 泛型是指定义函数、接口、类时，不预先指定具体类型，而是在使用的时候指定具体类型特征

```
function echo<T>(arg:T):T{
    return arg
}

const result:string = echo('123') //Type '123' is not assignable to type 'string'. 此时就会报错，必须定义类型和传入类型相同才可以

function swap<T,U>(tuple:[T,U]):[U,T]{
    return [tuple[1],tuple[0]]
}

const result2 = swap(['string',123])
```

>约束泛型

```
function echoWithArr<T>(arg:T):T{
    console.log(arg.length)
    return arg
}

//上面会报错=》Property 'length' does not exist on type 'T'.因为不知道传入的参数没有指定类型，因此不确定是否有length属性，改为下面：

function echoWithArr<T>(arg:T[]):T[]{
    console.log(arg.length)
    return arg
}
const arr = echoWithArr([1,2,3])

//但是上面还不是最好的解决方案，只能传参数为数组，那么新的解决方案，就是约束传入的参数必须具有length属性，这就是约束泛型。下面就是约束泛型：

interface IWitchLength{
    length: number;
}

function echoWidthLength<T extends IWitchLength>(arg:T):T{
    console.log(arg.length)
    return arg
}

//上面<T extends IWitchLength>就约束了echoWidthLength方法传入的参数必须具有.length属性且值的类型为number
```

>上面泛型都是作用在函数中，在函数的参数和返回值中使用泛型，下面将在类和接口中使用泛型

>下面在队列中使用泛型

```
class Queue{
   private data = [];
   push(item){
        this.data.push(item)
    }   
    pop(){
        return this.data.shift()
    }
}

const queue = new Queue()
queue.push(1)
queue.push('str')
console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed())

//上面toFixed()是数字才有的方法，编写时不能预先捕捉，运行时会报错

//解决上述问题的最好方法，就是推入和推出队列时接受的类型是一样的，这时就可以使用泛型

class Queue<T>{
   private data = [];
   push(item:T){
        this.data.push(item)
    }   
    pop():T{
        return this.data.shift()
    }
}

const queue1 = new Queue<number>();
queue.push(1)
queue.push(2)
const one = queue.pop()
one.toFixed()

//上述就可以很好地解决之前的问题，添加泛型约束，当然上述的number也可以传入其他类型，根据传入类型不同，可以调用的属性也随之对应
```

>下面在接口中使用泛型

```
interface KeyPair<T,U>{
    key: T;
    VALUE: U;
}

let kpq1:KeyPair<number,string> = {
    key: 1,
    VALUE:'2'
}

let arr:number[] = [1,2,3]
let arrTwo:Array<number> = [1,2,3]
```

> 下面使用interface来描述函数的type

```
function plus(a:number,b:number):number{
    return  a+b
}

const a = plus

//以上，ts类型推荐已经给变量a推断出了类型，但是我们这里可以描述函数类型，看下面例子：

interface IPlus{
    (x:number,y:number):number
}

const b:IPlus = plus

//上面就用interface描述了函数类型，但这不是最好的做好，我们可以使用泛型为interface函数提供更多的支持,下面例子：

interface IPlus<T>{
    (x:T,y:T):T
}

const c:IPlus<number> = plus

//上面就实现啦，非常灵活！
```

#### 类型别名

> 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

````
function sum(x:number,y:number):number{
    return x + y
}

const sum2:(x:number,y:number)=>number =sum

//上面(x:number,y:number)=>number很麻烦，那么这时候就可以把这部分抽出来，使用类型别名，下面例子：

type PlusType = (x:number,y:number)=>number

const sum3:PlusType =sum
````

```
//下面是参数为字符串或者函数时使用类型别名

type NameResolver = ()=> string
type NameOrResolver = string | NameResolver

function getName(n:NameOrResolver):string{
    if (typeof n === 'string') {
        return n
    }
    return n()
}
```

#### 类型断言(as)

```
function getLength(input:string | number):number{
    const str = input as String
    if (str.length) {
        return str.length
    }
    const number = input as Number
    return number.toString.length
}

//注意:类型断言不是类型转换，上面里面的断言不能断言成boolean类型，因为string和number不能转换成其他类型
```



