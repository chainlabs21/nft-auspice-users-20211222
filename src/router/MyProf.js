import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import rock from "../img/sub/rock.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";
import filter_icon from "../img/sub/filter_icon.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";// import "./css/style01.css";// import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css"
import SetErrorBar from '../util/SetErrorBar'
import { onClickCopy , getmyaddress, LOGGER } from '../util/common'
import { useEffect , useRef, useState } from "react"
import { messages } from "../config/messages";
import { strDot } from "../util/Util";
import { applytoken } from '../util/rest'
import { API } from '../config/api'
function MyProf({ store, setConnect }) {
  const itemListRef = useRef();
  const navigate = useNavigate();
  const [ morePopupIndex, setMorePopupIndex] = useState(-1);
  const [ toggleFilter, setToggleFilter] = useState(false);
  const [ filterObj, setFilterObj] = useState({});
  const [ filterList, setFilterList] = useState([]);
  const [ selectItemIndex, setSelectItemIndex] = useState(-1);
  const [ unit, setUnit] = useState("USD");
  const [ fromPrice, setFromPrice] = useState("");
  const [ toPrice, setToPrice] = useState("");
  const [ priceFilterToggle , setPriceFilterToggle] = useState(false);
  const [ callEffect , setCallEffect] = useState( false )
  const [ pricePopup , setPricePopup] = useState( false )
//	let [ myaddress , setmyaddress ] = useState( getmyaddress() )
	let [ myaddress , setmyaddress ] = useState('0xaec2f4dd8b08eef0c71b02f97978106d875464ed' )
	let [ myinfo_maria , setmyinfo_maria ]=useState()
	let [ myinfo_mongo , setmyinfo_mongo ]=useState()
	let [ listitems , setlistitems ]=useState( [] )
	let axios= applytoken()
	useEffect( _=>{
		axios.get( `${API.API_GET_USER_INFO}` ).then(resp=>{ LOGGER( 'up9xNJ6kwp' , resp.data )
			let { status , payload }=resp.data
			if ( status=='OK' ){
				setmyinfo_maria ( payload.maria )
				setmyinfo_mongo ( payload.mongo )
			} else {}
		})
		axios.get( `${API.API_MYITEMS}/${myaddress}/0/10/id/DESC`).then(resp=>{ LOGGER( 'wyBPdUnid7' , resp.data )
			let { status , list }=resp.data 
			if ( status =='OK' ){
				setlistitems( list )
			}
		})
	} , [] )

  function getSelectText() {
    switch (unit) {
      case "USD":
        return "United States Dollars (USD)";
      case "KLAY":
        return "Klaytn";
      default:
        break;
    }
  }
  function onClickOption(data) {
    setUnit(data);
    setPriceFilterToggle(false);
    setFromPrice(0.0);
    setToPrice(0.0);
    setCallEffect(!callEffect);
    setPricePopup(false);
  }
  function editFilterList(category, cont) {
    let dataObj = filterObj;
    dataObj[category] = cont;
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onClickFilterReset() {
    setFilterObj({});
    setFilterList([]);
  }

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    if (morePopupIndex === index) setMorePopupIndex(-1);
    else setMorePopupIndex(index);
  }

  function onClickFilterCancel(cont) {
    let dataObj = filterObj;

    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] == cont) {
        delete dataObj[key];
      }
    }

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onClickLink(e, link) {
    e.stopPropagation();
    navigate(`${link}`);
  }

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="profile_home">
          <div class="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

            <div class="wrap">
              <div class="collection_detail">
                <div class="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div class="home_icons">
                    <a>
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a onClick={_=>{
onClickCopy( window.location.href )
SetErrorBar( messages.MSG_COPIED)
										}}>
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 class="notop">{myinfo_maria?.nickname }'s Collection</h2>
                <h3>{strDot( myaddress , 4 , 4 )}</h3>
                <h4> { myinfo_mongo?.description }
{/**                   Henry is a mixed-media artist living in the
                  <br class="mo" /> Bay Area and uses
                  <br class="pc" />a stream of consciousness
									<br class="mo" /> approach to his work.
*/}
                </h4>
              </div>
            </div>

            <div class={toggleFilter ? "move on deal" : "move off"}>
              <div class="cw ucl">
                <span class="close" onClick={() => setToggleFilter(true)}>
                  <img src={require("../img/sub/side_close.png").default} />
                  <b class="mclose" onClick={() => setToggleFilter(true)}>
                    Filter<span>1</span>
                  </b>
                </span>
                <div class="left_move">
                  <form className="filterBox">
                    <div class="topBar">
                      <span className="leftBox">
                        <img src={filter_icon} alt="" />
                        <p>Filter</p>
                      </span>
                      <img
                        src={require("../img/sub/filter_close.png").default}
                        class="fc"
                        onClick={() => setToggleFilter(false)}
                      />
                    </div>

                    <details class="filterDetails">
                      <summary class="filterSummary">
                        <p className="filterTitle">Status</p>

                        <img src={I_dnArrow} class="slide_up" />
                      </summary>

                      <ul className="filterContList typeList">
                        {statusList.map((cont, index) => (
                          <li
                            key={index}
                            style={{ cursor: "pointer" }}
                            className={filterObj[cont] === cont && "on"}
                            onClick={() => editFilterList(cont, cont)}
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </details>

                    <details class="filterDetails">
                      <summary class="filterSummary">
                        <p className="filterTitle">Price</p>

                        <img src={I_dnArrow} class="slide_up" />
                      </summary>
                      <div class="filterContList priceBox">
                        <div className="settingBox">
                          <div className="selectPosBox">
                            <div
                              className="selectBox"
                              onClick={() => setPricePopup(true)}
                            >
                              <p>{getSelectText()}</p>

                              <img src={I_dnArrow} alt="" />
                            </div>

                            {pricePopup && (
                              <ul
                                className="optionList"
                                onClick={onClickOption}
                              >
                                {optionList.map((cont, index) => (
                                  <li
                                    key={index}
                                    onClick={() => setUnit(cont.value)}
                                  >
                                    {cont.text}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div class="priceAreaBox">
                            <div className="priceInputBox minBox">
                              <input
                                type="text"
                                value={fromPrice}
                                onChange={(e) => setFromPrice(e.target.value)}
                                placeholder="0.00"
                              />
                              <p className="unit">{unit}</p>
                            </div>

                            <p>~</p>

                            <div class="priceInputBox maxBox">
                              <input
                                type="text"
                                value={toPrice}
                                onChange={(e) => setToPrice(e.target.value)}
                                placeholder="0.00"
                              />
                              <p className="unit">{unit}</p>
                            </div>
                          </div>
                        </div>

                        <button
                          class="applyBtn"
                          onClick={() => {
                            setPriceFilterToggle(true);
                            setCallEffect(!callEffect);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </details>

                    <details class="filterDetails">
                      <summary class="filterSummary">
                        <p className="filterTitle">Items</p>

                        <img src={I_dnArrow} class="slide_up" />
                      </summary>

                      <div class="filterContList searchListBox">
                        <div className="inputBox">
                          <img src={loupe} alt="" />
                          <input
                            type="text"
                            placeholder="Filter"
                            class="s_search"
                          />
                        </div>

                        <ul className="searchList">
                          {filterSearchData.map((cont, index) => (
                            <li key={index}>
                              <img src={cont.img} alt="" />
                              <p>{cont.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>

                    <details class="filterDetails">
                      <summary class="filterSummary">
                        <p className="filterTitle">Chains</p>

                        <img src={I_dnArrow} class="slide_up" />
                      </summary>

                      <ul className="filterContList chainList">
                        {chainList.map((cont, index) => (
                          <li
                            key={index}
                            class="ra"
                            onClick={() => editFilterList("chain", cont.name)}
                          >
                            <span
                              className="chkBtn"
                              style={{
                                background:
                                  filterObj.chain === cont.name && "#000",
                              }}
                            >
                              <span />
                            </span>

                            <div className="name">
                              <img src={cont.img} />
                              {cont.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </details>

                    <details class="filterDetails">
                      <summary class="filterSummary">
                        <p className="filterTitle">Sales Coin</p>

                        <img src={I_dnArrow} class="slide_up" />
                      </summary>

                      <div class="filterContList searchListBox">
                        <div className="inputBox">
                          <img src={loupe} alt="" />
                          <input
                            type="text"
                            placeholder="Filter"
                            class="s_search"
                          />
                        </div>

                        <ul className="selectList">
                          {coinList.map((cont, index) => (
                            <li
                              key={index}
                              class="ra"
                              onClick={() => editFilterList("coin", cont)}
                            >
                              <span
                                className="chkBtn"
                                style={{
                                  background: filterObj.coin === cont && "#000",
                                }}
                              >
                                <span />
                              </span>

                              <label for={cont}>{cont}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </form>
                </div>
              </div>

              <div class="right_move">
                <div class="real_sec">
                  <ul class="tab">
                    <li class="onn">Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li onClick={() => navigate("/liked")}>Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li onClick={() => navigate("/referals")}>Referals</li>
                  </ul>
                  <div class="pad">
                    <div class="real_sec"></div>
                    <div class="slide_s">
                      <div class="fl">
                        <input
                          type="text"
                          placeholder="Search items, collections, creators"
                        />
                      </div>
                      <div class="fr">
                        <div class="select">
                          <div>Single item</div>
                          <ul>
                            <li>
                              <a>Single item</a>
                            </li>
                            <li>
                              <a>All</a>
                            </li>
                            <li>
                              <a>Bundle sales</a>
                            </li>
                          </ul>
                        </div>
                        <div class="select">
                          <div>Latest</div>
                          <ul>
                            <li>
                              <a>Latest</a>
                            </li>
                            <li>
                              <a>popularity</a>
                            </li>
                            <li>
                              <a>Close to finish</a>
                            </li>
                            <li>
                              <a>Low price</a>
                            </li>
                            <li>
                              <a>high price</a>
                            </li>
                            <li>
                              <a>A small bid</a>
                            </li>
                            <li>
                              <a>A lot of bids</a>
                            </li>
                            <li>
                              <a>Most seen</a>
                            </li>
                            <li>
                              <a>oldest</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="se_fi">
                      <p class="total">Selected Filter</p>
                      <ul>
                        <li class="sef" onClick={onClickFilterReset}>
                          Filter reset
                        </li>
                        {filterList.map((cont, index) => (
                          <li
                            key={index}
                            onClick={() => onClickFilterCancel(cont)}
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div class="move_item">
                      <div class="swiper_container">
                        <ol class="item move_li">
                          <div>
                            <span>
															{listitems.sort( (a,b)=> a.createdat<b.createdat ? +1 : -1 ).map ( (elem,idx) =>{
																return (
																	<li key={ idx }
																		class={selectItemIndex === 0 && "click"}
																		onClick={() => setSelectItemIndex(0)}
																	>
																	<a
																		style={{
																			backgroundImage: `url(${ elem.item?.url })`,
																			backgroundRepeat: "no-repeat",
																			backgroundPosition: "center",
																			backgroundSize: "cover",
																		}}
																	>
																		<div class="on">
																			<ul>
																				<li class="heart off">{ elem.item?.countfavors }</li>
																				<li
																					class="dot"
																					onClick={(e) => onClickMoreBtn(e, 0)}
																				>
																					{morePopupIndex === 0 && (
																						<div class="choose">
																							<ul>
																								<li>Sale</li>
																								<li
																									onClick={(e) =>
																										{	// onClickLink(e, "/handover")
																											navigate ( `/handover?itemid=${elem.item?.itemid}`)
																										}
																									}
																								>
																									Hand Over
																								</li>
																								<li>Edit</li>
																								<li>Collection Change</li>
																								<li>Unhide</li>
																							</ul>
																						</div>
																					)}
																				</li>
																			</ul>
																			<span> {elem.item?.titlename }</span>
																			<div> { strDot( elem.item?.author, 6, 4 ) } </div>
																		</div>
																	</a>
																</li>	
																)
															})}
{/*                              <li
                                class={selectItemIndex === 0 && "click"}
                                onClick={() => setSelectItemIndex(0)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${s5})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart off">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 0)}
                                      >
                                        {morePopupIndex === 0 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>Mark.X collection</span>
                                    <div>Place Saint-Marc</div>
                                  </div>
                                </a>
                              </li>
*/}
                            </span>

                          </div>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="click_thumb">
                  <div class="thum_pic">
                    <ul>
                      <li
                        style={{
                          backgroundImage: `url(${click1})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></li>
                      <li
                        style={{
                          backgroundImage: `url(${click1})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></li>
                    </ul>
                  </div>
                  {selectItemIndex !== -1 && (
                    <div class="click_btn">
                      <a>Cancel</a>
                      <a class="sell">
                        Sell<span>2</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .item {
    div {
      span {
        li {
          a {
            & > .on {
              height: 138px;
              padding-bottom: 25px;

              ul {
                font-size: 14px;
              }

              span {
                margin: 11px 0 0 0;
                font-size: 18px;
                line-height: 24px;
              }

              div {
                margin: 4px 0 0 0;
                font-size: 22px;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProf);

const statusList = ["Buy Now", "On Auction", "New", "Has Offers"];

const chainList = [
  {
    img: rock,
    name: "Klaytn",
  },
];

const coinList = ["Klay"];

const filterSearchData = [
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
];

const optionList = [
  {
    value: "KLAY",
    text: "Klaytn",
  },
  {
    value: "USD",
    text: "United States Dollars (USD)",
  },
];
