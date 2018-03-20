---
layout: left-none
title:  JavaScript内置对象-JavaScript对象之数组
date:   2018-3-20 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
JavaScript中的内置对象

1、Array
2、String
3、Math
4、Date
```

```
Array数组

ECMAScript中Array数组

数组主要是用来存储一组数据
```

```
创建数组的基本方式有两种

1、使用Array构造函数
语法：new Array()
小括号()说明：
（1）预先知道数组要保存的项目数量
（2）向Array构造函数中传递数组应包含的项

2、使用数组字面量表示法
由一对包含数组项的方括号[]表示，多个数组项之间以逗号隔开
```

```
掌握数组的栈方法：

1、push()
2、unshift()
3、pop()
4、shift()
```

```
push()

语法：
arrayObject.push(newele1,newele2,...,nexX)

功能：
把它的参数顺序添加到arrayObject的尾部

返回值：
把指定的值添加到数组后的新长度
```

```
unshift()

语法：
arrayObject.unshift(newele1,newele2,...,nexX)

功能：
把它的参数顺序添加到arrayObject的开头

返回值：
把指定的值添加到数组后的新长度
```

```
pop()

语法：
arrayObject.pop()

功能：
删除arrayObject的最后一个元素

返回值：
被删除的那个元素
```

```
shift()

语法：
arrayObject.shift()

功能：
删除arrayObject的第一个元素

返回值：
被删除的那个元素
```