import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex)


const state = {
    todoList: [],
    menuOpen: false
};

const mutations = {

    EDITTODE(state, data) {
        state.todoList = data;
    },
    MENUOPEN(state) {
        state.menuOpen = !state.menuOpen
    }
};

//创建store 实例并导出
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})