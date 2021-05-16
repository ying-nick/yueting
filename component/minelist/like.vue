<template>
	<view class="likeView">
		<view class="likes">
			<block v-for="(it,index1) in item.list" :key="index1">
				<view class="likelists">{{it}}</view>
			</block>
		</view>
	
	</view>

</template>

<script>
	export default {
		props: ['item'],
		created() {
			// console.log(this.item)
		},
		data() {
			return {

			}
		},

	}
</script>

<style lang="less" scoped>
	.likeView{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		.likes{
			width: 90%;
			background-color: #4CD964;
		}
	}
</style>
