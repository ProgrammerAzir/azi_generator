import 'ant-design-vue/dist/reset.css';
import { createApp } from "./entry-server";
import router from './router'
import store from './stores';
import Antd from 'ant-design-vue'


const { app } = createApp()
app.mount('#app')
// app.use(router)
// app.use(store)
// app.use(Antd)
