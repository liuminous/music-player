<template>
	<div class="musicsheet">
		<div class="title" @click="toggle()">
			<i class="toggle icon-down" ref="toggleicon"></i>
			<div class="detail">
				<span class="name">{{listtitle}}</span>
				<span class="count">({{items.length}})</span>
				<i class="set icon-setting"></i>
			</div>
		</div>
		<div class="content" v-for="item in items" v-show="isShow" @click="showSongSheet(item.id)">
			<img class="sheetimg" :src="item.coverImgUrl">
			<div class="detail border">
				<p class="name">{{replaces(item.name)}}</p>
				<p class="count" v-show="type=='create'">{{item.trackCount}}首歌曲</p>
				<p class="count" v-show="type=='collect'">{{item.trackCount}}首歌曲 by {{item.creator.nickname}}</p>
				<i class="setting icon-list-circle" @click.stop="showMenu"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import Vueaxios from 'vue-axios';
	import store from '../store';

	Vue.use(Vueaxios,axios);

	export default {
		data(){
			return{
				isShow: true
			}
		},
		props: {
			listtitle: {
				type: String,
				default: ''
			},
			items: {
				type: Array,
				default: []
			},
			type:{
				type: String,
				default: ''
			}
		},
		methods:{
			//歌单的三角箭头转换
			toggle(){
				this.$refs.toggleicon.style.transform = this.isShow ? 'rotate(-90deg) translate3d(50%,0,0)':'rotate(0) translate3d(0,-50%,0)';
				console.log(this.isShow);
				this.isShow = !this.isShow;
			},
			//把用户名替换成我
			replaces(string){
				let userName = store.getters.getUserInfo.profile.nickname;
				return string.replace(new RegExp(userName),'我')
			},
			//显示歌单歌曲列表
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
			},
			//显示歌单设置菜单
			showMenu(){
				store.commit({
					type: 'setShowMenu',
					obj: {
						isShow: true,
						menuType: this.type
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.musicsheet{
		height:auto;
		width:100%;
		.title{
			background: #e1e1e1;
			position: relative;
			.toggle{
				font-size: 14px;
				color: #666;
				position: absolute;
				top: 50%;
				left: 10px;
				transition: 0.5s;
				transform: translate3d(0,-50%,0);
			}
			.detail{
				margin-left: 34px;
				color: #666;
				position: relative;
				.name,.count{
					font-size: 12px;
					line-height: 28px;
					display: inline-block;
				}
				.set{
					width: 28px;
					height: 28px;
					font-size: 16px;
					color: #666;
					line-height: 28px;
					text-align: center;
					position: absolute;
					top: 0;
					right: 10px;
					display: block;
				}
			}
		}
		.content{
			width: 100%;
			height: 60px;
			background: #fff;
			box-sizing:border-box;
			display:flex;
			.sheetimg{
				width: 50px;
				height: 50px;
				margin: 5px;
				flex: 0 0 auto;
			}
			.detail{
				margin-left: 5px;
				box-sizing: border-box;
				flex: 1 1 auto;
				position: relative;
				&.border{
					border-bottom: 1px solid #e1e1e1;
				}
				.name,.count{
					width: 80%;
					height: 25px;
					line-height: 25px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}
				.name{
					font-size: 14px;
					color: #333;
					margin-top:5px;
				}
				.count{
					font-size: 12px;
					color: #666;
					margin-bottom:5px;
				}
				.setting{
					position: absolute;
					width: 36px;
					height:36px;
					font-size: 18px;
					line-height: 36px;
					text-align: center;
					color: #999;
					top: 12px;
					right: 5px;
				}
			}
		}
	}
</style>