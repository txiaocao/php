<?php

require_once '../app/common.php';
require_once '../app/gift.php';
$action = isset($_GET['action']) ? $_GET['action'] : "none";

// a1 兑奖查询 -兑奖码 queryCode
// a2 兑奖 -兑奖码 updateCode
// a3 库存查询
// a4 中奖列表查询

if ($action == 'auth') {
    $code = $_REQUEST['authcode'];
    if ($code == config::$authcode) {
        setcookie('authcode', config::$authcode,time()+60*60*4);
        $data = [];
        $data['status'] = 1;
        $data['data'] = '成功授权';
    } else {
        $data = [];
        $data['status'] = -1;
        $data['data'] = '未授权';
    }
    header('Content-type: application/json');
    echo json_encode($data);
    exit;
}
authcode();
if ($action == 'queryCode') {
    $code = isset($_GET['code']) ? $_GET['code'] : 0;
    $gift = new gift();

    $data = [];
    $data['status'] = 1;
    $data['data'] = $gift->getGiftByCode($code);
    if ($data['data'] == false) {
        $data['status'] = -1;
        $data['data'] = "未找到相关兑奖码";
    }

    header('Content-type: application/json');
    echo json_encode($data);
}
if ($action == 'updateCode') {
    $code = isset($_GET['code']) ? $_GET['code'] : 0;
    $gift = new gift();

    $data = [];
    $data['status'] = 1;
    $data['data'] = $gift->setGiftByCode($code);

    header('Content-type: application/json');
    echo json_encode($data);
}

if ($action == 'queryGiftList') {
    $gift = new gift();
    $data = [];
    $data['status'] = 1;
    $data['data'] = $gift->getGiftListAll();
    header('Content-type: application/json');
    echo json_encode($data);
}

if($action == 'getGiftItem'){
    $gift = new gift();
    $data = [];
    $id = $_GET['id'];
    $data['status'] = 1;
    $data['data']  = $gift->getGiftItem($id);
    header('Content-type: application/json');
    echo json_encode($data);
}

if($action == 'setGiftItem'){
    $id = isset($_GET['id']) ? $_GET['id'] : 0;
    $itemdata = [];
    $itemdata['total'] =  isset($_GET['total']) ? $_GET['total'] : 0;
    $itemdata['rate'] =  isset($_GET['rate']) ? $_GET['rate'] : 0;
    
    $gift = new gift();

    $data = [];
    $data['status'] = 1;
    $data['data'] = "修改完毕";
    if((int)$id == 3 || (int)$id == 4){
        $gift->setGiftItem($id,$itemdata);
    }else{
        $data['status'] = -1;
        $data['data'] = "修改失败，已锁定";
    }
    header('Content-type: application/json');
    echo json_encode($data);
}