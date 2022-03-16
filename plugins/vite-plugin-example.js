export default function pluginExample() {
  // 返回的是插件对象
  return {
    name: "pluginExample", // 名称用于警告和错误提示
    // enforce: "pre",
    // 初始化hooks，只走一次
    options(opts) {
      console.log("options", opts);
    },
    buildStart() {
      console.log("buildStart");
    },
    config(config) {
      console.log("config", config);
      return {};
    },
    configResolved() {
      console.log("configResolved");
    },
    configureServer(server) {
      console.log("configureServer", server);
      // server.app.use((req, res, next) => {
      //   // 可以注册中间件
      // }); // app 就是connect 实例
    },
    // 每次有请求都会执行
    transformIndexHtml(html) {
      console.log("transformIndexHtml");
      return html;
    },
    // id确认
    resolveId(source) {
      if (source === "pluginExample") {
        console.log("resolveId", source);
        return source;
      }
      return null;
    },
    // 加载模块代码
    load(id) {
      if (id === "pluginExample") {
        console.log("load");
        return "export default 'this is pluginExample'"; // 返回 plugin-example 模块源码
      }
      return null; // 如果是其他id，继续处理
    },
    // 转换
    transform(code, id) {
      if (id === "plugin-example") {
        console.log("transform");
      }

      return code;
    },
  };
}
