<?php

function dd($data) {
    var_dump($data);
    exit;
}
function authcode(){
    if(!isset($_COOKIE['authcode'])|| $_COOKIE['authcode'] !== config::$authcode){
        $data = [];
        $data['status'] = -1;
        $data['data'] = "未授权";
        header('Content-type: application/json');
        echo json_encode($data);
        exit;
    }
}

function GetIP() {
    if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
        $cip = $_SERVER["HTTP_CLIENT_IP"];
    } elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
        $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    } elseif (!empty($_SERVER["REMOTE_ADDR"])) {
        $cip = $_SERVER["REMOTE_ADDR"];
    } else {
        $cip = "0.0.0.0";
    }
    return $cip;
}

function hb_log($msg, $prefix = "", $level = "INFO") {
    $path = "../log/" . date("Y-m-d") . $prefix . ".log";
    $log = date("Y-m-d H:i:s") . " ";
    $log .= GetIP() . " ";
    $log .= $level . " ";
    $log .= json_encode($msg, JSON_UNESCAPED_UNICODE) . PHP_EOL;
    file_put_contents($path, $log, FILE_APPEND);
}
