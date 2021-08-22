module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
