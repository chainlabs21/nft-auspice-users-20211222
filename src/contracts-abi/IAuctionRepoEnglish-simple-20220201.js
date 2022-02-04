
const abi= [
	{
		"name": "begin_auction_simple",
		"inputs": [
			{
				"internalType": "address",
				"name": "_target_contract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_target_item_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_paymenttoken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_offerprice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_starting_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expiry",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_referer_feerate",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_calldata",
				"type": "bytes"
			}
		],
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"name": "get_batch_hashid",
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_target_contract",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_target_item_ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			}
		],
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},

]
export { 
	abi
}
