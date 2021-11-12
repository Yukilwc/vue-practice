<template>
  <div class="ellipsis-text-container">
    <div class="ellipsis-text-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
// 仅能处理纯文本，如果是富文本，则请封装使用高度控制器,或者对富文本去格式化
// 需要维护截断的文字位置，需要维护是否截断
// 需要提供监听刷新能力
import { defineComponent, onMounted, toRefs } from "vue";

export default defineComponent({
  props: {
    row: {
      type: Number,
      default: 4,
    },
  },
  components: {},
  setup(props, context) {
    onMounted(() => {
      console.log("==========props", { ...toRefs(props) });
    });
    return {};
  },
});
</script>

<style scoped lang="scss">
</style>