<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
         <First :message="parentMsg"></First>
        <span v-text="parentMsg"></span><br>
        <button @click="getData" class="button" >Click Me!</button>
        <ul>
            <li v-for="(item, index) in items" >{{index}}{{item.title}}</li>
        </ul>
        <h3 v-show="ok">显示</h3>
        <router-link to="/slider">主页</router-link>
    </div>
</template>

<script>
	import Vue from 'vue'
	import Resource from 'vue-resource'
    import First from './First'

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
				parentMsg: 'a message from parent'  //在data中定义需要传入的值
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
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
        width: 90%;
        height:auto;
        margin: 0 auto;
    }

    li {
        display: inline-block;
        margin: 0 10px;
        float: left;
        width: 100%;
        height:30px;
    }

    a {
        color: #42b983;
    }

    button{
        width: 80px;
        height:40px;

    }
</style>
