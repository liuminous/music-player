<template>
	<div class="sidelist">
		<i class="icon" :class="side_iconclass"></i>
		<span class="title">{{side_title}}</span>
		<span class="disc" v-show="isShowDisc">{{side_disc}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			iconclass: {
				type: String,
				default: ''
			},
			sidetitle: {
				type: String,
				default: ''
			},
			disc: {
				type: String,
				default: ''
			}
		},
		data(){
			return{
				side_iconclass: this.iconclass,
				side_title: this.sidetitle,
				side_disc: this.disc
			}
		},
		computed: {
			isShowDisc(){
				return this.side_disc.length
			}
		}
	}
</script>

<style lang="less">
	.sidelist{
		width: 100%;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		padding: 0 15px;
		position: relative;
		.icon,.title{
			display: inline-block;
			vertical-align: middle;
		}
		.icon{
			font-size: 16px;
			color: #9a9a9a;
			margin-right: 6px;
		}
		.title{
			font-size: 14px;
			color: #333;
		}
		.disc{
			font-size: 12px;
			color: #c9c9c9;
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translate(0,-50%);
		}

	}	
</style>