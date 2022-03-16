import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { viteMockServe } from "vite-plugin-mock";
import i18n from "./plugins/vite-plugin-i18n.js";
import pluginExample from "./plugins/vite-plugin-example.js";
import viteMockServe from "./plugins/vite-plugin-mock.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({}), i18n, pluginExample()],
});
