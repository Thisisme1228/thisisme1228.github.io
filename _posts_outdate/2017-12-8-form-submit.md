---
layout: left-none
title:  表单提交button、submit的区别
date:   2017-12-8 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
<!-- more -->

```
1.建议使用button[type=submit]来提交表单，而不是input;

2.只有单行文本控件时没有多行文本控件时，回车会引发表单提交;

3.通过onsubmit事件可阻止表单提交。
```

### input[type=submit]

<img src="{{ '/styles/images/javascript/05.png' | prepend: site.baseurl }}" alt="" width="100%" />

图中可以看到点击提交按钮后的URL是`?userName=test&password=1&phoneNumber=135`。代码如下：

```html
<form action="" id="registerForm" method="get">
    请输入用户名：<input  name="userName">
    请输入密码：<input type="password" name="password">
    请输入手机号码：<input type="text" name="phoneNumber">
    <input type="submit" value="ok">
</form>
```

其中有些值得注意的细节：

```
1、设置type=submit后，输入控件会变成一个按钮，显示的文字为其value值，默认值是“提交”。

2、form[method]默认值为GET，所以提交后会使用GET方式进行页面跳转。

3、input[type]默认值为text，所以第一个input显示为文本框。
```

input其实是一个由输入控件改装过来的按钮，这源于Web早期的简陋设计。我们给它设置name便可以验证这一点：

```html
<input type="submit" value="ok" name="btn">
```

提交后的结果为：

<img src="{{ '/styles/images/javascript/06.jpg' | prepend: site.baseurl }}" alt="" width="100%" />

注意其中的URL为`?userName=test&password=1&phoneNumber=135&btn=ok`。作为按钮的input控件同时被当做一个表单输入提交给了服务器。它到底是交互控件还是数据空间呢？定位有些不清晰。再加上它的样式难以定制、不可作其它标签的容器，所以建议不要用input作为表单提交按钮。

> input的type属性还可以是button，这时它只是一个按钮，不会引发表单提交。

### button[type=submit]

button的语义很明确，就是一个按钮不含数据，作用就是用户交互。但它也有type和value属性。 type的默认值是submit，所以点击一个button会引起表单提交：

```html
<form>
    请输入用户名：<input  name="userName">
    请输入密码：<input type="password" name="password">
    请输入手机号码：<input type="text" name="phoneNumber">
    <button>确定</button>
</form>
```

> 注意！如果你在做IE10以下浏览器的兼容，请记住button[type]在IE中的默认值是button，这意味着它只是一个按钮而不会引发表单提交。

```
button元素比<input>元素更易样式化。你可以添加内联HTML内容（如<em>，<strong> 甚至<img>），并使用:after和:before伪元素实现复杂的渲染，而<input>只有文本值属性。

IE7有一个bug，当使用<button type="submit" name="myButton" value="foo">Click me</button>提交表单时，POST数据发送为myButton=Click me而不是myButton=foo。
IE6有一个更糟糕的bug，当使用一个button提交表单时，所有button会出现IE7中的bug。
这个bug在IE8中已修复。
```

> 建议用button作为交互用的按钮，来提交表单。同时请注意设置type=submit来兼容IE。

### Enter 键提交表单

Enter键是可以提交表单的！但是你可能已经注意到了，并非所有的表单都可以用Enter键来提交。

> 当表单中只有一个单行的文本输入控件时，用户代理应当接受回车键来提交表单。

“单行”指的是type为text而非textarea，显然在textarea中回车提交表单是怎样的难以接受！ 其实在实践中，有多个单行的input也可以用Enter提交，比如登录页面（太典型了，不仅是这样开发的，而且是这样使用的）。 要知道HTML2.0标准制定于1995，可以说这一句不起眼的条文影响着我的每次网站登录。W3C的这批人是有怎样的远见和智慧！

### 阻止表单提交
    
阻止表单提交也是一个常见的话题，通常用于客户端的表单验证。通用的办法是设置onsubmit:

```html
<form onsubmit="return false;">
  <input name='key'>
  <input value='ok' type='submit'>
</form>
```

只需要在onsubmit的一系列语句最后返回false，便可以阻止它提交。 如果你希望调用一个方法来决定是否阻止提交，记得在此处返回方法的返回值：

```html
<form onsubmit="return doValidation();">
  <input name='key'>
  <input value='ok' type='submit'>
</form>
```

> 上述代码只是为了示例，你可能更希望通过jQuery来绑定事件处理函数。


**本文参考:**

> [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)

> [http://harttle.land/2015/08/03/form-submit.html](http://harttle.land/2015/08/03/form-submit.html)



