
const abi = [
	{	name : 'mint_and_match_single_simple'
		, inputs : [
			{ type : 'address' , name:'contract' } // 0
			,	{ type : 'string' , name:'itemid' } // 1
//			, { type : 'uint256' , name:'tokenid' } // 2
			, { type : 'uint256' , name:'amount' } // 3
			, { type : 'uint256' , name:'author_royalty' } // 4
//			, { type : 'uint256' , name:'decimals' } // 5
//			, { type : 'address' , name:'paymeans' } // 6
			, { type : 'uint256' , name:'price' } // 7
			, { type : 'address' , name:'seller' } // 8  
			, { type : 'address' , name:'to' } // 9
			, { type : 'address' , name: 'referer' }
		]
		, outputs : []
		, stateMutability: "payable"
		, type: "function"	
	} 
]
export {
	abi
}

