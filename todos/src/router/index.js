import Router from 'vue-router'

import Layout from '../components/layout.vue'
import todo from '../components/todo.vue'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Layout',
            component: Layout,
            children:[{
                path:'/todo/:id',
                name:'todo',
                component:todo
            }]
        }
    ]
})