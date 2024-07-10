import { defineStore } from "pinia";
import { ref } from "vue";

const useBaseType = defineStore('useBaseType',()=>{
    const code = ref<string>('')
    return {
        code
    }
})
export default useBaseType