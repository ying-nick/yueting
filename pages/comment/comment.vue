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
					<view class="commentList" v-for="item in commentList" :key="item.time">
						<image :src="item.user.avatarUrl" class="commentImage"></image>
						<view class="commentlistT">
							<view class="listname">{{item.user.nickname}}</view>
							<view class="listTime">{{item.time}}</view>
							<view class="listcomm">{{item.content}}</view>
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
				commentList:[],
			}
		},
		onLoad(options) {
			console.log(options)
			this._getcount(options.id)
			this._getcomment(options.key)
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
				console.log(result)
				if (result.code == 200) {
					this.commentList = result.hotComments
					console.log(this.commentList)
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
							word-break: break-all;//允许换行
						}
					}
				}
			}
		}
	}
</style>
