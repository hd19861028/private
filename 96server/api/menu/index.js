"use strict";
var express = require('express');
var qs = require('querystring');
var db = require('autoredis').mysql;
var common = require('wx-common').common;
var path = require('path');
var fs = require('fs');

var app = express();

exports = module.exports;

app.get("/menu", function(req, res) {
	var m = req.query.m ? +req.query.m : 0;
	var c = req.query.c ? +req.query.c : 0;
	var sql = 'select * from tbl_menu where m=?';
	var param = [m];
	if (c > 0) {
		sql += ' and c=?'
		param.push(c);
	}
	sql += ' order by sort asc';
	db.query(sql, param)
		.then(function(d) {
			res.json(d.rows)
		}, function(e) {
			console.log(e)
			e.WriteLog();
		})
});

exports.api = app;