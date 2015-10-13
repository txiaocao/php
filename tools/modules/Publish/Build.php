<?php
	
	require_once("BuildFile.php");
	$file = $argv['1'];
	if(!is_file($file)){ 
		echo $file." not file".PHP_EOL;
		return;
	}
	$pub = new publisher($argv['1']);
	echo "Over".PHP_EOL;