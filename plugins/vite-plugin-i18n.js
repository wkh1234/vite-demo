export default {
  // 将load进来的代码块，进一步加工处理
  transform(code, id) {
    // 将i18n信息写入组件配置
    //  code是块的内容
    //  id是请求的url
    if (/vue&type=i18n/.test(id)) {
      // 是vue文件，并且类型是i18n
      return `export default Comp => {
        Comp.i18n = ${code}
      }`;
    }
    return null;
  },
};
