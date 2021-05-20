<template>
	<view class="">
		<block v-for="(item,index) in list" :key="index">
			<view class="container" @click="get(item,index)">
				<view class="list_index">{{index+1}}.</view>
				<view class="list_content">
					<view class="list-name">
						{{item.name}}
					</view>
					<view class="list-singer">
						{{item.ar[0].name}}-{{item.al.name?item.al.name:'暂无'}}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {

			}
		},
		created() {
			// console.log(this.list)
		},
		methods: {
			get(item,index) {
				// console.log(item.al.id)
				uni.navigateTo({
					url: `/pages/player/player?id=${item.id}&name=${item.name}
					&src=${encodeURIComponent(JSON.stringify(item.al.picUrl))}
					&alname=${item.al.name}&arname=${item.ar[0].name}
					&albumId=${item.al.id}&index=${index}`
					
					
					
					// url: `/pages/player/player?id=${res.id}&name=${res.name}
					// &src=${encodeURIComponent(JSON.stringify(res.src))}
					// &alname=${res.alname}&arname=${res.arname}&index=${res.idx}`
				});
			}
		}
	}
</script>

<style lang="less">
	.container {
		display: flex;
		padding: 14rpx 20rpx;
		align-items: center;

		// border-bottom: solid 1px rgba(212, 212, 222, 0.4);
		.list_index {
			color: #888;
			font-size: 30rpx;
			width: 60rpx;
		}

		.list_content {
			flex-grow: 1;
			width: 0;

			.list-name {
				font-size: 34rpx;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 10rpx;
			}

			.list-singer {
				font-size: 22rpx;
				color: #888
			}
		}
	}
</style>
