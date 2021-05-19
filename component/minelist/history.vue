<template>
	<view class="historyView">
		<view class="historys">
			<block v-for="(it,index) in item.list" :key="index">
				<view class="historySong" @click="goplay" :data-id='it.song.id' :data-src="it.song.al.picUrl" :data-name="it.song.name" :data-alname="it.song.al.name" :data-arname="it.song.ar[0].name">
					<view>{{index+1}}</view>
					<image :src='it.song.al.picUrl' class="img"></image>
					<view class="historylists">{{it.song.name}}</view>
					<view class="historylists">{{it.playCount}}次</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '../../utils/req.js'
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
		async goplay(e){
				// console.log(e)
				let res=e.currentTarget.dataset
				const result=await myRequestGet('/check/music',{
					id:res.id
				})
				// console.log(result)
				if(result.success){
					uni.navigateTo({
					    url: `/pages/player/player?id=${res.id}&name=${res.name}&src=${encodeURIComponent(JSON.stringify(res.src))}&alname=${res.alname}&arname=${res.arname}`
					});
				}else{
					uni.showToast({
					    title: '亲爱的,暂无版权,请换歌',
						icon:'none',
					    duration: 3000
					});
				}
				// console.log(res)
				
			}
		}
		
	}
</script>
<style lang="less" scoped>
	.historyView {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;

		.historys {
			width: 100%;
			display: flex;
			flex-direction: column;

			.historySong {
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

				.historylists {
					width: 25%;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;

				}
			}

		}
	}
</style>
