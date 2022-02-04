
pragma solidity ^0.8.0;

interface Matcher_batch  // Ownable , Utils  ,
 {
	enum PAY_REFERER_IMMEDIATE_OR_PERIODIC 	{
		__SKIPPER__
		, IMMEDIATE // right upon settlement
		, PERIODIC // monthly or sth periodic
	}
	enum PAY_AUTHOR_IMMEDIATE_OR_PERIODIC 	{
		__SKIPPER__
		, IMMEDIATE // right upon settlement
		, PERIODIC // monthly or sth
	}
	enum Fee_taker_role {
		REFERER
		, AUTHOR
	}
	function _admincontract () external returns ( address );
	function _user_proxy_registry () external returns ( address );
	function _target_erc1155_contract_def () external returns ( address );
	function _payroll () external returns ( address );
	function _owner () external returns ( address ); 
	struct Order {
		address matcher ;
		address maker ;
		address taker ;
		address seller ; 
		address buyer ;
		uint fee_bp_maker ;
		uint fee_bp_taker ;
		address vault ;
		uint side ;
//
		address asset_contract_bid ;
		uint [] asset_id_bid ;
		uint [] asset_amount_bid ;
//	
		address asset_contract_ask ; 
		uint [] asset_id_ask ;
		uint [] asset_amount_ask ;	
// same as above, just array type so that 
		address [2] asset_contract ;
		uint [2] asset_id ;
		uint [2] asset_amount ;
//	
		address paymenttoken ;
		uint listing_starttime ;
		uint listing_endtime ;
		address referer ;
		uint256 referer_feerate ;
	}
  struct SignatureRsv {
    bytes32 r;/* r parameter */    
    bytes32 s;/* s parameter */
    uint8 v;	/* v parameter */
  }
	struct Mint_data {
		string [] _itemhashes ;
		uint256 [] _amounts ; // degenerate to =1
		uint256 [] _author_royalty ;
		address _to ; // oughta be minter address in case buyer calls
	}
	function mint_and_match_single (
			address _target_erc1155_contract //		, address _to // beneficiary
		, Order memory order_buy // due to the construction of this method ..
		, SignatureRsv memory signature_buy
		, Order memory order_sell
		, SignatureRsv memory signature_sell	
    , Mint_data memory _mint_data	
	) external payable ;
	function can_match_order (Order memory order_buy 
		, Order memory order_sell )
		external		view returns ( bool );	
	function atomicMatch ( 
			Order memory order_buy
		, SignatureRsv memory signature_buy
		, Order memory order_sell
		, SignatureRsv memory signature_sell	
		, uint256 _admin_fee_rate
	) external payable ;
	function only_owner_or_admin (address _address ) external returns ( bool )  ;
	function set_payroll (address _address ) external ;

}
