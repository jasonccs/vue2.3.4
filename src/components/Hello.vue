<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <First v-bind:message="parentMsg" ></First>
        <span>{{child}}</span>
        <button @click="getData" class="button" >Click Me!</button>
        <ul>
            <li v-for="(item, index) in items" >{{index}}{{item.title}}</li>
        </ul>

        <alert  v-bind:alertIsOpen="false" placement="top"   :duration="3000" type="success" width="400px" dismissable>
            <span class="icon-ok-circled alert-icon-float-left"></span>
            <strong>Well Done!</strong>
            <p>You successfully read this important alert message.</p>
        </alert>


        <p v-on:click="showAlert()"> 弹窗</p>
        <h3 v-show="ok" >显示</h3>
        <router-link to="/slider">主页</router-link>
    </div>
</template>

<script>
	import Vue from 'vue';
	import Resource from 'vue-resource';
    import First from './First';
	import { alert } from 'vue-strap';

	console.log(First)

	Vue.use(Resource);

	export default {
		name: 'hello',
		data () {
			return {
				numbers: [ 1, 2, 3, 4, 5 ],
				msg: 'Welcome to Your Vue.js App',
				items:[],
                ok:false,
                props:{
					msg:'aaa'
                },
				parentMsg: 'a message from parent22',  //在data中定义需要传入的值
			    child:'',
				alertIsOpen: false,
			}
		},
		components: {
			First,
            alert
		},
		methods:{
			getData:function () {
				var url="https://facebook.github.io/react-native/movies.json";
				this.$http.get(url).then(function(data){
					var data=data.body.movies;
					this.items.push({title: "Inter", releaseYear: "2017"})
					this.items=data;
				},function(response){
					console.log(response);
				})
			},
			showAlert : function(){
				 this.$set(this.$data, 'alertIsOpen',true)// 改变数据并且更新视图
			},

		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/css/hello.scss';
</style>
