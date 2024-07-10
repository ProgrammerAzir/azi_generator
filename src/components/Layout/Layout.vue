<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo"></div>
            <LayoutMenu></LayoutMenu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" >
                <div  v-if="basetype.code">
                <img :src="ts_logo" style="height: 30px;margin-left: 20px;"></div>
            
            </a-layout-header>
            <a-layout-content style="margin-left: 16px;margin-top: 16px;margin-right: 16px;">
                <RouterView v-slot="{ Component, route }">
                    <!-- <Erro404 v-if="!Component"></Erro404> -->
                    <transition name="fade-transform" mode="out-in">
                        <div :key="route.name">
                            <keep-alive>
                                <component v-if="!route.meta.link" :is="Component" :key="route.path" />
                            </keep-alive>
                        </div>
                    </transition>
                </RouterView>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutMenu from './LayoutMenu.vue';
import useBaseType from "../../stores/useBaseType";
import ts_logo from "../../assets/ts-logo.png"
const basetype = useBaseType()
const collapsed = ref<boolean>(false);
</script>
<style scoped lang="scss">
.logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}
</style>