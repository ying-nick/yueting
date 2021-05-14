<template>
	<view class="container">
		<view>
			<swiper indicator-dots="true" circular="true" autoplay="true" interval="2000" duration="1000">
				<block >
					<swiper-item>
						<!-- 这里放轮播图片 -->
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="playlist-container">
			<block>
				<c-playlist ></c-playlist>
			</block>
		</view>
		<view>
			<!-- 这里是每周推荐 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
.playlist-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10rpx;
  flex-direction: row;
}
</style>
