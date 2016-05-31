/* Controllers */
app.controller('LoginController', ['$scope', 'BaseService',
	function($scope, BaseService) {
		$scope.user = {};

		$scope.Login = function() {
			if (!$scope.user.name) {
				pushMessage('错误', '用户名不能为空', 4)
				return;
			}
			if (!$scope.user.password) {
				pushMessage('错误', '密码不能为空', 4)
				return;
			}

			BaseService.login($scope.user)
				.then(function(d) {
					if (d.status) {
						window.location.href = "index.html"
					} else {
						pushMessage('错误', d.message, 4);
					}
				})
		}
	}
]);