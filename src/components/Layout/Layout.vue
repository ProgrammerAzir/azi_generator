<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"></div>
      <LayoutMenu></LayoutMenu>
    </a-layout-sider>
    <a-layout style="min-height: 100vh; max-height: 100vh">
      <a-layout-header style="background: #fff; padding: 0">
        <div v-if="basetype.code">
          <img :src="ts_logo" style="height: 30px; margin-left: 20px" />
          <div class="header-right">
            <a-dropdown>
              <a @click.prevent>
                <ProfileOutlined  :class="['icon', 'fade-transform-enter-active']"></ProfileOutlined>
              </a>
              <template #overlay>
                <a-menu
                  :items="generatorMenu"
                  @click="select"
                  v-model:selectedKeys="selectedKeys.generatorMenu"
                >
                </a-menu>
              </template>
            </a-dropdown>

            <a-dropdown>
              <a @click.prevent>
                <SettingOutlined
                  :class="['icon', 'fade-transform-enter-active']"
                />
                <!-- <DownOutlined /> -->
              </a>
              <template #overlay>
                <a-menu
                  :items="configMenu"
                  @click="select"
                  v-model:selectedKeys="selectedKeys.configMenu"
                >
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 16px; overflow: auto">
        <RouterView v-slot="{ Component, route }">
          <!-- <Erro404 v-if="!Component"></Erro404> -->
          <transition name="fade-transform" mode="out-in">
            <div :key="route.name" class="fade-transform">
              <keep-alive>
                <component
                  v-if="!route.meta.link"
                  :is="Component"
                  :key="route.path"
                />
              </keep-alive>
            </div>
          </transition>
        </RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import LayoutMenu from "./LayoutMenu.vue";
import useBaseType from "../../stores/useBaseType";
import ts_logo from "../../assets/ts-logo.png";
import { SettingOutlined,ProfileOutlined } from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const selectedKeys = reactive({
    generatorMenu: [],
    configMenu: [],
});
const configMenu = ref([
  {
    label: "枚举类型",
    key: "/enum",
  },
  {
    label: "字典管理",
    key: "/dict",
  },
  {
    label: "配置",
    key: "/config",
  },
]);
const generatorMenu = ref([
{
    label: "表单开发",
    key: "/generator/form",
  },
]);
const basetype = useBaseType();
const collapsed = ref<boolean>(false);
const select: MenuProps["onSelect"] = ({ item, key, selectedKeys }) => {
  console.log(key);

  if (typeof key == "string") router.push(key);
};
</script>
<style scoped lang="scss">
.header-right {
  float: right;
  padding-left: 30px;
  padding-right: 30px;
}
.icon {
  color: #555555;
  font-size: 20px;
  transition: all 0.5s;
  margin-left: 40px;
  margin-right: 20px;

}
.icon:hover {
  color: #1890ff;
}
.fade-transform {
  transition: all 0.2s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-50px);
  overflow: hidden;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
