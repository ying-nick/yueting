<template>
	<view class="mv-container">
		<!-- 导航区 -->
		<view class="mv-nav">
			<view class="mv-recommend">推荐MV</view>
			<view class="mv-ranking">MV排行榜</view>
		</view>
		<!-- 视频区 -->
		<view class="mv-items">

		</view>
	</view>
</template>

<script>
	import req from '../../utils/req.js'
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.mv-container {
		padding: 20rpx;
	}
	/* 导航区 */
	.mv-nav {
		width: 50%;
		display: flex;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: #666666;
	}

	.mv-recommend {
		flex: 1;
	}
	.mv-active{
		height: 50rpx;
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 25px;
		color: #333333;
	}
	/* 视频区 */
</style>
