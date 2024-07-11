import { createSSRApp, createApp as createVueApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores';
import 'ant-design-vue/dist/reset.css';
import './assets/main.css'
import Antd from 'ant-design-vue'
import './userWorker';
import VueGridLayout from 'vue-grid-layout'//引入layout

export function createApp() {
  const app = createVueApp(App)
  app.use(router)
  app.use(store)
  app.use(Antd)
  app.use(VueGridLayout)
  return { app,router,store }
}