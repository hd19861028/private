"use strict";
var express = require('express');
var qs = require('querystring');
var db = require('autoredis').mysql;
var common = require('wx-common').common;
var path = require('path');
var fs = require('fs');

var app = express();

exports = module.exports;

app.get("/ueditor", function(req, res) {
	res.json(global.config.ue);
});

app.post("/ueditor", function(req, res) {
	common.upload_file(req, res, function(fields, files) {
		var file = files[0].file;
		var jsonobj = {
			"originalName": file.file_name,
			"name": file.file_name,
			"url": '/api/news/tempimage/' + file.file_name,
			"type": file.type,
			"size": file.size,
			"state": "SUCCESS"
		}
		res.json(jsonobj);
	})
});

exports.api = app;