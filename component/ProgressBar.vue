<template>
	<view class="container">
		<text class="time">{{showTime.currentTime}}</text>
		<view class="control">
			<!-- 可移动区域 -->
			<movable-area class="area">
				<!-- 可移动视图容器 两个必须父子关系 -->
				<movable-view
				 class="mova-view"
				 direction="horizontal"
				 damping="1000"
				></movable-view>
			</movable-area>
			<!-- 进度条 -->
			<progress
			 stroke-width="4"
			 background-color="#969696"
			 active-color="#FFD700"
			/>
		</view>
		<text class="time">{{showTime.totalTime}}</text>
	</view>
</template>

<script>
	export default {
		props:['url','id'],
		data() {
			return {
					showTime: {
							currentTime: '00:00',
							totalTime: '00:00',
						},
						innerAudioContext:{},
					
			};
		},
		created(){
			// console.log(this.id)
		
		},
		watch:{
			url(val){
				// console.log(val)
				if(val==''){
					console.log(111)
				}else{
					this.src=val
				}
		}
		
		}
	}
</script>

<style lang="less" scoped>
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
		flex:1;
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

</style>
