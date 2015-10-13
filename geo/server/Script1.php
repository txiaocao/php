<?php

require_once "xiaok.class.php";
//$path = "database/".$_REQUEST['sguid'].".log";
$sguid = isset($_REQUEST['sguid'])?$_REQUEST['sguid']:'';

//echo $path;
//var_dump($_REQUEST['sguid']);
if( $sguid == '' || is_null($sguid)||$sguid == 'null'){
    $sguid = md5(uniqid());
    //$path = "database/".$sguid.".log";
}
$data = [];
$data['sguid'] = $sguid;
$data['time'] = date("Y-m-d h:i:s",time());
$data['addr'] = isset($_REQUEST['addr'])?$_REQUEST['addr']:'';
$data['longitude'] =isset($_REQUEST['longitude'])?$_REQUEST['longitude']:'';
$data['latitude'] = isset($_REQUEST['latitude'])?$_REQUEST['latitude']:'';
$data['ug'] = $_SERVER['HTTP_USER_AGENT'];
xiaok::log($data, "INFO",'.geo');
echo $sguid;
?>