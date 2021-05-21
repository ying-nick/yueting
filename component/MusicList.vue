<template>
	<view>
		<view class="musiclist-container" v-for="(item,index) in newSongs"  :key="item.id" @click="goToPlayer"
		:data-id='item.id' :data-src="item.album.blurPicUrl" :data-name="item.name" :data-alname="item.album.name" :data-arname="item.artists[0].name" :data-idx="index">
				<text class="serialNum">{{index+1}}</text>
				<image class="songsImg" :src="item.album.blurPicUrl"></image>
				<text class="songTitle">{{item.name}} </text>
				<text  class="singer">{{item.artists[0].name}}</text>
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
	} from '../utils/req.js'
	export default {

		created() {
			this.getNewSongs() //获取推荐歌曲	
		},
		data() {
			return {
				newSongs: [

				]

			}
		},
		methods: {
			...mapMutations(['setList']),
			async getNewSongs() {
				const res = await myRequestGet('/top/song')
				this.newSongs = res.data
				console.log(this.newSongs)
			},
			async goToPlayer(e){
					// console.log(e)
					let res=e.currentTarget.dataset
					console.log(res)
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
						
						this.newSongs.forEach(item=>{
							let song={
								id:item.id,
								src:item.album.picUrl,
								name:item.name,
								alname:item.album.name,
								arname:item.artists[0].name
							}
							list.push(song)
							
						})
					
						this.setList(list)
						uni.navigateTo({
						    url: `/pages/player/player?id=${res.id}
								&name=${res.name}&src=${encodeURIComponent(JSON.stringify(res.src))}
								&alname=${res.alname}&arname=${res.arname}&index=${res.idx}`
						});
					}else{
						uni.showToast({
						    title: '亲爱的,暂无版权,请换歌',
							icon:'none',
						    duration: 3000
						});
					}					
				},

		}
	}
</script>

<style>
	.musiclist-container{
		position: relative;
	}
	.musiclist-container::after{
	    position: absolute;
	    right: 50rpx;
	    bottom: 0;
	    left: 50rpx;
	    height: 2rpx;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
.serialNum{
	position: absolute;
	margin: 40rpx;

}
.songsImg{
	height: 120rpx; 
	width: 120rpx;
	margin-left: 90rpx;
	
}
.songTitle{
		position: absolute;
		font-size: 26rpx;
       margin-left: 30rpx;
	   margin-top: 10rpx;
}
.singer{
	font-size: 20rpx;
	color: #999999;
	position: absolute;
	margin-left: 30rpx;
	margin-top: 74rpx;
}

</style>
