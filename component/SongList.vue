<template>
	<view class="container">
		<view class="musiclist-container" v-for="(item,index) in songs" :key="item.id" @click="goToPlayer"
			:data-id='item.id' :data-src="item.al.picUrl" :data-name="item.name" :data-alname="item.al.name"
			:data-arname="item.ar[0].name" :data-idx="index">
			<text class="serialNum">{{index+1}}</text>
			<image class="songsImg" :src="item.al.picUrl"></image>
			<text class="songTitle">{{item.name}}</text>
			<text class="singer">{{item.ar[0].name}}--{{item.al.name}}</text>
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
		mounted() {

		},


		props: [
			'listSongs'
		],

		data() {
			return {
				songs: []

			}
		},

		watch: {
			listSongs(r) {
				// console.log(r)
				const newList = [];
				// console.log(this.listSongs)
				r.forEach((item) => {
					newList.push(item.id)
				});

				this.getListSongs(newList)

			}
		},
		methods: {
			...mapMutations(['setList']),
			async getListSongs(newList) {

				const res = await myRequestGet('/song/detail', {
					ids: newList.join()
				});

				this.songs = res.songs
				console.log(this.songs)
			},
			async goToPlayer(e) {
				// console.log(e)
				let res = e.currentTarget.dataset
				console.log(res)
				// const result=await myRequestGet('/check/music',{
				// 	id:res.id
				// })
				let result = {
					success: true
				}
				// console.log(result)
				if (result.success) {
					//保存歌曲列表
					let list = []
					// console.log(this.listSongs)
					this.songs.forEach(item => {
						let song = {
							id: item.id,
							src: item.al.picUrl,
							name: item.name,
							alname: item.al.name,
							arname: item.ar[0].name
						}
						list.push(song)

					})

					this.setList(list)
					uni.navigateTo({
						url: `/pages/player/player?id=${res.id}
								&name=${res.name}&src=${encodeURIComponent(JSON.stringify(res.src))}
								&alname=${res.alname}&arname=${res.arname}&index=${res.idx}`
					});
				} else {
					uni.showToast({
						title: '亲爱的,暂无版权,请换歌',
						icon: 'none',
						duration: 3000
					});
				}
			},
		}
	}
</script>

<style>
	.musiclist-container {
		position: relative;
	}

	.musiclist-container::after {
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
		font-size: 26rpx;
		left: 236rpx;
		margin-top: 10rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;

	}

	.singer {
		font-size: 20rpx;
		color: #999999;
		position: absolute;
		left: 236rpx;
		margin-top: 74rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
