var $app = angular.module('app', ['ngRoute']);


$app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/',{controller:listController, templateUrl:'templates/dashboard.html'}).
	when('/tarefa/edit/:id', {templateUrl: 'templates/tarefa_edit.html',controller: editController}).
	when('/tarefa', {templateUrl: 'templates/tarefa.html',controller: editController}).
	when('/tarefa/new', {templateUrl: 'templates/tarefa_add.html',controller: newController}).
	when('/projeto/edit/:id', {templateUrl: 'templates/projeto_edit.html',controller: editController}).
	when('/projeto', {templateUrl: 'templates/projeto.html',controller: editController}).
	when('/projeto/new', {templateUrl: 'templates/projeto_add.html',controller: newController}).
	when('/profissional/edit/:id', {templateUrl: 'templates/profissional_edit.html',controller: editProfissional}).
	when('/profissional', {templateUrl: 'templates/profissional.html',controller: listProfissional}).
	when('/profissional/new', {templateUrl: 'templates/profissional_add.html',controller: newController}).
	otherwise({ redirectTo: '/' });
}]);

$app.run(function($rootScope){
	if(window.sessionStorage.getItem('login')){
		return;
	}else{
		window.location.href = "index.html";
	}
});
function listController($scope) {
	"use strict";
	

}
function listProfissional($scope, $http) {
	"use strict";
	$scope.nomes = [];
	$scope.itens = [];
	$scope.data = {};
	$http({method:'GET', url:'get_profissional.php'}).success(function(data){
		$scope.nomes = data;
	});
	$scope.deleteAll = function(){

		$http({
			method:'POST',
			url:'delete.php',
			data: $scope.data
		}).success(function(data){
			if(data.status===0){
				console.log(data.message)
				// aqui é pra fazer uma animação ou coisa bonita
				// $location.path('/');
			}
		});
	}
	$scope.data.itens = false;
	$scope.data.ids = [];
	$scope.getAll = function(){
		if($scope.data.itens){
			for (var i = 0; i < $scope.nomes.nomes.length; i++) {
				$scope.data.ids.push($scope.nomes.nomes[i].id);
			};
		}else{
			$scope.data.ids = [];
		}
		console.log($scope.data.ids);
	}
	$scope.unique = function(){
		console.log($scope);
	}
}
function editProfissional($scope, $location, $routeParams, $http) {
	"use strict";
	$scope.fdata = {};
	$scope.data = [];
	$http({method:'GET', url:'get_profissional_by_id.php?id='+$routeParams.id}).success(function(data){
		$scope.fdata.nome = data.nome;
	});
	// salvar a mudança do dado
	$scope.save = function(){
		$http({
			method:'POST',
			url:'save.php',
			data: $scope.fdata
		}).success(function(data){
			if(data.status===0){
				// aqui é pra fazer uma animação ou coisa bonita
				$location.path('/');
			}
		});
	}



}
function editController($scope, $location, $routeParams) {
	"use strict";
}
function newController($scope, $location) {
	"use strict";
}