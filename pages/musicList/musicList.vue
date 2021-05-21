<template>
	<view class="container">
		<view class="songListHead">
			<image :src="picU" class="listImg"></image>
			<text class="listName">{{listName}}</text>
			<text class="songList-head">歌曲列表</text>
		</view>
		<SongList :listSongs="listSongs" />
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {

		onLoad(options) {
			uni.setNavigationBarTitle({
							title:'歌单'
						})
		
			this.getListSongs(options.playListId)

		},
		onPullDownRefresh() {
			 setTimeout(function () {
			            uni.stopPullDownRefresh();
			        }, 1000);
		},
		data() {
			return {
				listSongs: 0,
				picU: '',
				listName: ""
			}
		},
		methods: {
			async getListSongs(id) {
				//console.log(id)
				const res = await myRequestGet('/playlist/detail', {
					id: id
				})
				// console.log(res.privileges)
				this.listSongs = res.privileges

				//console.log(res.playlist.description)
				const picU2 = res.playlist.coverImgUrl
				this.picU = picU2

				const listName2 = res.playlist.name
				this.listName = listName2

			},
		}
	}
</script>

<style>
	
	.songListHead {
		font-size: 44rpx;
		font-weight: 500;
		flex-direction: row;
		padding-left: 30rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 240rpx;	
		position: relative;
	}
	.songList-head{
		top: 300rpx;
	}
	.listImg{
		width: 150rpx;
		height: 150rpx;
	}
	.listName{
		position: absolute;
		font-size: 30rpx;
		top: 30rpx;
		margin-left: 10rpx;
	}
	.songList-head{
		top: 170rpx;
		position: absolute;
		left: 20rpx;
	}

</style>
