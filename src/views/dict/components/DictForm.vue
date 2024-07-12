<template>
  <a-form
    :model="formState"
    :label-col="{ style: { width: '50px' } }"
    @finish="onFinish"
  >
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name"></a-input>
    </a-form-item>
    <a-form-item label="code" name="code">
      <a-input v-model:value="formState.code"></a-input>
    </a-form-item>
    <a-form-item label="type" name="type">
      <a-input v-model:value="formState.type"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button @click="add" type="primary">新增</a-button>
      <a-table
        :columns="columns"
        :dataSource="formState.list"
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'action'">
            <Modal title="编辑">
              <template #open="{ onShow }"
                ><a @click="onShow">编辑</a></template>
              <template #default>
                <a-form-item label="lable" name="lable">
                  <a-input v-model:value="record.lable"></a-input>
                </a-form-item>
                <a-form-item label="value" name="value">
                  <a-input v-model:value="record.value"></a-input>
                </a-form-item>
                <a-form-item label="color" name="color">
                  <a-input v-model:value="record.color"></a-input>
                </a-form-item>
              </template>
            </Modal>
            <a-divider type="vertical" />
            <a @click="del(index)">删除</a>
          </template>
        </template>
      </a-table>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { TableProps } from "ant-design-vue";
import { onMounted, reactive, ref, watch } from "vue";
import { clone } from "radash";
import Modal from "../../../components/Modal.vue";
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
const formState = reactive<DataItem>({
  name: props?.value?.name || "",
  code: props?.value?.code || "",
  type: props?.value?.type || null,
  description: props?.value?.description,
  list: clone(props?.value?.list) || [],
});

onMounted(() => {
  console.log("gg");
});
function onFinish() {}
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
</script>
