<template>
	<div class="menulist" v-show="isShow">
		<transition name="fade">
			<div class="content" v-show="isShow">
				<p class="title">歌单：我喜欢的音乐</p>
				<div class="detail-list">
					<i class="icon-download download"></i>
					<p>下载</p>
				</div>
				<div class="detail-list">
					<i class="icon-share share"></i>
					<p>分享</p>
				</div>
				<div class="detail-list" v-show="type">
					<i class="icon-edit-paper edit"></i>
					<p>编辑歌单信息</p>
				</div>
				<div class="detail-list">
					<i class="icon-delete delete"></i>
					<p>删除</p>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" @click.stop="hiddenMenu" v-show="isShow"></div>
		</transition>
	</div>
</template>

<script>	
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default{
		computed: {
			isShow(){
				return store.getters.getIsShowMenu
			},
			type(){
				return store.getters.getMenuType == "create" ? true : false
			}
		},
		methods: {
			hiddenMenu(){
				store.commit({
					type: 'setShowMenu',
					obj: {
						isShow: false
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.menulist{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		.content{
			width: 100%;
			padding: 15px 0 10px;
			background: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;
			&.fade-enter-active,&.fade-leave-active{
				transition: transform 0.7s;
			}
			&.fade-enter,&.fade-leave-active{
				transform: translate3d(0,100%,0)
			}
			.title{
				width: 100%;
				height: 32px;
				box-sizing: border-box;
				padding: 0 15px;
				font-size: 14px;
				color: #2c3e50;
				line-height: 32px;
			}
			.detail-list{
				width: 100%;
				height: 48px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				i{	
					width: 48px;
					height: 48px;
					font-size: 20px;
					color: #c62f2f;
					line-height: 48px;
					text-align:center;
					flex: 0 0 auto;
					&.share{
						font-size: 23px;
					}
					&.edit{
						font-size: 17px;
					}
				}
				p{
					flex: 1 1 auto;
					height: 48px;
					line-height: 48px;
					font-size: 14px;
					color: #333;
					border-bottom: 1px solid #efefef;
				}
			}
		}
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,.5);
			z-index: 1;
			&.fade-enter-active,&.fade-leave-active{
				transition: opacity 0.7s;
			}
			&.fade-enter,&.fade-leave-active{
				opacity: 0; 
			}
		}
	}
</style>