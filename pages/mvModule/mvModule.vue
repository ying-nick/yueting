<template>
	<view class="mv-container">
		<!-- 导航区 -->
		<view class="mv-nav">
			<view class="mv-navitems" v-for="(item,index) in nav" :class="active===index?'mv-active':''"
				@click="toClick(index)" :data-id="item.id">
				{{item.name}}
			</view>
		</view>
		<!-- 视频区 -->
		<scroll-view class="videoScroll" scroll-y enable-flex="true" enable-back-to-top="true">
			<view class="videoItem" v-for="item in newMV">
				<video class="mvvideo" :poster="item.cover" controls muted="true" object-fit="fill"
					:src="item.url"></video>
				<view class="title"><text>{{item.name}} - {{item.artistName}}</text></view>
				<view class="playCount">
					<text class="iconfont icon-z"></text>
					{{item.playCount}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/req.js'
	export default {
		data() {
			return {
				nav: [{
						name: "推荐MV",
						id: 0
					},
					{
						name: "MV排行榜",
						id: 1
					}
				],
				active: 0,
				newMV: [],
				// rankMV:[],
				videoTime: []
			}
		},
		onLoad() {
			this.getNewMvList()
		},
		methods: {
			// 实习导航栏点击效果及获取相对应的视频列表
			toClick(index) {
				this.active = index
				if (this.active == 1) {
					this.getRankingMV()
				} else {
					this.getNewMvList()
				}
			},
			// 获取排行榜mv
			async getRankingMV() {
				let result = await myRequestGet('/top/mv', {
					limit: 10
				})
				// console.log(result)
				if (result.code == 200) {
					this.newMV = result.data
				}
			},
			// 封装一个获取mv地址的方法
			async addMvUrl(mvs) {
				for (var i = 0; i < mvs.length; i++) {
					let {
						data
					} = await myRequestGet('/mv/url', {
						id: mvs[i].id
					})
					mvs[i].url = data.url
				}
				this.newMV = mvs
			},
			// 获取推荐mv
			async getNewMvList() {
				let result = await myRequestGet('/mv/first', {
					limit: 10
				})
				if (result.code == 200) {
					this.addMvUrl(result.data)
				}
			},
			// 根据id获取相对应的视频并播放
			// async toPlay(e) {
			// 	// console.log(e)
			// 	// console.log(e.currentTarget.dataset.id)
			// 	let videoId = e.currentTarget.dataset.id
			// 	// console.log(videoId)
			// 	let result = await myRequestGet('/mv/url', {
			// 		id: videoId
			// 	})
			// 	// console.log(result)
			// 	if (result.code == 200) {
			// 		this.src = result.data.url
			// 	}
			// 	console.log(this.src)
			//  },
		}
	}
</script>

<style>
	@font-face {
		font-family: "iconfont";
		/* Project id 2286403 */
		src: url('//at.alicdn.com/t/font_2286403_ok1hmuvb0q.woff2?t=1621235668501') format('woff2'),
			url('//at.alicdn.com/t/font_2286403_ok1hmuvb0q.woff?t=1621235668501') format('woff'),
			url('//at.alicdn.com/t/font_2286403_ok1hmuvb0q.ttf?t=1621235668501') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-z:before {
		content: "\e632";
	}

	.mv-container {
		padding: 20rpx;
	}

	/* 导航区 */
	.mv-nav {
		width: 100%;
		display: flex;
		height: 50rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 50rpx;
		color: #666666;
		z-index: 1;
	}

	.mv-navitems {
		margin: 0 80rpx 0 0;
		width: 180rpx;
	}

	.mv-active {
		height: 50rpx;
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 50rpx;
		color: #333333;
		border-bottom: solid 4rpx #22BDE9;
	}

	/* 视频区 */
	.videoScroll {
		height: calc(100vh - 110rpx);
	}

	.videoItem {
		margin: 20rpx 0;
	}

	.mvvideo {
		width: 100%;
		height: 376rpx;
		border-radius: 10rpx;
	}

	.title {
		font-size: 28rpx;
		font-family: PingFang SC;
		color: #666666;
		height: 60rpx;
		line-height: 60rpx;
	}

	.playCount {
		font-size: 22rpx;
		color: #666666;
	}
</style>
