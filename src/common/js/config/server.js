import Axios from './index.js'
import des from './des.js'
import { APP_VERSION } from './config.js'

const axios = new Axios()
axios.setRequestBefore(c => {
	return c
})

axios.setResponseBefore(rs => {
	var data = rs.data
	if(data.code !== "0000" && data.code !== "0") {
		return false
	}
	return data.data
})

module.exports = axios