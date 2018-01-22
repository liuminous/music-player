<template>
	<div class="header">
		<div class="header-wrapper">
			<i class="menu icon-menu" @click="showMenu"></i>
			<div class="centermenu">
				<router-link tag="i" to="/index/mymusic" :class="">
					<i class="music icon-music"></i>
				</router-link>
				<router-link tag="i" to="/index/findmusic">
					<i class="find icon-wangyi"></i>
				</router-link>
				<router-link tag="i" to="/index/findmusic">
					<i class="community icon-community"></i>
				</router-link>
			</div>
			<i class="search icon-search" @click="showSearch"></i>
			<!-- <router-view></router-view> -->
		</div>
	</div>
</template>

<script>
	import store from '../store';

	export default {
		methods:{
			showMenu(){
				store.dispatch({
					type: 'showSidebar'
				})
			},
			showSearch(){
				store.dispatch('set_showsearch',true)
			}
		}
	}
</script>

<style lang="less">
	@import '../common/less/common.less';
	.header{
		width: 100%;
		height:50px;
		background: @primarycolor;
		position: fixed;
		top:0;
		left:0;
		z-index: 1;
		.header-wrapper{
			width:100%;
			height: 100%;
			background: @primarycolor;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between; 
			.menu,.search{
				font-size: @font26;
				color: @white;
				padding: 10px 15px;
			}
			.centermenu{
				font-size: @font22;
				i{
					margin: 0 5px;
					color: @link-color;
					&.router-link-active{
						i{
							color:@white;
						}
					}
					.music{
						font-size: @font20;
					}
				}
			}
		}
	}
</style>