<template>
	<view>
		<view class="container">
			<view class="searchView">
				<input type="text" value="" placeholder="这一次或许就是你上热评了" maxlength="40" class="bar" confirm-type="search"
					v-model="commentValue" />
				<button type="default" size="mini" class="searchBtn" @click="pushCommentt">发布</button>
			</view>
			<view class="commentHead" @click="backMusic">
				<image :src="countList.picUrl" class="headImg"></image>
				<view class="textC">
					<view class="nameT">{{countList.name}}-专辑</view>
					<view class="IdT">{{countList.alname}}</view>
					<text class="iconfont icon-iconfonti ic"></text>
				</view>
			</view>
			<view class="commentcount">
				<view class="countHead">
					<text>精彩评论</text>
					<view class="commentList" v-for="(item,index) in commentList" :key="index">
						<image :src="item.user.avatarUrl" class="commentImage"></image>
						<view class="commentlistT">
							<view class="listname">{{item.user.nickname}}</view>
							<view class="listTime">{{item.time | time(item.time)}}</view>
							<view class="listcomm">{{item.content}}</view>
						</view>

						<view class="likedCount" @click="likedCount(item)">
							<text>{{item.likedCount}}</text>
							<view class="iconfont icon-dianzan ic"></view>
						</view>
					</view>
					<view class="moreComment" @click="moreComment">
						<text>更多评论</text>
						<view class="iconfont icon-iconfonti icon"></view>
					</view>
				</view>
				<view class="countHead">
					<text>最新评论</text>
					<view class="commentList" v-for="(item,index) in newComment" :key="index">
						<image :src="item.user.avatarUrl" class="commentImage"></image>
						<view class="commentlistT">
							<view class="listname">{{item.user.nickname}}</view>
							<view class="listTime">{{item.time | time(item.time)}}</view>
							<view class="listcomm">{{item.content}}</view>
						</view>
						<view class="likedCount" @click="likedCount(item)">
							<text>{{item.likedCount}}</text>
							<view class="iconfont icon-dianzan ic"></view>
						</view>
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
	export default {
		data() {
			return {
				countList: {},
				commentList: [],
				time: '',
				id: '',
				newComment: [],
				commentValue: '',
			}
		},
		onLoad(options) {
			let date = new Date()
			let time = date.valueOf()

			uni.showLoading({
				mask: true,
				title: '加载中'
			})
			console.log(options)

			if (options) {

				this.id = options.key
				this._getcount(options.id)
				this._getcomment(options.key)
				this._getNewComment(options.key, time)

			} else {
				uni.showModal({
					title: '提示',
					content: '暂无评论',
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack()
						} else if (res.cancel) {
							uni.navigateBack()
						}
					}
				})
			}
		},
		computed: {
			...mapState['cookie']
		},
		methods: {

			pushCommentt() {
				console.log(this.commentValue)
				this.pushComment().then(() => {
					uni.showLoading({
						title:'发布中',
						mask:true
					})
					let date = new Date()
					let time = date.valueOf()
					this._getNewComment(this.id, time)
					this.commentValue = ''
				})

			},
			moreComment() {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				myRequestGet('/comment/music', {
					id: this.id,
					before: this.time
				}).then((res) => {
					// console.log(res)
					// console.log(res.comments)
					let list = res.hotComments ? res.hotComments : res.comments
					this.commentList = this.commentList.concat(list)
					uni.hideLoading()
				})
			},
			async pushComment() {
				let res = await myRequestGet('/comment', {
					id: this.id,
					content: this.commentValue,
					t: 1,
					type: 0,
					cookie: encodeURIComponent(JSON.parse(uni.getStorageSync('user')).cookie)
				})
				return res

			},
			backMusic() {
				uni.navigateBack()
			},
			async _getcount(id) {
				let res = await myRequestGet('/album', {
					id: id
				})
				if (res.code == 200) {
					let re = res.songs[0]
					this.countList = {
						name: re.al.name,
						picUrl: re.al.picUrl,
						alname: re.ar[0].name
					}
				}
			},
			async _getcomment(id) {
				let result = await myRequestGet('/comment/music', {
					id: id,
				})
				let len = result.hotComments.length ? result.hotComments.length - 1 : result.comments.length - 1
				if (result.code == 200) {
					this.commentList = result.hotComments.length ? result.hotComments : result.comments
					this.time = this.commentList[len].time
					uni.hideLoading()
				}
			},
			async _getNewComment(id, date) {
				this.newComment =''
				let result = await myRequestGet('/comment/music', {
					id: id,
					before: date
				})
				this.newComment = result.comments
				// console.log(this.newComment)
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="less">
	.container {
		.searchView {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			padding-top: 10rpx;
			width: 100%;
			position: fixed;
			z-index: 10;
			bottom: 0;
			background-color: white;

			.ic {
				position: absolute;
				top: 57%;
				transform: translate(16rpx, -50%);
				color: #9f9f9f;
			}

			.ic2 {
				position: absolute;
				top: 57%;
				right: 25%;
				font-size: 10rpx;
				transform: translate(16rpx, -50%);
				color: #9f9f9f;
				z-index: 10;
			}

			.bar {
				flex: 1;
				height: 68rpx;
				font-size: 28rpx;
				border-radius: 50px;
				background-color: #F8FAF9;
				padding-left: 60rpx;
			}

			.searchBtn {
				margin-left: 10rpx;
				margin-right: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}

		.commentHead {
			display: flex;
			padding: 14rpx 20rpx;
			align-items: center;

			.headImg {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}

			.textC {
				flex-grow: 1;
				width: 0;
				padding-left: 30rpx;
				position: relative;

				.nameT {
					font-size: 34rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 10rpx;
				}

				.IdT {
					font-size: 22rpx;
					color: #888
				}

				.ic {
					position: absolute;
					right: 10%;
					top: 50%;

				}
			}

		}

		.commentcount {
			.countHead {
				text {
					font-size: 20rpx;
					color: #333333;
					padding-left: 20rpx;

				}

				.moreComment {
					height: 80rpx;
					line-height: 80rpx;
					border-bottom: solid 1px rgba(212, 212, 222, 0.4);
					position: relative;

					text {
						position: absolute;
						left: 40%;
					}

					.icon {
						position: absolute;
						left: 55%;
					}
				}

				.commentList {
					// position: relative;
					display: flex;
					padding: 20rpx 28rpx;
					// align-items: center;
					flex-wrap: wrap;
					border-bottom: solid 1px rgba(212, 212, 222, 0.4);

					.commentImage {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}

					.commentlistT {
						flex-grow: 1;
						width: 0;
						padding-left: 30rpx;
						position: relative;

						.listname {
							font-size: 28rpx;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-bottom: 10rpx;
						}

						.listTime {
							font-size: 18rpx;
							color: #888
						}

						.listcomm {
							font-size: 36rpx;
							word-break: break-all; //允许换行
						}
					}

					.likedCount {
						position: relative;
						width: 80rpx;
						height: 30rpx;

						.ic {
							position: absolute;
							top: 30%;
							left: -25%;

						}
					}
				}
			}
		}
	}
</style>
