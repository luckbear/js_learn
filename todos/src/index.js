import Vue from 'vue'

import Mock from './moke/index.js'
Mock.start()

import Router from 'vue-router'
Vue.use(Router)
import router from './router'


import App from './App.vue'


var app = new Vue({
    el: '#app',
    render: v => v(App),
    router,
})