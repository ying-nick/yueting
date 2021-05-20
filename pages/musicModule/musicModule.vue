<template>
	<view class="container">
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000" :duration="1000">
			<swiper-item v-for="item in swiperImgUrls" :key="item.url">
				<image class="img" :src="item.pic" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="recomSonglist-container">
			<view class="recomSonglist">推荐歌单</view>
		</view>
		<view>
			<PlayList></PlayList>
		</view>
		<view class="recomSonglist">推荐歌曲</view>
	<MusicList></MusicList>
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

				],


			}
		},
		methods: {
			async getBanner() {
				const res = await myRequestGet('/dj/banner')
				this.swiperImgUrls = res.data

				//console.log(this.swiperImgUrls)
			}
		}
	}
</script>

<style>
	.img {
		width: 100%;
		height: 100%;
	}

	.playlist-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10rpx;
		flex-direction: row;
	}

	.recomSonglist-container {
		display: flex;
	}

	.recomSonglist {
		font-size: 44rpx;
		font-weight: 500;
		flex-direction: row;
		padding-left: 30rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
