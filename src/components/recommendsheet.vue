<template>
	<div class="recommendsheet">
		<recommend-title title="推荐歌单"></recommend-title>
		<div class="recommend">
			<div class="recommend-list" v-for="item in recommendSheet" @click="showSongSheet(item.id)">
				<div class="content">
					<img :src="item.picUrl">
					<span><i class="icon-erji"></i>&nbsp;{{playCount(item.playCount)}}</span>
				</div>
				<p>{{item.name}}</p>
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
		data(){
			return {}
		},
		computed: {
			recommendSheet(){
				return store.getters.getRecommendSheet
			}
		},
		components:{
			recommendTitle
		},
		methods:{
			playCount(num){
				return num >= 10000 ? Math.floor(num/10000)+'万' : num
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
		mounted(){
			axios.get('/api/personalized').then((res) => {
				store.dispatch('set_recommendsheet',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.recommendsheet{
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
					span{
						position: absolute;
						top: 4px;
						right: 6px;
						font-size: 12px;
						color: #fff;
					}
				}
				
				p{
					width: 100%;
					height: 38px;
					box-sizing: border-box;
					font-size: 12px;
					color: #333;
					line-height: 16px;
					padding: 3px 15px 3px 5px;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient:vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>