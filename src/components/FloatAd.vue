<template>
	<a-d class="root">
		<div>
			<a class="app-font-size-32">点击进入安心云App</a>
		</div>
	</a-d>
</template>
<script>
	import { DOWN_URL } from 'common/js/config/config.js'
	import AD from './AD.vue'
	export default {
		data() {
			return {

			}
		},
		computed: {
			openurl() {
				return this.getOpenUrl()
			}
		},
		mounted() {

		},
		methods: {},
		components: {
			AD
		}

	}
</script>

<style lang="scss" scoped>
	.root {
		/*box-shadow: 0 -2px 10px #A1A2B3;*/
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.173333rem;
		background-color: #06c1ae;
		z-index: 10;
		div {
			text-align: center;
			a {
				color: #FFFFFF;
				line-height: 1.173333rem;
			}
		}
	}
</style>