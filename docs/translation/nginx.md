# 我希望我早点认识Nginx

**文章出处：** [Nginx concepts I wish I knew years ago](https://dev.to/aemiej/nginx-concepts-i-wish-i-knew-years-ago-23o0)

> Nginx是一种Web服务器，用来作反向代理，负载均衡，邮件代理和HTTP缓存，且遵循主从结构。

哇！真是一个复杂的术语，一个令人困惑的定义，里面充斥着许多令人困惑的字眼，是不是？不过不用担心，首先，我会帮助您了解Nginx中的基本体系和术语。然后，我们将继续学习Nginx的创建安装和配置。

![image](https://user-images.githubusercontent.com/23453305/112427731-08027180-8d75-11eb-9396-e200f62fc22a.png)

为了使事情变得简单，只需记住：**Nginx是一个了不起的Web服务器。**

简单来说，Web服务器就像一个中间人。举例来说，您要访问dev.to，输入地址：https://dev.to。 浏览器会找到该地址的Web服务器，Web服务器再定位到后端服务器，后端服务器响应返回给客户端。

### 代理与反向代理

#### 代理

> 也叫正向代理

好了，我们有客户端（> = 1），中间Web服务器（可称为代理）和服务器。其中主要问题是服务器不知道哪个客户端正在请求，让我用示意图来解释。


![image](https://user-images.githubusercontent.com/23453305/112429193-4dc03980-8d77-11eb-8bde-29df844cbc77.png)

这种情况下，如果client1和client2通过代理服务器将请求request1和request2发送给服务器。后端服务器会执行相关操作，但并不知道request1是由client1还是client2发送的。


#### 反向代理

简单来说，反向代理与正向代理的作用相反。我们假设有一个客户端，一个中间Web服务器和几个后端服务器（> = 1）。我们来看看示意图

![image](https://user-images.githubusercontent.com/23453305/112429662-e656b980-8d77-11eb-8683-8e32abb0a7ca.png)

这种情况下，客户端将通过Web服务器发送请求。Web服务器会通过循环机制算法定向到众多后端服务器中的任何一个，后端服务器再将响应通过Web服务器发送回客户端。因此此时，客户端并不知道与之交互的是哪个后端服务器。

#### 负载均衡

另一个新术语，但是这个术语更容易理解，因为它是反向代理的一个应用实例。

首先来谈谈**负载均衡**和**反向代理**的基本区别：在负载均衡中，您必须具有2个或更多后端服务器，但是在反向代理设置中，这不是必需的，它甚至可以与1台后端服务器一起使用。

从幕后看一下，如果我们有来自客户端的大量请求，负载均衡器将检查每个后端服务器的状态并分配请求的负载，然后将响应更快地发送给客户端。
 
#### 有状态与无状态应用程序
伙计们，我保证我会马上开始Nginx代码，我们先清除所有疑惑！

* 有状态的应用
此应用程序存储一个附加变量，用于保存仅可用于单个服务器实例的信息。

我的意思是，假如为后端服务器server1存储了某些信息，不为服务器server2存储某些信息，那么客户端（在此为Bob）与后端服务器进行交互的时候可能不会获得所需的结果，因为它可能与server1或server2其中任何一台服务器进行交互。在这种情况下，server1允许Bob查看配置文件，而server2不允许。因此，尽管服务器阻止了数据库许多API 的调用并且速度更快，也可能在不同服务器之间导致此问题。

（有点懵这里，看一下知乎上的解答 ———— [什么是有状态应用 or 无状态应用（专业版）](https://zhuanlan.zhihu.com/p/65762125)）

* 无状态应用
无状态是客户端与不同的后端服务器进行交互时时数据库中更多的API调用，但更少的问题会出现。

![image](https://user-images.githubusercontent.com/23453305/112433868-cf1aca80-8d7d-11eb-8849-c7f4573512e6.png)

我知道你不明白我的意思。很简单，如果我从客户端发起请求，请求通过Web服务器发送到后端服务器server1，后端服务器将向客户端提供令牌，以用于进一步的访问请求。客户端可以使用令牌将请求发送到Web服务器，Web服务器会继续将请求连同令牌一起发送到任何后端服务器，每个服务器都将提供相同的期望返回。

### 什么是Nginx？
Nginx是Web服务器，我一直在整个博客中使用术语Web服务器。老实说，它就像一个中间人。

![image](https://user-images.githubusercontent.com/23453305/112434570-b4952100-8d7e-11eb-9060-8488a2296d92.png)

该图是所有我前面解释概念的组合。

如图，我们在3001，3002，3003端口分别运行3台后端服务器，这些后端服务器使用相同的数据库并在端口5432上运行。

现在，当一个客户端发送一个请求GET` /employees`到 https://localhost。   （端口默认为443）这个请求会基于算法到达任何一台后端服务器，获取数据库中的信息，以JSON格式发送回Web服务器（Nginx）并返回给客户端。

如果我们使用诸如Round-Robin之类的算法，那么它的作用是：假设客户端2发送了一个请求到地址 https://localhost。 Nginx服务器首先将该请求传递给端口3000，然后将响应发送回客户端。对于另一个请求，Nginx会将请求传递给3002，依此类推。

到此为止，您已经对Nginx是什么，Nginx的基本术语有了清楚的了解。现在，我们将继续了解其安装和配置方法。

#### 安装过程

老实说，在任何系统上安装过程都非常简单。我是Mac OSX用户，因此将基于它编写命令。但是，对于ubuntu和Windows以及其他Linux发行版，将类似地进行。

~~~
$ brew install Nginx
~~~

检查Nginx是否在您的系统上运行
~~~
$ nginx 
# OR 
$ sudo nginx
~~~

使用您喜欢的浏览器并打开 http://localhost:8080/。 您将看到下面的屏幕！
![image](https://user-images.githubusercontent.com/23453305/112439999-bd88f100-8d84-11eb-9c7e-a034794371b5.png)

#### 基本配置设置和示例
我们将做一个例子，看看Nginx的魅力。
首先，在本地计算机上创建目录结构，如下所示：
```
.
├── nginx-demo
│  ├── content
│  │  ├── first.txt
│  │  ├── index.html
│  │  └── index.md
│  └── main
│    └── index.html
└── temp-nginx
  └── outsider
    └── index.html
```
* 我们要实现什么？

在这里，我们有两个单独的文件夹nginx-demo和temp-nginx，每个文件夹都包含静态HTML文件。我们将在公共端口上运行这两个文件夹，并设置我们喜欢的规则。

为了对Nginx的默认配置进行更改，我们找到位于`usr/local/etc/nginx`一个文件`nginx.conf`。我的系统中有vim，因此我可以使用vim进行更改，但是您可以自由使用其他编辑器。

~~~
$ cd /usr/local/etc/nginx
$ vim nginx.conf
~~~

这将打开一个我真的不想使用的具有默认nginx配置的文件。因此，我通常的做法是复制此配置文件，然后对主文件进行更改。我们也会做同样的事情。

~~~
$ cp nginx.conf copy-nginx.conf
$ rm nginx.conf && vim nginx.conf 
~~~

* 现在将打开一个空文件，我们将为其添加配置。

1. 添加基本配置。`events {} ` 通常用于表示Nginx体系的工作事件数量。在http这里用来告诉Nginx，我们将在OSI模型的第7层工作。

在此，我们告诉nginx监听端口5000，并指向主文件夹中提到的静态文件。

```js
  http {

     server {
       listen 5000;
       root /path/to/nginx-demo/main/; 
      }

  }

  events {}
```
2. 接下来，我们将为`/content`和`/outsider` URL添加其他规则，其中，`outsider`将指向第一步中提到的根目录之外的目录。

此处`location /content`表示无论我在子目录中为此定义哪个根，`content`子URL都将添加到所定义的根URL的末尾。因此，这里我指定根为`root/path/to/nginx-demo/`，只是意味着我要告诉Nginx，http://localhost:5000/path/to/nginx-demo/content/ 向我展示文件夹中静态文件的内容。

```js
  http {

    server {
        listen 5000;
        root /path/to/nginx-demo/main/; 

        location /content {
            root /path/to/nginx-demo/;
        }   

        location /outsider {
           root /path/temp-nginx/;
        }
   }

  }

  events {}
```
**现在Nginx不仅可以定义URL根，而且还可以设置规则，以便阻止客户端访问某些文件。**
3. 我们将在定义的主服务器中编写一条附加规则，以阻止访问任何.md文件。我们可以在Nginx中使用正则表达式，因此我们将规则定义如下：
```js
   location ~ .md {
        return 403;
   }
```
4. `proxy_pass`：我们定义在端口8888上运行的另一个后端服务器，现在我们有2个在端口5000和8888上在运行后端服务器。

我们要做的是，当客户端通过Nginx访问端口8888时，我们会将请求传递到端口5000，并将响应发送回客户端！

```js
   server {
       listen 8888;

       location / {
           proxy_pass http://localhost:5000/;
       }

       location /new {
           proxy_pass http://localhost:5000/outsider/;
       }
  }
```
#### 完整代码
```js
   http {

        server {
            listen 5000;
            root /path/to/nginx-demo/main/; 

            location /content {
                root /path/to/nginx-demo/;
            }   

            location /outsider {
               root /path/temp-nginx/;
            }

                    location ~ .md {
              return 403;
            }
       }

         server {
           listen 8888;

           location / {
               proxy_pass http://localhost:5000/;
           }

           location /new {
               proxy_pass http://localhost:5000/outsider/;
           }
      }

   }

   events {}
```

### 其他Nginx命令！
* 首次启动Nginx Web服务器。
~~~
  $ nginx 
  #OR 
  $ sudo nginx
~~~
* 重新加载正在运行的Nginx Web服务器。
~~~
  $ nginx -s reload
  #OR 
  $ sudo nginx -s reload
~~~
* 停止正在运行的Nginx Web服务器。
~~~
$ nginx -s stop
  #OR 
$ sudo nginx -s stop
~~~
* 要了解Nginx的哪些进程正在您的系统上运行。
~~~  
$ ps -ef | grep Nginx
~~~
第四个命令很重要，当前三个命令可能导致错误时，通常可以使用第四个命令查找所有正在运行的Nginx进程并杀死该进程，然后重新启动它。

* 要终止进程，您需要使用PID，可以使用以下命令终止它：
~~~
$ kill -9 <PID>
#OR 
$ sudo kill -9 <PID>
~~~

【完】