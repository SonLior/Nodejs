var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var xtpl = require('xtpl');


//1.
var server = http.createServer();

//2.
server.on('request', function (request, response) {
    var url = request.url.toLowerCase();
    if(url === '/' || url === '/index'){
        //这是一个页面, 所以要指定编码
        fs.readFile('./views/index.html', 'utf8', function (err, data) {
            if(err){
                response.writeHead(500);
                response.end('服务器错误');
                return;
            }

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });

            response.end(data);
        });
    }
    else if(url === '/blog'){

        //require()  可以直接加载json文件, 但是相对路径是必须加的
        //require()  会缓存加载的内容
        var data = require('./data.json');

        xtpl.renderFile('./views/post.html',{
            data:data
        },function(error,content){
            if(error){
                response.writeHead(500);
                response.end('服务器错误');
                return;
            }
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(content);
        });
    }
    else if(url.startsWith('/submit')){
        //在这里处里拿到的数据

        console.log(url);

        var common = parse(url);
        //拿到以前文件
        fs.readFile('./data.json', 'utf8', function (err, data) {
            var commons = JSON.parse(data);
            commons.push(common);

            //将所有的数据写入
            fs.writeFile('./data.json', JSON.stringify(commons));
        });

        response.end('评论成功');

    }
    else if(url.startsWith('/statics')){
        //修改文件路径
        var filename = path.join(__dirname, url);

        if(filename.indexOf('?') > 0){
            filename = filename.substring(0, filename.indexOf('?'));
        }

        //这是静态文件, 不能转化成字符串
        fs.readFile(filename, function (err, data) {

            response.writeHead(200, {
                'Content-Type': mime.lookup(filename)
            });
            response.end(data);
        });


    }
    else {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.end('找不到页面');
    }
});

//3.
server.listen(4444, function (err) {
   console.log('正在监听 4444 端口');
});


function parse(url) {
    var obj = {};
    url = url ? url : '';

    var array = url.substring(url.indexOf('?') + 1).split('&');

    array.forEach(function (item) {
        var tem = item.split('=');
        obj[tem[0]] = tem[1];
    });
    return obj;
}