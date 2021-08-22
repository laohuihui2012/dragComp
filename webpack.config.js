const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}


const isProduction = process.env.NODE_ENV === 'production'
 
module.exports = {
    publicPath: process.env.VUE_APP_PUBLICPATH,
    outputDir: process.env.VUE_APP_OUTPUT,
    // lintOnSave: false, // 关闭eslint
    productionSourceMap: isProduction ? false : true,
    // 调整 webpack 配置，configureWebpack 提供的对象会被 webpack-merge 合并入最终的 webpack 配置
    configureWebpack:config => {
    //    const plugins = [
    //         // new MyAwesomeWebpackPlugin()
    //     ]
        // 取消webpack警告的性能提示
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 1000000 * 500,
            //生成文件的最大体积
            maxAssetSize: 1000000 * 1000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }

    },
    chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('./src'))
        .set('@api', resolve('./src/api'))
        .set('@com', resolve('./src/components'))
        .set('@styles', resolve('./src/styles'))
        .set('@pages', resolve('./src/pages'))

    // 链式操作添加loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)  //文件路径
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      .use('other-loader')
        .loader('other-loader')
        .end()

        // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
        config.optimization.delete('splitChunks')
    },

    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
          additionalData: `@import "~@/styles/variables.sass"`
        },
      }
    },

    devServer: {
        open: false, // 自动启动浏览器
        host: 'localhost', // localhost
        port: 8080, // 端口号
        https: false,
        hotOnly: false, // 热更新
        proxy: {
            '^/sso': {
                target: 'http://localhost:8080/', // 重写路径
                ws: true,   //开启WebSocket
                secure: false,      // 如果是https接口，需要配置这个参数
                changeOrigin: true
            }
        }
    }
  }