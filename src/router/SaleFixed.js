import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
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
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useState, useEffect } from "react";
import VerifyAccountPopup from "./VerifyAccountPopup";
import queryString from "query-string";
import SetErrorBar from "../util/SetErrorBar";
import { ERR_MSG, messages } from "../config/messages";
// import axios from "axios";
import { API } from "../config/api";
import DatePicker from "react-datepicker";
import { getmyaddress, LOGGER, getrandomint
	, convaj , conv_bp_percent, ISFINITE
} from "../util/common";
import { signOrderData } from "../util/verifySig";
import { is_eth_address_valid } from "../util/eth";
import { applytoken } from '../util/rest'
import { ADDRESSES } from '../config/addresses'
import { TIME_PAGE_TRANSITION_ON_REGISTER 
	, PAYMENT_TOKEN_ADDRESS_DEF,
	REFERER_FEE_RATE_DEF
} from '../config/configs'
import { useSearchParams } from "react-router-dom";
import { getabistr_forfunction , query_nfttoken_balance, requesttransaction } from "../util/contract-calls";
import moment from 'moment'

function SaleFixed() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [ verifyPopup, setVerifyPopup] = useState(false);
  const [ platformFee, setPlatfromFee] = useState(2.5);
  const [ royalty, setRoyalty] = useState(5);
  const [ itemPrice, setItemPrice ] = useState(0);
  const [ endPrice, setEndPrice ] = useState(0);
  const [ endPriceOption, setEndPriceOption ] = useState(false);
  const [ privateOption, setPrivateOption ] = useState(false);
  const [ privateAddress, setPrivateAddress ] = useState("");
  const [ itemData, setItemData] = useState({});
  const [ sign, setSign] = useState( [] )
  const [ signError, setSignError] = useState( "" )
	const [ completeSign, setCompleteSign] = useState(true)
	let [ daystoclose , setdaystoclose ] = useState ( '3 days later' )
	let [ expiry , setexpiry ] = useState(''+7)

	let [ signeddata , setsigneddata ] = useState()
	let [ itemid , setitemid ]=useState()
	let [ tokenid , settokenid ] = useState()
	let [ jsettings , setjsettings ]= useState( {} )
	let [ searchParams , setSearchParams ] = useSearchParams( )
	let myaddress = getmyaddress()
	const axios=applytoken()
	useEffect( _ => {
		let itemprice=getrandomint ( 12 , 17 )
		setItemPrice ( itemprice )
		setEndPrice ( getrandomint ( itemprice -10 , itemprice -2 ) )
		/////
		axios.get(API.API_PLATFORM_SETTINGS).then(resp=>{ LOGGER ( 'yDc3w8vZgI' , resp.data )
			let { status , list } =resp.data 
			if ( status =='OK'){
				setjsettings ( convaj( list , 'key_' , 'value_') ) 
			}
		})
	} , [] )
	const do_dutch_auction= _ =>{
		let tokenid = itemData?.tokenid
		if( tokenid ){}
		else {SetErrorBar( messages.MSG_DATANOTFOUND ) } // ; return 
		false && query_nfttoken_balance ( ADDRESSES.erc1155 , myaddress , tokenid ).then (resp=>{
			LOGGER( 'wE2hK5BTA4' , resp )
		})
//		const query_nfttok en_balance = ( contractaddress , address , tokenid )=>{
		if ( ISFINITE( + endPrice ) && + endPrice < + itemPrice ){}
		else { SetErrorBar( messages.MSG_DUTCH_PRICE_TERMS_INVALID );return  }
		let days = daystoclose.split(/ /)[0]
		let expiry = moment().add ( +days , 'days').endOf('days').unix()
		let abistr = getabistr_forfunction( {
			contractaddress : ADDRESSES.auction_repo_dutch_bulk
			, abikind : 'AUCTION_DUTCH_BULK'
			, methodname : 'begin_auction_batch'
			, aargs : [ 
					ADDRESSES.erc1155 // 
				, ADDRESSES.zero
				, myaddress
				, [ tokenid ]
				, [ 1 ]
				, PAYMENT_TOKEN_ADDRESS_DEF
				, itemPrice
				, endPrice
				, 5
				, moment().unix()
				, expiry // moment().add( 5 , 'days' ).unix()
				, REFERER_FEE_RATE_DEF
			]
		} )
		LOGGER ( 'bINmVzlWvR' , abistr )
//		return
		requesttransaction({ from : myaddress
			, to : ADDRESSES.auction_repo_dutch_bulk
			, data : abistr
			, value : '0x00'
		}).then(resp=>{ LOGGER( '' , resp )
			let { transactionHash , status } = resp
			LOGGER( '' , transactionHash , status )
		}).catch(err=>{
			LOGGER('' , err )
		})
	}
/**			 "_target_contract",
				 "_user_proxy_registry",
				 "_holder",
				 "_target_item_ids",
				 "_amounts",
				 "_paymenttoken",
				 "_offer_starting_price",
				 "_offer_end_price" ,
				 "_count_steps_depreciation",
				 "_starting_time",
				 "_expiry",
				 "_referer_feerate",
 */		
	const do_fixed_price_spot=_=>{
		const orderData = {
			seller_address: myaddress,
			amount: 1,
			price: itemPrice,
			priceunit: "0x000000000000000000000000000000000000",
			expiry : expiry? moment().add( +expiry , 'days').endOf('day').unix() : 0 ,
			itemid
			, tokenid
//			, expiry
		}
		console.log( '' , endPriceOption , itemData );	console.log( '' , orderData ) //	 return
		signOrderData( orderData ).then(respsign =>{				LOGGER( '8pdnEvf9uF' , respsign ) // , signCallback
			if (respsign ){}
			else {SetErrorBar( messages.MSG_USER_DENIED_TX );return }
			SetErrorBar (messages.MSG_DATA_SIGNED )
			setsigneddata ( respsign )
//			return 
			axios.post ( API.API_ORDER_MAKER_SELLER , {
				asset_contract_bid : ADDRESSES.erc1155
				, ... orderData , ... respsign } // signeddata
			).then ( resp=>{ LOGGER( '2UtIKhAjXH' , resp.data )
				let { status }=resp.data
				if ( status =='OK') {
					SetErrorBar( messages.MSG_DONE_REGISTERING )
					setTimeout(_=>{ 	//						navigate()
					} , TIME_PAGE_TRANSITION_ON_REGISTER )
				}
			})
		})
	}

  const handleSalesStart = async () => {
    const myaddress = getmyaddress()    
//    const asyncSalesStart = async () => {	
		if( endPriceOption ){
			do_dutch_auction()
		}
		else {			do_fixed_price_spot()
		} //    };
  //  asyncSalesStart();
  };
  useEffect(() => {
//		const { itemid } = queryString.parse(search); 
		let itemid=searchParams.get('itemid'); LOGGER( 'U9Z2CL8cRt' , itemid )
    if ( itemid === undefined) {
      SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA);
//      navigate("/");
		}
		setitemid ( itemid )
    const asyncGetItemData = async () => {
      try {
				const resp = await axios.get( API.API_GET_ITEM_DATA + `/${ itemid }`); 				LOGGER('url', API.API_GET_ITEM_DATA )
				LOGGER('', resp.data)
				let { status , respdata } = resp.data
        if ( status === "OK") {
          setItemData( respdata.item);
					setRoyalty( respdata.item.authorfee / 100)
					settokenid ( respdata.item.tokenid ) 
        } else {
					SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA);
					setTimeout( _=>{
						navigate("/")
					} , TIME_PAGE_TRANSITION_ON_REGISTER )
        }
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA);
				setTimeout( _=>{
					navigate("/")
				} , TIME_PAGE_TRANSITION_ON_REGISTER )				
      }
    };
    asyncGetItemData();
  }, [] ) // [ navigate , search ] 

  useEffect (() => {
    console.log(signError, sign.length);
    if (signError !== "" && signError !== undefined && signError !== null) {
      setCompleteSign(false);
      setVerifyPopup(false);
      setSign([]);
      setSignError("");
      return;
    }
    if (sign.length === 4) {
      setCompleteSign(true);
      setVerifyPopup(true);
    }
  }, [sign.length]);

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
                  <span></span>
                  <strong>Henry junior's Item</strong>
                </div>
                <div class="sell_wrap">
                  <div class="create create2">
                    <form action="">
                      <div class="form">
                        <ul>
                          <li>
                            <h3>Choose a sales method</h3>
                            <ol>
                              <li class="on">
                                <a>
                                  <h4>Fixed Price</h4>
                                  <span>
                                    Sell ​​at a fixed or declining
                                    <br />
                                    price after a period of time
                                  </span>
                                </a>
                              </li>
                              <li onClick={() => navigate(`/auctionbid?itemid=${itemid}`)}>
                                <a>
                                  <h4>Auction Bid</h4>
                                  <span>Sell ​​to the highest bidder</span>
                                </a>
                              </li>
                              <li>
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
                            <div class="price_info_pc">
                              <div class="top2">
                                <h3>Price</h3>
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
                                    <input
                                      type="number"
                                      placeholder=""
                                      onkeydown="onlyNumber(this)"
                                      value={itemPrice}
                                      onChange={(e) => {
                                        setItemPrice(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <p>Items sold until canceled</p>
                            </div>
                            <div class="price_info_m">
                              <div class="top2">
                                <h3>Price</h3>
                                <p>Items sold until canceled</p>
                              </div>
                              <div class="toggle border_1">
                                <div class="select_left">
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  <select name="" id="">
                                    <option>KLAY</option>
                                  </select>
                                </div>
                                <div class="input_right">
                                  <input
                                    type="number"
                                    placeholder=""
                                    onkeydown="onlyNumber(this)"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div class="price_info_pc">
                              <div class="top2">
                                <h3>Expiry</h3>
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
                                      <option>Days later</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
                                    <input
                                      type="number"
                                      placeholder=""
                                      onkeydown="onlyNumber(this)"
                                      value={expiry}
                                      onChange={(e) => {
																				let {value}=e.target
																				if ( ISFINITE (+value) ){}
																				else {SetErrorBar( messages.MSG_INPUT_NUMBERS_ONLY ); return }
                                        setexpiry( value)
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
														</div>
                            <div class="price_info_m">
                              <div class="top2">
                                <h3>Price</h3>
                                <p>Items sold until canceled</p>
                              </div>
														</div>
													</li>

                          <li>
                            <div class="end">
                              <div class="top2">
                                <h3>End price option</h3>
                                <div class="toggle">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="toggle"
                                    checked={ endPriceOption }
                                    onChange={(e) => { 																			
                                      setEndPriceOption(e.target.checked);
                                    }}
                                  />
                                  <label for="toggle"></label>
                                </div>
                              </div>
                              <p>
                                If you add the closing price, the sale or
                                duration
                                <br />
                                The price will gradually decrease until it
                                expires.
                              </p>
                              <div class="endprice">
                                <div class="endpricebox">
                                  <ul>
                                    <li>
                                      <div class="endoption1">
                                        <h3>End price</h3>
                                        <div class="top2">
                                          <p>
                                            The closing price is equal to the
                                            starting price or <br />
                                            It should be lower. prices are
                                            sequential lowers.
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
                                              <input
                                                type="number"
                                                placeholder=""
                                                onkeydown="onlyNumber(this)"
                                                value={endPrice}
                                                onChange={(e) => {
                                                  setEndPrice(e.target.value);
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="endoption2">
                                        <h3>Expiry</h3>
                                        <div class="top2">
                                          <p>Items sold until canceled</p>
                                          <div class="twoselect">
                                            <div class="toggle_1">
                                              <select name="" id="" onClick={ evt=>{
																								LOGGER( '' , evt.target.value )
																								setdaystoclose ( evt.target.value )
																							} }>
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
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="private">
                              <div class="top2">
                                <h3>Private option</h3>
                                <div class="toggle">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="toggle2"
                                    checked={privateOption}
                                    onChange={(e) => {
                                      setPrivateOption(e.target.checked);
                                    }}
                                  />
																	
                                  <label for="toggle2"></label>
                                </div>																
                              </div>
                              <p>
                                If set to private, other than the address
                                entered below Products are not visible to users
                              </p>
                              <div class="inputbox">
                                <input
                                  type="text"
                                  value={privateAddress}
                                  placeholder="Buyer Wallet Address / ex ) Ox8df35..."
                                  onChange={(e) => {
                                    setPrivateAddress(e.target.value);
                                  }}
                                />
                              </div>															
                            </div>
														<span style={{color :'red'}}>{ privateAddress?.length == 0 ? '' : 
															(is_eth_address_valid( privateAddress ) ? '' : messages.MSG_INVALID_ADDRESS ) }</span>
                          </li>
                          <li>
                            <div class="inst_con">
                              <div class="instrucion line1">
                                <div class="dropdown">
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
                                      &nbsp;&nbsp;The process of sending 0
                                      Klaytn to verify that the account is a
                                      valid account proceeds.
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
                      <span>{platformFee}%</span>
                    </li>
                    <li>
                      <p>Royalty</p>
                      <span>{royalty}%</span>
                    </li>

                    <li>
                      <p>Referrer</p>
                      <span>{ conv_bp_percent(jsettings?.REFERER_FEE_DEF) }%</span>
                    </li>

                    <li>
                      <strong>Total</strong>
                      <strong>{platformFee + royalty}%</strong>
                    </li>
                  </ul>
                </div>
                <div
                  class="sales_btn"
                  onClick={() => {
                    handleSalesStart ()
                  }}
                >
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
                <a>Sal??es start</a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div``;

export default SaleFixed;
/** const signCallback = (error, result) => {
    const temp = [];
    console.log(error, result);
    if (result.error === undefined) {
      const v = "0x" + result.result.substring(2).substring(128, 130);
      const r = "0x" + result.result.substring(2).substring(0, 64);
      const s = "0x" + result.result.substring(2).substring(64, 128);
      temp.push(v, r, s, result.result);
      set Sign(temp);
    } else {
      console.log(error);
      setS ignError(error);
      SetErrorBar(ERR_MSG.ERR_USER_SIGN_CANCELED);
    }
  };
 */