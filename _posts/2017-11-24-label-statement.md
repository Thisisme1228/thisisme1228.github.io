---
layout: post
title:  标签语句
date:   2017-11-24 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
标签语句提供一种使你同一程序的在另一处找到它的标识。例如，你可以用一个标签来识别一个循环，并用break或continue语句来说明一个程序是否要中断这个循环或是继续执行。
<!-- more -->

label 语句的语法看起来像这样：

```js
label :
   statement
```

label 的值可以是任何的非保留字的 JavaScript 标识符， statement 可以是任意你想要标识的语句（块）。

例如

在这个示例中，markLoop这个标签定义了一个while循环。

```js
markLoop:
while (theMark == true) {
   doSomething();
}
```

标签语句使用场景：给一个语句加标签，这样在程序的任何地方都可以使用这个名字来引用它，可以标记任何语句，但是被标记的语句通常是那些循环语句，即while、do/while、for和for/in语句，通常给循环命名，就可以使用break语句和continue语句来退出循环或者循环的某一次迭代。


```js
outerloop:  
  for (var i = 0; i < 10; i++)  
  {  
      innerloop:   
      for (var j = 0; j < 10; j++)  
        {  
            if (j > 3)  
            {  
                break;  
            }  
            if (i == 2)  
            {  
                break innerloop;  
            }  
            if (i == 4)  
            {  
                break outerloop;  
            }  
            document.write("i=" + i + " j=" + j + "<br>");  
        }  
  }  
```

值为：

```js
i=0 j=0
i=0 j=1
i=0 j=2
i=0 j=3
i=1 j=0
i=1 j=1
i=1 j=2
i=1 j=3
i=3 j=0
i=3 j=1
i=3 j=2
i=3 j=3
```

break; 语法形式用于终止在循环体或者switch的封闭内部；

break label;语法形式用于在特定的封闭标签语句。

continue 语句

这个 continue 语句可以用来继续执行（跳过代码块的剩余部分并进入下一循环）一个 while， do-while， for， 或者 label 语句。

当你使用不带 label 的 continue 时， 它终止当前 while，do-while，或者 for 语句到结尾的这次的循环并且继续执行下一次循环。

当你使用带 label 的 continue 时， 它会应用被 label 标识的循环语句。

连续语句的语法如下：

continue

continue label






