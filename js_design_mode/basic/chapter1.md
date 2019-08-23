## <font color=blue>第一部分：基础知识</font>
### 第一章 面向对象的JavaScript

#### 1. 动态类型语言和鸭子类型
静态类型语言在编译时便已确定变量的类型，而动态类型语言的变量类型要到程序运行的时候，待变量被赋予某个值之后，才会具有某种类型。
```
int a = 1 //静态类型语言
var a = 1 //动态类型语言
```
鸭子类型： 只关注对象的行为，而不关注对象本身。

#### 2.多态
多态的含义： 同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。

```
var makeSound = function( animal ) {
    if( animal instanceof Duck ) {
        console.log("嘎嘎嘎")
    }else if( animal instanceof Chicken ) {
        console.log("咯咯咯")
    }
};

var Duck = function() {};
var Chicken = function() {};

makeSound( new Duck() );
makeSound( new Chicken() );
```
<font color=red>多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事务”分离开来。</font>

“一只麻雀在飞”或“一直喜鹊在飞” ---> “一只鸟在飞”

#### 3.封装

JavaScript只能依赖变量的作用域来实现封装特性，而且只能模拟出public和private这两种封装性。

“透明” == “不可见”

#### 4.原型模式和基于原型继承的JavaScript对象系统
> 在原型编程的思想中，类并不是必须的，对象未必需要从类中创建而来，一个对象是通过克隆另外一个对象所得到的。

原型编程规范至少包括以下基本规则：

- 所有的数据都是对象。
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
- 对象会记住它的原型。
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。


<font color=red>JavaScript中的根对象是```Object.prototype```对象。</font>

```
function Person( name ){
    this.name = name;
};

Person.prototype.getName = function() {
    return this.name;
};

var a = new Person( 'sven' );

console.log( a.name ); //输出sven
console.log( a.getName() ); //输出：sven
console.log( Object.getPrototypeOf(a) === Person.prototype ); //输出：true
```
在这里Person并不是类，而是函数构造器，JavaScript的函数既可以作为普通函数被调用，也可以作为构造器被调用。

> 就JavaScript的真正实现来说，其实并不能说对象有原型，而只能说对象的构造器有原型。对于“对象把请求委托给它自己的原型”这句话，更好的说法是对象把请求委托给他的构造器的原型。

<font color=red>JavaScript给对象提供了一个名为 —proto— 的隐藏属性，某个对象的 —proto— 属性默认会指向它的构造器的原型对象，即```{Constructor}.prototype```。</font>

<b>可以通过```Object.create( null )```可以创造出没有原型的对象</b>。