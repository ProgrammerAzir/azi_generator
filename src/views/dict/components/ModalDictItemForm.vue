<template>
  <Modal :title="'编辑'" @ok="ok">
    <template #open="{ onShow }">
      <a @click="onShow">编辑</a>
    </template>
    <template #default>
      <a-form :model="modalFormState">
        <a-form-item label="lable" name="lable">
          <a-input v-model:value="modalFormState.lable"></a-input>
        </a-form-item>
        <a-form-item label="value" name="value">
          <a-input v-model:value="modalFormState.value"></a-input>
        </a-form-item>
        <a-form-item label="color" name="color">
          <a-input v-model:value="modalFormState.color"></a-input>
        </a-form-item>
      </a-form>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "../../../components/Modal.vue";

import { reactive } from "vue";
import { clone } from "radash";
const props = defineProps<{
  modelValue: {
    lable: string;
    value: string;
    color: string;
  };
  defineStatue?: {
    lable: string;
    value: string;
    color: string;
  };
}>();
const emit = defineEmits(["update:modelValue"]);
const modalFormState = reactive<{
  lable: string;
  value: string;
  color: string;
}>({
  lable: props?.defineStatue?.lable || "",
  value: props?.defineStatue?.value || "",
  color: props?.defineStatue?.color || "",
});
function ok(close: Function) {
  emit("update:modelValue", clone(modalFormState));
  close();
}
</script>
