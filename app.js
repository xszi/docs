

/**
 * 应用程序的启动(入口）文件
 *
 **/

//加载express模块
var express=require('express');
// 加载模块处理模板
var swig = require('swig');
// 加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');

//加载ueditor模块
var ueditor = require('ueditor');

var path = require('path');
//加载cookie模块
var Cookies = require('cookies');
//创建app应用=>NodeJs Http.createServer()

var app = express();

var User = require('./models/User');

var Category = require('./models/Category');

var Content = require('./models/Content');

//配置应用模板
//定义当前应用模板所使用的模板引擎
//第一个参数：模板引擎的名称,也是模板文件的后缀，第二个参数：用于解析处理模板内容的方法
app.engine('html',swig.renderFile);

// 第一个必须是views，第二个是路径
app.set('views','./views');

//设置所使用的模板引擎，第一个参数必须是view enging，第二个参数与app.engine的第一个参数一致
app.set('view engine','html');

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));

// 在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

//body-parser设置
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
//设置cookie
app.use(function (req,res,next) {
   req.cookies=new Cookies(req,res);

   //解析登录用户的cookie信息
   req.userInfo={};
   if(req.cookies.get('userInfo')){
       try{
           req.userInfo=JSON.parse(req.cookies.get('userInfo'));

           //获取当前登录用户的类型，是否是管理员
           User.findById(req.userInfo._id).then(function (userInfo) {
               req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
               next();
           })
       }catch (e){
           next();
       }
   }else{
       next();
   }
});


app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
// ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
//  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
// 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }}));

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//mongod --dbpath=C:\Users\jiuhua\Desktop\blog\db --port=27018








/**
 * 首页
 * req request对象
 * res response对象
 * next函数
 */

// app.get('/',function (req,res,next) {
    //res.send('<h1>欢迎来到我的博客！</h1>')

    /*
    * 读取views目录下的指定文件。解析并返回客户端
    * 第一个参数:表示模板的文件，相对于view目录 view/index.html
    * 第二个参数：传递给模板使用的数据
    * */
//     res.render('index');
// })

// app.get('/main.css',function (req,res,next) {
//     res.setHeader('content-type','text/css');
//     res.send("body {background:blue;}");
// })


mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    if(err){
        console.log("数据库连接失败！");
    }else{
        console.log("数据库连接成功！");
        //监听http请求
        app.listen(8081);
    }
});


//
// 用户发送http请求-->url-->解析路由-->找到匹配的规则-->执行指定的绑定函数，返回对应内容至用户
// 、publi-->静态-->直接读取指定指定目录下的文件，返回给用户-->
// 动态-->处理业务逻辑，加载模板，解析模板-->返回数据给用户