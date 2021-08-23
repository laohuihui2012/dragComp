// import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = []
// 自动加载路由文件
function autoLoadRoutes() {
    const filemodules = require.context('./modules', true, /\.js$/)
    filemodules.keys().forEach( file => {
        console.log(filemodules(file))
        routes.push(filemodules(file).default)
    });

}
autoLoadRoutes()

const router = new VueRouter({
    routes 
})

// 解决路由跳转源路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router