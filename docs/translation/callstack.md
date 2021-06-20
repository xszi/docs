# 通过两个示例来解释递归和和调用堆栈

**文章出处**：[Recursion and the Call Stack Explained By Reading A Book](https://blog.codeanalogies.com/2020/01/14/recursion-and-the-call-stack-explained-by-reading-a-book/)

### 概述

**递归**是所有编程语言中最令人兴奋的原则之一。

非递归函数（换句话说，您过去使用过的函数）将在每次调用时运行一次，并通过return语句输出。

但是，递归函数可以被调用一次然后自身调用不确定次数，最后将所有函数调用的输出合并到一个return语句。

下面是两种函数版本：

* 非递归
<img width="522" alt="aa" src="https://user-images.githubusercontent.com/23453305/113369804-c9803e80-9394-11eb-92a3-0874f20c6c6d.png">
* 递归
<img width="523" alt="bb" src="https://user-images.githubusercontent.com/23453305/113368994-c08e6d80-9392-11eb-9548-4894c5625373.png">

通过单个语句可以将一个函数调用无穷次，Exciting！

同时，从现实世界寻找这种情况的比喻是困难的。而且一旦讨论到调用栈，就更难了，我们将在后面讨论。

有人提出了“无限盒子”：

![image](https://user-images.githubusercontent.com/23453305/113369197-45798700-9393-11eb-8fde-2ec813426f4b.png)

还有“俄罗斯套娃”
![image](https://user-images.githubusercontent.com/23453305/113369341-b9b42a80-9393-11eb-8391-8bd796fc4096.png)

但是，以上示例对于理解调用堆栈没什么帮助。

所以，本文我们将展示两个流行的递归示例，并构建一种直观的语言来理解函数和调用堆栈，理解如何连续调用多个函数。

在继续本文之前，您应该对`JavaScript`中的函数有了深入的了解。[JavaScript’s Arrow Functions Explained By Going Down A Slide](https://blog.codeanalogies.com/2019/04/14/javascripts-arrow-functions-explained-by-going-down-a-slide/)

### 示例1-阶乘

**阶乘**是最流行的递归示例。

您可能熟悉代数的阶乘。

它们表示为：3！

该符号的计算结果为3 * 2 * 1或6。

我们可以将其表示为“ for”循环，在该循环外更新变量：

```js
let factorial = 4;
let result = 1;

for (let i=factorial; i>= 1; i--){
    result = result*i;
}
```
我们再使用递归代替。可以使用递归和一个函数进行`n-1`个调用，而不是使用循环来更新循环外的变量，其中`n`是我们要查找的阶乘。

```js
let getFactorial = (num) => {
  if (num == 1)
    return 1;
  else
    return num * getFactorial(num-1);
}

getFactorial(4);
// 24
```

哇！这完成了与上面的代码块相同的操作。

但是，如果看一下第5行，您会发现`return`语句包含对函数本身的引用。

那么……该函数何时准确返回最终值？我们如何将函数的4个调用链接在一起以返回**24**？

这是调用堆栈有用的地方，它会确定这些函数调用返回的顺序。

但是，现在我们一次堆叠了两个概念：递归和调用栈，太多了！

为了可视化调用堆栈，我们考虑从左到右构建一个堆栈。每次添加一个块时，都会将其添加到堆栈的左侧，并将其他块推到右侧。

因此，当我们执行此递归函数时，我们将生成如下所示的堆栈：

![recursionGIFsNum1](https://user-images.githubusercontent.com/23453305/113370768-4c09fd80-9397-11eb-8fa9-cb1723fab09c.gif)

上面的GIF会在屏幕底部生成调用堆栈。最后剩下**1 * 2 * 3 * 4**，结果为24。

调用堆栈由4个函数调用组成，并且直到函数返回1才运行。这是因为前三个调用中的每个都包含对堆栈中下一个调用的引用！

当num = 4时，该函数返回4 * getFactorial（3）。在我们知道getFactorial（3）的值之前，它实际上无法返回值。这就是为什么我们需要一个调用堆栈！

因此，递归允许连续调用一个函数无限次，并且它更新了调用堆栈，该堆栈在最终调用运行后返回一个值。

调用堆栈从左到右更新，然后您可以按解决顺序读取所有调用。最先计算的是最近入栈，第一个入栈则最后计算。

上面的GIF不能很好地显示每个调用之间的这种关系。因此，这是一个更新的版本，显示了如何通过return语句连接所有调用：

![recursionGIFsfactorialnum2](https://user-images.githubusercontent.com/23453305/113371279-8b851980-9398-11eb-91df-1a3c68e978a0.gif)

### 示例2-分割字符串

在上面的示例中，我们使用了一个数学示例，该数学示例类似于代数的问题。

这行得通，但是还有许多递归示例，它们超出了数学范围。这个示例中，我们将展示如何使用递归来操作字符串。

这是挑战：反转字符串。

换句话说，以相反的顺序返回带有输入字符串字母的字符串。

您也可以使用“ for”循环执行此操作，但是在此示例中，我们将使用递归。

让我们考虑一下如何反转字符串“ cat”。

每次运行函数调用时，我们都需要隔离字符串的第一个或最后一个字母，然后从字符串中切出一个字母。当我们再次运行该函数时，我们应该再次获取第一个或最后一个字母。

最后，调用堆栈将使我们能够以正确的顺序返回字母。

```js
let testStr = 'cat';

let revStr = (str) => {
  if (str.length == 0)
    return '';
  else
    return revStr(str.substr(1)) + str[0];
};

revStr(testStr);
// 'tac'
```

![recursionex2v1](https://user-images.githubusercontent.com/23453305/113371574-46adb280-9399-11eb-866e-a105c51ef6a8.gif)

同样，尽管上面的GIF看起来很容易，但是如果我们想真正理解这些函数调用，就需要更深入地研究最终的return语句。

与上面的示例相比，此示例还有一个重要的区别 —— **我们在执行字符串连接而不是乘法**。

因此，该return语句中字符串的顺序相当重要，因为它确定我们将使用哪种顺序进行连接。

由于这不是一系列乘法问题，因此调用栈更容易理解。这是一个视觉效果：

![recursionex2](https://user-images.githubusercontent.com/23453305/113371701-93918900-9399-11eb-88a5-bdef4ca3eb2a.gif)

这就是字符串的顺序如此重要的原因-当我们在上面的GIF中构建调用堆栈时，递归函数调用和字符串片段（str [0]）有特定的顺序。

当我们运行堆栈中的所有调用时，此顺序使我们能够以相反的顺序重建字符串。

【完】