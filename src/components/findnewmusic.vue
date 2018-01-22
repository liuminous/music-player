<template>
	<div class="findnewmusic">
		<swiper :options="swiperOption" ref="myswiper">
			<swiper-slide v-for="item in banner" :key="item.id">
				<div class="content">
					<img :src="item.pic">
					<p :style="{background:item.titleColor}">{{item.typeTitle}}</p>
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="recommend">
			<div class="recommend-type" @click="showMyFM">
				<i class="icon-fm"></i>
				<p>私人FM</p>
			</div>
			<div class="recommend-type" @click="showDayRecommend">
				<i class="icon-date"></i>
				<p>每日推荐</p>
			</div>
			<div class="recommend-type">
				<i class="icon-musicsheet" @click="showAllSheet"></i>
				<p>歌单</p>
			</div>
			<div class="recommend-type">
				<i class="icon-rank-list"></i>
				<p>排行榜</p>
			</div>
		</div>
		<recommend-sheet></recommend-sheet>
		<recommend-music></recommend-music>
		<recommend-station></recommend-station>
		<recommend-private></recommend-private>
		<recommend-video></recommend-video>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	import store from '../store'
	import recommendSheet from './recommendsheet.vue'
	import recommendMusic from './recommendmusic.vue'
	import recommendStation from './recommendstation.vue'
	import recommendPrivate from './recommendprivate'
	import recommendVideo from './recommendvideo'

	Vue.use(Vueaxios,axios);

	export default{
		data(){
			return {
				swiperOption:{
					notNextTick: true,  
					autoplay: 5000,
					slidesPerView: 1,
					loop: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
				},
				images:[
					{"src":"../../static/jj.jpg"},
					{"src":"../../static/zore.jpg"}
				]
			}
		},
		components: {
			swiper,
			swiperSlide,
			recommendSheet,
			recommendMusic,
			recommendStation,
			recommendPrivate,
			recommendVideo
		},
		computed: {
			//初始化swiper实例
			swiper(){
				return this.$refs.myswiper.swiper
			},
			//轮播图信息
			banner(){
				return store.getters.getBanner
			}
		},
		methods:{
			showMyFM(){
					if(store.getters.getMusicDetailType){
						axios.get('/api/personal_fm').then((res) => {
							store.dispatch('set_personalfm',res.data),
							store.dispatch('set_currentmusicindex',{index: 0,id: res.data.data[0].id})
						}).catch((err) =>{
							console.log(err)
						})
						store.dispatch('set_musicdetailtype',false)
					}
					store.commit('setShowMusicDetail',true)
				},
			showDayRecommend(){
				store.dispatch('set_newdayrecommend',true)
			},
			showAllSheet(){
				store.dispatch('set_recommendallsheet',true)
			}
		},
		mounted(){
			axios.get('/api/banner').then((res) => {
				store.dispatch('set_banner',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	@import '../../node_modules/swiper/dist/css/swiper.css';

	.findnewmusic{
		position: fixed;
		top: 86px;
		left: 0;
		right: 0;
		bottom: 46px;
		overflow-y: auto;
		overflow-x: hidden;
		.swiper-container{
			width: 100%;
			.swiper-wrapper{
				.swiper-slide{
					.content{
						position:relative;
						img{
							width: 100%;
						}
						p{
							position: absolute;
							right: 0;
							bottom: 10px;
							font-size: 12px;
							color: #fff;
							border-radius: 9px 0 0 9px;
							padding: 4px 10px;
						}
					}
				}
			}
			.swiper-pagination-bullet-active{
				background: #C62F2F;
			}
		}
		.recommend{
			width: 100%;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #ececec;
			.recommend-type{
				height: 100px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				i{
					width: 50px;
					height: 50px;
					font-size: 32px;
					color: #C62F2F;
					line-height: 50px;
					text-align: center;
					border: 1px solid #C62F2F;
					border-radius: 50%;
				}
				p{
					font-size: 12px;
					color: #666;
					margin-top: 8px;
				}
			}
		}
	}
</style>