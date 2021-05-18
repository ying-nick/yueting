<template>
	<view>
	<view class="top">
		热门电台
	</view>
	<view class="top1">
		推荐电台
	</view>
	<swiper-item class="item txtbox">
	<!-- 滚动组件 -->
	<scroll-view class="txt_wpap" scroll-y='false'>	
		<view>推荐电台歌词</view>
			<view>推荐电台歌词</view>
			<view >推荐电台歌词</view>
			<view >推荐电台歌词</view>
	</scroll-view>
	</swiper-item>


	<view class="top3">关闭</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},



	}
</script>

<style>
	page {
		left: 0rpx;
		right: 0rpx;
		background-color: #3F536E;
	}

	.top {
		height: 28rpx;
		font-size: 40rpx;
		margin-top: 50rpx;
		line-height: 28rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.top1 {
		height: 100rpx;
		font-size: 35rpx;
		margin-top: 80rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #2C405A;
	
	}
	/* 中间部分歌词 */
	.txtbox{
		width: 100%;
		height: 600rpx;
		font-size: 30rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #2C405A;
	}

	.top3{
		height: 100rpx;
		font-size: 35rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #2C405A;
		
	}
	
</style>
