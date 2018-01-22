<template>
	<div class="recommendmusic">
		<recommend-title title="推荐音乐"></recommend-title>
		<div class="recommend">
			<div class="recommend-list" v-for="item in recommendMusic.slice(0,6)">
				<div class="content">
					<img :src="item.song.album.blurPicUrl">
				</div>
				<p class="name">{{item.name}}</p>
				<p class="singer" v-if="item.song.artists">{{item.song.artists[0].name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
 	import Vue from 'vue'
 	import axios from 'axios'
 	import Vueaxios from 'vue-axios'
 	import store from '../store'
 	import recommendTitle from './recommendtitle.vue'

 	Vue.use(Vueaxios,axios);

	export default{
		computed:{
			recommendMusic(){
				return store.getters.getRecommendMusic
			}
		},
		components: {
			recommendTitle
		},
		mounted(){
			axios.get('/api/personalized/newsong').then((res) => {
				store.dispatch('set_recommendmusic',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.recommendmusic{
		margin-top: 15px;
		.recommend{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.recommend-list{
				width: 33%;
				margin-top: 12px;
				.content{
					width: 100%;
					position: relative;
					img{
						width: 100%;
					}	
				}
				
				p{
					width: 100%;
					box-sizing: border-box;
					line-height: 16px;
					font-size: 12px;
					padding: 3px 15px 3px 5px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					&.name{
						color: #333;
					}
					&.singer{
						color: #999;
					}
				}
			}
		}
	}
</style>