<template>
	<div class="findmusic">
		<div class="find-menu">
			<router-link class="find-list" tag="div" to="/index/findmusic/findnewmusic">
				<p class="music">音乐</p>
			</router-link>
			<router-link class="find-list" tag="div" to="/index/findmusic/findvideo">
				<p class="video">视频</p>
			</router-link>
			<router-link class="find-list" tag="div" to="/index/findmusic/findstation">
				<p class="station">电台</p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import findnewmusic from './findnewmusic'
	import findvideo from './findvideo'
	import findstation from './findstation'

	export default{
		components: {
			findnewmusic,
			findvideo,
			findstation
		}
	}
</script>

<style lang="less">
	.findmusic{
		position: fixed;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 46px;
		.find-menu{
			position: fixed;
			top: 50px;
			left: 0;
			width: 100%;
			height: 36px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.find-list{
				flex: 1 1 auto;
				height: 36px;
				font-size: 14px;
				color: #333;
				line-height: 36px;
				text-align: center;
				&.router-link-active{
					position: relative;
				}
				&.router-link-active:after{
					content:'';
					width: 60%;
					height: 2px;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translate3d(-50%,0,0);
					background: #C62F2F;
				}
			}
		}
	}
</style>