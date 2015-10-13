<?php 
header('Content-type: text/javascript');
echo "var geo_server = "."'http://".$_SERVER['HTTP_HOST']."';".PHP_EOL;
echo file_get_contents( 'load.js');