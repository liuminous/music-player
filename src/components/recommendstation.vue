<template>
	<div class="recommendstation">
		<recommend-title title="推荐电台"></recommend-title>
		<div class="recommend">
			<div class="recommend-list" v-for="item in recommendStation">
				<div class="content">
					<img :src="item.picUrl">
				</div>
				<p class="name">{{item.name}}</p>
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
			recommendStation(){
				return store.getters.getRecommendStation
			}
		},
		components: {
			recommendTitle
		},
		mounted(){
			axios.get('/api/personalized/djprogram').then((res) => {
				store.dispatch('set_recommendstation',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.recommendstation{
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
					line-height: 32px;
					box-sizing: border-box;
					line-height: 16px;
					font-size: 12px;
					padding: 3px 15px 3px 5px;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient:vertical;
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