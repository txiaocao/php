<?php

class typescript{ 
	private $path;
	private $template;
	
	public function __construct($path){ 
		$this->path = $path;
		$this->template = dirname(__FILE__).DIRECTORY_SEPARATOR."template".DIRECTORY_SEPARATOR."*";
		$this->install();
	}
	private function install(){
		$cmdtpl = "copy -Recurse %s %s";
		$cmd = sprintf($cmdtpl,$this->template,$this->path);
		
		$this->shell($cmd);
	}
	private function shell($cmd){ 
		$shell = 'PowerShell -Command "& {%s}"';
		$shell = sprintf($shell, $cmd);
		system ( $shell ); 
	}
}