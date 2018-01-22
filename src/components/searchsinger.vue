<template>
	<div class="searchsinger">
		<div class="list" v-for="item in searchSinger">
			<img :src="item.img1v1Url">
			<div class="info">
				<p class="singer">{{item.name}}</p>
				<p class="enter" v-if="item.accountId">
					<i class="icon-friend"></i>
					<span>已入驻</span>
				</p>
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
		computed:{
			searchSinger(){
				return store.getters.getSearchSinger
			}
		},
		mounted(){
			
		}
	}	
</script>

<style lang="less">
	.searchsinger{
		padding: 0 10px;
		height: calc(~"100% - 36px");
		box-sizing: border-box;
		overflow-y: auto;
		.list{
			height: 56px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			img{
				width: 48px;
				height: 48px;
			}
			.info{
				height: 56px;
				flex: 1 1 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #eaeaea;
				margin-left: 10px;
				.singer{
					font-size: 16px;
					color: #333;
				}
				.enter{
					i{
						width: 16px;
						height: 16px;
						font-size: 12px;
						color: #fff;
						line-height: 16px;
						text-align: center;
						background: #C62F2F;
						border-radius: 50%;
						display: inline-block;
					}
					span{
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>