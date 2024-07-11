<template>
    <div class="container">
        <div class="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div class="columns">
                <div class="layoutItem" v-for="item in layout" :key="item.i">
                    <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
                </div>
            </div>
        </div>
        <button @click="addItem">Add an item dynamically</button>
        <input type="checkbox" v-model="draggable" /> Draggable
        <input type="checkbox" v-model="resizable" /> Resizable
        <grid-layout :layout.sync="layout" :col-num="colNum" :row-height="30" :is-draggable="draggable"
            :is-resizable="resizable" :vertical-compact="true" :use-css-transforms="true">
            <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                <!-- <span class="text">{{ item.i }}</span> -->
                
                <span class="remove" @click="removeItem(item.i)">x</span>
            </grid-item>
            <!-- <div>

            </div> -->
        </grid-layout>
    </div>
</template>
<script setup lang="ts">

import { h, ref } from 'vue';
type GridItemStatus = {
    [key in 'x' | 'y' | 'i' | 'w' | 'h']: number;
};

const layout = ref<GridItemStatus[]>([])
const draggable = ref(true)
const resizable = ref(true)
const colNum = ref(12)
const index = ref(0)

const addItem = function () {
    layout.value.push({
        x: ((layout.value.length+1) * 2) % (colNum.value || 12),
        y: layout.value.length+1 + (colNum.value || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: index.value,
    });
    index.value++;
}
const addButton = ref({
    x: 1, y: 0, w: 2, h: 2, i: 999
})
const removeItem = function (val: number) {
    const index = layout.value.map(item => item.i).indexOf(val);
    layout.value.splice(index, 1);
}
</script>

<style>
.layoutJSON {
    background: #ddd;
    /* border: 1px solid black; */
    margin-top: 10px;
    padding: 10px;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

/*************************************/

.remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
}
.container .vue-grid-item.vue-grid-placeholder{
    background-color: #000000;
    border-radius:10px
}
.vue-grid-layout {
    /* background: #eee; */
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ffffff;
    /* border: 1px solid black; */
}

.vue-grid-item .resizing {
    opacity: 0.9;
}

.vue-grid-item .static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>