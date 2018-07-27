<template>

	<div class="root">
		<hide-data :img="Share.img" :title="Share.title"></hide-data>

		<div class="root-card">
			<img class="avastr" :src="avastr" />
			<div class="app-font-size-32 app-color-333333" style="margin: 0.5rem 0;">{{title}}</div>
			<div class="app-font-size-28 app-color-gray" style="margin: 0.5rem 0;">TA的邀请码：<span class="app-color-main" style="text-decoration: underline;">{{code}}</span></div>
			<a-d>
				<button type="button" class="mui-btn app-btn-main">一键加入</button>
			</a-d>

			<div class="tips app-font-size-28 app-color-gray" style="text-align: left; padding: 0.266666rem;">
				<br/> 操作步骤：
				<br/>
				<br/> 1.打开安心云App,注册成为安心云会员（已有帐号直接登录）
				<br/>
				<br/> 2.添加设备时选择“连接家人的摄像机”
				<br/>
				<br/> 3.输入邀请码,完成后即表示加入成功
			</div>
		</div>

		<!--<float-ad></float-ad>-->
	</div>
</template>
<script>
	import {
		util
	} from 'common/js/index.js'

	//import FloatAd from 'components/Floatad.vue'
	import HideData from 'components/HideData.vue'
	import AD from 'components/AD.vue'

	import ax from 'common/js/config/server.js'

	export default {
		data() {
			return {
				account: "",
				code: "",
				devName: "",
				Share: {
					title: '安心云',
					img: ''
				},

				user: {
					"id": -1,
					"account": "",
					"nickname": "",
					"headimgurl": "",
				},
			}
		},
		computed: {
			title() {
				let name = this.fixName(this.devName)
				let nickname = this.user.nickname || this.hideTel
				return `${nickname}邀请你一起观看TA的"${name}"`
			},
			hideTel() {
				var tel = this.account
				return tel.substr(0, 3) + '****' + tel.substr(7);
			},
			avastr(){
				return this.user.headimgurl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACxCAYAAACLKVzFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCOEE4OUU5RTkwRDExRTdCRTIyRTI2RkFGQzg5QzQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCOEE4OUVBRTkwRDExRTdCRTIyRTI2RkFGQzg5QzQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI4QTg5RTdFOTBEMTFFN0JFMjJFMjZGQUZDODlDNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI4QTg5RThFOTBEMTFFN0JFMjJFMjZGQUZDODlDNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ogvk1AAAUtklEQVR42uyd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";
			}
		},

		mounted() {
			this.getSearch()

			this.getData()

		},
		methods: {
			getSearch() {
				let {
					location,
					devid,
					code,
					account
				} = util.getSearchParams()

				this.account = account;
				this.devName = decodeURI(location || devid || "摄像机");
				this.code = code || "19951022";

			},

			async getData() {
				try {
					var data = await ax.send("/user/null/" + this.account)

					this.user = data.user

					console.log(data.user)

				} catch(err) {

					console.log(err.data.message)

				}

				this.setShare()
			},

			setShare() {
				this.Share = {
					title: this.title,
					img: this.user.headimgurl
				}
			},
			fixName(name) {
				if(!name) {
					return ""
				}
				return name.replace(/<[^<]*>/gi, "");
			}
		},
		components: {
			//FloatAd,
			AD,
			HideData
		}

	}
</script>
<style lang="scss" scoped>
	@import '../../common/scss/main.scss';
	.root-card {
		background-color: white;
		margin: 0.4rem;
		box-shadow: 0 0 3px #C8C7CC;
		text-align: center;
		padding: 1rem .5rem;
		img.avastr {
			width: 2.4rem;
			height: 2.4rem;
			border-radius: 50%;
			margin: 0 auto;
		}
	}
	
	.app-btn-main {
		height: 1.173333rem;
		width: 8rem;
	}
</style>