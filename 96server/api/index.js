"use strict";
var express = require('express');
var app = express();

exports = module.exports;

var ueditor = require('./ueditor/index');
var news = require('./news/index');
var login = require('./login/index');
var menu = require('./menu/index');

app.use('/api', ueditor.api);
app.use('/api', news.api);
app.use('/api', login.api);
app.use('/api', menu.api);

exports.api = app;