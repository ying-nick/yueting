<template>
	<view class="container">
		<block v-for="item in list" :key="item.keyword">
			<view class="list">
				<text class="iconfont icon-sousuo ic"></text>
				<text class="text">{{item.keyword}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '../utils/req.js'
	export default {
		props: ['value'],
		data() {
			return {
				list: []
			}
		},
		watch: {
			value(re) {
				if (re != '') {
					myRequestGet(`/search/suggest?keywords=${re}&type=mobile`)
						.then((res) => {
							// console.log(res)
							const arr = res.result.allMatch
							if (res.code == 200) {
								this.list = arr
								// console.log(this.list)
							}
						}).catch((err)=>{console.log(err)})
				} else {
					this.list = []
				}
			},
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #F8FAF9;
		z-index: 100;
		.list{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: solid 1px rgba(212, 212, 222, 0.4) ;
			.text{
				padding-left: 20rpx;
				font-size: 35rpx;
			}
			.ic{
				padding-left: 10rpx;
			}
		}
	}
</style>
