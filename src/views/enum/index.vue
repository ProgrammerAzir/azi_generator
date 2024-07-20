<template>
  <div class="r">
    <h2>枚举类型</h2>
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <!-- <a> -->
            {{ record.name }}
          <!-- </a> -->
        </template>        <template v-if="column.key === 'enums'">
          <!-- <a> -->
            {{ record.enums }}
          <!-- </a> -->
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <!-- <a>编辑</a>
            <a-divider type="vertical" /> -->
            <a>生成字典</a>

          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const columns = [
  {
    name: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Enums',
    key: 'enums',
    dataIndex: 'enums',
  },
  {
    title: '操作',
    key: 'action',
  },
];
interface Item{
  name: string;
  enums: any;
}
const dataSource = ref<Item[]>([])
onMounted(async ()=>{
  const res = await axios.get("/api/enums")
  const enums = res.data.enums
  console.log(res);
  
  if(enums){
    console.log(enums);
    let arr = []
    for (const key in enums) {
      
      arr.push({
        name:key,
        enums:enums?.[key]
      })
    }
    dataSource.value=arr
  }
})
</script>
