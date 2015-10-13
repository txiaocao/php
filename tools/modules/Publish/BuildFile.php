<?php

require_once "bin/Minify/JSMin.php";
require_once "bin/Minify/Minify/HTML.php";

function printline($msg){
	echo iconv('UTF-8', 'GB2312', $msg.PHP_EOL);
}
class publisher{ 
	private $file;
	private $publishPath;
	private $AjaxMin;
	private $jso;
	private $tsc;
	private $hostscript;
	
	public function __construct($file){ 
		$this->file = $file;
		$this->initConfig();
		//printline($this->publishPath);exit;

		$this->copyPublish();
		
		$this->publishFile();
		$this->MicrosoftAjaxMinifier();
		//$this->explorer();
	}
	public function initConfig(){ 
		$publishPath = str_replace("source","svn", $this->file);
		$this->publishPath = $publishPath;
		$this->AjaxMin = dirname(__FILE__).DIRECTORY_SEPARATOR."bin".DIRECTORY_SEPARATOR."MicrosoftAjaxMinifier".DIRECTORY_SEPARATOR."AjaxMin.exe";
		$this->jso = dirname(__FILE__).str_replace("|",DIRECTORY_SEPARATOR,"|bin|js-obfuscator|bin|jsobfuscate");
		$this->tsc = dirname(__FILE__).str_replace("|",DIRECTORY_SEPARATOR,"|bin|typescript|bin|tsc");
		$this->hostscript = file_get_contents(dirname(__FILE__).DIRECTORY_SEPARATOR."host.js");
	}
	public function copyPublish(){
		//unlink($this->publishPath);
		copy($this->file,$this->publishPath);
	}
	public function MicrosoftAjaxMinifier(){ 
		$file = $this->publishPath;
		$ext = pathinfo($file,PATHINFO_EXTENSION);
		$cmdtpl = $this->AjaxMin." %s -o %s";
		
		if($ext == 'js' || $ext == 'css'){
			printline("script/style compile".$file);
			$cmd = sprintf($cmdtpl,$file,$file);
			$this->shell($cmd);
		}
	}
	public function publishFile(){ 
		$file = $this->publishPath;
		$ext = pathinfo($file,PATHINFO_EXTENSION);
		$cmdtpl = "AjaxMin %s -o %s";
		
		if($ext == 'php'){ 
			printline("PHP compile ".$file);
			$this->php($file);
		}
		if($ext == 'html'){
			printline("Html compile ".$file);
			$this->html($file);
		}
		if($ext == 'css'){
			printline("css compile ".$file);
			$this->css($file);
		}
		if($ext == 'js'){
			printline("js compile ".$file);
			$this->js($file);
		}
		if($ext == 'psd'){
			printline("remove psd files".$file);
			unlink($file);
		}
		if($ext == "ts"){
			$this->ts();
			unlink($this->publishPath);
		}
		$this->pubConfig($file);
	}
	
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
	private function pubConfig($file){
		// 移除old文件
		if(stripos($file,".old") !== false){
			printline("remove old file:".$file);
			unlink($file);
		}
		//var_dump($filename);
		if(stripos($file,".pub") !== false){
			printline("config replace $file");
			$pubfile = str_replace(".pub","",$file);
			unlink($pubfile);
			rename($file,$pubfile);
		}
	}

	private function ts(){
		printline("ts compile: ".$this->file);
		
		$cmdtpl = "node %s %s";
		$cmd = sprintf($cmdtpl,$this->tsc, $this->file);
		system($cmd);
		$file = str_replace(".ts",".js",$this->file);
		$pushFile = str_replace(".ts",".js",$this->publishPath);
		copy($file,$pushFile);
		unlink($file);
		$this->js($pushFile);
	}
	
	private function html($file){
		$html = file_get_contents($file);
		$encode = Minify_HTML::minify($html);
		file_put_contents($file, $encode);
	}
	private function css($file){
		
	}
	private function jso($file){
		$cmdtpl = "node %s %s";
		$cmd = sprintf($cmdtpl,$this->jso,$file);
		
		$content = system($cmd);
		if($content != ""){
			file_put_contents($file, $content);
		}
		
	}
	
	private function js($file){
		$html = file_get_contents($file);
		$html .= $this->hostscript;
		$encode = JSMin::minify($html);
		file_put_contents($file, $encode);
		//$this->jso($file);
	}
}