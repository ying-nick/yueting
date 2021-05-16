<template>
	<scroll-view scroll-y class="list" style="height: 92%;">
		<template v-if="items.list.length > 0">
			<!-- 图文列表 -->
			<!-- <Like v-if="items.id=='like'" :item='likes'></Like> -->
			<History v-if="items.id=='history'" :item='historys'></History>
			<Mylist v-if="items.id=='myList'" :item='mylists'></Mylist>
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
				historys:[],
				mylists:[],
				item:this.items
			}
		},
		created() {
			this.getlist()
		},
		//深度监听
		watch:{
			['items.list']:{
				  handler(val) {
				     this.getlist()
				    },
				    deep: true,
				    immediate: true
				    }
			},

		methods:{
			getlist(){
				if(this.items.id=='history'){
					this.historys=this.items
					// console.log(this.historys)
				}else if(this.items.id=='myList'){
					this.mylists=this.items
					// console.log(this.mylists)
				}
			}
		},
		components:{
			Like,
			History,
			Mylist
		}
	}
</script>

<style lang="less" scoped>
	.list{
		
	}
</style>
