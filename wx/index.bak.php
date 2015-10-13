<?php
date_default_timezone_set('PRC');
//error_reporting(E_ALL);
//ini_set("display_errors",'on');
require_once 'hbwx.php';
$get = json_decode(base64_decode( $_GET['ref']),true);
$data = array();
$data['title'] =$get['title'];
$data['desc'] = $get['desc'];
$data['imgUrl'] = $get['imgUrl'];
$hbwx = new hbwx($data);
$data = $hbwx->setJSTicket()->setSignature()->getData();
?><!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title></title>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <style>
        iframe,
    body,
    html {
        border: none;
        margin: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
        </style>
    </head>

    <body>
        <iframe src="<?php echo $get['url']; ?>"></iframe>
        <script>
            
        </script>
    </body>

</html>
