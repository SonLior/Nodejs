/**
 * Created by SonLIr on 2017/3/6.
 */
var fs = require('fs');


var homeCtrl = module.exports;

homeCtrl.getindex = function (req, res) {
    fs.readFile('./views/index.html', 'utf8', function (err, data) {
        res.send(data);
    });
};

homeCtrl.getblog = function (req, res) {
    fs.readFile('./views/post.html', 'utf8', function (err, data) {
        res.send(data);
    });
}