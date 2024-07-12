<template>
  <slot name="open" :onShow="onShow"></slot>
  <a-drawer
    v-bind="$attrs"
    v-if="divshow"
    v-model:open="open"
    title="Basic Drawer"
    placement="right"
    @after-open-change="afterOpenChange"
    destroyOnClose
  >
    <slot></slot>
  </a-drawer>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
const divshow = ref(false);
const open = ref(false);
const emit = defineEmits(["show"]);
function onShow() {
  divshow.value = true;
  nextTick(() => {
    open.value = true;
  });
}
watch(open, () => {
  emit("show", open.value);
});
const afterOpenChange = () => {
  // open.value = true
  divshow.value = open.value;
};
</script>
