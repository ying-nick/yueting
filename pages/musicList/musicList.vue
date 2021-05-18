<template>

	<!-- 	<MusicList></MusicList> -->
</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {

		onLoad(options) {
			// console.log(options)
			this.getListSongs(options.playListId) 
		},
		
		data() {
			return {
				listSongs: [

				]

			}
		},
		methods: {
			async getListSongs(id) {
				//console.log(id)
				const res = await myRequestGet('/song/url',{id:id,})
				 console.log(res)
				// this.listSongs = res.data
               // console.log(this.listSongs)
			},

		}

	}
</script>

<style>
</style>
