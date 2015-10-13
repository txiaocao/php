<?php

function dd($data){ 
	var_dump($data);
	exit;
}

require_once("typescript.php");

$path = $argv['1'];

if(!is_dir($path)){ 
	echo $path." is not an directory".PHP_EOL;
	return;
}
$pub = new typescript($argv['1']);


