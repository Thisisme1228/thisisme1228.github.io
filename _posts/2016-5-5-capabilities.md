---
layout: post
title:  http缓存、应用缓存、Service Worker
date:   2016-5-5 00:00:00 +0800
tag: 性能
---
* content
{:toc}
<!-- more -->


1、应用缓存 VS  Service Worker			{#one}
====================================
首先说应用缓存吧，为什么呢，因为它已经废弃了,以下图片来源：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Using_the_application_cache">https://developer.mozilla.org</a>


<img src="{{ '/styles/images/capabilities/app-cache.jpg' | prepend: site.baseurl }}" alt="" class="col-md-12" />

<h4>上面图片提到了Service Workers，那么他到底是什么？</h4>

<blockquote class="margin-top-20">
    <p>
        Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。
    </p>
</blockquote>


<h4>背景</h4>

<blockquote class="margin-top-20">
    <p>
        有一个困扰 web 用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果下载不了它，也是非常糟糕的体验。如今虽然已经有很多种技术去尝试着解决这一问题。而随着离线页面的出现，一些问题已经得到了解决。但是，最重要的问题是，仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。
        <br/>  <br/>
        之前的尝试 — AppCache — 看起来是个不错的方法，因为它可以很容易地指定需要离线缓存的资源。但是，它假定你使用时会遵循诸多规则，如果你不严格遵循这些规则，它会把你的APP搞得一团糟。
        <br/>  <br/>
        Service worker 最终要去解决这些问题。虽然 Service Worker 的语法比 AppCache 更加复杂，但是你可以使用 JavaScript 更加精细地控制 AppCache 的静默行为。有了它，你可以解决目前离线应用的问题，同时也可以做更多的事。 Service Worker 可以使你的应用先访问本地缓存资源，所以在离线状态时，在没有通过网络接收到更多的数据前，仍可以提供基本的功能（一般称之为 Offline First）。这是原生APP 本来就支持的功能，这也是相比于 web app，原生 app 更受青睐的主要原因。
    </p>
</blockquote>
这里不对Service workers 做过多解释，因为它还没有对浏览器进行全面支持，有想要了解的童鞋可以<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API">Go that</a>



2、http缓存			{#two}
====================================

<h4>缓存的作用：</h4>
<blockquote class="margin-top-20">
    <p>
        重用已获取的资源能够有效的提升网站与应用的性能。Web 缓存能够减少延迟与网络阻塞，进而减少显示某个资源所用的时间。借助 HTTP 缓存，Web 站点变得更具有响应性。
    </p>
</blockquote>