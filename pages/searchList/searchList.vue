<template>
	<view class="container">
		<view class="listHead">
			<text>搜索结果</text>
		</view>
		<s-music-list :list="searchList" />
	</view>
</template>

<script>
	import sMusicList from '../../component/sMusicList.vue'
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {
		data() {
			return {
				// musicIdList:[],
				searchList: [],
			}
		},
		components: {
			sMusicList
		},
		//接受传递的参数 通过参数 获取数据
		onLoad(options) {
			// console.log(options.key)
			uni.showLoading({
				title:"加载中",
				mask:true,
			})
			if (options.key != undefined) {
				this._getSearch(options.key).then((res) => {
					const value = uni.getStorageSync('songsList');
					if (value) { 
						this.searchList = value
						uni.hideLoading()
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},

		methods: {
			//封装搜索请求
			async _getSearch(data) {
				let re = await myRequestGet('/search', {
					keywords: data
				})
				let songs = re.result.songs
				try {
					uni.setStorageSync('songsList', songs);
				} catch (e) {
					// error
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="less">
	.container {
		.listHead {
			padding: 20rpx 30rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
</style>
