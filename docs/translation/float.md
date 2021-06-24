# 将元素浮动到底角

**文章来源**：[Float an Element to the Bottom Corner](https://css-tricks.com/float-an-element-to-the-bottom-corner/?utm_source=CSS-Weekly&utm_campaign=Issue-456&utm_medium=web)

### 前言
是否需要在右侧或左侧布置元素，以使**文字环绕**（如何用**float**实现文字环绕）？对于**float**特性来说，这是一件容易的事。但是，如果您还想在我们处于该位置时将该元素（我们称其为图像）推到某个底角，该怎么办？听起来有点棘手，对不对？我们是否需要JavaScript呢？

不，几行（很骚的）CSS可以做到！这是仅CSS的解决方案，无论大小和内容如何，​​它都将使图像固定在底角。

### 工作原理（code）

调整wrapper元素的大小，然后查看工作原理：
```html
<h1>Resize the below div!</h1>

<div class="wrapper">
  <div class="box">
    <div class="float"><img src="https://picsum.photos/id/1/100/100" ></div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in dui quis orci ultricies aliquet nec sed enim. Mauris id rutrum nulla, et ornare leo. Donec aliquet malesuada tellus, eu laoreet lectus tincidunt ut. Quisque lacus magna, interdum eu urna ac, aliquet gravida orci. Pellentesque gravida urna sit amet nulla suscipit, at venenatis lorem dignissim. Morbi quis nunc eu velit condimentum ornare. Curabitur finibus tincidunt ullamcorper. Pellentesque tincidunt et odio vitae tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu dapibus dui. Ut semper sed enim ut vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae elit eget velit porttitor consequat nec sed turpis. Proin libero nisl, egestas hendrerit vulputate et, lobortis non nulla. Aenean dui libero, dictum vel nibh eget, tristique egestas enim.
  </div>
</div>
```

```css
.wrapper {
    display:flex;
    border:1px solid;
    overflow: hidden;
    resize: horizontal;
    margin-bottom:100px;
}
.box {
    text-align:justify;
    font-size:20px;
}
.float {
    float:right;
    height:100%;
    margin-left:15px;
    display:flex;
    align-items:flex-end;
    shape-outside:inset(calc(100% - 100px) 0 0);
}
```
![image](https://user-images.githubusercontent.com/23453305/115809621-07660500-a41f-11eb-8760-64b3a82b6755.png)

我们来剖析一下代码。

我们需要一个wrapper元素来包含所有内容，并且在其上使用flexbox。Flexbox允许我们依靠默认stretch对齐方式以便以后使用height: 100%。

```html
<div class="wrapper">
  <div class="box">
    <div class="float"><img></div>
    Lorem ipsum dolor ...
  </div>
</div>
```
```css
.wrapper {
  display: flex;
}

.float {
  float: right;
  height: 100%;
  display: flex;
  align-items: flex-end;
  shape-outside: inset(calc(100% - 100px) 0 0);
}
```

该`.box`是`.wrapper`范围内的弹性元素。我们不需要将任何特定的CSS应用于该框。它定义了`.wrapper`的高度，并同时拉伸到相同的高度。这种行为将为我们提供一个可由子元素使用的“参考高度”。

我们来看下说明：

> If the flex item has align-self: stretch, redo layout for its contents, treating this used size as its definite cross size so that percentage-sized children can be resolved.

关键字是**definite** ，它使我们能够安全地在box元素内使用百分比（％）高度。

### 浮动元素

由于我们在上面详细介绍了高度计算，我们的.float元素将占据文本内容旁边的 整个 高度。在此元素内，我们使用flexbox对齐将图像推到底部。
![image](https://user-images.githubusercontent.com/23453305/115811164-ce7b5f80-a421-11eb-9b74-dc2cb6a1d12a.png)

现在使用**shape-outside**属性来进行真正的骚操作。首先关于其MDN定义：

> `shape-outside` CSS属性定义一个形状（可以是非矩形的），相邻的内联内容应围绕该形状包裹。默认情况下，内联内容环绕其边距框包裹；`shape-outside`提供了一种自定义这种换行的方法，从而可以将文本换行到复杂的对象而不是简单的盒子周围。

换句话说，`shape-outside`属性设置决定内容在元素边界框周围流动的方式。

它有多个值。其中之一是`inset()`，再来看看MDN的定义：

> 定义一个插入矩形。首先提供的四个自变量表示从参考框向内的顶部，右侧，底部和左侧偏移，这些偏移定义了插入矩形边缘的位置。

因此，`shape-outside: inset(calc(100% - X) 0 0)`，我们可以创建一个插入矩形，该矩形恰好在图像的顶部开始。顶部等于100% - X，其中X是图像高度，100%是.float元素的高度。这允许文本在图像顶部的自由空间内换行。这是响应式的，而且我们可以轻松地在左右之间切换（通过调整float属性）

就是这样！唯一需要注意的是，您需要知道图像的高度。

### 想知道更多？
我们可以进一步扩展这个概念，以解决更复杂的情况。例如，我们先将图像浮动到右侧，再使用`justify-content: center;`将其固定在框的中间，还可以通过将`shape-outside`从`inset(calc(100% - X) 0 0)` 修改为`inset(calc(50% - X/2) 0 0)`将插入的矩形调整到中间

```css
.float {
    float:right;
    height:100%;
    margin-left:15px;
    display:flex;
    align-items:center;
    shape-outside:inset(calc(50% - X/2) 0 0);
}
```

【完】