<?php
define("DS",DIRECTORY_SEPARATOR);

class typescript{ 
	private $path;
	private $template;
	
	public function __construct($path){ 
		$this->path = $path;
		$this->template = dirname(__FILE__).DIRECTORY_SEPARATOR."template";
		$this->install();
	}
	private function install(){
		mkdir($this->path.DS.".settings");
		copy(str_replace("/",DS, $this->template."/.settings/tasks.json"),str_replace("/",DS,$this->path."/.settings/tasks.json"));
	}
}