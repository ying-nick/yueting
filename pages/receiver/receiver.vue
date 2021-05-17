<template>
	<view class="hotStation">
		<view class="topText">
			<text class="hotTitle">热门电台</text>
		</view>
		<view class="bodyText">
			<view class="">
				
			</view>
			<view class="stationName">
				<text>当前电台{{}}</text>
				<text>下一个电台{{}}</text>
			</view>
		</view>
		<view class="bottomImage">
			<image src="./recicon/pre.png" mode="" title="上一首"></image>
			<image src="./recicon/start.png" mode="" title="开始"></image>
			<image src="./recicon/next.png" mode="" title="下一首"></image>
			<image src="./recicon/reclist.png" mode="" title="热门电台"></image>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.hotStation{
		
		.topText{
			.hotTitle{
				width: 83px;
				height: 28px;
				font-size: 20px;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 28px;
				color: #ccc;
				letter-spacing: 50px;
				opacity: 1;
			}
		}
		.bodyText{
			.stationName{
				
			}
		}
		.bottomImage{
			
		}
		
	}
</style>
