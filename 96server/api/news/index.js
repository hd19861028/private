"use strict";
var express = require('express');
var qs = require('querystring');
var db = require('autoredis').mysql;
var common = require('wx-common').common;
var path = require('path');
var fs = require('fs');

var app = express();

exports = module.exports;

app.get("/news", function(req, res) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	});
	var type = +req.query.id;
	var sql = 'select id,title,updatetime from tbl_news where type=? order by updatetime desc limit ?,?;select count(id) as `total` from tbl_news where type=?';
	var index = +req.query.index;
	var size = +(req.query.size || "10");
	var param = [type, (index - 1) * size, size, type];
	db.query(sql, param)
		.then(function(d) {
			var rows = d.rows[0];
			for (var i = 0; i < rows.length; i++) {
				rows[i].updatetime = rows[i].updatetime.Format('yyyy-MM-dd HH:mm:ss')
			}
			res.json({
				rows: rows,
				total: d.rows[1][0].total
			})
		}, function(e) {
			console.log(e)
			e.WriteLog();
		})
});

app.get("/news/list", function(req, res) {
	var name = req.cookiesSafe('account');
	if (!name) {
		res.status(403).send('尚未登录')
	} else {
		var sql = 'select id,title,updatetime,footer from tbl_news where type=? order by updatetime desc limit ?,?;select count(id) as `total` from tbl_news where type=?';
		var index = +req.query.index;
		var size = +(req.query.size || "10");
		var param = [req.query.type, (index - 1) * size, size, req.query.type];
		db.query(sql, param)
			.then(function(d) {
				res.json({
					rows: d.rows[0],
					total: d.rows[1][0].total
				})
			}, function(e) {
				console.log(e)
				e.WriteLog();
			})
	}
});

app.get("/news/detail", function(req, res) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	});
	var sql = 'select * from tbl_news where id=?';
	var param = [req.query.id];
	db.query(sql, param)
		.then(function(d) {
			var rows = d.rows;
			if (rows && rows.length > 0) {
				rows[0].updatetime = rows[0].updatetime.Format('yyyy-MM-dd HH:mm:ss')
				res.json(rows[0])
			} else {
				res.json({})
			}
		}, function(e) {
			console.log(e)
			e.WriteLog();
		})
});

function deleteImage(rows) {
	for (var i = 0; i < rows.length; i++) {
		var originUrl = path.join(global.config.upload_temp, rows[i].image);
		var originUrl1 = path.join(global.config.upload_temp, rows[i].image1);
		var originUrl2 = path.join(global.config.upload_temp, rows[i].image2);
		try {
			fs.unlink(originUrl, function() {})
			fs.unlink(originUrl1, function() {})
			fs.unlink(originUrl2, function() {})
		} catch (e) {}
	}
}

function deleteOneImage(img) {
	var originUrl = path.join(global.config.upload_temp, img || '');
	try {
		fs.unlink(originUrl, function() {})
	} catch (e) {}
}

app.post("/news/save", function(req, res) {
	common.upload_file(req, res, function(fields, files) {
		fields.content = decodeURIComponent(fields.content);
		
		fields.image = files.length > 0 ? files[0].file.file_name : '';
		fields.image1 = files.length > 1 && files[1] ? files[1].file.file_name : '';
		fields.image2 = files.length > 2 && files[2] ? files[2].file.file_name : '';
		fields.id = +fields.id;

		if (fields.id > 0) {
			req.emit('getNews', fields);
		} else {
			req.emit('toSave', fields);
		}
	}, global.config.upload_path)
	req.on('getNews', function(fields) {
		var sql = 'select * from tbl_news where id=?';
		var param = [fields.id];
		db.query(sql, param)
			.then(function(d) {
				var rows = d.rows;
				if (rows && rows.length > 0) {
					if (fields.image) {
						deleteOneImage(rows[0].image);
					} else {
						fields.image = rows[0].image;
					}
					if (fields.image1) {
						deleteOneImage(rows[0].image1);
					} else {
						fields.image1 = rows[0].image1;
					}
					if (fields.image2) {
						deleteOneImage(rows[0].image2);
					} else {
						fields.image2 = rows[0].image2;
					}
				}
				req.emit('toSave', fields)
			}, function(e) {
				console.log(e)
				e.WriteLog();
			})
	})
	req.on('toSave', function(fields) {
		var sql = '';
		var params = [];
		var now = Date.now();
		if (fields.id == 0) {
			sql = 'insert into tbl_news(type,title,content,image,image1,image2,createtime,updatetime,footer) values(?,?,?,?,?,?,?,?,?)';
			params = [fields.type, fields.title, fields.content, fields.image, fields.image1, fields.image2, now, now, fields.footer]
		} else {
			sql = 'update tbl_news set title=?,content=?,image=?,image1=?,image2=?,updatetime=?,footer=? where id=?';
			params = [fields.title, fields.content, fields.image, fields.image1, fields.image2, now, fields.footer, fields.id]
		}
			
		db.query(sql, params)
			.then(function(d) {
				if (d.rows && (d.rows.insertId > 0 || d.rows.changedRows > 0)) {
					res.send({
						status: true
					})
				} else {
					res.send({
						status: false,
						message: "保存失败"
					})
				}
			}, function(e) {
				console.log(e)
				e.WriteLog();
			})
	})
});

app.get("/news/image/:image", function(req, res) {
	var img_name = req.params.image;
	var img = path.join(global.config.upload_path, img_name);

	fs.exists(img, function(exists) {
		if (exists) {
			var ext_name = path.extname(img_name);
			res.type(ext_name);
			res.sendFile(img);
		} else
			res.status(404).send("资源没有找到");
	});
});

app.get("/news/tempimage/:image", function(req, res) {
	var img_name = req.params.image;
	var img = path.join(global.config.upload_temp, img_name);

	fs.exists(img, function(exists) {
		if (exists) {
			var ext_name = path.extname(img_name);
			res.type(ext_name);
			res.sendFile(img);
		} else
			res.status(404).send("资源没有找到");
	});
});

app.get("/news/delete", function(req, res) {
	var ids = req.query.ids ? req.query.ids.split(',') : [];
	if (ids.length > 0) {
		var param = [];
		for (var i = 0; i < ids.length; i++) {
			param.push('?')
		}
		param = param.join(',')
		var sql = 'select image from tbl_news where id in (' + param + ')';

		db.query(sql, ids)
			.then(function(d) {
				deleteImage(d.rows);
			}, function(e) {
				console.log(e)
				e.WriteLog();
			})

		db.query('delete from tbl_news where id in (' + param + ')', ids)
			.then(function(d) {
				if (d.rows && d.rows.affectedRows > 0) {
					res.send({
						status: true
					})
				} else {
					res.send({
						status: false,
						message: "删除失败"
					})
				}

				res.send({
					status: true
				})
			})
	} else {
		res.send({
			status: true
		})
	}
});

exports.api = app;