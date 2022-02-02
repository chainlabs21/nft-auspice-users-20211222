
import axios from 'axios'
import SetErrorBar from './SetErrorBar'
import { messages } from '../config/messages'
import {API } from '../config/api'
const LOGGER=console.log
// const applytoken=axios=>{
const require_token=_=>{
	return new Promise((resolve,reject)=>{
		let token=localStorage.getItem('token')
		if ( token ){
			axios.defaults.headers.common.token = token
			axios.defaults.headers.get.token = token
			axios.defaults.headers.post.token = token
			axios.defaults.headers.put.token = token
			axios.defaults.headers.delete.token = token
			resolve( axios)
		}
		else {
			if( window.klaytn?.selectedAddress ){
				let { selectedAddress : address } = window.klaytn
				axios.post ( API.API_USERS_LOGIN , { address, cryptotype : 'ETH'} ).then(resp=>{				LOGGER('' , resp.data )
					let { status , respdata }=resp.data
					if ( status=='OK'){
						let token=respdata
						localStorage.setItem( "token" , token )
						localStorage.setItem( 'address' , address )
						axios.defaults.headers.common.token = token
						axios.defaults.headers.get.token = token
						axios.defaults.headers.post.token = token
						axios.defaults.headers.put.token = token
						axios.defaults.headers.delete.token = token				
						localStorage.setItem ( 'address' , address )
						SetErrorBar( messages.MSG_LOGGEDIN + `: ${address}` )
						resolve( axios) // resolve( {address , token })
					} else { SetErrorBar(messages.MSG_LOGIN_FAIL) ; resolve(null) }
				})
			}
			else {
				SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ); resolve(null)
				return null
			}
		}	
	})
}
const applytoken= _ =>{	
	let token=localStorage.getItem('token')
	if ( token){}
	else { return axios }
	axios.defaults.headers.common.token = token
	axios.defaults.headers.get.token = token
	axios.defaults.headers.post.token = token
	axios.defaults.headers.put.token = token
	axios.defaults.headers.delete.token = token
	return axios
}
export {
	require_token
	, applytoken
}
//////
