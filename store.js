import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginStatus: false,
		user: {},
		cookie:'',
		lists:[]
	},
	mutations: {
		login(state, user) {
			state.loginStatus = true
			state.user = user
			uni.setStorageSync('user', JSON.stringify(user));
		},
		setUser(state,user){
			state.loginStatus = true
			state.user = user
			state.cookie=encodeURIComponent(user.cookie)
		},
		getUserInfo(state){
			state.loginStatus = true
			state.user = JSON.parse(uni.getStorageSync('user'))
			state.cookie=encodeURIComponent(state.user.cookie)
		},
		setList(state,list){
			state.lists=list
		}
		
	}
})
export default store