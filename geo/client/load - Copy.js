var xiaok = xiaok || {};
xiaok.geo = xiaok.geo || {};
xiaok.geo = function (callback) {
	(function () {
		var src = "http://";
		src += "api.ma";
		var q = src;
		q += "p.bai";
		q += "du.com/api?v=2.0&ak=";
		q += "2c45a344f56e3b0df6dea7a1992bc083";
		var script = "<script src=':src'></script>".replace(":src", q);
		document.write(script);
	})();
	//2011-7-25
	(function () {        //闭包
		function load_script(xyUrl, callback) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = xyUrl;
			//借鉴了jQuery的script跨域方法
			script.onload = script.onreadystatechange = function () {
				if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
					callback && callback();
					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
					if (head && script.parentNode) {
						head.removeChild(script);
					}
				}
			};
			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			head.insertBefore(script, head.firstChild);
		}
		function translate(point, type, callback) {
			var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
			var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=" + type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
			//动态创建script标签
			load_script(xyUrl);
			BMap.Convertor[callbackName] = function (xyResult) {
				delete BMap.Convertor[callbackName];    //调用完需要删除改函数
				var point = new BMap.Point(xyResult.x, xyResult.y);
				callback && callback(point);
			}
		}

		window.BMap = window.BMap || {};
		BMap.Convertor = {};
		BMap.Convertor.translate = translate;
	})();

	//alert(src);
	locationSuccess = function (position) {
		//坐标转换完之后的回调函数

		var translateCallback = function (point) {
			var geoccallback = function (rs) {
				var addComp = rs.addressComponents;
				//alert();
				var xhr = new XMLHttpRequest();
				var url = geo_server;
				url += "/geo/server";
				url += "/Script1.php";
				//alert(url);
				xhr.open('post', url, true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.onreadystatechange = function (e) {
					//alert(JSON.stringify(xhr.status));
					//alert(xhr.status);
					if (xhr.readyState == 4 && xhr.status == 200) {
						//alert(xhr.responseText);
						if (xhr.responseText != '') {
							localStorage.setItem('sguid', xhr.responseText);
						}
					}
				}
				var data = "";
				data += 'addr=' + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
				data += '&sguid=' + localStorage.getItem('sguid');
				data += '&longitude=' + position.coords.longitude;
				data += '&latitude=' + position.coords.latitude;
				xhr.send(data);

			};
			//alert(1);
			var geoc = new BMap.Geocoder();
			//alert(geoc);
			geoc.getLocation(point, geoccallback);
		};
		//alert(1);
		//alert(position.coords.longitude);
		//alert(position.coords.latitude);
		//百度地图API功能
		//var map = new BMap.Map("allmap");
		//var point = new BMap.Point(116.331398, 39.897445);
		//map.centerAndZoom(point, 12);
		//alert(JSON.stringify(position));
		var pt = new BMap.Point(position.coords.longitude, position.coords.latitude);
		//alert(typeof (BMap.Convertor.translate));

		BMap.Convertor.translate(pt, 2, translateCallback);     //GCJ-02坐标转成百度坐标
		//alert(BMap.Convertor.translate);
	}
	locationError = function (e) {
		//switch (error.code) {
		//	case error.TIMEOUT:
		//		//console.log("A timeout occured! Please try again!");
		//		break;
		//	case error.POSITION_UNAVAILABLE:
		//		//console.log('We can\'t detect your location. Sorry!');
		//		break;
		//	case error.PERMISSION_DENIED:
		//		console.log('Please allow geolocation access for this to work.');
		//		break;
		//	case error.UNKNOWN_ERROR:
		//		console.log('An unknown error occured!');
		//		break;
		//}
	};
	locationOption = {
		// 指示浏览器获取高精度的位置，默认为false
		enableHighAcuracy: true,
		// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
		timeout: 5000,
		// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
		maximumAge: 3000
	};
	navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOption);
}


//document.write('<script src="http://api.map.baidu.com/api?v=2.0&ak=2c45a344f56e3b0df6dea7a1992bc083"></script>');
//document.write('<script src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>');

//2011-7-25