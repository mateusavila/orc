<?php
session_start();
$_SESSION = array();
session_destroy();
ob_end_clean();
?>