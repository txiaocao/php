<?php
if (isset($_SERVER['REQUEST_METHOD'])) {
	echo "o_o";
	exit;
} else {
	echo "^_^" . PHP_EOL;
}

define("DS", DIRECTORY_SEPARATOR);
define("DATA_PATH",  dirname(__FILE__).DS."..".DS."..".DS."data".DS."DownloadHar");

require_once "make.php";

$mk = new make();
//$mk->create("xingggg");

$dir = DATA_PATH. DS . "har";

$dh = opendir($dir);
while (false !== ($filename = readdir($dh))) {
	if (is_file($dir . DS . $filename)) {
		$project = str_replace(".har", "", $filename);
		$mk->create($project);
	}
	//echo $filename.PHP_EOL;
	//$files[] = $filename;
}
