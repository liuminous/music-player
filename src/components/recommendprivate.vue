<template>
	<div class="recommendprivate">
		<recommend-title title="独家放送"></recommend-title>
		<div class="recommend">
			<div class="recommend-list" v-for="item in recommendPrivate">
				<div class="content" :style="{backgroundImage: 'url('+item.picUrl+')',backgroundPosition: 'center center',backgroundSize: 'cover'}">
					<span class="icon-videocam"></span>
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
			recommendPrivate(){
				// return store.getters.getRecommendPrivate
				let	Arrays = store.getters.getRecommendPrivate;
				let Array1 = Arrays.filter(function(arr){
					return arr.type == 24
				});
				let Array2 = Arrays.filter(function(arr){
					return arr.type != 24
				});
				return Array1.concat(Array2)
			}
		},
		components: {
			recommendTitle
		},
		mounted(){
			axios.get('/api/personalized/privatecontent').then((res) => {
				store.dispatch('set_recommendprivate',res.data)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="less">
	.recommendprivate{
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
					height: 0;
					padding-bottom: 60%;
					overflow:hidden;
					position: relative;
					span{
						position: absolute;
						top: 4px;
						left: 6px;
						width: 20px;
						height:20px;
						font-size: 12px;
						color: #fff;
						line-height: 20px;
						text-align: center;
						border: 1px solid #fff;
						border-radius: 50%;
					}
				}
				&:last-child{
					width: 100%;
					.content{
						width: 100%;
						height: 0;
						padding-bottom: 38%;
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