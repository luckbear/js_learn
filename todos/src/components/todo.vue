<template>
<div class="page list-show">
 <nav><!--容器上半部分-->
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group-right">
          <a class="nav-item" @click="isUpdate=false">
            <span class="icon-close"></span>
          </a>
        </div>
      </div>

      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate"> <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>

      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate=true">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count||0}}</span><!-- 数目-->
      </h1>

      <div class="nav-group right" v-show="!isUpdate"><!-- 右边的删除，锁定图标容器-->
        <div class="options-web"> 
          <a class=" nav-item" @click="onLock"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"><!-- 删除图标-->
            <span class="icon-trash" @click="deleteTodo">
            </span>
          </a>
        </div>
      </div>
  
      <div class=" form todo-new input-symbol"> <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
         <input type="text" v-model="text" placeholder='请输入' @keyup.enter="addRec" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>

    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div v-for="(item,index) in items" :key="item.text">
          <item :item="item" :index="index" :id="todo.id" :locked="todo.locked" :init="init"></item>
      </div>

    </div>
</div>
</template>


<script>
import item from "./item.vue";
import { getTodo, addRecord } from "../api/api.js";
import {editTodo} from '../api/api.js'
export default {
  data() {
    return {
      todo: {},
      items: [], //代办单项列表],
      text: "", //新增代办单项绑定的值
      isUpdate: false
    };
  },
  watch: {
    "$route.params.id"() {
      this.init();
    }
  },
  created() {
    // ;
    // this.init();
  },

  methods: {
    addRec() {
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = "";
        this.init();
         this.$store.dispatch('getTodo');
      });
    },
    init() {    
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        console.log(res);
        
        this.todo = res.data.todo;
        this.items = res.data.todo.record;
      });
    },
    updateTodo() {
      let _this = this;
      editTodo({
        todo: this.todo
      }).then(data => {              
        this.$store.dispatch("getTodo");
      });
    },
    updateTitle() {
      this.updateTodo();
      this.isUpdate = false;
    },
    deleteTodo() {
      this.todo.isDeleted = true;
      this.updateTodo();
    },
    onLock() {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    }
  },
  components: {
    item
  }
};
</script>


<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
