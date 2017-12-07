var page = {
	init: function () {
		var options = {
			appKey: '1ab74aaec057d0d5c793c811eb68ae5e',
			account: util.readCookie("uid"),
			id: util.getIdTag(),
			token: util.readCookie("sdktoken"),
			chatroomNick: util.readCookie("nickName"),
			chatroomAvatar: util.readCookie("avatar")
		}
		this.account = util.readCookie("uid");
		this.offsetTime = 0;
		this.initNode();
		this.initEmoji();
		this.initEvt();
		var link = this.link = window.link = new LinkRoom(this, options);
		this.data = link.data;
		this.initVideo();
	},

}