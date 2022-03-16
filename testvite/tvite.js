// 一个node服务器，相当于devServer  基于koa
const Koa = require("koa");
const app = new Koa();
const fs = require("fs");

const path = require("path");

const compilerSfc = require("@vue/compiler-sfc"); // 编译器，得到一个组件配置对象,解析vue文件
const compilerDom = require("@vue/compiler-dom"); // 编译模板

// 返回用户页 index.html
app.use(async (ctx) => {
  const { url, query } = ctx.request;
  if (url === "/") {
    // 首页
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf8");
  } else if (url.endsWith(".js")) {
    // 响应js请求
    const p = path.join(__dirname, url);
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(fs.readFileSync(p, "utf-8"));
  } else if (url.startsWith("/@module/")) {
    // 获取模块名称，就是@module/ 后面的内容
    const moduleName = url.replace("/@module/", "");
    // 在node_module 中找到对应的模块
    const prefix = path.join(__dirname, "../node_modules", moduleName);
    // 要加载文件的地址
    const module = require(prefix + "/package.json").module;
    const filePath = path.join(prefix, module);
    const ret = fs.readFileSync(filePath, "utf-8");
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(ret);
  } else if (url.indexOf(".vue") > -1) {
    // 1.vue文件 => template script
    // 2.template => render 函数

    // 读取vue文件的内容
    const p = path.join(__dirname, url.split("?")[0]);
    const ret = compilerSfc.parse(fs.readFileSync(p, "utf-8")); // 将vue文件中的块进行解析，得到一个ast
    if (!query.type) {
      // 没有type说明是sfc（单文件组件）
      // 解析sfc，处理内部的js
      // console.log(ret);
      // 获取脚本内容
      const scriptContent = ret.descriptor.script.content;
      // 转换默认导出配置对象为变量
      // const script = scriptContent.replace(
      //   "export default ",
      //   "const __script = "
      // );
      // console.log(script);
      ctx.type = "text/javascript";
      ctx.body = `
      ${rewriteImport(scriptContent)}
      // template解析转换为另一个请求单独做
      import { render as  __render } from '${url}?type=template'
      // __script.render = __render
      export default __render
      
      `;
    } else if (query.type === "template") {
      // 2.template => render 函数
      const tpl = ret.descriptor.template.content;
      // 编译为包含render的模块
      const render = compilerDom.compile(tpl, { mode: "module" }).code;
      ctx.type = "text/javascript";
      ctx.body = rewriteImport(render);
    }
  } else if (url.endsWith(".css")) {
    const p = path.join(__dirname, url.split("?")[0]);
    const file = fs.readFileSync(p, "utf-8");
    // css 转化为js代码
    // 利用js创建style标签
    const content = `
    const css = "${file.replace(/\n/g, "")}"
    let link = document.createElement('style')
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `;
    ctx.type = "application/javascript";
    ctx.body = content;
  }
});

// 重写导入，让引用的第三方文件，变成相对地址
function rewriteImport(content) {
  return content.replace(/ from ['|"](.*)['|"]/g, function (s0, s1) {
    // s0 - 匹配字符串
    // s1 - 分组内容
    // 看看是不是相对地址
    if (s1.startsWith(".") || s1.startsWith("../") || s1.startsWith("/")) {
      // 不处理
      return s0;
    } else {
      // 是外部文件
      return ` from '/@module/${s1}'`;
    }
  });
}

app.listen(4002, () => {
  console.log("vite start");
});
