"use strict";

var fi = require('wx-common').fileinfo;
var path = require('path');
var json = require("./config");

json.root = __dirname;

fi.Dir.ExistsAndCreateSync(path.join(json.root, 'log'));

var upload_news = path.join(path.join(json.root, 'news-content'));
fi.Dir.ExistsAndCreateSync(upload_news);
json.upload_temp = upload_news;

var upload_path = path.join(path.join(json.root, 'upload'));
fi.Dir.ExistsAndCreateSync(upload_path);
json.upload_path = upload_path;

global.config = json;
//cookie的key
global.ckey = {
	id: "id",
	memberid: "memberid",
	openid: "openid"
};

require('wx-common').prototype;