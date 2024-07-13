import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const useBaseType = defineStore('useBaseType',()=>{
    const code = ref<string>('')
    const init = async ()=>{
        const res = await axios.get('/api/config/type')
        if(res.data.code){
         code.value = res.data.code
        }
        
     }
     init()
    return {
        code,
        init
    }
})
export default useBaseType