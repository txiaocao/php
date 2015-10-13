///*******************************************************************************************************
//* js sdk demo 示例
//* date: 2015-06-02
//*
//**/

//HB_H5Game = HB_H5Game || {};

//// console log
////console.log = function (str) {
////	var node = document.createElement('p');
////	node.innerHTML = str;
////	document.getElementById('log').insertBefore(node, document.querySelector("#log p:first-child"));
////}
///**
//* 获取当前登录用户余额
//*/
//HB_H5Game.getBalance = function () {
//	if (typeof (uInfo) == 'undefined') {
//		console.log('您尚未登录，请先登录再查询余额！');
//		return false;
//	}
//	var xhr = new XMLHttpRequest();
//	xhr.open("post", "../server/pay.php", false);
//	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//	xhr.send("action=getBalance&uid=" + uInfo.uid);
//	var result = JSON.parse(xhr.responseText);
//	if (result.code == 1) {
//		console.log("用户余额是：" + result.data);
//	} else {
//		console.log("调用出错：" + JSON.stringify(result));
//	}
//	return true;
//}
///**
//* 获取用户订单信息
//*/
//HB_H5Game.getOrder = function () {
//	if (typeof (uInfo) == 'undefined') {
//		console.log('您尚未登录，请先登录再充值！');
//		return false;
//	} else {
//		data = {};
//		data.uid = uInfo.uid;
//		// 金额确认
//		var num = prompt("请输入充值的金额（单位：元）");
//		num = Number(num);
//		if (typeof (num) == 'NaN' || num == null || num == 0) {
//			console.log("输入的金额数目不正确");
//			return false;
//		}
//		data.money = num;

//		xhr = new XMLHttpRequest();
//		xhr.open("post", '../server/pay.php', false);
//		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//		xhr.send("action=getOrder&uid=" + data.uid + "&money=" + data.money);

//		var result = JSON.parse(xhr.responseText);
//		if (result.code != 1) {
//			console.log("调用出错：" + JSON.stringify(result));
//			return false;
//		}
//		console.log("用户订单数据是：" + JSON.stringify(result));
//		data.orderId = result.data.orderId;
//		data.extend = result.data.extendInfo;

//		alert("数据准备完毕，发送支付请求。" + JSON.stringify(data));
//		HB_H5Game.pay(data.uid, data.money, data.orderId, data.extend, function () { console.log("支付完成后回调") }, this);
//	}
//}