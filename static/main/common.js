var INIT= {

	init: function () {
		return options = {
			appKey: CONFIG.appkey,
			account: util.readCookie("uid"),
			id: util.getIdTag(),
			token: util.readCookie("sdktoken"),
			chatroomNick: util.readCookie("nickName"),
			chatroomAvatar: util.readCookie("avatar")
		}
	}
}