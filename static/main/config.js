(function() {
	// 配置
	var envir = 'online';
	var configMap = {
		test: {
			appkey: '1ab74aaec057d0d5c793c811eb68ae5e',
			url:'https://apptest.netease.im'
		},
		online: {
			appkey: '1ab74aaec057d0d5c793c811eb68ae5e',
			url:'https://app.netease.im',
		}
	};
	window.CONFIG = configMap[envir];
	// 是否开启订阅服务
	window.CONFIG.openSubscription = true
}())

