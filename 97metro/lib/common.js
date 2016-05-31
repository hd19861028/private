/*
SetHtmlTitle													设置Html页面标题
GetWebBaseUrl												获取Web网站的根目录
GetBaseUrl													获取网站基本路径
GetJspBaseUrl												获取jsp网站基本路径
GetImageServerUrl										获取图片服务器的根目录
Browser														检查浏览器版本
Cookies														操作Cookie对象的属性
WebStorage													提供SessionStorage和LocalStorage对象的操作，并且提供垮页面监听存储的值变更的功能
Json																包含Json操作方法
GetUrlParam(name)										传入参数名称，从当前url中获取参数的值
Delay(second, action)									延迟second秒执行函数action
Ajax																封装ajax请求
String 	--> Trim											去掉字符串两端的空格
String 	--> SubString									去掉字符串两端的空格
String 	--> Format										模拟C#格式化字符串，仅支持6个占位符{0}~{5}
String 	--> StartWith									判断是否已某个字符串开头
String 	--> EndWith										判断是否已某个字符串结尾
String 	--> ToLongDate								将日期字符串转换为yyyy-MM-dd HH:mm:ss格式
String 	--> ToShortDate								将日期字符串转换为yyyy-MM-dd格式
String 	--> HtmlEncode								html编码
String 	--> HtmlDecode								html解码
String 	--> UrlDecode									url编码
String 	--> Base64Encode							Base64编码
String 	--> Base64Decode							Base64解码
String 	--> Md5											提供Md5加密
String 	--> Sha1											提供Sha1加密
String 	--> Length										得到字符串的真实长度
String 	--> IsInt64										验证是否是Int64数字
String 	--> IsInt32										验证是否是Int32数字
String 	--> IsEmail										验证是否是邮件格式
String 	--> Notification								在页面顶部弹出操作成功或失败的提示框
Number--> FormatFloat								格式化浮点数，解决浮点型显示bug，入3088.600000000004
Number--> ToLongDate								将日期字符串转换为yyyy-MM-dd HH:mm:ss格式
Number--> ToShortDate								将日期字符串转换为yyyy-MM-dd格式
Data		--> ToFormatString							Date类型扩展方法，new Date().toFormatString('yyyy-MM-dd HH:mm:ss')
Data 		--> ToLongDate								将日期字符串转换为yyyy-MM-dd HH:mm:ss格式
Data 		--> ToShortDate								将日期字符串转换为yyyy-MM-dd格式
String 	--> CutStr											按字符串真实长度截取字符串，超出的部分显示...
LoadStyle														读取样式文件, url:　"css/jBox/Skins/Blue/jbox.css"
LoadJs															读取脚本文件, url:　"base/angular/angular.min.js"
Screen															用于获取屏幕宽度(Width)，高度(Height)，可视宽度(ViewWidth)，可视高度(ViewHeight)
ReturnToTop													返回到页面顶部
AddLoadEvent												为window.onload注入新方法，而不覆盖原方法
UploadFile													为文件上传控件添加js验证事件
AddPlaceHolder											为不支持placehodler的浏览器添加属性支持
PopupWindow												弹出bootstrap的窗口
Array  --> IsInArray										查找元素是否存在与数组当中，不存在返回-1，存在返回索引
Array  --> RemoveAt										根据下标移除数组中的元素
*/

/*TODO: HJD, 正式发布的时候，需要更改host地址*/
var Config = {
	GetJspBaseUrlPath: 'http://' + window.location.host + '/fortune_cloud/',
	GetWebBaseUrlPath: 'http://' + window.location.host + '/',
	GetImageServerUrlPath: 'http://' + window.location.host + '/',
	Debug: true,
	IsFixIE9: true
}

/**
 * 设置html页面title内容
 * */
function SetHtmlTitle(title) {
	try {
		document.title = title;
		document.getElementsByTagName('title')[0].innerText = title;
	} catch (e) {
		console.log(e);
	}
}

/** 
 * 获取网站基本路径，如http://www.fdboard.com/ <br>
 * @localPath：参数第一个字符不能是/，例如：fdboard/page/test.action是正确的路径
 */
function GetWebBaseUrl(localPath) {
	if (localPath)
		return Config.GetWebBaseUrlPath + localPath.toLowerCase();
	return Config.GetWebBaseUrlPath;
}

/** 
 * 获取jsp网站基本路径，如http://www.fdboard.com/ <br>
 * @localPath：参数第一个字符不能是/，例如：fdboard/page/test.action是正确的路径
 */
function GetJspBaseUrl(localPath) {
	if (localPath)
		return Config.GetJspBaseUrlPath + localPath.toLowerCase();
	return Config.GetJspBaseUrlPath;
}

/** 
 * 获取静态图片库基本路径，如http://www.fdboard.com/ <br>
 * @localPath：参数第一个字符不能是/，例如：fdboard/page/test.action是正确的路径
 */
function GetImageServerUrl(localPath) {
	if (localPath)
		return Config.GetImageServerUrlPath + localPath.toLowerCase();
	return Config.GetImageServerUrlPath;
}

/**
 * 检查浏览器版本<br>
 * MEIE: 是ie，则返回7|8|9|10，不是，则返回-1<br>
 * Chrome: 返回true|false<br>
 * Mozilla: 返回true|false<br>
 * Opera: 返回true|false<br>
 * Safari: 返回true|false<br>
 * Mobile: 返回2|3|4|5|6|9|10|11, 表示android|ipod|ipad|iphone|blackberry|ie9|ie10|ie11
 */
var Browser = {
	MSIE: function() {
		var browser = navigator.userAgent.toLowerCase();
		var result = -1;
		result = /msie/.test(browser) ? parseInt(browser.match(/msie ([^;]+)/)[1]) : result;
		result = result == -1 && /trident/.test(browser) ? 11 : result;
		return result;
	},
	Chrome: /chrome/.test(navigator.userAgent.toLowerCase()),
	Mozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
	Opera: /opr/.test(navigator.userAgent.toLowerCase()),
	Safari: /safari/.test(navigator.userAgent.toLowerCase()),
	Mobile: function() {
		var result = -1;
		var ua = navigator.userAgent.toLowerCase();
		//ios mobile
		if (ua.match(/ mobile\//i)) {
			result = ua.match(/ipod;/i) ? 3 : result;
			result = ua.match(/ipad;/i) ? 4 : result;
			result = ua.match(/iphone;/i) ? 5 : result;
		}
		//android
		result = ua.match(/android|linux/i) ? 2 : result;
		//blackberry
		result = ua.match(/bb10|playbook|blackberry/i) ? 6 : result;
		//windows phone
		result = ua.match(/iemobile/i) ? parseInt(ua.match(/iemobile\/([^;]+)/)[1]) : result;
		return result;
	},
	GetWhichBrowser: function() {
		var brower = this.Mobile();
		var result;
		result = brower == 2 ? "android" : result;
		result = brower == 3 ? "ipod" : result;
		result = brower == 4 ? "ipad" : result;
		result = brower == 5 ? "iphone" : result;
		result = brower == 6 ? "blackberry" : result;
		result = brower >= 9 && brower <= 11 ? "ie mobile " + brower : result;
		if (!result) {
			//ie -> oprea -> firefox -> chrome -> safari
			brower = this.MSIE();
			result = brower > -1 ? "ie " + brower : result;
			result = (!result && this.Opera) ? "opera" : result;
			result = (!result && this.Mozilla) ? "firefox" : result;
			result = (!result && this.Chrome) ? "chrome" : result;
			result = (!result && this.Safari) ? "safari" : result;
		}
		return result;
	}
};

var Cookies = {
	/**
	 * 根据key获取cookie的值
	 */
	Get: function(key) {
		var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	/**
	 * 设置cookie的值，第3个参数days为可选参数，默认30天
	 */
	Set: function(key, value, days, hours, minutes, seconds) {
		var Days = (days > 0) ? days : 30;
		var Hours = (hours > 0) ? hours : 0;
		var Minutes = (minutes > 0) ? minutes : 0;
		var Seconds = (seconds > 0) ? seconds : 0;

		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000 + Hours * 60 * 60 * 1000 + Minutes * 60 * 1000 + Seconds * 1000);
		document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
	/**
	 * 根据指定的key删除cookie的值
	 */
	Del: function(key) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(key);
		if (cval != null)
			document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

/**
 * Html5的Web存储功能<br>
 * <b>功能概要</b><br>
 * Session对象：使用Session Storage<br>
 * Local对象：使用Local Storage<br>
 * Listen对象：用于监听Session或者Local中某个参数的变化以及Web存储使用量的统计<br>
 */
var WebStorage = {
	/** Session对象的Get，Set，Del，Clear，CanSupport */
	Session: {
		Set: function(key, value) {
			window.sessionStorage.setItem(key, value);
		},
		Get: function(key) {
			return window.sessionStorage.getItem(key);
		},
		Del: function(key) {
			window.sessionStorage.removeItem(key);
		},
		Clear: function() {
			window.sessionStorage.clear();
		},
		CanSupport: function() {
			if (window.sessionStorage) {
				return true;
			}
			return false;
		}
	},
	/** Local对象的Get，Set，Del，Clear，CanSupport */
	Local: {
		Set: function(key, value) {
			window.localStorage.setItem(key, value);
		},
		Get: function(key) {
			return window.localStorage.getItem(key);
		},
		Del: function(key) {
			window.localStorage.removeItem(key);
		},
		Clear: function() {
			window.localStorage.clear();
		},
		CanSupport: function() {
			if (window.localStorage) {
				return true;
			}
			return false;
		}
	},
	/**
	 * Listen：用于监听某个参数的变化，包含3个方法<br>
	 * 		<b>Start方法</b><br>@isLocal 是否是本地存储<br>@Key 存储的Key<br>function(oldValue, newValue) 传入型函数，2个参数，旧值与新值<br>
	 * 		<b>End方法</b><br>@isLocal 是否是本地存储<br>@Key 存储的Key<br>function()传入型函数，结束监听时执行的自定义函数<br>
	 *     <b>Toal方法</b>无参数，返回数组，长度2，例如[25,1055], 表示本地存储使用25字节，session存储使用1055字节，已根据中文判断过字符串实际长度
	 */
	Listen: {
		Timers: [],
		Start: function(isLocal, key, fn) {
			var local = false;
			if (isLocal == true || isLocal.toLowerCase() == "true") {
				local = true;
			}
			var original = null;
			if (local) {
				original = WebStorage.Local.Get(key);
			} else {
				original = WebStorage.Session.Get(key);
			}
			var timerListenKey = window.setInterval(function() {
				var newValue;
				if (local) {
					newValue = WebStorage.Local.Get(key);
				} else {
					newValue = WebStorage.Session.Get(key);
				}
				if (newValue != original) {
					if (fn) {
						fn(original, newValue);
					}
					original = newValue;
				}
			}, 100);
			var start = {
				"local": local,
				"key": key,
				"timer": [timerListenKey]
			};
			var index = -1;
			for (var i = 0; i < WebStorage.Listen.Timers.length; i++) {
				var timer = WebStorage.Listen.Timers[i];
				if (timer.key && timer.key == key && timer.local == local) {
					index = i;
				}
			}
			if (index > -1) {
				WebStorage.Listen.Timers = WebStorage.Listen.Timers.RemoveAt(index);
			}
			WebStorage.Listen.Timers.push(start);
		},
		End: function(isLocal, key, fn) {
			var local = false;
			if (isLocal == true || isLocal.toLowerCase() == "true") {
				local = true;
			}
			var index = -1;
			for (var i = 0; i < WebStorage.Listen.Timers.length; i++) {
				var timer = WebStorage.Listen.Timers[i];
				if (timer.key && timer.key == key && timer.local == local) {
					index = i;
				}
			}
			if (index > -1) {
				window.clearInterval(WebStorage.Listen.Timers[index].timer[0]);
				if (fn) {
					fn();
				}
				WebStorage.Listen.Timers = WebStorage.Listen.Timers.RemoveAt(index);
			}
		},
		Total: function() {
			var localTotal = 0;
			var sessionTotal = 0;
			var localCount = window.localStorage.length;
			var sessionCount = window.sessionStorage.length;
			if (localCount > 0) {
				for (var i = 0; i < localCount; i++) {
					var key = window.localStorage.key(i);
					var value = window.localStorage.getItem(key);
					localTotal += value.Length();
				}
			}
			if (sessionCount > 0) {
				for (var i = 0; i < sessionCount; i++) {
					var key = window.sessionStorage.key(i);
					var value = window.sessionStorage.getItem(key);
					sessionTotal += value.Length();
				}
			}
			return [localTotal, sessionTotal];
		}
	}
}

/**
 * Json处理功能<br>
 * <b>功能概要</b><br>
 * ToString：将Json转换为String<br>
 * ToJson：将String转换为Json<br>
 * MergeJson：用第一个json覆盖第二个json, 并且输出合并后的json<br>
 */
var Json = {
	ToString: function(json) {
		return escape(JSON.stringify(json));
	},
	ToJson: function(data) {
		if (data) {
			data = unescape(data);
			if (window.JSON && window.JSON.parse) {
				return JSON.parse(data);
			} else {
				if (typeof data === "string") {
					data = data.Trim();
					data = data.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, "@")
						.replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/, "]")
						.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
					if (/^[\],:{}\s]*$/.test(data)) {
						return data;
					}
				}
			}
		} else
			return null;
	},
	Merge: function(jsonA, jsonB) {
		if (!jsonA && !jsonB) {
			return null;
		}
		if (jsonA && !jsonB) {
			return jsonA;
		}
		if (!jsonA && jsonB) {
			return jsonB;
		}
		for (var key in jsonA) {
			jsonB[key] = jsonA[key];
		}
		return jsonB;
	}
}

/** 传入参数名称，从当前url中获取参数的值 */
function GetUrlParam(name) {
	try {
		var reg = new RegExp("(^|&)" + name.toLowerCase() + "=([^&]*)(&|$)");
		var r = window.location.search.toLowerCase().substr(1).match(reg);
		if (r != null) return unescape(r[2]).replace(/</, "&lt;").replace(/>/, "&gt;");
		return "";
	} catch (e) {

	}
}

/** 延迟second秒执行函数action */
function Delay(second, action) {
	var timer = window.setInterval(function() {
		action();
		window.clearInterval(timer);
	}, second * 100);

}

/** 
 * Ajax请求方法<br>
 * url：所请求的url链接<br>
 * parameter：json格式的参数数组<br>
 * type：请求的方式，Get | Post<br>
 * datatype：返回的数据类型xml | html | script | json | jsonp | text<br>
 * fnSuccess： 操作成功所执行的函数<br>
 * fnError：操作失败所执行的函数
 * */
function Ajax(url, parameter, type, dataType, fnSuccess, fnError) {
	// dataType = dataType ? dataType : "json";
	// type = type ? type : "get";
	//	$.ajax({
	//		url: url,
	//		type: type,
	//		data: parameter,
	//		dataType: dataType,
	//		timeout: 3000,
	//		async: true,
	//		error: fnError,
	//		success: fnSuccess
	//	});
	var success = fnSuccess ? fnSuccess : null;
	var error = fnError ? fnError : null;
	type = type ? type : "GET";
	dataType = dataType ? dataType.toLowerCase() : "json";
	var xhr = !XMLHttpRequest ? new ActiveXObject("microsoft.xmlhttp") : new XMLHttpRequest();
	if (parameter) {
		var r = "";
		for (var key in parameter) {
			r += key + "=" + parameter[key].toString().UrlEncode() + "&";
		}
		parameter = r.Trim('&');
	}
	if (type == "get") {
		url = url.indexOf("?") > 0 ? url : url + "?";
		url += "&" + parameter;
		parameter = null;
	}
	xhr.open(type, url, true);
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.send(parameter || null);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (success != null) {
					var succ;
					switch (dataType) {
						case "xml":
							succ = xhr.responseXML;
							break;
						case "json":
							succ = eval("(" + xhr.responseText + ")");
							break;
						default:
							succ = xhr.responseText;
					}
					success(succ);
				}
			} else {
				if (error)
					error(xhr.response);
				else
					console.error(xhr.response);
			}
		}
	};
}

/** 
 * 扩展方法：去掉字符串2边空格
 * */
String.prototype.Trim = function(s) {
	s = s ? s : "\\s";
	s = "(" + s + ")";
	var reg = new RegExp("(^" + s + "*)|(" + s + "*$)", "g");
	return this.replace(reg, "");
}

/** 
 * 扩展方法：从字符串中截取一部分
 * */
String.prototype.SubString = function(start, end) {
	if (this && (start || end)) {
		var indexStart = -1;
		var indexEnd = -1;
		if (!start && end) {
			start = end;
			end = null;
		}
		if (start && !end) {
			indexStart = this.indexOf(start);
		}
		if (start && end) {
			indexStart = this.indexOf(start);
			indexEnd = this.indexOf(end, indexStart);
		}
		if (indexStart == -1) return null;
		else indexStart += start.length;
		if (indexEnd == -1) return this.substring(indexStart);
		return this.substring(indexStart, indexEnd);
	} else {
		return this;
	}
}

/** 
 * 扩展方法：模拟C#的格式化字符串方法，仅支持6个占位符，{0}~{5}
 * */
String.prototype.Format = function(s1, s2, s3, s4, s5, s6) {
	var result = "";
	if (this.indexOf("{0}") >= 0) {
		result = this.replace(/\{0\}/ig, s1);
	}
	if (result.indexOf("{1}" >= 0)) {
		result = result.replace(/\{1\}/ig, s2);
	}
	if (result.indexOf("{2}" >= 0)) {
		result = result.replace(/\{2\}/ig, s3);
	}
	if (result.indexOf("{3}" >= 0)) {
		result = result.replace(/\{3\}/ig, s4);
	}
	if (result.indexOf("{4}" >= 0)) {
		result = result.replace(/\{4\}/ig, s5);
	}
	if (result.indexOf("{5}" >= 0)) {
		result = result.replace(/\{5\}/ig, s6);
	}
	return result;
}

/** 
 * 扩展方法：判断字符串是否以指定的字符开始
 * */
String.prototype.StartWith = function(s) {
	return this.indexOf(s) == 0
}

/** 
 * 扩展方法：判断字符串是否以指定的字符结尾
 * */
String.prototype.EndWith = function(s) {
	var d = this.length - s.length;
	return (d >= 0 && this.lastIndexOf(s) == d)
}

String.prototype.ToShortDate = function() {
	if (!this) return "";
	var date = new Date(this);
	if (typeof date == "object" && date.toString() == "Invalid Date") {
		var timespan = parseInt(this);
		timespan = this.length == 10 ? timespan * 1000 : timespan;
		date = new Date(timespan)
	}
	var result = date.ToShortDate();

	return result;
}

String.prototype.ToLongDate = function() {
	if (!this) return "";
	var date = new Date(this);
	if (typeof date == "object" && date.toString() == "Invalid Date") {
		var timespan = parseInt(this);
		timespan = this.length == 10 ? timespan * 1000 : timespan;
		date = new Date(timespan)
	}
	var result = date.ToLongDate();
	return result;
}

/** 
 * 扩展方法：Html  编码
 * */
String.prototype.HtmlEncode = function() {
	var s = "";
	if (this == null || this.length == 0) return "";
	s = this.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	return s;
}

/** 
 * 扩展方法：Html 解码
 * */
String.prototype.HtmlDecode = function() {
	var s = "";
	if (this == null || this.length == 0) return "";
	s = this.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	return s;
}

/** 
 * 扩展方法：Url 编码
 * */
String.prototype.UrlEncode = function() {
	return this.replace(/\%/ig, "%25")
		.replace(/\+/ig, "%2B")
		.replace(/ /ig, "%20")
		.replace(/\//ig, "%2F")
		.replace(/\?/ig, "%3F")
		.replace(/\#/ig, "%23")
		.replace(/\&/ig, "%26")
		.replace(/\=/ig, "%3D")
		.replace(/\!/ig, "%21")
		.replace(/\^/ig, "%5E")
		.replace(/\`/ig, "%60")
		.replace(/\{/ig, "%7B")
		.replace(/\}/ig, "%7D")
		.replace(/\|/ig, "%7C")
		.replace(/\[/ig, "%5B")
		.replace(/\]/ig, "%5D")
		.replace(/\"/ig, "%22")
		.replace(/\</ig, "%3C")
		.replace(/\>/ig, "%3E")
		.replace(/\\/ig, "%5");
}

/** 
 * 扩展方法：Base64 加密
 * */
String.prototype.Base64Encode = function() {
	if (!this) return "";
	if (Browser.MSIE() && Browser.MSIE() <= 9) {
		var str = this;
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}

		var result;
		var c1, c2, c3;
		len = out.length;
		i = 0;
		result = "";
		while (i < len) {
			c1 = out.charCodeAt(i++) & 0xff;
			if (i == len) {
				result += base64EncodeChars.charAt(c1 >> 2);
				result += base64EncodeChars.charAt((c1 & 0x3) << 4);
				result += "==";
				break;
			}
			c2 = out.charCodeAt(i++);
			if (i == len) {
				result += base64EncodeChars.charAt(c1 >> 2);
				result += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				result += base64EncodeChars.charAt((c2 & 0xF) << 2);
				result += "=";
				break;
			}
			c3 = out.charCodeAt(i++);
			result += base64EncodeChars.charAt(c1 >> 2);
			result += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			result += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			result += base64EncodeChars.charAt(c3 & 0x3F);
		}
	} else {
		result = window.btoa(this);
	}
	return result;
}

/** 
 * 扩展方法：Base64 解密
 * */
String.prototype.Base64Decode = function() {
	if (!this) return "";
	if (Browser.MSIE() && Browser.MSIE() <= 9) {
		var str = this;
		var out, i, len, c;
		var char2, char3;
		out = "";
		len = str.length;
		i = 0;
		while (i < len) {
			c = str.charCodeAt(i++);
			switch (c >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					out += str.charAt(i - 1);
					break;
				case 12:
				case 13:
					char2 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
				case 14:
					char2 = str.charCodeAt(i++);
					char3 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0));
					break;
			}
		}

		var result = "";
		var c1, c2, c3, c4;
		len = out.length;
		i = 0;
		while (i < len) {
			do {
				c1 = base64DecodeChars[out.charCodeAt(i++) & 0xff];
			} while (i < len && c1 == -1);
			if (c1 == -1)
				break;
			do {
				c2 = base64DecodeChars[out.charCodeAt(i++) & 0xff];
			} while (i < len && c2 == -1);
			if (c2 == -1)
				break;
			result += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

			do {
				c3 = out.charCodeAt(i++) & 0xff;
				if (c3 == 61)
					return result;
				c3 = base64DecodeChars[c3];
			} while (i < len && c3 == -1);
			if (c3 == -1)
				break;
			result += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

			do {
				c4 = out.charCodeAt(i++) & 0xff;
				if (c4 == 61)
					return result;
				c4 = base64DecodeChars[c4];
			} while (i < len && c4 == -1);
			if (c4 == -1)
				break;
			result += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		}
	} else {
		result = window.atob(this);
	}
	return result;
}

/** 
 * 扩展方法：MD5 加密
 * */
String.prototype.Md5 = function() {
	try {
		return md5(this);
	} catch (e) {
		PopupWindow("MD5加密失败", "js/jquery/secrity/md5.js文件尚未加载，无法调用md5加密！");
	}
}

/** 
 * 扩展方法：Sha1 加密
 * */
String.prototype.Sha1 = function() {
	try {
		return sha1(this);
	} catch (e) {
		PopupWindow("Sha1加密失败", "js/jquery/secrity/Sha1.js文件尚未加载，无法调用sha1加密！");
	}
}

/** 
 * 扩展方法：得到字符串的真实长度
 * */
String.prototype.Length = function() {
	return this.replace(/[^\x00-\xff]/g, 'xx').length;
}

/**
 * 扩展方法：验证是否是Int64格式的数字
 */
String.prototype.IsInt64 = function() {
	if (!this) return false;

	var value = this.Trim();
	if (/^[0-9]\d*$/.test(value)) {
		if (value.toString().length < 19) {
			return true;
		} else if (value.toString().length == 19) {
			if (value <= Math.pow(2, 63) - 1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * 扩展方法：验证是否是Int32格式的数字
 */
String.prototype.IsInt32 = function() {
	if (!this) return false;

	var value = this.Trim();
	if (/^[0-9]\d*$/.test(value)) {
		if (value.toString().length < 10) {
			return true;
		} else if (value.toString().length == 10) {
			if (value <= Math.pow(2, 31) - 1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * 扩展方法：验证是否是邮件地址
 */
String.prototype.IsEmail = function() {
	if (!this) return false;

	var value = this.Trim();
	return /^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value);
}

/** 
 * 在页面顶部弹出提示消息框 <br>
 * content: 需要弹出框显示的内容(可以是html格式)<br>
 * timeout: 弹出框几秒之后自动消失(默认3秒)<br>
 * type: 弹出框类型，有3种类型S(成功), W(警告), E(失败)<br>
 * onclose: 关闭的瞬间执行的函数<br>
 * onopen: 打开的瞬间执行的函数
 * */
String.prototype.Notification = function(timeout, type, onclose, onopen) {
	if (!this) {
		return;
	}
	if (!timeout) {
		timeout = 3 * 1000;
	} else {
		timeout = timeout * 1000;
	}
	if (!onclose) {
		onclose = function() {}
	}
	if (!onopen) {
		onopen = function() {}
	}
	if (!type) {
		type = "success";
	} else {
		switch (type.toUpperCase()) {
			case "S":
				type = "success";
				break;
			case "W":
				type = "warning";
				break;
			case "E":
				type = "error";
				break;
			default:
				type = "success";
				break;
		}
	}
	try {
		var notification = new NotificationFx({
			message: '<span class="icon icon-megaphone"></span><p>' + this + '</p>',
			layout: 'bar',
			effect: 'slidetop',
			type: type, // notice, warning or error
			onClose: onclose,
			onOpen: onopen,
			ttl: timeout
		});
		notification.show();
	} catch (e) {
		PopupWindow("Notification初始化失败", "请先加载js/messager/notification.js插件脚本！");
	}
}

/**
 * 扩展方法：解决float类型显示的bug，可选参数bit，保留几位小数点（默认2位）
 */
Number.prototype.FormatFloat = function(bit) {
	bit = bit ? bit : 2;
	return this.toFixed(bit);
};

Number.prototype.ToShortDate = function() {
	if (!this) return "";
	var num = this;
	if (num.toString().length == 10) {
		num *= 1000
	};
	var result = new Date(num).ToShortDate();

	return result;
};

Number.prototype.ToLongDate = function() {
	if (!this) return "";
	var num = this;
	if (num.toString().length == 10) {
		num *= 1000
	};
	var result = new Date(num).ToLongDate();

	return result;
};

/**
 * 扩展方法：日期类型格式化成指定格式的字符串形式，参数形式yyyy-MM-dd HH:mm:ss
 */
Date.prototype.ToFormatString = function(format) {
	var formatstr = format;
	if (format != null && format != "") {
		if (formatstr.indexOf("yyyy") >= 0) {
			formatstr = formatstr.replace("yyyy", this.getFullYear());
		}
		if (formatstr.indexOf("MM") >= 0) {
			var month = this.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("MM", month);
		}
		if (formatstr.indexOf("dd") >= 0) {
			var day = this.getDay();
			if (day < 10) {
				day = "0" + day;
			}
			formatstr = formatstr.replace("dd", day);
		}
		var hours = this.getHours();
		if (formatstr.indexOf("HH") >= 0) {
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("HH", hours);
		}
		if (formatstr.indexOf("hh") >= 0) {
			if (hours > 12) {
				hours = hours - 12;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			formatstr = formatstr.replace("hh", hours);
		}
		if (formatstr.indexOf("mm") >= 0) {
			var minute = this.getMinutes();
			if (minute < 10) {
				minute = "0" + minute;
			}
			formatstr = formatstr.replace("mm", minute);
		}
		if (formatstr.indexOf("ss") >= 0) {
			var second = this.getSeconds();
			if (second < 10) {
				second = "0" + second;
			}
			formatstr = formatstr.replace("ss", second);
		}
	}
	return formatstr;
}

Date.prototype.ToShortDate = function() {
	if (!this) return "";
	var result = "";
	try {
		var date = this;
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1);
		month = month < 10 ? "0" + month : month.toString();
		var day = date.getDate();
		day = day < 10 ? "0" + day : day.toString();

		result = year + "-" + month + "-" + day;
	} catch (e) {

	}
	return result;
}

Date.prototype.ToLongDate = function() {
	if (!this) return "";
	var result = this.ToShortDate();
	try {
		var date = this;
		var hour = date.getHours();
		hour = hour < 10 ? "0" + hour : hour.toString();
		var minute = date.getMinutes();
		minute = minute < 10 ? "0" + minute : minute.toString();
		var second = date.getSeconds();
		second = second < 10 ? "0" + second : second.toString();

		result += " " + hour + ":" + minute + ":" + second;
	} catch (e) {

	}
	return result;
}

/**
 * 扩展方法：按字符串真实长度截取字符串，超出的部分显示...
 */
String.prototype.CutStr = function(len) {
	if (!this) return "";
	var temp;
	var icount = 0;
	var patrn = /[^\x00-\xff]/;
	var strre = "";
	for (var i = 0; i < this.length; i++) {
		if (icount < len) {
			temp = this.substr(i, 1);
			if (patrn.exec(temp) == null) {
				icount = icount + 1;
			} else {
				icount = icount + 2;
			}
			strre += temp;
		} else {
			break;
		}
	}
	return strre + "...";
}

/**
 * 根据url加载样式表，(相对路径,如css/bootstrap3/bootstrap.css)
 */
function LoadStyle(url) {
	if (!url) return;
	url = GetBaseUrl() + url;
	try {
		document.createStyleSheet(url);
	} catch (e) {
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = url;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(cssLink);
	}
}

/**
 * 根据url加载脚本，(相对路径,如js/jquery/md5/jquery.md5.js)
 */
function LoadJs(url, content) {
	if (!content) {
		Ajax(url, null, 'Get', 'text', function(source) {
			if (source != null) {
				var oHead = document.getElementsByTagName('HEAD').item(0);
				var oScript = document.createElement("script");
				oScript.language = "javascript";
				oScript.type = "text/javascript";
				oScript.defer = true;
				oScript.text = source;
				oHead.appendChild(oScript);
			}
		}, function(error) {

		});
	} else {
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var oScript = document.createElement("script");
		oScript.language = "javascript";
		oScript.type = "text/javascript";
		oScript.defer = true;
		oScript.text = content;
		oHead.appendChild(oScript);
	}
}

var Screen = {
	/**
	 * 获取页面可视宽度
	 */
	ViewWidth: function() {
		var d = document;
		var a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
		return a.clientWidth;
	},
	/**
	 * 获取页面浏览器的真实宽度
	 */
	Width: function() {
		var g = document;
		var a = g.body;
		var f = g.documentElement;
		var d = g.compatMode == "BackCompat" ? a : g.documentElement;
		return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
	},
	/**
	 * 获取页面可视高度
	 */
	ViewHeight: function() {
		var d = document;
		var a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
		return a.clientHeight;
	},
	/**
	 * 获取页面浏览器的真实高度
	 */
	Height: function() {
		var g = document;
		var a = g.body;
		var f = g.documentElement;
		var d = g.compatMode == "BackCompat" ? a : g.documentElement;
		return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
	},
	/**
	 * 获取元素的绝对Y坐标
	 */
	Top: function(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) offset += Screen.Top(e.offsetParent);
		return offset;
	},
	/**
	 * 获取元素的绝对X坐标
	 */
	Left: function(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) offset += Screen.Left(e.offsetParent);
		return offset;
	}
}

/**
 * 在页面底部调用此方法可以返回页面顶部
 */
function ReturnToTop() {
	var d = document.documentElement;
	var b = document.body;
	window.onscroll = null;

	var timer = setInterval(function() {
		d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
		b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
		if ((d.scrollTop + b.scrollTop) == 0) clearInterval(timer);
	}, 10);
}

function AddLoadEvent(func) {
	if (func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				oldonload();
				func();
			}
		}
	}
}

/**
 * 添加上传文件控件的验证方法<br>
 * 验证字段：<br>
 * 		【file_type】允许的文件类型，用“|”分割。<br>
 * 		【max_size】允许的最大文件长度，单位“kb”<br>
 * 验证字段使用方式示范：<br>
 * 		&lt;INPUT TYPE="file" NAME="file" file_type="png|zip|xls|xlsx|txt|asp" max_size="20" id="fileid" /&gt;
 */
function UploadFile() {
	var temp1 = document.getElementsByTagName('input');
	var language = GetLanguage();

	for (var i = 0; i < temp1.length; i++) {
		var file_types;
		var file_type = temp1[i].getAttribute('file_type');

		if (temp1[i].type && temp1[i].type.toLowerCase() == "file" && file_type) {
			var max_size = parseInt(temp1[i].getAttribute('max_size').toString());
			file_types = file_type.split('|');
			temp1[i].onchange = function(evt) {
				var src = evt.target.value;
				var index = src.lastIndexOf(".");
				var type;
				var output = "";
				var iserror = false;
				if (index >= 0) {
					type = src.substring(index + 1);
				} else {
					output += language.fileExtensionError + "<br />";
					iserror = true;
				}

				if (iserror == false && file_types.IsInArray(type) == -1) {
					output += language.fileTypeError.Format("<em>" + type + "</em>") + "<br />";
					iserror = true;
				}
				try {
					var f = evt.target.files[0];
					if (f.size > max_size * 1024) {
						output += language.fileLengthError.Format("<em>" + max_size + "</em>") + "<br />";
					}
					if (output.length > 0) {
						var size = 0;
						if (f.size >= 1024) {
							size = parseInt(f.size / 1024) + " kb";
						} else {
							size = f.size + " b";
						}
						output += language.fileInfo.Format(f.name, (f.type) ? f.type : language.fileInfoNoType, size, f.lastModifiedDate.ToFormatString("yyyy-MM-dd HH:mm:ss"));
						iserror = true;
					}
				} catch (e) {}

				if (iserror) PopupWindow(language.fileErrorPanelTitle, output);
				var form = document.forms[0];
				form.onsubmit = function() {
					return !iserror;
				};
			};
		}
	}
}

/**
 * 属性扩展，为不支持placeholder的浏览器添加脚本支持
 */
function AddPlaceHolder() {
	if (Config.IsFixIE9) {
		if (Browser.MSIE() == 9) {
			var inputs = document.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++) {
				var ph = inputs[i].getAttribute("placeholder");
				var type = inputs[i].getAttribute("type");
				if (!type) {
					type = "text";
				}
				if (ph) {
					if (!inputs[i].value) {
						if (type && type.toLowerCase() == "password") {
							inputs[i].setAttribute("type", "password1");
						}
						inputs[i].value = ph;
					}
					inputs[i].onfocus = function() {
						var otype = this.getAttribute("type");
						if (otype && otype == "password1") {
							this.setAttribute("type", "password");
						}
						var placeholder = this.getAttribute("placeholder");
						if (this.value && this.value == placeholder) {
							this.value = "";
						}
					}
					inputs[i].onblur = function() {
						var otype = this.getAttribute("type");
						if (!this.value) {
							this.value = this.getAttribute("placeholder");
							if (otype && otype == "password") {
								this.setAttribute("type", "password1");
							}
						} else {
							if (otype && otype == "password1") {
								this.setAttribute("type", "password");
							}
						}
					}
				}
			}
		}
	}
}

/**
 * 弹出 bootstrap 3.0 的窗口 <br>
 * @title: 标题<br>
 * @content，内容（支持html格式）<br>
 * @width，不指定宽度，默认自适应<br>
 * @height，不指定高度，默认根据内容自适应<br>
 */

function PopupWindow(title, content, width, height) {
	var btn = document.getElementById('btn_show_error_panel');
	if (btn) {
		var titlePanel = document.getElementById('error_panel_title');
		var contentPanel = document.getElementById('error_panel_content');
		titlePanel.innerText = title;
		contentPanel.innerHTML = content;
		btn.click();
	}
	//	var div = document.createElement("div");
	//
	//	div.setAttribute("id", "divPopup");
	//	document.body.appendChild(div);
	//	var divExtenal = document.createElement("div");
	//	divExtenal.setAttribute("style", "width: 100%; position: absolute; top: 0px; left: 0px; height: " + Screen.Height() + "px; z-index: 2013; background-color: rgba(204, 204, 204, 0.5);");
	//	divExtenal.setAttribute("id", "divExtenal");
	//	divExtenal.setAttribute("onclick", "document.body.removeChild(document.getElementById('divPopup'));document.body.removeChild(document.getElementById('divExtenal'));");
	//	document.body.appendChild(divExtenal);
	//	var divRoot = document.createElement("div");
	//	divRoot.setAttribute("class", "panel panel-default customMsg");
	//	div.appendChild(divRoot);
	//	var divHeader = document.createElement("div");
	//	divHeader.setAttribute("class", "panel-heading customMsgHeader");
	//	divRoot.appendChild(divHeader);
	//	divHeader.innerHTML = title;
	//	var divContent = document.createElement("div");
	//	divContent.setAttribute("class", "panel-body customMsgContent");
	//	divRoot.appendChild(divContent);
	//	divContent.innerHTML = content;
	//	var divWidth = width > 0 ? width : 0;
	//	var divHeight = height > 0 ? height : 0;
	//	divHeight = divHeight > 0 ? divHeight : div.offsetHeight;
	//	var fontsize;
	//	if (divWidth == 0) {
	//		if (navigator.userAgent.match(/mobile/i)) {
	//			divWidth = Screen.ViewWidth() * 0.8;
	//			fontsize = 3;
	//		} else {
	//			divWidth = Screen.ViewWidth() * 0.35;
	//			fontsize = 1.2;
	//		}
	//	}
	//	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
	//	var divTop = 20 + scroll;
	//	var divLeft = (Screen.ViewWidth() - divWidth) / 2;
	//	var divStyle = "width: {0}px; position: absolute; top: {1}px; left: {2}px; z-index:2014;font-size:{3}em;";
	//	div.setAttribute("style", divStyle.Format(divWidth, divTop, divLeft, fontsize));
}

/** 检查元素是否存在于数组之中 */
Array.prototype.IsInArray = function(n) {
	var index = -1;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == n) {
			index = i;
		}
	}
	return index;
}

Array.prototype.RemoveAt = function(n) {
	if (n < 0) {
		return this;
	} else {
		var back = this.slice(n + 1, this.length);
		var front = this.slice(0, n);
		return front.concat(back);
	}
}

function pushMessage(title, content, type) {
	var t = "";
	switch (type) {
		case 1:
			t = "info";
			break;
		case 2:
			t = "success";
			break;
		case 3:
			t = "warning";
			break;
		case 4:
			t = "alert";
			break;
		default:
			t = "success";
			break;
	}
	$.Notify({
		caption: title,
		content: content,
		type: t
	});
}

function loading(isshow, msg) {
	var loading = document.getElementsByClassName('wx_loading')[0];
	loading && loading.parentNode && loading.parentNode.removeChild(loading);

	msg = msg ? msg : "页面加载中...";
	if (isshow == undefined || isshow == null) {
		var div = document.createElement('div');
		div.setAttribute('class', 'wx_loading');
		div.setAttribute('id', 'wxloading');
		div.innerHTML = '<div class="wx_loading_inner"><i class="wx_loading_icon"></i>' + msg + '</div>';
		document.body.appendChild(div);
	} else {
		loading && loading.parentNode && loading.parentNode.removeChild(loading);
	}
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);