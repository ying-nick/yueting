import Vue from 'vue'
import App from './App'
<<<<<<< .merge_file_a24488
import store from './store.js'
=======

import PlayList from "@/component/PlayList.vue"
import MusicList from "@/component/MusicList.vue"
import SongList from "@/component/SongList.vue"

Vue.component('PlayList',PlayList)
Vue.component('MusicList',MusicList)
Vue.component('SongList',SongList)

>>>>>>> .merge_file_a10592
Vue.config.productionTip = false

App.mpType = 'app'
Vue.filter('time', function(data) {
	let date = new Date(data)
	let fmt = 'yyyy-MM-dd hh:mm:ss'
	const o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分钟
		's+': date.getSeconds(), // 秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, date.getFullYear())
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
		}
	}
	// console.log(fmt)
	return fmt
})


Vue.filter('total',function(num){
	let re = num;
	if(re>999 && re<10000){
		return re  = '999+'
	}else if(re>10000){
		return re = '1w+'
	}else{
		return re
	}
})
const app = new Vue({
	...App,
	store
})
app.$mount()
