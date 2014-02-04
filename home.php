<!doctype html>
<html class="no-js" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>Orçamentos!</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="assets/css/style.css">
	<script src="assets/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
	<h1><a href="#/">Sistema de Orçamento</a></h1>
	<nav>
		<ul>
			<li><a href="#/projeto">Projetos</a></li>
			<li><a href="#/tarefa">Tarefas</a></li>
			<li><a href="#/profissional">Profissionais</a></li>
		</ul>
	</nav>
	<div ng-view></div>
	



	<script src="assets/js/vendor/angular.js"></script>
	<script src="assets/js/vendor/angular.route.js"></script>
	<script type="text/javascript" src="http://zeptojs.com/zepto.min.js"></script>
	<script src="assets/js/main.js"></script>
</body>
</html>
