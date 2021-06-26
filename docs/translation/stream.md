# NodeJS 流的可视化指南

**文章出处：** [A Visual Guide to NodeJS Streams](https://blog.insiderattack.net/a-visual-guide-to-nodejs-streams-9d2d594a9bf5)

想象一下，你在某处有一堆砖。你想在这里用这些砖砌一堵墙。假设您有一位朋友帮助搬砖。开始构建，您现在有两个选择。你可以等你的朋友把整堆砖都搬过来再开始，或者你也可以在你有几块砖就开始建造，而你的朋友不断带来更多的砖块。

哪个效率更高？**显然，一旦您有几块砖头，就可以高效地开始构建。**这是使用“流”（在本例中为砖流）来提高流程效率的经典示例。您可能非常熟悉的另一个常见示例是流式传输电影，而不是先下载整部电影然后观看。

[维基百科说](https://en.wikipedia.org/wiki/Stream_(computing))，

> 在计算机科学中，**流**是随时间可用的一系列数据元素。流可以被认为是传送带上一次处理一个而不是大批量的项目。

在 NodeJS 中，`stream`模块提供了处理流的能力。即使您没有明确使用`stream`模块，NodeJS 应用程序中也有许多使用流的底层功能。“Streams”是一个简单的概念，但如果您不熟悉它，它可能听起来非常复杂。因此，我想到了在可视化中描述NodeJS流中的几个关键概念，以便于理解。



## 水流，信息流

信息就像一种液体。它以比特流的形式从一个地方流向另一个地方。例如，当两个对等点通过网络相互交流时，甚至当您的应用程序正在与磁盘或外围设备通信时，就会发生这种情况。当这样的 I/O 操作发生时，信息从设备读取并流向应用程序，反之亦然。

但是，由于各种原因，上述事务的一端可能比另一端慢。因此，一些数据可能需要在中间进行“缓冲”，而接收端已准备好接受更多数据。

看看下图，两个不同尺寸的水龙头通过一个水箱连接。来自上游的水流量高于下游可以消耗的流量。因此，水箱必须暂时储存（“缓冲”）多余的水，而下游慢慢消耗。

![s1.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s1.png?raw=true)

这是 NodeJS 中流的基本思想。`stream`模块提供了在处理流数据时实现此行为的功能。NodeJS 提供了两种基本类型的流。

它们是：

* 可读流
* 可写流

但是，还有两种附加类型的流，它们是可读流和可写流的混合体，用于特殊目的。

- 双工流
- 转换流

让我们深入了解更多细节，并尝试将其中的每一个可视化。



## 可读流

可读流可用于从底层源（例如文件描述符）读取数据。`Buffer`如果应用程序消耗的速度比操作系统从源读取的速度慢，则数据可以存储在可读流中。

![s2.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s2.png?raw=true)

NodeJS 中最常见的可读流是`process.stdin`,`fs.createReadStream`和`IncomingMessage`等一些 HTTP 服务器中的对象。



## 可写流

可写流用于将数据从应用程序写入特定目的地。在目的地比写入应用程序慢的情况下，为了防止数据丢失或目的地过载，数据可能存储在内部`Buffer`.

![s3.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s3.png?raw=true)

您可能每天使用的最常见的可写流`process.stdout`是在`console.log`. 除此之外，NodeJS 中另外两个非常常见的可写流是`process.stderr`和`fs.createWriteStream`



## 双工流

正如我之前提到的，双工流是可读流和可写流的混合体。连接到双工流的应用程序可以读取和写入双工流。双工流的最常见示例是`net.Socket`. 在双工流中，读和写部分是独立的，有自己的缓冲区。

![s4.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s4.png?raw=true)



## 转换流

转换流甚至是一种特殊的混合体，其中可读部分以某种方式连接到可写部分。一个常见的例子是使用`Cipher`类创建的加密流。在这种情况下，应用程序将纯数据写入流并从同一流中读取加密数据。

![s5.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s5.png?raw=true)

可能最简单的转换流是`PassThrough`，其中输入数据只是作为输出传递而不进行任何转换。虽然这听起来很琐碎，但我已经多次使用它来实现带有流的自定义行为。



## 管道流

在许多情况下，流连接在一起时甚至更有用。听起来很明显，这被称为“管道”。您可以使用 Readable 流的`pipe()`方法将 Readable 流连接到另一个 Writable/Duplex 或 Transform 流。

![s6.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s6.png?raw=true)

这方面的一个简单的例子是将通过管道的一个文件从一个地方复制到另一个地方`fs.createReadStream()`到一个`fs.createWriteStream()`。



## 使用流复制数据

关于管道的一个有趣事实是，您可以多次管道同一个流。这在您需要两次读取同一个流的情况下非常有用。在另一个使用者完全读取可读流后，您如果要再次读取它是很棘手的。然而，你可以管道多次读取可读流，多个消费者可以通过从原始可读流复制数据来读取同一个流。

看看下面的简单例子，我们创建了`original.txt`文件的两个副本。

```js
const fs = require('fs')

const original = fs.createReadStream('./original.txt')
const copy1 = fs.createWriteStream('./copy1.txt')
const copy2 = fs.createWriteStream('./copy2.txt')

original.pipe(copy1)
original.pipe(copy2)
```

上面的程序可以可视化如下：

![s7.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s7.png?raw=true)



## 背压

让我们回过头来回顾一下我们的水箱比喻。在这个类比中，上游流量的速度高于下游可以消耗的速度。在这种情况下，水箱的水位会不断上升，直到在某个时刻溢出并浪费水。

如果我们可以“检测到”它会发生并让上游知道停止流动怎么办？我们可以将水箱标记在最高水位以下，并在水位上升到标记以上时要求上游停止。

![s8.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s8.png?raw=true)

这与流的工作方式非常相似。虽然 Readable 和 Writable 流可以在内部缓冲数据，但它们可以缓冲的数据量受系统总可用内存的限制。因此，流有一个阈值`highWaterMark`，可用于检测数据传入流的速率是否远高于数据从流中清除的速率。

例如，当可读流通过管道传输到可写流时，如果可写流的缓冲区填充超过`highWatermark`.

![s9.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s9.png?raw=true)

虽然`highWaterMark`不是硬限制而只是一个阈值，但在构建自定义流时遵守该阈值很重要，以避免数据丢失或不受欢迎的内存使用。您可以[在官方文档中](https://nodejs.org/api/stream.html#stream_buffering)阅读有关此内容的更多信息。



## 让我们把它们放在一起

到目前为止，我们讨论了不同类型的流以及如何使用它们。现在让我们尝试将它们放在一起并可视化一个现实生活中的例子。

以下是我前段时间构建的一个简单图像服务的设计。在此服务中，从 S3 存储桶中检索图像，并将其作为调整大小的图像提供给最终用户。

![s10.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s10.png?raw=true)

如果我们在没有流的情况下构建它，我们将从 S3 存储桶中获取整个文件并将其保存在内存中，立即调整整个图像的大小，然后将调整后的图像发送给最终用户。

但是，使用流，我们可以以非常有效的方式链接上述过程，以提高速度并优化应用程序中的内存使用。

由于来自 S3 存储桶的数据流是可读流，因此我们可以直接将其通过管道传输到调整大小的转换流。由于转换流也是可读的，我们可以直接将其通过管道传输到响应流，以便调整来自 S3 存储桶的数据块的大小并将其发送给用户，而无需等待来自 S3 存储桶的整个文件。

![s11.png](https://github.com/xszi/docs/blob/master/docs/translation/images/stream/s11.png?raw=true)

如果您感到好奇，请随时尝试自行构建此 API，如果您有任何疑问，请告诉我。提示：您可以查看`sharp`NPM 模块，该模块可用于构建图像处理能力。

【完】

