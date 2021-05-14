<template>
	<view class="container">
		<view>
			<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in swiperImgUrls" :key="item.url">
					<image class="img" :src="item.url" mode="widthFix"></image>
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
                     { url:"res.data[0].pic",},
					 { url:"res.data[1].pic",},
					 { url:"res.data[2].pic",},
				]

			}
		},
		methods: {
			async getBanner() {
				const res = await myRequestGet('/dj/banner')
				console.log(res.data[0].pic)
			}
		}
	}
</script>

<style>

</style>
