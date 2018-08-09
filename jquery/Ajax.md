## 状态码
* 0 // 创建请求
* 1 // 打开，发送请求
* 2 // 拿到了响应头
* 3 // 正在下载响应体
* 4 // 响应下载完成
***
### 如果请求体是urlencoded，必须设置请求头
```js
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
```
***
### jquery中只有请求成功（status为200）才执行回调函数

