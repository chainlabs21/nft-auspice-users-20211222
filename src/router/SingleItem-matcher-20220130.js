import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setConnect , setisloader } from "../util/store";
import styled from "styled-components";
import sample from "../img/sub/sample.png";
import profile_img from "../img/sub/profile_img.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useEffect , useRef , useState } from "react";
// import { singleItem } from "../mokups/items";
import moment from "moment";
// import axios from "axios";
import { API } from "../config/api";
import ItemOwnerPopup from "../components/ItemOwnerPopup";
import ItemLikePopup from "../components/ItemLikePopup";
import { applytoken } from "../util/rest";
import { onClickCopy
	, LOGGER
	, getMaxMinAvg
	, get_last_part_of_path
	, gettimestr
	,	getmyaddress
	, 
} from "../util/common"
import SetErrorBar from "../util/SetErrorBar";
import { messages } from '../config/messages'
import { PAYMEANS_DEF , URL_TX_SCAN  , FEES_DEF } from '../config/configs'
import I_heartO from "../img/main/I_heartO.svg"
import I_heartOGray from "../img/sub/I_heartOGray.svg"
import I_heartOPink from '../img/sub/I_heartOPink.svg'
import { useSearchParams } from "react-router-dom"
import { query_nfttoken_balance, requesttransaction , getabistr_forfunction ,  } from "../util/contract-calls";
import I_staroff from '../img/sub/star_off.png'
import I_staron from '../img/sub/star_on.png'
import { query_eth_balance } from '../util/contract-calls'
import { getethrep, getweirep } from '../util/eth'
import rstone from "../img/sub/rstone.png";
import { ADDRESSES } from '../config/addresses'
import { strDot } from "../util/Util"

const convertLongString = (startLength, endLength, str) => {
	if (!str) return;
	const head = str.substring(0, startLength);
	const spread = "......";
	const tail = str.substring( str.length - endLength, str.length )
	return head + spread + tail;
}
const numFormatter = (num) => {
	if (num > 999 && num < 1000000) {
		return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
	} else if (num > 1000000) {
		return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
	} else if (num < 900) {
		return num; // if value < 1000, nothing to do
	}
}
function SingleItem({ store, setConnect , Setisloader }) {
  const navigate = useNavigate(); //  const { itemid } = useParams()
  const itemWrapRef = useRef();
/**   const {    likerList,    ownerList,    salesStatus,    pur chaseStatus,    transactionHistory,    chainInformation,  } = singleItem;*/
  const [ownerPopup, setOwnerPopup] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const [bidPopup, setBidPopup] = useState(false);
  const [chartCategory, setChartCategory] = useState(0);
//  const [endAutionTime, setEndAutionTime] = useState( singleItem.auctionExpiry ) 
  // const [diffTime, setDiffTime] = useState();
//  const [nearEnd, setNearEnd] = useState(false);
	const [itemData, setItemData] = useState({});
	let [ itemdataaux , setitemdataaux ] = useState()
	const [ userIndex, setUserIndex ] = useState(0)
	let [ transactionHistory , settransactionHistory ] = useState ( [] )
	let [ logorders , setlogorders ] = useState( [] )
	let [ logsales , setlogsales ] = useState ( [] )
	let [ logprices , setlogprices ] = useState( [] ) 
//	let [ logactions , setlogactions ] = useState ( [] )
	let [ pricestats , setpricestats ] = useState ( [] )
	let [ ilikethis , setilikethis ] = useState( false )
	let [ ibookmarkthis , setibookmarkthis ] = useState ( false )
	let [ orders_sell , setorders_sell ] = useState( [] )
	let [ sellorder , setsellorder ] =useState ( {} )
	let [ author , setauthor ]= useState()
	let [ myethbalance , setmyethbalance  ] = useState()
	let [ priceklay , setpriceklay]= useState()
	let [ istoschecked , setistoschecked]=useState ( false )
	let [ listotheritems , setlistotheritems ] = useState ( [] )
	let [ iscollectionbyauthorseller , setiscollectionbyauthorseller ] = useState( )
	let [ jprofileimages , setjprofileimages ]=useState( [] )
	let lockjprofileimages={}
	let [ searchParams, setSearchParams ] = useSearchParams()
	let [ itemid , setitemid ] = useState( searchParams.get( 'itemid' ))
	let [ referer , setreferer] = useState( searchParams.get ('referer') )
//	let itemid =get_last_part_of_path ( window.location.href )
	let axios = applytoken()	
	let [ myaddress , setmyaddress ]=useState( getmyaddress() )
	const getfeeamountstr=( amount,rate)=>
	useEffect(_=>{
		let { klaytn }=window
		if ( klaytn){}
		else {return }
		let myaddress = getmyaddress()
		setmyaddress ( myaddress )
		myaddress && query_eth_balance( myaddress ).then(resp=>{ LOGGER( 'mylcfti0uE' , resp )
			setmyethbalance( getethrep (resp ) )
		})
	} , [ window.klaytn ] )
//	LOGGER( '' , myaddress )
	const onclickbuy = _ =>{
		LOGGER( '' , itemData.item?.itemid ) // query_nfttoken_balance () // a little cumbersome
		let { item }= itemData
		let aargs =[
			ADDRESSES.erc1155
			, itemData.item?.itemid // item?.itemid
			, itemData.item?.tokenid // 0
			, sellorder.asset_amount_bid
			, item?.authorfee
			, item?.decimals
			, sellorder?.asset_contract_ask ? sellorder?.asset_contract_ask : ADDRESSES.zero
			, getweirep( sellorder?.asset_amount_ask ) 
			, sellorder?.username
			, myaddress
		]
		LOGGER( aargs )
//		return 		
		let abistr = getabistr_forfunction ( {
			contractaddress  :ADDRESSES.matcher_simple
			, abikind : 'MATCHER_SIMPLE'
			, methodname : 'mint_and_match_single_simple'
			, aargs } )
//			return
			requesttransaction ({
				from : myaddress
				, to : ADDRESSES.matcher_simple
				, data: abistr
				 , value : getweirep( sellorder.asset_amount_ask ) // '0x00'
			}).then(resp=>{LOGGER('' , resp )
				let { transactionHash , status }=resp
				if ( status == 'OK'){
					let reqbody={
						itemid
						, tokenid : itemData.item?.tokenid
						, amount : itemData.item?.countcopies
						, price : sellorder?.asset_amount_ask
						, username : myaddress
						, seller : sellorder?.username
						, buyer : myaddress
						, matcher_contract : ADDRESSES.matcher_simple_20220131
						, token_repo_contract : ADDRESSES.erc1155
						, adminfee :		{ address : ADDRESSES.vault , amount: getfeeamountstr(sellorder.asset_amount_ask ,FEES_DEF.ADMIN) , rate: FEES_DEF.ADMIN } // 
						, refererfee : referer ?	{ address : referer ,amount:getfeeamountstr(sellorder.asset_amount_ask ,FEES_DEF.REFERER ),rate: FEES_DEF.REFERER } : null
						, authorfee :		{ address : sellorder.author ,amount: getfeeamountstr(sellorder.asset_amount_ask , itemData.item?.authorfee ) ,rate: itemData?.item?.authorfee }
					}
					axios.post (API.API_REPORT_TX_CLOSE_SPOT + `/${transactionHash}` , reqbody).then(resp=>{ LOGGER('G6OvdxLxyA' , resp.data )
						let { status }=resp.data 
						if ( status=='OK'){
							SetErrorBar( messages.MSG_DONE_REGISTERING )
						}
					})
				}
			}).catch(err=>{
				LOGGER('' , err)
			}) // LOGGER( ''  , abistr )
		return
		if ( itemData?.item?.tokenid ){ 		} // on chain
		else {		}
	}
	const resolve_author_seller= itemData =>{
		if ( itemData?.minpriceorder ){
			let {username} = itemData?.minpriceorder // ?.username
			axios.get(API.API_OWNED_ITEMS + `/${username}/0/10/id/DESC`).then(resp=>{ LOGGER('' , resp.data )
				let {status , list }=resp.data
				if ( status=='OK'){
					setlistotheritems ( list )
				}
			})
			setiscollectionbyauthorseller ( 'seller')
		}
		else	{// return itemData?.author?.username
			let { username}= itemData?.author
			axios.get(API.API_AUTHORS_ITEMS + `/${username}/0/10/id/DESC`).then(resp=>{ LOGGER( '' , resp.data )
				let { status , list }=resp.data 
				if ( status =='OK'){
					setlistotheritems ( list )
				}
			})
			setiscollectionbyauthorseller ( 'author' )
		}
	}
	const fetchitem= _ => {
		Setisloader ( true )
    axios.get(`${API.API_GET_ITEM_DATA}/${itemid}`).then((res) => {	LOGGER( 'agwwiWSDdf' , res.data )
			let { status , respdata }=res.data
			if ( status =='OK'){
				setItemData( respdata )
				let {orders_sellside} = respdata
				setorders_sell ( orders_sellside )
				if (orders_sellside && orders_sellside.length){
					orders_sellside.forEach ( ( elem  , idx )  =>{
						axios.get(API.API_USER_INFO +`/${elem.username}`).then(resp=>{ LOGGER( 'V9kbW2K1sr' , resp.data )
							let {status , payload }=resp.data
							if ( status =='OK'){
								let { profileimage } = payload?.mongo
								if ( profileimage ) {
//									let jdata={} 
	//								jdata[v.username ] = profileimage
									jprofileimages[ idx ]= profileimage
									setjprofileimages ( jprofileimages )
								}
							}
						})						
					})
				}
//				setauthor ( respdata.author_mongo )
//				axios.get( API.API_OWNED_ITEMS + `/${}`)
				resolve_author_seller( respdata )
			}
			Setisloader ( false )
		})
		axios.get( `${API.API_ITEM_DATA_AUX}/${itemid}` ).then(resp=>{ LOGGER( '6ENydA38bX' , resp.data )
			let { status , respdata }=resp.data
			if ( status == 'OK'){
				setitemdataaux ( respdata )
				setauthor ( respdata.author_mongo )
/** 				setlogorders ( respdata.logorders )
				let { logprices , logact ions } =respdata
				setlogprices ( logprices )
				setlogactions ( logact ions )
				setpricestats ( getMaxMinAvg ( logprices ) )*/
				if ( respdata.transactions ) {
					// settransactionHistory ( respdata.transactions )
 					setlogorders ( respdata.logorders )
					let { logprices , logactions } =respdata
					setlogprices ( logprices )
//					setlogactions ( logactions )
					setpricestats ( getMaxMinAvg ( logprices ) )
				}
			}
		})
		axios.get(`${API.API_TRANSACTIONS}/itemid/${itemid}/0/100/id/DESC`).then(resp=>{ LOGGER("" , resp.data )
			let {status , list}=resp.data
			if(status =='OK'){
				settransactionHistory( list )
			}		
		}) // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
		
	}
  function onClickUserPreBtn() {
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage)
    if (userIndex > 0) setUserIndex(userIndex - 1);
    else setUserIndex(pageNum - 1);
  }
  function onClickUserNextBtn() {
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage)
    if (userIndex < pageNum - 1) setUserIndex(userIndex + 1);
    else setUserIndex(0);
  }
  useEffect(() => { LOGGER( '8xlWxqxeC2' , itemid , referer )
		fetchitem()
		axios.get(`${API.API_TICKERS}/USDT`).then(resp=>{LOGGER( '' , resp.data )
			let { status , list }=resp.data
			if ( status =='OK'){
				setpriceklay ( list[ PAYMEANS_DEF ] ) // 'KLAY'				
			}
		})
  }, [] )

  useEffect(() => {
return ;    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage )

    if (itemWrapRef.current?.scrollTo) {
      if (userIndex < pageNum) {
        itemWrapRef.current.scrollTo({
          left: contWidth * itemNumByPage * userIndex,
          behavior: "smooth",
        });
      } else {
        itemWrapRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [userIndex] )
  // useE ffect(() => {
  //   const setAuctionTimer = () => {
  //     let now = moment().format("DD/MM/YYYY HH:mm:ss");
  //     let then = moment(endAutionTime).format("DD/MM/YYYY HH:mm:ss");

  //     let ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(
  //       moment(now, "DD/MM/YYYY HH:mm:ss")
  //     );
  //     let d = moment.duration(ms);
  //     let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

  //     if (d.asSeconds() < 0) {
  //       setDiffTime(moment().format("00:00:00"));
  //       setNearEnd(false);
  //       return;
  //     }

  //     if (!nearEnd && d.asHours() < 12) {
  //       setNearEnd(true);
  //     }
  //     setDiffTime(s);
  //   };

  //   setInterval(setAuctionTimer, 1000);

  //   return () => {
  //     clearInterval(setAuctionTimer);
  //   };
  // }, [endAutionTime]);

  return (
    <SignPopupBox>
      {ownerPopup && <ItemOwnerPopup off={setOwnerPopup} />}

      {likePopup && <ItemLikePopup off={setLikePopup} />}

      {bidPopup && (
        <div className="popup info" id="info_popup" style={{ display: "block" }}>
          <div className="box_wrap buynft">
            <a
              onClick={() => setBidPopup(false)}
              className="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div className="poptitle nob">
              <h2>Purchase receipt</h2>
            </div>
            <div className="list_bottom buy_nft">
              <p className="warn" style={{display: itemData?.item?.isreviewed ? 'none':'block'}}>
                Warning! Contains items
                <br /> that have not been reviewed and approved
              </p>
              <div className="receipt_section">
                <div className="receipt_title">
                  <p className="rec_t">Item</p>
                  <p className="rec_t right">Subtotal</p>
                </div>
                <div className="receipt_item">
                  <ul>
                    <li>
                      <span className="pic"></span>
                      <div className="right_price">
                        <h3>
                          { convertLongString( 8 , 4 , sellorder?.username)  }
                          <br />
                          <span>{ itemData?.item?.titlename } </span>{/**Blackman with neon */}
                        </h3>
                        <h4 className="m_sub">
                          <img src={require("../img/sub/rock.png").default} />
                          <span className="pri">{ sellorder?.asset_amount_bid } of token #{sellorder?.tokenid } </span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>										
											<p className="rec_t"  >
                        Total<span className="red"
												>
												{+myethbalance && ( +myethbalance > sellorder?.asset_amount_ask )
												 ? '-' : 'Insufficient KLAY balance' 
												}
												</span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          { sellorder?.asset_amount_ask }<span className="pri">
(${ priceklay && sellorder?.asset_amount_ask ? +priceklay *sellorder?.asset_amount_ask : '' })</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                    <li><p className='rec_t'>your balance</p>
										<div className='right_price m_left'>
											<h4 className='m_sub'>
												{myethbalance}
											</h4>
										</div>
										
										 </li>
                </div>
                <form className="ckb_wrap">
                  <div className="ckb" style={{display : itemData?.item?.isreviewed ? 'none' : 'block'}}>
                    <input type="checkbox" id="chk" name="chk1" />
                    <label for="chk">
                      Aware that Itemverse contains one item that has not been
                      reviewed and approved
                    </label>
                  </div>
                  <div className="ckb">
                    <input type="checkbox" id="chk2" name="chk1" onChange={e=>{
											setistoschecked( ! istoschecked ) // LOGGER()
										}}/>
                    <label for="chk2">
                      I agree to Itemverse's <b>Terms of Service</b>
                    </label>
                  </div>
                </form>
              </div>
							<a className="reportit on "
								disabled={ istoschecked ? false : true }
								onClick={ _=>{
									if (istoschecked){}
									else {SetErrorBar( messages.MSG_PLEASE_CHECK_TOS ); return }
									LOGGER( 'pHeiL5AWXM' )
									onclickbuy()
								}}
							>Make a payment</a>
            </div>
          </div>
        </div>
      )}

      <section id="sub">
        <article className="bundle_box box2 box3">
          <div className="wrap">
            <div className="bundle_top">
              <div className="bun_tl">
                <div className="bun_tl_img" style={{backgroundImage :  `url(${itemData?.item?.url})`  }} >
                  <div className="bt artist">
                    <h2>
										{/**  <img src={author?.profileimage}></img>*/}
                      <span
                        style={{
                          backgroundImage: `url(${author?.profileimage })`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></span>
                      @{ itemData.author?.nickname }
                    </h2>
                  </div>
                  <div className="bt likes">
                    <a
											onClick={() => { setLikePopup(true)											
											} }
                      className="like_heart off"
                    >
                      <h2>{itemData.item?.countfavors} Likes</h2>
                    </a>
                  </div>
                  <div className="views">
                    <ul>
                      <li
                        className="ownerBox"
                        onClick={() => setOwnerPopup(true)}
                      >
                        <h3>{itemData.countholders}</h3>
                        <h4>Owner</h4>
                      </li>
                      <li>
                        <h3>{itemData.item?.countcopies}</h3>
                        <h4>Fragment</h4>
                      </li>
                      <li>
                        <h3>{numFormatter(itemData.item?.countviews)}</h3>
                        <h4>views</h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bun_tr">
                <div className="bun_right">
                  <div className="right_t">
                    <div className="tt">
                      <h2>{itemData?.item?.titlename}</h2>
                      <div className="icons">
                        <a onClick={_=>{
													fetchitem()
												}}> 
                          <img
                            src={require("../img/sub/refresh.png").default}
                          />
                        </a>
                        <a>
                          <img src={require("../img/sub/alert.png").default} />													
                        </a>

                        <a onClick={_=>{
													onClickCopy( window.location.href )
													SetErrorBar ( messages.MSG_COPIED )
												}}>
                          <img src={require("../img/sub/share.png").default} />
                        </a>
												<a onClick={_=>{
													LOGGER( 'CodOU75E5r' )
													axios.post ( `${API.API_TOGGLE_FAVOR}/${itemid}` ).then(resp=>{	LOGGER( '' , resp.data )
														let { status , respdata }=resp.data
														if ( status =='OK'){
															if ( respdata) {setilikethis ( true) ; SetErrorBar (messages.MSG_FAVORITED )} 
															else { setilikethis ( false ) ; SetErrorBar ( messages.MSG_UNFAVORITED ) }
														}
													})
												}}><img src={ilikethis ? I_heartOPink : I_heartOGray}></img></a>

												<a onClick={_=>{
													axios.post( `${API.API_TOGGLE_BOOKMARK}/${itemid}`).then(resp=>{ LOGGER( '' , resp.data )
														let { status , respdata } =resp.data
														if ( status == 'OK'){
															if ( respdata ){setibookmarkthis (true );	SetErrorBar ( messages.MSG_DID_BOOKMARK )}
															else {setibookmarkthis (false ); SetErrorBar( messages.MSG_UNDID_BOOKMARK )}
														}
													})
												}}												
												><img src={ require("../img/sub/alert.png").default }></img> </a>
                      </div>
                    </div>
                    <div className="boxes">
                      <h2>Owner public content include</h2>
                      <div className="black_box">
                        <ul>
                          <li> {/** itemData.item?.price */}
                            <h3>Price</h3>
                            <h4>
                              { sellorder?.asset_amount_ask } 
                              <span>&nbsp;{ 'KLAY' }</span>
                            </h4>
                            <h5>                              
															Qty. { sellorder?.asset_amount_bid } of token #{itemData?.item?.tokenid}
                              {/** itemData.item?.normprice &&
                                itemData.item.normprice.toLocaleString(
                                  "en",
                                  "US"
                                )*/}
                            </h5>
                          </li>
                          {/* <li>
                            <h3>Auction ending in</h3>
                            <h4 style={nearEnd ? { color: "red" } : {}}>
                              {diffTime}
                            </h4>
                          </li> */}
                        </ul>
                        <a onClick={() =>{
setBidPopup ( true )
												} } className="bid">
                          Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bun_full">
              <div className="desc">
                <h2 className="i_title">Description</h2>
                <p>{itemData.item?.description}</p>
              </div>
            </div>
            <div className="bundle_top top2">
              <div className="bun_tl">
                <div className="right_m">
                  <h2 className="i_title">Price History</h2>
                  <form>
                    <select>
                      <option>Last 60 Days</option>
                    </select>
                  </form>
                  <div className="prices">
                    <ul>
                      <li>
                        <h3>Average price</h3>
                        <p>{ pricestats [ 2 ] || 'NA' }</p>
                      </li>
                      <li>
                        <h3>Highest price</h3>
                        <p>{ pricestats [ 0 ] || 'NA' }</p>
                      </li>
                      <li>
                        <h3>Lowest price</h3>
                        <p>{ pricestats [ 1 ] || 'NA' }</p>
                      </li>
                    </ul>
                  </div>
                  <div className="graph">
                    <img
                      src={require("../img/sub/Component.png").default}
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
              <div className="bun_tr">
                <div className="right_b">
                  <h2 className="i_title">Offer History</h2>
                  <div className="history_s container">
                    <ul>
                      {orders_sell.map((v , idx ) => {
												/** if (lockjprofileimages[ v.username ] ){}
												else {
													lockjprofileimages[ v.username]=1
													axios.get(API.API_USER_INFO +`/${v.username}`).then(resp=>{
														let {status , payload }=resp.data
														if ( status =='OK'){
															let { profileimage } = payload?.mongo
															if ( profileimage ) {
																let jdata={} 
																jdata[v.username ] = profileimage
																setjprofileimages ({... jprofileimages , ... jdata } )
															}
														}
													})
												} */
												return (
												<li key={idx } onClick={_=> {	SetErrorBar('BpAzNi4c1n')
//													setactiveorder ( v ) 
													setsellorder ( v )
													return 
												} }>
                          <span className="profile_img" style={{backgroundImage :`url(${jprofileimages[ idx ]})` }}></span>
                          <h3>
                            { v.asset_amount_ask } KLAY for { v.asset_amount_bid }
                            <br />
                            <span>{ convertLongString(10, 0, v.username)}</span>
														<span>{ v.nickname }</span>
                          </h3>
                          <h4>{ convertLongString(8, 8, v.address)}</h4>
                          <h5>{ gettimestr ( v.createdat ) }</h5>
                        </li>
											)	
										}
											)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="status s_pc">
              <div className="mptable left">
                <strong>SALES STATUS</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "48%" }} />
                        <col style={{ width: "22%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price</th>
                          <th>Expired</th>
                          <th>Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logsales.map((v) => (
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  style={{ width: "24px" }}
                                  alt=""
                                />
                                <p>
                                  {v.tokenprice} KLAY{" "}
                                  <span>(${v.priceusd})</span>
                                </p>
                              </div>
                              <div className="pur">
                                <a>{v.kind}</a>
                              </div>
                            </td>
                            <td>{moment(v.expired).toNow()}</td>
                            <td className="blue">{v.seller}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mptable right">
                <strong>PURCHASE STATUS</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "39%" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price</th>
                          <th>Expired</th>
                          <th>Buyer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logorders.map((v , idx ) => (
                          <tr key={idx}>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  style={{ width: "24px" }}
                                  alt=""
                                />
                                <p>
                                  {v.tokenprice} KLAY{" "}
                                  <span>(${v.priceusd})</span>
                                </p>
                              </div>
                            </td>
                            <td>{moment(v.expired).toNow()}</td>
                            <td className="blue">{v.buyer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="status s_m">
              <div className="mptable left">
                <strong>Sales status</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "75%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price/Expired</th>
                          <th>Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">Esther</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mptable right">
                <strong>Purchase status</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "75%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price/Expired</th>
                          <th>Buyer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">Esther</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="basic plustab ml2">
              <div className="tab">
                <ul>
                  {chartCategoryList.map((cont, index) => (
                    <li key={index}
                      className={chartCategory === index && "on"}
                      onClick={() => setChartCategory(index)}
                    >
                      {cont}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab_bottom container con3" id="FixedTable">
                <table>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead className="head">
                    <tr>
                      <th>Event</th>
                      <th>Price</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th className="hchain">Tx confirm</th>
                    </tr>
                  </thead>
                  <tbody className="body">
                    { transactionHistory.map( (v , idx ) => (
                      <tr key={ idx }>
                        <td>{ gettimestr( v.createdat )  }</td>
                        <td className="bold">{ strDot( v.txhash, 8,4) } KLAY</td>
                        <td className="blue">{ v.username }</td>
                        <td className="blue">{ v.typestr }</td>												
                        <td className="gray">{moment(v.createdat).fromNow()}</td>
                        <td>
<span onClick={_=>{
	window.open( URL_TX_SCAN[v.nettype] + `/${v.txhash}` , '_blank').focus();
}} className={v.chainOn ? "chain on" : "chain off"} ></span>
{/*                          <a                             className={v.chainOn ? "chain on" : "chain off"}                          ></a>
										*/}

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="wrap">
              <h4 className="t">Other works from {iscollectionbyauthorseller}</h4>

              <div className="swiper">
                <div className="swiper-container swiper-container-trendingitem">
                  <ol className="item item4 buy swiper-wrapper">
                    <div className="slideBox" ref={itemWrapRef}>
                      { listotheritems.filter(elem => elem.item?.itemid == itemid ? false : true).sort((a,b)=> a.id-b.id ).map((cont, index) => (

												<span key={index}>
                          <li
                            className="swiper-slide"
														onClick={() =>{ // window.location.reload()
															navigate(`/singleitem/${cont.item?.itemid}`)
														}}
                          >
                            <a style={{ backgroundImage: `url(${cont.item?.url })` }}>
                              <div className="on">
                                <ul>
                                  <li className="heart off">{ cont?.countfavors }</li>
                                  <li className="star off"></li>
                                </ul>
                                <div>{ cont?.item?.titlename }</div>
                                <span>{ cont?.item?.author?.nickname }</span>
                                <ol>
                                  <li>6 minutes left</li>
                                  <li>1.67 KLAY</li>
                                </ol>
                                <p>Buy Now</p>
                              </div>
                            </a>
                          </li>
                        </span>

                      ))}
                    </div>
                  </ol>
                </div>

                <div
                  className="swiper-button-prev swiper-button-trendingitem-prev pcno"
                  onClick={onClickUserPreBtn}
                ></div>
                <div
                  className="swiper-button-next swiper-button-trendingitem-next pcno"
                  onClick={onClickUserNextBtn}
                ></div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .swiper-wrapper,
  .slideBox {
    overflow-x: scroll;
    transition: 0.8s;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  *::-webkit-scrollbar {
    width: 4px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 4px;
    width: 6px;
  }
  *::-webkit-scrollbar-track {
    background-color: #d8d8d8;
    border-radius: 4px;
    border: 1px solid #f6f6f6;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}
function mapDispatchToProps(dispatch) {
  return {
		setConnect: () => dispatch(setConnect()),
		Setisloader : payload => dispatch ( setisloader ( payload ))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);

const chartCategoryList = ["Transaction History", "Chain Information"];

let orders={ asset_amount_ask: "12"
,asset_amount_bid: "1"
,asset_contract_ask: null
,asset_contract_bid: "0xb7aa9cd318e97f42a477dc1d9185fdec5503e9b5"
,asset_id_ask: null
,asset_id_bid: null
,createdat: "2022-01-24T09:11:17.000Z"
,datahash: null
,id: 7
,isprivate: 0
,itemid: "QmWFGooUcsbdMMHWxTBwNi3xoX1Wp62EStV3YbGCaTkmrk"
,makerortaker: 0
,matcher_contract: null
,privateaddress: null
,rawdata_to_sign: "{\"seller_address\":\"0x90033484a520b20169b60f131b4e2f7f46923faf\",\"amount\":1,\"price\":12,\"priceunit\":\"0x000000000000000000000000000000000000\",\"expiry\":0,\"itemid\":\"QmWFGooUcsbdMMHWxTBwNi3xoX1Wp62EStV3YbGCaTkmrk\",\"tokenid\":null}"
,rawdatahash: "9d26fa13c5595761156898a27d3dfe94d090c9634255b61eaa6bec4ca1d2d7f1"
,sig_r: "0x3f4510a8753b867bb8e8419fdc0102fa30830d81612c979751bacb1d45c7ffac"
,sig_s: "0x47db87c9ba82941178a377c517fc0ccc73bf0e41915599cae6c468be47ad7b6c"
,sig_v: "0x1b"
,signature: null
,signaturestr: "0x3f4510a8753b867bb8e8419fdc0102fa30830d81612c979751bacb1d45c7ffac47db87c9ba82941178a377c517fc0ccc73bf0e41915599cae6c468be47ad7b6c1b"
,supertype: 1
,supertypestr: "SELL"
,type: null
,typestr: null
,updatedat: null
,username: "0xaec2f4dd8b08eef0c71b02f97978106d875464ed"
,uuid: "39326de3-438c-4ebd-b2ec-092b271db16a"}

/** 				requesttransaction({ from : myaddress
			, to : ADDRESSES.auction_repo_dutch_bulk
			, data : abistr
			, value : '0x00'
		}).then(resp=>{ LOGGER( '' , resp )
			let { transactionHash , status } = resp
			LOGGER( '' , transactionHash , status )
		}).catch(err=>{
			LOGGER('' , err )
		})
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
