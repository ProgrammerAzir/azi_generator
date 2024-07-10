import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const prefix = `monaco-editor/esm/vs`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
