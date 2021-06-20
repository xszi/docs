# 关于Node.js的20个面试题【4.17】

**文章出处**：[Top 20 Interview Questions on Node.js](https://www.codingdefined.com/2017/04/top-20-interview-questions-on-nodejs.html)

#### 前言

在这篇文章中，我们将讨论有关Node.js的二十大面试问题。如果您是一名**MEAN**（MongoDB、Express、AngularJS 和 Node.js的首字母缩写）堆栈开发人员，并且希望了解有关Node.js的一些最佳面试问题，您来到这既是最佳选择。Node.js的面试问题仅是为了让您了解在面试过程中可能遇到的问题的特点。

#### Q1: 什么是Node.js？

Node.js是用于构建快速，可扩展的网络应用程序的平台。与其他服务器端语言相比，它的优势在于它使用事件驱动的非阻塞I / O模型，从而使其轻巧高效。

#### Q2：您能解释一下Node.js的工作原理吗？

它使用Google V8 Javascript引擎执行代码。它包含用于文件，套接字（socket）和HTTP通信的内置异步**I / O**库。Node.js封装了**libuv**以处理异步事件。

#### Q3：Node.js真的是单线程的吗？

Node.js在单线程上运行，但是使用非阻塞I / O调用使其可以支持多线程并发连接。这意味着Node不会并行处理请求，而且实际上后端要花费大量时间来处理并行运行。

#### Q4：您能解释一下Node.js中的异步方法吗？

Node.js使用事件循环和回调函数异步运行。事件循环是一种可处理所有外部事件的机制，并且会将外部事件转换为回调函数。它在适当的时间调用所有事件处理程序。因此，这意味着在执行单个请求时，它会在后端执行很多操作，因此当前请求或即将到来的请求不会花费很多时间。

**查看更多**：[ Globals in Nodejs](https://www.codingdefined.com/2014/06/nodejs-asynchronous-approach.html)

#### Q5：中的异步方法。您能解释一下Node.js中的**Globals**吗？

全局对象，进程和缓冲区统称为**Globals**。

Global：它是一个全局名称空间对象
Process：它也是一个全局对象，但它提供了将同步功能转换为异步回调的基本功能。
Buffer：原始数据存储在Buffer类的实例中。

#### Q6：Node.js中下划线的用途是什么？

要访问最后一个表达式，我们必须使用"_"字符

**查看更多**：[ Use of Underscore (_) in Nodejs ](https://www.codingdefined.com/2014/06/use-of-underscore-in-nodejs.html)

#### Q7：您可以用代码解释下在Node.js中创建Http服务器吗？

```js
var http = require('http');
var requestListener = function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello You\n');
}

var server = http.createServer(requestListener);
server.listen(8080); // The port where you want to start with.
```

#### Q8：如何在Node.js中加载HTML？

要在Node.js中加载HTML，我们必须将`Content-type`从`text / plain`更改为`text / html`。

**查看更多**：[Loading HTML in NodeJS](https://www.codingdefined.com/2014/06/loading-html-in-nodejs.html)

#### Q9：您能解释一下Node.js与Ajax之间的区别吗？ 

**Node.js**和**Ajax**之间的区别在于Ajax是客户端技术，而Nodejs是服务器端技术。Ajax用于更新页面内容而不刷新页面，而Nodejs用于开发服务器软件。Nodejs由服务器执行，而Ajax由浏览器执行。

#### Q10：您能解释一下Node.js中**readFile**与**createReadStream**之间的区别吗？

**readFile** —— 在将文件提供给用户之前，它将完全读取文件到内存中。
**createReadStream** —— 它将按事先指定的大小读取文件。

**查看更多**：[readFile Vs createReadStream in Nodejs](https://www.codingdefined.com/2014/07/readfile-vs-createreadstream-in-nodejs.html)

#### Q11：Node.js上下文中的**回调**是什么？

**回调**等效于在一个在给定任务完成时调用函数。Node.js大量使用了回调，所有API的编写方式都支持回调的方式。使用回调的优点是它使Node.js具有高度可伸缩性，即无需等待任何功能完成即可处理大量请求。 

#### Q12：什么是回调地狱？如何避免？

回调地狱意味着大量嵌套的回调，使代码难以阅读且难以维护。为了避免发生回调，应该使用模块化，这意味着将回调分为独立的函数。避免回调地狱的另一种方法是使用 Promises，它允许错误冒泡和链式调用。

#### Q13：什么是事件循环和事件触发？

Node.js在事件和回调的帮助下支持并发，即使它是单线程应用程序也是如此。Node线程保持事件循环，每当有任务完成时，该线程都会触发相应的事件。

每当完成任何任务或发生任何错误，添加任何新的侦听器或删除任何侦听器时，**EventEmitter**都会触发一个事件。它提供诸如on和emit之类的属性，其中on用于绑定功能，emit用于触发事件。

#### Q14：Node.js中存在几种类型的流？

Node.js中存在四种流，它们是 Readable，  Writable，  Duplex 和 Transform。Readable用于读操作，Writable用于写操作，Duplex 用于读和写操作，而Transform是双工流的一种类型，其基于输入计算输出。

#### Q15：为什么使用**Buffer**（缓冲区）而不是二进制字符串来处理二进制数据？

纯JavaScript不能很好地处理直接的二进制数据。由于Node.js服务器必须处理TCP流以读取和写入数据，因此二进制字符串使用起来会很麻烦，因为它非常慢并且容易损坏。这就是为什么始终建议使用缓冲区而不是二进制字符串来处理二进制数据的原因。

#### Q16：如何正常关闭Node.js服务器？

我们可以使用称为SIGTERM或SIGINT的用于程序终止的通用信号来正常关闭Node.js服务器。我们需要调用SIGTERM或SIGINT，它们将终止程序并清理程序使用的资源。

#### Q17：什么是Node.js中的错误优先回调？

 “错误优先”回调是Node.js回调的标准协议，它有一个简单的规则，即回调函数的第一个参数应为错误对象。如果错误参数不为null，则操作不成功，发生了错误；如果错误参数为null，则操作成功。

#### Q18：`process.nextTick()` 和 `setImmediate()` 之间有什么差异？ 

`process.nextTick()`将执行动作推迟传递到事件循环的下一次，或者说一旦正在进行的事件循环执行完成就执行回调函数，而`setImmediate()`是在事件循环的下一个周期执行回调，并返回事件循环以执行任何**I / O**操作。

> The difference between process.nextTick() and setImmediate() is that process.nextTick() defers the execution of an action till the next pass around the event loop or it simply calls the callback function once the ongoing execution of the event loop is finished whereas setImmediate() executes a callback on the next cycle of the event loop and it gives back to the event loop for executing any I/O operations.

#### Q19：如何在Node.js中监视文件的修改？

我们可以利用 `File System watch()` 函数来监视文件的更改。

#### Q20：如何解决Node.js中的“内存不足处理异常”？

为了解决Node.js中的内存不足处理异常，我们需要增加`max-old-space-size`。默认情况下，`max-old-space-size`的最大大小为512 mb，您可以通过命令行 `node --max-old-space-size = 1024 file.js` 来增加。

【完】