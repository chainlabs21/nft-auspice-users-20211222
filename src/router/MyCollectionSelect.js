import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import s2 from "../img/sub/s2.png";
import s6 from "../img/sub/s6.png";
import s7 from "../img/sub/s7.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";



 // import "./css/style01.css"; // import "./css/style02.css";



import { useEffect, useRef, useState } from "react";
import { isUserMobile } from "../util/Util";
import { getmyaddress, LOGGER } from "../util/common";
import { applytoken } from "../util/rest";
import { API } from "../config/api";
import moment from "moment";
import { messages } from "../config/messages";
import SetErrorBar from "../util/SetErrorBar";

function MyFavorite({ store }) {
  const navigate = useNavigate();

  const recentlyRef = useRef();
  const onSaleRef = useRef();
  const onAuctionRef = useRef();

  let [ myaddress, setmyaddress] = useState(getmyaddress());
  let axios = applytoken();
  let [ info_maria, setinfo_maria] = useState();
  let [ info_mongo, setinfo_mongo] = useState();
  let [ info_stats, setinfo_stats] = useState();
  let [ list_created, setlist_created] = useState([]);
  let [ list_sales, setlist_sales] = useState([]);
  let [ list_auction, setlist_auction] = useState([]);

  const setsalepath = (cont) => {
    LOGGER("");
    if (cont.itembalance?.avail) {
      navigate(`/saleitem?itemid=${cont.item?.itemid}`);
      return;
    } else {
      SetErrorBar(messages.MSG_OUT_OF_STOCK);
      return;
    }
  };

  const onclickhide = (itemid) => {
    axios.put(API.API_TOGGLE_ITEM + `/${itemid}/visible`).then((resp) => {
      LOGGER("", resp.data);
      let { status } = resp.data;
      if (status == "OK") {
        SetErrorBar(messages.MSG_CHANGED);
        //				fetchitems()
      } else {
        SetErrorBar(messages.MSG_REQ_FAIL);
      }
    });
  };

  const fetchdata = (_) => {
    axios.get(API.API_USER_INFO + `/${myaddress}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, payload } = resp.data;
      if (status == "OK") {
        setinfo_maria(payload.maria);
        setinfo_mongo(payload.mongo);
        setinfo_stats(payload.stats);
      }
    });
    axios
      .get(API.API_AUTHORS_ITEMS + `/${myaddress}/0/10/id/DESC`)
      .then((resp) => {
        LOGGER("JgCY99Hc83", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setlist_created(list);
        }
      });
    axios
      .get(API.API_SELLER_ITEMS_00 + `/${myaddress}/0/10/id/DESC`, {
        params: { itemdetail: 1, filterkey: "typestr", filterval: "COMMON" },
      })
      .then((resp) => {
        LOGGER("kxdvjHSJHx", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setlist_sales(list);
        }
      });
    axios
      .get(API.API_SELLER_ITEMS_00 + `/${myaddress}/0/10/id/DESC`, {
        params: {
          itemdetail: 1,
          filterkey: "typestr",
          filterval: "AUCTION_ENGLISH",
        },
      })
      .then((resp) => {
        LOGGER("yduWcdU26V", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setlist_auction(list);
        }
      });
  };

  function onClickRecentlyMoreBtn(e, index) {
    e.stopPropagation();
    setRecentlyMorePopup(index);
  }

  function onClickOnsaleMoreBtn(e, index) {
    e.stopPropagation();
    setOnsaleMorePopup(index);
  }

  useEffect((_) => {
    window.getmyaddress = getmyaddress;
    if (myaddress) {
    } else {
      return;
    }
    fetchdata();
  }, []);

  useEffect(
    (_) => {
      if (myaddress) {
      } else {
        return;
      }
      fetchdata();
    },
    [myaddress]
  );
  //	, API_SELLER_ITEMS : `${apiServer}/queries/rows/fieldvalues` // /:tablename/:offset/:limit/:orderkey/:orderval
  //			let {fieldname , fieldvalues , itemdetail } = req.query

  const [recentlyIndex, setRecentlyIndex] = useState(0);
  const [onSaleIndex, setOnSaleIndex] = useState(0);
  const [onAuctionIndex, setOnAuctionIndex] = useState(0);

	const [recentlyMorePopup, setRecentlyMorePopup] = useState(-1);
  const [onsaleMorePopup, setOnsaleMorePopup] = useState(-1);
	let [ onauctionmorepopup , setonauctionmorepopup ] = useState( -1 )
  function onClickRecentlyPreBtn() {
    const wrapWidth = recentlyRef.current.offsetWidth;
    const contWidth = recentlyRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (recentlyIndex > 0) setRecentlyIndex(recentlyIndex - 1);
    else setRecentlyIndex(pageNum - 1);
  }

  function onClickRecentlyNextBtn() {
    const wrapWidth = recentlyRef.current.offsetWidth;
    const contWidth = recentlyRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (recentlyIndex < pageNum - 1) setRecentlyIndex(recentlyIndex + 1);
    else setRecentlyIndex(0);
  }

  function onClickOnSalePreBtn() {
    const wrapWidth = onSaleRef.current.offsetWidth;
    const contWidth = onSaleRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (onSaleIndex > 0) setOnSaleIndex(onSaleIndex - 1);
    else setOnSaleIndex(pageNum - 1);
  }

  function onClickOnSaleNextBtn() {
    const wrapWidth = onSaleRef.current.offsetWidth;
    const contWidth = onSaleRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (onSaleIndex < pageNum - 1) setOnSaleIndex(onSaleIndex + 1);
    else setOnSaleIndex(0);
  }

  function onClickOnAuctionPreBtn() {
    const wrapWidth = onAuctionRef.current.offsetWidth;
    const contWidth = onAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (onAuctionIndex > 0) setOnAuctionIndex(onAuctionIndex - 1);
    else setOnAuctionIndex(pageNum - 1);
  }

  function onClickOnAuctionNextBtn() {
    const wrapWidth = onAuctionRef.current.offsetWidth;
    const contWidth = onAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (onAuctionIndex < pageNum - 1) setOnAuctionIndex(onAuctionIndex + 1);
    else setOnAuctionIndex(0);
  }

  useEffect(() => {
    if (!recentlyRef.current.children[0]) return;

    const wrapWidth = recentlyRef.current.offsetWidth;
    const contWidth = recentlyRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (recentlyRef.current?.scrollTo) {
      if (recentlyIndex < pageNum) {
        recentlyRef.current.scrollTo({
          left: contWidth * itemNumByPage * recentlyIndex,
          behavior: "smooth",
        });
      } else {
        recentlyRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [recentlyIndex]);

  useEffect(() => {
    if (!onSaleRef.current.children[0]) return;

    const wrapWidth = onSaleRef.current.offsetWidth;
    const contWidth = onSaleRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(10 / itemNumByPage);

    if (onSaleRef.current?.scrollTo) {
      if (onSaleIndex < pageNum) {
        onSaleRef.current.scrollTo({
          left: contWidth * itemNumByPage * onSaleIndex,
          behavior: "smooth",
        });
      } else {
        onSaleRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [onSaleIndex]);

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home">
          <div className="collection_home colletcmarket">
            <img src={require("../img/sub/home_bg.png").default} />
            <div className="wrap">
              <div className="collection_detail">
                <div className="pro_img">
                  <img
                    src={require("../img/sub/home_profile.png").default}
                    className="dotimg"
                  />
                  <div className="home_icons mhome home12 on">
                    <div className="mhome_wrap">
                      <ul>
                        <li>
                          <a onClick={() => navigate("/transactionhistory")}>
                            Transaction History
                          </a>
                        </li>
                        <li>
                          <a onClick={() => navigate("/editcollection")}>
                            Changing information
                          </a>
                        </li>
                        <li>
                          <a onClick={() => navigate("/royaltycheck")}>
                            Royalty History
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <h2 className="notop">{info_maria?.nickname}'s Collection</h2>
                <h4>{info_maria?.description}</h4>
                <div className="numbers">
                  <ul>
                    <li>
                      <h5>Created</h5>
                      <p>{info_maria?.countcreated}</p>
                    </li>
                    <li>
                      <h5>Owned</h5>
                      <p>{info_maria?.countowned}</p>
                    </li>
                    <li>
                      <h5>Avg price</h5>
                      <p>
                        {info_stats?.countsales
                          ? info_stats?.sumsales / info_stats?.countsales
                          : "0"}
                        <b>KLAY</b>
                        <span>$ -</span>
                      </p>
                    </li>
                    <li>
                      <h5>Volume Traded</h5>
                      <p>
                        {(info_stats?.sumsales ? info_stats?.sumsales : 0) +
                          (info_stats?.sumbuys ? info_stats?.sumbuys : 0)}
                        <span>$ -</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="move off">
              <div className="right_move">
                <div className="real_sec">
                  <div className="item marbo">
                    <div className="full">
                      <h4 className="t releft">Recently Created</h4>
                      <a
                        onClick={() => navigate("/createitem")}
                        className="replus"
                      >
                        Register a new item
                      </a>
                    </div>
                    <div className="swiper">
                      <div className="swiper-container swiper-container-newitem">
                        <ol className="item item5 summary swiper-wrapper">
                          <div className="slideBox" ref={recentlyRef}>
                            {list_created.map((cont, index) => (
                              <>
                                <span>
                                  <li className="swiper-slide">
                                    <a
                                      onClick={() =>
                                        navigate(
                                          `/singleitem?itemid=${cont.item?.itemid}`
                                        )
                                      }
                                      style={{
                                        backgroundImage: `url(${cont.item?.url})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                      }}
                                    >
                                      <div className="on">
                                        <ul>
                                          <li className="heart off">
                                            {cont.item?.countfavors}
                                          </li>
                                          <li
                                            className={
                                              cont.ilikethisitem
                                                ? "star on"
                                                : "star off"
                                            }
                                          ></li>
                                        </ul>
                                        <div>{cont.item?.titlename}</div>
                                        <span>{cont.author?.nickname}</span>
                                        <ol>
                                          <li>
                                            {moment(
                                              cont.item?.createdat
                                            ).fromNow()}
                                          </li>
                                          <li>- KLAY</li>
                                        </ol>
                                      </div>
                                      <div className="top blk">
                                        <ul>
                                          <li></li>
                                          <li
                                            className="dot"
                                            onClick={(e) =>
                                              onClickRecentlyMoreBtn(e, index)
                                            }
                                          >
                                            <div
                                              className={
                                                recentlyMorePopup === index
                                                  ? "choose choose2 on"
                                                  : "choose choose2 off"
                                              }
                                              style={{ top: 34 }}
                                            >
                                              <ul>
                                                {cont.itembalance?.avail && (
                                                  <li
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      setsalepath(cont);
                                                    }}
                                                  >
                                                    Sale
                                                  </li>
                                                )}
                                                {false &&
                                                  cont.item?.tokenid &&
                                                  cont.itembalance?.avail && (
                                                    <li
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        navigate(
                                                          `/handover?itemid=${cont.item?.itemid}`
                                                        );
                                                      }}
                                                    >
                                                      Hand Over
                                                    </li>
                                                  )}

                                                <li
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onclickhide(
                                                      cont.item?.itemid
                                                    );
                                                  }}
                                                >
                                                  {cont.itembalance?.visible
                                                    ? "Hide"
                                                    : "Unhide"}{" "}
                                                </li>
                                              </ul>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </a>
                                  </li>
                                </span>
                              </>
                            ))}
                          </div>
                        </ol>
                      </div>
                      <div
                        className="swiper-button-prev swiper-button-newitem-prev"
                        onClick={onClickRecentlyPreBtn}
                      ></div>
                      <div
                        className="swiper-button-next swiper-button-newitem-next"
                        onClick={onClickRecentlyNextBtn}
                      ></div>
                    </div>
                  </div>

                  <div className="item marbo">
                    <h4 className="t">On Sale Item</h4>
                    <div className="swiper">
                      <div className="swiper-container swiper-container-newitem newitem2">
                        <ol className="item item5 summary swiper-wrapper">
                          <div className="slideBox" ref={onSaleRef}>
                            {list_sales.map((cont, index) => (
                              <>
                                <span>
                                  <li className="swiper-slide">
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigate(
                                          `/singleitem?itemid=${cont.item?.itemid}`
                                        );
                                      }}
                                      style={{
                                        backgroundImage: `url(${cont.item?.url})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                      }}
                                    >
                                      <div className="on">
                                        <ul>
                                          <li className="heart on">
                                            {cont.item?.countfavors}
                                          </li>
                                          <li
                                            className={
                                              cont.ilikethisitem
                                                ? "star on"
                                                : "star off"
                                            }
                                          ></li>
                                        </ul>
                                        <div>{cont.item?.titlename}</div>
                                        <span>{cont.author?.nickname}</span>
                                        <ol>
                                          <li>
                                            {
                                              cont.minpriceorder
                                                ?.asset_amount_bid
                                            }
                                          </li>
                                          <li>
                                            {
                                              cont.minpriceorder
                                                ?.asset_amount_ask
                                            }{" "}
                                            KLAY
                                          </li>
                                        </ol>
                                      </div>
                                      <div className="top blk">
                                        <ul>
                                          <li></li>
                                          <li
                                            className="dot"
                                            onClick={(e) =>
                                              onClickOnsaleMoreBtn(e, index)
                                            }
                                          >
                                            <div
                                              className={
                                                onsaleMorePopup === index
                                                  ? "choose choose2 on"
                                                  : "choose choose2"
                                              }
                                              style={{ top: 34 }}
                                            >
                                              <ul>
                                                {/**  <li>Sale</li>*/}
                                                {/**  <li>Hand Over</li>*/}
                                                {/** <li onClick={_=>{ navigate(`/saleitem?itemid=`) }}>Edit</li>*/}
                                                {/**  <li>Collection Change</li>*/}
                                                <li>
                                                  {cont.ishidden
                                                    ? "Unhide"
                                                    : "Hide"}{" "}
                                                </li>
                                              </ul>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </a>
                                  </li>
                                </span>
                              </>
                            ))}
                          </div>
                        </ol>
                      </div>
                      <div
                        className="swiper-button-prev swiper-button-newitem-prev newitemprev2"
                        onClick={onClickOnSalePreBtn}
                      ></div>
                      <div
                        className="swiper-button-next swiper-button-newitem-next newitemnext2"
                        onClick={onClickOnSaleNextBtn}
                      ></div>
                    </div>
                  </div>

                  <div
                    className="item marbo"
                    style={{ display: list_auction.length ? "block" : "none" }}
                  >
                    <h4 className="t">On Auction</h4>
                    <div className="swiper">
                      <div className="swiper-container swiper-container-newitem newitem3">
                        <ol className="item item5 summary swiper-wrapper">
                          <div className="slideBox" ref={onAuctionRef}>
                            {list_auction.map((cont, index) => (
                              <>
                                <span>
                                  <li className="swiper-slide">
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigate(
                                          `/singleitem?itemid=${cont.item?.itemid}`
                                        );
                                      }}
                                      style={{
                                        backgroundImage: `url(${cont.item?.url})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                      }}
                                    >
                                      <div className="on">
                                        <ul>
                                          <li className="heart off">
                                            {cont.item?.countfavors}
                                          </li>
                                          <li
                                            className={
                                              cont.ilikethisitem
                                                ? "star on"
                                                : "star off"
                                            }
                                          ></li>
                                        </ul>
                                        <div>{cont.item?.titlename}</div>
                                        <span>{cont.author?.nickname}</span>
                                        <ol>
                                          <li>
                                            {cont.expiry
                                              ? "expires " +
                                                moment
                                                  .unix(cont.expiry)
                                                  .fromNow()
                                              : ""}
                                          </li>
                                          <li>
                                            {cont.asset_amount_ask}{" "}
                                            {cont.priceunitname}{" "}
                                          </li>
                                        </ol>
                                      </div>
                                      <div className="top blk">
                                        <ul>
                                          <li></li>
                                          <li className="dot">
                                            <div
                                              className={
                                                onauctionmorepopup == index
                                                  ? "choose choose2 on"
                                                  : "choose choose2"
                                              }
                                            >
                                              <ul>
                                                {/** <li>Sale</li>
                                                <li>Hand Over</li>*/}
                                                <li>Edit</li>
                                                {/** <li>Collection Change</li>*/}
                                                <li>
                                                  {" "}
                                                  {cont.ishidden
                                                    ? "Unhide"
                                                    : "Hide"}
                                                </li>
                                              </ul>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </a>
                                  </li>
                                </span>
                              </>
                            ))}
                          </div>
                        </ol>
                      </div>
                      <div
                        className="swiper-button-prev swiper-button-newitem-prev newitemprev3"
                        onClick={onClickOnAuctionPreBtn}
                      ></div>
                      <div
                        className="swiper-button-next swiper-button-newitem-next newitemnext3"
                        onClick={onClickOnAuctionNextBtn}
                      ></div>
                    </div>
                  </div>
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
  .swiper-wrapper,
  .slideBox {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    transition: 0.8s;

    &::-webkit-scrollbar {
      display: none;
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorite);
