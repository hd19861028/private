function Ajax(url, dataType, fnSuccess, parameter, fnError, type) {
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

var angular = new angular_mobile();
angular.set('info', {
	counts: [1, 1, 1, 1, 1],
	point: [1, 2, 3, 4, 5, 6]
}, function() {
	var divs = document.querySelectorAll('div[template]');
	var url = divs[0].getAttribute('template');
	Ajax(url, 'html', function(data) {
		for (var i = 0; i < divs.length; i++) {
			divs[i].innerHTML = data;
		}
	})
})

var music = document.getElementById('music');
var style = document.getElementById("dynamic");
var mask = document.getElementById('mask');
var sarray = [];

function startGame(btn) {
	try {
		mask.style.display = 'none';
		btn.remove()
	} catch (e) {}
	music.play();
	music.pause();
	console.log(document.querySelector('div:first-child').style.visibility)
	document.querySelector('div:first-child').style.visibility = ''
}

function init() {
	sarray = [];
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			for (var x = 0; x < 5; x++) {
				for (var y = 0; y < 5; y++) {
					if (!(i == x && j == y)) {
						var a = i * 90,
							b = j * 90,
							c = x * 90,
							d = y * 90;
						var keyframes = '\
@-webkit-keyframes t_{0}_{1}_{2}_{3} {\
	0% {\
		-webkit-transform: perspective(2000px) rotateX({0}deg) rotateY({1}deg);\
		transform: perspective(2000px) rotateX({0}deg) rotateY({1}deg);\
	}\
	100% {\
		-webkit-transform: perspective(2000px) rotateX({2}deg) rotateY({3}deg);\
		transform: perspective(2000px) rotateX({2}deg) rotateY({3}deg);\
	}\
}';
						sarray.push(keyframes.Format(a, b, c, d));
					}
				}
			}
		}
	}
}
init();
style.innerHTML += sarray.join('');
var lastData = new Array();

function start() {
	music.currentTime = 0;
	music.play();
	var bs = document.getElementsByClassName("container");
	var rx, ry, time, maxt = 0;
	for (var i = 0; i < bs.length; i++) {
		rx = Math.ceil(Math.random() * 4) * 90;
		ry = Math.ceil(Math.random() * 4) * 90;
		time = Math.ceil(Math.random() * 6 + 4) / 10;
		maxt = time > maxt ? time : maxt;
		setAnimation(bs[i], format("t_{0}_{1}_{2}_{3}", lastData[i] ? lastData[i].rx : 0, lastData[i] ? lastData[i].ry : 0, rx, ry), time + "s", 1);
		setTransform(bs[i], rx, ry);
		lastData[i] = {
			rx: rx,
			ry: ry
		};
	}
}

function setAnimation(obj, keyframe, duration, count) {
	var animation = format("{0} {1} {2} {3}", keyframe, duration, count, "normal");
	var timeFunction = "ease-in-out";
	obj.style.webkitAnimation = animation;
	obj.style.webkitAnimationTimingFunction = timeFunction;
	obj.style.animation = animation;
	obj.style.animationTimingFunction = timeFunction;
}

function setTransform(obj, rx, ry) {
	obj.style.webkitTransform = format("perspective(2000px) rotateX({0}deg) rotateY({1}deg)", rx, ry);
	obj.style.transform = format("perspective(2000px) rotateX({0}deg) rotateY({1}deg)", rx, ry);
}

function format(str) {
	var result = str;
	if (arguments.length > 1) {
		if (arguments.length == 2 && typeof(arguments[1]) == "object") {
			for (var p in arguments[1]) {
				var reg = new RegExp("({" + p + "})", "g");
				result = result.replace(reg, arguments[1][p]);
			}
		} else {
			for (var i = 1; i < arguments.length; i++) {
				var reg = new RegExp("({[" + (i - 1) + "]})", "g");
				result = result.replace(reg, arguments[i]);
			}
		}
	} else {
		return str;
	}
	return result;
}
var SHAKE_THRESHOLD = 2000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
(function() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
		alert('not support mobile event');
	}
})()
var lock = true;

function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity;
	var curTime = new Date().getTime();
	if ((curTime - last_update) > 100) {
		var diffTime = curTime - last_update;
		last_update = curTime;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
		if (speed > SHAKE_THRESHOLD && lock) {
			start();
			lock = false;
			var timer = setTimeout(function() {
				lock = true;
				clearTimeout(timer);
			}, 500);
		}
		last_x = x;
		last_y = y;
		last_z = z;
	}
}