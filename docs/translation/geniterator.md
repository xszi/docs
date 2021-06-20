# 可视化的JavaScript —— （六）Generators 和 Iterators【6.5】

【六】[JavaScript Visualized: Generators and Iterators](https://dev.to/lydiahallie/javascript-visualized-generators-and-iterators-e36)

ES6 引入了一个很酷的东西，叫做生成器函数🎉。 每当我问人们关于生成器函数的问题时，他们的回答基本上都是：“我见过他们一次，很困惑，然后就再也没有看过它”，“哦，天哪，我读了这么多博客关于生成器函数的帖子，我仍然不明白”，“我明白了，但为什么会有人使用它”🤔 或者也许这只是我一直在与自己进行的对话，因为这就是我过去长时间思考的方式！但他们实际上很酷。

那么，什么是生成器函数？我们先来看一个普通的老式函数👵🏼

![image](https://user-images.githubusercontent.com/23453305/120796037-dd027e00-c56c-11eb-9ee6-022f0ce74eae.png)

是的，这绝对没有什么特别之处！这只是一个记录 4 次的普通函数。让我们调用它！

![unsiscmakhlgxl4dcji7](https://user-images.githubusercontent.com/23453305/120796320-45e9f600-c56d-11eb-8286-a8111da70090.gif)

“但是莉迪亚，为什么你浪费了我5秒钟的时间让我看这个普通无聊的函数”，这是个很好的问题。普通函数遵循一种称为“运行到完成”的模型:当我们调用一个函数时，它将始终运行直到完成(好吧，除非某处出现错误)。我们不能随意把函数停在中间的某个地方。

现在最酷的部分来了：生成器函数不遵循“运行到完成”模型! 这是否意味着我们可以随机暂停生成器函数的执行吗？嗯,有点这个味道！让我们看看什么是生成器函数以及如何使用它们。

我们通过在**function**关键字后面写一个星号*来创建一个生成器函数

![image](https://user-images.githubusercontent.com/23453305/120796965-07087000-c56e-11eb-802b-7c7a85484232.png)

但这并不是我们使用生成器函数必须做的！ 与常规函数相比，生成器函数实际上以完全不同的方式工作：

* 调用生成器函数返回一个生成器对象，它是一个迭代器。

* 我们可以使用生成器函数中的`yield `关键字“暂停”执行。

但这到底是什么意思！？

我们先看第一个方式：调用生成器函数返回生成器对象。 当我们调用常规函数时，将执行函数正文并最终返回值。 但是，当我们调用生成器函数时，返回生成器对象！ 让我们看看当我们记录返回的值时看起来像什么。

![lyuivuuepy1hzpok8rc5](https://user-images.githubusercontent.com/23453305/120798235-a24e1500-c56f-11eb-9f8c-07f0e1f40302.gif)


现在，我可以听到你内心(或外部)的尖叫，因为这可能看起来有点难以承受。但是不要担心，我们并不需要使用这里记录的任何属性。生成器对象有什么用呢?首先，我们需要后退一小步，回答常规函数和生成器函数之间的第二个区别：我们可以在生成器函数中使用`yield`关键字来“暂停”执行。使用生成器函数，我们可以编写如下内容(`genFunc`是`generatorFunction`的缩写)

![image](https://user-images.githubusercontent.com/23453305/120798197-95312600-c56f-11eb-8999-04fcab5640e3.png)

`yield`关键字在这里做什么？当遇到`yield`关键字时，生成器的执行将“暂停”。最好的是，下次运行该函数时，它会记住之前暂停的位置，并从那里开始运行！这里发生了什么(不用担心，稍后会有动画演示)

1. 第一次运行时，它在第一行“暂停”，并生成字符串值'✨'。
2. 第二次运行时，它从之前的`yield`关键字所在行开始。然后它一直向下运行，直到第二个`yield`关键字并生成值'💕'。
3. 第三次运行时，它从前面的`yield`关键字行开始。它一直向下运行，直到遇到`return`关键字，并返回值`Done!`。

但是…如果我们前面看到调用生成器函数返回一个生成器对象，我们如何调用该函数？生成器对象在这里发挥作用了!

生成器对象包含一个`next`方法(在原型链上)。我们将使用这个方法来迭代生成器对象。但是，为了记住它在生成值之后的状态，我们需要将生成器对象赋值给一个变量。我叫它`genObj`，是`generatorObject`的缩写。

![y54clkzwbc9oemzgybh5](https://user-images.githubusercontent.com/23453305/120798841-85661180-c570-11eb-9dc8-e60e1ada587b.gif)

没错，和我们之前看到的一样吓人。让我们看看在调用`genObj`生成器对象上的下一个方法时会发生什么？

![ryzc9gpzw4x5f0eqhzad](https://user-images.githubusercontent.com/23453305/120799019-c2ca9f00-c570-11eb-99a6-0c133b9dbabe.gif)

生成器一直运行，直到遇到第一个`yield`关键字，该关键字恰好在第一行！它生成了一个包含‘value’属性和'done'属性的对象。

```
{ value: ... , done: ... }
```

'value'属性等于我们生成的值。‘done’属性是一个布尔值，只有在生成器函数**return**返回一个值(不是yield生成的!)时才被设置为true。

我们停止了对生成器的迭代，这让它看起来像是函数刚刚暂停了!这太酷了。让我们再次调用`next`方法

![e7hz87c6xtd31qjx19va](https://user-images.githubusercontent.com/23453305/120799806-c7dc1e00-c571-11eb-9deb-47c1b1279b36.gif)

首先，我们记录了字符串`First log!`到控制台。这既不是`yield`也不是`return`关键字，所以它会继续。然后，它遇到了值为'💕'的`yield`关键字。一个对象通过value属性'💕'和done属性获得，done属性的值为false，因为我们还没有从生成器返回。我们快到了!让我们最后一次调用`next`。

![e7hz87c6xtd31qjx19va](https://user-images.githubusercontent.com/23453305/120800719-da0a8c00-c572-11eb-9cd4-88e4a54e64d4.gif)

我们记录了`Second log!`到控制台。然后，它遇到了一个**return**关键字，值为“Done!”。返回的对象的`value`属性为''Done!''。这次我们实际`return`了，所以done的值被设为true

‘'done’'属性实际上是非常重要的。我们只能迭代生成器对象一次。什么? !那么当我们再次调用下一个方法时会发生什么?

![wooo83by4eh12akmg5wb](https://user-images.githubusercontent.com/23453305/120801502-d3304900-c573-11eb-93f8-bbe0a2534820.gif)

它永远返回`undefined`。如果您想再次迭代它，您只需要创建一个新的生成器对象

正如我们刚刚看到的，生成器函数返回一个迭代器（生成器对象）。但是..等等，一个迭代器？这是否意味着我们可以在返回的对象上使用`for of`循环和扩展运算符？是的！🤩

让我们尝试使用`[... ]`语法将产生的值分布在数组中。

![xgk99j592vbx3qirw5or](https://user-images.githubusercontent.com/23453305/120881738-f6a3d400-c605-11eb-86e4-3935e463f4ec.gif)

或者通过使用`for of`循环？

![98k242jz3bqorkjhukwl](https://user-images.githubusercontent.com/23453305/120881769-1804c000-c606-11eb-9dd8-9012baa3cfe8.gif)

哎呀，这么多的可能性！

但是，是什么使迭代器成为迭代器呢？因为我们还可以对数组、字符串、映射和集合使用`for-of`循环和扩展语法。这实际上是因为它们实现了迭代器协议：`[Symbol.iterator]`。 假设我们有以下值（使用非常具有描述性的名称，哈哈💁🏼‍♀️）：

![image](https://user-images.githubusercontent.com/23453305/120881808-54d0b700-c606-11eb-9889-259acba3a91c.png)

`array`，`string`以及`generatorObject`都是迭代器！让我们来看看他们的属性`[Symbol.iterator]`的值。

![a7inxsrvrp8ykg3xw6zu](https://user-images.githubusercontent.com/23453305/120881896-f5bf7200-c606-11eb-8cbb-9d59609623ff.gif)

但是，不可迭代的值的`[Symbol.iterator]`值是什么？

![tpuzuy58g8m7grxvqw8x](https://user-images.githubusercontent.com/23453305/120882025-b34a6500-c607-11eb-9a60-1dcc8a230bc5.gif)

是的，是不存在。那么..我们可以简单地手动添加属性`[Symbol.iterator]`，使不可迭代的成为可迭代吗？我们可以！😃

`[Symbol.iterator]`必须返回一个迭代器，包含`next`返回，就像我们以前看到的一个对象：`{ value: '...', done: false/true }`。

为了简单起见（就像懒惰的我喜欢做的那样），我们可以简单地将 `[Symbol.iterator]` 的值设置为一个生成器函数，因为它默认返回一个迭代器。我们使对象成为可迭代对象，并设为整个对象生成的值：

![image](https://user-images.githubusercontent.com/23453305/120882185-8fd3ea00-c608-11eb-9e95-579e9e6b3698.png)

现在看看当我们在`object`对象上使用扩展语法或 `for-of` 循​​环时会发生什么！

![pw2qq1tkfbp8zccuecac](https://user-images.githubusercontent.com/23453305/120882267-1092e600-c609-11eb-84b0-782bee74f608.gif)

也许我们只想获取对象的键。“哦，那很简单，我们只是`yield Object.keys(this)` 而不是`this`！

![image](https://user-images.githubusercontent.com/23453305/120882294-4768fc00-c609-11eb-89d6-4b186c98f1ae.png)

嗯，让我们试试看。

![75kf40lqcqrudzqgkeb7](https://user-images.githubusercontent.com/23453305/120882308-61a2da00-c609-11eb-9116-707d1a9893b9.gif)

`Object.keys(this)`是一个数组，所以产生的值是一个数组。然后我们将这个产生的数组扩展到另一个数组中，从而产生一个嵌套数组。我们不想要这个，我们只想生成每个单独的`key`！

我们可以使用`yield*`关键字从生成器中的迭代器中生成单个值，所以`yield`是带星号的 ！假设我们有一个生成器函数，它首先生成一个鳄梨，然后我们想要单独生成另一个迭代器（在这种情况下是一个数组）的值。我们可以用`yield*`关键字来做到这一点。然后我们委托给另一个生成器！

![jtyn5s5o3vdhjkbwwyb0](https://user-images.githubusercontent.com/23453305/120882475-cad71d00-c60a-11eb-97f7-8cdebac22656.gif)

在继续迭代`genOb`j迭代器之前，委托生成器的每个值都会被产生。

这正是我们需要做的，以便单独获取所有对象键！

![btr4ytbb04c44qfs96v2](https://user-images.githubusercontent.com/23453305/120882553-2c978700-c60b-11eb-8927-9d36ddf7d59e.gif)

生成器函数的另一个用途是我们可以（某种程度上）将它们用作观察者函数。生成器可以等待传入的数据，并且只有当该数据被传递时，它才会处理它。一个例子：

![image](https://user-images.githubusercontent.com/23453305/120882656-c3644380-c60b-11eb-9464-f69920939f91.png)

这里的一个很大的不同是：我们不只是像我们在前面的例子中看到的那样`yield [value]`。相反，我们分配给一个名为`second`的值，并生成字符串`First!`。我们将在第一次调用该`next`方法时获得该值。

让我们看看当我们第一次在可迭代对象上调用`next`方法时会发生什么。

![ob5a4yi79it9q2ben137](https://user-images.githubusercontent.com/23453305/120882942-21ddf180-c60d-11eb-863c-bb5404790ad3.gif)

在第一行遇到了`yield`，并产生了值`First!`。那么，变量`second`的值是多少？

这实际上是我们下次调用它时传递给`next`方法的值！这一次，让我们传递字符串。`I like JavaScript`

![l1840pp2k9h9bgpt1geo](https://user-images.githubusercontent.com/23453305/120882938-1ab6e380-c60d-11eb-95e9-397a1555e663.gif)

重要的是，在这里看到该`next`方法的第一次调用尚未跟踪任何输入。我们只是通过第一次调用来启动观察者。生成器在继续之前等待我们的输入，并可能处理我们传递给`next`方法的值。

那么你为什么要使用生成器函数呢？

生成器的最大优点之一是它们被懒惰地评估。这意味着调用该`next`方法后返回的值仅在我们明确要求后才计算！普通函数没有这个：所有的值都是为你生成的，以防你将来需要使用它。

![7b24mkp7io3gmnn8pzwa](https://user-images.githubusercontent.com/23453305/120883008-6b2e4100-c60d-11eb-922e-97ab97480f49.gif)

还有其他几个用例，我通常喜欢这样做，以便在迭代大型数据集时有更多的控制权！

想象一下，我们有一个读书俱乐部的清单！📚 为了让这个例子简短而不是一大块代码，每个读书俱乐部只有一个成员。一个会员当前正在阅读几本书，在`books`数组中表示！

![image](https://user-images.githubusercontent.com/23453305/120883095-da0b9a00-c60d-11eb-919e-75531c5ef6fe.png)

现在，我们正在寻找一本 `id` 为 `ey812` 的书。为了找到它，我们可能只使用嵌套的 `for` 循环或`forEach`帮助器，但这意味着即使在找到我们正在寻找的团队成员之后，我们仍然会遍历数据！

生成器的绝妙之处在于，除非我们告诉它，否则它不会继续运行。这意味着我们可以评估每个返回的项目，如果它是我们正在寻找的项目，我们就不会调用`next!`， 让我们看看它会是什么样子。

首先，让我们创建一个生成器来遍历`books`每个团队成员的数组。我们将团队成员的book数组传递给函数，遍历数组，并产生每本书！

![image](https://user-images.githubusercontent.com/23453305/120883252-be54c380-c60e-11eb-8a7e-028d09a4ffd7.png)

现在我们必须准备一个迭代`clubMembers`数组的生成器。我们并不真正关心俱乐部成员本身，我们只需要遍历他们的书。在`iterateMembers`生成器中，让我们委托`iterateBooks`迭代器来生成他们的书！

![image](https://user-images.githubusercontent.com/23453305/120883332-286d6880-c60f-11eb-84d6-5cb3d92df8a4.png)

差不多好了！最后一步是遍历书友会。就像在前面的例子中一样，我们并不真正关心书友会本身，我们只关心俱乐部成员（尤其是他们的书）。让我们委托`iterateClubMembers`迭代器并将`clubMembers`数组传递给它。

![image](https://user-images.githubusercontent.com/23453305/120883336-2f947680-c60f-11eb-85e1-9f5526cad0d4.png)

为了遍历所有这些，我们需要通过将`bookClub`数组传递给`iterateBookClubs`生成器来使生成器对象可迭代。对于迭代器，我现在只调用生成器`it`对象。

![image](https://user-images.githubusercontent.com/23453305/120883407-8d28c300-c60f-11eb-8fc3-a8601f20740a.png)

让我们调用这个`next`方法，直到我们得到一本带有 `id`为 `ey812` 的书。

![72ghm4ev6el3no9esk1l](https://user-images.githubusercontent.com/23453305/120883435-bfd2bb80-c60f-11eb-8da2-1899ffe32cf0.gif)

好的！我们不必遍历所有数据来获得我们正在寻找的书。相反，我们只是按需查找数据！当然，`next`每次都手动调用方法效率不高……所以我们来做一个函数吧！

让我们将传递一个`id`给函数，它是我们要查找的书的 `id`。如果`value.id`是我们正在寻找的 `id`，那么只需返回整个`value`（书对象）。否则，如果`id`不正确，再次调用`next`！

![image](https://user-images.githubusercontent.com/23453305/120883523-45566b80-c610-11eb-824a-1794e2a89a9c.png)

![x1zh0ygt5yfq5vb2f5at](https://user-images.githubusercontent.com/23453305/120883553-6919b180-c610-11eb-8a78-404406e55b76.gif)

当然，这是一个很小的数据集。但是想象一下，我们有大量的数据，或者我们需要解析传入流而仅查找一个值。通常，我们必须等待整个数据集准备就绪，才能开始解析。使用生成器函数，我们可以简单地要求小块数据，检查这些数据，并且只有在我们调用该`next`方法时才会生成值！

【完】