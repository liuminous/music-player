<template>
	<transition name="upRight">
		<div class="allsheet" v-show="isShow">
			<div class="allsheetheader">
				<i class="icon-back" @click="hideAllSheet"></i>
				<p>歌单</p>
			</div>

			<div class="highquality">
				<div class="filter" v-if="highqualitySheet[0]" :style="{backgroundImage: 'url('+highqualitySheet[0].coverImgUrl+')',backgroundSize: 'cover'}"></div>
				<div class="highqualitybg" @click="showHighqualitySheet">
					<div class="sheetPic">
						<img v-if="highqualitySheet[0]" :src="highqualitySheet[0].coverImgUrl">
					</div>	
					<div class="information">
						<p class="title"><i class="icon-collect"></i><span>精品歌单</span><i class="icon-right"></i></p>
						<p class="name" v-if="highqualitySheet[0]">{{highqualitySheet[0].name}}</p>
						<p class="description" v-if="highqualitySheet[0]">{{highqualitySheet[0].copywriter}}</p>
					</div>	
				</div>
			</div>

			<div class="allsheet-content">
				<div class="allsheet-title">
					<div class="allsheetinfo" @click="showSheetClassify">
						<span class="all">{{sheetClassify}}</span>
						<i class="icon-right"></i>
					</div>
					<div class="other">
						<span @click="choose($event)">华语</span>
						<span class="splice">|</span>
						<span @click="choose($event)">治愈</span>
						<span class="splice">|</span>
						<span @click="choose($event)">安静</span>
					</div>
				</div>
				<div class="playlists-wrap">
					<div class="playlists" v-for="item in allSheet" @click="showSongSheet(item.id)">
						<div class="sheetInfo">
							<img :src="item.coverImgUrl">
							<div class="mask"></div>
							<span class="playcount"><i class="icon-erji"></i>&nbsp;{{playCount(item.playCount)}}</span>
							<span class="collecter"><i class="icon-collect"></i>&nbsp;{{item.creator.nickname}}</span>
						</div>
						<p class="description">{{item.name}}</p>
					</div>		
				</div>
				<div class="loading" v-if="sheetLoading">
					<div class="load">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<p>加载中</p>
				</div>
			</div>

			<bottombar></bottombar>
		</div>
	</transition>
</template>

<script>
 	import Vue from 'vue'
 	import axios from 'axios'
 	import Vueaxios from 'vue-axios'
 	import store from '../store'
 	import bottombar from './bottombar.vue'

 	Vue.use(Vueaxios,axios);

	export default{
		computed: {
			isShow(){
				return store.getters.getShowAllSheet
			},
			allSheet(){
				return store.getters.getAllSheet
			},
			highqualitySheet(){
				return store.getters.getHighqualitySheet
			},
			sheetClassify(){
				return store.getters.getSheetClassify
			},
			sheetLoading(){
				return store.getters.getSheetLoading
			}
		},
		methods: {
			//隐藏全部歌单
			hideAllSheet(){
				store.dispatch('set_recommendallsheet',false)
			},
			//显示精品歌单
			showHighqualitySheet(){
				store.dispatch('set_showhighqualitysheet',true)
			},
			//显示歌单类型页
			showSheetClassify(){
				store.dispatch('set_showsheetclassify',true)
			},
			//选择歌单类型 本页的三个选项
			choose(event){
				let e = event || window.event;
				store.dispatch('set_sheetclassify',e.target.innerText)
			},
			//听歌数量
			playCount(num){
				return num > 200000 ? Math.floor(num / 10000)+'万' : num 
			},
			//显示歌单的歌曲列表
			showSongSheet(id){
				axios.get('/api/playlist/detail?id='+id).then((res) => {
			  		store.dispatch('music_songsheet',res.data)
			  	},(err) => {
			  		console.log(err)
			  	}),
			  	store.commit({
			  		type: 'setShowSongSheet',
			  		isShow: true
			  	})
			}
		},
		components: {
			bottombar
		},
		watch: {
			sheetClassify(New,Old){
				store.dispatch('set_allsheet',[])
				store.dispatch('set_sheetloading',true)
				axios.get('/api/top/playlist?cat='+New).then((res) => {
					store.dispatch('set_allsheet',res.data)
					if(res.data.code == 200){
						store.dispatch('set_sheetloading',false)
					}
				}).catch((err) => {
					console.log(err)
				})	
			}
		},
		mounted(){
			axios.get('/api/top/playlist').then((res) => {
				store.dispatch('set_allsheet',res.data)
			}).catch((err) => {
				console.log(err)
			}),
			axios.get('/api/top/playlist/highquality?limit=10').then((res) =>{
				store.dispatch('set_highqualitysheet',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.allsheet{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 4;
		overflow: auto;
		&.upRight-enter-active,&.upRight-leave-active{
			transition: transform 0.5s;
		}
		&.upRight-enter{
			transform: translate3d(0,100%,0);
		}
		&.upRight-leave-active{
			transform: translate3d(100%,0,0);
		}
		.allsheetheader{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 50px;
			background: #C62F2F;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			color: #fff;
			z-index: 1;
			i{
				width: 36px; 
				height: 36px;
				font-size: 22px;
				line-height: 36px;
				text-align: center;
			}
			p{
				flex: 1 1 auto;
				font-size: 18px;
				margin-left: 5px;
			}
		}
		.highquality{
			width: 100%;
			position: relative;
			.filter{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
				filter: blur(40px);
			}
			.highqualitybg{
				width: 100%;
				height: 130px;
				margin-top: 50px;
				box-sizing:  border-box;
				padding-left: 20px;
				display: flex;
				align-items: center;
				background: rgba(0,0,0,.4);
				.sheetPic{
					width: 80px;
					height: 80px;
					img{
						width: 100%;
					}
				}
				.information{
					flex: 1 1 auto;
					margin-left: 15px;
					display: flex;
					flex-direction: column;
					justify-conent: space-around;
					.title{
						font-size: 18px;
						color: #fff;
						span,i{
							vertical-align: middle;
						}
						.icon-right{
							color: rgba(255,255,255,0.6);
						}
						.icon-collect{
							margin-right: 4px;
							color: #fff000;
						}
					}
					.name{
						font-size: 14px;
						color: #fff;
						margin-top: 14px;
					}
					.description{
						font-size: 12px;
						color: rgba(255,255,255,0.5);
						margin-top:8px;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}	
			}
		}
		.allsheet-content{
			.allsheet-title{
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 15px;
				font-size: 0;
				color: #333;
				background: #fff;
				.allsheetinfo{
					padding: 6px 8px;
					border: 1px solid #ccc;
					border-radius: 14px;
					span,i{
						font-size: 14px;
						vertical-align: middle;
					}
				}
				.other{
					flex: 0 0 auto;
					span{
						font-size: 14px;
						color: #666;
						&.splice{
							margin: 0 8px;
							font-size: 14px;
						}
					}
				}
			}
			.playlists-wrap{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding-bottom: 46px;
				.playlists{
					width: 49.4%;
					margin-bottom: 12px;
					.sheetInfo{
						width: 100%;
						box-sizing: border-box;
						position: relative;
						z-index: 0;
						img{
							width: 100%;
						}
						.mask{
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,0) 50%,rgba(0,0,0,.3));
							z-index: 1;
						}
						.playcount{
							position: absolute;
							top: 0;
							right: 0;
							padding: 4px 8px 4px 16px;
							font-size: 12px;
							color: #fff;
							z-index: 2;
						}
						.collecter{
							position: absolute;
							left: 0;
							bottom: 6px;
							padding: 4px 6px;
							font-size: 12px;
							color: #fff;
							z-index: 2;
						}
					}
					.description{
						width: 100%;
						height: 38px;
						box-sizing: border-box;
						font-size: 12px;
						color: #333;
						line-height: 16px;
						padding: 3px 15px 3px 5px;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.loading{
				height: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 50px;
				.load{
					height: 10px;
					font-size: 0;
					padding-top:2px;
					margin-right: 4px;
					span{
						display: inline-block;
						width: 2px; 
						height: 10px;
						background: #C62F2F;
						margin-left: 2px;
						animation: loader 1s infinite;
						&:nth-of-type(1){
							animation-delay: 0.1s
						}
						&:nth-of-type(2){
							animation-delay: 0.2s
						}
						&:nth-of-type(3){
							animation-delay: 0.3s
						}
						&:nth-of-type(4){
							animation-delay: 0.4s
						}
					}
				}
				p{	
					height: 12px;
					font-size: 12px;
					color: #C62F2F;
				}
			}
		}
	}

	@keyframes loader{
		50%{ 
			height: 2px;
			margin-top: 8px;
		}
	}
</style>