<template>
	<view class="uni-tab-bar">
		<scroll-view class="uni-swiper-tab" scroll-x>
			<view class="swip-view">
				<block v-for="(tab,index) in tabBars" :key="tab.id" :style="scrollStyle">
					<view class="swiper-tab-list" :class="{'active' : tabIndex==index}" @tap="tabtap(index)"
						:style="scrollItemStyle">
						{{tab.name}} {{tab.num?tab.num:""}}
						<view class="swiper-tab-line"></view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabBars: Array,
			tabIndex: Number,
			scrollStyle: {
				type: String,
				default: ""
			},
			scrollItemStyle: {
				type: String,
				default: ""
			}
		},
		methods: {
			//点击切换导航
			tabtap(index) {
				// this.$emit('tabtap', index)
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-tab-bar {
		width: 100%;
	}

	.uni-swiper-tab {
		border-bottom: 1upx solid #EEEEEE;

		.swip-view {
			display: flex;
			justify-content: space-around;

			.swiper-tab-list {
				color: #969696;
				font-weight: bold;
				font-size: 35upx;


			}

			.active {
				color: #d43c43;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.swiper-tab-line {
					border-bottom: 2px solid #FEDE33;
					width: 66px;
					margin: auto;
					border-top: 2px solid #FEDE33;
					border-radius: 20px;
				}
			}
		}

	}
</style>
