<template>
	<span class="split" ref="split"></span>
</template>

<script>
	export default {
		props: {
			background: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: "10"
			},
			border: {
				type: String,
				default: ''
			}
		},
		mounted(){
			this.$refs.split.style.background = this.background,
			this.$refs.split.style.height = `${this.height}px`,
			this.$refs.split.style.borderColor = this.border
		}
	}
</script>

<style lang="less">
	.split{
		width: 100%;
		box-sizing: border-box;
		display: block;
		border-top-width: 1px;
		border-top-style: solid;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
</style>