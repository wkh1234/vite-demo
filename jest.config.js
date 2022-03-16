module.exports = {
  //   testEnvironment: "jsdom", // 默认JSdom
  //   roots: ["/src", "/packages"], //
  transform: {
    "^.+\\.vue$": "vue-jest", // vue单?件
    "^.+\\jsx?$": "babel-jest",
    "^.+\\tsx?$": "ts-jest",
  },
  //   moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  // testMatch: ['**/__tests__/**/*.spec.js'],
  // 别名
  moduleNameMapper: {
    // "^element-ui(.*)$": "$1",
    // "^main(.*)$": "/src$1",
    "^@/components(.*)$": "<rootDir>/src/components$1",
    // "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/unit/**/*.[jt]s?(x)"],
};
