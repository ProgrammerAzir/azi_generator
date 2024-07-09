<template>
    <input ref="file" type="file" webkitdirectory />
    <a-button @click="ok">aa</a-button>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const  file = ref()


function ok(){
    console.dir(file.value);
    console.dir(file.value.value);
    axios.get('/api/config',{
        params:{
             id:'2'
         },
    }).then(res=>{
        console.log(123123);
        
    })
    axios.post('/api/config',{
        data:{
             id:'2'
         },
    }).then(res=>{
        console.log(123123);
        
    })

}

</script>