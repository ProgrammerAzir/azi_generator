<template>
    <div class="r">
        <a-table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.key === 'action'">
                    <Drawer width="700">
                        <template #default>
                            <DictForm :value="record"></DictForm>
                        </template>
                        <template #open="{ onShow }"><a @click="onShow">编辑</a></template>
                    </Drawer>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { TableProps } from 'ant-design-vue';
import axios from 'axios';
import { h, onMounted, ref } from 'vue';
import Drawer from '../../components/Drawer.vue';
import DictForm from './components/DictForm.vue';

const dataSource = ref([]);
const columns = ref<TableProps["columns"]>([
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "code",
        dataIndex: "code",
        key: "code",
    },
    {
        title: "枚举类型",
        dataIndex: "type",
        key: "type",
    },    {
        title: "描述",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "操作",
        key: "action"
    },
]);
onMounted(async () => {
    const res = await axios.get('/api/dict')
    dataSource.value = res.data.dict
    console.log(res);

})
</script>