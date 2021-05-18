<template>
	<scroll-view scroll-y="true" class="scroll-Y" >
		<view class="musiclist-container" v-for="(item,index) in newSongs"  :key="item.id">
				<text class="serialNum">{{index+1}}</text>
				<image class="songsImg" :src="item.album.blurPicUrl"></image>
				  <text class="songTitle">{{item.name}} </text>
				  <text  class="singer">{{item.artists[0].name}}</text>
		</view>
	</scroll-view>
</template>

<script>
	import {
		myRequestGet
	} from '../utils/req.js'
	export default {

		created() {
			this.getNewSongs() //获取推荐歌曲	
		},
		data() {
			return {
				newSongs: [

				]

			}
		},
		methods: {
			async getNewSongs() {
				const res = await myRequestGet('/top/song')
				this.newSongs = res.data
				//console.log(this.newSongs[0].album.blurPicUrl)
			},

		}
	}
</script>

<style>
	.musiclist-container{
		position: relative;
	}
.serialNum{
	position: absolute;
	margin: 40rpx;

}
.songsImg{
	height: 120rpx; 
	width: 120rpx;
	margin-left: 90rpx;
	
}
.songTitle{
		position: absolute;
       margin-left: 30rpx;
	   margin-top: 10rpx;
}
.singer{
	font-size: 20rpx;
	color: #999999;
	position: absolute;
	margin-left: 30rpx;
	margin-top: 70rpx;
}

</style>
