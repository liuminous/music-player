<template>
	<div class="loading">
		<div class="load">
			<div class="child"></div>
			<div class="child"></div>
		</div>
	</div>
</template>
<!--  -->
<style lang="less">
	.loading{
		width: 40px;
		height: 40px;
		overflow: hidden;
		-webkit-mask: radial-gradient(transparent 15px,#000 16px);
		position:fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%,-50%,0);
		animation: rotate 1s linear infinite;
		.load{
			width: 40px;
			height: 40px;
			position:relative;
			.child{
				width: 40px;
				height: 40px;
				position: absolute;
				clip: rect(0,40px,40px,20px);
				&::after{
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					transform: rotate(180deg);
					clip: rect(0,20px,40px,0);
				}
				&:nth-of-type(1){
					transform: rotate(0);
					&::after{
						background: linear-gradient(to top,rgba(198,47,47,1),rgba(198,47,47,0.7));
						}
				}
				&:nth-of-type(2){
					transform: rotate(180deg);
					&::after{
						background: linear-gradient(to top,rgba(198,47,47,0.7),rgba(198,47,47,0));
					}
				}
			}
		}
	}

	@keyframes rotate{
		0%{
					transform: rotate(360deg);
				}
				50%{
					transform: rotate(180deg);
				}
				100%{
					transform: rotate(0deg);
				}
	}
</style>