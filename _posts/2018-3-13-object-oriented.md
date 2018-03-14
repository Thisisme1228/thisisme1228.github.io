---
layout: left-none
title:  面向对象
date:   2018-3-13 00:00:00 +0800
tag: 面试
---
* content
{:toc}
<hr>

### 类与实例

#### 类的声明

```
类的声明有两种方式，一种是传统的构造函数来模拟一个类的方式，第二种就是ES6种class的声明
```

#### 类的声明的代码
```js
//构造函数模拟一个类的方式
function Animal() {
    this.name = 'name'
}

//ES6中的class的声明方式
class Animal2 {
    constructor() {
        this.name = 'name'
    }
}
```

#### 实例化

```js
虽然声明方式不同，但是实例化方式是一样的
new Animal()
new Animal2()
```

### 类与继承

```
    /* 借助构造函数实现继承 */
    function Parent1() {
        this.name = 'parent1'
    }
    function Child1() {
        Parent1.call(this)//call、apply 改变的是函数运行的上下文，通过这种方式调用使Parent1函数在Child1函数里面执行的话就同时修改了父级
                           //构造函数的指向，导致的效果就是父级元素中的所有属性在子类函数中也有，但是这种方式的缺点就是Parent1原型对象上的方法并不能被Child1继承
                            //因此这种继承方式只是实现了部分继承，如果说父类上的属性都在构造函数里面那么没问题，都能被继承；但如果说父类的原型对象上还有方法的话，子类是拿不到方法的，这个是它的缺点
        this.type = 'child1'
    }

    /* 借助原型链实现继承 */
    function Parent2() {
        this.name = 'parent2'
        this.play = [1,2,3]
    }

    function Child2() {
        this.type = 'child2'
    }
    Child2.prototype = new Parent2() //任何函数都有prototype这个属性，这个属性的作用就是为了它的实例能够访问到它的原型对象上，这就是原型链的基本原理
                                        //这种方式的缺点是原型链中的原型对象是共用的，改变其中的一个实例另一个实例也跟着改变，每个实例是全等的

    /* 组合方式(构造函数+原型链，结合这两种优点，弥补它们的不足) */
    function Parent3() {
        this.name = 'parent3'
        this.play = [1,2,3]
    }

    function Child3() {
        Parent3.call(this)
        this.type = 'child3'
    }

    Child3.prototype = new Parent3()//使用这种组合方式把构造函数和借助原型链方式的优点结合起来，把不足也剔除了，这个是实现继承最通用的方式
                                       //这种方式的缺点，父级构造函数执行了两次，以下是组合方式的优化方式

    /* 组合继承的优化1 */
    function Parent4() {
        this.name = 'parent4'
        this.play  = [1,2,3]
    }

    function Child4() {
        Parent4.call(this) //这样可以拿到构造函数体内的所有属性和对象  这里执行一次Parent4
        this.type = 'child4'
    }

    Child4.prototype = Parent4.prototype//这样可以实现继承到父类的属性和方法  这里只是引用原型对象  这种方式的缺点是使用constructor判断谁是实例化对象的构造函数的时候会出现Parent4是而不是Child4

    /*  组合继承的优化2 */
    function Parent5() {
        this.name = 'parent5'
        this.play  = [1,2,3]
    }

    function Child5() {
        Parent4.call(this) //这样可以拿到构造函数体内的所有属性和对象  这里执行一次Parent4
        this.type = 'child5'
    }

    Child5.prototype = Object.create(Parent5.prototype)//__.proto__
    Child5.prototype.constructor = Child5
```