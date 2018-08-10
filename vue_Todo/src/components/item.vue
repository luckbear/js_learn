<template>
    <div id="item">
        <div  v-for="item in itemList" :key="item.id">
            <p><span><input type="checkbox" v-model="item.completed">{{item.content}}</span>
            <a @click.prevent="deleteItem(item.id)">删除</a></p>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    deleteItem(id) {
      var index = this.itemList.findIndex(element => {
        return element.id == id;
      });
      this.itemList.splice(index, 1);
    },
  },
  props: ["itemList"]
};
</script>


<style lang="less" scoped>
</style>
