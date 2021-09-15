<template>
  <div>setup script</div>
  <div class="">{{ $testGlobal() }}</div>
  <div class="">{{ provideTest() }}</div>
  <div class="">{{ provideTestStr }}</div>
</template>

<script lang='ts'>
// 全演示流程
import { IProductTest } from "@/typings/types";
import { defineComponent, getCurrentInstance, inject, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup(props, context) {
    // 最好不要通过改方式使用全局变量
    // const instance = getCurrentInstance();
    // let { $testGlobal, $testStr} = instance?.proxy;
    // console.log('==========$testGlobal',$testGlobal,$testStr)
    let provideTest = inject<IProductTest>("provideTest") 
    let provideTestStr = inject<string>("provideTestStr", "default");
   provideTest&& provideTest();
    onMounted(() => {
      // throw new Error('onMouted error')
    });
    return {
      provideTest,
      provideTestStr,
    };
  },
  computed: {
    test() {
      return this.$testStr;
    },
  },
});
</script>

<style scoped lang="scss">
</style>