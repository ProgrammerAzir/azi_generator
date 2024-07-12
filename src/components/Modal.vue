<template>
  <slot name="open" :onShow="onShow"></slot>
  <a-modal
    v-if="divshow"
    v-model:open="open"
    title="Basic Modal"
    @ok="() => (open = false)"
    destroyOnClose
    :afterClose="afterClose"
    v-bind="$attrs"
  >
    <slot></slot>
  </a-modal>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
const divshow = ref(false);
const open = ref(false);
const emit = defineEmits(["ok"]);
function onShow() {
  divshow.value = true;
  nextTick(() => {
    open.value = true;
  });
}
watch(open, () => {
  emit("ok", open.value);
});
const afterClose = () => {
  // open.value = true
  divshow.value = open.value;
};
</script>
