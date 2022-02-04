/** function mint_begin_simple_and_bid (
	address _target_contract
	, address _holder
	, string memory _itemid
	, uint256 _amounttomint
	, uint256 _author_royalty
	, uint256 _tokenid  // address
	, uint256 _amounttoauction
	, uint256 _offerprice
	, uint _starting_time
	, uint _expiry
//		, uint _referer_feerate
	, uint256 _bidprice
//		, address _referer
//		, address _to
//		, bytes calldata _calldata
) public payable returns ( bool ) {
*/
const abi= [
	{	"name": "mint_begin_simple_and_bid",
		"inputs": [
			{				internalType: "address",	name: "_target_contract",	type: "address"			},
			{				internalType: "address",	name: "_holder",				type: "address"			},
			{				internalType: "string",		name: "_itemid",				type: "string"			},
			{				internalType: "uint256",	name: "_amounttomint",	type: "uint256"			},
			{				internalType: "uint256",	name: "_author_royalty",	type: "uint256"			},
			{				internalType: "uint256",	name: "_tokenid",				type: "uint256"			},
			{				internalType: "uint256",	name: "_amounttoauction",	type: "uint256"			},
			{				internalType: "uint256",	name: "_offerprice",		type: "uint256"			},
			{				internalType: "uint256",	name: "_starting_time",	type: "uint256"			},
			{				internalType: "uint256",	name: "_expiry",				type: "uint256"			},
			{				internalType: "uint256",	name: "_bidprice",			type: "uint256"			}
		],
		"outputs": [
			{				"internalType": "bool",				"name": "",				"type": "bool"			}
		],
		"stateMutability": "payable",
		"type": "function"
	},

]
export { 
	abi
}
