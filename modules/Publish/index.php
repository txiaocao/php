<?php

ini_set ('memory_limit', '128M');
// php packer /k/www/game
// publish path /k/www/game_publish


require_once("publisher.php");

$path = $argv['1'];

if(!is_dir($path)){ 
	echo $path." is not an directory".PHP_EOL;
	return;
}

$pub = new publisher($argv['1']);


