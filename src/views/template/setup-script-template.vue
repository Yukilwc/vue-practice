<template>
  <div>{{ a }}</div>
  <button @click="changeClick">change</button>
  <HelloWorld></HelloWorld>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import HelloWorld from '@/components/HelloWorld.vue'
// const HelloWorld  = ()=> import('@/components/HelloWorld.vue')
const a = ref("test");
const changeClick = () => {
  a.value += "t";
};
</script>

<style scoped lang="scss">
</style>