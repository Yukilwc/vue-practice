<template>
  <div>setup script</div>
  <div class="">{{ $testGlobal() }}</div>
  <div class="">{{ provideTest && provideTest() }}</div>
  <div class="">{{ provideTestStr }}</div>
  <GlobalComp></GlobalComp>
  <div class="" v-test-directive></div>
  <div class="">{{ $t("main1.ceshi1") }}</div>
  <div class="">{{ $t("main2.ceshi2") }}</div>
  <div class="">
    <button @click="switchLang">{{ langText }}</button>
  </div>
  <el-button type='primary'>el按钮</el-button>
</template>

<script lang='ts'>
// 全演示流程
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
} from "vue";
import {omit} from '@/utils/js-tools'
// let {omit}  = require('@/utils/js-tools')

import { useI18n } from "vue-i18n";
import { i18n } from "@/language/index";
import { NProvide } from "@/typings/provide";
import {mapObj} from '@/utils/tools'
import "@/utils/EditableTable";
export default defineComponent({
  components: {},
  setup(props, context) {
    console.log('==========omit',omit)
    let omitRes = omit()
    // 最好不要通过改方式使用全局变量
    // const instance = getCurrentInstance();
    // let { $testGlobal, $testStr} = instance?.proxy;
    // console.log('==========$testGlobal',$testGlobal,$testStr)
    let provideTest = inject<NProvide.IProductTest>("provideTest");
    let provideTestStr = inject<string>("provideTestStr", "default");
    provideTest && provideTest();
    onMounted(() => {
      // throw new Error('onMouted error')
    });
    const { t } = useI18n();
    let langText = computed(() => {
      return t("common.qiehuanyuyan");
    });
    const switchLang = () => {
      if (i18n.global.locale === "zh-CN") {
        i18n.global.locale = "en-US";
      } else {
        i18n.global.locale = "zh-CN";
      }
    };
    return {
      provideTest,
      provideTestStr,
      langText,
      switchLang,
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