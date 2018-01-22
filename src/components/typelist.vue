<template>
	<div class="type-list">
		<i class="icon" :class="icon_name"></i>
		<div class="typelist-detail" :class="{border: ishasborder}">
			<span class="name">{{list_name}}</span>
			<span class="count">({{music_count}})</span>
			<i v-if="isplaying" class="isplaying icon-volume-medium"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			count: {
				type:String,
				default: '1'
			},
			playing: {
				type: Boolean,
				default: false
			},
			hasborder: {
				type: Boolean,
				default: true
			}
		},
		data(){
			return{
				list_name: this.name,
				icon_name: this.icon,
				music_count: this.count,
				isplaying: this.playing,
				ishasborder: this.hasborder
			}
		}
	}
</script>

<style lang="less">
	.type-list{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #fff;
		position: relative;
		.icon{
			font-size: 20px;
			color: #c62f2f;
			position: absolute;
			top: 50%;
			left: 15px;
			transform: translateY(-50%);
		}
		.typelist-detail{
			width: 100%;
			height: 100%;
			margin-left: 50px;
			box-sizing: border-box;
			&.border{
				border-bottom: 1px solid #e1e1e1;
			}
			.name{
				font-size: 14px;
				color: #333;
			}
			.count{
				font-size: 12px;
				color: #999;
			}
			.isplaying{
				position: absolute;
				top: 50%;
				right: 15px;
				transform: translateY(-50%);
				font-size: 14px;
				color: #c62f2f;
			}
		}
	}
</style>