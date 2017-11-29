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

### 1、jQuery Mobile页面

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

例：

```html
<div data-role="page" id="pageone">
  <div data-role="content">
    <a href="#pagetwo">转到页面二</a>
  </div>
</div>

<div data-role="page" id="pagetwo">
  <div data-role="content">
    <a href="#pageone">转到页面一</a>
  </div>
</div>
```
**注释：包含大量内容的 web 应用程序会影响加载时间（比如文本、链接、图像和脚本等等）。如果您不希望在内部链接页面，请使用外部文件：**

```html
<a href="externalfile.html">转到外部页面</a>
```

#### 将页面用作对话框

对话框是用来显示信息或请求输入的视窗类型。

如需在用户点击（轻触）链接时创建一个对话框，请向该链接添加 data-rel="dialog"：

```html
<div data-role="page" id="pageone">
  <div data-role="content">
    <a href="#pagetwo" data-rel="dialog">转到页面二</a>
  </div>
</div>

<div data-role="page" id="pagetwo">
  <div data-role="content">
    <a href="#pageone">转到页面一</a>
  </div>
</div>
```

### 2、jQuery Mobile 过渡

过渡效果可应用于任意链接或通过使用 data-transition 属性进行的表单提交：

```html
<a href="#anylink" data-transition="slide">滑动到页面二</a>
```

下面的表格展示了可与 data-transition 属性一同使用的可用过渡：

<img src="{{ '/styles/images/jquery/06.jpg' | prepend: site.baseurl }}" alt="" width="200%" />

`提示：`在 jQuery Mobile 中，淡入淡出效果在所有链接上都是默认的（如果浏览器支持）。

`提示：`以上所有效果同时支持反向动作，例如，如果您希望页面从左向右滑动，而不是从右向左，请使用值为 "reverse" 的 data-direction 属性。在后退按钮上是默认的。

例 

```html
<a href="#pagetwo" data-transition="slide" data-direction="reverse">滑动</a>
```

### 3、jQuery Mobile 按钮

在 jQuery Mobile 中创建按钮

jQuery Mobile 中的按钮可通过三种方法创建：

`使用 <button> 元素`

`使用 <input> 元素`

`使用 data-role="button" 的 <a> 元素`

例

```html
<button>按钮</button>

<input type="button" value="按钮">

<a href="#" data-role="button">按钮</a>
```

`提示：`jQuery Mobile 中的按钮会自动获得样式，这增强了他们在移动设备上的交互性和可用性。我们推荐您使用 `data-role="button" 的 <a> 元素来创建页面之间的链接`，而 `<input> 或 <button> 元素用于表单提交`。

#### 行内按钮

默认情况下，按钮会占据屏幕的全部宽度。如果您需要按钮适应其内容，或者如果您需要两个或多个按钮并排显示，请添加 data-inline="true"：

例

```html
<a href="#pagetwo" data-role="button" data-inline="true">转到页面二</a>
```

#### 组合按钮

jQuery Mobile 提供了对按钮进行组合的简单方法。

请将 data-role="controlgroup" 属性与 data-type="horizontal|vertical" 一同使用，以规定水平或垂直地组合按钮：

```html
<div data-role="content">
    <div data-role="controlgroup" data-type="horizontal">
    <p>水平分组：</p>
    <a href="#" data-role="button">按钮 1</a>
    <a href="#" data-role="button">按钮 2</a>
    <a href="#" data-role="button">按钮 3</a>
    </div><br>
    
    <div data-role="controlgroup" data-type="vertical">
    <p>垂直分组（默认）：</p>
    <a href="#" data-role="button">按钮 1</a>
    <a href="#" data-role="button">按钮 2</a>
    <a href="#" data-role="button">按钮 3</a>
    </div>
  </div>
```
#### 后退按钮

例子

````html
<a href="#" data-role="button" data-rel="back">返回</a>
```

<img src="{{ '/styles/images/jquery/07.jpg' | prepend: site.baseurl }}" alt="" width="200%" />


### 4、jQuery Mobile 按钮图标

为 jQuery Mobile 按钮添加图标

如需向您的按钮添加图标，请使用 data-icon 属性：

```html
<a href="#anylink" data-role="button" data-icon="search">搜索</a>
```

`提示：`您也可以在 <button> 或 <input> 元素中使用 data-icon 属性。

下面我们列出了 jQuery Mobile 提供的一些可用图标：


<img src="{{ '/styles/images/jquery/08.jpg' | prepend: site.baseurl }}" alt="" width="200%" />


#### 定位图标

您也能够规定图标被放置的位置：上、右、下或左。

请使用 data-iconpos 属性来规定位置：

图标位置：

```html
<a href="#link" data-role="button" data-icon="search" data-iconpos="top">上</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="right">右</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="bottom">下</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="left">左</a>
```

`提示：默认地，所有按钮中的图标靠左放置。`

#### 只显示图标

如果只需显示图标，请将 data-iconpos 设置为 "notext"：

例

```html
<a href="#link" data-role="button" data-icon="search" data-iconpos="notext">搜索</a>
```

### 5、jQuery Mobile 工具栏

工具栏元素常被放置于页眉和页脚中 - 以实现“已访问”的导航：

#### 标题栏

页眉通常会包含页眉标题/LOGO 或一到两个按钮（通常是首页、选项或搜索按钮）。

您可以在页眉中向左侧或/以及右侧添加按钮。

下面的代码，将向页眉标题文本的左侧添加一个按钮，并向右侧添加一个按钮：

```html
<div data-role="header">
  <a href="#" data-role="button">首页</a>
  <h1>欢迎来到我的主页</h1>
  <a href="#" data-role="button">搜索</a>
</div>
```

下面的代码将向页眉标题的左侧添加一个按钮：

```html
<div data-role="header">
  <a href="#" data-role="button">首页</a>
  <h1>欢迎来到我的主页</h1>
</div>
```

不过，如果您在 <h1> 元素之后放置按钮链接，那么它不会显示在文本右侧。如需向页眉标题的右侧添加按钮，请规定类名 "ui-btn-right"：


```html
<div data-role="header">
  <h1>欢迎来到我的主页</h1>
  <a href="#" data-role="button" class="ui-btn-right">搜索</a>
</div>
```

`提示：`页眉可包含一个或两个按钮，然而页脚没有限制。

#### 页脚栏

与页眉相比，页脚更具伸缩性 - 它们更实用且多变，所以能够包含所需数量的按钮：


例

```html
<div data-role="footer">
  <a href="#" data-role="button">转播到新浪微博</a>
  <a href="#" data-role="button">转播到腾讯微博</a>
  <a href="#" data-role="button">转播到 QQ 空间</a>
</div>
```

`注释：`页脚与页眉的样式不同（它会减去一些内边距和空白，并且按钮不会居中）。如果要修正该问题，请在页脚设置类名 "ui-btn"：

例

```html
<div data-role="footer" class="ui-btn">
```

您也能够选择在页脚中水平还是垂直地组合按钮：


```html
<div data-role="footer" class="ui-btn">
  <div data-role="controlgroup" data-type="horizontal">
    <a href="#" data-role="button" data-icon="plus">转播到新浪微博</a>
    <a href="#" data-role="button" data-icon="plus">转播到腾讯微博</a>
    <a href="#" data-role="button" data-icon="plus">转播到 QQ 空间</a>
  </div>
</div>
```

#### 定位页眉和页脚

放置页眉和页脚的方式有三种：

Inline - 默认。页眉和页脚与页面内容位于行内。

Fixed - 页面和页脚会留在页面顶部和底部。

Fullscreen - 与 fixed 类似;页面和页脚会留在页面顶部和底部，but also over the page content. It is also slightly see-through

请使用 data-position 属性来定位页眉和页脚：

Inline 定位（默认）

```html
<div data-role="header" data-position="inline"></div>
<div data-role="footer" data-position="inline"></div>
```

Fixed 定位

```html
<div data-role="header" data-position="fixed"></div>
<div data-role="footer" data-position="fixed"></div>
```

如果需要启用全面定位，请使用 data-position="fixed"，并向该元素添加 data-fullscreen 属性：

Fullscreen 定位

```html
<div data-role="header" data-position="fixed" data-fullscreen="true"></div>
<div data-role="footer" data-position="fixed" data-fullscreen="true"></div>
```

`提示：`fullscreen 对于照片、图像和视频非常理想。

`提示：`对于 fixed 和 fullscreen 定位，触摸屏幕将隐藏和显示页眉及页脚。

### 6、jQuery Mobile 导航栏

导航栏由一组水平排列的链接构成，通常位于页眉或页脚内部。

默认地，导航栏中的链接会自动转换为按钮（无需 data-role="button"）。

请使用 data-role="navbar" 属性来定义导航栏：

例

```html
<div data-role="header">
  <div data-role="navbar">
    <ul>
      <li><a href="#anylink">首页</a></li>
      <li><a href="#anylink">页面二</a></li>
      <li><a href="#anylink">搜索</a></li>
    </ul>
  </div>
</div>
```

#### 活动按钮

当导航栏中的链接被敲击时，会获得选取外观（按下）。

如需在不敲击链接时实现此外观，请使用 class="ui-btn-active"：

例

```html
<li><a href="#anylink" class="ui-btn-active">首页</a></li>
```

对于多个页面，您也许需要为每个按钮设置“被选”外观，以表示用户正在浏览该页面。如果要这么做，请向链接添加 "ui-state-persist" 类，以及 "ui-btn-active" 类：

```html
<li><a href="#anylink" class="ui-btn-active ui-state-persist">首页</a></li>
```

### 7、jQuery Mobile 可折叠

#### 可折叠的内容块

可折叠（Collapsibles）允许您隐藏或显示内容 - 对于存储部分信息很有用。

如需创建可折叠的内容块，请向某个容器分配 data-role="collapsible" 属性。在容器（div）中，添加一个标题元素（h1-h6），其后是您需要扩展的任意 HTML 标记：

例

```html
<div data-role="collapsible">
  <h1>点击我 - 我可以折叠！</h1>
  <p>我是可折叠的内容。</p>
</div>
```

默认地，该内容是关闭的。如需在页面加载时扩展内容，请使用 data-collapsed="false"：


例

```html
<div data-role="collapsible" data-collapsed="false">
  <h1>点击我 - 我可以折叠！</h1>
  <p>现在我默认是展开的。</p>
</div>
```

#### 嵌套的可折叠块

可以嵌套可折叠内容块：

例

```html
<div data-role="collapsible">
  <h1>点击我 - 我可以折叠！</h1>
  <p>我是被展开的内容。</p>
  <div data-role="collapsible">
    <h1>点击我 - 我是嵌套的可折叠块！</h1>
    <p>我是嵌套的可折叠块中被展开的内容。</p>
  </div>
</div>
```

`提示：`可折叠内容块可以被嵌套您希望的任意次数。

#### 可折叠集合

可折叠集合（Collapsible sets）指的是被组合在一起的可折叠块（常被称为手风琴）。当新块被打开时，所有其他块会关闭。

创建若干内容块，然后通过 data-role="collapsible-set" 用新容器包装这个可折叠块：

例

```html
<div data-role="collapsible-set">
  <div data-role="collapsible">
    <h1>点击我 - 我可以折叠！</h1>
    <p>我是被展开的内容。</p>
  </div>
  <div data-role="collapsible">
    <h1>点击我 - 我可以折叠！</h1>
    <p>我是被展开的内容。</p>
  </div>
</div>
```

<img src="{{ '/styles/images/jquery/09.jpg' | prepend: site.baseurl }}" alt="" width="200%" />

### 8、jQuery Mobile 网格

#### jQuery Mobile 布局网格

jQuery Mobile 提供了一套基于 CSS 的列布局方案。不过，一般不推荐在移动设备上使用列布局，这是由于移动设备的屏幕宽度所限。

但是有时您需要定位更小的元素，比如按钮或导航栏，就像在表格中那样并排。这时，列布局就恰如其分。

网格中的列是等宽的（总宽是 100%），无边框、背景、外边距或内边距。

可使用的布局网格有四种：

<img src="{{ '/styles/images/jquery/10.jpg' | prepend: site.baseurl }}" alt="" width="200%" />

`提示：`在列容器中，根据不同的列数，子元素可设置类 ui-block-a|b|c|d|e。这些列将依次并排浮动。

实例 1: 对于 ui-grid-a 类（两列布局），您必须规定两个子元素 ui-block-a 和 ui-block-b。

实例 2: 对于 ui-grid-b 类（三列布局），请添加三个子元素 ui-block-a、ui-block-b 和 ui-block-c。

#### 定制网格

您可以通过使用 CSS 来定制列块：

例

```html
<style>
.ui-block-a, 
.ui-block-b, 
.ui-block-c 
{
background-color: lightgray;
border: 1px solid black;
height: 100px;
font-weight: bold;
text-align: center;
padding: 30px;
}
</style>
```


您也可以通过使用行内样式来定制块：


```html
<div class="ui-block-a" style="border: 1px solid black;"><span>Text..</span></div>
```

#### 多行

在列中包含多个行也是可能的。

`注释：`ui-block-a-class 将始终创建新行：

例

```html
<div class="ui-grid-b">
  <div class="ui-block-a"><span>Some Text</span></div>
  <div class="ui-block-b"><span>Some Text</span></div>
  <div class="ui-block-c"><span>Some Text</span></div>
  <div class="ui-block-a"><span>Some Text</span></div>
  <div class="ui-block-b"><span>Some Text</span></div>
  <div class="ui-block-a"><span>Some Text</span></div>
</div>
```

### 9、jQuery Mobile 列表视图

jQuery Mobile 中的列表视图是标准的 HTML 列表：有序列表 (<ol>) 和无序列表 (<ul>)。

如需创建列表，请向 <ol> 或 <ul> 元素添加 data-role="listview"。如需使这些项目可点击，请在每个列表项（<li>）中规定链接：

例

```html
<ol data-role="listview">
  <li><a href="#">列表项</a></li>
</ol>

<ul data-role="listview">
  <li><a href="#">列表项</a></li>
</ul>
```

如需为列表添加圆角和外边距，请使用 data-inset="true" 属性：

例

```html
<ul data-role="listview" data-inset="true">
```

`提示：`默认地，列表中的列表项会自动转换为按钮（无需 data-role="button"）。

#### 列表分隔符

列表分隔符（List Dividers）用于把项目组织和组合为分类/节。

如需规定列表分隔符，请向 <li> 元素添加 data-role="list-divider" 属性：

例

```html
<ul data-role="listview">
 <li data-role="list-divider">欧洲</li>
  <li><a href="#">法国</a></li>
  <li><a href="#">德国</a></li>
</ul>
```

如果您的列表是字母顺序的（比如通讯录），jQuery Mobile 自动添加恰当的分隔符，通过在 <ol> 或 <ul> 元素上设置 data-autodividers="true" 属性：

例

```html
<ul data-role="listview" data-autodividers="true">
  <li><a href="#">Adam</a></li>
  <li><a href="#">Angela</a></li>
  <li><a href="#">Bill</a></li>
  <li><a href="#">Calvin</a></li>
  ...
</ul>
```

提示：data-autodividers="true" 属性通过对列表项文本的首字母进行大写来创建分隔符。


#### 搜索过滤器

如需在列表中添加搜索框，请使用 data-filter="true" 属性：

例

```html
<ul data-role="listview" data-filter="true"></ul>
```

默认地，搜索框中的文本是 "Filter items..."。

如需修改默认文本，请使用 data-filter-placeholder 属性：

例

```html
<ul data-role="listview" data-filter="true" data-filter-placeholder="搜索姓名">
```

### 10、jQuery Mobile 列表内容

#### jQuery Mobile 列表缩略图

对于大于 16x16px 的图像，请在链接中添加 <img> 元素。

jQuery Mobile 将自动把图像调整至 80x80px：

例

```html
<ul data-role="listview">
  <li><a href="#"><img src="chrome.png"></a></li>
</ul>
```

请使用标准 HTML 来填充带有信息的列表：


例

```html
<ul data-role="listview">
  <li>
    <a href="#">
    <img src="chrome.png">
    <h2>Google Chrome</h2>
    <p>Google Chrome 免费的开源 web 浏览器。发布于 2008 年。</p>
    </a>
  </li>
</ul>
```

#### jQuery Mobile 列表图标


如需向您的列表添加 16x16px 的图标，请向 <img> 元素添加 class="ui-li-icon" 属性：


例

```html
<li><a href="#"><img src="us.png" alt="USA" class="ui-li-icon">USA</a></li>
```

#### 拆分按钮

如需创建带有垂直分隔栏的拆分列表，请在 <li> 元素内放置两个链接。

jQuery Mobile 会自动为第二个链接添加蓝色箭头图标的样式，链接中的文本（如有）将在用户划过该图标时显示：

例

```html
<ul data-role="listview">
  <li>
    <a href="#"><img src="chrome.png"></a>
    <a href="#">Some Text</a>
  </li>
</ul>
```

通过添加页面和对话框，可使链接的功能更强：


例

```html
<ul data-role="listview">
  <li>
    <a href="#"><img src="chrome.png"></a>
    <a href="#download" data-rel="dialog">下载浏览器</a>
  </li>
</ul>
```

#### 计数泡沫

计数泡沫用于显示与列表项相关的数目，例如邮箱中的消息：

如需添加计数泡沫，请使用行内元素，比如 <span>，设置 class "ui-li-count" 属性并添加数字：

例

```html
<ul data-role="listview">
  <li><a href="#">Inbox<span class="ui-li-count">335</span></a></li>
  <li><a href="#">Sent<span class="ui-li-count">123</span></a></li>
  <li><a href="#">Trash<span class="ui-li-count">7</span></a></li>
</ul>
```

`注释`：如需在计数泡泡中显示正确的数字，就必须进行程序化更新。

### 11、jQuery Mobile 表单

当您与 jQuery Mobile 表单打交道时，应该了解以下信息：






