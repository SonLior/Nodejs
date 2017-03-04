var http = require('http');

var fs = require('fs');

var path = require('path');

//引入mime模块
var mime = require('mime');

var xtpl = require('xtpl');

var server = http.createServer();

function crrResponse(response) {
    response.render = function (path, data) {
        xtpl.renderFile(path, {
            data: data
        }, function (err, data) {
            if(err){
                response.writeHead(500);
                response.end('服务器错误' + err);
                return;
            }

            response.writeHead(200, {
                'Content-type': 'text/html'
            });

            response.end(data);
        });
    }
}

server.on('request', function (request, response) {
    crrResponse(response);

    var url = request.url.toLowerCase();

    if(url === '/' || url === '/views/index'){

        response.render('./views/index.html', {});

    }
    else if(url === '/blog'){

        fs.readFile('./data.json', 'utf8', function (err, data) {

            var data = JSON.parse(data);

            response.render('./views/post.html', data.reverse());

        });
    }
    else if(url.startsWith('/submit')){

        fs.readFile('./data.json', 'utf8', function (err, data) {

            var data = JSON.parse(data);

            data.push(parse(url));

            fs.writeFile('./data.json', JSON.stringify(data));

            response.render('./views/post.html', data.reverse());

        });
    }

    else if(url === '/getcomment'){
        fs.readFile('./data.json', 'utf8', function (err, data) {
            response.end(data);
        });
    }
    else if(url.startsWith('/statics')){
        var filename = path.join(__dirname, url);

        if(filename.indexOf('?') > 0){
            filename = filename.substring(0, filename.indexOf('?'));
        }

        fs.readFile(filename, function (err, data) {
            if(err){
                response.writeHead(500);
                response.end('服务器错误');
                return;
            }

            response.writeHead(200, {
                'Content-type': mime.lookup(filename)
            });

            response.end(data);
        });

    }
    else {
        response.end('找不到要请求的页面');
    }
});

server.listen(2222, function (err) {
    console.log('正在监听 2222');
});

function parse(url) {
    var obj = {};
    var arr = url.substring(url.indexOf('?') + 1).split('&');
    arr.forEach(function (item) {
        var ret = item.split('=');
        obj[ret[0]] = ret[1];
    });
    return obj;
}