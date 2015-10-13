var turnplate = {
	restaraunts: [], //大转盘奖品名称
	colors: [], //大转盘奖品区块对应背景颜色
	outsideRadius: 165, //大转盘外圆的半径
	textRadius: 135, //大转盘奖品位置距离圆心的距离
	insideRadius: 59, //大转盘内圆的半径
	startAngle: 0, //开始角度
	bRotate: false //false:停止;ture:旋转
};

// var flag = 1;
var boolajax = true;
var Lottery;
var config = {
	"HBId": "487",
	"HBKey": "iqx5qx5psladqc6jyv6z6ngzbcje450f",
	"HBServer": "../server/public/login.php?token=",
	"server": "../server/public/getLuckyDraw.php"
};

HB_H5Game = HB_H5Game || {};
var uInfo;
var demoId;
var inited = HB_H5Game.init(config.HBId, config.HBKey);
//用户信息
function dealUserInfo(data) {
	console.log('获取用户信息完成，结果：' + data.code);

	if (data.code < 1) {
		console.log('获取用户信息失败，返回信息：' + 'code:' + data.code + ',msg:' + data.msg);
		console.info('code:' + data.code + ',message:' + data.message);
	} else {
		uInfo = data.data;
		console.log(data);
		console.log('获取用户信息成功，返回信息：[uid:' + data.data.uid + ',name:' + data.data.name + ',pic:' + data.data.pic + ']');

		localStorage.setItem("userInfo", JSON.stringify(data));
		console.info(JSON.stringify(data));
		// 已成功之后所要做的
	}
}

//旋转转盘 item:奖品位置; txt：提示语;
function rotateFn(item, txt) {
	var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
	if (angles < 270) {
		angles = 270 - angles;
	} else {
		angles = 360 - angles + 270;
	}
	$('#wheelcanvas').stopRotate();
	$('#wheelcanvas').rotate({
		angle: 0,
		animateTo: angles + 1800,
		duration: 5000,
		callback: function() {
			//奖品逻辑判断
			if (txt.indexOf("矿泉水") > 0) {
				$("#img-2").attr("src", "images/water-big.png");
				$(".img-3").attr("src", "images/forth.png");
			} else if (txt.indexOf("电脑包") > 0) {
				$("#img-2").attr("src", "images/bag-big.png");
				$(".img-3").attr("src", "images/first.png");
			} else if (txt.indexOf("自拍") > 0) {
				$("#img-2").attr("src", "images/stick-big.png");
				$(".img-3").attr("src", "images/third.png");
			} else if (txt.indexOf("现金") > 0) {
				$("#img-2").attr("src", "images/money-big.png");
				$(".img-3").attr("src", "images/specific.png");
			} else if (txt.indexOf("音响") > 0) {
				$("#img-2").attr("src", "images/sound-big.png");
				$(".img-3").attr("src", "images/second.png");
			}
			$(".box").css("display", "block");
			$("#box-b").addClass("box-b");
			
			
			//							alert(txt);
			turnplate.bRotate = !turnplate.bRotate;
		}
	});
};
$(document).ready(function() {
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["一等奖:高级电脑包", "二等奖:蓝牙音响", "三等奖:自拍神器", "四等奖:百岁山矿泉水", "特等奖:现金1000元"];
	turnplate.colors = ["#fdd47e", "#e47139", "#fbb954", "#fbda18", "#f9b233"];
	var rotateTimeOut = function() {
		$('#wheelcanvas').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 5000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};

	function loadUser() {
		console.info("正在加载用户信息中...");
		HB_H5Game.login(function(token) {
			if (boolajax == true && Lottery != 0) {
				console.log('登录完成，返回Token：' + token);
				console.log('开始获取用户信息...');
				var date = new Date();
				var postUrl = config.HBServer + token + "&v=" + date.getTime();
				//				HB_H5Game.sendUrl(postUrl, dealUserInfo);

				$.ajax({
					url: postUrl,
					dataType: "jsonp",
					async: true,
					success: function(data) {
						dealUserInfo(data);
						if (data.status == 1) {
							// flag++;
							if (data.data.LotteryNumber != 0) {
								turnWheell();
							}
							if (data.data.LotteryNumber == 0) {
								if (data.data.gift == 1) {
									$("#img-2").attr("src", "images/bag-big.png");
									$(".img-3").attr("src", "images/first.png");
									$("#code").text(data.data.code);
									$(".box").css("display", "block");
									$("#box-b").addClass("box-b");
									$("#user").text(data.data.uname);
									$("#chance").text(data.data.LotteryNumber);
								} else if (data.data.gift == 2) {
									$("#img-2").attr("src", "images/sound-big.png");
									$(".img-3").attr("src", "images/second.png");
									$("#code").text(data.data.code);
									$(".box").css("display", "block");
									$("#box-b").addClass("box-b");
									$("#user").text(data.data.uname);
									$("#chance").text(data.data.LotteryNumber);
								} else if (data.data.gift == 3) {
									$("#img-2").attr("src", "images/stick-big.png");
									$(".img-3").attr("src", "images/third.png");
									$("#code").text(data.data.code);
									$(".box").css("display", "block");
									$("#box-b").addClass("box-b");
									$("#user").text(data.data.uname);
									$("#chance").text(data.data.LotteryNumber);
								} else if (data.data.gift == 4) {
									$("#img-2").attr("src", "images/water-big.png");
									$(".img-3").attr("src", "images/forth.png");
									$("#code").text(data.data.code);
									$(".box").css("display", "block");
									$("#box-b").addClass("box-b");
									$("#user").text(data.data.uname);
									$("#chance").text(data.data.LotteryNumber);
								} else if (data.data.gift == 5) {
									$("#img-2").attr("src", "images/money-big.png");
									$(".img-3").attr("src", "images/specific.png");
									$("#code").text(data.data.code);
									$(".box").css("display", "block");
									$("#box-b").addClass("box-b");
									$("#user").text(data.data.uname);
									$("#chance").text(data.data.LotteryNumber);
								} else if (data.data.gift == 6) {
									boolajax = false;
									Lottery = data.data.LotteryNumber;
								}
								
								$("a.qrcode").remove();
								var a = $("<a>");
	                            a.text("获取二维码");
	                            a.addClass("qrcode");
	                            a.attr("data",data.data.code);
	                            a.on("click",function(){
	                                $("#all").addClass("none");
	                                var own = $(this);
	                                var img = $("<img>");
	                                img.addClass("qrcode");
	                                var url = location.href+"../client/djqr.html?"+own.attr("data");
	                                var imgurl = "http://huobaoyx.com/api/qr/?data="+url;
	                                img.attr("src",imgurl);
	                                img.on("click",function(){
	                                    $(this).remove();
	                                    $("#all").removeClass("none");
	                                });
	                                $("body").append(img);
	                            });
	                            $(".con-2").append(a);

							}
							$("#user").text(data.data.uname);
							$("#chance").text(data.data.LotteryNumber);
						} else if (data.status == -1) {
							alert(data.data);
						}
					},
					error: function() {
						alert("error");
					}
				});
			}
			if (boolajax == false) {
				alert("奖品已经发放完毕，谢谢参与！");
			}
		}, this);


	}

	//  function loadReg() {
	//      if ($("#gotoReg")) {
	//          $("#gotoReg").trigger("click");
	//          clearInterval(demoId);
	//          return true;
	//      }
	//      return false;
	//  }

	//开始抽奖入口
	$("#playbutton").click(function() {
		$("#miss").css("display", "none");
		loadUser();
	})
});

function turnWheell() {
		var date = new Date();
		var item;
		var url = config.server + "?t=" + date.getTime();
		var data = {};
		data = JSON.parse(localStorage.getItem("userInfo"));
		$.ajax({
			url: url,
			data: data.data,
			dataType: "jsonp",
			success: function(data) {
				if (data.data == 6) {

					alert("奖品已经发放完毕,谢谢参与！");
					$("#miss").css("display", "block");
				} else {
					item = parseInt(data.data);
					$("#code").text(data.code);
					
					$("a.qrcode").remove();
					var a = $("<a>");
		            a.text("获取二维码");
		            a.addClass("qrcode");
		            a.attr("data",data.code);
		            a.on("click",function(){
		                $("#all").addClass("none");
		                var own = $(this);
		                var img = $("<img>");
		                img.addClass("qrcode");
		                var url = location.href+"../client/djqr.html?"+own.attr("data");
		                var imgurl = "http://huobaoyx.com/api/qr/?data="+url;
		                img.attr("src",imgurl);
		                img.on("click",function(){
		                    $(this).remove();
		                    $("#all").removeClass("none");
		                });
		                $("body").append(img);
		            });
		            $(".con-2").append(a);
					
					
					//							alert(item);
					console.log(data);
					//控制大盘转动
					if (turnplate.bRotate) return;
					turnplate.bRotate = !turnplate.bRotate;
					//获取随机数(奖品个数范围内)
					//					var item = rnd(1, turnplate.restaraunts.length);
					//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
					rotateFn(item, turnplate.restaraunts[item - 1]);
					switch (item) {
						case 1:
							rotateFn(1, turnplate.restaraunts[0]);
							break;
						case 2:
							rotateFn(2, turnplate.restaraunts[1]);
							break;
						case 3:
							rotateFn(3, turnplate.restaraunts[2]);
							break;
						case 4:
							rotateFn(4, turnplate.restaraunts[3]);
							break;
						case 5:
							rotateFn(5, turnplate.restaraunts[4]);
							break;
					}
					console.log(item);
				}

			},
			error: function() {
				alert("error");
			}
		});
	}
	//关闭窗口

function hideBack() {
		$("#box").css("display", "none");
		$("#box-b").removeClass();
		$("#miss").css("display", "block");
		$("#playbutton").attr("src", "images/getPresent.png");
	}
	//			function rnd(n, m) {
	//					var random = Math.floor(Math.random() * (m - n + 1) + n);
	//					return random;
	//				}
	//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function() {
	drawRouletteWheel();
};

function drawRouletteWheel() {
	var canvas = document.getElementById("wheelcanvas");
	if (canvas.getContext) {
		//根据奖品个数计算圆周角度
		var arc = Math.PI / (turnplate.restaraunts.length / 2);
		var ctx = canvas.getContext("2d");
		//在给定矩形内清空一个矩形
		ctx.clearRect(0, 0, 422, 422);
		//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
		ctx.strokeStyle = "#FFBE04";
		//font 属性设置或返回画布上文本内容的当前字体属性
		ctx.font = '16px Microsoft YaHei';
		for (var i = 0; i < turnplate.restaraunts.length; i++) {
			var angle = turnplate.startAngle + i * arc;
			ctx.fillStyle = turnplate.colors[i];
			ctx.beginPath();
			//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
			ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
			ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
			ctx.stroke();
			ctx.fill();
			//锁画布(为了保存之前的画布状态)
			ctx.save();
			//----绘制奖品开始----
			ctx.fillStyle = "#ffffff"; //奖品文字颜色
			var text = turnplate.restaraunts[i];
			var line_height = 17;
			//translate方法重新映射画布上的 (0,0) 位置
			ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
			//rotate方法旋转当前的绘图
			ctx.rotate(angle + arc / 2 + Math.PI / 2);
			/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
			if (text.indexOf("M") > 0) {
				var texts = text.split("M");
				for (var j = 0; j < texts.length; j++) {
					ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
					if (j == 0) {
						ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
					} else {
						ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
					}
				}
			} else if (text.indexOf("M") == -1 && text.length > 10) { //奖品名称长度超过一定范围
				text = text.substring(0, 6) + "||" + text.substring(6);
				var texts = text.split("||");
				for (var j = 0; j < texts.length; j++) {
					ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				}
			} else {
				//在画布上绘制填色的文本。文本的默认颜色是黑色
				//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			}

			//添加对应图标
			if (text.indexOf("矿泉水") > 0) {
				var img = document.getElementById("water-img");
				img.onload = function() {
					ctx.drawImage(img, -15, 10);
				};
				ctx.drawImage(img, -55, 1);
			}
			if (text.indexOf("电脑包") > 0) {
				var img = document.getElementById("bag-img");
				img.onload = function() {
					ctx.drawImage(img, -15, 10);
				};
				ctx.drawImage(img, -55, 1);
			}
			if (text.indexOf("自拍") > 0) {
				var img = document.getElementById("stick-img");
				img.onload = function() {
					ctx.drawImage(img, -15, 10);
				};
				ctx.drawImage(img, -55, 0);
			}
			if (text.indexOf("现金") > 0) {
				var img = document.getElementById("money-img");
				img.onload = function() {
					ctx.drawImage(img, -15, 1);
				};
				ctx.drawImage(img, -55, 10);
			}
			if (text.indexOf("音响") > 0) {
				var img = document.getElementById("sound-img");
				img.onload = function() {
					ctx.drawImage(img, -15, 10);
				};
				ctx.drawImage(img, -55, -5);
			}
			//把当前画布返回（调整）到上一个save()状态之前
			ctx.restore();
			//----绘制奖品结束----
		}
	}
}