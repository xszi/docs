# 可视化的JavaScript —— （二）提升

【二】[JavaScript Visualized: Hoisting](https://dev.to/lydiahallie/javascript-visualized-hoisting-478h)

**提升**是每个JS开发人员都听说过的术语之一，因为你在谷歌上搜索令人讨厌的错误，结果在StackOverflow上，这个人告诉你这个错误是由**提升**引起的，那么，什么是**提升**?

如果您是`JavaScript`新手，您可能经历过一些奇怪的行为，其中一些变量随机抛出`undefined`，`ReferenceErrors`等错误。提升通常被解释为将变量和函数放在文件的顶部，但不是这样的，尽管行为看起来像是这样。

当JS引擎获得我们的脚本时，它所做的第一件事就是为代码中的数据设置内存。此时不会执行任何代码，它只是在为执行做准备。函数声明和变量的存储方式是不同的。函数以对整个函数的引用存储。

![gif7](https://user-images.githubusercontent.com/23453305/117524130-cf4ded00-afee-11eb-993b-789c34667a0e.gif)

对于变量，则有所不同。ES6引入了两个新的关键字来声明变量：let和const。用let或const关键字声明的变量未初始化存储。

![gif8](https://user-images.githubusercontent.com/23453305/117524503-2b654100-aff0-11eb-90bd-f76efd3cf3f7.gif)

用var关键字声明的变量的默认值是undefined。

![gif9](https://user-images.githubusercontent.com/23453305/117524572-8f880500-aff0-11eb-88a1-b681fab412c2.gif)

现在创建阶段已经完成，我们可以实际执行代码了。让我们看看如果在声明函数或任何变量之前，在文件的顶部有3条console.log语句会发生什么。

由于函数是通过对整个函数代码的引用来存储的，因此我们甚至可以在创建它们的行之前调用它们
![gif16](https://user-images.githubusercontent.com/23453305/117524668-e392e980-aff0-11eb-978e-39271f536301.gif)

当我们在变量声明之前引用用var关键字声明的变量时，它将简单地返回其存储时的默认值:undefined。然而，这有时会导致“意想不到的”行为。在大多数情况下，这意味着你无意中引用了它(你可能不希望它的值是undefined)

![gif17](https://user-images.githubusercontent.com/23453305/117524695-0fae6a80-aff1-11eb-9646-5424c5fff2d9.gif)

为了防止意外地引用未定义的变量，就像使用var关键字那样，每当我们试图访问未初始化的变量时，都会抛出ReferenceError。在它们实际声明之前的“区域”，被称为暂时性死区：你不能在变量初始化之前引用它们(这也包括ES6类!)

![gif18](https://user-images.githubusercontent.com/23453305/117524875-30c38b00-aff2-11eb-9e9b-826a068c4128.gif)


当引擎传递我们实际声明变量的行时，内存中的值将被我们实际声明它们的值覆盖。

（哦，我注意到这应该是第7个，会尽快更新的）

![gif12](https://user-images.githubusercontent.com/23453305/117524812-cf032100-aff1-11eb-9abc-6e486948b69d.gif)

done！快速回顾：
* 在我们执行代码之前，函数和变量被存储在内存中用于执行上下文，这叫做提升。
* 函数在存储时使用对整个函数的引用，`var`关键字的变量值为`undefined`, `let`和`const`关键字的变量在存储时未初始化。


【完】
