/**
 * Created by SonLIr on 2017/3/6.
 */
var express = require('express');

var fs = require('fs');

var homeRoute  = module.exports = express.Router();

homeRoute.get('/', function (req, res) {
    fs.readFile('./views/index.html', 'utf8', function (err, data) {
        res.send(data);
    });
});

homeRoute.get('/blog', function (req, res) {
    fs.readFile('./views/post.html', 'utf8', function (err, data) {
        res.send(data);
    });
});