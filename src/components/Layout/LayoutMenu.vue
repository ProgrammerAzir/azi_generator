<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    :items="menuTree"
    @select="select"
  >
  </a-menu>
</template>

<script setup lang="ts">
import { ref, h, watch } from "vue";
import type {MenuProps} from 'ant-design-vue/es/menu/src/Menu'

import {
  ReadOutlined,
  ProfileOutlined,
  ToolOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()

const route = useRoute()

const selectedKeys = ref<string[]>([""]);

const menuTree = ref([
  {
    label: "枚举类型",
    key: "/enum",
    icon: () => h(ProfileOutlined),
  },
  {
    label: "字典管理",
    icon: () => h(ReadOutlined),
    key: "/dict",
  },
  {
    label: "低代码编辑器",
    icon: () => h(ToolOutlined),
    key: "/generator",
  },
  {
    label: "配置",
    icon: () => h(SettingOutlined),
    key: "/config",
  },
]);
const select:MenuProps['onSelect'] = ({ item, key, selectedKeys })=>{
  if(typeof key =='string')
  router.push(key)
}
watch(()=>route.path,()=>{  

  const path = menuTree.value.find(item=>{
    return route.path.indexOf(item.key)>-1
  })
  console.log(path?.key);
  
  selectedKeys.value=[path?.key||'']
},{immediate:true})
</script>
