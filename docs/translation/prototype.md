# 可视化的JavaScript —— （五）原型继承【5.30】

【五】[JavaScript Visualized: Prototypal Inheritance](https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co)

有没有想过，为什么我们的字符串，数组或对象可以使用JavaScript内置的方法，例如`.length`，`.split()`，`.join()`？我们从未明确指定它们，它们来自哪里？现在不要说“这是 **JavaScript**固有机制，没人知道，它很神奇🧚🏻‍♂️”，实际上是因为一种叫做原型继承的东西。它非常棒，而且你使用它的频率比你意识到的要多！

我们经常需要创建许多相同类型的对象。假设我们有一个网站，人们可以在其中浏览狗狗！

对于每只狗狗，我们都需要获取代表那只狗狗的对象！🐕 不是每次都写一个新对象，我将使用一个构造函数（我知道你在想什么，我稍后会介绍 ES6 类！）从中我们可以使用关键字`new`创建 `Dog`实例（这篇文章不是真的要解释构造函数，所以我不会谈论太多）。

每只狗狗都有名字、品种、颜色和吠叫的功能！

![image](https://user-images.githubusercontent.com/23453305/120296586-dbca1a80-c2fa-11eb-9647-aa8fc0cbd29e.png)

当我们创建`Dog`构造函数时，它并不是我们创建的唯一对象。我们还自动创建了另一个对象，即原型对象！默认情况下，此对象包含一个构造函数属性，`Dog`在这种情况下，它只是对原始构造函数的引用。

![9howj4i3zvlgun3svppp](https://user-images.githubusercontent.com/23453305/120297073-52671800-c2fb-11eb-8e73-cca62e4af6a5.gif)

`Dog`的构造函数属性`prototype`是不可枚举的，这意味着它不会显示出来，当我们试图访问该对象的属性。但它是存在的！

好的.. 为什么我们会有这个属性对象？首先，让我们创建一些我们想要展示的`Dog`。为简单起见，我将它们称为`dog1`和`dog2`。`dog1`是黛西，一只可爱的黑色拉布拉多！`dog2`是杰克，无所畏惧的白人杰克罗素😎

![image](https://user-images.githubusercontent.com/23453305/120297930-2c8e4300-c2fc-11eb-920c-ede79453afad.png)

让我们输出`dog1`到控制台，并展开查看它的属性！

![tt4yfoz8ckmxfofv3f9v](https://user-images.githubusercontent.com/23453305/120298315-8f7fda00-c2fc-11eb-95ff-3e4627875c62.gif)

我们看到了我们添加的属性，比如`name`, `breed`, `color`, 和`bark`.. 但是哇，那个`__proto__`属性是什么！它是不可枚举的，这意味着当我们尝试获取对象的属性时，它通常不会出现。让我们展开它！

![dye57pcku5cfaz0er60c](https://user-images.githubusercontent.com/23453305/120298328-93136100-c2fc-11eb-817e-3d67c8984680.gif)

哇！它看起来和`Dog.prototype`一模一样。`__proto__`是对`Dog.prototype`对象的引用。这就是原型继承的全部内容：构造函数的每个实例都可以访问构造函数的原型！

![t6kiav029gl2e0hv1xct](https://user-images.githubusercontent.com/23453305/120299540-ab37b000-c2fd-11eb-8ee1-a2b0a6b349b9.gif)

那为什么这很酷？有时我们拥有所有实例共享的属性。例如本例中的`bark`函数：每个实例都完全相同，为什么每次创建新`Dog`时都要创建一个新函数，每次都消耗内存？相反，我们可以将它添加到`Dog.prototype`对象中！

![59nlnyqioosaowj09xn8](https://user-images.githubusercontent.com/23453305/120300361-6fe9b100-c2fe-11eb-8646-16862057d05d.gif)

每当我们尝试访问实例上的属性时，引擎首先在局部作用域搜索以查看该属性是否在对象本身上定义。然而，如果它找不到我们试图访问的属性，引擎就会通过属性`__proto__`沿着原型链继续查找！

![fabyyjot1s78mttyzzk8](https://user-images.githubusercontent.com/23453305/120300362-6fe9b100-c2fe-11eb-8139-cd6b3c5121bd.gif)

现在这只是一个步骤，它可以包含多个步骤！如果您持续跟进，您可能已经注意到，当我展开`__proto__`显示`Dog.prototype`时. `Dog.prototype`本身是一个对象，这意味着它实际上是`Object`构造函数的一个实例！这意味着`Dog.prototype`它还包含一个`__proto__`属性，它指向`Object.prototype`!

![8vk5w6loliot818f2lcd](https://user-images.githubusercontent.com/23453305/120301841-dc18e480-c2ff-11eb-9bc2-9f4a617f2a23.gif)

最后，我们对所有内置方法的来源有了一个答案：它们在原型链上！

例如`.toString()`方法:

它是在`dog1`对象上局部定义的吗？嗯没有...

它是否定义在对象上`dog1.__proto__`引用的对象上，即`Dog.prototype`？也没有！

是否定义在`Dog.prototype.__proto__`引用的对象上，即`Object.prototype`？是的。

![fpt5nndkbq5kau0nqeqj](https://user-images.githubusercontent.com/23453305/120302329-606b6780-c300-11eb-820f-a6634abe604a.gif)

我们刚刚使用了构造函数 `( function Dog() { ... })`，它仍然是有效的 JavaScript。然而，ES6 实际上为构造函数和原型引入了一种更简单的语法：类！

> 类只是构造函数的语法糖。一切仍然以同样的方式工作！

我们用`class`关键字编写类。一个类有一个`constructor`函数，基本上就是我们用ES5语法写的构造函数！我们要添加到原型中的属性是在类主体本身上定义的。

![qnbqubcipqjl5pb3i8ds](https://user-images.githubusercontent.com/23453305/120302998-01f2b900-c301-11eb-8167-b6b962dec46e.gif)

类的另一个好处是我们可以轻松扩展其他类。

假设我们要展示几只相同品种的狗狗，即吉娃娃！吉娃娃仍然是一只狗狗。为了让这个例子保持简单，我现在只将`name`属性传递给 `Dog` 类，而不是`name`,`breed`和`color`。但是这些吉娃娃也可以做一些特别的事情，它们的吠声很小。除了说`Woof`!，吉娃娃还可以说`Small woof`!🐕

在扩展类中，我们可以使用`super`关键字访问父类的构造函数。父类的构造函数期望传给子类的参数，在这种情况下，我们必须传递给`super:name`。

![image](https://user-images.githubusercontent.com/23453305/120303941-e50ab580-c301-11eb-9594-316317a3b167.png)

`myPet`可以访问`Chihuahua.prototype`和` Dog.prototype`（并且自动访问`Object.prototype`，因为`Dog.prototype`是一个对象）。

![qija16dju8t5j1ksy0ps](https://user-images.githubusercontent.com/23453305/120304149-1a170800-c302-11eb-85bc-ccf766ce2eef.gif)

由于`Chihuahua.prototype`有`smallBark`功能，`Dog.prototype`有`bark`功能，我们就可以同时访问`smallBark`和`bark`上`myPet`！

现在你可以想象，原型链不会永远持续下去。最终有一个原型等于null的`Object.prototype`对象：在这种情况下的对象！如果我们尝试访问在局部作用域或原型链上找不到的属性，则会返回undefined。

![image](https://github.com/xszi/frontend-translation-stat/blob/main/proto.gif)

虽然我在这里用构造函数和类解释了一切，但另一种向对象添加原型的方法是`Object.create`方法。使用此方法，我们创建了一个新对象，并且可以准确指定该对象的原型应该是什么！💪🏼

我们通过将现有对象作为参数传递给`Object.create`方法来做到这一点。传入对象就是我们创建的对象的原型！

![image](https://user-images.githubusercontent.com/23453305/120305012-dffa3600-c302-11eb-804c-8e28a87f58f7.png)

让我们输出刚刚创建的对象`me`。

![6zzt8zpy85gtitxmpwi9](https://user-images.githubusercontent.com/23453305/120305334-35364780-c303-11eb-9811-7ba72cb73706.gif)

我们没有向`me`对象添加任何属性，它只包含不可枚举的`__proto__`属性！`__proto_`_属性保存我们定义为原型对象的引用：`person`对象，它具有一个name和一个age属性。由于`person`也是一个对象，`person`对象上的__proto__属性值是`Object.prototype`（但为了更容易阅读，我没有在 gif 中展开该属性！）

【完】