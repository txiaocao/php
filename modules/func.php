<?php
function dd($data){ 
	var_dump($data);
	exit;
}

class xiaok{ 
	static function shell($cmd){ 
		$shell = 'PowerShell -Command "& {%s}"';
		$shell = sprintf($shell, $cmd);
		system ( $shell ); 
	}
	static function explorer($filename){ 
		$cmdtpl = "explorer.exe %s";
		$cmd = sprintf($cmdtpl,$filename);
		xiaok::shell($cmd);
	}
}