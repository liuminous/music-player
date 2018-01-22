<template>
	<div class="recommendvideo">
		<recommend-title title="推荐MV"></recommend-title>
		<div class="recommend">
			<div class="recommend-list" v-for="item in recommendVideo">
				<div class="content">
					<img :src="item.picUrl">
					<span><i class="icon-videocam"></i> {{playCount(item.playCount)}}</span>
				</div>
				<p class="name">{{item.name}}</p>
				<p class="singer">{{item.artistName}}</p>
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
			recommendVideo(){
				return store.getters.getRecommendVideo
			}
		},
		components: {
			recommendTitle
		},
		methods:{
			playCount(num){
				return num >= 100000 ? Math.floor(num/100000)+'万' : num
			}
		},
		mounted(){
			axios.get('/api/personalized/mv').then((res) => {
				store.dispatch('set_recommendvideo',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.recommendvideo{
		margin-top: 15px;
		.recommend{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.recommend-list{
				width: 49.7%;
				margin-top: 12px;
				.content{
					width: 100%;
					position: relative;
					img{
						width: 100%;
					}
					span{
						position: absolute;
						top: 5px;
						right: 6px;
						font-size: 12px;
						color: #fff;
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