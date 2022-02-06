
const abi = [
	{	name : 'mint_and_match_single_simple'
		, inputs : [
				{ type : 'address' , name:'contract' } // 0
			,	{ type : 'string' , name:'itemid' } // 1 //			, { type : 'uint256' , name:'tokenid' } // 2
			, { type : 'uint256' , name:'_amounttomint' } // 2
			, { type : 'uint256' , name:'_author_royalty' } // 3//			, { type : 'uint256' , name:'decimals' } // 5 //			, { type : 'address' , name:'paymeans' } // 6
			, { type : 'uint256' , name:'amounttobuy' } // 4
			, { type : 'uint256' , name:'amounttopay' } // 5
			, { type : 'address' , name:'author' } // 6
			, { type : 'address' , name:'seller' } // 7  
			, { type : 'address' , name:'to' } // 8
			, { type : 'address' , name: 'referer' } // 9
		]
		, outputs : []
		, stateMutability: "payable"
		, type: "function"	
	} 
]
export {
	abi
}
