---
layout: post
title: CORDOVA 介绍
date:   2017-11-16 00:00:00 +0800
tag: CORDOVA
---
* content
{:toc}
公司做手机APP项目使用到CORDOVA，之前没了解过，今天看了文档之后进行整理以便日后之需
<!-- more -->

### 一、介绍

#### 概述

Apache Cordova是一个开源的移动开发框架。允许你用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发。 应用在每个平台的具体执行被封装了起来，并依靠符合标准的API绑定去访问每个设备的功能，比如说：传感器、数据、网络状态等。

使用Apache Cordova的人群:

+ 移动应用开发者，想扩展一个应用的使用平台，而不通过每个平台的语言和工具集重新实现。

+ web开发者，想包装部署自己的web App将其分发到各个应用商店门户。

+ 移动应用开发者，有兴趣混合原生应用组建和一个WebView(一个特别的浏览器窗口) 可以接触设备A级PI，或者你想开发一个原生和WebView组件之间的插件接口。

#### 架构

这是cordova应用程序的几个组成部分。下面这幅图是cordova应用架构的高级视图。

<img src="{{ '/styles/images/cordova/01.jpg' | prepend: site.baseurl }}" alt="" width="100%" />

WebView

Cordova启用的WebView可以给应用提供完整用户访问界面。在一些平台中，他也可以作为一个组件给大的、混合应用，这些应用混合和Webview和原生的应用组件。

Web App

这是你应用程序代码存在的地方。应用的实现是通过web页面，默认的本地文件名称是是index.html，这个本地文件应用CSS,JavaScript,图片，媒体文件和其他运行需要的资源。应用执行在原生应用包装的WebView中，这个原生应用是你分发到app stores中的。

这个容器中包含一个非常重要文件- [config.xml](http://cordova.axuer.com/docs/zh-cn/6.x/config_ref/index.html) 文件他提供App的重要的信息和特定的参数用来影响App的工作，比如说是否响应方向的变动。

#### 插件

插件是Cordova生态系统的重要组成部分。他提供了Cordova和原生组件相互通信的接口并绑定到了标准的设备API上。这使你能够通过JavaScript调用原生代码.

Apache Cordova项目维护着一组插件叫做[核心插件](http://cordova.axuer.com/docs/zh-cn/6.x/guide/support/index.html#core-plugin-apis)。这些核心插件可以让你的应用程序访问设备功能，比如：电源，相机，联系人等。

除了核心插件，这里还有一些第三方插件他们提供了一些附加功能，但这些功能不一定在每个平台都能用。你可以搜索Cordova插件使用[插件搜索](http://cordova.axuer.com/plugins/)或者[npm](https://www.npmjs.com/search?q=ecosystem%3Acordova)。你也可以开发自己的插件，像 [插件开发指南](http://cordova.axuer.com/docs/zh-cn/6.x/guide/hybrid/plugins/index.html)描述的那样。插件是必要的，例如Cordova和自定义原生组件之间通信。

`注意`:当你创建一个Cordova项目它不存在任何插件。这是新的默认行为。任何你需要的组件，哪怕是核心组件，你也必须明确添加。

Cordova不提供任何UI部件和MV框架。Cordova只提供运行环境。如果你想使用UI部件或者MV框架，你需要选择他们并包含在你的应用程序中。

#### 开发工作流

Cordova提供两个基本的工作流用来创建移动App。虽然你经常使用两种不同工作流完成同样的任务，但是他们之间是有各自优势的：

(1)跨平台(CLI)的工作流:如果你想你的App运行在尽可能多的移动操作系统，那么就使用这个工作流，你只需要很少的特定平台开发。 这个工作流围绕这'cordova'CLI(命令行)。CLI是一个高级别的工具，他允许一次构建多个平台的项目，抽象了很多功能性的低级别shell脚本。CLI把公用的web资源复制到每个移动平台的子目录，根据每个平台做必要的配置变化，运行构建脚本生成2进制文件。CLI统一也提供通用接口，将插件应用在app中。如果要入门可以按照 [创建你的第一个App](http://cordova.axuer.com/docs/zh-cn/6.x/guide/cli/index.html)指南中的步骤来 。除非你有一个以平台为中心的工作流，否则建议你使用跨平台工作流。

(2)平台为中心的工作流:如果你专注于构建单独平台的App或者需要需要在底层修改它那么就使用这个工作流吧。你需要使用这种方法，如果你需要你的App混合原生组件和基于Web的Cordova组件, 正如 [嵌入WebView](http://cordova.axuer.com/docs/zh-cn/6.x/guide/hybrid/webviews/index.html)讨论的。作为一个经验法则，如果你需要修改SDK中的项目那么使用这个工作流。 这个工作流依靠一组低级别的shell脚本，他们是给每个支持平台量身定做的，还有一个单独的Plugman工具允许你添加插件。 虽然你可以使用这个工作流构建跨平台应用，但通常这是非常困难的，因为缺乏高基本的工具，意思就是是单独的构建生命周期并且插件修改需要对每一个平台进行。

当你第一次开始，跨平台工作流创建App可能是最容易的，像[创建你的第一个App](http://cordova.axuer.com/docs/zh-cn/6.x/guide/cli/index.html)中描述的那样。然后，你可以切换到以平台为中心的工作流，如果你需要更好的控制SDK提供的功能。

> 注意: 一但你从以CLI为中心的工作流切换到一个围绕特定平台SDK和shell工具的工作流中，你就不可能返回了。 CLI维护着一套通用的跨平台源代码，每个特定平台构建都需要使用他而不是特定平台的源码。为了保护你对特定平台资产的修改，你需要切换到以平台为中心的脚本工具，他忽略跨平台的源码，转而依靠特定平台的源码。

#### 安装Cordova

安装Cordova会因你依靠的工作流不同而不同:

+ 跨平台工作流: 查看 [创建你的第一个App](http://cordova.axuer.com/docs/zh-cn/6.x/guide/cli/index.html) 指南.

+ 以平台为中的工作流

在安装完Cordova之后,建议你查看`平台开发`部分来进行移动平台开发。 同时建议你查看[隐私指南](http://cordova.axuer.com/docs/zh-cn/6.x/guide/appdev/privacy/index.html) 和 [安全指南](http://cordova.axuer.com/docs/zh-cn/6.x/guide/appdev/security/index.html).

### 二、创建APP

#### 创建你的第一个App

这个指南像你展示如何创建JS/HTMLCordova应用并发布他们到不同的原生移动平台通过使用cordova命令行接口(CLI)。Cordova命令行详细参考查看[CLI参考]。

#### 安装Cordova CLI

Cordova命令行工具作为npm包分发。

安装cordova命令行工具，通过下面这些步骤:

1、下载和安装Node.js。安装完成后你可以在命令行中使用node 和 npm 。

2、(可选)下载和安装[git client](https://git-scm.com/downloads), 如果你没有。安装成功后，你可以在命令行中使用git。 这个命令行使用下载git仓库中的资源。

3、安装cordova 模块使用Nodejs的npm工具。cordova模块会被npm工具自动下载。

+ 在OS X和Linux上:

```html
   $ sudo npm install -g cordova
```
在OS X和Linux上, npm命令加上前缀sudo因为cordova可能需要安装在其他的受限制目录比如 /usr/local/share。如果你使用可选工具nvm/nave或者具有安装目录的写权限，那么你可以省略sudo前缀。这里有[更多提示](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) 可用在使用 npm 没有 sudo前缀时，如果你想那么做。

+ 在Windows上:

```html
   C:\>npm install -g cordova
```

-g标志是告诉 npm 我们全局安装 cordova。否则我们将会安装在当前工作目录的 node_modules子目录。

安装完成后，你应该能够在命令行中运行cordova命令，在没有任何参数的时候会打印一些帮助信息。

#### 创建App

跳转到你维护源代码的目录中，并创建你的cordova项目：

```html
$ cordova create hello com.example.hello HelloWorld
```

这将会为你的cordova应用创造必须的目录。默认情况下，cordova create命令生成基于web的应用程序的骨骼，项目的主页是 www/index.html 文件。

`参看`

+ [Cordova create 命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-create-command)

+ [Cordova项目目录结构](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#directory-structure)

#### 添加平台

所有后续命令都需要在项目目录或者项目目录的任何子目录运行:

```html
$ cd hello
```

给你的App添加目标平台。我们将会添加'ios'和'android'平台，并确保他们保存在了config.xml中:

```html
$ cordova platform add ios --save
$ cordova platform add android --save
```

检查你当前平台设置状况:

```html
$ cordova platform ls
```

运行add或者remove平台的命令将会影响项目 platforms的内容，在这个目录中每个指定平台都有一个子目录。

> 注意:在你使用CLI创建应用的时候， 不要 修改/platforms/目录中的任何文件。当准备构建应用或者重新安装插件时这个目录通常会被重写。

`参见`

[Cordova平台命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-platform-command)

#### 安装构建先决条件

要构建和运行App，你需要安装每个你需要平台的SDK。另外，当你使用浏览器开发你可以添加 browser平台，它不需要任何平台SDK。

检测你是否满足构建平台的要求:

```html
$ cordova requirements
Requirements check results for android:
Java JDK: installed .
Android SDK: installed
Android target: installed android-19,android-21,android-22,android-23,Google Inc.:Google APIs:19,Google Inc.:Google APIs (x86 System Image):19,Google Inc.:Google APIs:23
Gradle: installed

Requirements check results for ios:
Apple OS X: not installed
Cordova tooling for iOS requires Apple OS X
Error: Some of requirements check failed
```

`参见`

+ [Android平台的要求](http://cordova.axuer.com/docs/zh-cn/6.x/guide/platforms/android/index.html#requirements-and-support)
+ [iOS平台的要求](http://cordova.axuer.com/docs/zh-cn/6.x/guide/platforms/ios/index.html#requirements-and-support)
+ [Windows平台的要求](http://cordova.axuer.com/docs/zh-cn/6.x/guide/platforms/win8/index.html#requirements-and-support)

#### 构建App

默认情况下, `cordova create`生产基于web应用程序的骨架，项目开始页面位于`www/index.html` 文件。任何初始化任务应该在`www/js/index.js`文件中的[deviceready](http://cordova.axuer.com/docs/zh-cn/6.x/cordova/events/events.html#deviceready)事件的事件处理函数中。

运行下面命令为所有添加的平台构建:

```html
$ cordova build
```

你可以在每次构建中选择限制平台范围 - 这个例子中是'ios':

```html
你可以在每次构建中选择限制平台范围 - 这个例子中是'ios':
```

`参见`

[Cordova build 命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-build-command)

#### 测试App

移动平台的SDK通常会绑定模拟器，它是一个可执行的设备镜像，这样你就可以在主屏幕启动你的App，看看它在多个平台是如何交互的。 在命令行运行下面的命令，会重新构建App并可以在特定平台的模拟器上查看:

```html
$ cordova emulate android
```

或者，你可以将你的手机插入电脑，在手机上直接测试App:

```html
$ cordova run android
```

在运行命令之前，你需要设置用于测试的设备，以下是每个平台的流程。

`参见`

[设置Android模拟器](http://cordova.axuer.com/docs/zh-cn/6.x/guide/platforms/android/index.html#setting-up-an-emulator)

[Cordova run 命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-run-command)

[Cordova emulate 命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-emulate-command)


#### 添加插件

你可以修改默认生成的App通过标准的web技术，但是App要接触设备级别的特性，就需要你添加插件了。

一个插件 通过JavascriptAPI暴露原生SDK功能。插件通常由npm分发，你可以搜索他们在 [插件搜索页](http://cordova.axuer.com/plugins/)。一些关键的API由Apache Cordova开源项目提供并且这些插件是作为[核心插件API]的。你也可以使用CLI启动搜索页:

```html
$ cordova plugin search camera
```

plugin要添加camera插件，我们需要指定camera的npm包名:

```html
$ cordova plugin add cordova-plugin-camera
Fetching plugin "cordova-plugin-camera@~2.1.0" via npm
Installing "cordova-plugin-camera" for android
Installing "cordova-plugin-camera" for ios
```

插件也可以通过目录或者git仓库添加。

> 注意:CLI增加了适合各个平台的插件代码。如果你想伴随着低级别壳工具和平台SDK开发你可以看[概述](http://cordova.axuer.com/docs/zh-cn/6.x/guide/overview/index.html)中讨论的, 你需要运行Plugman工具去给每个平台单独添加。 (要知道更多信息, 请看 [使用Plugman管理插件](http://cordova.axuer.com/docs/zh-cn/6.x/plugin_ref/plugman.html).)

使用 plugin ls (或者 plugin list, 或者 plugin自己)查看当前安装的插件。每个插件现实它的标识:

```js
$ cordova plugin ls
cordova-plugin-camera 2.1.0 "Camera"
cordova-plugin-whitelist 1.2.1 "Whitelist"
```

`参见`

[Cordova plugin 命令参考文档](http://cordova.axuer.com/docs/zh-cn/6.x/reference/cordova-cli/index.html#cordova-plugin-command)

[Cordova plugin 搜索页](http://cordova.axuer.com/plugins/)

[核心插件API]

#### 使用 merges自定义每个平台

虽然Cordova允许你轻松的部署App在各个平台，但是有时我们需要在某些平台做一些自定义。在这种情况下， 你不要想去修改顶级platforms目录下的www目录，因为，通常会被顶级 www目录的跨平台源码替换。

取而代之，顶级merges目录提供了特定平台部署特定资源的地方。每个特定平台在merges中的子目录反映了www 源代码树中的结构， 允许你重写和添加文件。例如，这是如何使用merges来提供Android设备中的默认字体大小。:

(1)编辑www/index.html文件,添加link标签来添加额外的css文件, overrides.css在这种情况下:
1
```html
<link rel="stylesheet" type="text/css" href="css/overrides.css" />
```
(2)（可选）创建一个空的www/css/overrides.css文件，适合所有非Android构建，来防止文件找不到的错误。
   
(3)在merges/android里面创建一个css子目录,然后添加对应的overrides.css文件。特定的CSS重写www/css/index.css文件中的12px的默认大小，例子:
      
```html
body { font-size:14px; }
```
当你重写构建项目，Android具有自定义的字体大小，而其他平台的不变。

你也可以在merges目录中添加www目录中不存在的文件。例如，一个应用程序在iOS界面中要包含一个 后退按钮,存储在 merges/ios/img/back_button.png,而Android版本则可以捕获[后退按钮](http://cordova.axuer.com/docs/zh-cn/6.x/cordova/events/events.html#backbutton)事件通过对应的硬件按钮。

#### 更新Cordova和你的项目

在安装cordova工具之后，你可以运行下面命令更新到最新版本:

```html
在安装cordova工具之后，你可以运行下面命令更新到最新版本:
```

用下面语法安装指定版本:

```html
$ sudo npm install -g cordova@3.1.0-0.2.0
```

运行cordova -v查看当前版本。要查找最新的cordova版本，可以运行:

```html
$ npm info cordova version
```

更新完cordova后，更新目标项目的平台:

```html
$ cordova platform update android --save
$ cordova platform update ios --save
...etc.
```


#### 平台支持

[平台支持](http://cordova.axuer.com/docs/zh-cn/6.x/guide/support/index.html)








