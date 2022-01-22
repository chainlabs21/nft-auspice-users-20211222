
const is_eth_address_valid=str=>str.length==42 && str.match( /[0-9A-Fa-f]{6}/g )

export {
	is_eth_address_valid
}
