<template>
 <view >
 	<view class="musiclist-container" v-for="(item,index) in listSongs"  :key="">
 			<text class="serialNum">{{index+1}}</text>
 			<!-- <image class="songsImg" :src=""></image> -->
 			<text class="songTitle">{{}} </text>
 			<text  class="singer">{{}}</text>
 	</view>
 </view>
</template>

<script>
	export default {
    props:{
		listSongs:{
			type:String
		}
	},
	
		data() {
			return {
				

			}
		},
		methods: {
		

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

