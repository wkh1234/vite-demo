import path from "path";

let mockRouteMap = {};

function matchRoute(req) {
  let url = req.url;
  let method = req.method.toLowerCase();
  let routeList = mockRouteMap[method];

  return routeList && routeList.find((item) => item.path === url);
}

// 默认导出的插件工厂函数
export default function (options = {}) {
  // 获取mock文件入口，默认是index
  options.entry = options.entry || "./mock/index.js";
  // 转换为绝对路径
  if (!path.isAbsolute(options.entry)) {
    options.entry = path.resolve(process.cwd(), options.entry);
  }
  // 返回的插件
  return {
    configureServer: function ({ app }) {
      // 定义路由表
      const mockObj = require(options.entry);
      // 创建路由表
      createRoute(mockObj);

      // 定义中间件：路由匹配
      const middleware = (req, res, next) => {
        // 1.执行匹配过程
        let route = matchRoute(req);
        //2. 存在匹配，是一个mock请求
        if (route) {
          console.log("mock req", route.method, route.path);
          res.send = send;
          route.handler(req, res);
        } else {
          next();
        }
      };

      // 最终目标，给app注册一个中间件
      app.use(middleware);
    },
  };
}

function createRoute(mockConfList) {
  mockConfList.forEach((mockConf) => {
    let method = mockConf.method || "get";
    let path = mockConf.url;
    let handler = mockConf.response;
    // 路由对象
    let route = { path, method: method.toLowerCase(), handler };
    if (!mockRouteMap[method]) {
      mockRouteMap[method] = [];
    }
    console.log("create mock api");
    // 存入映射对象中
    mockRouteMap[method].push(route);
  });
}

// 实现一个send方法
function send(body) {
  let chunk = JSON.stringify(body);
  if (chunk) {
    chunk = Buffer.from(chunk, "utf-8");
    this.setHeader("Content-Length", chunk.length);
  }
  this.setHeader("Content-Type", "application/json");
  this.statusCode = 200;
  this.end(chunk, "utf8");
}
