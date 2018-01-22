<template>
	<div class="searchresults" v-show="showSearchResult">
		<swiper :options="swiperOption" ref="myswiper">
			<swiper-slide :class="type == 'single' ? 'active' : ''">
				<p @click="choose('single')">单曲</p>
			</swiper-slide>
			<swiper-slide :class="type == 'album' ? 'active' : ''">
				<p @click="choose('album')">专辑</p>
			</swiper-slide>
			<swiper-slide :class="type == 'singer' ? 'active' : ''">
				<p @click="choose('singer')">歌手</p>
			</swiper-slide>
			<swiper-slide :class="type == 'songsheet' ? 'active' : ''">
				<p @click="choose('songsheet')">歌单</p>
			</swiper-slide>
			<swiper-slide :class="type == 'video' ? 'active' : ''">
				<p @click="choose('video')">视频</p>
			</swiper-slide>
			<swiper-slide :class="type == 'user' ? 'active' : ''">
				<p @click="choose('user')">用户</p>
			</swiper-slide>
			<swiper-slide :class="type == 'station' ? 'active' : ''">
				<p @click="choose('station')">电台</p>
			</swiper-slide>
		</swiper>
		<!-- 单曲 -->
		<search-single v-show="type == 'single'"></search-single>
		<!-- 专辑 -->
		<search-album v-show="type == 'album'"></search-album>
		<!-- 歌手 -->
		<search-singer v-show="type == 'singer'"></search-singer>
		<!-- 歌单 -->
		<search-songsheet v-show="type == 'songsheet'"></search-songsheet>
		<!-- 视频 -->
		<search-video v-show="type == 'video'"></search-video>
		<!-- 用户 -->
		<search-user v-show="type == 'user'"></search-user>
		<!-- 电台 -->
		<search-station v-show="type == 'station'"></search-station>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	import searchsingle from './single.vue'
	import searchalbum from './searchalbum.vue'
	import searchsinger from './searchsinger.vue'
	import searchsongsheet from './searchsongsheet.vue'
	import searchvideo from './searchvideo.vue'
	import searchuser from './searchuser.vue'
	import searchstation from './searchstation.vue'
	import store from '../store'

	export default{
		data(){
			return {
				swiperOption:{
					// notNextTick: true, 
					slidesPerView: 'auto'
				},
				typed: "single"
			}
		},
		components: {
			swiper,
			swiperSlide,
			'search-single': searchsingle,
			'search-album': searchalbum,
			'search-singer': searchsinger,
			'search-songsheet': searchsongsheet,
			'search-video': searchvideo,
			'search-user': searchuser,
			'search-station': searchstation
		},
		computed: {
			swiper(){
				this.$refs.myswiper.swiper
			},
			//是否显示本页面
			showSearchResult(){
				return store.getters.getIsShowSearchResult
			},
			type(){
				return this.typed
			}
		},
		methods: {
			choose(type){
				this.typed = type;
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	@import '../../node_modules/swiper/dist/css/swiper.css';

	.searchresults{
		height: calc(~"100% - 96px");
		background: rgba(225,225,225,0.35);
		.swiper-container{
			background: #fff;
			.swiper-wrapper{
				.swiper-slide{
					width: 22%;
					height: 36px;
					font-size: 14px;
					color: #333;
					line-height: 36px;
					text-align: center;
					box-sizing: border-box;
					&.active{
						border-bottom: 2px solid #C62F2F;
					}
				}
			}
		}
	}
</style>