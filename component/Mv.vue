<template>
	<!-- 上拉加载 -->
	<view class="t-loading-box" v-if="loadingType!=3&&openLoadMore" @click="loadMore">
		<view class="t-line"></view>
		<view class="t-loading-text">
			<view class="loading" v-if="loadingType==2"></view>
			<text>{{loadingText[loadingType]}}</text>
		</view>
		<view class="t-line"></view>
	</view>
</template>

<script>
	export default {
		name: 'get-more',
		props: {
			//上拉状态  0 上拉加载更多 1 上拉加载中 2 不展示组件
			loadingType: {
				type: Number,
				default: 0
			},
			//上拉状态文字
			loadingText: {
				type: Array,
				default: () => {
					return ["上拉加载更多", '加载中...', '']
				}
			},
		},
		data() {
			return {

			};
		},
		methods: {
			//触底加载更多
			loadMore(e) {
				this.$emit("loadMore")
			}
		}
	};
</script>
<style lang="scss">
	.t-loading-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		line-height: 80upx;
		font-size: 26upx;
		width: 100%;
		padding-bottom: 20upx;
		color: #888888;

		.t-loading-text {
			padding: 0 10upx;
			display: flex;
			align-items: center;
			flex-direction: row;
		}

		.loading {
			width: 25upx;
			height: 25upx;
			border: 2.5upx solid #888888;
			border-bottom: #ffffff 2.5upx solid;
			border-radius: 50%;
			margin-right: 15upx;
			animation: grace-rotate360 1200ms infinite linear;
		}

		.t-line {
			margin: 0px;
			border-bottom: 1px solid rgb(212, 212, 212);
			width: 20px;
			transform: scaleY(0.5);
			border-top-color: rgb(212, 212, 212);
			border-right-color: rgb(212, 212, 212);
			border-left-color: rgb(212, 212, 212);
		}
	}
</style>
