<template>
	<view>
		<view class="container">
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
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {
		data() {
			return {
				countList: {},
				commentList: [],
				time: '',
				id: '',
			}
		},
		onLoad(options) {
			console.log(options)

			if (options) {
				this.id = options.key
				this._getcount(options.id)
				this._getcomment(options.key)
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
		//触底刷新加载
		onReachBottom() {
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
		methods: {
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
				// console.log(len)
				// console.log(result.comments)
				console.log(result)
				if (result.code == 200) {
					this.commentList = result.hotComments.length ? result.hotComments : result.comments
					this.time = this.commentList[len].time
					// console.log(this.time)
					// console.log(this.commentList)
				}
			},
		}
	}
</script>

<style lang="less">
	.container {
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
						width: 100rpx;
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
