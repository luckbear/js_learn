<template>
  <div class="list-item editingClass editing"> <!-- 最外层容器-->
    <label class="checkbox"> <!--自定义的多选框-->
      <input type="checkbox" v-model="item.checked"> <!--item.checked-->
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" v-model="item.text" placeholder='写点什么。。。'>
    <a class="delete-item" v-if="item.checked"> <!--删除图标-->
      <span class="icon-trash"></span>
    </a>
  </div>
</template>


<script>
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
    }
  }
};
</script>


<style lang="less">
@import "../common/style/list-items.less";
</style>
