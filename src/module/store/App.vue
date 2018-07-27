<template>
	<div class="root">
		<img class="absbgimg" :style="'background-image: url('+ avastr +')'" />
		<div class="root-card">
			<div class="root-card-header">
				<!--图片-->
				<div class="avastr" :style="'background-image: url('+ avastr +')'"></div>
				<!--名称-->
				<div class="nickname app-font-size-34 app-color-333333">{{store.name}}</div>
			</div>

			<div class="root-card-act app-font-size-26">
				<span class="root-card-act-icon" :class="{'root-card-act-icon-act': store.activity}" data-text="活"></span>

				<div class="app-ellipsis-2">
					{{store.activity || "暂无活动"}}
					<!--满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;满100减66;-->
				</div>

				<!--<span class="root-card-act-icon" data-text="减"></span>-->

			</div>
			<div class="app-font-size-24" style="text-align: left; border-bottom: 1px #ccc dashed; padding: .2rem;">
				商家电话: {{store.telphone}}
				<br /> 商家地址: {{store.address}}

			</div>

			<div class="root-card-body app-font-size-28">
				<div class="app-font-size-34 app-color-333333" style="margin: 0.8rem auto 0.48rem auto;">
					热销商品
				</div>
				<div class="room">
					<div class="item" v-for="o,i of goodslist">
						<div class="bgimg" :style="'background-image: url('+ _getImage(o) +')'">

						</div>
						<div class="app-ellipsis-1 app-font-size-28 app-color-333333">{{o.name}}</div>
					</div>
					<!--补位-->
					<div class="item" v-for="o,i of 3 - goodslist.length % 3">
						<div class="bgimg">

						</div>
						<div class="app-ellipsis-1 app-font-size-28 app-color-333333"></div>
					</div>

				</div>
			</div>
		</div>
		<float-ad></float-ad>
	</div>
</template>
<script>
	import {
		util
	} from 'common/js/index.js'

	import FloatAd from 'components/Floatad.vue'
	import HideData from 'components/HideData.vue'

	import ax from 'common/js/config/server.js'

	export default {
		data() {
			return {
				store: {
					name: "", // 店铺名称
					image1: "",
					image2: "",
					image3: "",
					telphone: "",
					address: "",
				},

				goodslist: [],

				id: -1,

				Share: {
					title: '安心云',
					img: ''
				}
			}
		},
		mounted() {
			this.getSearch()
			this.getData()
		},

		computed: {
			avastr() {
				return this._getImage(this.store)
			}
		},
		methods: {
			getSearch() {
				let {
					id
				} = util.getSearchParams()

				this.id = id

			},

			async getData() {
				var data = await ax.send("/store/" + this.id)
				console.log(data)
				Object.assign(this.store, data.store)
				Object.assign(this.goodslist, data.goodslist)
				
				
				this.setShare()

			},

			setShare() {
				this.Share = {
					title: this.store.name,
					img:  this._getImage(this.store)
				}
			},

			_getImage(o) {
				return o.image1 || o.image2 || o.image3
			},

		},
		components: {
			FloatAd,
			HideData
		}

	}
</script>
<style lang="scss" scoped>
	@import '../../common/scss/main.scss';
	.absbgimg {
		position: fixed;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		top: 0;
		z-index: -1;
		-webkit-filter: blur(10px);
		filter: blur(10px);
	}
	
	.root {
		&-card {
			padding: 0 0.346666rem;
			background-color: #FFFFFF;
			width: 8.933333rem;
			margin: 1.6rem auto 0 auto;
			border-radius: 5px;
			/*height: 1.333333rem;*/
			text-align: center;
			&-header {
				transform: translateY(-1.2rem);
				-webkit-transform: translateY(-1.2rem);
				display: inline-block;
				/*width: 2.4rem;*/
				.avastr {
					border: 10px solid #FFFFFF;
					/*background-color: red;*/
					background-size: cover;
					background-position: center;
					width: 2.4rem;
					height: 2.4rem;
					border-radius: 50%;
					margin: 0 auto;
				}
				.nickname {
					margin-top: 0.4rem;
				}
			}
			&-act {
				border-top: 1px dashed #ccc;
				border-bottom: 1px dashed #ccc;
				text-align: left;
				display: flex;
				display: -webkit-flex;
				padding: 0.48rem 0;
				/*position:relative; 
				
				&:before{
					
				}*/
				&-icon {
					position: relative;
					padding-right: 0.48rem;
					&-act:before {
						position: absolute;
						top: 0.06rem;
						content: attr(data-text);
						background-color: red;
						color: #FFFFFF;
						border-radius: 3px;
						text-align: center;
						padding: 0.04rem;
						max-height: 0.48rem;
						max-width: 0.48rem;
						line-height: 1;
					}
				}
				div {
					padding: 0 0.133333rem;
				}
			}
			&-body {
				margin-bottom: 1rem;
			}
		}
	}
	
	.room {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.item {
			margin-bottom: 0.693333rem;
			width: 2.533333rem;
			.bgimg {
				/*background-color: royalblue;*/
				width: 2.533333rem;
				height: 2.533333rem;
				margin-bottom: 0.32rem;
			}
		}
	}
</style>