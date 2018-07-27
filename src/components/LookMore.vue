<template>
    <div class="look-more app-font-size-28">  
    	<img src="../../static/img/axy_logo.png" style="border: 1px solid #CCC; border-radius: 3px;"/>
    	<a-d>
    		<span class="app-font-size-12 app-color-main">更多内容尽在安心云App客户端~</span>	
    	</a-d>
    	
    </div>
</template>



<script>
	
	import AD from './AD.vue' 
	
    export default {
		data(){
			return {}
		},
		methods:{},
		components:{AD}
    }

</script>

<style lang="scss" scoped>
	@import "../common/scss/main.scss";
    .look-more{
    	text-align: center;
    	padding: 1rem;
    	img{
    		width: .6rem;
    		vertical-align: middle;
    	}
    }
</style>
