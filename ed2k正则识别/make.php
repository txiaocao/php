<?php

$content = file_get_contents("raw.txt");
$ed2k = [];
preg_match_all("/ed2k:\/\/(.*?)\//",$content,$ed2k);
$tmp  = $ed2k[0];

$tmp=array_unique($tmp);
$url = implode($tmp, PHP_EOL);
$url = str_replace("(ED2000.COM)", "", $url);
echo $url;
