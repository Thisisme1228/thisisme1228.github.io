---
layout: left-none
title:  MVVM框架（双向绑定）
date:   2018-3-15 00:00:00 +0800
tag: 面试
---
* content
{:toc}
<hr>

### 1、了解MVVM框架吗？

```
Vue.js  React.js  Angular.js

注意事项：
1、一定要想好说哪个
2、收住优点，攒着往下说，开启导航模式
3、话别说的太满，低调谨慎
```

### 2、谈谈你对MVVM的认识？

```
1、先聊MVC
2、聊聊MVVM的定义
要知道MVVM四个字母代表的含义，M（Model）V(View) VM(ViewModel)

注意事项：
1、聊聊MVC，彰显知识面涉猎较多
2、把mvvm的定义说清楚，表达概念理解到位
3、对比mvvm和mvc
```

### 3、双向绑定是什么原理，可以写出来吗？

```
view  (反向)=======》  《=======（正向） data

Object.defineProperty =======>  目前Vue.js  React.js  Angular.js都是基于这个API做的双向绑定
input事件

要做到以下三点：
1、object.defineProperty的用法要熟记于心
2、object.defineProperty与reflect.defineProperty的区别

object.defineProperty会返回一个新的对象；reflect.defineProperty会返回一个布尔值

3、object.defineProperty要学会手写
```

### 4、使用了什么设计模式？

```


注意事项：
1、观察者设计模式的原理要了如指掌
2、最好能写出设计模式的伪代码
3、如果没有问道设计模式，也要找时机表现出来
```

### 5、生命周期是什么？

```
这里可以拿VUE的生命周期图拿来看一下,一定要了解生命周期，不然不知道一个框架的生命周期是不可能知道怎么去运用它的，要知道生命周期的事件点，以及每个事件点之间的区别

注意事项：
1、熟记对应的几个节点
2、熟记每个节点触发的时机
3、做好多演练一下
```

### 6、有看过源码吗？

```

```