function userCtrl($scope, $http){
	"use strict";
	$scope.submit = function(){
		// faz a requisição para o servidor
		if($scope.login.length > 0 && $scope.password.length > 0){
			$http({method:'POST', url:'login.php'}).success(function(data){
				console.log(data.message);
			});
		}
	}
}