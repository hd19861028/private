/* Controllers */
app.controller('ResetPwdController', ['$scope', 'BaseService',
	function($scope, BaseService) {
		$scope.user = {};

		$scope.Reset = function() {
			if (!$scope.user.old) {
				pushMessage('错误', '原密码不能为空', 4)
				return;
			}
			if (!$scope.user.new) {
				pushMessage('错误', '新密码不能为空', 4)
				return;
			}
			if ($scope.user.new2 != $scope.user.new) {
				pushMessage('错误', '2次输入的密码不一致', 4)
				return;
			}

			BaseService.resetpwd($scope.user)
				.then(function(d) {
					if (d.status) {
						window.location.href = "index.html"
					} else {
						pushMessage('错误', d.message, 4);
					}
				})
		}
		
		$scope.Return = function(){
			window.location.href = "index.html";
		}
	}
]);