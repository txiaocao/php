<?php
define("DS", DIRECTORY_SEPARATOR);

class make {

	public $log = "";

	public function show($msg) {
		//echo ($msg."<br />");
		echo ("<script>parent.log('".$msg ."')</script>");
		//$this->log .= $msg . "";
		ob_flush();
		flush();
	}
	private function shell($cmd){ 
		$shell = 'PowerShell -Command "& {%s}"';
		$shell = sprintf($shell, $cmd);
		//dd($shell);
		system ( $shell ); 
	}
	public function create($path,$har) {
		file_put_contents('bup.txt','');
		file_put_contents('cookie.txt','');
		
		$getcwd = $path . DS ;
		$json = $har;
		$json = json_decode($json,true);
		$harurl = [];
		foreach ($json["log"]["entries"] as $item) {
			$harurl[] = $item["request"]["url"];
		}
		$harurl = array_unique($harurl);
		$this->show("Count: " . count($harurl));

		foreach ($harurl as $key => $item) {
			$url = urldecode($item);

			$url = explode("?", $url);
			$tmp = explode("/", str_replace("http://", "", $url[0]));

			$filename = $tmp[count($tmp) - 1];
			$path = array_slice($tmp, 1, count($tmp) - 2);
			$path = implode(DS, $path);
			//dd($getcwd . $path . DS);
			@mkdir($getcwd . $path . DS, 777, true);
			//if (!is_file($getcwd . $path . DS . $filename)) {
				$url = urldecode($item);
				$this->show("$key Download " . $url);
				
				$url = str_replace(" ", "+", $url);
				//$data = $this->getfilecontent($url);
				
				$data = request_by_curl($url,array(
				 CURLOPT_COOKIE=>"webRecordIdP=1u5q5t1o-1gj06q8-8t16n; home4399=yes; _4399stats_vid=14410956893382831; index4399skintip=1; __qca=P0-279946164-1441173075523; _ga=GA1.2.1715840093.1441173075; mp_42df11e32a0cb35d5326c556007745af_mixpanel=%7B%22distinct_id%22%3A%20%22122f362d-9b4c-4c03-a735-8d834190b898%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22Acquisition%20Source%22%3A%20%22NA%22%2C%22version%22%3A%20%221.5.25%22%2C%22dst%22%3A%20%22NA%22%2C%22gid%22%3A%20%22fruitfrenzy%22%2C%22sandbox%22%3A%20false%7D; CNZZDATA30098529=cnzz_eid%3D2049947768-1441092557-%26ntime%3D1441173831"
				 ));
				 $url = str_replace(" ", "+", $url);
				// // dd($url);
				 //$data = file_get_contents($url);
				// // 
				// // dd(( $data));
				//dd($data);
				//$data = gzuncompress($data);
				@file_put_contents($getcwd . $path . DS . $filename, $data);
			//}
		};
		$this->show( "is ok..." );
	}
	public function __construct() {

	}
	public function getfilecontent($url){
		$tmpfile = "C:\Users\xiaok\AppData\Local\Temp\har\\".uniqid().".har.tmp";
		$cmdtpl = "Invoke-WebRequest \"$url\" -OutFile $tmpfile";
		
		
		$this->shell($cmdtpl);
		$data = file_get_contents($tmpfile);
		dd($tmpfile);
		return $data;
	}

}

function dd($data) {
	var_dump($data);
	exit;
}
// 
function request_by_curl($remote_server) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $remote_server);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36");
	$data = curl_exec($ch);
	curl_close($ch);
	//dd(curl_getinfo( $ch));
	return $data;
}
// // // 
// //  function foo($url) {
// //   //$url = 'http://dadao.net/php/prtime/news_type_list.php';
// //   $cookiejar = realpath('cookie.txt');
// //   $fp = fopen('bup.txt', 'a');
// //   $ch = curl_init();
// //   curl_setopt($ch, CURLOPT_URL, $url);
// //    curl_setopt($ch, CURLOPT_FILE, $fp);
// //    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiejar);
// //    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiejar);
// //    curl_setopt($ch, CURLOPT_HEADER, 0);
// // 
// //  $data = curl_exec($ch);
// //    curl_close($ch);
// //   fclose($fp);
// //    echo $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
// //    //dd(curl_errno ( $ch));
// //    return $data;
// //  }

/** 
 * http请求类(php + socket) 
 * @todo 这里还有很多未完善的地方，仅有简单的get post head请求 
 * @author chuangrain@gmail.com 
 * @version 1.0.0 
 */  
//   
// class HttpClient {  
//   
//     const CRLF = "\r\n";      //  
//     private $fh = null;       //socket handle  
//     private $errno = -1;      //socket open error no  
//     private $errstr = '';     //socket open error message  
//     private $timeout = 30;    //socket open timeout  
//     private $line = array();  //request line  
//     private $header = array();//request header  
//     private $body = array();  //request body  
//     private $url = array();   //request url  
//     private $response = '';   //response  
//     private $version = '1.1'; //http version  
//       
//     public function __construct() {  
//           
//     }  
//       
//     /** 
//      * 发送HTTP get请求 
//      * @access public 
//      * @param string $url 请求的url 
//      */  
//     public function get($url = '') {  
//         $this->setUrl($url);  
//         $this->setLine();  
//         $this->setHeader();  
//         $this->request();  
//         return $this->response;  
//     }  
//       
//     /** 
//      * 发送HTTP post请求 
//      * @access public 
//      */  
//     public function post() {  
//         $this->setLine('POST');  
//         $this->request();  
//         return $this->response;  
//     }  
//       
//     /** 
//      * HTTP -> HEAD 方法，取得服务器响应一个 HTTP 请求所发送的所有标头 
//      * @access public 
//      * @param string $url 请求的url 
//      * @param int $fmt 数据返回形式，关联数组与普通数组 
//      * @return array 返回响应头信息 
//      */  
//     public function head($url = '', $fmt = 0) {  
//         $headers = null;  
//         if (is_string($url)) {  
//             $headers = get_headers($url, $fmt);  
//         }  
//         return $headers;  
//     }  
//       
//     /** 
//      * 设置要请求的 url 
//      * @todo 这里未做url验证 
//      * @access public 
//      * @param string $url request url 
//      * @return bool 
//      */  
//     public function setUrl($url = '') {  
//         if (is_string($url)) {  
//             $this->url = parse_url($url);  
//             if (!isset($this->url['port'])) {//设置端口  
//                 $this->url['port'] = 80;  
//             }  
//         } else {  
//             return false;  
//         }  
//     }  
//       
//     /** 
//      * 设置HTTP协议的版本 
//      * @access public 
//      * @param string $version HTTP版本，default value = 1.1 
//      * @return bool 如果不在范围内返回false 
//      */  
//     public function setVersion($version = "1.1") {  
//         if ($version == '1.1' || $version == '1.0' || $version == '0.9') {  
//             $this->version = $version;  
//         } else {  
//             return false;  
//         }  
//     }  
//       
//     /** 
//      * 设置HTTP请求行 
//      * @access public 
//      * @param string $method 请求方式 default value = GET 
//      */  
//     private function setLine($method = "GET") {  
//         //请求空：Method URI HttpVersion  
//         if (isset($this->url['query'])) {  
//             $this->line[0] = $method . " " . $this->url['path'] . "?" . $this->url['query'] . " HTTP/" . $this->version;  
//         } else {  
//             $this->line[0] = $method . " " . $this->url['path'] . " HTTP/" . $this->version;  
//         }  
//     }  
//       
//     /** 
//      * 设置HTTP请求头信息 
//      * @access public 
//      * @param array $header 请求头信息 
//      */  
//     public function setHeader($header = null) {  
//         $this->header[0] = "Host: " . $this->url['host'];  
//         if (is_array($header)) {  
//             foreach($header as $k => $v) {  
//                 $this->setHeaderKeyValue($k, $v);  
//             }  
//         }  
//     }  
//       
//     /** 
//      * HTTP请求主体 
//      * @access public 
//      * @param array $body 请求主体 
//      */  
//     public function setBody($body = null) {  
//         if (is_array($body)) {  
//             foreach ($body as $k => $v) {  
//                 $this->setBodyKeyValue($k, $v);  
//             }  
//         }  
//     }  
//       
//     /** 
//      * 单条设置HTTP请求主体 
//      * @access public 
//      * @param string $key 请求主体的键 
//      * @param string $value 请求主体的值 
//      */  
//     public function setBodyKeyValue($key, $value) {  
//         if (is_string($key)) {  
//             $this->body[] = $key . "=" . $value;  
//         }  
//     }  
//       
//     /** 
//      * 单条设置HTTP请求头信息 
//      * @access public 
//      * @param string $key 请求头信息的键 
//      * @param string $value 请求头信息的键 
//      */  
//     public function setHeaderKeyValue($key, $value) {  
//         if (is_string($key)) {  
//             $this->header[] = $key . ": " . $value;  
//         }  
//     }  
//       
//     /** 
//      * socket连接host, 发送请求 
//      * @access private 
//      */  
//     private function request() {  
//         //构造http请求  
//         if (!empty($this->body)) {  
//             $bodyStr = implode("&", $this->body);  
//             $this->setHeaderKeyValue("Content-Length", strlen($bodyStr));  
//             $this->body[] = $bodyStr;  
//             $req = array_merge($this->line, $this->header, array(""), array($bodyStr), array(""));  
//         } else {  
//             $req = array_merge($this->line, $this->header, array(""), $this->body, array(""));  
//         }  
//         $req = implode(self::CRLF, $req);  
//           
//         //socket连接host  
//         $this->fh = fsockopen($this->url['host'], $this->url['port'], $this->errno, $this->errstr, $this->timeout);  
//           
//         if (!$this->fh) {  
//             echo "socket connect fail!";  
//             return false;  
//         }  
//           
//         //写请求  
//         fwrite($this->fh, $req);  
//           
//         //读响应  
//         while (!feof($this->fh)) {  
//             $this->response .= fread($this->fh, 1024);  
//         }  
//     }  
//       
//     /** 
//      * 关闭socket连接 
//      * @access public 
//      */  
//     public function __destruct() {  
//         if ($this->fh) {  
//             fclose($this->fh);  
//         }  
//     }  
//       
// }  
//   
//   
//   function request_by_other($url, $post=null)
// {
//      $context = array();  
//       
//         if (is_array($post))  
//         {  
//             ksort($post);  
//       
//             $context['http'] = array  
//             (  
//                 'method' => 'POST',  
//                 'header' => "Connection: close ".
//                 "Content-type: application/x-www-form-urlencoded ",
//                         'content' => http_build_query($post, '', '&'),
//             );  
//         }  
//       
//         return file_get_contents($url, false, stream_context_create($context));
// } 
//  echo request_by_other("http://sda.4399.com/4399swf/upload_swf/ftp15/ssj/20150206/h2/data.js");
// //   
// // $url = "http://sda.4399.com/4399swf/upload_swf/ftp15/ssj/20150206/h2/jquery-2.1.1.min.js";  
// // // $http2 = new HttpClient();  
// // $header = array(  
// //     "Content-Type" => "application/x-www-form-urlencoded"  
// // );  
// // $body = array(  
// //     "username" => "1234",  
// //     "submit" => "Login"  
// // );
// // $http2 = new HttpClient();  
// // $http2->setUrl($url);  
// // $http2->setHeader($header);  
// // $http2->setBody($body);  
// // var_dump($http2->post());  
// // exit;  
// //   
// // /** post test **/  
// // $http2 = new HttpClient();  
// // $header = array(  
// //     "Content-Type" => "application/x-www-form-urlencoded"  
// // );  
// // $body = array(  
// //     "username" => "1234",  
// //     "submit" => "Login"  
// // );  
// // $http2->setUrl($url);  
// // $http2->setHeader($header);  
// // $http2->setBody($body);  
// // var_dump($http2->post());  
// //   
// // /** head test **/  
// // $http3 = new HttpClient();  
// // var_dump($http3->head($url, 1));  