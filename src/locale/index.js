import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'


const i18nList = {
    'en-US': {},
    'zh-CN': {},
}
// 自动加载国际化文件
function autoLoadRoutes() {
    const filemodules = require.context('@/locale', true, /\.json$/)
    filemodules.keys().forEach( filePatch => {
        console.log(filePatch)
        filePatch = filePatch.replace(/^\.\/(.*)\.\w+$/,"$1")
        console.log(filePatch)
        const value = filemodules(filePatch)
        console.log(value)
        const keyValue = filePatch.splite('/')
        console.log(keyValue,value)
        i18nList[keyValue[0]] = Object.assign(keyValue[0],{
            [keyValue[1]]: value
        })
    });

}
autoLoadRoutes()

// 将本地国际化和element ui国际化合并
const i18n = new VueI18n({
    locale: 'zh', // 这里可以根据环境来设置locale,默认给中文(这里可以取localStorage.getItem('locale')
    en: {
        message: i18nList[process.env.VUE_APP_LOCALELANGE_CHINESE],
        ...enLocale
      },
    zh: {
        message: i18nList[process.env.VUE_APP_LOCALELANGE_ENGLISH],
    ...zhLocale
    }
  })
  

export default i18n

