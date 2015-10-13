<?php

/**
 * xiaok short summary.
 *
 * xiaok description.
 *
 * @version 1.0
 * @author cof
 */
class xiaok {
	static function log($msg, $level = "INFO", $prefix = "") {
		$path = dirname(__FILE__) . "/../log/" . date("Y-m-d") . $prefix . ".log";
		$log = date("Y-m-d h:m:s") . "\t";
		$log .= $level . "\t";
		$log .= json_encode($msg, JSON_UNESCAPED_UNICODE) . PHP_EOL;
		file_put_contents($path, $log, FILE_APPEND);
	}
}
