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

```
join()

语法：
arrayObject.join(separator)

功能：
用于把数组中的所有元素放入一个字符串

返回值：
字符串

说明：
当()中省略参数，默认是使用逗号隔开的，当有参数的情况下是使用参数进行链接
```

```
reverse()

语法：
stringObject.reverse()

功能：
用于颠倒数组中元素的顺序

返回值：
数组
```

```
sort()

语法：
arrayObject.sort(sortby)

功能：
用于对数组的元素进行排序

返回值：
数组

说明：
1、即使数组中的每一项都是数值，sort()方法比较的也是字符串
2、sort()方法可以接收一个比较函数作为参数
```

```
concat()

语法：
arrayObject.concat(arrayX,arrayX,...,arrayX)

功能：
用于连接两个或多个数组

返回值：
数组
```

```
slice()

语法：
arrayObject.slice(start,end)

功能：
从已有的数组中返回选定的元素

参数：
start（必须）规定从何处开始选取，如是负数，从数组尾部开始算起
end(可选)规定从何处结束选取，是数组片段结束处的数组下标

说明：
1、如没指定end,切分的数组包含从start到数组结束的所有元素
2、如slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置
返回值：数组
```

```
splice()

1、可以删除数组项
2、可以插入数组项
3、可以替换数组项

删除：

语法：
arrayObject.splice(index,count)

功能：
删除从index处开始的零个或多个元素

返回值：
含有被删除的元素的数组

说明：
count是要删除的项目的数量，如果设置为0，则不会删除项目，如果不设置，则删除从index开始的所有值

插入：

语法：
arrayObject.splice(index,0,item1,...,itemX)

功能：
在指定位置插入值

参数：
Index：起始位置
0：要删除的项数
item...itemX：要插入的项

返回值：空数组

替换：

语法：
arrayObject.splice(index,count,item1,...,itemX)

功能：
在指定位置插入值，且同时删除任意数量的项

参数：
Index：起始位置
count：要删除的项目
item...itemX：要插入的项
返回值：从原始数组中删除的项（如果没有删除任何项，则返回空数组）
```

```
掌握ECMAScript为数组实例添加的两个位置方法：
indexOf()
lastIndexOf()

说明：
1、在比较第一个参数与数组中的每一项时，会使用全等操作符，即要求查找的项必须严格相等
2、数组的位置方法是ECMAScript5为数组实例新增的，所以支持的浏览器只有：
IE9+ Firefox2+ Safari3 Opera9.5 Chorome
```

```
indexOf()

语法：
arrayObject.indexOf(searchvalue,startIndex)

功能：
从数组的开头（位置0）开始向后查找

参数：
searchvalue：必须，要查找的项
startIndex：可选，起点位置的索引

返回值：
number，查找的项在数组中的位置，没有找到的情况下返回-1
```

```
lastIndexOf()

语法：
arrayObject.lastIndexOf(searchvalue,startIndex)

功能：
从数组的末尾开始向前查找

参数：
searchvalue：必须，要查找的项
startIndex：可选，起点位置的索引

返回值：
number，查找的项在数组中的位置，没有找到的情况下返回-1
```


