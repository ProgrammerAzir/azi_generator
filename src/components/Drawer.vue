<template>
  <slot name="open" :onShow="onShow"></slot>
  <a-drawer
    v-if="divshow"

    v-model:open="open"
    :width="props.width||700"
    placement="right"
    @after-open-change="afterOpenChange"
    destroyOnClose
    :title="props?.title"
  >
    <slot :onClose="()=>open=false"></slot>
  </a-drawer>
</template>

<script setup lang="ts">
import { DrawerProps } from "ant-design-vue";
import { nextTick, ref, watch } from "vue";
const props = defineProps<DrawerProps>()
const divshow = ref(false);
const open = ref(false);
const emit = defineEmits(["show"]);
function onShow() {
  divshow.value = true;
    open.value = true;
}
watch(open, () => {
  emit("show", open.value);
});
const afterOpenChange = () => {
  // open.value = true
  divshow.value = open.value;
};
</script>
