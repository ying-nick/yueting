<template>
	<scroll-view scroll-y class="list" style="height: 92%;">
		<template v-if="items.list.length > 0">
			<!-- 图文列表 -->
			<History v-if="items.id=='history'" :item='historys'></History>
			<Mylist v-if="items.id=='myList'" :item='mylists'></Mylist>
			<Myinfo v-if="items.id=='myInfo'" :item='myinfos'></Myinfo>
		</template>
		<template v-else>服务器繁忙，请稍候下拉刷新</template>
	</scroll-view>
</template>

<script>
	import Myinfo from "./minelist/myInfo.vue";
	import History from "./minelist/history.vue";
	import Mylist from "./minelist/myList.vue";
	export default {
		props:['items'],
		data(){
			return{
				historys:[],
				mylists:[],
				myinfos:[],
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
				}else if(this.items.id=='myInfo'){
					this.myinfos=this.items
				}
			}
		},
		components:{
			History,
			Mylist,
			Myinfo
		}
	}
</script>

<style lang="less" scoped>
	.list{
		
	}
</style>
