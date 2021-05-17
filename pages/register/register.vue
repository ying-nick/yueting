<template>
	<view class="contain">
		<view class="top-bar">
			<text>悦听音乐</text>
		</view>
		<view class="regist">
			<view class='logo'>
				<view class="cicl-1">
					<view class="cicle-2">
						<image src="@/static/logo/yinyue.png" class="img"></image>
					</view>
				</view>
			</view>
			<view class="user-log">
				<view class="reg">
					<view class="inp-1" :class="[nameFlg?'active':'unactive']">
						<input type="text" style="height: 100%;" :placeholder="namePh" v-model="userName"  @blur="phoneChk" @focus="focp">
					</view>
					<view class="inp-1" :class="[pwdFlg?'active':'unactive']">
						<input type="text" style="height: 100%;" :placeholder="pwdPh" v-model="userPwd"  :password="pwdLoc" @blur="pwdChk" @focus="focw">
					<icon :class="['iconfont',pwdLoc?'icon-jurassic_loseeyes':'icon-jurassic_openeyes']" @click="()=>pwdLoc=!pwdLoc" style="font-size: 25px;"></icon>
					</view>
					<view class="cap">
						<view class="inp-cap" :class="[captchaFlg?'active':'unactive']">
							<input type="text" style="height: 100%;" :placeholder="captchaPh" v-model="captcha" class='inp-2' @blur="captchaChk" @focus="focc">
						</view>
						<view class="getcap" @click="getcaps">获取验证码</view>
					</view>
					
					<button type="default" class="sub" @click="smit">注册</button>
				</view>
				<view class="regs"><text @click="golg">去登录~~</text></view>
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
				captcha:'',
				namePh: '请输入手机号',
				pwdPh: "密码至少8位,字母和数字",
				captchaPh:'请输入验证码',
				nameFlg: true,
				pwdFlg: true,
				captchaFlg: true,
				pwdLoc:true
			}
		},
		
		onLoad() {
		
		},
		computed:{
			...mapState(['user','cookie']),
		},
		methods: {
			...mapMutations(['login','setUser']),
async phoneChk(){
	const regP = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	if(regP.test(this.userName)){
		const res = await myRequestGet('/cellphone/existence/check',{
			phone:this.userName
		})
		// console.log(res)
		if(res.code==200&&res.exist>0){
			this.nameFlg=false
			this.namePh='账号已注册，请直接登录'
			this.userName=''
		}
	}else{
		this.nameFlg=false
		this.namePh='请输入正确的手机号'
		this.userName=''
	}
	
},
	async getInf(url, data) {
				const res = await myRequestGet(url, data)
				return res
			},
			focp(){
				this.namePh='请输入手机号'
				this.nameFlg=true
			},
			focw(){
				this.pwdPh='密码至少8位,字母和数字'
				this.pwdFlg=true
			},
			focc(){
				this.captchaPh='请输入验证码'
				this.captchaFlg=true
			},
			golg(){
				uni.navigateTo({
					url: '/pages/login/login',
				})
			}
			

		}
	}
</script>
<style>
	page {
		height: 100%;
		background-color: #72D0EA;
	}
</style>

<style lang="less" scoped>
	.contain {
		height: 100%;

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

		.regist {
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
				flex-direction: column;
				justify-content: start;

				.reg {
					width: 100%;
					height: 400upx;
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
						padding: 0px 15px;

					}
					.cap{
						width: 60%;
						height: 20%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 2px 15px;
						.inp-cap{
							width: 60%;
							height: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							background-color: #FFFEFE;
							outline: none;
						padding: 2px 10px;
							
						}
						.getcap{
							width: 50%;
							    height: 100%;
							    display: flex;
							    justify-content: flex-end;
								align-items: center;
								text-decoration: underline;
						}
					}
					

					.active {
						border: 2upx solid #666666;
						border-radius: 50upx;
					}

					.unactive {
						border: 4upx solid #d43c43;
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
.regs {
					color: #d43c43;
					font-size: 35upx;
					text-decoration: underline;
					width: 100%;
					height: 100upx;
					text-align: center;
					padding: 20px 0;
				}
			}
		}
	}
</style>
