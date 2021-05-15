<template>
	<view class="mine">
		<view class="userNam">

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
			...mapState(['user']),
		},
		methods: {
			lgnOut() {

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
				const cookie = encodeURIComponent(this.user.cookie)
				// console.log(cookie)
				const res = await myRequestGet('/logout', {
					cookie
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
			background-color: red;
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
