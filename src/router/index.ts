import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "../components/Layout/Layout.vue";
import Enum from "../views/enum/index.vue"
import Dict from "../views/dict/index.vue"
import Generator from "../views/generator/index.vue"
import Config from "../views/config/index.vue"
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    meta: {
      title: "supabase代码生成器",
    },
    component: Layout,
    children: [
      {
        path: "enum",
        name: "enum",
        component:Enum,
      },
      {
        path: "dict",
        name: "dict",
        component: Dict,
      },
      {
        path: "generator",
        name: "generator",
        component:Generator,
      },
      {
        path: "config",
        name: "config",
        component: Config,
      },
    ],
  }
];
const router = createRouter({
  history: createWebHistory("/app"),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
