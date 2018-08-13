<template>
<section class="container" :class="{'menu-open':menuOpen}">
    <section class="menu">
        <menus></menus>
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>    
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
    },
    computed:{
        menuOpen(){
            return this.$store.state.menuOpen;
        }
    }
}
</script>


<style lang="less">
@import "../common/style/layouts.less";
</style>

