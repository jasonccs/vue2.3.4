import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Slider from '@/components/Slider'
import First from '@/components/First'
import Chat from '@/components/Chat'
import Tree from '@/components/tree'



Vue.use(Router)


export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello,
		},
		{
			path: '/slider',
			name: 'Slider',
			component: Slider,
		},
		{
			path: '/first',
			name: 'First',
			component: First,
		},

		{
			path: '/chat',
			name: 'Chat',
			component: Chat,
		},
    {
      path: '/tree',
      name: 'Tree',
      component: Tree,
    }
	]
})
