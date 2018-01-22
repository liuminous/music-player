<template>
	<transition name="showUpHideRight">
	<div class="songsheet" ref="songsheet" v-show="showSongSheet" @scroll="scrollEvent">
		<div class="songheader">
			<i class="icon-back" @click="hideSongSheet"></i>
			<div class="title">
				<p>歌单</p>
				<span v-show="isShowRecommend">编辑推荐：听着这些音乐仿佛我也要去执行任务了！</span>
			</div>
			<i class="icon-search"></i>
			<i class="icon-list-circle"></i>
			<div class="headbackground" ref="songheader" :style="{backgroundImage: 'url('+playList.coverImgUrl+')',backgroundSize: '5000%',backgroundPosition: 'center center'}"></div>
		</div>
		<div class="content">
			<div class="songsheet-information" ref="con" :style="{backgroundImage: 'url('+playList.coverImgUrl+')',backgroundSize: '5000%',backgroundPosition: 'center center'}">
				<div class="songsheet-disc">
					<div class="songsheetimg">
						<img :src="playList.coverImgUrl">
						<span class="info">i</span>
					</div>
					<div class="discriped">
						<p class="sheetname">{{playList.name}}</p>
						<div class="user" v-if="playList.creator">
							<img class="userimg" :src="playList.creator.avatarUrl">
							<p class="username">{{playList.creator.nickname}}</p>
							<i class="icon-right"></i>
						</div>
					</div>
				</div>
				<div class="function">
					<div class="list">
						<i class="icon-add-project"></i>
						<span class="disc">收藏</span>
					</div>
					<div class="list">
						<i class="icon-message"></i>
						<span class="disc">评论</span>
					</div>
					<div class="list">
						<i class="icon-share"></i>
						<span class="disc">分享</span>
					</div>
					<div class="list">
						<i class="icon-music"></i>
						<span class="disc">下载</span>
					</div>
				</div>
			</div>
			<div class="songsheet-content">
				<div class="songsheet-title">
					<div class="songinfo">
						<i class="icon-music"></i>
						<span class="playall">播放全部</span>
						<span class="count" v-if="playList.tracks">(共{{playList.tracks.length}}首)</span>
					</div>
					<div class="choosemore">
						<i class="icon-menu"></i>
						<span>多选</span>
					</div>
				</div>
				<songlist :items="playList.tracks" :playlistid="playList.id"></songlist>
			</div>
		</div>
		<bottom-bar></bottom-bar>
	</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import songlist from './songlist.vue';
	import bottombar from './bottombar.vue';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default {
		data(){
			return{
				isShow: false,
				isShowRecommend: false
			}
		},
		computed:{
			showSongSheet(){
				this.isShow = store.getters.getShowSongSheet ? true : false;
				return this.isShow;
			},
			playList(){
				return store.getters.getMusicSongSheet
			}
		},
		methods:{
			hideSongSheet(){
				store.commit({
					type: 'setShowSongSheet',
					isShow: false
				})
			},
			scrollEvent(){
				let opacity = this.$refs.songsheet.scrollTop / (this.$refs.con.offsetHeight - this.$refs.songheader.offsetHeight);
				if(opacity <= 1){
					this.$refs.songheader.style.opacity = opacity;
				}else{
					this.$refs.songheader.style.opacity = 1;
				}
			}
		},	
		components:{
			songlist,
			'bottom-bar': bottombar
		},
		watch: {
			isShow(New,Old){
				this.$refs.songsheet.scrollTop = 0
			}
		}
	}
</script>

<style lang="less">
	.songsheet{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 6;
		background: #fff;
		overflow: auto;
		opacity: 1;
		&.showUpHideRight-enter-active,&.showUpHideRight-leave-active{
			transition: all 0.8s;
		}
		&.showUpHideRight-enter{
			transform: translate3d(0,100%,0);
			opacity: 0;
		}
		&.showUpHideRight-leave-active{
			transform: translate3d(100%,0,0);
			opacity: 0;
		}
		.songheader{
			height: 50px;
			color: #fff;
			display: flex;
			align-items: center;
			padding: 0 10px;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
			i{
				width: 36px;
				height: 36px;
				flex: 0 0 36px;
				text-align: center;
				line-height: 36px;
				&.icon-back{
					font-size: 22px;
				}
				&.icon-search{
					font-size: 24px;
				}
				&.icon-list-circle{
					font-size: 23px;
				}
			}
			.headbackground{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
				opacity: 0;
			}
			.title{
				flex: 1 1 auto;
				padding: 0 5px;
				min-width: 180px;
				p{
					font-size: 16px;
					color: #fff;
				}
				span{
					width: 100%;
					font-size: 10px;
					color: rgba(255,255,255,.7);
					margin-top: 4px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					display:block;
				}
			}
		}
		.content{
			.songsheet-information{
				height: 155px;
				padding: 70px 25px 20px;
				.songsheet-disc{
					display: flex;
					.songsheetimg{
						width: 100px;
						height: 100px;
						flex: 0 0 auto;
						position: relative;
						img{
							width: 100px;
							height: 100px;
						}
						.info{
							position: absolute;
							right: 0;
							bottom: 0;
							width: 14px;
							height: 14px;
							color: #fff;
							font-size: 12px;
							line-height: 14px;
							text-align: center;
							background: rgba(0,0,0,0.7);
							border: 1px solid #fff;
							border-radius: 50%;
							display: block;
						}
					}
					.discriped{
						flex: 1 1 auto;
						color: #fff;
						padding-top: 10px;
						margin-left: 15px;
						.sheetname{
							height: 40px;
							font-size: 14px;
							line-height: 20px;
						}	
						.user{
							width: 100%;
							height: 30px;
							display: flex;
							align-items: center;
							.userimg{
								width: 20px;
								height: 20px;
								border-radius: 50%;
								display: block;
							}
							.username{								
								font-size: 12px;
								margin-left:4px;
							}
							i{
								width: 20px;
								height: 20px;
								font-size: 12px;
								line-height: 22px;
								text-align: center;
							}
						}
					}
				}
				.function{
					display: flex;
					height: 40px;
					margin-top: 15px;
					align-items: center;
					.list{
						flex: 1 1 auto;
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #fff;
						i{
							width: 28px;
							height: 28px;
							font-size: 18px;
							line-height: 28px;
							text-align: center;
							display: block;
							&.icon-share{
								font-size: 20px;
							}
						}
						.disc{
							font-size: 14px;
						}
					}
				}
			}
			.songsheet-content{
				.songsheet-title{
					height: 42px;
					line-height: 42px;
					position: relative;
					box-sizing: border-box;
					border-bottom: 1px solid #e9e9e9;
					.songinfo{
						font-size: 0;
						i{
							font-size: 16px;
							color: #666;
							vertical-align: middle;
							margin-left: 10px;
							margin-right: 5px;
						}
						.playall{
							font-size: 14px;
							color: #333;
							display: inline-block;
							vertical-align: middle;
						}
						.count{
							font-size: 12px;
							color: #999;
							display: inline-block;
							vertical-align: middle;
							margin-left: 5px;
						}
					}
					.choosemore{
						width: auto;
						height: 42px;
						padding: 0 10px;
						position: absolute;
						top: 0;
						right: 0;
						font-size: 0;
						i{
							font-size: 16px;
							color: #666;
							margin-right: 2px;
							vertical-align: middle;
						}
						span{
							font-size: 12px;
							color: #666;
							display: inline-block;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
</style>