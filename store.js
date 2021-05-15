import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginStatus: false,
		user: {}
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
		}
		
	}
})
export default store