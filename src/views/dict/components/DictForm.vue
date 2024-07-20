<template>
  <a-form
    style="height: 100%"
    :model="formState"
    :label-col="{ style: { width: '50px' } }"
    @finish="onFinish"
  >
    <a-form-item label="名称" name="name" :rules="[{required: true,message:'name is required!'}]">
      <a-input v-model:value="formState.name"></a-input>
    </a-form-item>
    <a-form-item label="code" name="code" :rules="[{required: true,message:'code is required!'}]">
      <a-input v-model:value="formState.code"></a-input>
    </a-form-item>
    <a-form-item label="type" name="type">
      <a-input v-model:value="formState.type"></a-input>
    </a-form-item>
    <a-form-item label="描述" name="description">
      <a-input v-model:value="formState.description"></a-input>
    </a-form-item>
    <a-button @click="add" type="primary">新增</a-button>
    <a-table
      :columns="columns"
      :dataSource="formState.list"
      :pagination="false"
    >
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.key === 'lable'" >
          <span v-html="record.lable"></span>
        </template>
        <template v-if="column.key === 'action'">
          <ModalDictItemForm
            :define-statue="record"
            v-model:modelValue="formState.list[index]"
          ></ModalDictItemForm>
          <a-divider type="vertical" />
          <a @click="del(index)">删除</a>
        </template>
      </template>
    </a-table>
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
import { TableProps } from "ant-design-vue";
import { reactive, ref } from "vue";
import { clone } from "radash";
import ModalDictItemForm from "./ModalDictItemForm.vue";
import axios from "axios";
interface DataItem {
  name: string;
  code: string;
  type?: string | null;
  description?: string;
  list: {
    lable: string;
    value: string;
    color: string;
  }[];
}
const props = defineProps<{
  add?: boolean;
  value?: DataItem;
}>();
const emit = defineEmits(["save"]);
const formState = reactive<DataItem>({
  name: props?.value?.name || "",
  code: props?.value?.code || "",
  type: props?.value?.type || null,
  description: props?.value?.description,
  list: clone(props?.value?.list) || [],
});

const columns = ref<TableProps["columns"]>([
  {
    title: "名称",
    dataIndex: "lable",
    key: "lable",
  },
  {
    title: "值",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "颜色",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "操作",
    key: "action",
  },
]);
function add() {
  formState.list.push({
    lable: "",
    value: "",
    color: "",
  });
}
function del(index: number) {
  formState.list.splice(index, 1);
}
async function onFinish() {
  if (props.add) {
    await axios.post("/api/dict", {
    add: formState,
  });
    emit("save");
    return;
  }
  await axios.post("/api/dict", {
    edit: formState,
  });
  emit("save");
}
</script>
<style scoped>
.save-button {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 80%;
}
</style>
