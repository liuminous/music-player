<template>
	<div class="single">
		<div class="bestmatch" v-if="JSON.stringify(bestMatch) !== '{}' && bestMatch.orders.length != 0">
			<p class="title">最佳匹配</p>
			<div class="singer" v-if="bestMatch.artist">
				<img :src="bestMatch.artist[0].picUrl">
				<p>歌手: <span v-html="highLight(bestMatch.artist[0].name)"></span><span v-html="highLight(alias)"></span></p>
			</div>
			<div class="album" v-if="bestMatch.album">
				<img :src="bestMatch.album[0].blurPicUrl">
				<div class="albuminfo">
					<p class="albumtitle">专辑: <span v-html="highLight(bestMatch.album[0].name)"></span></p>
					<p class="artistname" v-html="highLight(bestMatch.album[0].artist.name)"></p>
				</div>
			</div>
			<div class="video" v-if="bestMatch.video">
				<div class="videocover">
					<img :src="bestMatch.video[0].coverUrl">
					<span></span>
				</div>
				<div class="videoinfo">
					<div class="videotitle">
						<p class="mv">MV</p>
						<p class="videoname">视频: <span v-html="highLight(bestMatch.video[0].title)"></span></p>
					</div>
					<p class="videoartist" v-html="highLight(bestMatch.video[0].creator[0].userName)"></p>
				</div>
			</div>
		</div>
		<div class="allsingle">
			<div class="singlelist" v-for="item in searchResult">
				<div class="singletitle">
					<p class="name" ref="light" v-html="highLight(item.name)"></p>
					<div class="mv" v-if="item.mvid !== 0"><span></span><p>MV</p></div>
				</div>
				<p class="creator"><span v-html="highLight(item.artists[0].name)"></span> - <span v-html="highLight(item.album.name)"></span></p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import store from '../store'

	export default{
		computed: {
			keywords(){
				return store.getters.getKeywords
			},
			bestMatch(){
				return store.getters.getBestMatch
			},
			alias(){
				return store.getters.getBestMatch.artist[0].alias.length != 0 ? "("+store.getters.getBestMatch.artist[0].alias[0]+")" : ''
			},
			searchResult(){
				return store.getters.getSearchResult
			}
		},
		methods: {
			//关键字高亮显示
			highLight(key){
				let reg = new RegExp(store.getters.getKeywords,'g');
				return key.replace(reg,'<span class="blue">'+store.getters.getKeywords+'</span>');
			}
		}
	}
</script>

<style lang="less">
	.single{
		padding: 0 10px;
		height: calc(~"100% - 36px");
		box-sizing: border-box;
		overflow-y: auto;
		.blue{
			color: #6074df;
		}
		.bestmatch{
			margin-top: 6px;
			.title{
				font-size: 14px;
				color: #777;
				line-height: 28px;
			}
			.singer{
				display: flex;
				align-items: center;
				padding: 4px 0;
				border-bottom: 1px solid #eaeaea;
				img{
					width: 48px;height: 48px;
				}
				p{
					flex: 1 1 auto;
					font-size: 16px;
					color: #333;
					margin-left: 10px;
				}
			}
			.album{
				display: flex;
				align-items: center;
				padding: 4px 0;
				border-bottom: 1px solid #eaeaea;
				img{
					width: 48px;height: 48px;
				}
				.albuminfo{
					flex: 1 1 auto;
					margin-left: 10px;
					.albumtitle{
						font-size: 16px;
						color: #333;
					}
					.artistname{
						font-size: 12px;
						color: #999;
						margin-top: 6px;
					}
				}
			}
			.video{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 4px 0;
				border-bottom: 1px solid #eaeaea;
				.videocover{
					width: auto;
					height: 48px;
					position: relative;
					img{
						width: auto;
						height: 48px;
						display:block;
					}
					span{
						width: 24px;
						height: 24px;
						border: 1px solid #fff;
						border-radius: 50%;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate3d(-50%,-50%,0);
						&:after{
							content: '';
							width: 0;
							height: 0;
							border-top: 6px solid transparent;
							border-bottom: 6px solid transparent;
							border-left: 12px solid #efefef;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate3d(-4px,-50%,0);
						}
					}
				}
				.videoinfo{
					flex: 1 1 auto;
					margin-left: 10px;
					.videotitle{
						display: flex;
						align-items: center;
						.mv{
							font-size: 12px;
							color: #C62F2F;
							padding: 2px 4px;
							border: 1px solid #C62F2F;
							transform: scale(0.8);
						}
						.videoname{
							font-size: 16px;
							color: #333;
						}
					}
					.videoartist{
						font-size: 14px;
						color: #999;
						margin-top: 4px;
					}
				}
			}
		}
		.allsingle{
			.singlelist{
				height:48px;
				border-bottom: 1px solid #eaeaea;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.singletitle{
					display: flex;
					align-items: center;
					height: 20px;
					.name{
						font-size: 14px;
						color: #333;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.mv{
						display: flex;
						align-items: center;
						padding: 4px 6px;
						border: 1px solid #C62F2F;
						border-radius: 5px;
						transform: scale(0.5) translate3d(-50%,0,0);
						margin-left: 4px;
						span{
							width: 0;
							height: 0;
							border-top: 6px solid transparent;
							border-bottom: 6px solid transparent;
							border-left: 12px solid #C62F2F;
						}
						p{
							font-size: 16px;
							color: #C62F2F;
						}
					}
				}
				.creator{
					height: 20px;
					line-height: 20px;
					font-size: 12px; 
					color: #999;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>