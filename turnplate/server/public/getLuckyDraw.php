<?php

// 检查用户是否已登录并存在
// 检查用户是否已经抽过奖，如果已经抽过奖则返回兑奖码
// 抽奖库存运算
require_once '../app/common.php';
require_once '../app/gift.php';

$data = [];
if(isset($_GET['uid'])){
    $uid = $_GET['uid'];
    $gift = new gift();
    $data = $gift->getGift($uid);
}else{
    $data['status'] = -1;
    $data['data'] = '未登录';
}

header('Content-type: application/json');
if (isset($_REQUEST['callback'])) {
	echo sprintf("%s(%s)", $_REQUEST['callback'], json_encode($data));
} else {
	echo json_encode($data);
}
exit;

