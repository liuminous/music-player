<template>
	<div class="musiclist" v-show="isShow">
		<transition name="fade">
			<div class="content" v-show="isShow">
				<div class="title">
					<div class="type">
						<i :class="PlayType.icon" @click="playType"></i>
						<span class="typename">{{PlayType.value}}</span>
						<span class="playcount" v-if="musicSheet">({{musicSheet.length}})</span>
					</div>
					<div class="set">
						<div class="collect">
							<i class="icon-add-project"></i>
							<span>收藏全部</span>
						</div>
						<div class="delete">
							<i class="icon-delete"></i>
						</div>
					</div>
				</div>
				<ul class="container" ref="container">
					<li v-for="(item,index) in musicSheet">
						<div class="intro" @click="playPause(index,item.id)">
							<i class="icon-volume-medium" v-show="index === CurrentIndex"></i>
							<span class="name">{{item.name}}</span>
							<span class="singer">- {{item.ar[0].name}}</span>
						</div>
						<i class="close icon-close"></i>
					</li>
				</ul>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" @click="hideMenuList" v-show="isShow"></div>
		</transition>
	</div>
</template>

<script>	
	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import store from '../store'

	export default{
		computed: {
			isShow(){
				return store.getters.getIsShowMenuList
			},
			musicSheet(){
				return store.getters.getMusicSheet.tracks
			},
			CurrentIndex(){
				return store.getters.getCurrentIndex
			},
			//设置播放类型的icon
			PlayType(){
				let type = store.getters.getPlayType;
				switch(type){
					case 1: 
						return {
							icon: "icon-music-danqu1",
							value: "单曲循环" 
						};
						break;
					case 2: 
						return {
							icon: "icon-music-shunxu",
							value: "顺序播放"
						};
						break;
					case 3:
						return {
							icon: "icon-music-random",
							value: "随机播放"
						};
						break;
				}
			}
		},
		methods:{
			hideMenuList(){
				store.commit('setMusicList',false)
			},
			playPause(index,id){
				if(index !== store.getters.getCurrentIndex){
					store.dispatch('set_currentmusicindex',{index,id})
				}else{
					store.commit('togglePlay')
				}
			},
			//切换播放类型
			playType(){
				let type = store.getters.getPlayType;
				store.commit('setPlayType',type)
			}

		},
		watch: {
			isShow(){
				this.$refs.container.scrollTop = 0
			}
		}
	}
</script>

<style lang="less">
	.musiclist{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		.content{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 300px;
			background: #fff;
			z-index: 8;
			&.fade-enter-active,&.fade-leave-active{
				transition: transform 0.7s;
			}
			&.fade-enter,&.fade-leave-active{
				transform: translate3d(0,100%,0);
			}
			.title{
				height: 50px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #eaeaea;
				.type{
					font-size: 0;
					padding: 0 10px;
					i{
						font-size: 18px;
						vertical-align: middle;
						color: #666;
						&.icon-music-random{
							font-size: 20px;
						}
						&.icon-music-danqu1{
							font-size: 16px;
						}
					}
					span{
						font-size: 14px;
						vertical-align: middle;
						color: #333;
					}
				}
				.set{
					display: flex;
					align-items: center;
					padding: 0 5px;
					.collect{
						font-size: 0;
						color: #666;
						margin-right: 6px;
						i{
							font-size: 16px;
							vertical-align: middle;
							margin-right: 4px;
						}
						span{
							font-size: 14px;
							vertical-align: middle;
						color: #333;
						}
					}
					.delete{
						width: 24px;
						height: 16px;
						text-align: center;
						font-size: 16px;
						color: #666;
						border-left: 1px solid #ccc;
					}
				}
			}
			.container{
				height: calc(~"100% - 50px");
				box-sizing: border-box;
				padding-left: 15px;
				margin-top: 4px;
				overflow: scroll;
				li{
					width: 100%;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #eaeaea;
					.intro{
						i{
							font-size: 14px;
							color: #c62f2f;
						}
						span{
							font-size: 14px;
							color: #666;
							&.name{
								color: #333;
							}
						}
					}
					.close{
						width: 36px;
						height:24px;
						font-size:16px;
						color: #666;
						text-align: center;
						line-height: 24px;
					}

				}
			}
		}
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,.5);
			z-index:7;
			&.fade-enter-active,&.fade-leave-active{
				transition: opacity 0.7s;
			}
			&.fade-enter,&.fade-leave-active{
				opacity: 0;
			}
		}
	}
</style>