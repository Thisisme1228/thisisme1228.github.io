---
layout: left-none
title:  通信类
date:   2018-3-13 00:00:00 +0800
tag: 面试
---
* content
{:toc}
<hr>

### 什么是同源策略及限制

```
同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
这是一个用于隔离潜在恶意文件的关键的安全机制。

Cookie、LocalStorage和IndexDB无法读取
DOM无法获得
AJAX请求不能发送
```

#### 什么是源

```
一个源包含三部分内容：协议、域名、端口

例如：http://www.baidu.com

http是协议 www.baidu.com是域名 默认的端口是80，这三个构成了一个源，这三个中有一个不一样，也就是源不一样，也就是我们说的跨域了，所以同源策略是源
```

#### 什么是限制

```
就是说不是一个源的文档，就没有权利去操作另一个源的文档，主要限制的几个方面：

Cookie、LocalStorage和IndexDB无法读取
DOM无法获得
AJAX请求不能发送（AJAX只适合同源通信，跨域就不好使了）
```

### 前后端如何通信

```
Ajax(同源下面的通信方式)

WebSocket（不限制同源策略，也就是不受同源策略限制）

CORS（CORS是一个新的通信级别标准，支持跨域通信，也支持同源通信）
```

### 如何创建ajax

```
以下几点是创建ajax需要注意的几个问题：

1、XMLHttpRequest对象的工作流程

2、兼容性处理

3、事件的触发条件

4、事件的触发顺序



```

### 跨域通信的几种方式

```
JSONP

Hash(Hash就是url地址中#后面的东西，Hash的变动页面不会刷新，要记住Hash改动页面是不刷新的)

postMessage（HTML5种新增加的方式，我们知道同源策略目的就是限制跨域通信，但是实际业务中还需要跨域通信，所有HTML5中就出现了这个标准）

WebSocket（不受同源策略限制）

CORS（这个也是新出的通信标准，可以理解为是可以进行跨域通信的ajax）
```

#### JSONP的原理是什么，怎么实现的

```
在出现postMessage和CORS之前，是一直使用JSONP进行跨域通信的，那么它是怎么做到的，就是利用script标签的异步加载来实现的
```

> CORS [参考资料](http://www.ruanyifeng.com/blog/2016/04/cors.html)

#### CORS为什么支持跨域通信

```

```