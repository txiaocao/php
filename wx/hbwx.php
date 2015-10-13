<?php

function dd($data) {
    var_dump($data);
    exit;
}

class hbwx {

    public $data;

    public function __construct($data) {
        $this->data = $data;
        $config = json_decode(file_get_contents("config.json"), true);
        $this->data['AppId'] = $config['AppId'];
        $this->data['AppSecret'] = $config['AppSecret'];
    }

    public function setJSTicket(){ 
        $cache = json_decode(file_get_contents("cache/jsapi_ticket.json"), true);
        if ( (int) $cache['time'] + 7000 < time()) {
            $this->data['isCache'] = false;
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
            $url = sprintf($url, $this->data['AppId'], $this->data['AppSecret']);
            $data = json_decode(file_get_contents($url), true);
            $this->data['access_token'] = $data['access_token'];
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";
            $url = sprintf($url, $this->data['access_token']);
            $data = json_decode(file_get_contents($url), true);
            $this->data['jsapi_ticket'] = $data['ticket'];

            $this->setCache();
        } else {
            $this->data['isCache'] = true;
            $this->data['access_token'] = $cache['access_token'];
            $this->data['jsapi_ticket'] = $cache['jsapi_ticket'];
        }
        $this->setUrl();
        return $this;
    }
    protected function setUrl(){ 
        if(!isset($this->data['url'])){ 
            $this->data['url'] = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        }
    }

    public function setSignature() {
        $data = [];
        $this->data['nonceStr'] = uniqid();
        $this->data['time'] = (string)time();

        $data['time'] = $this->data['time'];
        $data['AppId'] = $this->data['AppId'];
        $data['access_token'] = $this->data['access_token'];
        $data['nonceStr'] =$this->data['nonceStr'] ;
        $data['url'] = $this->data['url'];
        $data['jsapi_ticket'] = $this->data['jsapi_ticket'];
        $str = "jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s";
        $str = sprintf($str, $data['jsapi_ticket'], $data['nonceStr'], $data['time'], $data['url']);
        $this->data['signature_str'] = $str;
        $this->data['signature'] = sha1($this->data['signature_str']);
        return $this;
    }

    // 返回Data
    public function getData(){ 
        return $this->data;
    }
    public function setData($data){ 
        $this->data = $data;
    }
    /**
    * 缓存数据
    */
    protected function setCache(){ 
        $cache = [];
        $cache['access_token'] = $this->data['access_token'];
        $cache['jsapi_ticket'] = $this->data['jsapi_ticket'];
        $cache['time'] = (string) time();
        file_put_contents("cache/jsapi_ticket.json", json_encode($cache));
    }

    public function debugInfo(){ 

    }

}
