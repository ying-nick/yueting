<template>
	<scroll-view scroll-y class="list" style="height: 100%;" >
		<template v-if="items.list.length > 0">
			<!-- 图文列表 -->
			<Like v-if="items.id=='like'" :item='item'></Like>
			<History v-if="items.id=='history'" :item='item'></History>
			<Mylist v-if="items.id=='myList'" :item='item'></Mylist>
		</template>
		<template v-if="items.list.length == 0">
			
				<view>暂无数据，快去听歌和收藏</view>
			
		</template>
	</scroll-view>
</template>

<script>
	import Like from "./minelist/like.vue";
	import History from "./minelist/history.vue";
	import Mylist from "./minelist/myList.vue";
	export default {
		props:['items'],
		data(){
			return{
				item:this.items
			}
		},
		components:{
			Like,
			History,
			Mylist
		}
	}
</script>

<style>
</style>
