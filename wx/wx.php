<?php
header('Content-type: text/javascript');
//error_reporting(E_ALL);
//ini_set("display_errors",'on');
date_default_timezone_set('PRC');
require_once 'hbwx.php';
$get = json_decode(urldecode($_GET['ref']), true);
$data = array();
$data['title'] = $get['title'];
$data['desc'] = $get['desc'];
$data['imgUrl'] = $get['imgUrl'];
$data['url'] = $get['url'];
$hbwx = new hbwx($data);
$data = $hbwx->setJSTicket()->setSignature()->getData();
$data = json_encode($data);
//var_dump($data);
?>
wx = wx||{};
wx.data = <?php echo $data?>;