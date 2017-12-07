<template>
 
    		<div class="chat">

		    <div class="content">
		        <ul>
		        </ul>
		    </div>
		    <span class="chat-btn msg-type" id="chooseFileBtn">
		        <a class="icon icon-file" ></a>
		    </span>
		    <a class="chat-btn u-netcall-audio-link" id="showNetcallAudioLink">&nbsp;</a>
		    <form action="#" id="uploadForm" >
		        <input multiple="multiple" type="file" name="file" id="uploadFile" onchange="util.uploadImage()" class="hide">
		    </form>
		    <div class="emoji">
		        <ul class="m-emoji-picCol-ul" style="width: 490px; height: auto;">
		            <span id="pic-emoji-[大笑]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_0.png"></span>
		            <span id="pic-emoji-[可爱]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_01.png"></span>
		            <span id="pic-emoji-[色]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_02.png"></span>
		            <span id="pic-emoji-[嘘]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_03.png"></span>
		            <span id="pic-emoji-[亲]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_04.png"></span>
		            <span id="pic-emoji-[呆]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_05.png"></span>
		            <span id="pic-emoji-[口水]" style="width: 19px; height: auto;" class=""><img src="../../static/images/emoji/emoji_06.png"></span>
		        </ul>
		    </div>
		    <textarea type="text"  name="msg" value="" class="input" autofocus="autofocus"></textarea>

		    <input  type="button" name="button" value="发送" class="button" onclick="util.sendMsg()">

		</div>

</template>

 
 

<script>
	
	export default {
		data(){
        	return {
		        msg:'message',
            }
        },
		props: {
			message:  {
                type:Number,
                default:666,
				required: true,
            },
            type:{
				type:String,
            }
		},
		computed:{
			alertClasses:function () {
				return {
					'Alert--Success':this.type==='success',
					'Alert--Waring':this.type==='waring',
					'none':this.type==='none'
				}
			},
			 refreshFriendsUI:function(friends) {
			 	alert(1);
				var allFrinds= '';
				for(var i  in friends){
					allFrinds += '<li onclick="util.selectUser('+friends[i].account+')">'+friends[i].account+'</li>'
				}
				$('.friends>ul').append(allFrinds)
			}
		},
        methods:{
	        emita:function () {
                this.$emit('emitData','hi');
           }
        }


	}
</script>



<style lang="scss" scoped>
   


</style>