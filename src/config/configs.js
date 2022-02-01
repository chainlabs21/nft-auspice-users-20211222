
const PAYMENT_TOKEN_ADDRESS_DEF = '0x0000000000000000000000000000000000000000'
const REFERER_FEE_RATE_DEF = 100 
const TIME_PAGE_TRANSITION_ON_REGISTER=4500
const TIME_PAGE_TRANSITION_DEF = 3300
// tx poller
const TXREQSTATUS_POLL_INTERVAL = 3000
const TXREQSTATUS_BLOCKCOUNT = 1 // 2 // 4 // 6
let TX_POLL_OPTIONS={
	interval : TXREQSTATUS_POLL_INTERVAL
	, blocksToWait : TXREQSTATUS_BLOCKCOUNT
}
const FEES_DEF ={
		ADMIN : 250
	, REFERER : 100
	, AUTHOR : null
}
const PAYMEANS_DEF = 'KLAY'
const NETTYPE = 'KLAYTN-TESTNET'
const URL_TX_SCAN ={
	'KLAYTN-TESTNET' : 'https://baobab.scope.klaytn.com/tx'
} 
const  MODE_DEV_PROD=0
const RULES ={
	OPEN_AUCTION_ON_CHAIN_ONLY : 0
}
export {
	PAYMENT_TOKEN_ADDRESS_DEF
	, REFERER_FEE_RATE_DEF
	, TIME_PAGE_TRANSITION_ON_REGISTER
	, TIME_PAGE_TRANSITION_DEF
	, TX_POLL_OPTIONS
	, FEES_DEF
	, PAYMEANS_DEF
	, NETTYPE
	, URL_TX_SCAN
	, MODE_DEV_PROD
	, RULES
}
