/**
 * Created by SonLIr on 2017/3/6.
 */
var express = require('express');

var homeRoute  = module.exports = express.Router();

var homeCtrl = require('../controller/home');

homeRoute.get('/', homeCtrl.getindex);

homeRoute.get('/blog', homeCtrl.getblog);