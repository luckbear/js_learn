<template>
<div class="list-todos">
    <a @click="goList(item.id)" class="list-todo activeListClass list" 
    :class="{'active':item.id===todoId}" v-for="(item,index) in todoList" :key="index"> 
        <span class="icon-lock" v-if="item.locked"></span>
        <span class="count-list" v-if="item.count>0">{{item.count}}</span>
        {{item.title}}
    </a>

    <a class="link-list-new" @click="addTodoList">
        <span class="icon-plus"></span>
        新增
    </a>
</div>
</template>


<script>
import { getTodoList, addTodo } from "../api/api.js";
export default {
  data() {
    return {
      todoId: "", //默认选中的id
      todoNum: 0 //todo的数量
    };
  },
  computed: {
    todoList() {
      const num = this.$store.getters.getTodoList.length;
      if (num < this.todoNum) {
        this.goList(this.$store.getters.getTodoList[0].id);
      }
      this.todoNum = num;
      return this.$store.getters.getTodoList;
    }
  },
  created() {
    this.$store.dispatch("getTodo").then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  methods: {
    //点击菜单替换选中id
    goList(id) {
      this.todoId = id;
    },
    //点击新建按钮
    addTodoList() {
      addTodo({}).then(data => {
        // 插入新的一条后再请求一次
        this.$store.dispatch("getTodo").then(() => {
          this.$nextTick(() => {
            this.goList(this.todoList[this.todoList.length - 1].id);
          });
        });
      });
    }
  },
  watch: {
    //监听用户点击的todoId
    todoId: function(id) {
      this.$router.push({ name: "todo", params: { id } });
    }
  }
};
</script>


<style lang="less">
@import "../common/style/menu.less";
</style>
