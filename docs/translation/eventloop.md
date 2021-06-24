# 可视化的JavaScript —— （一）事件循环

文章来源：[JavaScript Visualized Series' Articles](https://dev.to/lydiahallie/series/3341)

【一】[JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

事件循环是每个**JavaScript**开发人员都必须以某种方式掌握的事情之一，起初理解起来可能并不容易。我是一个视觉学习者，所以我想通过低分辨率**gif动画**这种视觉方式来帮助您加深理解，是的，在2019年，**gif动画**仍然有点像素化和模糊。

首先，事件循环是什么，为什么我们要关心呢？

JavaScript是单线程的：一次只能运行一个任务。

通常，这没什么大不了的，但是现在想象您正在运行一个耗时30秒的任务。是的。在此任务中，我们等待30秒才能进行其他任何操作（默认情况下，JavaScript在浏览器的主线程上运行，因此整个用户界面都停滞了））。在2019年，没有人想要一个速度慢，反应迟钝的网站。

幸运的是，浏览器为我们提供了JavaScript引擎本身不提供的一些功能：Web API。这包括DOM API，setTimeout/HTTP请求等。这可以帮助我们创建一些异步的，非阻塞的行为。

当我们调用一个函数时，它将被添加到调用栈中。调用堆栈是JS引擎的一部分，这不是特定于浏览器的。它是一个堆栈，这意味着它是先进后出的（想像一堆煎饼）。当一个函数返回一个值时，它会从堆栈中弹出

![gid1 6](https://user-images.githubusercontent.com/23453305/116499617-311ba200-a8df-11eb-97e3-99137c331d56.gif)

该respond函数返回一个setTimeout函数。setTimeout函数由Web API提供：它让我们延迟任务执行，而不会阻塞主线程。我们传递给该setTimeout函数的回调函数 —— 箭头函数`() => { return 'Hey'}`，会添加到Web API。同时，该setTimeout函数和response函数从堆栈中弹出，并且都返回了它们的值！

![gif2 1](https://user-images.githubusercontent.com/23453305/116508326-af823f00-a8f3-11eb-9459-6e3ae371209e.gif)

在Web API中，计时器的运行时间与我们传递给它的第二个参数1000ms一样长。回调不会立即添加到调用堆栈中，而是会传递给队列。

![gif3 1](https://user-images.githubusercontent.com/23453305/116508537-2fa8a480-a8f4-11eb-8cee-274379620813.gif)

这可能是一个令人困惑的部分：这并不意味着在1000毫秒后将回调函数添加到调用堆栈中（从而返回一个值）！它**只是在1000毫秒后添加到队列中**。但这是一个队列，该函数执行必须等待轮到它！

现在就是大家一直期待的部分了 —— 让事件循环执行其唯一的任务：将队列与调用堆栈连接起来。如果调用堆栈为空，且所有先前调用的函数都返回了它们的值并已从堆栈中弹出，就将队列中的第一项添加到调用堆栈中。在这种情况下，当回调函数为队列中的第一项，没有其他函数被调用时，调用堆栈是空的。

![gif4](https://user-images.githubusercontent.com/23453305/116509113-50bdc500-a8f5-11eb-84c8-3a6f13361eac.gif)

回调被添加到调用堆栈中被调用，并返回一个值，并从堆栈中弹出。

![gif5](https://user-images.githubusercontent.com/23453305/116509139-616e3b00-a8f5-11eb-9d1d-bb2b915ca61b.gif)

阅读一篇文章很有趣，但是通过反复地实际使用它，您只会对此完全感到满意运行以下命令，尝试获取打印到控制台的内容：

```js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

搞明白了吗？让我们快速看一下在浏览器中运行此代码时发生的情况：

![gif14 1](https://user-images.githubusercontent.com/23453305/116509473-f07b5300-a8f5-11eb-854f-dc766c590238.gif)

* 我们调用bar。bar返回一个setTimeout函数。
* 我们传递给setTimeout的回调被添加到Web API，该setTimeout函数和bar从调用堆栈中弹出。
* 计时器运行，与此同时，它foo被调用并打印日志First。foo返回（未定义），baz被调用，并将回调添加到队列中。
* baz打印Third。事件循环看到baz返回后调用栈为空，然后将回调添加到调用栈。打印日志Second。

【完】