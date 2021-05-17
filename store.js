import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginStatus: false,
		user: {},
		cookie:''
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
		}
		
	}
})
export default store