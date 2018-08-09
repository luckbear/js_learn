<template>
    <div id="real-app">
        <input type="text" placeholder="接下来要做什么"
        autofocus @keyup.enter="addItem">

        <item></item>

        <tabs></tabs>
    </div>
</template>

<script>
import item from './item.vue'
import tabs from './tabs.vue'

export default {
    data(){
        return {

        }
    },
    methods:{
        addItem(){
        }
    },
    components:{
        item,
        tabs
    }
};
</script>


<style lang="less" scoped>
</style>
