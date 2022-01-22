
import axios from 'axios'
// const applytoken=axios=>{
const applytoken=_=>{	
	let token=localStorage.getItem('token')
	if ( token){}
	else { return axios }
	axios.defaults.headers.get.token = token
	axios.defaults.headers.post.token = token
	axios.defaults.headers.put.token = token
	axios.defaults.headers.delete.token = token
	return axios
}
export {
	applytoken
}
