import Vue from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import axios from './api/index.js'

// 全局样式
import './style/index.scss'

// bpmn-js 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

// bpmn-js 右边工具栏样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

const app = new Vue({
  router,
  render: h => h(App)
})

app.$mount('#app')
