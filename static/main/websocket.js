var name,picEmoji='',toAccount,content='';
var data = {};
// 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.NIM.getInstance 来调用接口

var nim = NIM.getInstance({
	// debug: true,
	appKey: CONFIG.appkey,
	account: '1640457915',
	token: '0a74b09468d36bfc08e39fc7eb1ef746',
	onconnect: onConnect,
	// 好友关系
	onfriends: onFriends,
	onroamingmsgs: onRoamingMsgs,
	onofflinemsgs: onOfflineMsgs,
	onmsg: onMsg,
	// 用户名片
	onmyinfo: onMyInfo,
	// 系统通知
	onofflinesysmsgs: onOfflineSysMsgs,
	onsysmsg: onSysMsg,
});
function onConnect() {
	console.log('连接成功');
}
function onFriends(friends) {
	console.log('收到好友列表', friends);
	data.friends = nim.mergeFriends(data.friends, friends);
	data.friends = nim.cutFriends(data.friends, friends.invalid);
	refreshFriendsUI(data.friends);
}

function onRoamingMsgs(obj) {
	console.log('漫游消息', obj);
	pushMsg(obj.msgs);
}
function onOfflineMsgs(obj) {
	console.log('离线消息', obj);
	pushMsg(obj.msgs);
}
function onMsg(msg) {
	console.log('收到消息', msg.scene, msg.type, msg);
	refreshMsgsUI(msg);
	pushMsg(msg);
}
function pushMsg(msgs) {
	if (!Array.isArray(msgs)) { msgs = [msgs]; }
	var sessionId = msgs[0].sessionId;
	data.msgs = data.msgs || {};
	data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
}

function onMyInfo(user) {
	console.log('收到我的名片', user);
	data.myInfo = user;
	updateMyInfoUI(data.myInfo);
}
function onUpdateMyInfo(user) {
	console.log('我的名片更新了', user);
	data.myInfo = NIM.util.merge(data.myInfo, user);
	updateMyInfoUI(data.myInfo);
}

function updateMyInfoUI() {
	// 刷新界面
	 $('.friends').after('<p> 当前账号:'+data.myInfo.account+'<img src="'+data.myInfo.avatar+'" width="120" height="160"></p>');
}

function refreshMsgsUI(msg) {
		if(msg.type=='image'){
			content='<li><img src="'+msg.file.url+'" width="60" height="70"/><span>'+util.formatDate(msg.userUpdateTime)+'</span></li>';
		}else if(msg.type=='text'){
			content= '<li>'+util.buildEmoji(msg.text)+'<span>'+util.formatDate(msg.userUpdateTime)+'</span></li>';
		}else if(msg.type=='geo'){
			content= '<li>'+msg.geo.lat+msg.geo.lng+msg.geo.title+'<span>'+util.formatDate(msg.userUpdateTime)+'</span></li>';
		}else if(msg.type=='file'){
			content= '<li><a href="'+msg.file.url+'" target="_blank" class="download-file f-maxWid"><span class="icon icon-file2">'+msg.file.name+'</span></a><span>'+util.formatDate(msg.userUpdateTime)+'</span></li>';
		}else if(msg.type=='audio') {
			var duration=((msg.file.dur)/1000).toFixed(0);
			content='<li><span class="audio" onclick="util.playAudio('+'\''+msg.file.mp3Url+'\''+','+duration+','+'this'+')"></span></span><span>'+util.formatDate(msg.userUpdateTime)+'</span><span>'+duration+'</span></li>';
		}
    	$('.chat>.content>ul').append(content)
}

// function refreshFriendsUI(friends) {
// 	var allFrinds= '';
// 	for(var i  in friends){
// 		allFrinds += '<li onclick="util.selectUser('+friends[i].account+')">'+friends[i].account+'</li>'
// 	}
// 	$('.friends>ul').append(allFrinds)
// }

function onOfflineSysMsgs(sysMsgs) {
	console.log('收到离线系统通知', sysMsgs);
	pushSysMsgs(sysMsgs);
}
function onSysMsg(sysMsg) {
	console.log('收到系统通知', sysMsg)
	pushSysMsgs(sysMsg);
}
function pushSysMsgs(sysMsgs) {
	data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
    // console.log(data.sysMsgs);
	refreshSysMsgsUI(data.sysMsgs)
}
function refreshSysMsgsUI(sysMsg) {
	 $('.sysmsg ul').empty();
	 $.each(sysMsg,function (i,item) {
		 $('.sysmsg ul').append('<li>'+item.from+"<span onclick='util.passFriends("+JSON.stringify(item)+")'>同意</span><span onclick='util.refuseFriends("+JSON.stringify(item)+")'>同意</span></li>")
	 })
}
function onAddFriend(friend) {
	data.friends = nim.mergeFriends(data.friends, friend);
	refreshFriendsUI();
}