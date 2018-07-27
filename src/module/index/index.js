import util from 'common/js/lib/index.js'

import {DOWN_URL} from 'common/js/config/config.js'



let { type } = util.getSearchParams()


const way = {
	store: 'store',
	discover: 'discover',
	theme: 'theme',
	devshare: 'devshare'
}


let url = way[type]
if(url){
	url += '.html' + window.location.search
	window.location.href = url
}else{
	window.location.href = DOWN_URL
}









 



