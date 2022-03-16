module.exports = [
  {
    url: "/api/users",
    method: "get",
    response: (req, res) => {
      return res.send({
        code: 1,
        data: [{ name: 111 }, { name: 222 }],
      });
    },
  },
];
