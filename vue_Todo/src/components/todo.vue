<template>
    <div id="real-app">
        <input type="text" placeholder="接下来要做什么"
        autofocus @keyup.enter="addItem" v-model="itemVal">

        <item :itemList="itemList"> </item>

        <tabs></tabs>
    </div>
</template>

<script>
import item from "./item.vue";
import tabs from "./tabs.vue";

export default {
  data() {
    return {
      id: 0, //每条item的id
      completed: false, //item是否完成
      itemVal: "", //文本框中的输入值
      itemList: [] //存储所有item
    };
  },
  methods: {
    //按回车把内容添加到itemList中的第一条
    addItem() {
      this.id++;
      this.itemList.unshift({
        id: this.id,
        content: this.itemVal.trim(),
        completed: this.completed
      });
      this.itemVal=''
    }
  },
  components: {
    item,
    tabs
  }
};
</script>


<style lang="less" scoped>
</style>
