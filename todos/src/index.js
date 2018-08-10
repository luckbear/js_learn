import Vue from 'vue'

import Layouts from './components/layout.vue'

import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Layouts',
            component: Layouts
        }
    ]
})



import App from './App.vue'


var app = new Vue({
    el: '#app',
    render: v => v(App)
})