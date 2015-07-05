/**
 * 注意：Node遵循CMD规范,一个文件即一个模块
 * 1、加载node核心模块js文件
 * 2、省略路径则表示加载nodel_modules文件中的核心模块
 */
var express = require('express');
var http = require('http');
var path = require('path');

/* 1、相对路径(相对于调用require的文件路径)加载对应的js文件,省略js后缀
 * 2、如果路径为目录，则优先查找指定目录下的package.json文件中指定的main文件;
 *    如果没有指定main属性，则加载指定目录下的index.js文件
 */
var routes = require('./routes');
var login = require('./routes/login');
var user = require('./routes/user');

// 配置全局环境
var app = express();

//设置本应用的访问端口
app.set('port', process.env.PORT || 3000);

//设置视图的存放目录
app.set('views', path.join(__dirname, 'views'));

//设置视图模板引擎的类型
app.set('view engine', 'jade');

//使用默认图标,否则app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.favicon());

//终端打印不同颜色的日志
app.use(express.logger('dev'));

//支持json参数
app.use(express.json());

//对url参数编码
app.use(express.urlencoded());

//协助处理POST请求，伪装PUT、DELETE和其他HTTP方法
app.use(express.methodOverride());

//设置路由
app.use(app.router);

//设置静态资源服务器(存放css、js、image)
app.use(express.static(path.join(__dirname, 'public')));

//开发环境下的错误处理
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 配置路径映射
app.get('/', routes.index);
app.get('/login', login.login);
app.get('/users', user.list);

// 产生服务应用
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});