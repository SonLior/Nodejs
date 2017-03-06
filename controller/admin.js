/**
 * Created by SonLIr on 2017/3/6.
 */
var fs = require('fs');

var adminCtrl = module.exports;

adminCtrl.getindex = function (req, res) {
    res.send('后台首页');
}

adminCtrl.getblog = function (req, res) {
    res.send('后台的管理');
}