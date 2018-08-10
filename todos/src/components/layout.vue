<template>
<section class="container">
    <section class="menu">
        <menus></menus>
    </section>    
    <section class="content-container">
        <todo></todo>
    </section>
</section>
</template>


<script>
import menus from './menu.vue';
import todo from './todo.vue'
export default{
    components:{
        menus,
        todo
    }
}
</script>


<style lang="less">
@import "../common/style/layouts.less";
</style>

