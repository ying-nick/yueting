<!-- <template>
<view class="playlist-container">
  <image>
	 <!-- 这里放歌单图片 -->
  </image>
  <text class="playlist-playcount"></text>
  <view class="playlist-name"></view>
</view>
</template>

<script>
	Component({
	  /**
	   * 组件的属性列表
	   */
	  properties: {
	  playlist:{
	    type:Object
	  }
	  },
	  observers:{//属性监听器
	   ['playlist.playCount'](count){//对象下面的某个属性
	      this._tranNumber(count,2)
	      this.setData({
	        _count :this._tranNumber(count,2) //不能对监听的对象再赋值 生成的数字赋值给自己的声明的数字
	      })
	   }
	  },
	
	  /**
	   * 组件的初始数据
	   */
	  data: {
	    _count:0 //声明一个自己的数字
	  },
	
	  /**
	   * 组件的方法列表
	   */
	  methods: {
	    goToMusiclist(){
	      wx.navigateTo({
	        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
	      })
	    },
	   _tranNumber(num,point){
	       let numStr= num.toString().split ('.')[0]
	       if(numStr.length<6){
	 return numStr
	       }else if(numStr.length >=6 && numStr.length <=8 ){
	         let decimal = numStr.substring(numStr.length - 4,numStr.length-4+point)
	         return parseFloat(parseInt(num/10000)+"."+decimal)+"万"
	       }else if(numStr.length >8){
	        let decimal = numStr.substring(numStr.length - 8,numStr.length-8+point)
	        return parseFloat(parseInt(num/100000000)+"."+decimal)+"亿"
	       }
	      }
	  }
	})

	
</script>

<style>
	.playlist-container{
	  width: 220rpx;
	  position: relative;
	  padding-bottom: 20rpx;
	}
	.playlist-img{
	  width: 100%;
	  height: 220rpx;
	  border-radius: 6rpx;
	}
	.playlist-playcount{
	  font-size: 24rpx;
	  color:#fff;
	  text-shadow:1px 0 0 rgba(0,0,0,0.15);
	  position: absolute;
	  right: 10rpx;
	  top:4rxp;
	  padding-left: 26rpx;
}
	.playlist-name{
	  font-size: 26rpx;
	  line-height: 1.2;
	  padding: 2px 0 0 6px;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 2;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
</style>
 -->