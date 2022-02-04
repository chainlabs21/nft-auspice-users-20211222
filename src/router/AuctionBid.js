import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import s1 from "../img/sub/s2.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css" // import "./css/style01.css";// import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import VerifyAccountPopup from "./VerifyAccountPopup";
import { useEffect , useState } from "react";
import { useSearchParams } from "react-router-dom";
import { messages } from "../config/messages";
import { applytoken , require_token } from '../util/rest'
import SetErrorBar from '../util/SetErrorBar'
import { API} from '../config/api'
import { LOGGER, getrandomint, ISFINITE , getmyaddress } from '../util/common'
import moment from 'moment'
import { getabistr_forfunction
 , query_nfttoken_balance
 , requesttransaction
} from "../util/contract-calls";
import { ADDRESSES } from "../config/addresses";
import { PAYMENT_TOKEN_ADDRESS_DEF
	, REFERER_FEE_RATE_DEF
	, RULES
	, PAYMEANS_DEF
} from '../config/configs'
import { getweirep } from '../util/eth'
// const AuctionBid = async({ store, setConnect })=> {
	function AuctionBid ({ store, setConnect }) {
  const navigate = useNavigate()
	const [ verifyPopup, setVerifyPopup] = useState(false);
	let [ searchParams, setSearchParams ] = useSearchParams()
	let [ itemid , setitemid ] = useState ()
	let [ itemdata , setitemdata ] = useState()
	let [ amounttoauction , setamounttoauction]= useState( '')
	let [ bidamount_start , setbidamount_start] = useState( '')
	let [ bidamount_threshold , setbidamount_threshold ]=useState()
	let [ daystoclose , setdaystoclose ] = useState( '3 days later' )
	let [ expiry , setexpiry ] = useState()
	let [ myaddress , setmyaddress ] = useState( getmyaddress() ) 
	// let axios = applytoken()
	let axios
	 require_token( ).then(resp=>{
		 axios=resp
	 })
	const onclickstartauction=_=>{
		if( RULES.OPEN_AUCTION_ONCHAIN ){on_post_open_onchain() }
		else {	on_post_open_offchain () }
	}
	const on_post_open_offchain=_=>{
		window.getmyaddress=getmyaddress; 
		let myaddress =  getmyaddress()
		if ( myaddress ){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ); return }
		let days=daystoclose.split(/ /)[0]
		let expiry = moment().add( +days , 'days' ).endOf('day').unix()
		LOGGER( '' , itemid , bidamount_start , bidamount_threshold ,  expiry )
//		if ( itemdata?.item?.tokenid ) {}
	//	else {	SetErrorBar ( messages.MSG_PLEASE_MINT_AHEAD ) ; return }
		const timenow = moment(); 
		let timenowunix = timenow.unix()
		let reqbody = {
			itemid : itemdata?.item?.itemid
			, amount : amounttoauction
			, buyorsell : 'SELL'
			, tokenid : itemdata?.item?.tokenid // null 
			, price  :bidamount_start
			, priceunit : PAYMEANS_DEF
			, startingtime : timenowunix
			, startingprice : bidamount_start
			, expiry
			, username : myaddress
			, matcher_contract : ADDRESSES.auction_repo_english_simple
			, token_repo_contract : ADDRESSES.erc1155
			, typestr : 'AUCTION_ENGLISH'
		}
		LOGGER( 'mHpUwZa3lS' , reqbody)
//		return
		axios.post ( API.API_SALE_COMMON , reqbody ).then(resp=>{ LOGGER( '' , resp.data )
			let { status }=resp.data
			if ( status =='OK' ) {
				SetErrorBar( messages.MSG_DONE_REGISTERING )
			} else {
				SetErrorBar( messages.MSG_REQ_FAIL )
			}
		})
	}
	const on_post_open_onchain=_=>{ window.getmyaddress=getmyaddress; let myaddress =  getmyaddress()
		if ( myaddress ){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ); return }
		let days=daystoclose.split(/ /)[0]
		let expiry = moment().add( +days , 'days' ).endOf('day').unix()
		LOGGER( '' , itemid , bidamount_start , bidamount_threshold ,  expiry )
		if ( itemdata?.item?.tokenid ) {}
		else {	SetErrorBar ( messages.MSG_PLEASE_MINT_AHEAD ) ; return }
		const timenow = moment(); 
		let timenowunix = timenow.unix()
		let abistr = getabistr_forfunction ({
			contractaddress : ADDRESSES.auction_repo_english_simple // erc1155 // 
			, abikind : 'AUCTION_ENGLISH_SIMPLE'
			, methodname : 'begin_auction_simple' // begin_auction_batch'
			, aargs : [ ADDRESSES.erc1155 // auction_repo_english
				, myaddress
				, itemdata?.item?.tokenid // []
				, ''+amounttoauction // []
				, PAYMENT_TOKEN_ADDRESS_DEF
				, getweirep (bidamount_start ) 
				, timenowunix // timenow.unix()
				, expiry // timenow.add ( days , 'days' ).unix()
				, REFERER_FEE_RATE_DEF
				, '0x00'
			] 
		})
// alright:0x22213b6d000000000000000000000000ff817302e7b6d116cdff1a730508551ee155787500000000000000000000000083f714ad20e34748516e8367faf143abde6c3783000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000000000061f7f970000000000000000000000000000000000000000000000000000000006245c1f00000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000		
// failed :0x22213b6d000000000000000000000000ff817302e7b6d116cdff1a730508551ee155787500000000000000000000000083f714ad20e34748516e8367faf143abde6c37830000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e043da6172500000000000000000000000000000000000000000000000000000000000061f90b0a0000000000000000000000000000000000000000000000000000000061ffe26f0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000
		LOGGER( '' , abistr ) //		alert(  abistr ) //		return 
		requesttransaction( { from : myaddress
			, to : ADDRESSES.auction_repo_english_simple // erc1155
			, data : abistr
			, value : '0x00'
		}).then(resp=>{ LOGGER( 'xMMrjGsBuK' , resp )
			let { transactionHash , status } = resp //			LOGGER( 'qrXkVAqkKu' , transactionHash , status )
			if ( status ){
				let reqbody={					itemid : itemdata?.item?.itemid
					, tokenid : itemdata?.item?.tokenid
					, amount : amounttoauction
					, startingtime : timenowunix
					, startingprice : bidamount_start
					, expiry 
					, username : myaddress
					, matcher_contract : ADDRESSES.auction_repo_english_simple
					, token_repo_contract : ADDRESSES.erc1155
				}
				LOGGER( 'jfG6EHcIaO' ,reqbody)
				axios.post ( API.API_REPORT_TX_AUCTION_ENGLISH + `/${transactionHash}` , reqbody ).then(resp=>{ LOGGER('' , resp.data )
					let {status}=resp.data 
					if ( status =='OK'){
						SetErrorBar (messages.MSG_DONE_REGISTERING )
					}
				})
			}
			else {
				SetErrorBar( messages.MSG_TX_FAILED )
			}
		}).catch(err =>{
			LOGGER( 'FdNPZN8Dxa' , err )
			SetErrorBar( messages.MSG_USER_DENIED_TX )
		})
		//	let { from , to , data , value } = jdata
/** 			_target_contract , // ", 				"internalType": "address",
		_holder , // ",
		_target_item_ids , // ",				"internalType": "uint256[]",
		_amounts , // ",				"internalType": "uint256[]",
			_paymenttoken , // ",				"internalType": "address",
_offerprice , // ",				"internalType": "uint256",
_starting_time , // ",				"internalType": "uint256",
_expiry , // ",								"internalType": "uint256",
_referer_feerate , // ",								"internalType": "uint256",
_calldata // ",					" internalType": "bytes",
*/
	}
	useEffect( _=>{
		let bidamount_start = getrandomint( 1, 10 )
		let bidamount_threshold = getrandomint ( bidamount_start+1 , 20 )
		setbidamount_start ( bidamount_start )
		setbidamount_threshold ( bidamount_threshold )
		window.getmyaddress= getmyaddress
	} , [] )
	useEffect( _=>{
		let itemid=searchParams.get('itemid')
		if ( itemid ){ setitemid( itemid )}
		else {SetErrorBar( messages.MSG_PLEASE_SPECIFY_QUERY_VALUE ) ; return }
		let itemdata
		if (axios){}
		else {return }
		axios.get( `${API.API_GET_ITEM_DATA}/${itemid}`).then(resp=>{
			LOGGER( 'oWWjCVhIpY' , resp.data )
			let { status , respdata }=resp.data
			if ( status =='OK'){
				itemdata = respdata
				setitemdata ( respdata )
			} else {
				SetErrorBar(messages.MSG_PLEASE_SPECIFY_QUERY_VALUE )
			}
		})
/** let tokenid = itemda tabatched?.item?.tokenid || 2
		if( tokenid ){}		else {SetErrorBar(messages.MSG_DATANOTFOUND) } // ; return 
		query_nfttoken_balance ( ADDRESSES.erc1155 , myaddress , tokenid ).then (resp=>{
			LOGGER( 'wE2hK5BTA4' , resp )
		}) */
//		const query_nfttok en_balance = ( contractaddress , address , tokenid )=>{
	} , [ axios ] )
	useEffect(_=>{
		if (axios){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ); return }
	} , [ ] )
	
  return (
    <SignPopupBox>
      {verifyPopup && <VerifyAccountPopup off={setVerifyPopup} />}

      <section id="sub">
        <article class="ntfsell_box">
          <div class="choose_wrap">
            <div class="sellbg left">
              <div class="ntfsell_con">
                <div class="top1 profile">
                  <a onClick={() => navigate(-1)}>
                    <img
                      src={require("../img/sub/nft_arrow.png").default}
                      alt=""
                    />
                  </a>
                  <span style={{backgroundImage: `url(${itemdata?.item?.url})`}}></span>
                  <strong>Title: { itemdata?.item?.titlename }</strong>
                </div>
                <div class="sell_wrap">
                  <div class="create create3">
                    <form action="">
                      <div class="form">
                        <ul>
                          <li>
                            <h3>Choose a sales method</h3>
                            <ol>
                              <li onClick={() => navigate("/salefixed?itemid=" + `${itemdata?.item?.itemid}`)}>
                                <a>
                                  <h4>Fixed Price</h4>
                                  <span>
                                    Sell ​​at a fixed or declining
                                    <br />
                                    price after a period of time
                                  </span>
                                </a>
                              </li>
                              <li class="on">
                                <a>
                                  <h4>Auction Bid</h4>
                                  <span>Sell ​​to the highest bidder</span>
                                </a>
                              </li>
                              <li onClick={() => { 
																SetErrorBar(messages.MSG_WORKINPROGRESS) ; return
																navigate("/salebundle")}}>
                                <a>
                                  <h4>
                                    Bundle Sale
                                    <img
                                      src={
                                        require("../img/sub/bundle_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </h4>
                                  <span>
                                    Selling multiple
                                    <br />
                                    items together
                                  </span>
                                </a>
                              </li>
                            </ol>
                          </li>
                          
													<li>
                            <div class="Minimum input2">
                              <div class="top2">
                                <h3>Amount to auction</h3>
                                <div class="icon">
                                  <a> <img src={ require("../img/sub/auction_icon.png")                                          .default                                      }                                      alt=""                                    />
                                    <div class="bubble_info">
                                      <div class="bubble">
                                        <img src={ require("../img/sub/bubble_icon.png")                                              .default                                          }                                          alt=""                                        />
                                        <p>Amount to auction
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <p>Out of ({ itemdata?.itembalance?.avail || '0'})</p>
                                <div class="toggle border_1">
                                  <div class="select_left">
                                    <img src={ require('../img/header/logo.png').default } alt=""                                    />
                                    <select name="" id="">
                                      <option>#{ itemdata?.item?.tokenid }</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
                                    <input value={ amounttoauction }
                                      type="number"
                                      placeholder=""
																			onkeydown="onlyNumber(this)"
																			onChange={evt=>{
																				let {value }=evt.target
																				if ( ISFINITE( +value)){}
																				else {return}
																				if (+value<= itemdata?.item?.countcopies ){}
																				else {SetErrorBar( messages.MSG_EXCEEDS_BALANCE) ; return }
																				setamounttoauction ( value )
																			}}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
	
{/******** */}
													<li>
                            <div class="Minimum input2">
                              <div class="top2">
                                <h3>Starting bid</h3>
                                <div class="icon">
                                  <a>
                                    <img
                                      src={
                                        require("../img/sub/auction_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <div class="bubble_info">
                                      <div class="bubble">
                                        <img
                                          src={
                                            require("../img/sub/bubble_icon.png")
                                              .default
                                          }
                                          alt=""
                                        />
                                        <p>
                                          You can always accept a sale even if
                                          you are offered <br />
                                          a price that is higher than your
                                          minimum bid and
                                          <br />
                                          lower than your target bid.
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <p>Enter your starting bid.</p>
                                <div class="toggle border_1">
                                  <div class="select_left">
                                    <img
                                      src={
                                        require("../img/sub/I_klaytn.svg")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select name="" id="">
                                      <option>KLAY</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
                                    <input value={ bidamount_start }
                                      type="number"
                                      placeholder=""
																			onkeydown="onlyNumber(this)"
																			onChange={evt=>{
																				let {value }=evt.target
																				if ( ISFINITE( +value)){}
																				else {return}
																				setbidamount_start ( value )
																			}}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="Target input2">
                              <div class="top2">
                                <h3>Minimum bid</h3>
                                <div class="icon">
                                  <a>
                                    <img src={require("../img/sub/auction_icon.png").default} alt=""
                                    />
                                    <div class="bubble_info">
                                      <div class="bubble">
                                        <img src={require("../img/sub/bubble_icon.png").default}                                          alt=""
                                        />
                                        <p>
                                          You can always accept a sale even if
                                          you are offered <br />
                                          a price that is higher than your
                                          minimum bid and
                                          <br />
                                          lower than your target bid.
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <p>
                                  Enter your target price. If you do not receive
                                  <br />a bid above this price, it will close
                                  without sale.
                                </p>
                                <div class="toggle border_1">
                                  <div class="select_left">
                                    <img
                                      src={
                                        require("../img/sub/I_klaytn.svg")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select name="" id="">
                                      <option>KLAY</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
																		<input value={ bidamount_threshold }																			
                                      type="number"
                                      placeholder=""
																			onkeydown="onlyNumber(this)"
																			onChange={evt=>{
																				let {value}=evt.target ; value=+value
																				if ( ISFINITE( value )){}
																				else {return}
																				setbidamount_threshold ( ''+value)
																			}}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="Expiry">
                              <div class="endoption2">
                                <h3>Expiry date</h3>
                                <div class="top2">
                                  <p>
                                    When the expiration time is reached,
                                    <br />
                                    the sale price is automatically It ends.
                                  </p>
                                  <div class="twoselect">
                                    <div class="toggle_1">
                                      <select name="" id="" value={daystoclose} onChange={evt=>{
																				LOGGER('' , evt.target.value )
																				setdaystoclose ( evt.target.value )
																			}}>
                                        <option>5 days later</option>
                                        <option>3 days later</option>
                                        <option>2 days later</option>
                                        <option>1 days later</option>
                                      </select>
                                    </div>
                                    <div class="toggle_2">
                                      <select name="" id="">
                                        <option>PM 02 : 00</option>
                                        <option>PM 03 : 00</option>
                                        <option>AM 01 : 00</option>
                                        <option>AM 02 : 00</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="inst_con">
                              <div class="instrucion line1">
                                <div class="dropdown on">
                                  <a>
                                    <span></span>
                                  </a>
                                  <div class="bot_title">
                                    <strong>Instruction</strong>
                                    <p>
                                      We need a process for listing without gas
                                      fees
                                    </p>
                                  </div>
                                  <div class="info">
                                    <p>
                                      - If you are trading for the first time,
                                      you will need to reset your account.
                                      <br />
                                      &nbsp;&nbsp;The process of sending 0 KLAY
                                      to verify that the account is a valid
                                      account proceeds.
                                    </p>
                                    <p>
                                      - Please complete the signature to create
                                      a sales list.
                                    </p>
                                    <p>
                                      - Gas fee is paid only for the first time,
                                      and subsequent listings are supported free
                                      of charge.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="sellbg2_pc">
              <div class="sell_wrap">
                <div class="top3">
                  <h3>
                    Summary of
                    <br />
                    transaction information
                  </h3>
                  <span class="basic">
                    The auction begins. If the bid is
                    <br />
                    more than 1 KLAY, the bid will be
                    <br />
                    awarded at 17:58 on July 28, 2021.
                  </span>
                  <span class="red2">
                    The target bid must be greater
                    <br />
                    than the minimum bid
                  </span>
                  <span class="red2">Please enter your target bid</span>
                  <span class="red2">Target bid must be at least 1 KLAY</span>
                </div>
                <div class="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div class="fees">
                  <h3>Fees</h3>
                  <ul>
                    <li>
                      <p>Platform Fee</p>
                      <span>2.5%</span>
                    </li>
                    <li>
                      <p>Royalty</p>
                      <span>5%</span>
                    </li>
                    <li>
                      <strong>Total</strong>
                      <strong>7.5%</strong>
                    </li>
                  </ul>
                </div>
								<div class="sales_btn" onClick={() => { // setVerifyPopup(true)
									onclickstartauction()
								}}>
                  <a>Sales start</a>
                </div>
              </div>
            </div>
            <div class="sellbg2_m">
              <div class="sell_wrap">
                <div class="top3">
                  <h3>Transaction information</h3>
                  <span class="basic">
                    The item is posted for sale
                    <br />
                    at 3,339 KLAY
                  </span>
                  <span class="red">
                    End price must be less than start price
                  </span>
                </div>
                <div class="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div class="fees">
                  <h3>Fees</h3>
                  <ul>
                    <li>
                      <p>Platform Fee</p>
                      <span>2.5%</span>
                    </li>
                    <li>
                      <p>Royalty</p>
                      <span>5%</span>
                    </li>
                    <li>
                      <strong>Total</strong>
                      <strong>7.5%</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="sales_btn">
                <a>Sales start</a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBid);
