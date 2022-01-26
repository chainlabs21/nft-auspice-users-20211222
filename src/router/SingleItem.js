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
import { onClickCopy, LOGGER
	, getMaxMinAvg
	, get_last_part_of_path
	, gettimestr
} from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from '../config/messages'
import I_heartO from "../img/main/I_heartO.svg"
import I_heartOGray from "../img/sub/I_heartOGray.svg"
import I_heartOPink from '../img/sub/I_heartOPink.svg'
import { useSearchParams } from "react-router-dom";
import { query_nfttoken_balance } from "../util/contract-calls";

const convertLongString = (startLength, endLength, str) => {
	if (!str) return;
	const head = str.substring(0, startLength);
	const spread = "......";
	const tail = str.substring(str.length - endLength, str.length);
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
	let [ logactions , setlogactions ] = useState ( [] )
	let [ pricestats , setpricestats ] = useState ( [] )
	let [ ilikethis , setilikethis ] = useState( false )
	let [ orders_sell , setorders_sell ] = useState( [] )
	let [ sellorder , setsellorder ] =useState ( {} )
	let [ author , setauthor ]= useState()
//	let [ searchParams, setSearchParams ] = useSearchParams()
//	let [ itemid , setitemid ] = useState( searchParams( ))
	let itemid =get_last_part_of_path ( window.location.href ) 
	let axios = applytoken()
	const onclickbuy = _ =>{		LOGGER('' , )
//		query_nfttoken_balance () // a little cumbersome 
		if ( itemData?.item?.tokenid ){ // on chain

		} else {

		}
	}
	const fetchitem= _ => {
		Setisloader ( true )
    axios.get(`${API.API_GET_ITEM_DATA}/${itemid}`).then((res) => {
			let { status , respdata }=res.data
			if ( status =='OK'){				console.log(res.data.respdata);
				setItemData( respdata )
				setorders_sell ( respdata.orders_sellside )
				setauthor ( respdata.author_mongo )
			}
			Setisloader ( false )
		})
		axios.get( `${API.API_ITEM_DATA_AUX}/${itemid}` ).then(resp=>{ LOGGER( '' , resp.data )
			let { status , respdata }=resp.data
			if ( status == 'OK'){
				setitemdataaux ( respdata )
				if ( respdata.transactions ) {
					settransactionHistory ( respdata.transactions )
					setlogorders ( respdata.logorders )
					let { logprices , logactions } =respdata
					setlogprices ( logprices )
					setlogactions ( logactions )
					setpricestats ( getMaxMinAvg ( logprices ) )
				}
			}
		})
	}
  function onClickUserPreBtn() {
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

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

  useEffect(() => {
		fetchitem()
  }, []);

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
  }, [userIndex]);

  // useEffect(() => {
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
        <div class="popup info" id="info_popup" style={{ display: "block" }}>
          <div class="box_wrap buynft">
            <a
              onClick={() => setBidPopup(false)}
              class="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div class="poptitle nob">
              <h2>Purchase receipt</h2>
            </div>
            <div class="list_bottom buy_nft">
              <p class="warn">
                Warning! Contains items
                <br /> that have not been reviewed and approved
              </p>
              <div class="receipt_section">
                <div class="receipt_title">
                  <p class="rec_t">Item</p>
                  <p class="rec_t right">Subtotal</p>
                </div>
                <div class="receipt_item">
                  <ul>
                    <li>
                      <span class="pic"></span>
                      <div class="right_price">
                        <h3>
                          { convertLongString(8, 4 , sellorder?.username)  }
                          <br />
                          <span>{ itemData?.item?.titlename } </span>{/**Blackman with neon */}
                        </h3>
                        <h4 class="m_sub">
                          <img src={require("../img/sub/stone.png").default} />
                          <span class="pri">({ itemData?.item?.normprice })</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p class="rec_t">
                        Total<span class="red">Insufficient KLAY balance</span>
                      </p>
                      <div class="right_price m_left">
                        <h4 class="blue">
                          <img src={require("../img/sub/stone.png").default} />
                          25<span class="pri">($58,282.50)</span>
                        </h4>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                </div>
                <form class="ckb_wrap">
                  <div class="ckb">
                    <input type="checkbox" id="chk" name="chk1" />
                    <label for="chk">
                      Aware that Itemverse contains one item that has not been
                      reviewed and approved
                    </label>
                  </div>
                  <div class="ckb">
                    <input type="checkbox" id="chk2" name="chk1" />
                    <label for="chk2">
                      I agree to Itemverse's <b>Terms of Service</b>
                    </label>
                  </div>
                </form>
              </div>
              <a class="reportit on "
								onClick={ _=>{
									LOGGER( 'pHeiL5AWXM' )
									onclickbuy()
								}}
							>Make a payment</a>
            </div>
          </div>
        </div>
      )}

      <section id="sub">
        <article class="bundle_box box2 box3">
          <div class="wrap">
            <div class="bundle_top">
              <div class="bun_tl">
                <div class="bun_tl_img" style={{backgroundImage :  `url(${itemData?.item?.url})`  }} >
                  <div class="bt artist">
                    <h2>
										<img src={author?.profileimage}></img>											
                      <span
                        style={{
                          backgroundImage: `url(${author?.profileimage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></span>
                      @{ itemData.author?.nickname }
                    </h2>
                  </div>
                  <div class="bt likes">
                    <a
											onClick={() => { setLikePopup(true)											
											} }
                      class="like_heart off"
                    >
                      <h2>{itemData.item?.countfavors} Likes</h2>
                    </a>
                  </div>
                  <div class="views">
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

              <div class="bun_tr">
                <div class="bun_right">
                  <div class="right_t">
                    <div class="tt">
                      <h2>{itemData?.item?.titlename}</h2>
                      <div class="icons">
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
													axios.post ( `${API.API_TOGGLE_FAVOR}/${itemid}` ).then(resp=>{														LOGGER( '' , resp.data )
														let { status , respdata }=resp.data
														if ( status =='OK'){
															if ( respdata) {setilikethis ( true) ; SetErrorBar (messages.MSG_FAVORITED )} 
															else { setilikethis ( false ) ; SetErrorBar ( messages.MSG_UNFAVORITED ) }
														}
													})
												}}><img src={ilikethis ? I_heartOPink : I_heartOGray}></img></a>
                      </div>
                    </div>
                    <div class="boxes">
                      <h2>Owner public content include</h2>
                      <div class="black_box">
                        <ul>
                          <li> {/** itemData.item?.price */}
                            <h3>Price</h3>
                            <h4>
                              { sellorder?.asset_amount_ask } 
                              <span>&nbsp;{ 'KLAY' }</span>
                            </h4>
                            <h5>
                              
															{ sellorder?.asset_amount_bid } {itemData?.tokenid}
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
                        <a onClick={() => setBidPopup(true)} class="bid">
                          Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bun_full">
              <div class="desc">
                <h2 class="i_title">Description</h2>
                <p>{itemData.item?.description}</p>
              </div>
            </div>
            <div class="bundle_top top2">
              <div class="bun_tl">
                <div class="right_m">
                  <h2 class="i_title">Price History</h2>
                  <form>
                    <select>
                      <option>Last 60 Days</option>
                    </select>
                  </form>
                  <div class="prices">
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
                  <div class="graph">
                    <img
                      src={require("../img/sub/Component.png").default}
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
              <div class="bun_tr">
                <div class="right_b">
                  <h2 class="i_title">Offer History</h2>
                  <div class="history_s container">
                    <ul>
                      {orders_sell.map((v , idx ) => (
												<li key={idx } onClick={_=> { SetErrorBar('BpAzNi4c1n') ; 
													setsellorder ( v )
												
												return } }>
                          <span class="profile_img"></span>
                          <h3>
                            { v.asset_amount_ask } KLAY for {v.asset_amount_bid }
                            <br />
                            <span>{ convertLongString(10, 0, v.username)}</span>
														<span>{ v.nickname }</span>
                          </h3>
                          <h4>{ convertLongString(8, 8, v.address)}</h4>
                          <h5>{ gettimestr ( v.createdat ) }</h5>
                        </li>
											))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="status s_pc">
              <div class="mptable left">
                <strong>SALES STATUS</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                              <div class="name price">
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
                              <div class="pur">
                                <a>{v.kind}</a>
                              </div>
                            </td>
                            <td>{moment(v.expired).toNow()}</td>
                            <td class="blue">{v.seller}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mptable right">
                <strong>PURCHASE STATUS</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                              <div class="name price">
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
                            <td class="blue">{v.buyer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="status s_m">
              <div class="mptable left">
                <strong>Sales status</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                            <div class="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">Esther</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mptable right">
                <strong>Purchase status</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                            <div class="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td class="blue">Esther</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="basic plustab ml2">
              <div class="tab">
                <ul>
                  {chartCategoryList.map((cont, index) => (
                    <li key={index}
                      class={chartCategory === index && "on"}
                      onClick={() => setChartCategory(index)}
                    >
                      {cont}
                    </li>
                  ))}
                </ul>
              </div>
              <div class="tab_bottom container con3" id="FixedTable">
                <table>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead class="head">
                    <tr>
                      <th>Event</th>
                      <th>Price</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th class="hchain">Tx confirm</th>
                    </tr>
                  </thead>
                  <tbody class="body">
                    { transactionHistory.map( (v , idx ) => (
                      <tr key={ idx }>
                        <td>{v.event}</td>
                        <td class="bold">{v.tokenprice} KLAY</td>
                        <td class="blue">{v.from}</td>
                        <td class="blue">{v.to}</td>
                        <td class="gray">{moment(v.date).toNow()}</td>
                        <td>
                          <span
                            class={v.chainOn ? "chain on" : "chain off"}
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="wrap">
              <h4 class="t">Other works in this collection</h4>

              <div class="swiper">
                <div class="swiper-container swiper-container-trendingitem">
                  <ol class="item item4 buy swiper-wrapper">
                    <div className="slideBox" ref={itemWrapRef}>
                      { logactions.map((cont, index) => (

												<span key={index}>
                          <li
                            class="swiper-slide"
                            onClick={() => window.location.reload()}
                          >
                            <a style={{ backgroundImage: `url(${sample})` }}>
                              <div class="on">
                                <ul>
                                  <li class="heart off">1,389</li>
                                  <li class="star off"></li>
                                </ul>
                                <div>Summer Pool</div>
                                <span>David</span>
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
                  class="swiper-button-prev swiper-button-trendingitem-prev pcno"
                  onClick={onClickUserPreBtn}
                ></div>
                <div
                  class="swiper-button-next swiper-button-trendingitem-next pcno"
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