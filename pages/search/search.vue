<template>
	<view class="container">
		<view class="head">
			<view class="searchView">
				<text class="iconfont icon-sousuo ic"></text>
				<input type="text" value="" placeholder="请输入" maxlength="15" class="bar" confirm-type="search"
					@input="onKeyInput" v-model="inputValue"   @confirm="getSongList" />
				<button type="default" size="mini" class="searchBtn" @click="getSongList">搜索</button>
			</view>
		</view>
		<view class="main">
			<view v-if="listFlag">
				<view class="historyBot">
					<text>搜索历史</text>
					<text class="iconfont icon-shanchu1 iconDelete" @click="deleteHistory"></text>
				</view>
				<view class="historyList">
					<history-list :list='historyList' />
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="hotlist">
				<view class="hotSearch">
					<text>热门搜索</text>
				</view>
				<view class="hotContainer">
					<view v-for="(item,index) in hotList" :key="item.first" class="hotBlock"
						@click="goToList(item.first)">
						<text :class="index<=num?'rednum':'num'">{{index+1}}</text>
						<text class="hottext">{{item.first}}</text>
						<text class="iconfont icon-huo" v-if="index<=num"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '../../iconfont_xc.css'
	import {
		myRequestGet
	} from '../..//utils/req.js'
	import historyList from '../../component/historyList.vue'
	// const baseUrl = 'http://localhost:3000/search?keywords='
	export default {
		data() {
			return {
				flag: true,
				inputValue: '',
				listFlag: true,
				historyList: [],
				hotList: [],
				num: 2,
				da: ['1', '2', '3'],
			}
		},
		components: {
			historyList,
		},
		created() {
			this._getHotList()
		},
		methods: {
			goToList(name) {
				// console.log(name)
				uni.navigateTo({
					//通过传参的将需要搜索歌曲的key穿给搜索列表
					url: `/pages/searchList/searchList?key=${name}`
				});
			},
			//数据绑定 获取用户输入的内容
			onKeyInput(event) {
				this.inputValue = event.target.value
			},
			deleteHistory() {
				uni.showModal({
					title: '提示',
					content: '是否删除历史记录',
					success: (res) => {
						if (res.confirm) {
							this.historyList = []
						}
					}
				});
			},
			//搜索效果获取数据
			async getSongList() {
				if (this.inputValue) {
					//数据添加
					this.historyList.push(this.inputValue)
					//数据去重
					const arr = new Set(this.historyList)
					this.historyList = Array.from(arr)

					//清除input中的内容
					let value = this.inputValue
					this.inputValue = ''
					uni.navigateTo({
						//通过传参的将需要搜索歌曲的key穿给搜索列表
						url: `/pages/searchList/searchList?key=${value}`
					});
				}

			},
			async _getHotList() {
				let re = await myRequestGet('/search/hot')
				console.log(re.result.hots)
				this.hotList = re.result.hots
			},

		}
	}
</script>

<style lang="less">
	.container {
		.head {
			.searchView {
				display: flex;
				align-items: center;
				margin-left: 20rpx;
				position: relative;
				padding-top: 10rpx;

				.ic {
					position: absolute;
					top: 57%;
					transform: translate(16rpx, -50%);
					color: #9f9f9f;
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
		}

		.main {
			.historyBot {
				padding-top: 20rpx;
				padding-left: 30rpx;

				text {
					margin-top: 6rpx;
					margin-right: 10rpx;
					color: #333333;
				}

				.iconDelete {
					position: absolute;
					right: 30rpx;
				}
			}

			.historyList {
				display: flex;
				padding-top: 20rpx;
				padding-left: 30rpx;
				flex-wrap: wrap;
			}

		}

		.bottom {
			.hotlist {
				padding-top: 20rpx;
				padding-left: 30rpx;
				width: 100%;
				height: 400rpx;

				.hotSearch {
					margin-bottom: 20rpx;

				}

				.hotContainer {
					// display: flex;
					// flex-wrap: wrap;

					.hotBlock {
						width: 45%;
						height: 60rpx;
						display: inline-block;
						font-size: 28rpx;
						padding-top: 20rpx;
					}

					.num {
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #cccccc;
					}

					.hottext {
						padding-left: 10rpx;
						color: #333333;
						line-height: 60rpx;
					}

					.rednum {
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #EF0A0A;
					}
				}
			}
		}
	}
</style>
