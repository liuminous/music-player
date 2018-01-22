<template>
	<div class="bottom-bar">
		<div class="music-info" @click="showMusicDetail">
			<img class="music-pic" :src="musicPic">
			<div class="music-detail">
				<p class="music-name">{{musicName}}</p>
				<p class="music-singer">{{musicSinger}}</p>
			</div>
		</div>
		<div class="playpause" @click="playpause">
			<canvas class="canvas" ref="canvas" width="26" height="26"></canvas>
			<i :class="isPlayPause? 'icon-pause':'icon-play'"></i>
		</div>
		<i class="music-list icon-list-music" v-if="musicDetailType" @click="showMenuList"></i>
		<i class="like icon-like" v-if="!musicDetailType" @click="isLike(musicId)" :class="islike ? 'active' : ''"></i>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default {
		data(){ 
			return{
				// img: require("../assets/images/jj.jpg"),
				// defaulturl: store.getters.getCurrentMusic.id
			}
		},
		computed:{
			//是否不是私人FM true： 不是 false： 是
			musicDetailType(){
				return store.getters.getMusicDetailType
			},
			isPlayPause(){
				return store.getters.getPlaying
			},
			//获取音乐的播放时间
			musicCurrentTime(){
				return store.getters.getCurrentTime
			},
			//获取当前正在播放音乐的歌名
			musicName(){
				// if(store.getters.getMusicDetailType){
				// 	return store.getters.getCurrentMusic ? store.getters.getCurrentMusic.name : ''
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.name : ''
				// }
				
				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? store.getters.getCurrentMusic.name : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.name : '')
			},
			//获取歌手
			musicSinger(){
				//是否是非私人FM  是否是每日推荐 if： 好理解
				// if(store.getters.getMusicDetailType){

				// 	if(store.getters.getCurrentMusic){
				// 		return store.getters.getCurrentMusic.ar ? store.getters.getCurrentMusic.ar[0].name : store.getters.getCurrentMusic.artists[0].name
				// 	}
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.artists[0].name : ''
				// }

				//三元嵌套格式
				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? (store.getters.getCurrentMusic.ar ? store.getters.getCurrentMusic.ar[0].name : store.getters.getCurrentMusic.artists[0].name) : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.artists[0].name : '')
			},
			//获取歌曲的图片
			musicPic(){
				// if(store.getters.getMusicDetailType){

				// 	if(store.getters.getCurrentMusic){
				// 		return store.getters.getCurrentMusic.al ? store.getters.getCurrentMusic.al.picUrl : store.getters.getCurrentMusic.album.picUrl
				// 	}
					
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.album.picUrl : ''
				// }

				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? (store.getters.getCurrentMusic.al ? store.getters.getCurrentMusic.al.picUrl : store.getters.getCurrentMusic.album.picUrl) : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.album.picUrl : '')
			},
			//当前歌词的id
			musicId(){
				// if(store.getters.getMusicDetailType){
				// 	return store.getters.getCurrentMusic ? store.getters.getCurrentMusic.id : ''
				// }else{
				// 	return store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.id : store.getters.getCurrentMusic.id
				// }

				return store.getters.getMusicDetailType ? (store.getters.getCurrentMusic ? store.getters.getCurrentMusic.id : '') : (store.getters.getFmCurrentMusic ? store.getters.getFmCurrentMusic.id : store.getters.getCurrentMusic.id)
			},
			ctx(){
				return this.$refs.canvas.getContext("2d")
			},
			//获取正在播放的音乐的时长
			duration(){
				return store.getters.getDuration
			},
			//私人fm音乐的喜欢状态
			islike(){
				return store.getters.getIsLike
			}
		},
		methods:{
			playpause(){
				store.commit('togglePlay')
			},
			//显示歌曲详情
			showMusicDetail(){
				store.commit('setShowMusicDetail',true)
			},
			//绘制播放按钮内圈
			insertCircle(){
				this.ctx.save();
				this.ctx.beginPath(); 
				this.ctx.arc(13,13,12,0,Math.PI*2,true);
				this.ctx.strokeStyle = "#aaa"; 
				this.ctx.stroke();
				this.ctx.closePath();
				this.ctx.restore();
			},
			//绘制播放按钮外圈
			wrapCircle(current){

				let ratio =  Math.floor(current) / Math.floor(store.getters.getDuration);

				this.ctx.save();
				this.ctx.beginPath();
				this.ctx.globalCompositeOperation = 'source-atop'; 
			    this.ctx.arc(13,13,12,Math.PI*3/2,Math.PI*3/2+ratio*(Math.PI*2),false);
			    this.ctx.strokeStyle = "#C62F2F";
			    this.ctx.stroke();
				this.ctx.closePath();
				this.ctx.restore();
			},
			//显示正在播放的音乐列表
			showMenuList(){
				store.commit('setMusicList',true),
				console.log('showMusicList')
			},
			isLike(id){
				store.dispatch('set_islike',id)
			}
		},
		watch:{
			musicCurrentTime(cur,old){
				this.ctx.clearRect(0,0,26,26);
				this.insertCircle();
				this.wrapCircle(cur);
			}
		},
		mounted(){
			this.insertCircle()
		}
	}	
</script>

<style lang="less">
	@import '../common/less/common.less';
	.bottom-bar{
		width: 100%;
		height: 46px;
		background: @white;
		padding: 5px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		box-shadow: 0 -1px 8px rgba(0,0,0,0.2);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		.music-info{
			flex: 1 1 auto;
			display: flex;
			height: 100%;
			.music-pic{
				flex: 0 0 auto;
				width: 36px;
				height: 36px;
			}
			.music-detail{
				flex: 1 1 auto;
				padding: 0 5px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.music-name{
					font-size: 14px;
				}
				.music-singer{
					font-size: 10px;
				}
			}
		}
		.playpause{
			width: 26px;
			height: 26px;
			flex: 0 0 auto;
			position: relative;
			.canvas{
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				background: #fff;
			}
			i{	
				width: 20px;
				font-size: 14px;
				color: #333;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				&.icon-play{
					transform: translate(-45%,-50%);
				}
				&.icon-pause{
					font-size: 18px;
					color: @primarycolor;
				}
			}
		}
		.music-list,.like{
			flex: 0 0 auto;
			width: 36px;
			height: 36px;
			font-size: @font26;
			color: #999;
			line-height: 36px;
			margin-left: 10px;
			display: block;
			&.active{
				color: @primarycolor;
			}
		}
	}
</style>