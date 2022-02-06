
const abi= [
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
				"internalType": "uint256",
				"name": "_expiry",
				"type": "uint256"
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

	{		"name": "mint_begin_simple_and_bid",
		"inputs": [
			{
				"internalType": "address",
				"name": "_target_contract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_itemid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amounttomint",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_author_royalty",
				"type": "uint256"
			},

			{
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			},

			{
				"internalType": "uint256",
				"name": "_amounttoauction",
				"type": "uint256"
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
				"name": "_bidprice",
				"type": "uint256"
			}
		],
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},

]
export { 
	abi
}
