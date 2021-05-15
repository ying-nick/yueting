<template>
	<view class="mine">
		<view class="userNam">
			<view class="userIMG">
				<image :src="user.profile.avatarUrl" mode="" class="userImg"></image>
			</view>

		<view class="userPrf">
			<text class="userNk">{{user.profile.nickname}}</text>
			<text class="userUid">悦听号：{{user.profile.userId}}</text>
		</view>
		</view>
		<view class="userInf">

		</view>
		<view class="unlgn">
			<button class="unlogin" @click="lgnOut">退出登录</button>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		myRequestGet
	} from '../../utils/req.js'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['user','cookie']),
		},
		methods: {
			lgnOut() {
// console.log(this.cookie)
console.log(this.user)
				uni.showModal({
					title: '确定要退出？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: 'Bye',
								mask: true,
								image: '../../static/icon/cry.png',
								duration: 1000,
								complete: () => {
									this.outReq()
								}
							});
						} else if (res.cancel) {
							uni.showToast({
								title: 'Bye',
								mask: true,
								image: '../../static/icon/happy.png',
								duration: 1000
							});
						}
					}
				});
			},
			async outReq() {
				// console.log(this.user)
				
				// console.log(cookie)
				const res = await myRequestGet('/logout', {
					cookie:this.cookie
				})
				// console.log(res)
				if (res.code == 200) {
					uni.removeStorageSync('user')
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		background: #E6E6E6;
	}
</style>

<style lang="less" scoped>
	.mine {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.userNam {
			width: 100%;
			height: 20%;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			.userIMG{
				width: 35%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.userImg{
					width: 80px;
					height: 80px;
				}
			}
			.userPrf{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.userNk{
					font-size: 18px;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 25px;
					color: #333333;
				}
				.userUid{
					margin-top: 5px;
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 20px;
					color: #666666;
				}
			}
			
		}

		.userInf {
			flex: 1;
		}

		.unlgn {
			height: 50px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.unlogin {
				width: 70%;
				height: 35px;
				background: #d43c43;
				border: 1px solid #d43c43;
				border-radius: 25px;
				outline: none;
				display: flex;
				color: #FFFFFF;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
