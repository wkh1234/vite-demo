import { mount } from "@vue/test-utils";
console.log(mount);
export default [
  {
    url: "/api/users",
    method: "get",
    response: (req) => {
      return {
        code: 0,
        data: [{ name: 111 }, { name: 222 }],
      };
    },
  },
];
