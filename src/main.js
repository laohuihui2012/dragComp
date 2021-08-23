import { createApp } from 'vue'
import app from './App'
import router from './router/index'
import i18n from './locale'
import ElementUI from '@/utils/elementLoad.js'



const App = createApp(app).mount('#app')

App.use(ElementUI,{i18n})
App.use(router)

