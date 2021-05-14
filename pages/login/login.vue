<template>
	<view class="contain">
		<view class="top-bar">
			<text>悦听音乐</text>
		</view>
		<view class="login">
			<view class='logo'>
				<view class="cicl-1">
					<view class="cicle-2">
						<image src="@/static/logo/yinyue.png" class="img"></image>
					</view>
				</view>
			</view>
			<view class="user-log">
				<view class="inp-1">
					<input type="text" placeholder="手机号/用户名" v-model="userName" class='inp-2'>
				</view>
				<view class="inp-1">
					<input type="text" placeholder="密码" v-model="userPwd" class='inp-2'>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: null,
				userPwd: null
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
			align-items: center;

			.logo {
				height: 230px;
				width: 230px;
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

			.user-log {
				width: 100%;
				flex: 1;
				background-color: #666666;
				.inp-1{
					width: 70%;
					height: 20%;
				}
			}
		}
	}
</style>
