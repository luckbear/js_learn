<template>
    <div id="tab">
        <p><span>剩余{{activeNum}}个</span>&nbsp;
        <span v-for="state in states" :key="state" @click="toggle(state)">{{state}}&nbsp;</span>
        </p>
        <span @click="cleanAll">清除所有已完成</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      states: ["all", "completed", "active"]
    };
  },
  props: ["activeNum"],
  methods:{
      toggle(state){
          console.log('11');
          this.$emit('toggleState',state)
      },
      cleanAll(){
          this.$emit('clean')
      }
  }
};
</script>


<style lang="less" scoped>
</style>
