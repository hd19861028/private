app.factory('BaseService', ['$q', '$http',
	function($q, $http) {
		var getMenus = function(m, c) {
			var d = $q.defer();
			$http({
					method: "get",
					url: "/api/menu",
					responseType: "json",
					timeout: "3000",
					cache: true,
					params: {
						m: m || 0,
						c: c || 0
					}
				})
				.success(function(data, status) {
					d.resolve(data);
				}).error(function(data, status) {
					d.reject(data);
				});
			return d.promise;
		}

		var getNews = function(type, index, size) {
			var d = $q.defer();
			$http({
					method: "get",
					url: "/api/news/list",
					responseType: "json",
					timeout: "3000",
					cache: true,
					params: {
						type: type,
						index: index,
						size: size
					}
				})
				.success(function(data, status) {
					d.resolve(data);
				})
				.error(function(data, status, e) {
					if (status == 403) {
						alert('当前尚未登录!');
						window.location.href = "login.html"
					}
					d.reject(data);
				});
			return d.promise;
		}

		var getNewsDetail = function(id) {
			var d = $q.defer();
			$http({
					method: "get",
					url: "/api/news/detail",
					responseType: "json",
					timeout: "3000",
					cache: true,
					params: {
						id: id
					}
				})
				.success(function(data, status) {
					d.resolve(data);
				}).error(function(data, status) {
					d.reject(data);
				});
			return d.promise;
		}

		var deleteNews = function(ids) {
			var d = $q.defer();
			$http({
					method: "get",
					url: "/api/news/delete",
					responseType: "json",
					timeout: "3000",
					cache: true,
					params: {
						ids: ids.join(',')
					}
				})
				.success(function(data, status) {
					d.resolve(data);
				}).error(function(data, status) {
					d.reject(data);
				});
			return d.promise;
		}

		var saveNews = function(id, type, title, footer, content) {
			var fd = new FormData(document.forms.namedItem("frm"));
			fd.append('id', id);
			fd.append('type', type)
			fd.append('title', title)
			fd.append('footer', footer)
			fd.append("content", encodeURIComponent(content));
			if ($('#file')[0].files.length > 0) {
				fd.append("image", $('#file')[0].files[0]);
			}

			var oReq = new XMLHttpRequest();
			oReq.open("POST", "/api/news/save/", true);
			oReq.onload = function(e) {
				if (oReq.status == 200) {
					var r = JSON.parse(oReq.responseText)
					if (r.status) {
						WebStorage.Session.Del('id');
						window.location.href = 'index.html';
					} else {
						pushMessage('保存失败', r.message, 4);
					}
				}
			};

			oReq.send(fd)
		}

		var login = function(user) {
			var d = $q.defer();
			$http.post("/api/login", {
					name: user.name,
					password: user.password
				})
				.success(function(data, status) {
					d.resolve(data);
				}).error(function(data, status) {
					d.reject(data);
				});
			return d.promise;
		}

		var resetPwd = function(user) {
			var d = $q.defer();
			$http.post("/api/login/resetpwd", {
					oldpwd: user.old,
					newpwd: user.new2
				})
				.success(function(data, status) {
					d.resolve(data);
				}).error(function(data, status) {
					d.reject(data);
				});
			return d.promise;
		}

		return {
			menus: getMenus,
			news: getNews,
			newsDetail: getNewsDetail,
			delete: deleteNews,
			save: saveNews,
			login: login,
			resetpwd: resetPwd
		};
	}
]);