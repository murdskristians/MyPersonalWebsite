<template>
	<section class="canvas-wrap">
		<div class="canvas-content"></div>
		<div id="canvas" class="gradient"></div>		
	</section>	
</template>

<script>
export default {
	name: 'DynamicBackground',
	data () {
		return {
			publicPath: process.env.BASE_URL
		}
	}
}

</script>
<style>
	#canvas{
		width:100%;
		height:100%;
		overflow: hidden;
		position:fixed;
		top:0;
		left:0;
		background-color: #1a1724;
	}
	.canvas-wrap{
		z-index: 1;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

	}
	div.canvas-content{
		position:relative;
		z-index:2000;
		color:#fff;
		text-align:center;
		padding-top:30px;
	}
</style>

