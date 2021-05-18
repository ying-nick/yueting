<template>
	<view class="container">
		<view class="songListHead">
			<text>歌曲列表</text>
		</view>
		<SongList :listSongs='listSongs' />
	</view>
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
				const res = await myRequestGet('/playlist/detail',{id:id,})
				// console.log(res)
				// 暂时写死
				  this.listSongs = res.privileges[0].id 
               console.log(this.listSongs)
			},

		}

	}
</script>

<style>
	.songListHead{
		font-size: 44rpx;
		font-weight: 500;
		flex-direction: row;
		padding-left: 30rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
