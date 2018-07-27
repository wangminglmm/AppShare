import {
	BASE_URL
} from './config.js'

import axios from 'axios'

/*
 * are you ok ?
 * please read docment from axios github.
 * https://github.com/mzabriskie/axios
 */

class Axios {
	constructor() {
		this.ax = axios.create()
		this._init()
	}
	
	_init(){
		let _config = {
			// 默认基础服务地址
			baseURL: BASE_URL,
			// 请求超时设置 8s
			timeout: 8000,
			// 请求类型
			method: 'get',
			
		}
		this.setConfig(_config)
	}
	
	// 设置请求配置
	setConfig(config){
		Object.assign(this.ax.defaults, config)
	}
	
	send(url, config = {}){
		return this.ax.request(url, config)
	}
	
	
	
	/**
	 * 发送请求之前 （出关前）
	 * @param {Function} func 中间件函数 默认不过滤数据
	 */
	setRequestBefore(func) {
		this.ax.interceptors.request.use(function(config) {
			// Do something before request is sent
			if(typeof func === 'function'){
				let rs = func(config)
				config = rs === undefined ? config : rs
			}
			return config
		}, function(error) {
			// Do something with request error
			return Promise.reject(error)
		})
	}
	
	/**
	 * 接收请求之后 （入关前）
	 * @param {Function} func 中间件函数 默认不过滤数据
	 */
	setResponseBefore(func) {
		this.ax.interceptors.response.use(function(response) {
			// Do something with response data
			if(typeof func === 'function'){
				let rs = func(response)
				if(rs === false){
					return Promise.reject(response)
				}
				response = rs === undefined ? response : rs
			}
			return response
		}, function(error) {
			// Do something with response error
			return Promise.reject(error)
		})
	}
}

module.exports = Axios