<template>
	<view class="contain">
		<view class="top-bar">
			<text>悦听音乐</text>
		</view>
		<view class="login">
			<view class='logo'>
				<view class="cicl-1">
					<view class="cicle-2">
						<image src="../../static/logo/yinyue.png" class="img"></image>
					</view>
				</view>
			</view>
			<view class="phone-log"></view>
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
	page {
		height: 100%;
	}
</style>

<style lang="less" scoped>
	.contain {
		height: 100%;
		background-color: #72D0EA;

		.top-bar {
			height: 13%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;

		}

		.login {
			height: 87%;
			display: flex;
			flex-direction: column;

			.logo {
				height: 200px;
				width: 200px;
				display: flex;
				justify-content: center;
				align-items: center;

				.cicl-1 {
					height: 190px;
					width: 190px;
					border: 1px solid #666666;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					.cicle-2 {
						height: 150px;
						width: 150px;
						border: 1px solid #666666;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						.img {
							width: 110px;
							height: 110px;
						}
					}

				}

			}

			.phone-log {
				flex: 1;
				background-color: #666666;
			}
		}
	}
</style>
