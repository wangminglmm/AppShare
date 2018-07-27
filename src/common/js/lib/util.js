class Util {
	/**
	 * 获取url任意参数的值
	 * @param {String} key 需要获取的key
	 */
	getSearchParams(key) {
		let url = location.search.replace(/^\?/, '').split('&'),
			paramsObj = {}
		for(let i = 0, iLen = url.length; i < iLen; i++) {
			let param = url[i].split('=')
			paramsObj[param[0]] = param[1]
		}
		if(key) {
			return paramsObj[key] || ''
		}
		return paramsObj
	}

	/**
	 * 获取HTML字符串中 img 地址
	 * @param {String} str 模版字符
	 * @returns {Array} 图片地址数组
	 */
	getHtmlImgs(str) {
		const re = /<[img|href][^>]*src\s*=\s*('|")?([^'">]*)\1([^>])*>/ig
		let imgsArr = [],r = null
		while((r = re.exec(str)) != null) {
			imgsArr.push(r[2])
		}
		return imgsArr
	}
}

module.exports = new Util()