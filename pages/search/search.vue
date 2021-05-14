<template>
	<view class="container">
		<view class="head">
			<view class="searchView">
				<input type="text" value="" placeholder="请输入" maxlength="15"  class="bar"/>
				<button type="default" size="mini" class="searchBtn">搜索</button>
			</view>
		</view>
		<view class="main">

		</view>
		<view class="bottom">

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

<style lang="less">
	.container {
		.head {		
			.searchView{			
				    display: flex;
				    align-items: center;
				    margin-left: 20rpx;
				    position: relative;

				.bar{	
							flex: 1;
					    height: 68rpx;
					    font-size: 28rpx;
					    border-radius: 50px;
					    background-color: #C0C0C0;
					    padding-left: 60rpx;
				}
				.searchBtn{
				        background: #d43c33;
				        color: #fff;
				        margin-left: 10rpx;
								margin-right: 10rpx;
				        font-size: 28rpx;
				}
			}
		}

		.main {}

		.bottom {}
	}
</style>
