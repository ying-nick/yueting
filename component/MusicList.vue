<template>
	<view>
		<view class="musiclist-container" v-for="(item,index) in newSongs"  :key="item.id">
				<text class="serialNum">{{index+1}}</text>
				<image class="songsImg" :src="item.album.blurPicUrl"></image>
				<text class="songTitle">{{item.name}} </text>
				<text  class="singer">{{item.artists[0].name}}</text>
		</view>
	</view>
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
	.musiclist-container::after{
	    position: absolute;
	    right: 50rpx;
	    bottom: 0;
	    left: 50rpx;
	    height: 2rpx;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
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
		font-size: 26rpx;
       margin-left: 30rpx;
	   margin-top: 10rpx;
}
.singer{
	font-size: 20rpx;
	color: #999999;
	position: absolute;
	margin-left: 30rpx;
	margin-top: 74rpx;
}

</style>
