<template>
  <div class="">进度逻辑</div>
  <div>
    {{ p.data.current }}
  </div>
  <div class="">{{ p.data.status }}</div>
  <div class="">{{ p }}</div>
  <div class="">
    <button @click="startCilck">start!</button>
  </div>
</template>

<script lang='ts'>
// 进度条逻辑
import { timer } from "@/utils/tools";
import { defineComponent, onBeforeMount, onMounted, reactive } from "vue";
import { Progress } from "./Progress";
const doStart = async (p: Progress) => {
  console.log("==========dostart p", p);
  // 启动未知时间的耗时操作
  p.start();
  await timer(500);
  p.end();
};
export default defineComponent({
  components: {},
  setup(props, context) {
    const p = new Progress()
    return {
      p,
      startCilck: (e: Event) => {
        doStart(p);
      },
    };
  },
});
</script>

<style scoped lang="scss">
</style>