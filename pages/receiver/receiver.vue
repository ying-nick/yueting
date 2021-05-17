<template>
	<view class="hotStation">
		<view class="topText">
			<text class="hotTitle">热门电台</text>
		</view>
		<view class="bodyText">
			<view class="">

			</view>
			<view class="stationName">
				<text>当前电台:{{}}</text>
				<text>下个电台:{{}}</text>
			</view>
		</view>
		<view class="bottomImage">
			<text class="iconfont icon-shangyishoushangyige"></text>
			<text class="iconfont icon-kaishi"></text>
			<text class="iconfont icon-xiayigexiayishou"></text>
			<text class="iconfont icon-music"></text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	@import '../../static/icon/iconfontZlq.css';
	
	page{
		
	}
	.hotStation {
		height: 100%;
		width: 100%;
		position: relative;
		
		.topText {
			.hotTitle {
				width: 83px;
				height: 28px;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 28px;
				float: left;
				margin-left: 150px;
				color: #333;
				opacity: 1;
				
			}
		}

		.bodyText {
			.stationName {
				padding-left: 50rpx;
				position: absolute;
				position: fixed;
				bottom:150rpx;
				font-size: 30rpx;
				text{
					display: block;
					
				}
			}
		}

		.bottomImage {
			display: flex;
			padding-left: 150rpx;
			padding-right: 100rpx;
			position: absolute;
			position: fixed;
			bottom:25rpx;
			text{
				font-size: 40px;
				padding-left: 50rpx;
				flex: 1;
			}
		}

	}
</style>
