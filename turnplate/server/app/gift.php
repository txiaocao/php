<?php

require_once '../common/db.php';
require_once '../app/user.php';

class gift {

    // 通过兑奖码获取礼品及中奖信息
    // return 礼品信息
    public function getGiftByCode($code) {
        $db = new db();

        $sql = "SELECT
	*
FROM
	`hb_luckydraw`
LEFT JOIN `hb_user` ON `hb_user`.uid = `hb_luckydraw`.uid
WHERE `hb_luckydraw`.`code` = ?";
        $sth = $db->prepare($sql);
        $sth->execute([$code]);
        $data = $sth->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    // 兑奖礼品
    // return void
    public function setGiftByCode($code) {
        $sql = "UPDATE `hb_luckydraw`
SET HaveUsed = 1,updateTime=?
WHERE
	`hb_luckydraw`.`code` = ?";
        $db = new db();
        $sth = $db->prepare($sql);
        $sth->execute([time(), $code]);
        $db->commit();
    }

    public function getGift($uid) {
        $user = new user();
        $userdata = $user->getUserData($uid);

        if ($userdata['LotteryNumber'] == 0) {
            $data = [];
            $data['status'] = -1;
            $data['data'] = "抽奖次数为0";
            return $data;
        }

        $userdata['LotteryNumber'] = $userdata['LotteryNumber'] - 1;
        $user->setUserData($uid, $userdata);

        // 查询礼品
        $giftList = $this->getGiftList();

        // 中奖概念运算
        $gift = $giftList[0];
        foreach ($giftList as $item) {
            $num = rand(1, 100);
            if ($item['rate'] >= $num) {
                $gift = $item;
                break;
            }
        }
        $randnum = rand(1, count($giftList));

        // 中奖的礼品
        //$giftList[$randnum - 1];
        // 减去库存

        $this->setGift($gift);
        // 生成礼品代码
        $code = abs(crc32(rand(10000, 99999) . $uid));
        $this->setCode($uid, $gift['id'], $code);
        $data = [];
        $data['status'] = 1;
        $data['data'] = $gift['id'];
        $data['code'] = $code;
        return $data;
    }

    public function getGiftList() {
        $sql = "SELECT * FROM `hb_gift` WHERE (`total`-`use`)>0";
        $db = new db();
        $sth = $db->query($sql);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getGiftListAll() {
        $sql = "SELECT * FROM `hb_gift`";
        $db = new db();
        $sth = $db->query($sql);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setGift($gift) {
        $sql = "UPDATE `hb_gift` SET `use` = `use` + 1 WHERE `id` = ?";
        $db = new db();
        $sth = $db->prepare($sql);
        $sth->execute([$gift['id']]);
        $db->commit();
    }

    // 生成兑奖码
    public function setCode($uid, $gift, $code) {
        $sql = "INSERT INTO `hb_luckydraw` (`uid`, `gift`, `code`,`createTime`)
        VALUES
	(?, ?, ?,?)";
        $db = new db();
        $sth = $db->prepare($sql);
        $d = $sth->execute([$uid, $gift, $code, time()]);
        $db->commit();
    }
    
    /**
    * 获取单项礼品库存
    */
    public function getGiftItem($id){
        $sql = "SELECT * FROM hb_gift WHERE id = ?";
        $db = new db();
        $sth = $db->prepare($sql);
        $sth->execute([$id]);
        $data = $sth->fetch(PDO::FETCH_ASSOC);
        return $data;
    }
    
    /**
    * 配置礼品库存
    */
    public function setGiftItem($id,$data){
        $sql = "UPDATE `hb_gift` SET `total`=?,`rate`=? WHERE `id` = ?";
        $db = new db();
        $sth = $db->prepare($sql);
        $sth->execute([$data['total'],$data['rate'],$id]);
        $db->commit();
    }

}
