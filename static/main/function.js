var util ={
	readCookie:function(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	setCookie:function(name,value) {
		var days = 1;
		var exp = new Date();
		exp.setTime(exp.getTime() + days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	delCookie:function(name) {
		var cval=this.readCookie(name);
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+(new Date(0)).toGMTString();
		}
	},
	getAvatar:function(url) {
		var re=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
		if(re.test(url)){
			return url+"?imageView&thumbnail=80x80&quality=85";
		}else{
			return "../images/default-icon.png"
		}
	},
	formatDate:function (now)   {
		var   year=new Date(now).getYear()+1900;
		var   month=new Date(now).getMonth()+1;
		var   date=new Date(now).getDate();
		var   hour=new Date(now).getHours();
		var   minute=new Date(now).getMinutes();
		var   second=new Date(now).getSeconds();
		return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
	},
	//播放语音
	playAudio:function (data,duration,e) {
		var audio = new Audio(data);
		audio.play();
		util.showTime(duration);
		$(e).next().next().text()
		audio.addEventListener('ended', function () {
			$(e).next().next().text(duration)
		}, false);
	},
	showTime:function (t) {
			t -= 1;
			//每秒执行一次,showTime()
			setTimeout("showTime()",1000);
	},
	//通过正则替换掉文本消息中的emoji表情
	buildEmoji:function(text) {
		var re = /\[([^\]\[]*)\]/g;
		var matches = text.match(re) || [];
		for (var j = 0, len = matches.length; j < len; ++j) {
			if(emoji[matches[j]]){
				text = text.replace(matches[j], '<img class="emoji" src="images/emoji/' + emoji[matches[j]].file + '" />');
			}
		}
		return text;
	},
	selectEmoji:function () {

	},
	buildMsg:function(data){
		var text;
		switch (data.type){
			case 'text':
				text = this.buildEmoji(this.escape(data.text));
				break;
			case 'custom':
				if (!data.content) {
					text = '[未知消息类型]';
				}else{
					var content = JSON.parse(data.content);
					if(content.type===1){
						text = '<img src="images/play-'+content.data.value+'.png" onload="page.scrollToBottom()">';
					}
				}
				break;
			default:
				text = '[未知消息类型]';
				break;
		}
		return text;
	},
	//选择聊天用户
	selectUser:function (data) {
		toAccount=data;
	},
	//申请加为好友
	addFriends:function () {
		var account=$("input[name=friends]").val();
		nim.applyFriend({
			account: account,
			ps: 'ps',
			done: applyFriendDone
		});
		function applyFriendDone(error, obj) {
			console.log('申请加为好友' + (!error?'成功':'失败'), error, obj);
		}
	},

	//直接加为好友

	directFriends:function()
	{
		var account=$("input[name=friends]").val();
		nim.addFriend({
		    account: account,
		    ps: 'ps',
		    done: addFriendDone
		});
		function addFriendDone(error, obj) {
		    console.log(error);
		    console.log(obj);
		    console.log('直接加为好友' + (!error?'成功':'失败'));
		    if (!error) {
		        onAddFriend(obj.friend);
		    }
		}

	},		


	//更新用户名片
	updateUserCard:function(){

			nim.updateMyInfo({
		    nick: '小湖边',
		    avatar:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=799260243,115787723&fm=175&s=3920499148700794CD1055CF03008042&w=640&h=330&img.JPG',
		    sign: '天生我才必有用！',
		    gender: 'male',
		    email: '1640457915@qq.com',
		    birth: '1998-10-08',
		    tel: '13554078820',
		    custom: '{type: "newCustom", value: "new"}',
		    done: updateMyInfoDone
		});
		function updateMyInfoDone(error, user) {
		    console.log('更新我的名片' + (!error?'成功':'失败'));
		    console.log(error);
		    console.log(user);
		    if (!error) {
		        onUpdateMyInfo(user);
		    }
		}
	},



	//发送语音

	sendAudio:function(){
			new Audio()

	},

	//获取用户名片
	getUserUserCard:function()
	{
		nim.getUser({
   			account: '1640457915',
  		  	done: getUserDone
		});
		function getUserDone(error, user) {
		    console.log(error);
		    console.log(user);
		    console.log('获取用户名片' + (!error?'成功':'失败'));
		    if (!error) {
		        onUsers(user);
		    }
		}

	},


	//通过申请好友申请
	passFriends:function (sysMsg) {
		// 假设 sysMsg 是通过回调 onsysmsg 收到的系统通知
		nim.passFriendApply({
			idServer: sysMsg.idServer,
			account: sysMsg.from,
			ps: (sysMsg.ps=='')?'':sysMsg.ps,
			done: passFriendApplyDone
		});
		function passFriendApplyDone(error, obj) {
			console.log('通过好友申请' + (!error?'成功':'失败'), error, obj);
			if (!error) {
				onAddFriend(obj.friend);
			}
		}
	},
	//拒绝好友申请
	refuseFriends:function (sysMsg) {
		nim.rejectFriendApply({
			idServer: sysMsg.idServer,
			account: sysMsg.from,
			ps: (sysMsg.ps=='')?'':sysMsg.ps,
			done: rejectFriendApplyDone
		});
		function rejectFriendApplyDone(error, obj) {
			console.log(error);
			console.log(obj);
			console.log('拒绝好友申请' + (!error?'成功':'失败'));
		}
	},
	
	//发送聊天消息
	sendMsg:function () {
		var msg = nim.sendText({
			scene: 'p2p',
			to: toAccount,
			text:$('textarea').val().replace(/\s/ig,''),
			isLocal:false,
			done: sendMsgDone
		});
		pushMsg(msg);
		$('textarea').val('')
		picEmoji='';

		function sendMsgDone(error, msg) {
			console.log(msg);
			$('.content>ul').append('<li onclick="util.deleteMsg('+'\''+msg.sessionId+'\''+','+'\''+msg.idClient+'\''+')"><img src="'+data.myInfo.avatar+'" width="40" height="60" /><h3>'+util.buildEmoji(msg.text)+'</h3><span>'+util.formatDate(msg.time)+'</span></li>');
			console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
			pushMsg(msg);
		}
	},
	//图片发送
	uploadImage:function () {

		nim.sendFile({
			scene: 'p2p',
			to: toAccount,
			type: 'image',
			fileInput: $('#uploadFile').get(0),
			uploadprogress: function(obj) {
				console.log('上传进度文本: ' + obj.percentageText);
			},
			uploaddone: function(error, file) {
				console.log('上传' + (!error?'成功':'失败'), error, file);
			},
			beforesend: function(msg) {
				pushMsg(msg);
			},
			done: util.sendMsgDone
		});
	},
	// 发送地理位置
	sendAddress:function () {
		var msg = nim.sendGeo({
			scene: 'p2p',
			to: '15629037629',
			geo: {
				lng: '116.3833',
				lat: '39.9167',
				title: 'Beijing'
			},
			done: util.sendMsgDone
		});
		console.log('正在发送p2p geo消息, id=' + msg.idClient);
		pushMsg(msg);
	},
	//回调函数
	sendMsgDone:function(error, msg) {
		refreshMsgsUI(msg);
	},
	//撤回消息
	deleteMsg:function (sessionId,idClient) {
		var someMsg=util.findMsg(sessionId,idClient);
		nim.deleteMsg({
			msg: someMsg,
			done: util.deleteMsgDone
		})
		console.log('正在撤回消息', someMsg)
	},
	deleteMsgDone : function  (error) {
		console.log(error);
		console.log('撤回消息' + (!error?'成功':'失败'), error);
	},
	findMsg : function (sid, cid) {
		this.msgs ={};
		var list = this.msgs[sid];
		for (var i = list.length - 1; i >= 0; i--) {
			if (list[i].idClient === cid) {
				return list[i];
			}
		}
		;
		return false
	}
};
