<template>
    <div id="real-app">
        <input type="text" placeholder="接下来要做什么"
        autofocus @keyup.enter="addItem" v-model="itemVal">

        <item :itemList="filterItem"> </item>

        <tabs :activeNum="activeNum" @toggleState="toggleState" @clean="cleanAll"></tabs>
    </div>
</template>

<script>
import item from "./item.vue";
import tabs from "./tabs.vue";

export default {
  data() {
    return {
      id: 0, //每条item的id
      itemVal: "", //文本框中的输入值
      itemList: [], //存储所有item
      filte: "all"
    };
  },
  methods: {
    //按回车把内容添加到itemList中的第一条
    addItem() {
      this.id++;
      this.itemList.unshift({
        id: this.id,
        content: this.itemVal.trim(),
        completed: false
      });
      this.itemVal = "";
    },
    toggleState(state) {
      this.filte = state;
    },
    cleanAll() {
      this.itemList = this.itemList.filter(el => !el.completed);
    }
  },
  computed: {
    activeNum: function() {
      return this.itemList.filter(el => el.completed === false).length;
    },
    filterItem: function() {
      if (this.filte === "all") {
        return this.itemList;
      }
      let completed = this.filte === "completed";
      return this.itemList.filter(el => completed === el.completed);
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
