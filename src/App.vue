<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
// 静态文件加载，解析为绝对地址
import logo from "./assets/logo.png";
import classes from "./app.module.css";
import { computed, getCurrentInstance, ref } from "vue";
// import "plugin-example";

// 获取组件实例
const ins = getCurrentInstance();

function userI18n() {
  const local = ref("zh");
  // 获取资源信息--从插件中
  const i18n = ins.type.i18n;
  const t = (msg) => {
    return computed(() => i18n[local.value][msg]).value;
  };
  return { local, t };
}
// 导出创建的变量和函数
const { local, t } = userI18n();

fetch("api/users")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
  });
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <img alt="Vue logo" :src="logo" />
  <div :class="classes.logo"></div>
  <HelloWorld msg="Hello Vue 3 TypeScript   Vite11" />
  <a href="">11111111</a>
  <input type="text" placeholder="adasdasdasd" />

  <div>
    {{ t("language") }}
  </div>
  <select id="" v-model="local" name="">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t("hello") }}</p>
</template>
<i18n>
{
  "en": {
    "language": "language",
    "hello": "hello,world"
  },
  "zh":{
    "language" :"语言",
    "hello":"你好，世界"
  }
}
</i18n>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
img {
  border: 1px solid #2c3e50;
}
</style>
<style scoped lang="scss">
$link-color: "green";
/* .logo {
  background-image: url(./assets/logo.png);
  height: 200px;
  width: 200px;
} */

a {
  color: $link-color;
}
input {
  color: red;
}
</style>
