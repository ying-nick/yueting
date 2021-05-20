<template>
	<scroll-view scroll-y="true" class="scroll-Y" style="height:600rpx;">
		<view class="playlist-container" >
			<view class="playlist-img" v-for="item in playList" :key="item.id" @click="goToMusiclist" :data-id='item.id'>
				<image :src="item.picUrl" style="height: 210rpx; width: 100%;" >
				<text class="playlist-playcount iconfont icon-bofang">{{item.playCount | newNums(2)}}</text>
				<view class="playlist-name">{{item.name}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {myRequestGet} from '../utils/req.js'
	export default {
		

		created() {
			this.getPersonalized()
		},
		filters:{
			newNums:function(num,point){
				   let numStr = num.toString().split('.')[0]
				      if (numStr.length < 6) {
				        return numStr
				      } else if (numStr.length >= 6 && numStr.length <= 8) {
				        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
				        return parseFloat(parseInt(num / 10000) + "." + decimal) + "万"
				      } else if (numStr.length > 8) {
				        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
				        return parseFloat(parseInt(num / 100000000) + "." + decimal) + "亿"
				      }
			}
		},
	
		
		data() {
			return {
			
				playList: [

				],
			
			}
		},
		methods: {
			    goToMusiclist(e) {
					console.log(e)
			      uni.navigateTo({
			        url: `/pages/musicList/musicList?playListId=${e.currentTarget.dataset.id}`
					
			      })
	
			    },
			async getPersonalized() {
				const res = await myRequestGet('/personalized')
				this.playList = res.result
		        console.log(this.playList)
		
			},
		},			
	}
</script>

<style>
	@font-face {
		font-family: "iconfont";
		/* Project id 2552167 */
		src: url('//at.alicdn.com/t/font_2552167_viff2ue0sj.woff2?t=1621219620868') format('woff2'),
			url('//at.alicdn.com/t/font_2552167_viff2ue0sj.woff?t=1621219620868') format('woff'),
			url('//at.alicdn.com/t/font_2552167_viff2ue0sj.ttf?t=1621219620868') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-bofang:before {
		content: "\e77e";
	}

	.playlist-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10rpx;
		flex-direction: row;
	}
	.playlist-img {
		width: 200rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.playlist-playcount {
	/* 	background-color: #808080; */
		border-radius: 56rpx;
		font-size: 24rpx;
		color: #fff;
		text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
		position: absolute;
		top: 10rpx;
		right: 10rpx
	}
	.playlist-name {
		font-size: 26rpx;
		line-height: 1.2;
		padding: 2px 0 0 6px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 16rpx;
	}
</style>
