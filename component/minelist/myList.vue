<template>
	<view class="mylistView">
		<view class="mylists">
			<block v-for="(it,index) in item.list" :key="index">
				<view class="mylistSong" :data-id='it.id' @click="goPlaylist">
					<view>{{index+1}}</view>
					<image :src='it.coverImgUrl' class="img"></image>
					<view class="mylists">{{it.name}}</view>
					<view class="mytime">{{it.createTime | formatDate('-')}}</view>
				</view>
			</block>
		</view>
	
	</view>
	
</template>

<script>
	export default {
		props:['item'],
		created() {
			// console.log(this.item)
		},
		data(){
			return{
				
			}
		},
		methods:{
			goPlaylist(e){
				// console.log(e)
				uni.navigateTo({
				  url: `/pages/musicList/musicList?playListId=${e.currentTarget.dataset.id}`
									
				})
			}
		},
		filters:{
					// 时间戳处理
					formatDate: function(value,spe='/') {
						// console.log(value)	
					  let data= new Date(value);
					   let year = data.getFullYear();
					   let month = data.getMonth() + 1;
					   let day = data.getDate();
					   let h = data.getHours();
					   let mm = data.getMinutes();
					   let s = data.getSeconds();
					   month = month > 10 ? month : "0" + month;
					   day = day > 10 ? day : "0" + day;
					   h = h > 10 ? h : "0" + h;
					   mm = mm > 10 ? mm : "0" + mm;
					   s = s > 10 ? s : "0" + s;
					   // console.log(`${year}${spe}${month}${spe}${day}`)
					   return `${year}${spe}${month}${spe}${day}`;
					     }
				}
		
	}
</script>
<style lang="less" scoped>
	.mylistView {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;

		.mylists {
			width: 100%;
			display: flex;
			flex-direction: column;

			.mylistSong {
				flex: 1;
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: 1px solid #EAEAEA;
				padding: 10px 20px;
				font-size: 14px;
				font-family: PingFang SC;
				color: #666666;

				.img {
					width: 80px;
					height: 80px;
				}

				.mylists {
					width: 25%;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;

				}
				.mytime{
					width:30%
				}
			}

		}
	}
</style>
