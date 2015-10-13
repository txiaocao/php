



var tpl = {
    "uname": function (uname) {
        if (uname == '') {
            return "小虎鲸";
        }
        return uname;
    },
    "gift": function (gift) {
        console.log(gift);
        switch (parseInt(gift)) {
            case 1:
                return "一等奖：高级电脑包";
            case 2:
                return "二等奖：蓝牙神器";
            case 3:
                return "三等奖：自拍神器";
            case 4:
                return "四等奖：百岁山矿泉水";
            case 5:
                return "五等奖：参与奖";

        }
    },
    "HaveUsed": function (HaveUsed) {
        if (HaveUsed == 1) {
            return "<span class=\"red\">已兑奖</span>";
        }
        if (HaveUsed == 0) {
            return "<span class=\"green\">未兑奖</span>";
        }
    },
    "alert": function (msg) {
        $(".info").text(msg);
    },
    "formateTime": function (time) {
        if (time == 0 || typeof (time) == 'undefined' || time == '') {
            return "-";
        }

        var objDate = new Date(time * 1000);
        var year = objDate.getFullYear();   //四位数字年     
        var month = objDate.getMonth() + 1;   //getMonth()返回的月份是从0开始的，还要加1     
        var date = objDate.getDate();
        var hours = objDate.getHours();
        var minutes = objDate.getMinutes();
        var seconds = objDate.getSeconds();
        var date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        return date;
    },
    "nav": function () {
        $("nav h2").on("click", function () {
            var tid = $(this).attr("id");
            document.getElementById("render").innerHTML = "";
            if (tid == "file") {
                new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml1.html" });
            } else {
                new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml2.html" });
            }
        });
    }
};

(function () {

    WinJS.UI.Pages.define("pages/admin/newhtml0.html", {
        ready: function (element, options) {
            lang();
            $(".info").on("click", function () {
                $(".info").text("");
            });
            $("#queryAuthCode").on("click", function () {
                var data = {};
                data.action = 'auth';
                data.authcode = $("#authcode").val();
                $.ajax({ "url": "../server/public/admin.php", "data": data }).done(function (result) {

                    if (result.status > 0) {
                        document.getElementById("render").innerHTML = '';
                        if (document.getElementById("mode").content == "dj") {
                            new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml1.html" });
                        } else {
                            new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml2.html" });
                        }


                    } else {
                        tpl.alert("错误授权码");
                    }
                });
            });
        }
    });


    WinJS.UI.Pages.define("pages/admin/newhtml1.html", {
        ready: function (element, options) {
            lang();
            tpl.nav();
            $(".info").on("click", function () {
                $(".info").text("");
            });


            $("#queryCode").on("click", function () {
                var data = {};
                data.action = "queryCode";
                data.code = $("#code").val();
                $.ajax({ "url": "../server/public/admin.php", "data": data }).done(function (result) {
                    if (result.status < 0) {
                        tpl.alert(result.data);
                    }
                    result = result.data;
                    $("#uid").text(result.uid);
                    $("#uname").text(tpl.uname(result.uname));
                    $("#gift").text(tpl.gift(result.gift));
                    $("#HaveUsed").html(tpl.HaveUsed(result.HaveUsed));
                    console.log(result, result.createTime, result.updateTime);

                    $("#createTime").text(tpl.formateTime(result.createTime));
                    $("#updateTime").text(tpl.formateTime(result.updateTime));
                });
            });

            $("#updateCode").on("click", function () {
                var data = {};
                data.action = "updateCode";
                data.code = $("#code").val();
                $.ajax({ "url": "../server/public/admin.php", "data": data }).done(function (result) {
                    if (result.status < 0) {
                        tpl.alert("错误：" + result.data);
                        return;
                    }
                    tpl.alert("已兑奖：" + data.code);

                });
            });
        }
    });


    WinJS.UI.Pages.define("pages/admin/newhtm2.html", {
        ready: function (element, options) {
            lang();
            console.log("ready");
        }
    });

    WinJS.UI.Pages.define("pages/admin/newhtml2.html", {
        ready: function () {
            lang();
            tpl.nav();
            $(".info").on("click", function () {
                $(".info").text("");
            });

            $("#queryGiftList").on("click", function () {
                var data = {};
                data.action = 'queryGiftList';
                $.ajax({ "url": "../server/public/admin.php", "data": data }).done(function (result) {
                    var data = result.data;
                    $("table tr.data").remove();
                    for (var i = 0; i < data.length; i++) {
                        var tr = $("<tr class='data'></tr>");
                        tr.append($("<td></td>").text(data[i].id));
                        tr.append($("<td></td>").text(data[i].name));
                        tr.append($("<td></td>").text(data[i].total));
                        tr.append($("<td></td>").text(data[i].use));
                        tr.append($("<td></td>").text(data[i].rate));
                        tr.append($("<td></td>").text(data[i].total - data[i].use));
                        var mod = $("<a></a>");
                        mod.addClass("link");
                        mod.text("修改")
                        mod.attr("data", data[i].id);
                        mod.on("click", function () {
                            var own = $(this);
                            var modid = parseInt(own.attr("data"));
                            if (modid == 3 || modid == 4) {
                                document.getElementById("render").innerHTML = "";
                                new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml3.html", modid: modid });
                            } else {
                                alert("已锁定");
                            }


                        });
                        tr.append($("<td></td>").append(mod));
                        $("table ").append(tr);
                    }

                });
            });
            $("#queryGiftList").trigger("click");
        }
    });
    //WinJS.Navigation.navigate("pages/admin/newhtml2.html");
    
    
    new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml0.html" });

})();