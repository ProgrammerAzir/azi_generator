<template>
  <a-form
    :model="formState"
    layout="inline"
    :wrapper-col="{ span: 18 }"
    @finish="onFinish"
  >
    <a-form-item label="名称" name="name" style="margin-bottom: 10px">
      <a-input v-model:value="formState.name"></a-input>
    </a-form-item>
    <a-form-item label="表名" name="tablename" style="margin-bottom: 10px">
      <a-input v-model:value="formState.tablename"></a-input>
    </a-form-item>
    <a-form-item label="描述" name="description" style="margin-bottom: 10px">
      <a-input v-model:value="formState.description"></a-input>
    </a-form-item>
    <div
      style="float: right; margin-right: 300px; margin-right: 200px; bottom: 0"
    >
      <a-button type="primary" html-type="submit" class="save-button"
        >保存</a-button
      >
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { clone } from "radash";
import axios from "axios";
interface DataItem {
  id?: number;
  name: string;
  tablename: string;
  description?: string;
  pagination?:boolean;
  row_search:
      {
        key: string,
        lable: "创建时间",
        type: string
        component: string;
        dict_code?: string;
      }[];
  row: {
    key: string;
    lable: string;
    type: string;
    width: number;
    dict_code?: string;
  }[];
  add_form: {
    key: string;
    lable: string;
    type: string;
    dict_code?: string;
    component: string;
    rules?: string[] | null;
  }[];
  edit_form: {
    key: string;
    lable: string;
    type: string;
    dict_code?: string;
    component: string;
    rules?: string[] | null;
  }[];
  detail: {
    key: string;
    lable: string;
    type: string;
    dict_code?: string;
  }[];
}
const props = defineProps<{
  add?: boolean;
  value?: DataItem;
}>();
const emit = defineEmits(["save"]);
const formState = reactive<DataItem>({
  id: undefined,
  name: "",
  tablename: "",
  description: "",
  pagination: false,
  row_search: [],
  row: [],
  add_form: [],
  edit_form: [],
  detail: []
});

function onFinish() {
  emit("save", formState);
}
</script>
