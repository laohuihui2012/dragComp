import { createApp } from 'vue'
import app from './App'
import router from './router/index'
import i18n from './locale'



const App = createApp(app).mount('#app')

App.use(i18n)
App.use(router)

