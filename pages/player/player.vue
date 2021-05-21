<template>
	<view class="body">
		<view class="title">
			<view class="title1">
				<icon class="iconfont icon-xiajiantou" style="color: #FFFFFF;font-size: 15px;" @click="goback">
				</icon>
				<view class="ic">

				</view>
			</view>

			<view class="musicnm">
				<text class="musicName">{{name}}</text>
				<view class="musicInfo">
					<!-- <text class="info">专辑：{{alname}}</text> -->
					<text class="info">{{arname}}</text>
				</view>
			</view>
			<view class="title1">

			</view>
		</view>
		<view class="contain"
			:style="{background:'url('+src+') no-repeat','background-size':'100% 100%','background-position':'center center'}">
		</view>
		<view class="mask">
			
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
					<view class="pl" 
						@click="goToComment">
						<text class="total">{{total|total(total)}}</text>
					</view>
					
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
		
			// console.log(options)
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
// console.log(options)
//专辑id
			this.alId = options.albumId
			this._gettotal(id)
			this.musicId = id
			// console.log(this.alId)
			//歌曲名字
			this.name = options.name
             //存储当前下标
			nowIndex = options.index
			// console.log(nowIndex)
			//专辑名字
			this.alname = options.alname
			//歌手名字
			this.arname = options.arname
			list = this.lists
			// console.log(list)
			//获取歌曲
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
				// console.log(num)
				let result = await myRequestGet('/comment/music', {
					id: num,
				})
				// console.log(result.total)
				this.total = result.total
				// console.log(this.total)
			},
			//返回
			goback() {
				uni.navigateBack();
				innerAudioContext.stop()
				this.isPlay = false
			},
			//跳转评论
			goToComment() {
				innerAudioContext.pause()
				this.isPlay = false
				let id = this.musicId
				let alid = this.alId
				uni.navigateTo({
					url: `/pages/comment/comment?key=${id}&id=${alid}`
				})
			},
			//歌词联动
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
				// console.log(item)
				this.alId = item.albumId
				this._gettotal(item.id)
				this.musicId = item.id
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
				this.alId = item.albumId
				this._gettotal(item.id)
				this.musicId = item.id
				this.src = item.src
				this.name = item.name
				this.alname = item.alname
				this.arname = item.arname
				this.goplay(item.id)
			},
			//暂停播放
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
				// console.log(encodeURIComponent(JSON.parse(uni.getStorageSync('user')).cookie))
				const res = await myRequestGet('/song/url', {
					id: id,
					cookie: encodeURIComponent(JSON.parse(uni.getStorageSync('user')).cookie),
				})
				// console.log(res)
				if (res.code == 200) {
					if(res.data[0].url){
						this.getlyric(id)
						innerAudioContext.src = res.data[0].url;
						innerAudioContext.play()
						// console.log(innerAudioContext)
						
						this.bindBgmEvent()
						
						
						// console.log(this.url)
					}else{
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
						if (this.isPlay) {
							this.isPlay = !this.isPlay
						}
					}
					
				}

			},
			async goplay(id) {
				// console.log(e)
				this.lrcList = [{
					lrc: '',
					time: 0
				}, ]
				this.nowLrc = -1
				// const result = await myRequestGet('/check/music', {
				// 	id: id
				// })
				let result={
					success:true
				}
				// console.log(result)
				if (result.success) {
					this.getMusic(id)
				} /* else {
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
				} */
				// console.log(res)

			},
			async getlyric(id) {
				// console.log(id)
				const result = await myRequestGet('/lyric', {
					id: id
				})
				// console.log(result)
				if (result.nolyric) {
					this.lrcList = [{
						lrc: '暂无歌词',
						time: 0
					}, ]
					this.nowLrc = -1
				} else {
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
				}


			},
			//背景音乐事件
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
					//优化刷新频率
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

					// console.log('开始播放');
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
			// flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-family: PingFang SC;
			color: #F0F0F0;
			padding: 10px 0;

			.title1 {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;

				.ic {
					width: 100%;
					height: 20%;
				}
			}

			.musicnm {
				height: 100%;
				flex: 10;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;

				.musicName {
					font-size: 22px;
					font-weight: 700;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

				.musicInfo {

					width: 100%;
					font-size: 15px;
					display: flex;
					justify-content: center;
					align-items: center;

					.info {
						padding: 10px 10px;
						width: 40%;
						// height: 50%;
						overflow: hidden;
						-webkit-line-clamp: 1;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}

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
					font-size: 35rpx;
					.pl{
						background: url('data:image/png;base64,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') no-repeat;
background-size: 100% 100%;
						width: 35%;
						height: 35%;
						display: flex;
						justify-content: center;
						align-items: center;
						.total{
							color: #FFFFFF;
							font-size: 16upx;
						}
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
		filter: blur(30rpx) contrast(60%) brightness(60%);
		opacity: 0.5;
		z-index: -10;
		height: 125%;

	}
	.mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -11;
		height: 125%;
		background-color: #222;
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
