<template>
	<div class="songlists">
		<div class="songlist" v-for="(item,index) in items" @click="playMusic(index,item.id)">
			<div class="songwrap">
				<div class="listindex">
				<span class="index">{{index+1}}</span>
					<i class="icon-volume-medium"></i>
				</div>
				<div class="songinfo">
					<div class="detail">
						<p class="songname">{{item.name}}</p>
						<p class="singer" v-if="item.ar">{{item.ar[0].name}}</p>
						<p class="singer" v-if="item.artists">{{item.artists[0].name}}</p>
					</div>
				</div>
			</div>
			<i class="setting icon-list-circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default {
		props: {
			items: {
				type: Array,
				default: function(){
					return []
				}
			},
			playlistid:{
				type: Number,
				default: 0
			}
		},
		methods: {
			playMusic(index,id){
				if(index !== store.getters.getCurrentIndex){
					store.dispatch('set_currentmusicindex',{index,id})
				}else{
					store.commit('togglePlay')
				}
				if( this.playlistid != 0 ){
					axios.get('/api/playlist/detail?id='+this.playlistid).then((res) => {
				  		store.dispatch('play_musicsongsheet',res.data),
						store.dispatch('set_musicdetailtype',true)
				  	},(err) => {
				  		console.log(err)
				  	})
				}else{
					store.dispatch('play_recommendsongs',store.getters.getRecommendSongs),
					store.dispatch('set_musicdetailtype',true)
				}
			}
		}
	}
</script>

<style lang="less">
	 .songlists{
	 	padding-bottom: 46px;
	 	.songlist{
	 		height: 54px;
	 		position: relative;
	 		.songwrap{
	 			display: flex;
	 			.listindex{
	 				width: 54px;
	 				height: 54px;
	 				flex: 0 0 54px;
	 				.index{
	 					width: 54px;
	 					height: 54px;
	 					font-size: 16px;
	 					color: #bababa;
	 					line-height: 54px;
	 					text-align: center;
	 					display: block;
	 				}
	 				i{
	 					width: 54px;
	 					height: 54px;
	 					font-size: 16px;
	 					color: #666;
	 					line-height: 54px;
	 					text-align: center;
	 					display: none;
	 				}
	 			}
	 			.songinfo{
	 				flex: 1 1 auto;
	 				height: 54px;
	 				max-width: calc(~"100% - 54px");
	 				box-sizing: border-box;
	 				border-bottom: 1px solid #e9e9e9;
	 				.detail{
	 					width: auto;
	 					height: 54px;
	 					padding: 5px;
	 					box-sizing: border-box;
	 					display: flex;
	 					flex-direction: column;
	 					justify-content: space-around;
	 					max-width: calc(~"100% - 54px");
		 				.songname{
		 					font-size: 14px;
		 					color: #333;
		 					padding: 2px 0;
		 				}
		 				.singer{
		 					font-size: 12px;
		 					color: #aaa;
		 					padding: 2px 0;
		 				}
		 			}
	 			}
	 		}
	 		.setting{
	 			position: absolute;
	 			top: 0;
	 			right: 0;
	 			width: 54px;
	 			height: 54px;
	 			font-size: 16px;
	 			color: #aaa;
	 			line-height: 54px;
	 			text-align: center;
	 		}
	 	}
	 }
</style>