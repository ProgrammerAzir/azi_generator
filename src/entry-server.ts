import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores';
import 'ant-design-vue/dist/reset.css';
import './assets/main.css'
import Antd from 'ant-design-vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  app.use(store)
  app.use(Antd)
  return { app,router,store }
}