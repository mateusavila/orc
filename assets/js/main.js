var $app = angular.module('app', ['ngRoute']);
$app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/',{controller:dashboard, templateUrl:'templates/dashboard.html'}).
	when('/tarefa', {templateUrl: 'templates/tarefa.html',controller: listItens}).
	when('/projeto', {templateUrl: 'templates/projeto.html',controller: listItens}).
	when('/profissional', {templateUrl: 'templates/profissional.html',controller: listItens}).
	when('/logoff', {controller: logoffCtrl, templateUrl:'templates/dashboard.html'}).
	otherwise({ redirectTo: '/' });
}]);

$app.run(function($rootScope, $http){
	if(window.sessionStorage.getItem('login')){
		return;
	}else{
		window.location.href = "index.html";
	}
});

// primeira diretiva



var sortingOrder = 'name';
function dashboard($scope) {
	"use strict";
	

}
function logoffCtrl($scope, $location, $http) {
	"use strict";
	$http({
		method:'POST',
		url:'logoff.php'
	}).success(function(data){
		window.sessionStorage.removeItem('login');
		window.location.href = "index.html";
	});
	

}
function listItens($scope, $http, $location, $filter) {
	"use strict";

	// init
	$scope.tarefas = [];
	$scope.itens = [];
	$scope.chk = [];

	$scope.totalPages = 0;
	$scope.action = $location.$$path.split('/')[1];
	$scope.getList = function(){
		$http({method:'GET', url:'get.php?action='+$scope.action}).success(function(data){
			$scope.tarefas = data.tarefas;
			$scope.totalPages = data.totalPages;
			for (var i = 0; i < data.tarefas.length; i++) {
				$scope.itens.push(data.tarefas[i].id);

			};
			$scope.search();
		});
		console.log('trigger get List');
	}
	$scope.init = function(){
		$scope.getList();
	}
	
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
		$http({
			method: "POST",
			url: "delete.php",
			data: $scope.itensDel
		}).success(function(data){
			console.log(data);
			$scope.getList();
		});
	}

	$scope.data = {};
	$scope.open = function() {
		"use strict";
		$scope.editItem = false;
		$http({method:'GET', url:'get_by_id.php?id='+this.tarefa.id+"&action="+$scope.action}).success(function(data){
			$scope.data = data;
			$('#editForm').removeClass('hidden');
		});
		console.log('trigger open');
	}
	$scope.update = function(){
		console.log('trigger update');
		$scope.dados = {};
		$http({
			method:'POST',
			url:'update.php?action='+$scope.action+'&id='+$scope.data.id,
			data: $scope.data
		}).success(function(data){
			if(data.status===0){
				// aqui é pra fazer uma animação ou coisa bonita
				$scope.dados.message = data.message;
				$scope.getList();
				$scope.dados = {};
			}
		});
		
	}
	$scope.save = function(){
		$scope.dados = {};
		$http({
			method:'POST',
			url:'save.php',
			data: $scope.dadoss
		}).success(function(data){
			if(data.status===0){
				// aqui é pra fazer uma animação ou coisa bonita
				$scope.dados.message_save = data.message_save;
				$scope.getList();
				$scope.novoItem = true;
			}
		});
	}

	// novo Item
	$scope.novoItem = true;

	// scroll infinito
	$scope.loadMore = function(){
		$scope.totalDisplayed += 1;
	}

	// addCnotent
	$scope.addItem = function(parametros) {
		"use strict";
		//conteúdo da função
	}

	// criando uma paginação
	// total de páginas
	$scope.sortingOrder = sortingOrder;
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 1;
	$scope.totalDisplayed = $scope.itemsPerPage;
	$scope.pagedItems = [];
	$scope.currentPage = 0;

	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	// init the filtered items
	$scope.search = function () {
		$scope.filteredItems = $filter('filter')($scope.tarefas, function (tarefa) {
			for(var attr in tarefa) {
				if (searchMatch(tarefa[attr], $scope.query))
					return true;
			}
			return false;
		});
		// take care of the sorting order
		if ($scope.sortingOrder !== '') {
			$scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
		}
		$scope.currentPage = 0;
		// now group by pages
		$scope.groupToPages();
	};
	
	// calculate page in place
	$scope.groupToPages = function () {
		$scope.pagedItems = [];
		
		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};
	
	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};
	
	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};
	
	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
	};
	
	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

	// functions have been describe process the data for display
	

	// change sorting order
	$scope.sort_by = function(newSortingOrder) {
		if ($scope.sortingOrder == newSortingOrder)
			$scope.reverse = !$scope.reverse;

		$scope.sortingOrder = newSortingOrder;

		// icon setup
		$('th i').each(function(){
			// icon reset
			$(this).removeClass().addClass('icon-sort');
		});
		if ($scope.reverse)
			$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
		else
			$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
	};

	
	


	// adicionar campo
	$scope.fields = [{id:'field1'}];
	$scope.addField = function(){
		var newItemNo = $scope.fields.length+1;
		$scope.fields.push({'id':'field'+newItemNo});
	}
	$scope.printResult = function(){
		console.log($scope.fields);
	}

	// iniciando a baçaga
	$scope.init();
}