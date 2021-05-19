<template>
	<view >
	<view class="musiclist-container" v-for="(item,index) in songs"  :key="item.id">
			<text class="serialNum">{{index+1}}</text>
			<image class="songsImg" :src="item.al.picUrl"></image>
			<text class="songTitle">{{item.name}}</text>
			<text  class="singer">{{item.ar[0].name}}</text>

		
	</view>

	</view>
</template>
<script>
	import {
		myRequestGet
	} from '../utils/req.js'
	export default {
		mounted(){
			
			 // console.log(this.listSongs)
		
			},
		
		
   props:[
	  'listSongs'
   ],
		
		data() {
			return {
               songs:[]

			}
		},
		// created() {
		// 	// console.log(this.listSongs)
			
		// 	this.getListSongs()
		// },
		watch:{
			listSongs(r){
				// console.log(r)
				const newList = [];
					// console.log(this.listSongs)
				r.forEach((item)=>{
						newList.push(item.id)
					});
					console.log(newList)
					this.getListSongs(newList)
			}
		},
		methods: {
			
			
			async getListSongs(newList) {
			// 	const newList = [];
			// 	// console.log(this.listSongs)
			// this.listSongs.forEach((item)=>{
			// 		newList.push(item.id)
			// 	});
			// 	console.log(newList)
				
			    const res = await myRequestGet('/song/detail', {ids:newList});
				console.log(res)
				// for(var i = 0;i<this.listSongs.length;i++){
				// 	const res = await myRequestGet('/song/detail', {ids: this.listSongs[i].id})
				// 	console.log(res.songs)
			   this.songs = res.songs
				 
				// }
		
	
			},
			 
		}
	}
</script>

<style>
	.musiclist-container {
		position: relative;
	}

	.serialNum {
		position: absolute;
		margin: 40rpx;

	}

	.songsImg {
		height: 120rpx;
		width: 120rpx;
		margin-left: 90rpx;

	}

	.songTitle {
		position: absolute;
		margin-left: 30rpx;
		margin-top: 10rpx;
	}

	.singer {
		font-size: 20rpx;
		color: #999999;
		position: absolute;
		margin-left: 30rpx;
		margin-top: 70rpx;
	}
</style>
