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
			<view class="inf">
				<Mine :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></Mine>
				<view class="uni-tab-bar">
					<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
						<swiper-item v-for="(items,index) in newslist" :key="index">
							<Minelist :items='items'></Minelist>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
		</view>
		<view class="unlgn">
			<button class="unlogin" @click="lgnOut">退出登录</button>
		</view>

	</view>
</template>

<script>
	import Mine from "../../component/Mine.vue";
	import Minelist from "../../component/MineList.vue";
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
				tabIndex: 0, // 选中的
				tabBars: [{
						name: "猜你喜欢",
						id: "like"
					},
					{
						name: "播放历史",
						id: "history"
					},
					{
						name: "收藏的歌单",
						id: "likeList"
					},
					{
						name: "创建的歌单",
						id: "myList"
					},

				],
				swiperheight:0,//高度
				newslist:[
				   {
				     list:[
				       1
				       ]
				   },
				   {list:[
				      2
				       ]},
				   {list:[
				      3
				       ]},
					   {list:[
					      4
					       ]},
				
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height-150;
				}
			})
		},
		computed: {
			...mapState(['user', 'cookie']),
		},
		components: {
			Mine,
			Minelist
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			async list(){
				// const history=await this.getInf('/user/record',{
				// 	cookie:this.cookie,
				// 	uid:285385008,
				// 	type:1
				// })
				// const likes=await this.getInf('/recommend/songs',{
				// 	cookie:this.cookie
				// })
				// let like={id:'like',list:likes.data.dailySongs}
				// const likeList=
				console.log(like)
			},
			lgnOut() {
				// console.log(this.cookie)
				// console.log(this.user)
				// this.getInf('/user/record',{
				// 	cookie:this.cookie,
				// 	uid:285385008,
				// 	type:1
				// }).then(res=>{
				// 	console.log(res)
				// })
				
this.list()
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
					cookie: this.cookie
				})
				// console.log(res)
				if (res.code == 200) {
					uni.removeStorageSync('user')
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			},
			async getInf(url, data) {
				const res = await myRequestGet(url, data)
				return res
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

			.userIMG {
				width: 35%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.userImg {
					width: 80px;
					height: 80px;
				}
			}

			.userPrf {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.userNk {
					font-size: 18px;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 25px;
					color: #333333;
				}

				.userUid {
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
			display: flex;
			justify-content: center;
			align-items: center;
			.inf{
				height: 92%;
				padding: 10px 0;
				width: 100%;
				background-color: #FFFFFF;
			}
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
