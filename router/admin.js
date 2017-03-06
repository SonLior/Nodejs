/**
 * Created by SonLIr on 2017/3/6.
 */
var express = require('express');

var adminRouter = module.exports = express.Router();

var adminCtrl = require('../controller/admin');

adminRouter.get('/user', adminCtrl.getindex);

adminRouter.get('/adminblog', adminCtrl.getblog);