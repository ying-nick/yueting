import Vue from 'vue'
import App from './App'

import PlayList from "@/component/PlayList.vue"
import MusicList from "@/component/MusicList.vue"
import SongList from "@/component/SongList.vue"

Vue.component('PlayList',PlayList)
Vue.component('MusicList',MusicList)
Vue.component('SongList',SongList)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
