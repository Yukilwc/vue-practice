<template>
  <div>setup script</div>
  <div class="">{{ $testGlobal() }}</div>
</template>

<script lang='ts'>
// 全演示流程
import { defineComponent, getCurrentInstance, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup(props, context) {
    // 最好不要通过改方式使用全局变量
    // const instance = getCurrentInstance();
    // let { $testGlobal, $testStr} = instance?.proxy;
    // console.log('==========$testGlobal',$testGlobal,$testStr)
    onMounted(() => {
      // throw new Error('onMouted error')
    });
    return {};
  },
  computed: {
    test() {
     return this.$testStr
    }
  }
});
</script>

<style scoped lang="scss">
</style>