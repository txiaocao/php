<?php
// define("$this->DS", DIRECTORY_SEPARATOR);
// define("DATA_PATH", dirname(__FILE__).$this->DS.str_replace("/", $this->DS,"../../data/BingV3".$this->DS));


class bing{
        
        public $DS = DIRECTORY_SEPARATOR;
        public $DATA_PATH;
        public $url;
        public $json;
        
        public function __construct($url){
                $this->url = $url;
                $this->DATA_PATH = dirname(__FILE__).$this->DS.str_replace("/", $this->DS,"../../data/BingV3".$this->DS);
        }
        
        // 启动进程
        public function start(){
                $arr = $this->getFiles();
                $this->log();
                $this->copyright();
                //$this->url($arr[0]);
                $this->download($arr);
        }
        
        // 提取地址数据
        private function getFiles(){
                $re = '/\/\/.*?(jpg|mp4|png)\"/';
                $arr = array();
                $this->json = file_get_contents($this->url);
                preg_match_all($re, $this->json, $arr);
                return $arr;
        }
        
        // URL保存
        public function url($url){
                //$txt = implode(PHP_EOL,$arr);
                $url = $url.PHP_EOL;
                $path = $this->DATA_PATH."data".$this->DS.date("Y-m-d").".url".".txt";
                file_put_contents($path,$url,FILE_APPEND);
        }
        
        // 下载文件
        private function download($arr){
                foreach ($arr[0] as $key => $value) {
                        
                        $value = str_replace('"', "", $value);
                        $value = "http:" .  $value;
                        $this->url($value);
                        $filename = explode("/",$value);
                        $filename = $filename[count($filename)-1];
                        
                        $poi = strpos($filename,'mp4');
                        if($poi === false){ 
                                $path = $this->DATA_PATH."picture".$this->DS.date("Y-m-d").".".$filename;
                        }else{ 
                                $path = $this->DATA_PATH."video".$this->DS.date("Y-m-d").".".$filename;
                        }
                        //var_dump($poi);
                
                        if(!is_file($path)){ 
                                $this->display( "ok... ".$filename);
                                $data = file_get_contents($value);
                                //var_dump($data);
                                file_put_contents($path, $data);
                        
                        }else{ 
                                $this->display( "exists is ".$filename);
                        }
                }
        }
        // 保存获取的bing json数据
        private function log(){
                $path = $this->DATA_PATH."data".$this->DS.date("Y-m-d").".json";
                file_put_contents($path,$this->json);
        }
        // 提取出bing数据中的版权信息
        private function copyright(){
                $json = json_decode($this->json,true);
                $copyright = date("Y-m-d h:m:s")."    ".$json["images"][0]["copyright"].PHP_EOL;
                file_put_contents($this->DATA_PATH."recode.log", $copyright,FILE_APPEND);
        }
        private function display($msg){
                echo $msg.PHP_EOL;
        }
        
}
$url = "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1428896145111&pid=hp&video=1";
$obj = new bing($url);
$obj->start();