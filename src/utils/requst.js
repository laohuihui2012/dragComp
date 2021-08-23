
import axios from "axios"
import { Notification } from 'element-ui'

// const CancelToken = axios.CancelToken

const service = axios.create({
    baseURL:process.env.BASE_API,
    timeout:5000
})

 //添加请求拦截器
 service.interceptors.request.use(function(config){
    // if(store.getters.token){
    //     config.headers['TOKEN']=getCookie('TOKEN')
    // }
    return config
},function(error){
    return Promise.reject(error)
})

//添加响应拦截器
service.interceptors.response.use(function(response){
    /**
    * 下面的注释为通过在response里，自定义code来标示请求状态
    * 当code返回如下情况则说明权限有问题，登出并返回到登录页
    * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
    */
 },function(error){
     Notification({
         Message:error.message,
         type:'error',
         duration:5*1000 
     })
     return Promise.reject(error)
 })

 export default service