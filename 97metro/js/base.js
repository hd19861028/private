/* Controllers */
app.controller('BaseController', ['$scope', 'BaseService',
	function($scope, BaseService) {

		$('body').css('height', Screen.ViewHeight() + 300)

		$scope.news = {};

		var itemid = WebStorage.Session.Get('id');
		if (itemid != null) {
			if (itemid != "0") {
				BaseService.newsDetail(itemid)
					.then(function(info) {
						$scope.news = info;
						var ue = UE.getEditor('editor');
						ue.ready(function() {
							ue.setContent(info.content);
						});
					})
			}
		}

		var selMenu = +WebStorage.Session.Get('menu');
		$scope.selectedMenu = selMenu == 0 ? 1 : selMenu;

		var selSlider = +WebStorage.Session.Get('slider');
		$scope.selectedSliderId = selSlider == 0 ? -1 : selSlider;

		BaseService.menus()
			.then(function(data) {
				$scope.menus = data;
				return BaseService.menus($scope.selectedMenu);
			})
			.then(function(data) {
				var index = 0;
				for (var i = 0; i < data.length; i++) {
					if (data[i].id == $scope.selectedSliderId) {
						index = i;
					}
				}
				data[index].active = true;
				$scope.selectedSlider = data[index];
				if ($scope.selectedSliderId == -1) {
					WebStorage.Session.Set('slider', data[index].id);
					window.location.reload();
				}

				$scope.sliders = data;
			})

		$scope.SelectModule = function(type) {
			if (type != 6) {
				BaseService.menus(type)
					.then(function(data) {
						data[0].active = true;
						WebStorage.Session.Set('menu', type);
						$scope.selectedSlider = data[0];
						WebStorage.Session.Set('slider', data[0].id);
						$scope.sliders = data;
						window.location.reload();
					})
			}
		}

		$scope.SelectSlider = function(id) {
			WebStorage.Session.Set('slider', id);
			for (var i = 0; i < $scope.sliders.length; i++) {
				if ($scope.sliders[i].id == id) {
					$scope.sliders[i].active = true;
					$scope.selectedSlider = $scope.sliders[i];
				} else {
					$scope.sliders[i].active = false;
				}
			}
			window.location.reload();
		}

		$scope.size = 10;

		$scope.loadList = function(index, size, success, error) {
			loading()
			BaseService.news($scope.selectedSliderId, index, size)
				.then(function(data) {
					$scope.total = data.total;
					$scope.news = data.rows;
					success($scope.total)
					loading(0)
				}, function() {
					loading(0)
				})

		}

		var ischeck = false;

		$scope.CheckAll = function() {
			ischeck = !ischeck;
			for (var i = 0; i < $scope.news.length; i++) {
				$scope.news[i].active = ischeck;
			}
		}

		$scope.Check = function(id) {
			for (var i = 0; i < $scope.news.length; i++) {
				if ($scope.news[i].id == id) {
					$scope.news[i].active = !$scope.news[i].active;
				}
			}
		}

		$scope.Add = function() {
			WebStorage.Session.Set('id', 0)
			window.location.href = 'add.html';
		}

		$scope.Edit = function(id) {
			WebStorage.Session.Set('id', id)
			window.location.href = 'add.html';
		}

		$scope.Delete = function() {
			var confirm = window.confirm('此操作将删除所选条目，是否确定继续？');
			if (confirm) {
				var ids = [];
				for (var i = 0; i < $scope.news.length; i++) {
					if ($scope.news[i].active) {
						ids.push($scope.news[i].id)
					}
				}
				BaseService.delete(ids)
					.then(function(r) {
						if (r.status) {
							window.location.reload();
						} else {
							pushMessage('错误', '删除失败', 4)
						}
					})
			}
		}

		$scope.Return = function() {
			WebStorage.Session.Del('id')
			window.location.href = 'index.html';
		}

		$scope.Save = function() {
			var content = $('#ueditor_0').contents().find('body').html();
			
			if (!$scope.news.title) {
				pushMessage('错误', '标题不能为空', 4)
				return;
			}
			if (!content) {
				pushMessage('错误', '正文不能为空', 4)
				return;
			}
			if ($('#file')[0].files.length == 0 && itemid == "0") {
				pushMessage('错误', '必须选择一张图片', 4)
				return;
			}
			
			BaseService.save(
				itemid,
				WebStorage.Session.Get('slider'),
				$scope.news.title,
				$scope.news.footer || '',
				content
			)
		}
	}
]);