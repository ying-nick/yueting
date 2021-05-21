<template>
	<view class="mv-container">
		<!-- 导航区 -->
		<view class="mv-nav">
			<view class="mv-navitems" v-for="(item,index) in nav" :key="item.id" :class="active===index?'mv-active':''"
				@click="toClick(index)" :data-id="item.id">
				{{item.name}}
			</view>
		</view>
		<!-- 视频区 -->

		<!-- 推荐区 -->
		<scroll-view class="videoScroll" scroll-y refresher-enabled="true" @refresherrefresh="toRefresh"
			:refresher-triggered="isTriggered" enable-flex="true" enable-back-to-top="true" v-show="seen"
			@scrolltolower="toGetMore('/mv/first',newMV)">
			<view class="videoItem" v-for="item in newMV" :key="item.id">
				<video class="mvvideo" :poster="item.cover" controls :muted="isMuted" object-fit="fill" :src="item.url"
					v-if="videoId === item.id" @click="toPlay(item.id)" :data-id="item.id"></video>
				<image :src="item.cover" class="mvvideo" @click="toPlay(item.id)" :data-id="item.id" :ref='item.id'
					v-else></image>
				<view class="title"><text>{{item.name}} - {{item.artistName}}</text></view>
				<view class="playCount">
					<text class="iconfont icon-z"></text>
					{{item.playCount}}
				</view>
			</view>
			<uni-load-more :status="'loading'"></uni-load-more>
			<!-- <uni-load-more v-if="flag" :status="more"></uni-load-more> -->
		</scroll-view>
		<!-- 排行榜 -->
		<scroll-view class="mvScroll" refresher-enabled="true" @refresherrefresh="toRefresh"
			@scrolltolower="toGetMore('/top/mv',rankingMV)" :refresher-triggered="isTriggered" scroll-y
			enable-flex="true" enable-back-to-top="true" v-show="hide">
			<view class="mvItem" v-for="(item,index) in rankingMV">
				<view class="mv-center"><text class="mv-no">{{index+1}}.</text></view>
				<video class="video2" :poster="item.cover" object-fit="fill" :muted="isMuted" :src="item.url"
					@click="toPlay(item.id)" :data-id="item.id"></video>
				<view class="mv-txt">
					<text class="mv-name">{{item.name}}</text>
					<text class="mv-artist">{{item.artistName}}</text>
				</view>
			</view>
			<uni-load-more :status="'loading'"></uni-load-more>
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
				rankingMV: [],
				// videoTime: [],
				seen: true,
				videoId: "",
				isTriggered: false,
				// videoUpdataTime: [],
				// isBig: false,
				isMuted: true,
				hide: false
			}
		},
		onLoad() {
			this.getNewMvList()
			this.getRankingMV()
		},
		methods: {
			// 实现导航栏点击效果及获取相对应的视频列表
			toClick(index) {
				this.active = index
				if (this.active == 1) {
					this.seen = false
					this.hide = true
				} else {
					this.hide = false
					this.seen = true
				}
			},
			// 封装一个获取mv地址的方法（用循环遍历的方法，将根据id获取来的视频地址和渲染到页面上的video标签的src一一对应上。
			// 只能用普通for循环，在获取视频列表的函数中用forEach或者map会报错。）
			async addMvUrl(mvs) {
				for (let i = 0; i < mvs.length; i++) {
					myRequestGet('/mv/url', {
						id: mvs[i].id
					}).then(({
						data
					}) => {
						// console.log(i)
						mvs[i].url = data.url
					})
				}
				return mvs
			},
			// 获取排行榜mv视频列表
			async getRankingMV() {
				try {
					let result = await myRequestGet('/top/mv', {
						limit: 10
					})
					if (result.code == 200) {
						this.addMvUrl(result.data)
							.then((res) => {
								this.rankingMV = res
							})
					}
				} catch (e) {
					console.log("8888888888888888888888")
				}

			},
			// 获取推荐mv列表
			async getNewMvList() {
				try {
					let result = await myRequestGet('/mv/first', {
						limit: 10
					})
					if (result.code == 200) {
						this.addMvUrl(result.data).then((res) => {
							// console.log(res)
							this.newMV = res
						})
					}
				} catch (e) {
					console.log(e, "55555555555555555555555")
				}
			},
			// 点击播放，关闭其他视频
			toPlay(e) {
				// console.log(e)
				// 关闭上一个播放的视频
				// this.videoId !== e && this.videoContext && this.videoContext.stop();
				this.isBig = true
				this.isMuted = false
				this.videoId = e
				this.videoContext = uni.createVideoContext(e.toString());
				// uni.navigateTo({
				// 	url: "/pages/mvPlay/mvPlay?id="+e
				// })
				// console.log(this.videoUpdataTime)
				// let videoUpdataTime = this.videoUpdataTime
				// console.log(videoUpdataTime)

				// let videoItem = videoUpdataTime.find(item => item.id === e)
				// console.log(videoItem)
				// if (videoItem !== undefined) {
				// console.log('45',videoItem.currentTime)
				// this.videoContext.seek(videoItem.currentTime)
				//}
				this.videoContext.play() //有这步就不用关闭上一个播放的视频了
				this.videoContext.requestFullScreen()
			},
			// 自定义下拉刷新
			toRefresh() {
				this.isTriggered = true;
				this.getRankingMV().then(() => {
					setTimeout(() => {
						this.isTriggered = false;
					}, 2000)

				})
			},
			// 自定义上拉加载
			async toGetMore(url, dataList) {
				// clearTimeout(timer)
				let vItem = dataList
				let result = await myRequestGet(url)
				// console.log(result)
				let videoList = result.data.slice(10, 20)
				let timer = setTimeout(() => {
					vItem.push(...videoList)
				}, 500)
			}
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

	/* 全屏视频 */
	/* .isBig {
		height: 100%;
		width: 100%;
		z-index: 9;
	} */

	/* 导航区 */
	.mv-nav {
		width: 100%;
		display: flex;
		height: 70rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 70rpx;
		color: #666666;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 9;
		background: #fff;
	}

	.mv-navitems {
		flex: 1;
		text-align: center;
	}

	.mv-active {
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		border-bottom: solid 4rpx #22BDE9;
	}

	/* 视频区 */
	.videoScroll,
	.mvScroll {
		margin-top: 50rpx;
		height: 100vh;
		/* 不设置这个高度 触发不了@scrolltolower事件 */
	}

	.videoItem {
		margin: 20rpx 0 20rpx 0;
		width: 100%;
		border-bottom: solid 1px #EAEAEA;
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
		float: right;
		margin-top: -50rpx;
	}

	.mvItem {
		display: flex;
		height: 140rpx;
		margin-top: 16rpx;
		/* justify-content:center; */
		width: 100%;
		/* flex-direction: column; */
	}

	.mv-no {
		width: 24rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 40rpx;
		color: #E42E17;
	}

	.mv-center {
		height: 140rpx;
		line-height: 140rpx;
		width: 60rpx;
		text-align: center;
	}

	.mv-txt {
		display: flex;
		flex-direction: column;
		margin-top: 40rpx;
		margin-left: 20rpx;
	}

	.mv-name {
		font-size: 28rpx;
		color: #333333;
		font-family: PingFang SC;
		margin-bottom: 8rpx;
		width: 500rpx;
	}

	.mv-artist {
		font-size: 22rpx;
		font-family: PingFang SC;
		color: #999999;
	}

	.video2 {
		height: 140rpx;
		width: 140rpx;
		border-radius: 10rpx;
		/* margin: 0 20rpx; */
	}
</style>
