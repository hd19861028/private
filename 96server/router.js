"use strict";

var express = require('express');
var middleware = require('./middleware');
var api = express();

api.use(middleware.cookieParse);

exports = module.exports;

api.all('*', function(req, res) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	});
	req.next();
})

var all = require('./api/index');

api.use('/', all.api);

exports.start = function() {

}

exports.start_paraller = function(workid, processid) {
	global.config.cluster = {
		wid: workid,
		pid: processid
	}
	if (global.config.api_port && global.config.api_port > 0) {
		api.listen(global.config.api_port);
		console.log(global.config.api_port+'端口已启动')
	}
}