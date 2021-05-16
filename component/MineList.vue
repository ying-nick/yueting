<template>
	<scroll-view scroll-y class="list">
		<template v-if="items.list.length > 0">
			<!-- 图文列表 -->
			<block v-for="(item,index1) in items.list" :key="index1">
				<view>{{item}}</view>
			</block>
		</template>
	</scroll-view>
</template>
//scroll-view是竖向，再做组件，不用for，用if，swiper是横向轮播
<script>
	export default {
		props:['items'],
		data(){
			return{
				
			}
		}
	}
</script>

<style>
</style>
