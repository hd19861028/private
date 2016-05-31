"use strict";
var express = require('express');
var qs = require('querystring');
var db = require('autoredis').mysql;
var common = require('wx-common').common;
var path = require('path');
var fs = require('fs');

var app = express();

exports = module.exports;

app.post('*', function(req, res) {
	var result = "";
	req.on('data', function(chunk) {
		result += chunk.toString();
	})
	req.on('end', function(chunk) {
		var body = qs.parse(result)
		req.body = body;
		req.next();
	})
})

app.post("/login", function(req, res) {
	var data = {
		status: false,
		message: ''
	}
	db.query('select * from tbl_user where name=?', [req.body.name])
		.then(function(d) {
			if (d.rows.length > 0) {
				var pwd = d.rows[0].password;
				var salt = d.rows[0].salt;
				if (pwd) {
					common.validPwd(req.body.password, pwd, salt)
						.then(function(r) {
							if (r) {
								data.status = true;
								res.setCookiesSafe('account', req.body.name);
							} else {
								data.message = "密码不匹配"
							}
							res.json(data);
						})
				} else {
					data.status = true;
					res.setCookiesSafe('account', req.body.name);
					common.makePwd(req.body.password)
						.then(function(o) {
							db.query('update tbl_user set password=?,salt=? where name=?', [o.pwd, o.salt, req.body.name])
						})
					res.json(data);
				}
			} else {
				data.message = "帐号输入错误"
				res.json(data);
			}
		})
});

app.post("/login/resetpwd", function(req, res) {
	var name = req.cookiesSafe('account');
	var data = {
		status: false,
		message: ''
	}
	db.query('select * from tbl_user where name=?', [name])
		.then(function(d) {
			var pwd = d.rows[0].password;
			var salt = d.rows[0].salt;
			common.validPwd(req.body.oldpwd, pwd, salt)
				.then(function(r) {
					if (r) {
						data.status = true;
						common.makePwd(req.body.newpwd)
							.then(function(o) {
								db.query('update tbl_user set password=?,salt=? where name=?', [o.pwd, o.salt, name])
							})
					} else {
						data.message = "密码不匹配"
					}
					res.json(data);
				})
		})
});

exports.api = app;