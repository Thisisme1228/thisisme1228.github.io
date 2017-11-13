---
layout: post
title: jQuery Mobile
date:   2017-11-13 00:00:00 +0800
tag: jQuery
---
* content
{:toc}
jQuery还算熟练，时间关系一直没来得及看jQuery mobile，它是一个基于jQuery的创建移动 web 应用程序的框架。在这里我只整理一些个人觉得必要且难点的方面，所谓师傅领进门修行在个人，其他可参见[w3school](http://www.w3school.com.cn/jquerymobile/index.asp)
<!-- more -->

### jQuery Mobile页面

+ data-role="page" 是显示在浏览器中的页面
+ data-role="header" 创建页面上方的工具栏（常用于标题和搜索按钮）
+ data-role="content" 定义页面的内容，比如文本、图像、表单和按钮，等等
+ data-role="footer" 创建页面底部的工具栏

例：

```html
<body>
<div data-role="page">

  <div data-role="header">
    <h1>欢迎访问我的主页</h1>
  </div>

  <div data-role="content">
    <p>我是一名移动开发者！</p>
  </div>

  <div data-role="footer">
    <h1>页脚文本</h1>
  </div>

</div>
</body>
```


#### 在 jQuery Mobile 中添加页面

在 jQuery Mobile，您可以在单一 HTML 文件中创建多个页面。

请通过唯一的 id 来分隔每张页面，并使用 href 属性来连接彼此：



