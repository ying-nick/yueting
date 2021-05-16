<template>
	<view class="historyView">
		<view class="historys">
			<block v-for="(it,index) in item.list" :key="index">
				<view class="historySong">
					<view>{{index+1}}</view>
					<image :src='it.song.al.picUrl' class="img"></image>
					<view class="historylists">{{it.song.name}}</view>
					<view class="historylists">{{it.playCount}}次</view>
				</view>
			</block>
		</view>
	
	</view>
</template>

<script>
	export default {
	props:['item'],
	created() {
		// console.log(this.item)
	},
		data(){
			return{
				
			}
		},
		
	}
</script>
<style lang="less" scoped>
	.historyView {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;

		.historys {
			width: 100%;
			display: flex;
			flex-direction: column;

			.historySong {
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

				.historylists {
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
