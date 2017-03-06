//采用路由

var express = require('express');

var fs = require('fs');

var app = express();

var router = express.Router();

//第一个参数是路径. 默认是 '/'
app.use('/statics', express.static('statics'));

router.get('/', function (req, res) {

    fs.readFile('./views/index.html', 'utf8', function (err, data) {
        res.send(data);
    });

});


router.get('/blog', function (req, res) {
    fs.readFile('./views/post.html', 'utf8', function (err, data) {
        res.send(data);
    });
});


//使用路由
app.use('/', router);



app.listen(2222, function (err) {
    console.log('正在监听 2222 ');
});


