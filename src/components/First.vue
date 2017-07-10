<template>
    <div>
        <a  v-bind:href="message" ref="child">{{msg}}(子组件)</a>
        <br/>
        <router-link to="/slider">主页</router-link>
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
			    message: String  //定义传值的类型<br>    }
		},



	}
</script>
