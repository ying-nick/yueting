import Vue from 'vue'
import App from './App'
import store from './store.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.filter('time',function(date){
	return '1111'
})
const app = new Vue({
    ...App,
	store
})
app.$mount()
