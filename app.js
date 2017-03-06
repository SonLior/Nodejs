//采用路由

var express = require('express');

var app = express();

//引入路由文件
var homeRouter = require('./router/home');
var adminRouter = require('./router/admin');

//第一个参数是路径. 默认是 '/'
app.use('/statics', express.static('statics'));


//使用路由
app.use('/', homeRouter);
app.use('/admin', adminRouter);



app.listen(2222, function (err) {
    console.log('正在监听 2222 ');
});


