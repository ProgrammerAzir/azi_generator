<template>
  <div class="r">
    <Drawer :title="'新增表单'">
      <template #open="{ onShow }">
        <div class="r">
          <a-button type="primary" @click="onShow">新增</a-button>
        </div>
      </template>
      <template #default="{ onClose }">
        <OnlineForm add @save="getOnlineFormDataSource(onClose)"></OnlineForm>
      </template>
    </Drawer>

    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'action'">
          <Drawer :title="'编辑表单'" width="800">
            <template #open="{ onShow }">
                <a @click="onShow">编辑</a>
            </template>
            <template #default="{ onClose }">
            <OnlineForm @save="getOnlineFormDataSource(onClose)"></OnlineForm>
      </template>
          </Drawer>
          <a-divider type="vertical" />
          <a>预览</a>
          <a-divider type="vertical" />
          <a>导出</a>
        </template>
      </template>
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
import Drawer from "../../../components/Drawer.vue";
import OnlineForm from "../compenents/OnlineForm.vue";

const dataSource = ref([
  {
    id: 1,
    tablename: "demo",
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
    title: "表名",
    dataIndex: "tablename",
    key: "tablename",
  },
  {
    title: "操作",
    key: "action",
  },
]);
function getOnlineFormDataSource(onClose: () => void) {
  onClose();
}
</script>
