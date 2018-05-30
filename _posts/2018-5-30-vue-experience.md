---
layout: left-none
title:  制作VUE项目总结的经验
date:   2018-5-30 00:00:00 +0800
tag: VUE
---
* content
{:toc}
<hr>

### 一、跨域请求代理

1：打开config/index.js

```
module.exports{
    dev: {

    }
}
```

在这里面找到proxyTable{}，改为这样：

```
proxyTable: {
      '/api': {
        target: 'http://121.41.130.58:9090',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
```

2：在需要调接口的组件中这样使用：

```
axios.post('/api/yt_api/login/doLogin',postData)
    .then(function (response) {
        console.log(1)
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
```

### 二、Vue打包后出现一些map文件的解决办法：

```
src/config/index.js

productionSourceMap:false
```

