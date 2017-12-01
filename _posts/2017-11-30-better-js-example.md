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
<br/>
`实践好，多实践，总结经验`
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

```
难点一Array.prototype.join.call作用

难点二.apply(null,arguments)作用，不使用apply，直接调用会怎么样

难点三var args = Array.prototype.join.call(arguments,',');为什么在return function定义
```

