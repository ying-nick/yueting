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
				<view class="lgn">
					<view class="inp-1" :class="[nameFlg?'active':'unactive']">
						<input type="text" style="height: 100%;" :placeholder="namePh" v-model="userName" class='inp-2'>
					</view>
					<view class="inp-1" :class="[pwdFlg?'active':'unactive']">
						<input type="text" style="height: 100%;" :placeholder="pwdPh" v-model="userPwd" class='inp-2'>
					</view>
					<button type="default" class="sub" @click="smit">登录</button>
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {myRequestGet} from '../../utils/req.js'
	export default {
		data() {
			return {
				userName: '',
				userPwd: '',
				namePh: '请输入手机号/用户名',
				pwdPh: "请输入密码",
				nameFlg: true,
				pwdFlg: true
			}
		},
		computed: {
			...mapState(['loginStatus'])
		},
		methods: {
			...mapMutations(['login']),
			smit() {
				if (this.userName == '') {
					this.nameFlg = false
					this.namePh = '账号不能为空'
					return
				} else if (this.userPwd == '') {
					this.pwdFlg = false
					this.pwdPh = '密码不能为空'
					return
				} else {
					this.nameFlg = true
					this.pwdFlg = true
// console.log(this.loginStatus)
				}
			}
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
			font-size: 20px;
			color: #666666;
			font-weight: 700;

		}

		.login {
			height: 87%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.logo {
				height: 300px;
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

				display: flex;

				align-items: flex-start;

				.lgn {
					width: 100%;
					height: 180px;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;

					.inp-1 {
						width: 60%;
						height: 20%;
						display: flex;
						justify-content: center;
						background-color: #FFFEFE;
						outline: none;

					}

					.active {
						border: 1px solid #666666;
						border-radius: 25px;
					}

					.unactive {
						border: 1px solid #d43c43;
						border-radius: 25px;
					}

					.sub {
						width: 45%;
						height: 20%;
						border-radius: 10px;
						background: #FFFEFE;
						display: flex;
						justify-content: center;
						align-items: center;

					}
				}

			}
		}
	}
</style>
