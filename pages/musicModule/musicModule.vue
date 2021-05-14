<template>
	<view class="container">
		<view>
			<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in swiperImgUrls" :key="item.url">
					<image class="img" :src="item.pic" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="playlist-container">

		</view>
		<view>
			<!-- 这里是每周推荐 -->
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {

		created() {
			this.getBanner()
			

		},


		data() {
			return {
				swiperImgUrls: [
                     
				]

			}
		},
		methods: {
			async getBanner() {
				const res = await myRequestGet('/dj/banner')
				this.swiperImgUrls=res.data
				
				console.log(this.swiperImgUrls)
			}
		}
	}
</script>

<style>

.img{
  width: 100%;
  height: 100%;
}

.playlist-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10rpx;
  flex-direction: row;
}
</style>
