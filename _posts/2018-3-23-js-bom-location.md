---
layout: left-none
title:  JavaScript BOM基础 - location对象
date:   2018-3-23 00:00:00 +0800
tag: JS基础入门
---
* content
{:toc}
<hr>

```
location对象

location对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航的功能，它既是window对象的属性，也是document对象的属性
```

```
语法：location.href

功能：返回当前加载页面完整的url

说明：location.href与window.location.href等价

语法：location.hash

功能：返回URL中的hash（#号后跟零或多个字符），如果不包含则返回空字符串

语法：location.host

功能：返回服务器名称和端口号（如果有）

语法：location.hostname

功能：返回不带端口号的服务器名称

语法：location.pathname

功能：返回URL中的目录和（或）文件吗

语法：location.port

功能：返回URL中指定的端口号，如果没有，返回空字符串

语法：location.protocol

功能：返回页面使用的协议

语法：location.search

功能：返回URL的查询字符串，这个字符串以问号开头
```

```
位置操作

改变浏览器位置的方法：
【location.href】属性

location对象其他属性也可以改变URL：
location.hash
location.search

【location.replace()】

语法：location.replace(url)

功能：重新定向URL

说明：使用location.replace不会在历史记录中生成新记录
    location.href和window.location会在浏览器历史生成记录

【location.reload】

语法：location.reload

功能：重新加载当前显示的页面

说明：location.reload()有可能从缓存中加载
      location.reload(true)从服务器重新加载
```

