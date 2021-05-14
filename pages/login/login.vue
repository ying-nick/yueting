<template>
	<view class="contain">
		<view class="top-bar">
			<text>悦听音乐</text>
		</view>
		<view class="login">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>

<style lang="less" scoped>
	.contain {
		height: 100%;


		.top-bar {
			background-color: #4CD964;
			height: 13%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;

		}

		.login {
			background-color: #DD524D;
			height: 87%;
		}
	}
</style>
