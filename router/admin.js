/**
 * Created by SonLIr on 2017/3/6.
 */
var express = require('express');

var fs = require('fs');

var adminRouter = module.exports = express.Router();

adminRouter.get('/user', function (req, res) {
    res.send('后台首页');
});

adminRouter.get('/adminblog', function (req, res) {
    res.send('后台的管理');
});