function userCtrl($scope, $http){
	"use strict";
	$scope.submit = function(){
		// faz a requisição para o servidor
		$http({
			method:'POST',
			url:'login.php',
			data: $scope.data
		}).success(function(data){
			if(data.status===0){
				window.location.href = "home.php"
			}
		});
	}
}