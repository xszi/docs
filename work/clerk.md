## 1. XXX

商城后台管理手机版（又称商城店员端），主要服务于方便客户使用移动设备（手机，pad）管理商品和订单，实现一键上架、下架，订单管理查询，销售统计，扫码核销，售后处理等大部分PC端后台管理功能。


## 2. 项目树

```
MALL_NEW_WEB(项目名称)
—— clerk (前端店员端vue项目)
    |——node_modules
    |——public
    |——src
        |——assets (静态资源，样式图片)
        |——components(公共组件)
        |——lib (公用方法)
        |——views (业务页面)
        |——App.vue (入口页面)
        |——main.js (入口js)
        |——router.js (路由)
        |——store.js (状态管理)
    |——.browserslistrc
    |——babel.config.js
    |——MIDDLE.md (中间层优化说明)
    |——vue.config.js
—— deploy (部署打包文件)
    |——clerk
—— kubernetes (K8s部署配置)
    |——deployment.yaml
—— server (node中间层转发)
    |—— (待续)
—— .editorconfig (见项目文件解释)
—— .gitignore (git提交需要忽略的文件)
—— .gitlab-ci.yml
—— Dockerfile (使用Dockerfile构建镜像，自动部署上线)
—— package.json
—— README.md (项目说明文档)
—— UPDATE.md (更新说明文档)
```

## 3. 项目文件解释

* ```.editorconfig```

“```EditorConfig```帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码样式。```EditorConfig```项目由用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵循定义的样式。```EditorConfig```文件易于阅读，并且与版本控制系统配合使用。”

拓展链接：[.editorconfig](https://blog.csdn.net/weixin_37597675/article/details/90710979)


* kubernetes

Kubernetes(k8s)是Google开源的容器集群管理系统（谷歌内部:Borg）。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性。

Kubernetes是一个完备的分布式系统支撑平台，具有完备的集群管理能力，多扩多层次的安全防护和准入机制、多租户应用支撑能力、透明的服务注册和发现机制、內建智能负载均衡器、强大的故障发现和自我修复能力、服务滚动升级和在线扩容能力、可扩展的资源自动调度机制以及多粒度的资源配额管理能力。同时Kubernetes提供完善的管理工具，涵盖了包括开发、部署测试、运维监控在内的各个环节。

拓展链接：[啥叫K8s？啥是k8s？](https://blog.csdn.net/weixin_43277643/article/details/83382532)　
　　
* ```Dockerfile```


```Dockerfile```是一个包含用于组合映像的命令的文本文档。可以使用在命令行中调用任何命令。```Docker```通过读取```Dockerfile```中的指令自动生成映像。

```docker build```命令用于从```Dockerfile```构建映像。可以在```docker build```命令中使用-f标志指向文件系统中任何位置的```Dockerfile```。

拓展链接：

i. [Dockerfile文件详解](https://www.cnblogs.com/panwenbin-logs/p/8007348.html)

ii. [干货满满！10分钟看懂Docker和K8S](https://my.oschina.net/jamesview/blog/2994112)

* ```.browserslistrc```

```browserslist``` 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具。

拓展链接：[前端工程基础知识点--Browserslist (基于官方文档翻译）](https://juejin.im/post/5b8cff326fb9a019fd1474d6)