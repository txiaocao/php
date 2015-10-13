<?php
header('Content-type: text/javascript');
$server = "http://" . $_SERVER['HTTP_HOST'];
?>
(function() {
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        // IE
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = callback;
        }
        script.src = url;
        document.head.appendChild(script);
    }

    wx = wx || {};
    wx.reset = function() {
        var param = {};
        param.title = encodeURIComponent(document.querySelector("meta[property='og:title']").content);
        param.desc = document.querySelector("meta[property='og:description']").content;
        param.imgUrl = document.querySelector("meta[property='og:image']").content;
        param.url = location.href;
        var jsserver = "<?php echo $server;?>/wx/wx.php?ref=" + JSON.stringify(param);
        loadScript(jsserver, function() {
            wx.config({
                debug: true,
                appId: wx.data.AppId,
                timestamp: wx.data.time,
                nonceStr: wx.data.nonceStr,
                signature: wx.data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });

            wx.ready(function() {
                wx.onMenuShareTimeline({
                    title: wx.data.title,
                    link: wx.data.url,
                    desc: wx.data.desc,
                    imgUrl: wx.data.imgUrl,
                    success: function() {},
                    cancel: function() {}
                });

                wx.onMenuShareAppMessage({
                    title: wx.data.title,
                    link: wx.data.url,
                    desc: wx.data.desc,
                    imgUrl: wx.data.imgUrl,
                    success: function() {},
                    cancel: function() {}
                });

                wx.onMenuShareQQ({
                    title: wx.data.title,
                    link: wx.data.url,
                    desc: wx.data.desc,
                    imgUrl: wx.data.imgUrl,
                    success: function() {},
                    cancel: function() {}
                });

                wx.onMenuShareWeibo({
                    title: wx.data.title,
                    link: wx.data.url,
                    desc: wx.data.desc,
                    imgUrl: wx.data.imgUrl,
                    success: function() {},
                    cancel: function() {}
                });
            });

            wx.error(function(res) {
                alert(res.errMsg);
            });
        });

    }
    wx.reset();
   // loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', wx.reset);
})();
