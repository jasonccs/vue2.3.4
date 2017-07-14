<template>
    <div>
        <a>{{message}}(子组件)</a>
        <br/>
        <button @click="emita" >Click Me!!!</button>
        <router-link to="/slider">First主页</router-link>

        <h1 slot="footer">
            About Me
        </h1>

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
//				required: true,
            }
		},
        methods:{
	        emita:function () {
                this.$emit('emitData','hi');
           }
        }


	}
</script>
