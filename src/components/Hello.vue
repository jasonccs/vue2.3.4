<template>
    <div class="hello">
        <h1 >{{ msg }}</h1>
        <First v-bind:message="parentMsg" v-on:emitData="test" type="waring"></First>

        <input type="text" ref="input1"/>
        <button @click="add">添加</button>
        <input type="text" ref="input2"/>

        <!--<button @click="emitData">得到子组件数据</button>-->

        <p>{{first}}</p>

        <span>{{child}}</span>
        <button @click="getData" class="button" >Click Me!</button>
        <ul>
            <li v-for="(item, index) in items" >{{index}}{{item.title}}</li>
        </ul>

        <div :style="{ fontSize: size + 'px' }"></div>
        <div :style="[styleObjectA, styleObjectB]"></div>
        <div :class="[classA, classB]"></div>
        <div :class="{ active: isActive }"></div>

        <div class="static"
             :class="{ active: isActive, 'text-danger': hasError }">
        </div>

        <div >{{ firstName }}</div>
        <input v-model="firstName" value="">
        <p v-on:click="showAlert()"> 弹窗</p>
        <h3 v-show="ok" >显示</h3>
        <router-link to="/slider">主页</router-link>
    </div>
</template>

<script>
	import Vue from 'vue';
	import Resource from 'vue-resource';
	import First from './First';

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
				parentMsg: 8,  //在data中定义需要传入的值
				child:'',
				alertIsOpen: false,
				size:20,
				styleObjectA:'20px',
				styleObjectB:'30px',
				classA:'a',
				classB:'b',
				isActive: true,
				hasError: true,
				firstName: 'Foo',
				lastName:'word',
				first:'',
			}
		},
		mounted () {
			//el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
			//接收First组件的数据
			console.log(this);
			this.$on("emitData", function (hi) {
				this.first = hi;
			});
		},
		components: {First,},
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
			add:function(){
				this.$refs.input1.value ="22"; //this.$refs.input1  减少获取dom节点的消耗
			},
			test:function (value) {
				this.first=value;
			},
//			emitData:function () {
//                this.$on('test',function (value) {
//	                this.first=value;
//	                console.log(111);
//                });
//				console.log(888);
//			}
		},
		watch:{
			firstName: function (val) {
//		        this.firstName = val + ' ' + this.lastName
				let aa= val + ' ' + this.firstName
				console.log(aa);
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/css/hello.scss';


</style>
