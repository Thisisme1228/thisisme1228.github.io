---
layout: left-none
title:  JavaScriptDOM属性
date:   2018-5-5 00:00:00 +0800
tag: 进击JavaScript核心
---
* content
{:toc}
<hr>

### 学习目标

```
1、掌握什么是事件
2、掌握事件流
3、掌握DOM事件流与IE事件处理程序
4、掌握跨浏览器的时间处理程序
5、掌握event对象的常用属性及方法
6、掌握常用的事件类型
```

#### 什么是事件

```
事件是可以被JavaScript侦测到的行为，通俗的讲就是当用户与web页面进行某些交互时，解释器就会创建响应的event对象以描述事件信息。
```

事件句柄

```
事件句柄（又称事件处理函数、事件监听函数），指用于响应某个事件而调用的函数。每一个事件均对应一个事件句柄，在程序执行时，将相应的函数或语句指定给事件句柄，则在该事件发生时，浏览器便执行指定的函数或语句。
```

#### 事件流--事件定义

```
为特定事件定义监听函数有三种方式

（1）直接在HTML中定义元素的事件相关属性
缺点：违反了“内容与行为相分离”的原则。强耦合，不利于复用代码。应尽可能少用

（2）DOM0级事件：在JavaScript中为元素的事件相关属性赋值。松耦合，html和js代码分离    兼容所有浏览器
document.getElementById('btn').onclick = function(){
    document.body.onload = init;
}
function init(){//...}
缺点：此语法实现了“内容与行为相分离”但元素仍只能绑定一个监听函数。

（3）DOM2级事件：高级事件处理方式，一个事件可以绑定多个监听函数。优点：松耦合，绑定多个事件，事件捕获和事件冒泡   不兼容IE8以及以下浏览器
btn.addEventListener("click",function(){},false);  //DOM
btn.attachEvent("onclick",function(){}); //IE
document.body.addEventListener("load",init);
document.body.attachEvent("onload",init);
function init(){//...}
此语法可以为一个元素绑定多个监听函数，但需要注意浏览器兼容性问题
```

```
DOM0级与DOM2级区别：
1、DOM2支持同一dom元素注册多个同种事件。
2、DOM2新增了捕获和冒泡的概念。
```

#### 事件对象、事件对象绑定一个事件类型、事件句柄

```
<button onclick='btn()'></button>

1、事件对象：button
2、事件对象绑定一个事件类型：onclick
3、事件句柄：btn()
```

#### 事件流--移除事件

```
removeEventListener()

语法：element.removeEventListener(event,function,useCapture);
功能：移除addEventlistener()方法添加的事件句柄。
参数：
event：必须。指定要移除的事件名称。
function：必须。指定要移除的函数。
useCapture：可选。布尔值，指定移除事件句柄的阶段。

事件解绑成功的原因就是保持addEventListener和removeEventListener三个参数一样，其中事件句柄不能是匿名函数，需要有名称的函数。
```

#### IE事件流（IE事件处理程序）

```
添加事件：
attachEvent() //IE8以及IE8以下的浏览器

语法：element.attachEvent(event,function)
功能：用于向指定元素添加事件句柄

参数：
event：必须。字符串，指定事件名，必须加“on”前缀
function：必须。指定要事件触发时执行的函数

没有第三个参数，因为IE不支持事件捕获，只支持事件冒泡。
```

#### IE事件流（IE事件处理程序）

```
移除事件：
detachEvent()
语法：element.detachEvent(event,function)
功能：移除attachEvent()方法添加的事件句柄。

参数：
event：必须。字符串，要移除的事件名称
function：必须。指定要移除的函数
```

#### 跨浏览器事件处理程序

```
就是写一套DOM2级事件即兼容IE8又兼容其它所有浏览器的代码，使用addEventListener  removeEventListener  attachEvent  detachEvent

var EventUtil = {
    addHandler:function(element,type,handler){
        //绑定事件
        //chrome、firefox、IE9等 addEventlistener
        //IE8及IE8以下的浏览器 attachEvent
        if(element.addEventlistener){
            element.addEventlistener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type] = null
        }
    },
    removeHandler:function(element,type,handler){
        //移除事件
        //chrome、firefox、IE9等  removeEventListener
        //IE8以及IE8以下浏览器 detachEvent
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type] = null;
        }
    }
}
```

#### 事件冒泡与事件捕获

```
事件周期

解释器创建一个event对象后，会按如下过程将其在HTML元素间进行传播
1、第一阶段：事件捕获，事件对象沿DOM树向下传播
2、第二阶段：目标触发，运行事件监听函数
3、第三阶段：事件冒泡，事件沿DOM树向上传播

IE的事件模型中没有“事件捕获”阶段



直系亲属树结构：
html
body    添加了事件
parent  添加了事件
child   添加了事件

事件冒泡：直系亲属树结构中，点击某个元素，由于冒泡作用，亲属树上的元素凡是添加的事件中，都会被触发，从内向外。


事件捕获：直系亲属树结构中，点击某个元素，由于捕获作用，亲属树上的元素凡是添加的事件中，都会被触发，从外向内。
```

#### 事件委托（原理就是事件冒泡）

```
事件委托就是虽然执行的是此事件，但是它不把事件添加到自己的身上而是添加到它的上级元素上面，然后进行判断，这样可以提高性能，原理就是利用了冒泡机制。

例子：

<body>
<ul id = 'ul'>
    <li id = 'one'>1</li>
    <li id = 'two'>2</li>
    <li id = 'three'>3</li>
    <li id = 'four'>4</li>
</ul>
<script>
var ul = document.getElementById('ul');
ul.addEventListener('click',function(event){
    if(event.target.id = 'one'){
        alert(1);
    }else if(event.target.id = 'two'){
        alert(2);
    }else if(event.target.id = 'three'){
        alert(3);
    }else if(event.target.id = 'four'){
        alert(4);
    }
},false);
</script>
</body>
```

#### event对象属性和方法

```
event对象代表事件的状态，比如事件在其中发生的元素、键盘按钮的状态、鼠标的位置、鼠标按钮的状态。事件通常与函数结合使用，函数不会在事件发生前被执行

event.type 事件类型  结果如：click，mouseout...

event.target 和 event.currentTarget

例子：
<body>
<div id = 'parent'>
    <div = 'child'>父亲</div>
</div>
<script>
    var parent = document.getElementById('parent');
    parent.addEventListener('click',function(event){
        console.log(event.target.id); //执行结果是child，点击谁就是target，事件源
        console.log(event.currentTarget.id);//执行结果是parent，事件绑定在谁身上，就是指向谁
    },false);
</script>
</body>

event.preventDefault 通知浏览器不要执行与事件关联的默认动作。

event.stopPropagation 阻止冒泡或者捕获

event.clientY  返回当事件被触发时，鼠标指针的垂直坐标。就是指浏览器顶部底边到鼠标的位置（不计算滚动轴距离）
event.pageY  就是指浏览器顶部底边到鼠标的位置（计算滚动轴距离）
event.screenY  指屏幕顶部到鼠标位置
```

#### event对象常用属性和方法

```
type:事件的类型
srcElement/target：事件源，就是发生事件的元素
cancelBubble：如果事件句柄想阻止事件传播到包容对象，必须把该属性设置为true，相当于e.stopPropagation()
returnValue：如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为false，可以取消发生事件的源元素的默认动作。相当于e.preventDefault()
```


#### 跨浏览器event对象兼容写法

```
var EventUtil = {
    addHandler:function(element,type,handler){
        //绑定事件
        //chrome、firefox、IE9等 addEventlistener
        //IE8及IE8以下的浏览器 attachEvent
        if(element.addEventlistener){
            element.addEventlistener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type] = null
        }
    },
    removeHandler:function(element,type,handler){
        //移除事件
        //chrome、firefox、IE9等  removeEventListener
        //IE8以及IE8以下浏览器 detachEvent
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type] = null;
        }
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    }
}
```

#### 常用事件类型

```
onclick：当用户点击某个对象时调用的事件句柄
onfocus：元素获得焦点
onblur：元素失去焦点
onmouseover：鼠标移动到某元素之上
onmouseout：鼠标从某元素移开
onmousedown：鼠标按钮被按下
onmousemove：鼠标按钮被移开
onmouseup：鼠标按键被被松开


		// UI事件
		// 1、load
		// 当页面完全加载后在window上面触发
		EventUtil.addHandler(window, "load", function(e){
			alert("Loaded!");
		});

		// img标签加载完毕
		EventUtil.addHandler(image, "load", function(e){
			e = EventUtil.getEvent(e);
			alert(EventUtil.getTarget(e).src);
		})

		// 实例img预加载
		EventUtil.addHandler(window, "load", function(){
			var image = new Image();
			EventUtil.addHandler(image, "load", function(event){
				alert("Image loaded!");
			})
		})
		// js动态加载完毕
		EventUtil.addHandler(window, "load", function(){
			var script = document.createElement("script");
			EventUtil.addHandler(script, "load", function(event){
				alert("js Loaded");
			});
			script.src = "example.js";
			document.body.appendChild(script);
		});

		// css动态加载完毕
		EventUtil.addHandler(window, "load", function(){
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			EventUtil.addHandler(link, "load", function(event){
				alert("css Loaded");
			});
			link.href = "example.css";
			document.getElementsByTagName("head")[0].appendChild(link);
		});

		// 2、unload事件
		EventUtil.addHandler(window, "unload", function(event){
			alert("Unloaded");
		});

		// 3、resize事件
		EventUtil.addHandler(window, "resize", function(event){
			alert("Resized");
		})

		// 4、scroll事件.  主要针对新旧浏览器
		EventUtil.addHandler(window, "scroll", function(event){
			if(document.compatMode == "CSS1Compat"){
				// 新
				alert(document.documentElement.scrollTop)
			}else{
				// 旧
				alert(document.body.scrollTop);
			}
		});

		// 鼠标事件
		EventUtil.addHandler(document, "mousedown", function(event){
			alert("mousedown");
		})
		EventUtil.addHandler(document, "mouseup", function(event){
			alert("mouseup");
		})
		EventUtil.addHandler(div, "click", function(event){
			alert("client" + event.clientX);
			alert("client" + event.pageX);
			alert("client" + event.screenX);
		})

		// 键盘事件   在文本框内按下键盘
		var textBox = document.getElementById("textBox");
		EventUtil.addHandler(textBox, "keyUp", function(event){
			alert(event.keyCode);
		})

		// 触摸与手势事件
		function handleTouchEvent(event){
			switch(event.type){
				case "touchstart":
					alert("touchstart");
					break;
				case "touchmove":
					alert("touchmove");
					break;
				case "touchend":
					alert("touchend");
					break;
			}
		}
		EventUtil.addHandler(document, "touchstart", handleTouchEvent);
		EventUtil.addHandler(document, "touchmove", handleTouchEvent);
		EventUtil.addHandler(document, "touchend", handleTouchEvent);
```


