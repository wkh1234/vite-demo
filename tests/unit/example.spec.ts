const mount = require("@vue/test-utils"); // 创建一个包含被挂载和渲染的 Vue 组件的 Wrapper
const HelloWorld = require("../../src/components/HelloWorld.vue");

describe("Alert", () => {
  // describe 代表一个作用域

  test("create", () => {
    // ‘creat’ 这里只是一个自定义的描述性文字
    const wrapper = mount.shallowMount(HelloWorld, {
      // 通过 mount 生成了一个包裹器，包括了一个挂载组件或 vnode，以及测试该组件或 vnode 的方法
      propsData: {
        msg: "title",
      },
      // 可以带参数，这里我通过 propsData 传递了接口数据
    });
    console.log(wrapper.text(), 111111111);
    expect(wrapper.text()).toEqual("title");
  });
});
