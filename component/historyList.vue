<template>
	<view class="container" >
		<block v-for="item in list" :key="item">
			<view class="content" @click="goToList(item)" >
				<text>{{item}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {
				hisList: []
			}
		},
		methods: {
			goToList(item){
				uni.navigateTo({
				    url: `/pages/searchList/searchList?key=${item}`
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-wrap: wrap;
		padding-top: 20rpx;

		.content {
			margin: 10rpx 20rpx;
			padding: 10rpx 30rpx;
			border-radius: 100rpx;
			background-color: #F8FAF9;
			// background-color: red;
			color: #333333;
			font-size: 13px;
			font-weight: 500;
		}

	}
</style>
