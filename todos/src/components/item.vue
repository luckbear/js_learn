<template>
  <div class="list-item editingClass editing" :class="{checked:item.checked}" v-show="!item.isDeleted"> <!-- 最外层容器-->
    <label class="checkbox"> <!--自定义的多选框-->
      <input type="checkbox" v-model="item.checked" @change="onChange"> <!--item.checked-->
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" v-model="item.text" placeholder='写点什么。。。' @keyup.enter="onChange" :disabled="item.checked||locked">
    <a class="delete-item" v-if="item.checked&&!locked" @click="item.isDeleted=true;onChange()"> <!--删除图标-->
      <span class="icon-trash"></span>
    </a>
  </div>
</template>


<script>
import { editRecord } from "../api/api.js";
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: "hello"
        };
      }
    },
    index: {},
    id: {},
    locked: {},
    init: {}
  },
  methods: {
    onChange() {
      editRecord({
        id: this.id,
        record: this.item,
        index: this.index
      }).then(data => {
        this.init();
        this.$store.dispatch('getTodo');
      });
    }
  }
};
</script>


<style lang="less">
@import "../common/style/list-items.less";
</style>
