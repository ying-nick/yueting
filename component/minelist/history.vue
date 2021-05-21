<template>
	<view class="historyView">
		<view class="historys">
			<block v-for="(it,index) in item.list" :key="index">
<view class="historySong" @click="goplay" :data-id='it.song.id' :data-src="it.song.al.picUrl" :data-name="it.song.name" :data-alname="it.song.al.name" :data-arname="it.song.ar[0].name" :data-idx="index" :data-albumid="it.song.al.id">
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
		mapState,
		mapMutations
	} from 'vuex'
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
			...mapMutations(['setList']),
		async goplay(e){
				// console.log(e)
				let res=e.currentTarget.dataset
				// console.log(res)
				// const result=await myRequestGet('/check/music',{
				// 	id:res.id
				// })
				let result={
					success:true
				}
				// console.log(result)
				if(result.success){
					//保存歌曲列表
					let list=[]
					// console.log(this.item.list)
					this.item.list.forEach(it=>{
						// console.log(it.song.al.id)
						let song={
							id:it.song.id,
							src:it.song.al.picUrl,
							name:it.song.name,
							alname:it.song.al.name,
							arname:it.song.ar[0].name,
							albumId:it.song.al.id
						}
						list.push(song)
						
					})
				// console.log(res)
					this.setList(list)
					uni.navigateTo({
					    url: `/pages/player/player?id=${res.id}
							&name=${res.name}&src=${encodeURIComponent(JSON.stringify(res.src))}
							&alname=${res.alname}&arname=${res.arname}&index=${res.idx}&albumId=${res.albumid}`
					});
				}/* else{
					uni.showToast({
					    title: '亲爱的,暂无版权,请换歌',
						icon:'none',&albumId=${res.al.id}
					    duration: 3000
					});
				} */
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
