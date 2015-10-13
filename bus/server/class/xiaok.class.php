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
	static function log($msg, $prefix = "", $level = "INFO") {
		$path = dirname(__FILE__) . "/../log/" . date("Y-m-d") . $prefix . ".log";
		$log = date("Y-m-d H:i:s") . "\t";
		$log .= $level . "\t";
		$log .= json_encode($msg, JSON_UNESCAPED_UNICODE) . PHP_EOL;
		file_put_contents($path, $log, FILE_APPEND);
	}
	static function post($url, $data) {

		//echo http_build_query($data);exit;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, (http_build_query($data)));
		ob_start();
		$result = curl_exec($ch);
		curl_close($ch);
		$result = ob_get_contents();
		ob_end_clean();
		return $result;
	}
}
