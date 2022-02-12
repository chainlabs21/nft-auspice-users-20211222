
import Web3 from 'web3'
const is_eth_address_valid=str=>str.length==42 && str.match( /[0-9A-Fa-f]{6}/g )

const getweirep=val=> Web3.utils.toWei(val)
const getweirep_hex= val =>{
	let str = Web3.utils.toWei(val)
	return (+str).toString(16)
}
const getethrep=val=>Web3.utils.fromWei( val )
const is_two_addresses_same=(str0,str1)=>str0.toLowerCase() == str1.toLowerCase() 
const get_signature =jdata=>{
	let { seller , 
		itemid 
		, amount
		, price
		, priceunittoken
		, expiry 
	} =jdata
}
export {
	is_eth_address_valid
	, getweirep
	, getweirep_hex
	, getethrep
	, is_two_addresses_same
	, get_signature
}
