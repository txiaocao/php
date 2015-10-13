<?php

/**
 * Summary of dd debug
 * @param mixed $data
 */
class user {

    private $server = null;
    private $appid = null;
    private $appkey = null;
    private $token = null;

    public function __construct() {
        
    }

    /**
     * Summary of getUserData 获取用户信息
     * @param mixed $uid
     * @throws Exception
     * @return mixed
     */
    public function getUserData($uid) {
        $db = new db();
        $sql = "SELECT
                    `hb_user`.*,`hb_luckydraw`.createTime,`hb_luckydraw`.updateTime,`hb_luckydraw`.HaveUsed,`hb_luckydraw`.gift,`hb_luckydraw`.code
                FROM
                        `hb_user`
                LEFT JOIN `hb_luckydraw` ON `hb_user`.uid = `hb_luckydraw`.uid
                WHERE
                        `hb_user`.uid = ?
                Order by createTime desc
                LIMIT 1
                 ";
        $sth = $db->prepare($sql);
        $sth->execute([(int) $uid]);
        $data = $sth->fetch(PDO::FETCH_ASSOC);
        if ($data == null) {
            throw new Exception("用户信息不存在", -1);
        }
        return $data;
    }

    /**
     * Summary of setUserData 存储用户信息
     * @param mixed $uid
     * @param mixed $data
     */
    public function setUserData($uid, $data) {
        hb_log($data, '.setUserData');
        $db = new db();
        $sql = "UPDATE `hb_user` set `uname` = ?,`pic` = ?,`LotteryNumber`=? where `uid`=?";
        $sth = $db->prepare($sql);
        $sth->execute([ $data['uname'], $data['pic'], $data['LotteryNumber'], $uid]);
        $db->commit();
    }

    /**
     * Summary of creatUserData 创建用户信息
     * @param mixed $uid
     */
    public function creatUserData($data) {
        if ($data['uid'] == '') {
            hb_log('用户id未获取到', '.user_error');
            throw new Exception("用户id未获取到", -1);
        }

        $db = new db();
        $sql = "INSERT INTO `hb_user` (`uid`, `uname`, `pic`)
        VALUES
	(?, ?, ?) ON DUPLICATE KEY UPDATE `uname` = ?,
	`pic` = ?";
        $sth = $db->prepare($sql);
        
        hb_log($data,'.createUserDataDb');
        try {
            $sth->execute([ $data['uid'], $data['name'], $data['pic'], $data['name'], $data['pic'] ]);
            hb_log($data, '.creatUserData');
            $db->commit();
        } catch (Exception $e) {
            hb_log($e, '.user_error');
            return false;
        }
        return true;
    }

    public function set($server, $appId, $appKey, $token) {
        $this->setServer($server);
        $this->setApp($appId, $appKey);
        $this->setToken($token);
        return $this;
    }

    public function get() {
        try {
            return $this->getUserInfo();
        } catch (Exception $ex) {
            $error = array();
            $error['status'] = $ex->getCode();
            $error['msg'] = $ex->getMessage();
            return $error;
        }
    }

    public function setServer($server) {
        $this->server = $server;
        return $this;
    }

    public function getServer() {
        return $this->server;
    }

    public function setApp($appid, $appkey) {
        $this->appid = $appid;
        $this->appkey = $appkey;
        return $this;
    }

    public function getApp() {
        $data = array();
        $data['appid'] = $this->appid;
        $data['appkey'] = $this->appkey;
        return $data;
    }

    public function setToken($token) {
        $this->token = $token;
        return $this;
    }

    public function getToken() {
        return $this->token;
    }

    /*
    array(2) {
    ["data"]=>
    array(3) {
    ["uid"]=>
    int(10005)
    ["name"]=>
    string(0) ""
    ["pic"]=>
    string(55) "http://img.linekong.com/wan/2015/04/08/default_icon.png"
    }
    ["code"]=>
    int(1)
    } */
    public function getUserInfo() {
        $this->checkData();

        $data = array();
        $data['appId'] = $this->appid;
        $data['token'] = $this->token;
        $sign = sprintf("appId=%s&token=%s%s", $this->appid, $this->token, $this->appkey);

        $data['sign'] = md5($sign);
        
        $result = $this->post($this->server . "server/passport!getUserInfo", $data);
        $result = json_decode($result, true);

        hb_log($result, '.login_result');
        hb_log($data, '.signUserInfo');
        
        if (is_null($result['code'])) {
            throw new Exception('未返回用户信息', -1);
        }
        if ($result['code'] < 1) {
            throw new Exception($result['message'], $result['code']);
        }

        $this->creatUserData($result['data']);
        $data = [];
        $data['status'] = 1;
        try {
            $data['data'] = $this->getUserData($result['data']['uid']);
        } catch (Exception $ex) {
            $data['status'] = -1;
            $data['data'] = $ex->getMessage();
        }
        return $data;
    }

    private function checkData() {
        if (is_null($this->server)) {
            throw new Exception("js server is undefined", -1);
        }
        if (is_null($this->appid)) {
            throw new Exception("appid is undefined", -1);
        }
        if (is_null($this->appkey)) {
            throw new Exception("appkey is undefined", -1);
        }
        if (is_null($this->token)) {
            throw new Exception("token is undefined", -1);
        }
    }

    public function post($url, $data) {
        hb_log($url, '.post');
        hb_log(http_build_query($data), '.post');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        ob_start();
        $result = curl_exec($ch);
        curl_close($ch);
        $result = ob_get_contents();
        ob_end_clean();
        hb_log($result, '.post');
        return $result;
    }

}
