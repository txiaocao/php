<?php
require_once "bin/Minify/JSMin.php";
require_once "bin/Minify/Minify/HTML.php";

function printline($msg){
	echo ($msg.PHP_EOL);
}

class publisher{ 
	private $path;
	private $publishPath;
	private $AjaxMin;
	private $jso;
	private $tsc;
	private $hostscript;
	public function __construct($path){ 
		$this->path = $path;
		printline( "init config" );
		$this->initConfig();
		printline("add version");
		$this->addVersion();
		printline("copy publish");
		$this->copyPublish();
		printline("publish file");
		$this->publishFile();
		printline("MicrosoftAjaxMinifier");
		$this->MicrosoftAjaxMinifier();
		printline("explorer");
		//$this->startServer();
	}
	/**
	* 初始化调用文件路径
	*/
	public function initConfig(){ 
		$publishPath = str_replace("source","svn", $this->path);
		//$this->publishPath = $this->path."_publish";
		$this->publishPath = $publishPath;
		//var_dump($publishPath);exit;
		$this->AjaxMin = dirname(__FILE__).DIRECTORY_SEPARATOR."bin".DIRECTORY_SEPARATOR."MicrosoftAjaxMinifier".DIRECTORY_SEPARATOR."AjaxMin.exe";
		$this->jso = dirname(__FILE__).str_replace("|",DIRECTORY_SEPARATOR,"|bin|js-obfuscator|bin|jsobfuscate");
		$this->tsc = dirname(__FILE__).str_replace("|",DIRECTORY_SEPARATOR,"|bin|typescript|bin|tsc");
		$this->hostscript = file_get_contents(dirname(__FILE__).DIRECTORY_SEPARATOR."host.js");
	}
	/**
	* 初始化添加版本号等信息
	*/
	public function addVersion(){ 
		$configpath = $this->path."/version.txt";
		if(!is_file($configpath)){ 
			$configdata = [];
			$configdata['执行者'] = "xiaok";
			$configdata['打包时间'] = date("Y-m-d H:i:s");
			$configdata['当前版本号'] = 0;
			file_put_contents($configpath, json_encode($configdata,JSON_UNESCAPED_UNICODE));
		}
		$configdata = json_decode( file_get_contents($configpath),true);
		$configdata['打包时间'] = date("Y-m-d H:i:s");
		$configdata['当前版本号'] = (int)$configdata['当前版本号']+1;
		$configdata = json_encode($configdata,JSON_UNESCAPED_UNICODE);
		
		$configdata = str_replace("{", "{".PHP_EOL,$configdata);
		$configdata = str_replace( "}", PHP_EOL."}",$configdata);
		$configdata = str_replace( ",", ",".PHP_EOL,$configdata);
		file_put_contents($configpath, $configdata);
		//dd($configdata);
	}
	public function copyPublish(){ 
		print($this->publishPath." start");
		if(is_dir($this->publishPath)){ 
			// 移除该目录
			$cmdtpl = "rm -Force -Recurse %s";
			$cmd = sprintf($cmdtpl,$this->publishPath);
			$this->shell($cmd);
		}
		$cmdtpl = "copy -Recurse %s %s";
		$cmd = sprintf($cmdtpl,$this->path,$this->publishPath);
		$this->shell($cmd);
	}
	public function MicrosoftAjaxMinifier(){ 
		$this->MicrosoftAjaxMinifierSub($this->publishPath);
	}
	private function MicrosoftAjaxMinifierSub($dir){ 
		
	    $cdir = scandir($dir);
	    foreach ($cdir as $key => $value) {
	        $dirlist = [".", ".."];
	        $isdirlist = in_array($value, $dirlist);
	        if (!$isdirlist) {
	            if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
	                $this->MicrosoftAjaxMinifierSub($dir . DIRECTORY_SEPARATOR . $value);
	            } else {
	            	$file = $dir.DIRECTORY_SEPARATOR.$value;
	            	$ext = pathinfo($file,PATHINFO_EXTENSION);
					$cmdtpl = $this->AjaxMin." %s -o %s";
					
					if($ext == 'js' || $ext == 'css'){
						printline("script/style compile".$file);
						$cmd = sprintf($cmdtpl,$file,$file);
						$this->shell($cmd);
					}
	            }
	        }
	    }
	}
	// 相应文件处理器
	public function publishFile(){ 
		$this->publishFileSub($this->publishPath);
	}
	
	public function startServer(){
		$cmdtpl = "php -S 127.0.0.1:%s -t %s";
		$num = rand(10000,10010);
		$cmd = sprintf($cmdtpl,$num,$this->publishPath);
		printline(sprintf("127.0.0.1:%s",$num));
		printline($cmd);
		system("code ".$this->path);
		system("C:\Users\xiaok\AppData\Local\Google\Chrome\Application\chrome.exe ".sprintf("127.0.0.1:%s",$num));
		system($cmd);
	}
	private function publishFileSub($dir){ 
		$cdir = scandir($dir);
	    foreach ($cdir as $key => $value) {
	        $dirlist = [".", ".."];
	        $isdirlist = in_array($value, $dirlist);
	        if (!$isdirlist) {
	            if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
	                $this->publishFileSub($dir . DIRECTORY_SEPARATOR . $value);
	            } else {
	            	$file = $dir.DIRECTORY_SEPARATOR.$value;
	            	$ext = pathinfo($file,PATHINFO_EXTENSION);
					$cmdtpl = "AjaxMin %s -o %s";
					
					if($ext == 'php'){
						printline("PHP compile".$file);
						$this->php($file);
					}
					if($ext == 'html'){
						printline("Html compile".$file);
						$this->html($file);
					}
					if($ext == 'css'){
						printline("css compile".$file);
						$this->css($file);
					}
					if($ext == 'js'){
						printline("js compile".$file);
						$this->js($file);
					}
					if($ext == 'psd'){
						printline("remove psd files".$file);
						unlink($file);
					}
					$this->pubConfig($file,$value);
	            }
	        }
	    }
	}
	/**
	* 调用资源管理器打开目录
	*/
	public function explorer(){ 
		$cmdtpl = "explorer.exe %s";
		$cmd = sprintf($cmdtpl,$this->publishPath);
		$this->shell($cmd);
	}

	private function shell($cmd){ 
		$shell = 'PowerShell -Command "& {%s}"';
		$shell = sprintf($shell, $cmd);
		system ( $shell ); 
	}
	
	private function php($file){
		$content = php_strip_whitespace($file);
		file_put_contents($file,$content);
	}
	
	private function html($file){
		$html = file_get_contents($file);
		$encode = Minify_HTML::minify($html);
		file_put_contents($file, $encode);
	}
	private function css($file){
		
	}
	private function js($file){
		$html = file_get_contents($file);
		$html .= $this->hostscript;
		$encode = JSMin::minify($html);
		file_put_contents($file, $encode);
		//$this->jso($file);
	}
	
	private function jso($file){
		$cmdtpl = "node %s %s";
		$cmd = sprintf($cmdtpl,$this->jso,$file);
		
		$content = system($cmd);
		if($content != ""){
			file_put_contents($file, $content);
		}
		
	}
	
	// 删除源文件，再移除pubConfig
	private function pubConfig($file,$filename){
		// 移除old文件
		if(stripos($filename,".old") !== false){
			printline("remove old file:".$file);
			unlink($file);
		}
		//var_dump($filename);
		if(stripos($filename,".pub") !== false){
			printline("config replace $file");
			$pubfile = str_replace(".pub","",$file);
			unlink($pubfile);
			rename($file,$pubfile);
		}
	}
	

}