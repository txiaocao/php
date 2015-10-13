var config = {
    "HBKey": "iqx5qx5psladqc6jyv6z6ngzbcje450f",
    "HBId": "487",
    "HBServer": "../server/public/login.php?token=",
    "server": "../server/public/getLuckyDraw.php"
};
HB_H5Game = HB_H5Game || {};
var uInfo;
var inited = HB_H5Game.init(config.HBId, config.HBKey);
WinJS.UI.Pages.define("pages/HtmlPage2.html", {
    ready: function (element, options) {
        var userdata = window.localStorage.getItem('userInfo');
        userdata = JSON.parse(userdata);
        userdata = userdata['data'];
        if (userdata['uname'] === '') {
            userdata['uname'] = '小虎鲸';
        }
        
        var tips = userdata['uname'] + "你好，你有" + userdata['LotteryNumber'] + "次抽奖机会！";
        document.getElementById("tips").innerHTML = tips;
        if (userdata['code'] !== '') {
            var img = $("<img>");
            var url = location.href+"../client/djqr.html?"+userdata['code'];
            var imgurl = "http://huobaoyx.com/api/qr/?data="+url;
            img.attr("src",imgurl);
            $("#tips").append(img);
            
            
            document.getElementById("tips").innerHTML += "<br />兑奖码：" + userdata['code'];
        }


        document.getElementById("start").addEventListener("click", function () {
            var data = {};

            data = JSON.parse(localStorage.getItem("userInfo"));

            $.ajax({url: config.server, dataType: "jsonp", "data": data.data}).done(function (result) {
                if (result.status < 0) {
                    document.getElementById("info").innerHTML = ("错误：" + result.data);
                    return;
                }
                document.getElementById("info").innerHTML = ("抽中奖品" + result.data);
            });

        });
    }
});

WinJS.UI.Pages.define("pages/HtmlPage1.html", {
    ready: function (element, options) {
        document.getElementById("start").addEventListener("click", this.login);
    },
    login: function () {
        // if (localStorage.getItem("userInfo") !== null) {
        //      document.getElementById("render").innerHTML = "";
        //      new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/HtmlPage2.html" });
        //  }
        //处理用户信息
        function dealUserInfo(data) {
            console.log('获取用户信息完成，结果：' + data.code);
            if (data.code < 1) {
                console.log('获取用户信息失败，返回信息：' + 'code:' + data.code + ',msg:' + data.msg);
                console.info('code:' + data.code + ',message:' + data.message);

            } else {
                uInfo = data.data;
                console.log('获取用户信息成功，返回信息：[uid:' + data.data.uid + ',name:' + data.data.name + ',pic:' + data.data.pic + ']');
                localStorage.setItem("userInfo", JSON.stringify(data));
                console.info(JSON.stringify(data));

                document.getElementById("render").innerHTML = "";
                new WinJS.UI.HtmlControl(document.getElementById("render"), {uri: "pages/HtmlPage2.html"});
            }
        }

        HB_H5Game.login(function (token) {
            console.log('登录完成，返回Token：' + token);
            console.log('开始获取用户信息...');
            var date = new Date();
            var postUrl = config.HBServer + token + "&v=" + date.getTime();
            HB_H5Game.sendUrl(postUrl, dealUserInfo);
        }, this);
    }
});


document.getElementById("render").innerHTML = "";
new WinJS.UI.HtmlControl(document.getElementById("render"), {uri: "pages/HtmlPage1.html"});
