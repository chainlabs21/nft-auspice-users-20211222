
const abi= [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "__user_proxy_registry",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "__admin_contract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "__erc1155_contract",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "_admin_contract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "_batch_hashid_auction_info",
		"outputs": [
			{
				"internalType": "address",
				"name": "_opener",
				"type": "address"
			},
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
				"name": "_status",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "_batch_hashid_bidinfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "_bidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bidtime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_active",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_bidcount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_referer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_erc1155_contract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "_is_batch_hashid_onauction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_payroll",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_user_proxy_registry",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"name": "begin_auction_batch",
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
				"internalType": "uint256[]",
				"name": "_target_item_ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_target_contract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_batch_hashid",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_paymenttoken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_referer",
				"type": "address"
			}
		],
		"name": "bid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "_opener",
						"type": "address"
					},
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
					},
					{
						"internalType": "uint256",
						"name": "_status",
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
					}
				],
				"internalType": "struct Auction_repo_english.Auction_info_batch",
				"name": "auction_info",
				"type": "tuple"
			}
		],
		"name": "can_manage_sale",
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_batch_hashid",
				"type": "bytes32"
			}
		],
		"name": "cancel_auction",
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
		"name": "get_batch_hashid",
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
	{
		"inputs": [],
		"name": "lastData",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastFrom",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastOperator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_values",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_batch_hashid",
				"type": "bytes32"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "_opener",
						"type": "address"
					},
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
					},
					{
						"internalType": "uint256",
						"name": "_status",
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
					}
				],
				"internalType": "struct Auction_repo_english.Auction_info_batch",
				"name": "auction_info_update",
				"type": "tuple"
			}
		],
		"name": "revise_auction_terms",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_value",
				"type": "bool"
			}
		],
		"name": "setShouldReject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_admin_contract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_erc1155_repo_contract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_payroll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_user_proxy_registry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_batch_hashid",
				"type": "bytes32"
			}
		],
		"name": "settle_auction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shouldReject",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_target_contract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_opener",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_holder",
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
		"name": "validate_auction_open",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export { 
	abi
}
