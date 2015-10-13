<?php
require_once ("qrlib.min.php");
$data = [];
$data['data'] = isset($_REQUEST['data']) ? (string) $_REQUEST['data'] : "";
$data['size'] = isset($_REQUEST['size']) ? (int) $_REQUEST['size'] : 10;
$data['border'] = isset($_REQUEST['border']) ? (int) $_REQUEST['size'] : 2;

QRcode::png($data['data'], false, QR_ECLEVEL_L, $data['size'], $data['border']);