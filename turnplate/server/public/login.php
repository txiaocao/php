<?php
// 引用sdk
//require_once "functions.php";
//require_once "user.php";
require_once '../app/common.php';
require_once '../app/user.php';

// 从JS获取过来的token
$token = $_REQUEST['token'];

//实例化user
$user = new user();
// 设置JS服务器地址，APPID,APPKEY,TOKEN，get用户信息
$userinfo = $user->set(config::$server, config::$appId, config::$appKey, $token)->get();
//对用户信息进行处理
header('Content-type: application/json');

if (isset($_REQUEST['callback'])) {
	echo sprintf("%s(%s)", $_REQUEST['callback'], json_encode($userinfo));
} else {
	echo json_encode($userinfo);
}

