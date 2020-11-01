import Vue from 'vue'
import App from './App.vue'
import DrawBoard from 'vue2-drawboard'
import 'vue2-drawboard/lib/drawboard.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(DrawBoard);
new Vue({
  render: h => h(App),
}).$mount('#app')
