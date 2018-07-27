<template>
	<div id='wx_pic'>
		<img :src="img || '../static/img/axy_logo.png'"/>
	</div>

</template>
<script>
	import { DOWN_URL } from 'common/js/config/config.js'
	export default {
		data() {
			return {

			}
		},
		props: {
			img: {
				default: '../static/img/axy_logo.png',
				type: String
			},
			title: {
				default: '安心云',
				type: String
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {

		},
		watch: {
			title() {
				document.title = decodeURI(this.title)  
				document.querySelector('meta[name=Keywords]').setAttribute('content', this.title)
				document.querySelector('meta[name=Description]').setAttribute('content', this.title)
			}
		}

	}
</script>

<style lang="scss" scoped>
	#wx_pic {
		position: absolute;
		width: 0;
		height: 0;
		z-index: -1;
		opacity: 0;
	}
</style>