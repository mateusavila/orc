var $app = angular.module('app', ['ngRoute']);


$app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/',{controller:listController, templateUrl:'templates/dashboard.html'}).
	when('/tarefa/edit/:id', {templateUrl: 'templates/tarefa_edit.html',controller: editController}).
	when('/tarefa', {templateUrl: 'templates/tarefa.html',controller: listItens}).
	when('/tarefa/new', {templateUrl: 'templates/tarefa_add.html',controller: newController}).
	when('/projeto/edit/:id', {templateUrl: 'templates/projeto_edit.html',controller: editController}).
	when('/projeto', {templateUrl: 'templates/projeto.html',controller: editController}).
	when('/projeto/new', {templateUrl: 'templates/projeto_add.html',controller: newController}).
	when('/profissional/edit/:id', {templateUrl: 'templates/profissional_edit.html',controller: editProfissional}).
	when('/profissional', {templateUrl: 'templates/profissional.html',controller: listItens}).
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
function listItens($scope, $http, $location) {
	"use strict";
	$scope.tarefas = [];
	$scope.itens = [];
	$scope.chk = [];
	$scope.action = $location.$$path.split('/')[1];
	$http({method:'GET', url:'get.php?action='+$scope.action}).success(function(data){
		$scope.tarefas = data.tarefas;
		for (var i = 0; i < data.tarefas.length; i++) {
			$scope.itens.push(data.tarefas[i].id);
		};
	});
	$scope.$watch('master', function(value){
		for (var i = 0; i < $scope.tarefas.length; i++) {
			$scope.tarefas[i].isChecked = value;
		}
	});
	$scope.itensDel = [];
	$scope.delete = function(){
		$scope.itensDel = [];
		for (var i = 0; i < $scope.tarefas.length; i++) {
			if($scope.tarefas[i].isChecked){
				$scope.itensDel.push($scope.tarefas[i].id);
			}else{
				$scope.itensDel.slice($scope.tarefas[i].id);
			}
		};
		console.log($scope.itensDel);
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