<?php
define("DS", DIRECTORY_SEPARATOR);
define("DATA_PATH", dirname(__FILE__).DS.str_replace("/", DS,"../../data/Base64Encode".DS));
require_once (dirname(__FILE__)."/../func.php");

$path = $argv['1'];

if(!is_file($path)){ 
	echo $path." is not a file".PHP_EOL;
	return;
}
$file = file_get_contents($path);
$ext = pathinfo($path,PATHINFO_EXTENSION);
$base64 = base64_encode($file);
$tpl = "";
if($ext == "png"){ 
	$tpl = "data:image/png;base64,";
}
if($tpl == "jpeg"){ 
	$tpl = "data:image/jpeg;base64,";
}

if($tpl == "gif"){ 
	$tpl = "data:image/gif;base64,";
}
$tpl .= $base64;
file_put_contents(DATA_PATH."base64.txt", $tpl);

xiaok::explorer(DATA_PATH."base64.txt");