<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <First v-bind:message="parentMsg" ></First>
        <span>{{child}}</span>
        <button @click="getData" class="button" >Click Me!</button>
        <ul>
            <li v-for="(item, index) in items" >{{index}}{{item.title}}</li>
        </ul>
        <div class="slide">
            <ul>
                <li>tab1</li>
                <li>tab2</li>
            </ul>
            <ul>
                <li>content1</li>
                <li>content2</li>
            </ul>
        </div>
        <h3 v-show="ok">显示</h3>
        <router-link to="/slider">主页</router-link>
    </div>
</template>

<script>
	import Vue from 'vue'
	import Resource from 'vue-resource'
    import First from './First'

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
			    child:''
			}
		},
		components: {First},
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
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/css/hello.scss';
</style>
