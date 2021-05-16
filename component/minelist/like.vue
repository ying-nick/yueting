<template>
	<view class="likeView">
		<view class="likes">
			<block v-for="(it,index) in item.list" :key="index">
				<view class="likeSong">
					<view>{{index+1}}</view>
					<image :src='it.al.picUrl' class="img"></image>
					<view class="likelists">{{it.name}}</view>
					<view class="likelists">{{it.ar[0].name}}</view>
				</view>
			</block>
		</view>

	</view>

</template>

<script>
	export default {
		props: ['item'],
		created() {
			console.log(this.item)
		},
		data() {
			return {

			}
		},

	}
</script>

<style lang="less" scoped>
	.likeView {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;

		.likes {
			width: 100%;
			display: flex;
			flex-direction: column;

			.likeSong {
				flex: 1;
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: 1px solid #EAEAEA;
				padding: 10px 20px;
				font-size: 14px;
				font-family: PingFang SC;
				color: #666666;

				.img {
					width: 80px;
					height: 80px;
				}

				.likelists {
					width: 25%;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;

				}
			}

		}
	}
</style>
