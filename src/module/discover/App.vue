<template>
	<div class="root">
		<hide-data :img="Share.img" :title="Share.title"></hide-data>

		<div id="slider" class="mui-slider">
			<div class="mui-slider-group mui-slider-loop">
				<div class="mui-slider-item mui-slider-item-duplicate" :style="'background-image: url('+ imgLast +');'"></div>
				<div class="mui-slider-item" v-for="o, index of imgList" :style="'background-image: url('+ o +');'"></div>
				<div class="mui-slider-item mui-slider-item-duplicate" :style="'background-image: url('+ imgFrist +');'"></div>
			</div>
			<div class="mui-slider-indicator">
				<div v-for="o, index of imgList" class="mui-indicator" :class="index === 0 ? 'mui-active':''"></div>
			</div>
		</div>

		<div class="author app-font-size-32">
			<div><img :src="info.headimgurl" />
				<span class="app-color-333333">{{info.nickname}}</span></div>
			<a-d><button type="button" class="mui-btn mui-btn-red">+ 关注</button></a-d>
		</div>

		<div class="content">
			<div class="title app-font-size-34">
				#{{info.title}}#
			</div>
			<div class="text app-font-size-32">
				{{info.content}}
			</div>
			<div class="app-font-size-24" style="text-align: right;margin-top: .5rem;">
				{{info.senddate}}
			</div>
		</div>

		<div class="commont app-font-size-32">
			<div>评论（{{commentlist.length}}）</div>
			<div class="list">
				<div class="item" v-for="o,i of commentlist">
					<img :src="o.headimgurl" />
					<div>
						<span style="color: #406599;" class="app-font-size-28">{{o.nickname}}</span>
						<div class="app-font-size-28 app-color-333333">{{o.content}}</div>
						<div class="app-font-size-28 app-color-333333">{{o.senddate}}</div>
					</div>
				</div>
			</div>
			
			<look-more></look-more>
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
	import LookMore from 'components/LookMore.vue'
	import AD from 'components/AD.vue'

	import ax from 'common/js/config/server.js'

	export default {
		data() {
			return {
				Share: {
					title: '安心云',
					img: ''
				},
				info: {
					"id": -1,
					"account": "",
					"title": "",
					"content": "",

					"image1": "",
					"image2": "",
					"image3": "",
					"senddate": "",
					"likecount": 0,
					"nickname": null,
					"headimgurl": null,
					"iscollection": 0
				},
				commentlist: [],

				id: -1,
			}
		},

		computed: {
			imgList: function() {
				var arr = [];
				for(var i = 1; i <= 3; i++) {
					if(this.info['image' + i]) {
						arr.push(this.info['image' + i]);
					}
				}

				return arr;
			},
			imgFrist: function() {
				return this.imgList[0];
			},
			imgLast: function() {
				return this.imgList[this.imgList.length - 1];
			},
		},

		mounted() {

			this.getSearch()

			this.getData()

			this.getCommentData()

		},
		methods: {
			getSearch() {
				let {
					id
				} = util.getSearchParams()

				this.id = id

			},

			async getData() {
				var data = await ax.send("/article/" + this.id)
				console.log(data)
				this.info = data

				this.setShare()

			},

			async getCommentData() {
				var data = await ax.send("/article/comments/list", {
					params: {
						aid: this.id,
						pageNumber: 1,
						pageSize: 10,
					}

				})
				console.log(data.list)
				this.commentlist = data.list || [];
			},

			setShare() {
				this.Share = {
					title: this.info.title,
					img: this._getImage(this.info)
				}
			},

			_getImage(o) {
				return o.image1 || o.image2 || o.image3
			},
		},
		components: {
			FloatAd,
			HideData,
			AD,
			LookMore
		}

	}
</script>

<style type="text/css">
	body {
		background-color: #FFFFFF !important;
	}
</style>

<style lang="scss" scoped>
	@import '../../common/scss/main.scss';
	/*图片轮播*/
	
	.mui-slider-indicator .mui-indicator {
		/*background: transparent;*/
		margin: 0 1.5px;
		border: .5px white solid;
	}
	
	#slider .mui-slider-item {
		width: 100%;
		height: 7.466666rem !important;
		padding-top: 50.6666%;
		background-size: cover;
		background-position: center;
	}
	/*end图片轮播*/
	
	.root {
		.author {
			height: 1.413333rem;
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.2rem;
			img {
				height: 1.066666rem;
				width: 1.066666rem;
				border-radius: 50%;
				vertical-align: middle;
			}
			span {
				vertical-align: middle;
				margin-left: 0.346666rem;
				line-height: 1.066666rem;
			}
		}
		.content {
			padding: 0.2rem 0.4rem;
			.title {
				color: #343434;
				font-weight: bold;
				margin-bottom: .4rem;
			}
			.text {
				color: #666666;
				line-height: 1.5;
			}
		}
		.commont {
			padding: 0.2rem;
			padding-bottom: 1.2rem;
			.list {
				margin-top: .2rem;
				.item {
					display: flex;
					display: -webkit-flex;
					padding: .5rem 0;
					border-top: 1px #ccc dashed;
					img {
						height: 1.066666rem;
						width: 1.066666rem;
						border-radius: 50%;
						margin-right: .3rem;
					}
				}
			}
		}
	}
</style>