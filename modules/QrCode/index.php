<?php
define("DS", DIRECTORY_SEPARATOR);
require_once (dirname(__FILE__)."/../func.php");
require_once ("qrlib.min.php");
define("DATA_PATH", dirname(__FILE__).DS.str_replace("/", DS,"../../data/QrCode".DS));

$data = [];
$data['data'] = $argv['1'];
$data['size'] = 20;
$data['border'] =  2;

$filename = DATA_PATH."qr.png";
QRcode::png($data['data'], $filename, QR_ECLEVEL_L, $data['size'], $data['border']);


$cmdtpl = "explorer.exe %s";
$cmd = sprintf($cmdtpl,$filename);

xiaok::shell($cmd);
