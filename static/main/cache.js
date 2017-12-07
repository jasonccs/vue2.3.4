var Cache = (function() {
//查消息 session-id idClient
	Cache.prototype.findMsg = function (sid, cid) {
		var list = this.msgs[sid];
		for (var i = list.length - 1; i >= 0; i--) {
			if (list[i].idClient === cid) {
				return list[i];
			}
		}
		;
		return false
	}

})();