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
				<Mine :tabBars="tabBars" :tabIndex="tabIndex" @tabtap.stop="tabtap"></Mine>
				<view class="uni-tab-bar">
					<!-- 设置不自动播放 阻止事件冒泡-->
					<swiper class="swiper-box"  :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
						<swiper-item v-for="(items,index) in newslist" :key="index">
							<Minelist :items='items' ></Minelist>
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
				preIndex:0,
				tabBars: [
					{
						name: "播放历史",
						id: "history"
					},
					{
						name: "我的歌单",
						id: "myList"
					},
					{
						name: "个人信息",
						id: "myInfo"
					},
				],
				swiperheight:500,//高度
				newslist:[],
			
				
			}
		},
		onLoad() {
			//适应屏幕高度滚动框
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height-150;
				}
			})
			uni.showLoading({
			    title: '努力加载中',
				mask:true
			});
			//进入页面判断是否有数据缓存
			if(uni.getStorageSync('list').length>0){
				//获取本地user缓存
				this.getUserInfo()
				this.newslist=JSON.parse(uni.getStorageSync('list'))
				 uni.hideLoading(this.newslist)
			}else{
				// console.log(111)
				this.list().then(res=>{
					// console.log(res)
						uni.setStorageSync('list', JSON.stringify(res));
					this.newslist=res
					 uni.hideLoading()
					 
					
				}).catch(err=>{
					console.log(err)
				})
			}
			
			
			
			
		},
		//下拉刷新，更新数据
		 onPullDownRefresh() {
		     this.list().then(res=>{
		      	// console.log(res)
		      	uni.setStorageSync('list', JSON.stringify(res));
		      	this.newslist=res
				// console.log(this.newslist)
				// console.log(this.news)
		      	 uni.stopPullDownRefresh();
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
			...mapMutations(['login', 'setUser','getUserInfo']),
			//点击导航
			tabtap(index) {
				// this.tabIndex = index;
				
			},
			tabChange(e) {
				if(e.detail.source=='touch'){
						this.preIndex=e.detail.current;
				}
					this.tabIndex=this.preIndex
				
				// console.log(e.detail)
				// console.log(e.detail.current)
				
			},
			//获取列表
			async list(){
				let list=[]
				//播放历史
				const historys=await this.getInf('/user/record',{
					cookie:this.cookie,
					uid:this.user.profile.userId,
					type:1,
					
				})
				if(historys.code==200){
					let history={id:'history',list:historys.weekData}
				list.push(history)
				}else{
					list.push({
						id:'history',
						list:[]
					})
				}
				//我的歌单
				const myLists=await this.getInf('/user/playlist',{
				uid:this.user.profile.userId,
					cookie:this.cookie,
				})
				if(myLists.code=200){
					if(myLists.playlist.length==0){
						list.push({
							id:'myList',
							list:[]
						})
					}else{
						list.push({
							id:'myList',
							list:myLists.playlist
						})
					}
				}
				//个人信息
				const levl=await this.getInf('/user/level',{
				uid:this.user.profile.userId,
					cookie:this.cookie,
				})
				if(levl.code==200){
					const count=await this.getInf('/user/subcount',{
					uid:this.user.profile.userId,
						cookie:this.cookie,
					})
					if(count.code==200){
						let info={...count,...levl.data}
						let usinfo=[]
						usinfo.push(info)
						list.push({
							id:'myInfo',
							list:usinfo
						})
					}
					
				}else{
					list.push({
						id:'myInfo',
						list:[]
					})
				}
				// console.log(list)
				return list
			},
			//登出
			lgnOut() {
				// console.log(this.cookie)
				// console.log(this.user)
				console.log(this.newslist)
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
								title: '谢谢支持',
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
					uni.clearStorageSync();
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
					width: 180upx;
					height: 180upx;
				}
			}

			.userPrf {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.userNk {
					font-size: 35upx;
					font-family: PingFang SC;
					font-weight: bold;
				
					color: #333333;
				}

				.userUid {
					margin-top: 15upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					
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
			height: 120upx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.unlogin {
				width: 70%;
				height: 70%;
				background: #d43c43;
				border: 2upx solid #d43c43;
				border-radius: 50upx;
				outline: none;
				display: flex;
				color: #FFFFFF;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
