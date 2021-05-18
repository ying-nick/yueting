<template>
	<view class="contain">
		<view class="play">
			<view class="load" @click="load">
				<text class="text">loading...</text>
			</view>
			<view class="playCtrl" @click="ctrl">
				<view class="ctrls">
					
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			load(){
				console.log('load')
			},
			ctrl(){
				console.log('ctrl')
			}
		}
	}
</script>
<style>
	page{
		height: 100%;
	}
</style>
<style lang="less">
	.contain{
			height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.play{
		width: 650upx;
		height: 650upx;
			position: relative;
			.playCtrl{
				width: 650upx;
				height: 650upx;
				// background-color: #007AFF;
				position: absolute;
				z-index: 99;
				display: flex;
				justify-content: center;
				align-items: center;
				.ctrls{
					width: 600upx;
					height: 600upx;
					background-color: #007AFF;
				}
			}
			.load{
						width: 650upx;
						height: 650upx;
						box-sizing: border-box;
						border-radius: 50%;
						border-top: 10px solid #E74C3C;
						position: absolute;
						animation: a1 2s linear infinite;
						
					}
					.load::before, .load::after{
						content: '';
					width: 650upx;
					height: 650upx;
						box-sizing: border-box;
						border-radius: 50%;
						position: absolute;
						left: 0;
						top: -10px;
					}
					.load::before{
						border-top: 10px solid #E6B741;
						transform: rotate(120deg);
					}
					.load::after{
						border-top: 10px solid #3498DB;
						transform: rotate(240deg);
					}
					.load .text{
					width: 650upx;
					height: 650upx;
						position: absolute;
						line-height: 200px;
						text-align: center;
						
					}
					@keyframes a1{
						to{transform: rotate(360deg);}
					}
		}
	}
	
	
</style>
