# 使用 Chrome DevTools 高效调试 JavaScript

**文章出处：** [Debugging JavaScript Efficiently with Chrome DevTools](https://lo-victoria.com/debugging-javascript-efficiently-with-chrome-devtools)

你还在输入`console.log()`来调试你的项目吗？在本文中，让我们学习如何使用 Chrome DevTools 高效地调试JavaScript。

## 什么是 Chrome 开发者工具？

谷歌 Chrome 浏览器提供了一个内置的开发者工具（又名 DevTools），帮助开发者直接在浏览器上编辑他们的代码，添加断点来检测问题并更快地调试他们的代码。

### DevTools 面板介绍

DevTools UI 共有 8 个面板。本文将主要介绍 Sources 面板，因为这是我们调试的地方。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616477191722/b0YeepqBL.png?auto=compress)

这是每个面板负责的内容的快速概述。

1. Elements：检查和编辑 DOM 节点和样式属性
2. Console：查看和运行 JavaScript 代码
3. Sources：调试 JavaScript、添加断点等。
4. Network：查看和调试与网络相关的活动
5. Performance：分析速度和优化
6. Memory：跟踪内存使用情况并修复相关问题
7. Application：检查localStorage、sessionStorage、cookies、IndexDB等。
8. Security：调试证书等安全问题
9. Lighthouse：审核应用程序质量、性能、可访问性、SEO 等。

### 使用 DevTools（键盘快捷键）

要打开 DevTools Elements 面板，请按`Command + Option + C`Mac 和`CTRL + SHIFT + C`任何其他操作系统。

要打开 DevTools Console 面板，请按`Command + Option + J`Mac 和`CTRL + SHIFT + J`任何其他操作系统。

## 如何使用 DevTools 调试 JavaScript

现在我们对 DevTools 有了一个快速的概述，让我们讨论一些有用的调试策略来更有效地调试您的代码，以及如何使用 DevTools 实现这一目标。

### 1. 添加断点

断点很有用，因为它们可以暂停您的代码，因此您可以逐行检查并在准备好后选择继续。这对于大型代码库或难以查明错误来源时尤其有用。

#### 添加断点

在这个例子中，让我们添加一个代码行断点。

1) 要添加断点，请打开 DevTools Sources Panel。

2) 点击左侧导航面板，选择要添加断点的 .js 文件。.js 文件的代码将出现在中间面板中。

![捕获.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1616488504562/hhxbyNsul.png?auto=compress)

3) 右键单击要添加断点的行，然后选择“添加断点”。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616489474357/hWeIILJwj.png?auto=compress)

4) 现在，当我运行该函数时，它将在执行 POST 请求之前暂停。我可以看到`data`正在post 的内容。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616489703683/daDoMukjV.png?auto=compress)

暂停然后检查代码是一种高效的调试方式，而不是`console.log(data)`重新加载页面。

一切正常后，单击页面上的恢复按钮以取消暂停。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616489902697/cEzaC8n5r.png?auto=compress)

您可以使用 DevTools 添加多种类型的断点。下图是所有可用断点类型的摘要。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616485987682/0yJcG4QMu.png?auto=compress)

有关如何添加每种类型的断点的更多详细信息，请查看[文档](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)。

### 2. 查看/更改本地、闭包和全局属性

当应用程序暂停时，您可以查看和编辑本地、闭包和全局属性。例如，您有一个错误，它没有为变量返回正确的值，因此您想在函数的某个点检查它的值。

添加断点后，您只需转到右侧面板即可。展开“scope”窗格并查看变量值。如您所见，此面板提供了许多可用于修复错误的信息。

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616490450627/imwmQpM4k.png?auto=compress)

如果要使用其他值测试该函数，可以双击变量进行编辑。

### 3. 创建、保存和运行代码片段

另一个有效的策略是使用**snippets**(片段)。**snippets**允许您在应用程序的任何部分轻松执行和重用脚本。您可以通过单击左侧面板上的**snippets**菜单来添加代码段。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616491990762/xK0UDbZ_5.png?auto=compress)

在 Snippets 面板上，单击**+ New Snippets**并在中间面板中编写代码，如下图所示。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616492150166/pSzP9xC7K.png?auto=compress)

然后`Command + S` (Mac) 或`CTRL + S`(任何其他操作系统上)保存您的代码片段。

要运行您的代码段，您可以执行以下任一操作：

1) 右键单击代码片段，然后单击“run”

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616499087193/8YhJWZ3lp.png?auto=compress)

2)`Command + Enter`在 Mac 或`CTRL + Enter`任何其他操作系统上按。

### 4. 查看调用堆栈

DevTools 还允许您查看调用堆栈。当您有很多异步函数，并且您希望在调试错误时跟踪调用堆栈的更改，这很有用。

要查看调用堆栈，请打开 DevTools Sources 面板，然后在右侧面板上展开 Call Stack 面板以查看调用堆栈中的所有当前函数。

![图像.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1616502478418/48LjA8Ubh.png?auto=compress)

### 5. Blackboxing

在调试时，您可能希望从运行中排除一些脚本。也许是您认为与错误无关的某些第三方库或脚本。

无需在代码中逐行注释它们，您可以在 DevTools 上将它们黑箱化。

为此，请在“Sources ”选项卡的左侧面板上单击要忽略的脚本文件。然后，右键单击中间面板并单击**“Add script to ignore list”**。

现在此脚本将不会运行，因此您可以更好地专注于检查有问题的代码并缩小导致错误发生的范围。

## 结论

您可以使用 Chrome DevTools 做更多事情。我鼓励您访问下面参考资料部分中的链接，自己探索更多。

一旦掌握了窍门，您将能高效调试 **Javascript**，您无休止的`console.log()`日子将成为历史。

谢谢阅读。我希望它是一个有用的阅读。如果是，请喜欢并分享这篇文章，并随时在下面的评论中提问。



## 参考

- [youtube.com/watch?v=H0XScE08hy8&list=PL..](https://www.youtube.com/watch?v=H0XScE08hy8&list=PLNYkxOF6rcIC74v_mCLUXbjj7Ng7oTAPE&index=1)
- [developer.google.com/web/tools/chrome-devt..](https://developers.google.com/web/tools/chrome-devtools/javascript)
- [developer.google.com/web/tools/chrome-devt..](https://developers.google.com/web/tools/chrome-devtools/javascript/reference)



【完】