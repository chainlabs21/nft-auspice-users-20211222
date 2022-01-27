
const abi = [
	{	name : 'mint_and_match_single_simple'
		, inputs : [
			{ type : 'address' , name:'' }
			,	{ type : 'string' , name:'' }
			, { type : 'uint256' , name:'' }
			, { type : 'uint256' , name:'' }
			, { type : 'uint256' , name:'' }
			, { type : 'uint256' , name:'' }
			, { type : 'address' , name:'' }
			, { type : 'uint256' , name:'' }
			, { type : 'address' , name:'' }
			, { type : 'address' , name:'' }
		]
		, outputs : []
	} /** 	function mint_and_match_singl e_simple (
		address _target_erc1155_contract
		, string memory _itemid

		, uint256 _tokenid // ignored for now
		, uint256 _amount
    , uint256 _author_royalty
    , uint256 _decimals

		, address _paymeans
		, uint256 _price
		, address _seller
		, address _to
*/
/*,	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_type",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "DepositToVault",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_admincontract",
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
		"name": "_owner",
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
		"name": "_target_erc1155_contract_def",
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
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_buy",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					}
				],
				"internalType": "struct Matcher_batch.SignatureRsv",
				"name": "signature_buy",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_sell",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					}
				],
				"internalType": "struct Matcher_batch.SignatureRsv",
				"name": "signature_sell",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "_admin_fee_rate",
				"type": "uint256"
			}
		],
		"name": "atomicMatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_buy",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_sell",
				"type": "tuple"
			}
		],
		"name": "can_match_order",
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
	{ // 
		"name": "mint_and_match_single",
		"inputs": [
			{
				"internalType": "address",
				"name": "_target_erc1155_contract",
				"type": "address"
			},
			{
				"components" : [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_buy",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					}
				],
				"internalType": "struct Matcher_batch.SignatureRsv",
				"name": "signature_buy",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "matcher",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "taker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_maker",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fee_bp_taker",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "vault",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "side",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "asset_contract_bid",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_bid",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "asset_contract_ask",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_id_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "asset_amount_ask",
						"type": "uint256[]"
					},
					{
						"internalType": "address[2]",
						"name": "asset_contract",
						"type": "address[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_id",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "asset_amount",
						"type": "uint256[2]"
					},
					{
						"internalType": "address",
						"name": "paymenttoken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "listing_starttime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "listing_endtime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "referer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "referer_feerate",
						"type": "uint256"
					}
				],
				"internalType": "struct Matcher_batch.Order",
				"name": "order_sell",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					}
				],
				"internalType": "struct Matcher_batch.SignatureRsv",
				"name": "signature_sell",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string[]",
						"name": "_itemhashes",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "_amounts",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "_author_royalty",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "_to",
						"type": "address"
					}
				],
				"internalType": "struct Matcher_batch.Mint_data",
				"name": "_mint_data",
				"type": "tuple"
			}
		],
		"outputs": [],
		"stateMutability": "payable",
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
		"name": "only_owner_or_admin",
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_payroll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
,		{		"inputs": [
	{
		"internalType": "address",
		"name": "__admincontract",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "__user_proxy_registry",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "__target_erc1155_contract_def",
		"type": "address"
	}
	],
	"stateMutability": "nonpayable",
	"type": "constructor"
	},
*/
]
export {
	abi
}
