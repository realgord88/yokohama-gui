import Vue from 'vue'
import Panel from './panel.vue'



new Vue({
  el: '#panel',
  render: h => h(Panel),
})
Vue.use(VModal)