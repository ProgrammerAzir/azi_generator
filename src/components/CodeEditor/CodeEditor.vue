<template>
    <div ref="editorContainer" v-bind="$attrs"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';	// 全部导入
import { ref, onMounted, watch } from 'vue';
const props = defineProps<{
    value: string
    language?: string
}>()
const emit = defineEmits(['change','editor'])
let editor: monaco.editor.IStandaloneCodeEditor;
const editorContainer = ref<HTMLDivElement>();

onMounted(() => {
    if (!editorContainer.value) return

    editor = monaco.editor.create(editorContainer.value, {
        value: props.value || '',
        language: props.language || 'typescript',
        // minimap: {
        // enabled: true,
        // },
        // colorDecorators: true,		//颜色装饰器
        // readOnly: false,			//是否开启已读功能
        theme: "vs-dark",			//主题
    });
    // 监听编辑器内容变化
    editor.onDidChangeModelContent((e) => {
        if(editor) emit('change',editor.getValue())
    });
    emit('editor',editor)
});

</script>