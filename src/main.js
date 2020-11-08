import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueResource)

new Vue({
  render: h => h(App),
}).$mount('#app')
