import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import I_ltArw3BlackBtn from "./img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "./img/design/I_rtArw3BlackBtn.png";
import title from "./img/main/title.png";
import heart_off from "./img/sub/heart_off.png";
import heart_on from "./img/sub/heart_on.png";
import star_off from "./img/sub/star_off.png";
import star_on from "./img/sub/star_on.png";
import verse_logo from "./img/sub/verse_logo.png";
import I_dnPolygon from "./img/icons/I_dnPolygon.svg";
import home_bg from "./img/sub/home_bg.png";
import I_klaytn from "./img/sub/I_klaytn.svg"
import UsersBox from "./components/main/UsersBox";
import SitemBox from "./components/main/SitemBox";
import BitemBox from "./components/main/BitemBox";
import LinkBox from "./components/main/LinkBox";

import { LOGGER, gettimestr, get_deltatime_str } from "./util/common";
import { applytoken } from "./util/rest";
import { API } from "./config/api";
import { getStyle, strDot } from "./util/Util";
import moment from "moment";
import SetErrorBar from "./util/SetErrorBar";
import DefaultHeader from "./components/header/DefaultHeader";
import { D_categoryList, D_navList, D_Tips } from "./data/D_main";
import { useDispatch } from "react-redux";
import { SET_CATEGORY } from "./reducers/filterReducer";

export default function Main({ store }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {marketFilter} = useSelector((state) => state.filter);
  const {isloggedin} =useSelector((state)=>state.user)

  const visualSwiperRef = useRef();
  const collectionSwiperRef = useRef();
  const trendingSwiperRef = useRef();
  const itemSwiperRef = useRef();
  const tipWrapRef = useRef();

  const [intervalId, setIntervalId] = useState();
  const [visualSwiperIndex, setVisualSwiperIndex] = useState(0);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [trendingItemIndex, setTrendingItemIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [creatorlist, setCreatorList] = useState([]);
  let [list_newitems, setlist_newitems] = useState([]);
  let [list_trenditems, setlist_trenditems] = useState([]);
  let [list_featured, setlist_featured] = useState([]);
  const [featuredCat, setFeaturedCat] =useState([]);
  let axios = applytoken();
  const dispatch = useDispatch();
  useEffect((_) => {
    axios.get(`${API.API_GET_MAINCATEGORY}`).then((resp=>{
      let {list} = resp.data;
      LOGGER("CONCONCON", list)
      setFeaturedCat(list)

    }))
    axios.get(`${API.API_MAIN_FEATURED_ITEMS}`).then((resp) => {
      let { status, list } = resp.data;
      if (status === "OK") {
        console.log(list)
        setlist_featured(list);
      }
    });

    axios.get(`${API.API_GET_CREATORS}`).then((resp) => {
      let { status, list } = resp.data;
      if (status === "OK") {
        setCreatorList(list);
        console.log(list)
      }
    });

    axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
      LOGGER("JN8wsASyiL", resp.data);
      let { status, list } = resp.data;
      if (status === "OK") {
        setlist_trenditems(list);
      }
    });

    axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
      LOGGER("JBwpoHdvFv", resp.data);
      let { status, list } = resp.data;
      if (status === "OK") {
        setlist_newitems(list);
      }
    });
  }, []);

  function onClickFavorBtn(e, itemid) {
    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status === "OK") {
        axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
          LOGGER("JN8wsASyiL", resp.data);
          let { status, list } = resp.data;
          if (status === "OK") {
            setlist_trenditems(list);
          }
        });

        axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
          LOGGER("JBwpoHdvFv", resp.data);
          let { status, list } = resp.data;
          if (status === "OK") {
            setlist_newitems(list);
          }
        });
      } else if (message === "PLEASE-LOGIN") {
        SetErrorBar("로그인을 해주세요");
      }
    });
  }

  function onClickBookMarkBtn(e, itemid) {
    e.preventDefault();

    axios.post(`${API.API_TOGGLE_BOOKMARK}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, message } = resp.data;
      if (status === "OK") {
        if (status === "OK") {
          axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
            LOGGER("JN8wsASyiL", resp.data);
            let { status, list } = resp.data;
            if (status === "OK") {
              setlist_trenditems(list);
            }
          });

          axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
            LOGGER("JBwpoHdvFv", resp.data);
            let { status, list } = resp.data;
            if (status === "OK") {
              setlist_newitems(list);
            }
          });
        } else if (message === "PLEASE-LOGIN") {
          SetErrorBar("로그인을 해주세요");
        }
      }
    });
  }

  function onClickVisualSwiperBtn() {
    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
        visualSwiperRef.current.style.transform = `translate3d(
          -${
            (visualSwiperRef.current.children[0].offsetWidth +
              getStyle(visualSwiperRef, "gap")) *
            (visualSwiperIndex + 1)
          }px,0,0
        )`;

        setVisualSwiperIndex(visualSwiperIndex + 1);
      } else {
        setVisualSwiperIndex(0);
        visualSwiperRef.current.style.transform = `translate3d(
          0,0,0
        )`;
      }
    }

    // if (window.innerWidth < 1280) {
    //   if (visualSwiperRef.current?.scrollTo) {
    //     if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
    //       visualSwiperRef.current.style.transform = `translate3d(
    //       -${
    //         visualSwiperRef.current.children[0].offsetWidth *
    //         (visualSwiperIndex + 1)
    //       }px,0,0
    //     )`;

    //       setVisualSwiperIndex(visualSwiperIndex + 1);
    //     } else {
    //       setVisualSwiperIndex(0);
    //       visualSwiperRef.current.style.transform = `translate3d(
    //       0,0,0
    //     )`;
    //     }
    //   }
    // } else {
    //   if (visualSwiperRef.current) visualSwiperRef.current.style.transform = "";
    //   if (visualSwiperIndex < creatorlist.length - 1)
    //     setVisualSwiperIndex(visualSwiperIndex + 1);
    //   else setVisualSwiperIndex(0);
    // }
  }

  function onClickSwiperPreBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);
    console.log(index);

    if (index > 0) setIndex(index - 1);
    else setIndex(pageNum - 1);
  }

  function onClickSwiperNextBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);

    if (index < pageNum - 1) setIndex(index + 1);
    else setIndex(0);
  }

  function handlerByIndex(swiperRef, index) {
    if(!swiperRef.current) return;
    if (!swiperRef.current.children[0]) return;

    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(
      swiperRef.current.children.length / itemNumByPage
    );

    if (swiperRef.current?.scrollTo) {
      if (index < pageNum) {
        swiperRef.current.scrollTo({
          left:
            (contWidth + getStyle(swiperRef, "gap")) * itemNumByPage * index,
          behavior: "smooth",
        });
      } else {
        swiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }

  useEffect(() => {
    if(!visualSwiperRef.current) return;
    if (!visualSwiperRef.current.children[0]) return;

    const contWidth = visualSwiperRef.current.children[0].offsetWidth;
    const pageNum = Math.ceil(visualSwiperRef.current.children.length);

    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < pageNum) {
        visualSwiperRef.current.scrollTo({
          left: contWidth * visualSwiperIndex,
          behavior: "smooth",
        });
      } else {
        visualSwiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }

    if (visualSwiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(setInterval(onClickVisualSwiperBtn, 3000));
    }
    return clearInterval(intervalId);
  }, [visualSwiperIndex]);

  useEffect(
    () => handlerByIndex(collectionSwiperRef, collectionIndex),
    [collectionIndex]
  );

  useEffect(
    () => handlerByIndex(trendingSwiperRef, trendingItemIndex),
    [trendingItemIndex]
  );

  useEffect(() => handlerByIndex(itemSwiperRef, itemIndex), [itemIndex]);

  useEffect(() => handlerByIndex(tipWrapRef, tipIndex), [tipIndex]);

  if (isMobile)
    return (
      <>
        <DefaultHeader />
        <MmainBox>
          <section className="innerBox">
            <article className="visual">
              <div className="titleContainer">
                <div className="titleBox">
                  <img className="titleImg" src={title} />
                  <p className="explain">
                    Make money with NFTs that are easily issued and managed.
                    <br /> Only in your own NFT gallery
                  </p>
                </div>

                <div className="btnBox">
                  <button
                    className="navBtn"
                    onClick={() => navigate("/marketplace")}
                  >
                    NFT Navigation
                  </button>
                  <button
                    className="pubBtn"
                    onClick={() => navigate("/createitem")}
                  >
                    NFT Publication
                  </button>
                </div>
              </div>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={visualSwiperRef}>
                    {list_featured
                      .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                      .map((cont, index) => (
                        <li className="swiperContBox" key={index}>
                          <span
                            className="itemImg"
                            style={{
                              backgroundImage: `url(${cont.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          />

                          <div className="infoContainer">
                            <div className="titleBox">
                              <strong className="title">
                                {cont.titlename}
                              </strong>
                              <strong>{cont.username}</strong>
                            </div>

                            <div className="infoBox">
                              <ul className="infoList">
                                <li>
                                  <strong className="key">Current Bid</strong>
                                  <p className="value">2.867 KLAY</p>
                                </li>
                                <li>
                                  <strong className="key">
                                    Auction ending in
                                  </strong>
                                  <p className="value">05:32:21</p>
                                </li>
                              </ul>

                              <div className="btnBox">
                                <button
                                  className="bidBtn"
                                  onClick={() =>
                                    navigate(
                                      `/singleitem?itemid=${cont.itemid}`
                                    )
                                  }
                                >
                                  Place a Bid
                                </button>
                                <button
                                  className="viewBtn"
                                  onClick={() =>
                                    navigate(
                                      `/singleitem?itemid=${cont.itemid}`
                                    )
                                  }
                                >
                                  View Artwork
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <button className="nextBtn" onClick={onClickVisualSwiperBtn}>
                  <img src={I_rtArw3BlackBtn} alt="" />
                </button>
              </div>
            </article>

            <article className="collectionArticle swiperArticle contArticle">
              <strong className="title">Trending Authors</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={collectionSwiperRef}>
                    {creatorlist.map((cont, index) => (
                      
                      <li  key={index} className="swiperContBox">
                        <div
                          className="bg"
                          style={{
                            backgroundImage: `url(${home_bg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            background: "#000",
                          }}
                        />

                        <div className="infoContainer">
                          <span
                            className="profImg"
                            style={{
                              backgroundImage: `url(${cont.profileimageurl})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              background: "#f00",
                            }}
                          />

                          <div className="infoBox">
                            <strong className="store">{cont.storename}</strong>
                            <strong className="nickname">
                              {cont?.nickname}
                            </strong>
                            <p className="description">
                              {cont.mongo?.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        collectionSwiperRef,
                        creatorlist,
                        collectionIndex,
                        setCollectionIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>

            <article className="categoryArticle contArticle">
              <strong className="title">Market Category</strong>

              <ul className="categroyList">
                {D_categoryList.map((category, index) => (
                  <li
                    key={index}
                    onClick={() =>{
                      dispatchEvent()
                      navigate("/marketplace", { state: category.state })}
                    }
                  >
                    <strong>{category.text}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="trendingArticle swiperArticle contArticle">
              <strong className="title">Trending NFT Item</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={trendingSwiperRef}>
                    {list_trenditems
                      .filter((elem) => elem.url)
                      .sort((a, b) => b.countfavors - a.countfavors)
                      .map((cont, index) => (
                        <li
                          key={index}
                          className="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.itemid}`)
                          }
                        >
                          <div
                            className="itemBox"
                            style={{
                              backgroundImage: `url(${cont.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="infoBox">
                              <div className="topBar">
                                <button
                                  className="likeBtn"
                                  onClick={(e) =>
                                    onClickFavorBtn(e, cont.itemid)
                                  }
                                >
                                  <img
                                    src={
                                      cont.ilikethisitem ? heart_on : heart_off
                                    }
                                    alt=""
                                  />

                                  <p>{cont.countfavors}</p>
                                </button>

                                <button
                                  className="bookmarkBtn"
                                  onClick={(e) =>
                                    onClickBookMarkBtn(e, cont.itemid)
                                  }
                                >
                                  <img
                                    src={cont.ididbookmark ? star_on : star_off}
                                    alt=""
                                  />
                                </button>
                              </div>

                              <p className="title">{cont.titlename}</p>
                              <p className="nickname">
                                {strDot(cont.author?.nickname, 10, 0)}
                              </p>

                              <div className="etcBox">
                                <p className="time">
                                  {moment
                                    .unix(cont.minpriceorder?.expiry)
                                    .fromNow() ||
                                    get_deltatime_str(
                                      cont.minpriceorder?.expiry
                                    )}
                                </p>

                                <strong className="priceBox">
                                  {cont.askpricestats?.min} KLAY
                                </strong>
                              </div>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy Now
                          </button>
                        </li>
                      ))}
                  </ul>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        trendingSwiperRef,
                        list_trenditems,
                        trendingItemIndex,
                        setTrendingItemIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>

            <article className="newArticle swiperArticle contArticle">
              <strong className="title">NEW NFT Item</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={itemSwiperRef}>
                    {list_newitems
                      .filter((elem) => elem.url)
                      .sort((a, b) => b.countfavors - a.countfavors)
                      .map((cont, index) => (
                        <li
                          key={index}
                          className="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.itemid}`)
                          }
                          style={{
                            backgroundImage: `url(${cont.url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="infoBox">
                            <div className="topBar">
                              <button
                                className="likeBtn"
                                onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                              >
                                <img
                                  src={
                                    cont.ilikethisitem ? heart_on : heart_off
                                  }
                                  alt=""
                                />

                                <p>{cont.countfavors}</p>
                              </button>

                              <button
                                className="bookmarkBtn"
                                onClick={(e) =>
                                  onClickBookMarkBtn(e, cont.itemid)
                                }
                              >
                                <img
                                  src={cont.ididbookmark ? star_on : star_off}
                                  alt=""
                                />
                              </button>
                            </div>

                            <p className="title">{cont.titlename}</p>
                            <p className="nickname">
                              {strDot(cont.author?.nickname, 10, 0)}
                            </p>

                            <div className="etcBox">
                              <p className="time">
                                {moment
                                  .unix(cont.minpriceorder?.expiry)
                                  .fromNow() ||
                                  get_deltatime_str(cont.minpriceorder?.expiry)}
                              </p>

                              <strong className="priceBox">
                                {cont.askpricestats?.min} KLAY
                              </strong>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        itemSwiperRef,
                        list_newitems,
                        itemIndex,
                        setItemIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>

            <article className="tipArticle swiperArticle contArticle">
              <strong className="title">Tips for Itemverse users</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={tipWrapRef}>
                    {D_Tips.map((cont, index) => (
                      <li key={index} className="swiperContBox">
                        <img src={cont.img} alt="" />
                        <div className="infoBox">
                          <p className="title">{cont.title}</p>
                          <p className="explain">{cont.explain}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        tipWrapRef,
                        D_Tips,
                        tipIndex,
                        setTipIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>
          </section>

          <footer className="footer">
            <section className="innerBox">
              <article className="contBox">
                <span className="logoBox">
                  <button className="logoBtn" onClick={() => navigate("/")}>
                    <img src={verse_logo} alt="" />
                  </button>

                  <p className="explain">
                    Decentralized NFT marketplace AUSPICE makes
                    <br />
                    it easy and convenient to trade non-fungible
                    <br />
                    tokens (NFTs) and crypto collectibles.
                    <br />
                  </p>

                  <div className="contactBox">
                    <p className="key">Contact us</p>

                    <button className="langBtn" onClick={() => {}}>
                      <p>English</p>
                      <img src={I_dnPolygon} alt="" />
                    </button>
                  </div>
                </span>

                <ul className="navBar">
                  {D_navList.map((cont, index) => (
                    <li key={index}>
                      <strong className="title">{cont.title}</strong>

                      <ul className="detailList">
                        {cont.detailNav.map((detail, index) => (
                          <li key={index}>
                            <button
                              className="navBtn"
                              onClick={() => navigate(`${detail.url}`)}
                            >
                              {detail.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bottomBar">
                <span className="leftBox">
                  <button className="privacyBtn" onClick={() => {}}>
                    Privacy Policy
                  </button>
                  <p>|</p>
                  <button className="termBtn" onClick={() => {}}>
                    Terms of Service
                  </button>
                </span>

                <p className="copyRight">
                  Copyright © 2021 AUSPICE. All rights reserved.
                </p>
              </article>
            </section>
          </footer>
        </MmainBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <PmainBox>

          
          <section className="innerBox">
          {
          featuredCat.map((v, i)=>{
            if(v.type == 3){return (<>
              <LinkBox category={v} key={i}/>
            </>)}
            if(v.type == 2){return (<>
            <UsersBox category={v} key={i}/>
            </>)}
            if(v.type == 1){return (<>
              <SitemBox category={v} key={i}/>
            </>)}
            if(v.type == 0){return (<>
              <BitemBox category={v} key={i}/>
            </>)}
})
          }
            
          </section>

          <footer className="footer">
            <article className="contBox">
              <span className="logoBox">
                <button className="logoBtn" onClick={() => navigate("/")}>
                  <img src={verse_logo} alt="" />
                </button>

                <p className="explain">
                  Decentralized NFT marketplace AUSPICE makes
                  <br />
                  it easy and convenient to trade non-fungible
                  <br />
                  tokens (NFTs) and crypto collectibles.
                  <br />
                </p>
              </span>

              <ul className="navBar">
                {D_navList.map((cont, index) => (
                  <li key={index}>
                    <strong className="title">{cont.title}</strong>

                    <ul className="detailList">
                      {cont.detailNav.map((detail, index) => (
                        <li key={index}>
                          <button
                            className="navBtn"
                            onClick={() => {
                              dispatch({type: SET_CATEGORY, payload:{value:detail.code}})
                              navigate(`${detail.url}`)}}
                          >
                            {detail.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}

                <li>
                  <strong className="title">CONTACT US</strong>
                  <ul>
                    <li>contact@Auspice.com</li>
                  </ul>
                </li>
              </ul>
            </article>

            <article className="bottomBar">
              <span className="leftBox">
                <button className="privacyBtn" onClick={() => {}}>
                  Privacy Policy
                </button>
                <p>|</p>
                <button className="termBtn" onClick={() => {}}>
                  Terms of Service
                </button>
              </span>

              <p className="copyRight">
                Copyright © 2021 AUSPICE. All rights reserved.
              </p>
            </article>
          </footer>
        </PmainBox>
      </>
    );
}

const MmainBox = styled.div`
  padding: 72px 0 0 0;
  height: 100%;
  overflow-y: scroll;

  & > .innerBox {
    padding: 0 0 27.77vw 0;

    .visual {
      display: flex;
      flex-direction: column;
      gap: 7.22vw;

      .titleContainer {
        display: flex;
        flex-direction: column;
        gap: 7.22vw;

        .titleBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3.88vw;

          .titleImg {
            width: 72.77vw;
          }

          .explain {
            font-size: 3.33vw;
            font-weight: 500;
            line-height: 4.44vw;
            text-align: center;
          }
        }

        .btnBox {
          display: flex;
          justify-content: center;
          gap: 2.77vw;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 41.66vw;
            height: 11.66vw;
            font-size: 4.44vw;
            font-weight: 700;
            border: solid 1px #000;
            border-radius: 16.66vw;

            &.navBtn {
            }

            &.pubBtn {
              color: #fff;
              background: #000;
            }
          }
        }
      }

      .swiperContainer {
        display: flex;
        align-items: center;
        position: relative;

        .swiperBox {
          display: flex;
          position: relative;

          .swiperList {
            display: flex;
            gap: 5.55vw;
            padding: 5.55vw;
            transition: all 0.8s;

            .swiperContBox {
              display: flex;
              flex-direction: column;
              width: 88.88vw;
              height: 158.33vw;
              border-radius: 5.55vw;
              overflow: hidden;
              box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);

              .itemImg {
                flex: 1;
              }

              .infoContainer {
                display: flex;
                flex-direction: column;
                gap: 10vw;
                height: 69.44vw;
                padding: 4.16vw;

                .titleBox {
                  display: flex;
                  flex-direction: column;
                  gap: 1.66vw;

                  * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .title {
                    font-size: 6.66vw;
                    line-height: 9.16vw;
                  }

                  .creator {
                    font-size: 3.88vw;
                    line-height: 4.44vw;
                  }
                }

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 7.22vw;

                  .infoList {
                    display: flex;
                    justify-content: space-between;

                    li {
                      display: flex;
                      flex-direction: column;
                      gap: 2.77vw;

                      .key {
                        font-size: 3.88vw;
                        line-height: 3.88vw;
                      }

                      .value {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        font-size: 22px;
                        line-height: 7.77vw;
                        font-weight: 900;
                      }
                    }
                  }

                  .btnBox {
                    display: flex;
                    gap: 2.22vw;

                    button {
                      flex: 1;
                      height: 11.66vw;
                      font-size: 3.88vw;
                      font-weight: 500;
                      border-radius: 5.55vw;
                      border: solid 1px #000;

                      &.viewBtn {
                        color: #fff;
                        background: #000;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .nextBtn {
          position: absolute;
          right: 1.94vw;

          img {
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
          }
        }
      }
    }

    .contArticle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.77vw;
      margin: 13.88vw auto 0 auto;

      .title {
        font-size: 5vw;
        font-weight: 700;
      }

      &.swiperArticle {
        position: relative;

        & > .title {
        }

        .swiperContainer {
          width: 100%;

          .swiperBox {
            display: flex;
            align-items: center;
            position: relative;

            .swiperList {
              display: flex;
              gap: 4.44vw;
              overflow-x: scroll;
              padding: 5.55vw;

              &::-webkit-scrollbar {
                display: none;
              }

              .swiperContBox {
                display: flex;
                flex-direction: column;
                width: 88.88vw;
                min-width: 88.88vw;
                border-radius: 5.55vw;
                box-shadow: 0 1.66vw 2.77vw 0 rgba(0, 0, 0, 0.16);
                overflow: hidden;
              }
            }

            .pageBtn {
              position: absolute;

              &.nextBtn {
                right: 2.22vw;

                img {
                  width: 10vw;
                }
              }
            }
          }
        }
      }

      &.collectionArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                height: 138.33vw;

                .bg {
                  height: 83.33vw;
                }

                .infoContainer {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 10.55vw 4.44vw 6.94vw 4.44vw;
                  position: relative;

                  .profImg {
                    width: 12.22vw;
                    height: 12.22vw;
                    border-radius: 50%;
                    top: -6.11vw;
                    position: absolute;
                  }

                  .infoBox {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    text-align: center;

                    .store {
                      font-size: 4.44vw;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .nickname {
                      margin: 2.22vw 0 0 0;
                      font-size: 3.88vw;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .description {
                      flex: 1;
                      word-break: break-all;
                      margin: 6.11vw 0 0 0;
                      font-size: 3.33vw;
                    }
                  }
                }
              }
            }
          }
        }
      }

      &.categoryArticle {
        margin: 8.33vw 0 0 0;

        .categroyList {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 3.3vw 2.22vw;
          padding: 5.55vw;

          li {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 43.33vw;
            height: 11.66vw;
            font-size: 4.44vw;
            white-space: nowrap;
            background: #fff;
            border: solid 2px #ebebeb;
            border-radius: 22.22vw;
            box-shadow: 0 0.83vw 1.38vw 0 rgba(21, 85, 96, 0.1);

            cursor: pointer;

            img,
            .blank {
              width: 21px;
              object-fit: contain;
            }
          }
        }
      }

      &.trendingArticle {
        .swiperContainer {
          .swiperBox {
            .swiperContBox {
              display: flex;
              flex-direction: column;
              height: 144.44vw;
              color: #fff;

              .itemBox {
                flex: 1;
                display: flex;
                align-items: flex-end;

                .infoBox {
                  width: 100%;
                  height: 41.66vw;
                  padding: 2.77vw 5.55vw 5vw 5.55vw;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 5.55vw;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 2.77vw;
                      font-size: 3.88vw;
                      font-weight: 500;
                      line-height: 3.88vw;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 10px 0 0 0;
                    font-size: 7.22vw;
                    font-weight: 500;
                    line-height: 10vw;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 1.11vw 0 0 0;
                    font-size: 5vw;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 22px;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 3.88vw;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 5vw;
                      font-weight: 700;
                    }
                  }
                }
              }

              .buyBtn {
                height: 17.77vw;
                font-size: 5vw;
                font-weight: 500;
                color: #fff;
                background: #222;
              }
            }
          }
        }
      }

      &.newArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                height: 125.55vw;
                color: #fff;

                .infoBox {
                  width: 100%;
                  padding: 4.44vw 5.55vw;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 5.55vw;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 3.33vw;
                      font-size: 3.88vw;
                      font-weight: 500;
                      line-height: 3.88vw;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 4.44vw 0 0 0;
                    font-size: 22px;
                    font-weight: 7.22vw;
                    line-height: 10vw;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 0.83vw 0 0 0;
                    font-size: 5vw;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 22px;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 3.88vw;
                      font-weight: 500;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 5vw;
                      font-weight: 700;
                    }
                  }
                }
              }
            }
          }
        }
      }

      &.tipArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                display: flex;
                flex-direction: column;
                height: 95vw;

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 2.22vw;
                  width: 100%;
                  height: 26.66vw;
                  padding: 4.44vw;

                  .title {
                    font-size: 5.55vw;
                    line-height: 6.66vw;
                  }

                  .explain {
                    font-size: 3.88vw;
                    line-height: 4.44vw;
                    color: #555;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .footer {
    padding: 0 5.55vw;
    margin: 0 auto;

    .innerBox {
      display: flex;
      flex-direction: column;
      gap: 11.11vw;
      padding: 13.33vw 0 14.44vw 0;
      border-top: 1px solid #222;

      .contBox {
        display: flex;
        flex-direction: column;
        gap: 11.11vw;

        .logoBox {
          .logoBtn {
            img {
              height: 17.77vw;
            }
          }

          .explain {
            margin: 7.22vw 0 0 0;
            font-size: 2.77vw;
            font-weight: 500;
            line-height: 3.88vw;
          }

          .contactBox {
            display: flex;
            gap: 5.55vw;
            margin: 8.33vw 0 0 0;

            * {
              font-size: 3.33vw;
              font-weight: 700;
            }

            .langBtn {
              display: flex;
              align-items: center;
              gap: 2.22vw;
            }
          }
        }

        .navBar {
          display: flex;

          & > li {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 3.33vw;

            .title {
              font-size: 3.88vw;
            }

            .detailList {
              display: flex;
              flex-direction: column;
              gap: 2.22vw;

              li {
                .navBtn {
                  font-size: 3.33vw;
                  font-weight: 500;
                  color: #222;
                }
              }
            }
          }
        }
      }

      .bottomBar {
        display: flex;
        flex-direction: column;
        gap: 2.22vw;

        .leftBox {
          display: flex;
          align-items: center;
          gap: 1.66vw;

          * {
            font-size: 2.77vw;
            font-weight: 700;
          }
        }

        .copyRight {
          font-size: 2.77vw;
          font-weight: 500;
        }
      }
    }
  }
`;

const PmainBox = styled.div`
  padding: 120px 0 0 0;

  & > .innerBox {
    padding: 0 0 258px 0;

    .visual {
      display: flex;
      align-items: flex-start;
      height: 606px;

      .titleContainer {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        max-width: 50%;
        height: inherit;
        padding: 100px 138px 0 0;
        background: #fff;
        z-index: 2;

        .titleInnerBox {
          display: flex;
          flex-direction: column;
          gap: 70px;
          max-width: 486px;

          .titleBox {
            display: flex;
            flex-direction: column;
            gap: 32px;

            .titleImg {
              width: 100%;
            }

            .explain {
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
            }
          }

          .btnBox {
            display: flex;
            gap: 20px;

            button {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 66px;
              font-size: 22px;
              font-weight: 700;
              border: solid 2px #000;
              border-radius: 60px;

              &.navBtn {
              }

              &.pubBtn {
                color: #fff;
                background: #000;
              }
            }
          }
        }
      }

      .swiperContainer {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        max-width: 50%;
        padding: 42px 0 42px 10px;

        .swiperBox {
          width: 800px;
          overflow: hidden;
          height: 600px;
          padding-left: 20px;
          padding-top: 20px;
          display: flex;
          position: relative;

          .swiperList {
            display: flex;
            gap: 20px;
            transition: all 0.8s;

            .swiperContBox {
              display: flex;
              width: 630px;
              min-width: 630px;
              height: 544px;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
              cursor: pointer;

              .itemImg {
                flex: 1;
              }

              .infoContainer {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 268px;
                padding: 30px 16px 20px 16px;

                .titleBox {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;

                  * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .title {
                    font-size: 28px;
                    line-height: 35px;
                  }

                  .creator {
                    font-size: 16px;
                    line-height: 20px;
                  }
                }

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 26px;

                  .infoList {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;

                    li {
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;

                      .key {
                        font-size: 14px;
                        line-height: 18px;
                        font-weight: 500;
                      }

                      .value {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        font-size: 22px;
                        line-height: 22px;
                        font-weight: 900;

                        .unit {
                          font-size: 12px;
                          line-height: 16px;
                        }
                      }
                    }
                  }

                  .bottomBox {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    .historyBox {
                      display: flex;
                      flex-direction: column;
                      gap: 8px;

                      .title {
                        font-size: 14px;
                      }

                      .scrollBox {
                        background: #f4f2f2;
                        border-radius: 8px;
                        padding: 10px 6px 10px 8px;

                        .historyList {
                          display: flex;
                          flex-direction: column;
                          gap: 12px;
                          height: 168px;
                          padding: 0 8px 0 0;
                          overflow-y: scroll;

                          &::-webkit-scrollbar {
                            width: 4px;
                            border: 5px solid #f6f6f6;
                          }

                          &::-webkit-scrollbar-thumb {
                            width: 4px;
                            background: #b7b7b7;
                            border-radius: 4px;
                          }

                          &::-webkit-scrollbar-track {
                            background: #f4f2f2;
                            border-radius: 4px;
                          }

                          li {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .profBox {
                              display: flex;
                              align-items: center;
                              gap: 6px;

                              img {
                                width: 28px;
                                height: 28px;
                                object-fit: cover;
                                border-radius: 50%;
                                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
                              }

                              strong {
                                font-size: 16px;
                              }
                            }
                          }
                        }
                      }
                    }

                    .btnBox {
                      display: flex;
                      gap: 10px;

                      button {
                        flex: 1;
                        height: 34px;
                        font-size: 14px;
                        font-weight: 700;
                        border: solid 1px #000;
                        border-radius: 8px;

                        &.bidBtn {
                          color: #fff;
                          background: #000;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .nextBtn {
          position: absolute;
          left: -24px;
          z-index: 3;

          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
      }
    }

    .contArticle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 30px;
      margin: 70px auto 0 auto;
      max-width: 1280px;

      .title {
        font-size: 22px;
        font-weight: 900;
      }

      &.swiperArticle {
        max-width: 1312px;
        position: relative;
        gap: 10px;

        & > .title {
          padding: 0 16px;
        }

        .swiperContainer {
          overflow: hidden;
          .swiperBox {
            display: flex;
            align-items: center;
            position: relative;

            .swiperList {
              display: flex;
              gap: 16px;
              overflow-x: scroll;
              padding: 20px 16px;

              &::-webkit-scrollbar {
                display: none;
              }

              .swiperContBox {
                display: flex;
                flex-direction: column;
                width: 308px;
                min-width: 308px;
                border-radius: 20px;
                box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
                overflow: hidden;
                cursor: pointer;
              }
            }
          }
        }

        .pageBtn {
          position: absolute;

          &.preBtn {
            top: 270px;
            left: -8px;
          }
          &.nextBtn {
            top: 270px;
            right: -8px;
          }
        }
      }

      &.collectionArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                height: 480px;

                .bg {
                  height: 290px;
                }

                .infoContainer {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 40px 15px 18px 15px;
                  position: relative;

                  .profImg {
                    width: 66px;
                    height: 66px;
                    border-radius: 50%;
                    top: -33px;
                    position: absolute;
                  }

                  .infoBox {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    text-align: center;

                    .store {
                      font-size: 22px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .nickname {
                      margin: 4px 0 0 0;
                      font-size: 14px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .description {
                      flex: 1;
                      word-break: break-all;
                      margin: 16px 0 0 0;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
        }
      }

      &.categoryArticle {
        .categroyList {
          display: flex;
          justify-content: space-between;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 7px;
            width: 146px;
            height: 48px;
            padding: 0 10px;
            font-size: 14px;
            line-height: 14px;
            white-space: nowrap;
            background: #fff;
            border-radius: 80px;
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
            cursor: pointer;

            img,
            .blank {
              width: 21px;
              object-fit: contain;
            }
          }
        }
      }

      &.trendingArticle {
        .swiperContainer {
          .swiperBox {
            .swiperContBox {
              display: flex;
              flex-direction: column;
              height: 500px;
              color: #fff;

              .itemBox {
                flex: 1;
                display: flex;
                align-items: flex-end;

                .infoBox {
                  width: 100%;
                  padding: 16px;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 20px;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: 14px;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 10px 0 0 0;
                    font-size: 22px;
                    font-weight: 500;
                    line-height: 30px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 4px 0 0 0;
                    font-size: 14px;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 22px;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 14px;
                      font-weight: 500;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 18px;
                    }
                  }
                }
              }

              .buyBtn {
                height: 64px;
                font-size: 22px;
                font-weight: 500;
                color: #fff;
                background: #222;
              }
            }
          }
        }
      }

      &.newArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                height: 404px;
                color: #fff;
                position: relative;

                .imageBox{
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
          height: 100%;
          width: 100%;
        }

        .infoBox {
          z-index: 9;
                  width: 100%;
                  padding: 16px;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 20px;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: 14px;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 10px 0 0 0;
                    font-size: 22px;
                    font-weight: 500;
                    line-height: 30px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 4px 0 0 0;
                    font-size: 14px;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 22px;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 14px;
                      font-weight: 500;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }

      &.tipArticle {
        .swiperContainer {
          .swiperBox {
            .swiperList {
              .swiperContBox {
                display: flex;
                flex-direction: column;
                height: 330px;

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  gap: 6px;
                  width: 100%;
                  height: 92px;
                  padding: 0 16px;

                  .title {
                    font-size: 20px;
                    line-height: 24px;
                  }

                  .explain {
                    font-size: 14px;
                    line-height: 16px;
                    color: #555;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 70px;
    max-width: 1280px;
    padding: 80px 0 102px 0;
    margin: 0 auto;
    border-top: 1px solid #222;

    .contBox {
      display: flex;
      justify-content: space-between;

      .logoBox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;

        .logoBtn {
          img {
            height: 84px;
          }
        }

        .explain {
          font-size: 16px;
          font-weight: 500;
          line-height: 26px;
        }
      }

      .navBar {
        display: flex;

        & > li {
          display: flex;
          flex-direction: column;
          gap: 30px;
          width: 200px;

          .title {
            font-size: 20px;
          }

          .detailList {
            display: flex;
            flex-direction: column;
            gap: 20px;

            li {
              * {
                font-size: 16px;
                font-weight: 500;
                color: #222;
              }
            }
          }
        }
      }
    }

    .bottomBar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .leftBox {
        display: flex;
        align-items: center;
        gap: 16px;

        * {
          font-size: 16px;
          font-weight: 700;
        }
      }

      .copyRight {
        font-size: 16px;
        font-weight: 500;
        color: #a6a6a6;
      }
    }
  }
`;


{/* 
<>
<article className="visual">
              <div className="titleContainer">
                <div className="titleInnerBox">
                  <div className="titleBox">
                    <img className="titleImg" src={title} />
                    <p className="explain">
                      Make money with NFTs that are easily issued and managed.
                      <br /> Only in your own NFT gallery
                    </p>
                  </div>

                  <div className="btnBox">
                    <button
                      className="navBtn"
                      onClick={() => navigate("/marketplace")}
                    >
                      NFT Navigation
                    </button>
                    <button
                      className="pubBtn"
                      onClick={() => {
                        if(isloggedin){
                          navigate("/createitem")
                        }
                      else{
                        SetErrorBar("PLEASE LOG IN")
                      }}}
                    >
                      NFT Publication
                    </button>
                  </div>
                </div>
              </div>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={visualSwiperRef}>
                    {list_featured
                      .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                      .map((cont, index) => (
                        <li className="swiperContBox" key={index}>
                          <span
                            className="itemImg"
                            style={{
                              backgroundImage: `url(${cont.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          />

                          <div className="infoContainer">
                            <div className="titleBox">
                              <strong className="title">
                                {cont.titlename}
                              </strong>
                              <strong>{cont.author.nickname}</strong>
                            </div>

                            <div className="infoBox">
                              <ul className="infoList">
                                <li>
                                  <p className="key">Current Bid</p>
                                  <span className="value">
                                    <p>2.867</p>
                                    <p className="unit">KLAY</p>
                                  </span>
                                </li>
                                <li>
                                  <p className="key">Auction ending in</p>
                                  <p className="value">05:32:21</p>
                                </li>
                              </ul>

                              <div className="bottomBox">
                                <div className="historyBox">
                                  <p className="title">Offer History</p>

                                  <span className="scrollBox">
                                    <ul className="historyList">
                                      {[1].map((con, index) => (
                                        <li key={index}>
                                          <span className="profBox">
                                            <img
                                              src={
                                                I_klaytn
                                              }
                                            />
                                            <strong>
                                              {cont.askpricestats?.min} KLAY
                                            </strong>
                                          </span>

                                          <p className="time">21:54</p>
                                        </li>
                                      ))}
                                    </ul>
                                  </span>
                                </div>

                                <div className="btnBox">
                                  <button
                                    className="viewBtn"
                                    onClick={() =>
                                      navigate(
                                        `/singleitem?itemid=${cont.itemid}`
                                      )
                                    }
                                  >
                                    View Item
                                  </button>
                                  <button
                                    className="bidBtn"
                                    onClick={() =>
                                      navigate(
                                        `/singleitem?itemid=${cont.itemid}`
                                      )
                                    }
                                  >
                                    Place a Bid
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <button className="nextBtn" onClick={onClickVisualSwiperBtn}>
                  <img src={I_ltArw3BlackBtn} alt="" />
                </button>
              </div>
            </article>

            <article className="collectionArticle swiperArticle contArticle">
              <strong className="title">Trending Authors</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={collectionSwiperRef}>
                    {creatorlist.map((cont, index) => (
                      <li key={index} className="swiperContBox">
                        <div
                          className="bg"
                          style={{
                            backgroundImage: `url(${home_bg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            background: "#000",
                          }}
                        />

                        <div className="infoContainer">
                          <img
                            className="profImg"
                            src={cont.profileimageurl}
                            style={{
                              backgroundImage: `url(${cont.profileimageurl})`,

                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              background: "#f00",
                            }}
                          />

                          <div className="infoBox">
                            <strong className="store">{cont.nickname}</strong>
                            <strong className="nickname">
                              {strDot(5, 5, cont?.username)}
                            </strong>
                            <p className="description">
                              {cont.mongo?.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className="preBtn pageBtn"
                onClick={() =>
                  onClickSwiperPreBtn(
                    collectionSwiperRef,
                    creatorlist,
                    collectionIndex,
                    setCollectionIndex
                  )
                }
              >
                <img src={I_ltArw3BlackBtn} alt="" />
              </button>
              <button
                className="nextBtn pageBtn"
                onClick={() =>
                  onClickSwiperNextBtn(
                    collectionSwiperRef,
                    creatorlist,
                    collectionIndex,
                    setCollectionIndex
                  )
                }
              >
                <img src={I_rtArw3BlackBtn} alt="" />
              </button>
            </article>

            <article className="categoryArticle contArticle">
              <strong className="title">Market Category</strong>

              <ul className="categroyList">
                {D_categoryList.map((category, index) => (
                  <li
                    key={index}
                    onClick={() =>{
                      console.log(category)
                      dispatch({type: SET_CATEGORY, payload:{value:category.code}});
                      navigate("/marketplace/"+category.code)
                    }
                    }
                  >
                    <img src={category.img} alt="" />
                    <strong>{category.text}</strong>
                    <span className="blank" />
                  </li>
                ))}
              </ul>
            </article>

            <article className="trendingArticle swiperArticle contArticle">
              <strong className="title">Trending NFT Item</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={trendingSwiperRef}>
                    {list_trenditems
                      .filter((elem) => elem.url)
                      .sort((a, b) => b.countfavors - a.countfavors)
                      .map((cont, index) => (
                        <li
                          key={index}
                          className="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.itemid}`)
                          }
                        >
                          <div
                            className="itemBox"
                            style={{
                              backgroundImage: `url(${cont.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="infoBox">
                              <div className="topBar">
                                <button
                                  className="likeBtn"
                                  onClick={(e) =>
                                    onClickFavorBtn(e, cont.itemid)
                                  }
                                >
                                  <img
                                    src={
                                      cont.ilikethisitem ? heart_on : heart_off
                                    }
                                    alt=""
                                  />

                                  <p>{cont.countfavors}</p>
                                </button>

                                <button
                                  className="bookmarkBtn"
                                  onClick={(e) =>
                                    onClickBookMarkBtn(e, cont.itemid)
                                  }
                                >
                                  <img
                                    src={cont.ididbookmark ? star_on : star_off}
                                    alt=""
                                  />
                                </button>
                              </div>

                              <p className="title">{cont.titlename}</p>
                              <p className="nickname">
                                {strDot(cont.author?.nickname, 10, 0)}
                              </p>

                              <div className="etcBox">
                                <p className="time">
                                  {moment
                                    .unix(cont.minpriceorder?.expiry)
                                    .fromNow() ||
                                    get_deltatime_str(
                                      cont.minpriceorder?.expiry
                                    )}
                                </p>

                                <strong className="priceBox">
                                  {cont.askpricestats?.min} KLAY
                                </strong>
                              </div>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy Now
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <button
                className="preBtn pageBtn"
                onClick={() =>
                  onClickSwiperPreBtn(
                    trendingSwiperRef,
                    list_trenditems,
                    trendingItemIndex,
                    setTrendingItemIndex
                  )
                }
              >
                <img src={I_ltArw3BlackBtn} alt="" />
              </button>
              <button
                className="nextBtn pageBtn"
                onClick={() =>
                  onClickSwiperNextBtn(
                    trendingSwiperRef,
                    list_trenditems,
                    trendingItemIndex,
                    setTrendingItemIndex
                  )
                }
              >
                <img src={I_rtArw3BlackBtn} alt="" />
              </button>
            </article>

            <article className="newArticle swiperArticle contArticle">
              <strong className="title">NEW NFT Item</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={itemSwiperRef}>
                    {list_newitems
                      .filter((elem) => elem.url)
                      .sort((a, b) => b.countfavors - a.countfavors)
                      .map((cont, index) => (
                        <li
                          key={index}
                          className="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.itemid}`)
                          }
                          
                        >
                          {cont.item.typestr=="image"&&(<img className="imageBox" src={cont.item?.url}/>)}
                          {cont.item.typestr=="video"&&(<video className="imageBox"><source src={cont.item?.url}/></video> )}
                          <div className="infoBox">
                            <div className="topBar">
                              <button
                                className="likeBtn"
                                onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                              >
                                <img
                                  src={
                                    cont.ilikethisitem ? heart_on : heart_off
                                  }
                                  alt=""
                                />

                                <p>{cont.countfavors}</p>
                              </button>

                              <button
                                className="bookmarkBtn"
                                onClick={(e) =>
                                  onClickBookMarkBtn(e, cont.itemid)
                                }
                              >
                                <img
                                  src={cont.ididbookmark ? star_on : star_off}
                                  alt=""
                                />
                              </button>
                            </div>

                            <p className="title">{cont.titlename}</p>
                            <p className="nickname">
                              {strDot(cont.author?.nickname, 10, 0)}
                            </p>

                            <div className="etcBox">
                              <p className="time">
                                {moment
                                  .unix(cont.minpriceorder?.expiry)
                                  .fromNow() ||
                                  get_deltatime_str(cont.minpriceorder?.expiry)}
                              </p>

                              <strong className="priceBox">
                                {cont.askpricestats?.min} KLAY
                              </strong>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <button
                className="preBtn pageBtn"
                onClick={() =>
                  onClickSwiperPreBtn(
                    itemSwiperRef,
                    list_newitems,
                    itemIndex,
                    setItemIndex
                  )
                }
              >
                <img src={I_ltArw3BlackBtn} alt="" />
              </button>
              <button
                className="nextBtn pageBtn"
                onClick={() =>
                  onClickSwiperNextBtn(
                    itemSwiperRef,
                    list_newitems,
                    itemIndex,
                    setItemIndex
                  )
                }
              >
                <img src={I_rtArw3BlackBtn} alt="" />
              </button>
            </article>

            <article className="tipArticle swiperArticle contArticle">
              <strong className="title">Tips for Itemverse users</strong>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={tipWrapRef}>
                    {D_Tips.map((cont, index) => (
                      <li key={index} className="swiperContBox">
                        <img src={cont.img} alt="" />
                        <div className="infoBox">
                          <p className="title">{cont.title}</p>
                          <p className="explain">{cont.explain}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
            </> */}
