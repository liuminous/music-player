<template>
	<div class="recommendtitle">
		<div class="title">
			<span>{{title}}</span>
			<i class="icon-right"></i>
		</div>
	</div>
</template>

<script>
	export default{
		props: { 
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less">
	.recommendtitle{
		.title{
			padding: 3px 0;
			span{
				display: inline-block;
				font-size: 16px;
				color: #333;
				vertical-align: middle;
				padding-left: 12px;
				position: relative;
				&:after{
					content: '';
					width: 3px;
					height: 100%;
					background: #C62F2F;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			i{	
				display: inline-block;
				font-size: 16px;
				color: #555;
				vertical-align: middle;
			}
		}
	}	
</style>