import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import app from './App.vue'

import router from './router.js'

var app1 = new Vue({
    el: '#container',
    data: {
        msg: 'qqqqq'
    },
    render: c => c(app),
    router
})