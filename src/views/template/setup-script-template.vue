<template>
  <div>{{ a }}</div>
  <button @click="changeClick">change</button>
  <HelloWorld></HelloWorld>
</template>

<script setup lang='ts'>
import { ref,inject } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
// const HelloWorld  = ()=> import('@/components/HelloWorld.vue')
const a = ref("test");
const changeClick = () => {
  a.value += "t";
};
let provideTest = inject<NProvide.IProductTest>("provideTest");
</script>

<style scoped lang="scss">
</style>