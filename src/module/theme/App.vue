<template>

	<div class="root">
		<hide-data :img="Share.img" :title="Share.title"></hide-data>
		<iframe ref="iframe" :src="url" frameborder="0"></iframe>
		<float-ad></float-ad>
	</div>
</template>
<script>
	import {
		util
	} from 'common/js/index.js'

	import FloatAd from 'components/Floatad.vue'
	import HideData from 'components/HideData.vue'

	export default {
		data() {
			return {
				url: "",
				title: "",
				img: "",
				Share: {
					title: '安心云',
					img: ''
				}
			}
		},
		mounted() {
			this.getSearch()

		},
		methods: {
			getSearch() {
				let {
					title,
					url,
					img,
				} = util.getSearchParams()

				this.title = title
				this.img = img
				
				url = url.replace(/%3D/g, '=').replace(/%26/g, '&')
				
				this.url = url
				console.log(url) 

				this.setShare()
			},
			setShare() {
				this.Share = {
					title: this.title,
					img: this.img
				}
			}
		},
		components: {
			FloatAd,
			HideData
		}

	}
</script>
<style lang="scss" scoped>
	@import '../../common/scss/main.scss';
	iframe {
		position: fixed;
		width: 100%;
		height: 100%;
		height: calc(100% - 1.173333rem);
		border: 0;
	}
</style>