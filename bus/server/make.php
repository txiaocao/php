<?php
require_once "class/xiaok.class.php";

$db = new PDO("sqlite:data/17");

$file = file("data/Content.csv");
$sth = $db->prepare('INSERT INTO "main"."站点信息" ("站点名称", "附近有地铁") VALUES (?, ?)');
foreach ($file as $line_num => $line) {
    $arr = explode(",",$line);
    
    // 插入站点信息
    $info = $arr[3];
    $node = [];
    preg_match_all ("/<span .*?\/span>/",$info,$node);
    
    foreach($node[0] as $value){
       //var_dump( strpos($value,"dt"));
        $data = [];
        $data[] =  preg_replace("/<.*?>/",'',$value);
       if(strpos($value,"dt") === false){
           $data[] = 0;
       }else{
           $data[] = 1;
       }
       xiaok::log($data,'.node');
       try{
           $sth->execute($data);
       }
       catch(Exception $ex){
           xiaok::log('['.$ex->getCode().']'.$ex->getMessage(),'.node');
       }
    }
    
    //exit;
}





//-------------------------------------------------------------导入站点信息
/*
//$db = new PDO("sqlite:data/17");

//$file = file("data/Content.csv");
//$sth = $db->prepare('INSERT INTO "main"."站点信息" ("站点名称", "附近有地铁") VALUES (?, ?)');
//foreach ($file as $line_num => $line) {
//    $arr = explode(",",$line);
    
//    // 插入站点信息
//    $info = $arr[3];
//    $node = [];
//    preg_match_all ("/<span .*?\/span>/",$info,$node);
    
//    foreach($node[0] as $value){
//        //var_dump( strpos($value,"dt"));
//        $data = [];
//        $data[] =  preg_replace("/<.*?>/",'',$value);
//        if(strpos($value,"dt") === false){
//            $data[] = 0;
//        }else{
//            $data[] = 1;
//        }
//        xiaok::log($data,'.node');
//        try{
//            $sth->execute($data);
//        }
//        catch(Exception $ex){
//            xiaok::log('['.$ex->getCode().']'.$ex->getMessage(),'.node');
//        }
//    }
    
//    //exit;
//}
*/
//-------------------------------------------------------------导入线路信息
//require_once "class/xiaok.class.php";

//$db = new PDO("sqlite:data/17");

//$file = file("data/Content.csv");
//$sth = $db->prepare('INSERT INTO "main"."线路信息" ("线路名称", "线路说明") VALUES (?, ?)');
//foreach ($file as $line_num => $line) {
//    $arr = explode(",",$line);

//    // 插入线路信息
//    $data = [];
//    $data[] = $arr[1];
//    $data[] = str_replace("<br />",PHP_EOL,$arr[2].$arr[4]) ;
//    $sth->execute($data);
//    xiaok::log($data);
//    //exit;
//}
?>