<template>
    <div>
        <a  v-bind:href="message">(子组件)</a>
        <a  v-bind:href="message">(父组件)</a>
        <router-link to="/slider">主页</router-link>
    </div>
</template>
<script>
	export default {
		props: {
			message: String  //定义传值的类型<br>    }
		}
	}
</script>
<style>
</style>