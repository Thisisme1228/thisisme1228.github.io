---
layout: left-none
title:  JavaScript单例模式
date:   2018-4-12 00:00:00 +0800
tag: 进击JavaScript核心
---
* content
{:toc}
<hr>

```
什么是设计模式

GoF定义：设计模式是在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

百度百科定义：设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结

当封装一个函数时，你是在复用代码；而当使用一个设计模式时。你是在复用他人的经验
```

```
设计模式的分类

1、创建型模式

单例模式、抽象工厂模式、建造者模式、工厂模式、原型模式

2、结构型模式

适配器模式、桥接模式、装饰模式、组合模式、外观模式、享元模式、代理模式

3、行为型模式

模板方法模式、命令模式、迭代器模式、观察者模式、中介者模式、备忘录模式、解释器模式、状态模式、策略模式、职责连模式、访问者模式
```

```
设计模式

设计模式的好处

1、行之有效的解决方案
2、易于修改和维护
3、便于交流和沟通
```

```
单利模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点
```

```
单例模式登录例子

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单例模式-登录</title>
    <style>
        #loginLayer {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 500px;
            height: 500px;
            background-color: white;
            z-index: 1;
            margin-top: -250px;
            margin-left: -250px;
        }

        #maskLayer {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background-color: rgba(0,0,0,.6);
        }
    </style>
</head>
<body>
<button id="login">登录</button>
<script>

    var createSingleLoginLayer = createSingeton(createLoginLayer);
    var createSingleMaskLayer = createSingeton(createMaskLayer);
    document.getElementById('login').onclick = function (ev) {
        createSingleLoginLayer()
        createSingleMaskLayer()

    }

    function createLoginLayer() {
        var loginLayer = document.createElement('div');
        loginLayer.id = "loginLayer";
        loginLayer.innerHTML = "登录";
        document.body.appendChild(loginLayer);
        return loginLayer;
    }

    function createMaskLayer() {
        var maskLayer = document.createElement('div');
        maskLayer.id = "maskLayer";
        document.body.appendChild(maskLayer)
        return maskLayer;
    }

    function createSingeton(fn) {
        var instance = null;
        return function () {
            return instance || (instance = fn())
        }
    }
</script>
</body>
</html>
```