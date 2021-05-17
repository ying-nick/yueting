<template>
	<view class="myinfoView">
		<view class="myinfos">
			<block v-for="(it,index) in item.list" :key="index">
				<view class="myinfoMsg">
					<view class="myinfos">等级：{{it.level}}级</view>
					<view class="myinfos">用户ID：{{it.userId}}</view>
				</view>
				<view class="myinfoMsg">
					<view class="myinfos">总登录天数：{{it.nowLoginCount}}天</view>
					<view class="myinfos">总听歌次数：{{it.nowPlayCount}}次</view>
				</view>
				<view class="myinfoMsg">
					<view class="myinfos">升级需登录：{{it.nextLoginCount}}天</view>
					<view class="myinfos">升级需听歌：{{it.nextPlayCount}}次</view>
				</view>
				<view class="myinfoMsg">
					<view class="myinfos">MV数量：{{it.mvCount}}</view>
					<view class="myinfos">DJ数量：{{it.djRadioCount}}</view>
				</view>
				<view class="myinfoMsg">
					<view class="myinfos">歌单创建数：{{it.createdPlaylistCount}}</view>
					<view class="myinfos">歌单收藏数：{{it.subPlaylistCount}}</view>
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
	.myinfoView {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;

		.myinfos {
			width: 100%;
			display: flex;
			flex-direction: column;
justify-content: flex-start;
			.myinfoMsg {
				flex: 1;
				width: 90%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: 1px solid #EAEAEA;
				padding: 5px 20px;
				font-size: 14px;
				font-family: PingFang SC;
				color: #666666;


				.myinfos {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
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
