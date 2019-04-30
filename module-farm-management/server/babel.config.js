module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: true
      }
    }]
  ],
  env: {
    test: {
      plugins: [
        "transform-es2015-modules-commonjs",
        "rewire-es5"
      ]
    }
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src/"]
      }
    ],
    ["@babel/plugin-transform-flow-strip-types"],
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-object-rest-spread",
      {
        useBuiltIns: true
      }
    ]
  ]
}