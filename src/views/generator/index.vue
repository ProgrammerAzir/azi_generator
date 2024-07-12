<template>
  <div class="r">
    <div style="float: right; margin: 10px">
      <a-button type="primary">新增</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <!-- <a-table-column key="action" data-index="action">
        <template #default="c">编辑</template>
      </a-table-column> -->
      <!-- <template #action><span style="color: #1890ff">编辑</span></template> -->
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { TableProps } from "ant-design-vue";
import { h, ref } from "vue";

const dataSource = ref([
  {
    id: 1,
    pagename: "demo",
    action: "123",
  },
]);
const columns = ref<TableProps["columns"]>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "页面名称",
    dataIndex: "pagename",
    key: "pagename",
  },
  {
    title: "操作",
    key: "action",
    customRender: (c) => {
      return h("a", "编辑");
    },
  },
]);
</script>
