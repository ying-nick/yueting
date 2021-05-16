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
						<input type="text" style="height: 100%;" :placeholder="pwdPh" v-model="userPwd" class='inp-2' :password="pwdLoc">
					<icon :class="['iconfont',pwdLoc?'icon-jurassic_loseeyes':'icon-jurassic_openeyes']" @click="()=>pwdLoc=!pwdLoc" style="font-size: 25px;"></icon>
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
				namePh: '请输入手机号/邮箱账号',
				pwdPh: "请输入密码",
				nameFlg: true,
				pwdFlg: true,
				pwdLoc:true
			}
		},
		
		onLoad() {
			// console.log(this.loginStatus)
			// console.log(uni.getStorageSync('user').length)
			// console.log(this.loginStatus)
			if(uni.getStorageSync('user').length>0){
				// console.log(this.user)
				this.setUser(JSON.parse(uni.getStorageSync('user')))
				// console.log(this.user)
				uni.switchTab({
				    url: '/pages/musicModule/musicModule'
				})
			}
		},
		computed:{
			...mapState(['user']),
		},
		methods: {
			...mapMutations(['login','setUser']),
			
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
					this.checkSubm()
// console.log(this.loginStatus)
}
				
			},
			checkSubm(){
				const regE=/^[A-Za-z1]\w{5,17}@(vip\.(126|163|188)\.com|163\.com|126\.com|yeach\.net)/
				const regP=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			if(regE.test(this.userName)){
				// this.loginMusic('')
				// console.log('email')
				this.loginMusic('/login',{
					email:this.userName,
					password:this.userPwd
				})
			}else if(regP.test(this.userName)){
				// console.log('phone')
				this.loginMusic('/login/cellphone',{
					phone:this.userName,
					password:this.userPwd
				})
			}else{
				this.nameFlg = false
				this.userName=''
				this.namePh = '账号格式错误'
				return
			}
			
			},
			async loginMusic(url,data){
				const res=await myRequestGet(url,data)
				console.log(res)
				if(res.code==501){
					this.nameFlg = false
					this.userName=''
					this.namePh = '该账号不存在'
				}else if(res.code==502){
					this.pwdFlg = false
					this.userPwd=''
					this.pwdPh = '密码错误'
				}else if(res.code==200){
					this.login(res)
					uni.showToast({
					    title: '登陆成功',
						icon:'success',
						mask:true,
					    duration: 1000,
						complete() {
							setTimeout(()=>{
								uni.switchTab({
								    url: '/pages/musicModule/musicModule'
								})
							},1200)
						}
					});
					
					
					// console.log(uni.getStorageSync())
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
			font-size: 50upx;
			color: #666666;
			font-weight: 700;

		}

		.login {
			height: 87%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.logo {
				height: 500upx;
				width:500upx;
				display: flex;
				justify-content: center;
				align-items: center;

				.cicl-1 {
					height: 400upx;
					width: 400upx;
					border: 1px solid #666666;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					.cicle-2 {
						height: 300upx;
						width: 300upx;
						border: 1px solid #666666;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						.img {
							width: 200upx;
							height: 200upx;
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
					height: 350upx;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;

					.inp-1 {
						width: 60%;
						height: 20%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background-color: #FFFEFE;
						outline: none;
						padding: 2px 30px;

					}

					.active {
						border: 2upx solid #666666;
						border-radius: 50upx;
					}

					.unactive {
						border: 2upx solid #d43c43;
						border-radius: 50upx;
					}

					.sub {
						width: 45%;
						height: 20%;
						border-radius: 30upx;
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
