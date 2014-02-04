<?php
/*
// Classe Banco de dados versão 2.0 - limpeza de funções inúteis
// Mateus Ávila Isidoro
// mavisidoro@gmail.com
// 48 8449 9834
*/
include "zenitBD_include.php";
	class Database{
		// aqui iniciamos as propriedades da classe formularios
		private $database;
		private $user;
		private $password;
		private $server;
		// usando funções ogras, ainda
		function __construct() {
			$this->database = DATABASE;
			$this->server = SERVERDB;
			$this->user = USERNAME;
			$this->password = PASSWORD;
			$this->connection = mysql_connect($this->server, $this->user, $this->password) or die(mysql_error());
			if($this->connection){
				mysql_select_db($this->database);
				mysql_set_charset('utf8',$this->connection);
				mysql_query("SET NAMES 'utf8'");
				mysql_query("SET character_set_connection=utf8");
				mysql_query("SET character_set_client=utf8");
				mysql_query("SET character_set_results=utf8");
			}else{
				mysql_error(mysql_errno());
			}
		}
		public function disconnect(){
			mysql_close($this->connection);
		}
		public function prepare($string){
			$str = mysql_real_escape_string($string);
			$str = stripslashes($str);
			return $str;
		}
		public function select($sql){
			$sql = $this->prepare($sql);
			$select = mysql_query($sql) or die ( mysql_error() );
			return $select;
		}
		public function fetch_array($result_set){
			return mysql_fetch_array($result_set, MYSQL_BOTH);
		}
		public function count($database){
			$select = $this->select($database);
			$quantidade = mysql_num_rows($select);
			return $quantidade;
		}

		public function convertDate($date){
			$d = explode("-", $date);
			$newdata = "$d[2]/$d[1]/$d[0]";
			return $newdata;
		}
		public function gerar_codigo(){
			$str = uniqid();
			return $str;
		}
		
		// funções auxiliares
		public function is_ajax(){
			if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
				return true;
			}else{
				return false;
			}
		}
	
}
