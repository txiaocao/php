var xiaok = xiaok || {};
xiaok.geo = xiaok.geo || {};
xiaok.geo = function (url) {
	locationSuccess = function (position) {
		var xhr = new XMLHttpRequest();
		xhr.open('post', url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function (e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText != '') {
					localStorage.setItem('sguid', xhr.responseText);
				}
			}
		}
		var data = "";
		data += 'sguid=' + localStorage.getItem('sguid');
		data += '&longitude=' + position.coords.longitude;
		data += '&latitude=' + position.coords.latitude;
		xhr.send(data);
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
var url = geo_server;
url += "/geo/server";
url += "/Script1.php";
xiaok.geo(url);