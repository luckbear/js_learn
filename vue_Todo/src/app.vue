<template>
  <div id="todo">
      <div id="cover"></div>
      <Head></Head>
      <todo></todo>
      <foot></foot>
  </div>
</template>

<script>
import Head from './components/header.vue'
import todo from './components/todo.vue'
import foot from './components/footer.vue'
export default {
    components:{
        Head,
        todo,
        foot
    }
}
    
</script>


<style lang="less" scoped>
#todo{
    position: absolute;
}
</style>

