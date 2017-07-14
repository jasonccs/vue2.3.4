<template>
    <div>
        <a>{{message}}(子组件)</a>
        <br/>
        <button @click="emita" >Click Me!!!</button>
        <router-link to="/slider">First主页</router-link>
        <div :class="alertClasses">
            <slot><strong>Default!</strong> Hello World~</slot>
        </div>
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
            },
            type:{
				type:String,
            }
		},
		computed:{
			alertClasses:function () {
				return {
					'Alert--Success':this.type==='success',
					'Alert--Waring':this.type==='waring'
				}
			}
		},
        methods:{
	        emita:function () {
                this.$emit('emitData','hi');
           }
        }


	}
</script>
<style scope>

    .Alert--Waring{
        color: red;
    }
    .Alert--Success{
        color: green;
    }
</style>