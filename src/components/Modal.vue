<template>
  <slot name="open" :onShow="onShow"></slot>
  <a-modal
  
  v-if="divshow"
  :title="props?.title"
  v-model:open="open"
    @ok="ok"
    destroyOnClose
    :afterClose="afterClose"
  >
    <slot></slot>
  </a-modal>
</template>

<script setup lang="ts">
import { ModalProps } from "ant-design-vue";
import { nextTick, ref, watch } from "vue";
const props = defineProps<ModalProps &{
  onOk:any
}>()
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
});
function ok(){
  const close=()=>{
    open.value=false
  }
  emit("ok", close);
}
const afterClose = () => {
  divshow.value = open.value;
};
</script>
