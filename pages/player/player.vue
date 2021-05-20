<template>
	<view class="body">
		<view class="title">
			<text class="musicName">{{name}}</text>
			<view class="musicInfo">
				<text class="info">专辑：{{alname}}</text>
				<text class="info">歌手：{{arname}}</text>
			</view>
		</view>
		<view class="contain"
			:style="{background:'url('+src+') no-repeat','background-size':'100% 100%','background-position':'center center'}">
		</view>
		<view class="contains">
			<view class="play">
				<view class="load">

				</view>
				<view class="playCtrl">
					<view class="ctrls">
						<scroll-view class="lrc-scroll" scroll-y="true" :scroll-top="scrollTop"
							scroll-with-animation="true">
							<view class="lrc-panel">
								<block v-for="(item,index) in lrcList" :key="item">
									<view :class="['lyric',index==nowLrc?'highLight':'']">{{item.lrc}}</view>
								</block>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

		</view>
		<view class="players">
			<view class="progress">
				<view class="prg-pst">
					<view class="container">
						<text class="time">{{showTime.currentTime}}</text>
						<view class="control">
							<!-- 可移动区域 -->
							<movable-area class="area">
								<!-- 可移动视图容器 两个必须父子关系 -->
								<movable-view class="mova-view" direction="horizontal" damping="1000" :x="movableDis"
									@change="Tchange" @touchend="Tend"></movable-view>
							</movable-area>
							<!-- 进度条 -->
							<progress stroke-width="4" background-color="#969696" active-color="#FFD700"
								:percent="go" />
						</view>
						<text class="time">{{showTime.totalTime}}</text>
					</view>
				</view>
			</view>
			<view class="players-position">
				<view class="posion-1">
<icon class="iconfont icon-houtui"  style="color: #FFFFFF;font-size: 60rpx;font-weight: 500px;"
						@click="goback">
					</icon>
				</view>
				<view class="posion-2">
					<icon class="iconfont icon-backward icQ" style="color: #FFFFFF;font-size: 90upx;font-weight: 500px;"
						@click="goPev"></icon>
					<icon :class="['iconfont',isPlay?'icon-yixianshi-':'icon-bofang','icZ']"
						style="font-size:160upx;color: #d43c43;" @click="togglePlay"></icon>
					<icon class="iconfont icon-forward icQ" style="color: #FFFFFF;font-size: 90upx;font-weight: 500px;"
						@click="goNext">
					</icon>
				</view>
				<view class="posion-1">
					<icon class="iconfont icon-iconset0138"  style="color: #FFFFFF;font-size: 60rpx;font-weight: 500px;"
						@click="goToComment">
					</icon>
					<text class="total">{{total|total(total)}}</text>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'

	import {
		mapState,
		mapMutations
	} from 'vuex'
	let lyricHeight = 0
	let nowIndex = 0
	let list = []
	let movableAreaWidth = 0
	let movableViewWidth = 0
	const innerAudioContext = uni.createInnerAudioContext();
	let currentSec = -1 //当前秒数
	let dur = 0 //当前音乐总时长
	export default {
		data() {
			return {
				src: '',
				name: '',
				alname: '',
				arname: '',
				isPlay: true,
				innerAudioContext: {},

				showTime: {
					currentTime: '00:00',
					totalTime: '00:00',
				},
				innerAudioContext: {},
				movableDis: 0,

				go: 0,
				lrcList: [],
				nowLrc: 0, //当前歌词索引
				scrollTop: 0, //滚动条滚动高度
				isPause: true,
				musicId: '',
				alId: '',
				total: '',
			};
		},
		computed: {
			...mapState(['user', 'cookie', 'lists']),
		},
		onLoad(options) {
			console.log(options)
			this.alId = options.albumId
			// console.log('------')
			// console.log(this.alId)
			uni.hideTabBar()
			this.src = JSON.parse(decodeURIComponent(options.src))
			this.getMovableDis()
			let id = options.id
			// console.log(src)
			/* uni.setNavigationBarTitle({
				title: options.name
			})
 */
			this.alId = options.albumId
			this._gettotal(id)
			this.musicId = id
			// console.log(alId)
			this.name = options.name
			nowIndex = options.index
			// console.log(nowIndex)
			this.alname = options.alname
			this.arname = options.arname
			list = this.lists
			// console.log(list)
			this.getMusic(id)
		},
		onReady() {
			/* 
					uni.createSelectorQuery().select('.ctrls').fields({
									size: true,
								}, (res) => {
									lyricHeight = res.height/7;
									// console.log(res.height)
									// console.log(this.lyricHeight)
								}).exec(); */
			uni.getSystemInfo({
				success(res) {
					// console.log(res)
					//求出给个rpx大小，并算出当前高度px
					lyricHeight = (res.screenWidth / 750) * 64
					// console.log(lyricHeight)
				},
			})

		},

		methods: {
			async _gettotal(num) {
				console.log(num)
				let result = await myRequestGet('/comment/music', {
					id: num,
				})
				// console.log(result.total)
				this.total = result.total
				// console.log(this.total)
			},
			goback(){
				uni.navigateBack();
			},
			goToComment() {
				let id = this.musicId
				let alid = this.alId
				uni.navigateTo({
					url: `/pages/comment/comment?key=${id}&id=${alid}`
				})
			},
			timeUpdata(curTime) {
				// console.log(curTime)
				let lrcList = this.lrcList
				if (lrcList == 0) {
					return
				}
				//歌曲时间超过歌词时间
				if (curTime > lrcList[lrcList.length - 1].time) {
					if (this.nowLrc != -1) {
						this.nowLrc = -1
						this.scrollTop = lrcList.length * lyricHeight

					}
				}
				for (let i = 0, len = lrcList.length; i < len; i++) {
					if (curTime <= lrcList[i].time) {

						this.nowLrc = i - 1;
						this.scrollTop = (i - 1) * lyricHeight;

						break
					}
				}
				// console.log(this.data.scrollTop)
			},
			//滑动结束
			Tend() {
				dur = innerAudioContext.duration
				//设置背景音乐播放调整
				innerAudioContext.seek((dur * this.go) / 100)
				//设置进度条
				const curTimeFmt = this.timeFormat(
					Math.floor(innerAudioContext.currentTime)
				)
				this.showTime.currentTime = `${curTimeFmt.min}:${curTimeFmt.sec}`,
					this.isPlay = true
				innerAudioContext.play()
			},
			setTime(duration) {
				//获取歌曲时间，以s为单位

				// console.log(innerAudioContext.duration)
				//格式化时间
				const durationFmt = this.timeFormat(duration)
				// console.log(durationFmt)
				//单独更改对象内属性
				this.showTime.totalTime = `${durationFmt.min}:${durationFmt.sec}`

				// console.log(`${durationFmt.min}:${durationFmt.sec}`)
			},
			//格式化时间
			timeFormat(sec) {
				const min = Math.floor(sec / 60)
				sec = Math.floor(sec % 60)
				return {
					min: this.parse0(min),
					sec: this.parse0(sec),
				}
			},
			//补0
			parse0(sec) {
				return sec < 10 ? '0' + sec : sec
			},
			//滑动圆点
			Tchange(e) {
				// console.log(e)
				if (e.detail.source == 'touch') {
					//触发拖动歌曲停止
					innerAudioContext.pause()
					//给进度条赋值，不会同步到界面
					this.isPlay = false
					this.go =
						(e.detail.x / (movableAreaWidth - movableViewWidth)) * 100
					this.movableDis = e.detail.x

				}

			},
			//初始化圆点位置
			getMovableDis() {
				//创建一个查询器实例
				const query = uni.createSelectorQuery().in(this)
				//指定节点,获取元素信息
				query.select('.area').boundingClientRect()
				query.select('.mova-view').boundingClientRect()
				//执行上面操作
				query.exec((res) => {
					// console.log(res)
					movableAreaWidth = res[0].width
					movableViewWidth = res[1].width
				})
			},
			//下一首
			goNext() {
				// this.isPlay=false
				nowIndex++
				if (nowIndex == list.length) {
					nowIndex = 0
				}
				// console.log(list)
				innerAudioContext.stop()
				let item = list[nowIndex]
				console.log(item)
				this.src = item.src
				this.name = item.name
				this.alname = item.alname
				this.arname = item.arname
				this.goplay(item.id)
			},
			//上一首
			goPev() {
				// this.isPlay=false
				nowIndex--
				// console.log(list)
				if (nowIndex < 0) {
					nowIndex = list.length - 1
				}

				innerAudioContext.stop()

				// console.log(innerAudioContext)
				let item = list[nowIndex]
				this.src = item.src
				this.name = item.name
				this.alname = item.alname
				this.arname = item.arname
				this.goplay(item.id)
			},
			togglePlay() {
				if (innerAudioContext.paused) {
					//背景音乐重启
					innerAudioContext.play()
					this.isPlay = true
				} else {
					//暂停背景音乐
					innerAudioContext.pause()
					this.isPlay = false
				}
			},
			//歌词格式变化
			parseLrc(sLrc) {
				let line = sLrc.split('\n')
				let lrcList = []
				// console.log(line)
				line.forEach((item) => {
					//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
					let time = item.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
					// console.log(item)
					if (time != null) {
						// console.log(time)
						// console.log(item.split(time))
						let lrc = item.split(time)[1]
						let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
						// console.log(timeReg)
						//把时间转成秒
						let timeSec =
							parseInt(timeReg[1]) * 60 +
							parseInt(timeReg[2]) +
							parseInt(timeReg[3]) / 1000
						lrcList.push({
							lrc,
							time: timeSec,
						})
					}
				})
				this.lrcList = lrcList
				// console.log(this.lrcList)
			},
			async getMusic(id) {
				// console.log(innerAudioContext)
				if (!this.isPlay) {
					this.isPlay = !this.isPlay
				}
				const res = await myRequestGet('/song/url', {
					id: id,
					cookie: this.cookie,
				})
				// console.log(res)
				if (res.code == 200) {
					this.getlyric(id)
					innerAudioContext.src = res.data[0].url;
					innerAudioContext.play()
					// console.log(innerAudioContext)

					this.bindBgmEvent()


					// console.log(this.url)
				}

			},
			async goplay(id) {
				// console.log(e)
				this.lrcList = [{
					lrc: '',
					time: 0
				}, ]
				this.nowLrc = -1
				const result = await myRequestGet('/check/music', {
					id: id
				})
				// console.log(result)
				if (result.success) {
					this.getMusic(id)
				} else {
					uni.showToast({
						title: '亲爱的,暂无版权,请换歌',
						icon: 'none',
						duration: 1000
					});
					this.lrcList = [{
						lrc: '亲爱的,暂无版权,请换歌',
						time: 0
					}, ]
					this.nowLrc = -1
					// setTimeout(()=>{
					// 	this.goNext()
					// },1100)
					if (this.isPlay) {
						this.isPlay = !this.isPlay
					}
				}
				// console.log(res)

			},
			async getlyric(id) {
				const result = await myRequestGet('/lyric', {
					id: id
				})
				let lyric = result.lrc.lyric
				// console.log(result)
				// console.log(lyric)
				if (lyric) {
					this.parseLrc(lyric)
				} else {
					this.lrcList = [{
						lrc: '暂无歌词',
						time: 0
					}, ]
					this.nowLrc = -1
				}

			},
			bindBgmEvent() {
				innerAudioContext.onCanplay(() => {
					let duration = 0
					let time = setInterval(() => {
						duration = innerAudioContext.duration
						// console.log(duration)
						if (duration > 0) {
							this.setTime(duration)
							clearInterval(time)
						}
					}, 50)

					// console.log(11111)
				});
				innerAudioContext.onTimeUpdate(() => {
					//获取当前已经播放时间
					const curTime = innerAudioContext.currentTime
					// console.log(curTime)
					//获取总时长
					const duration = innerAudioContext.duration
					//优化setdata刷新频率
					if (curTime.toString().split('.')[0] != currentSec) {
						const curTimeFmt = this.timeFormat(curTime)

						//进度圆点进度
						this.movableDis = ((movableAreaWidth - movableViewWidth) * curTime) / duration,
							//进度条颜色进度
							this.go = (curTime / duration) * 100,
							this.showTime.currentTime = `${curTimeFmt.min}:${curTimeFmt.sec}`,

							currentSec = curTime.toString().split('.')[0]
						this.timeUpdata(curTime)

					}
				});

				innerAudioContext.onPlay(() => {

					console.log('开始播放');
					// setInterval(()=>{
					// 	let {duration} = innerAudioContext
					// 	console.log(duration)
					// },1000)
				});
				innerAudioContext.onEnded(() => {
					this.goNext()
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			}
		},
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>
<style lang="less" scoped>
	.body {
		height: 100%;

		.title {
			height: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-family: PingFang SC;
			color: #F0F0F0;
			padding: 10px 0;

			.musicName {
				font-size: 20px;
				font-weight: 700;
			}

			.musicInfo {

				width: 100%;
				font-size: 10px;
				display: flex;
				justify-content: center;
				align-items: center;

				.info {
					padding: 10px 10px;
					width: 40%;
					height: 5%;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

			}
		}

		.players {
			width: 100%;
			height: 30%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			.progress {
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				.prg-pst {
					width: 100%;
					height: 68upx;
				}

			}

			.players-position {
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				.posion-1 {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					flex: 1;
					position: relative;

					.total {
						position: absolute;
						font-size: 28rpx;
						color: white;
						top: 23%;
						right: 15%;
					}
				}

				.posion-2 {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex: 3;
				}

			}
		}
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;

		.control {
			position: relative;
			flex: 3;

			.area {
				width: 100%;
				height: 50upx;
				position: absolute;
				bottom: -25upx;
				left: 0;

				.mova-view {
					width: 40upx;
					height: 40upx;
					background-color: #ff8c00;
					border-radius: 50%;
				}
			}
		}

		.time {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			font-family: NotoSansHans-Regular, 'Franklin Gothic Medium', 'Arial Narrow',
				Arial, sans-serif;
			font-weight: 500;
			color: #d43c43;
			line-height: 60upx;
		}
	}

	.contain {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		filter: blur(10rpx) contrast(60%) brightness(60%);
		z-index: -10;
		height: 120%;

	}

	.contains {
		height: 650upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.play {
			width: 650upx;
			height: 650upx;
			position: relative;

			.playCtrl {
				width: 650upx;
				height: 650upx;
				position: absolute;
				z-index: 99;
				display: flex;
				justify-content: center;
				align-items: center;

				.ctrls {
					width: 600upx;
					height: 600upx;
					border-radius: 50%;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;

					.lrc-scroll {
						width: 96%;
						height: 70%;
						color: #ccc;
						font-size: 32rpx;

						.lrc-panel {
							position: relative;
							top: 50%;
							text-align: center;

							.lyric {
								min-height: 64rpx;

							}

							.highLight {
								color: #d43c43;
							}
						}
					}

				}
			}

			.load {
				width: 650upx;
				height: 650upx;
				box-sizing: border-box;
				border-radius: 50%;
				border-top: 10px solid #fda085;

				position: absolute;
				animation: a1 2s linear infinite;

			}

			.load::before,
			.load::after {
				content: '';
				width: 650upx;
				height: 650upx;
				box-sizing: border-box;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: -10px;
			}

			.load::before {
				border-top: 10px solid #a6c1ee;
				transform: rotate(120deg);
			}

			.load::after {
				border-top: 10px solid #F08080;
				transform: rotate(240deg);
			}

			.load .text {
				width: 650upx;
				height: 650upx;
				position: absolute;
				line-height: 200px;
				text-align: center;

			}

			@keyframes a1 {
				to {
					transform: rotate(360deg);
				}
			}
		}
	}
</style>
