<template>
	<a @tap='onTap' :href="openurl" target="_self" style="">
		<slot></slot>
	</a>
</template>
<script>
	import { DOWN_URL, SCHEME, HOST, PACKAGE_NAME } from 'common/js/config/config.js'

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
		methods: {
			isAndroid() {
				return(/Android/.test(navigator.userAgent)) ? true : false
			},
			goDown() {
				window.location.href = this.getDownUrl()
			},
			getOpenUrl() {
				return SCHEME + "://" + HOST + window.location.search
			},
			getDownUrl() {
				
				return "http://a.app.qq.com/o/simple.jsp?pkgname="+PACKAGE_NAME;
				
				return DOWN_URL + window.location.search
			},

			onTap() {
				if(this.isAndroid()) {
					document.body.innerHTML += "<iframe src='" + this.getOpenUrl() + "' style='display:none;opacity:0;' target='' ></iframe>"
					setTimeout(() => {
						this.goDown()
					}, 600)
				} else {
					window.location.href = this.getOpenUrl()
					setTimeout(() => {
						this.goDown()
					}, 1000)
				}
			}
		}

	}
</script>