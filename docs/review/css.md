# css备忘
## 1. 超出省略和换行显示

强制不换行
```js
p { 
    white-space: nowrap; 
}
```

自动换行
```js
p { 
    word-wrap: break-word;
}
```

强制英文单词断行
```js
p { 
    word-break: break-all;
}
```
**注意**：设置强制将英文单词断行，需要将行内元素设置为块级元素。

超出显示省略号
```js
p { 
    text-overflow: ellipsis;
    overflow: hidden;
}
```
显示n行，多余n行省略号表示
```js
overflow: hidden
text-overflow: ellipsis
display: -webkit-box
-webkit-line-clamp: n
-webkit-box-orient: vertical
```

## 2. CSS规范：

2.1 CSS声明按照一定的逻辑顺序来书写

* 如果包含了 content属性，则应该最优先书写，即写到声明块的最上面。
* 定位相关的属性，比如position、top、left、z-index、display、float、visibility和overflow、flex等。
* 布局相关的属性，比如display、float、visibility、overflow、flex和clear等。
* 盒模型相关的属性，比如width、height、margin、padding、border以及box-sizing等。
* 文本排版印刷相关的属性，比如font、line-height、vertical-align、text-align和white-space、text-decoration等。
* 视觉感官上相关的属性，比如color、background、list-style、transform、transition和animation等。

每写一种类型应该换行，且加个注释
```js
.box {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
 
    /* Layout */
    display: block;
    float: right;
 
    /* Box-model */
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
 
    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    text-align: center;
 
    /* Visual */
    color: #333;
    background-color: #f5f5f5;
}
```
2.2 其他规范

* 尽量不要使用 !important

(如果真的需要提高某个选择器的优先级，可以通过增加样式的层级来达到这个目的。)

```js
/* Not recommended */
.heavy { font-weight: 700 !important; }
 
/* Recommended */
.heavy p,
.heavy a { font-weight: 700; }
```

* 属性值为0的时候，不要带单位。
```js
/* Not recommended */
.info-item { padding: 0px 10px; }
 
/* Recommended */
.info-item { padding: 0 10px; }
```
* 当可能的时候尽量使用三位的十六进制计数法，比如表示颜色的时候。
```js
/* Not recommended */
.pink-color { color: #ff33aa; }
 
/* Recommended */
.pink-color { color: #f3a; }
```
* font-weight使用数值化表示方法，用400代替 normal、700代替 bold。
```js
/* Not recommended */
.heavy { font-weight: bold; }
 
/* Recommended */
.heavy { font-weight: 700; }
```
* line-height尽量不要带单位，除非必须用px来标定。
```js
/* Not recommended */
.content p { line-height: 1.2em; }
 
/* Recommended */
.content p { line-height: 1.2; }
```
* 当属性值是介于0到1之间的小数时，可以直接把0省略。
```js
/* Not recommended */
.pannel { opacity: 0.8; }
 
/* Recommended */
.pannel { opacity: .8; }
```