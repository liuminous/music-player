<template>
	<div class="my-music">
		<type-list icon="icon-music" name="我的音乐" count="120" :playing="true"></type-list>
		<type-list icon="icon-zuijinplay" name="最近播放" count="36"></type-list>
		<type-list icon="icon-diantai" name="我的电台" count="3"></type-list>
		<type-list icon="icon-collect" name="我的收藏" count="14" :hasborder="false"></type-list>
		<musicsheet listtitle="我创建的歌单" :items="userCreateList" type="create"></musicsheet>
		<musicsheet listtitle="我收藏的歌单" :items="userCollectList" type="collect"></musicsheet>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import typelist from './typelist.vue';
	import musicsheet from './musicsheet.vue';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default {
		data(){
			return {
				
			}
		},
		components: {
			'type-list': typelist,
			'musicsheet': musicsheet
		},
		computed: {
			musicAllList(){
				return store.getters.getMusicAllList
			},
			userCreateList(){
				// return store.getters.getUesrCreateList
				const arr = [];
				store.getters.getMusicAllList.forEach((item) => {
					// if (!item.ordered) {
						if(item.creator.nickname == store.getters.getUserInfo.profile.nickname){
						arr.push(item);
					}
				})
				return arr;
			},
			userCollectList(){
				const arr = [];
				store.getters.getMusicAllList.forEach((item) => {
					// if(item.ordered){
						if(item.creator.nickname !== store.getters.getUserInfo.profile.nickname){
						arr.push(item);
					}
				})
			return arr;
			}
		}
	}
</script>

<style lang="less">
	.my-music{
		width: 100%;
		position: fixed;
		top: 50px;
		left: 0;
		bottom: 46px;
		overflow-y: auto;
		overflow-x:hidden;
		-webkit-overflow-srcolling: touch;
		z-index: 2;
	}
</style>