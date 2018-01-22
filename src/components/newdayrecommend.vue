<template>
	<transition name="upRight">
		<div class="newdayrecommend" v-show="showDayRecommend">

			<div class="newdayheader">
				<i class="icon-back" @click="hideDayRecommend"></i>
				<p class="title">每日推荐</p>
				<i class="icon-help"></i>
			</div>

			<div class="instruction">
				<div class="filter">
					<div class="day">
						<i class="icon-date"></i>
						<span class="today">{{toDay}}</span>
					</div>
					<p class="refresh"><i class="icon-lightbulb"></i><span>根据你的音乐口味生成，每天6:00更新</span></p>	
				</div>
			</div>

			<div class="songsheet-content">
				<div class="songsheet-title">
					<div class="songinfo">
						<i class="icon-music"></i>
						<span class="playall">播放全部</span>
						<span class="count"</span>
					</div>
					<div class="choosemore">
						<i class="icon-menu"></i>
						<span>多选</span>
					</div>
				</div>
				<songlist :items="recommendSongs" :playlistid="0"></songlist>
			</div>

			<bottom-bar></bottom-bar>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import store from '../store'
	import songlist from './songlist.vue'
	import bottomBar from './bottombar.vue'

	Vue.use(Vueaxios,axios);

	export default{
		computed: {
			showDayRecommend(){
				return store.getters.getShowDayRecommend
			},
			toDay(){
				let time = new Date();
				return time.getDate();
			},
			recommendSongs(){
				return store.getters.getRecommendSongs
			}
		},
		methods: {
			hideDayRecommend(){
				store.dispatch('set_newdayrecommend',false)
			}
		},
		components: {
			songlist,
			bottomBar
		},
		mounted(){
			axios.get('/api/recommend/songs').then((res) => {
				store.dispatch('set_recommendsongs',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less"> 
	.newdayrecommend{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 4;
		background: #fff;
		overflow: auto;
		&.upRight-enter-active,&.upRight-leave-active{
			transition: all 0.5s;
		}
		&.upRight-enter{
			transform: scale(0);
			opacity: 0;
		}
		&.upRight-leave-active{
			transform: translate3d(100%,0,0);
		}
		.newdayheader{
			height: 50px;
			color: #fff;
			display: flex;
			align-items: center;
			padding: 0 10px;
			background: #C62F2F;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
			.icon-back,.icon-help{
				width: 36px;
				height: 36px;
				font-size: 24px;
				line-height: 36px;
				text-align: center;
			}
			.title{
				flex: 1 1 auto;
				font-size: 18px;
				margin-left: 5px;
			}
		}
		.instruction{
			width: 100%;
			height: 130px;
			margin-top: 50px;
			background-image: url(../assets/images/music.jpg);
			background-size: cover;
			background-position: center center;
			position: relative;
			.filter{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				box-sizing: border-box;
				padding: 25px 20px 20px;
				background-color: rgba(0,0,0,0.5);
				z-index: 0;
				.day{
					width: 60px;
					height: 60px;
					color: #fff;
					line-height: 60px;
					text-align: center;
					position: relative;
					i{
						font-size: 56px;
					}
					.today{
						font-size: 24px;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate3d(-50%,-40%,0);
					}
				}
				.refresh{
					margin-top: 5px;
					font-size: 14px;
					color: rgba(255,255,255,.8);
					i,span{
						vertical-align: middle;
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
</style>