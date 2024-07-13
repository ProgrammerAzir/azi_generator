<template>
  <div class="r">
    <h2>配置</h2>
    <a-form
      :model="formState"
      :label-col="{ style: { width: '100px' } }"
      @finish="onFinish"

    >
      <a-form-item label="baseType" name="code">
        <div style="display: flex;flex-flow: row wrap;">
          <CodeEditor
            :style="{ height: '300px', width: '600px',minWidth:'600px',marginRight:'20px',marginBottom:'20px' }"
            :value="formState.code"
            @change="(value) => (formState.code = value)"
            @editor="onReady"
          ></CodeEditor>
          <a-upload-dragger
            style="width: 300px; margin-bottom: 20px;"
            v-model:file-list="fileList"
            name="file"
            :max-count="1"
            :beforeUpload="beforeUpload"
          >
          <template #itemRender>
            <div></div>
          </template>
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">
              点击此处或者拖动文件到此处都可以上传文件
            </p>
            <p class="ant-upload-hint" :style="upLoadInfo.error?{color:'red'}:{}">
              {{upLoadInfo.info}}
            </p>
          </a-upload-dragger>
          <!-- <div style="flex: 1;"></div> -->
        </div>
        <!-- <a-input name="a"> -->

        <!-- </a-input> -->
      </a-form-item>
      <a-form-item>
        <div style="float: right;margin-right: 300px;margin-right: 200px;" >
            <a-button type="primary" html-type="submit" :disabled="isEdit">保存</a-button>
        </div>
    </a-form-item>
    </a-form>
  </div>
  <!-- <input ref="file" type="file" webkitdirectory />
    <a-button @click="ok">aa</a-button> -->
</template>

<script setup lang="ts">
import axios from "axios";
import { h, onMounted, reactive, ref, watch } from "vue";
import CodeEditor from "../../components/CodeEditor/CodeEditor.vue";
import useBaseType from "../../stores/useBaseType";
import { FormProps, Upload, UploadChangeParam, UploadProps } from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import * as monaco from 'monaco-editor';	// 全部导入


let editor : monaco.editor.IStandaloneCodeEditor;
function onReady(e:any){
    editor=e
}
const fileList = ref([]);
const upLoadInfo = reactive({
    info:'',
    error:false
})

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if(!file.name.endsWith('ts')){
        upLoadInfo.error=true
        upLoadInfo.info="请上传.ts格式的文件"
        setTimeout(()=>upLoadInfo.info='',5000)
        return Upload.LIST_IGNORE;
    }
  const reader = new FileReader();
  reader.onload = (e) => {
    Modal.confirm({
    title: '是否确认使用新上传的ts文件?',
    icon: h(ExclamationCircleOutlined),
    content: '这个操作将覆盖旧的ts内容',
    onOk() {
        upLoadInfo.error=false
        upLoadInfo.info=""
        formState.code= String(e.target?.result||'')
        // editor.setValue(formState.code)
        editor?.setValue?.(String(e.target?.result||''))
      return Promise.resolve();
    },
    onCancel() {},
  });
  };
  reader.readAsText(file);
  return false;
};
const baseType = useBaseType();
const formState = reactive({
  code: baseType.code,
});
const isEdit = ref(true)
watch(formState,()=>{
    if(formState.code!=baseType.code){
        isEdit.value=false
    }else{
      isEdit.value = true
    } 
})
const onFinish:FormProps["onFinish"]=(value)=> {
    baseType.code = formState.code
    isEdit.value=true
    axios.post('/api/config/type',{
        code:formState.code
    })
    //保存起来
}
watch(()=>baseType.code,()=>{
  formState.code = baseType.code
    editor?.setValue?.(baseType.code)
})

</script>
