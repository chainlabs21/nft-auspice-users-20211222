import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

import I_3dot from "../../img/icons/I_3dot.png";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import I_x from "../../img/icons/I_x.svg";
import heart_off from "../../img/sub/heart_off.png";
import heart_on from "../../img/sub/heart_on.png";
import loupe_black from "../../img/sub/loupe_black.png";
import side_close from "../../img/sub/side_close.png";
import filter_icon2 from "../../img/sub/filter_icon2.png";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../header/DefaultHeader";
import PopupBg from "../PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import Filter from "../common/DefaultFilter";
import { strDot } from "../../util/Util";
import axios from "axios";
import { LOGGER } from "../../util/common";
import { API } from "../../config/api";
import { RESET_FILTER, SET_STATUS_FILTER } from "../../reducers/filterReducer";
import { D_SStatusList } from "../../data/D_filter";
import SearchWalletItembox from "./MySearchWallet/itembox"
import { useTranslation } from "react-i18next";

export default function SearchWallet({ address }) {
  const {t} = useTranslation(['locale']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);
  const { marketFilter } = useSelector((state) => state.filter);

  const [popupIndex, setPopupIndex] = useState(-1);
  const [Filters, setFilters] = useState();
  const [search, setSearch] = useState("");
  const [sortPopup, setSortPopup] = useState(false);
  const [itemFilterPopup, setItemFilterPopup] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  let [listitems, setlistitems] = useState([]);
  const [nickname, setNickname] = useState("Username");
  const [desc, setDesc] = useState("Description");
  const [imageUrl, setImageUrl] = useState("");
  const [orderkey, setOrderkey] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [targetAddress, setTargetAddress] = useState();
  const [targettData, setTargettData] = useState();
  const sortFilter=[
    t('sort:LATEST'),
    t('sort:POPULARITY'),
    t('sort:CLOSE_TO_FINISH'),
    t('sort:LOW_PRICE'),
    t('sort:HIGH_PRICE'),
    t('sort:SMALL_BIDS'),
    t('sort:LOT_OF_BIDS'),
    t('sort:MOST_SEEN'),
    t('sort:OLDEST')

  ]

  const { userData, isloggedin, walletAddress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log(address)
    if (address) {
      setTargetAddress(address);
      if (walletAddress == address) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      console.log("noaddress found" + pathname.split('/')[3]);
      if(pathname.split('/')[3]){
        setTargetAddress(pathname.split('/')[3])
      }else{
        setTargetAddress(walletAddress);
      setIsOwner(true);
      }
    }
  }, [address]);

  useEffect(() => {
    setSearch("");
    console.log('asdfa')
    fetchitems();
  }, [targetAddress]);

  function onClickFavorBtn(e, itemid) {
    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status === "OK") {
        fetchitems();
      } else if (message === "PLEASE-LOGIN") {
        //SetErrorBar("로그인을 해주세요");
      }
    });
  }
  useEffect(async () => {
    let listFill = [];
    await Object.keys(marketFilter.status).forEach((v, i) => {
      if (marketFilter.status[v]) {
        listFill.push(D_SStatusList[v].id);
      }
    });
    setFilters(listFill);
    fetchitems(listFill);
  }, [marketFilter, orderkey]);

  const handleEnter = (e) => {
    console.log(e);
    if (e.code == "Enter") {
      fetchitems(Filters);
    }
  };
  const handleBundle = (e) => {
    if (e == 2) {
      setlistitems([]);
    } else {
      fetchitems();
    }
  };

  const handleSort = (e) => {
    setOrderkey(e);
  };

  useEffect(() => {
    var video = document.getElementById("video");
    if (video) video.load();
  }, [listitems]);

  const fetchitems = (list) => {
    axios
      .get(`${API.API_MYITEMS}/${targetAddress}/0/10/id/DESC`, {
        params: {
          search,
          salestatusstr: list,
          pricemin: marketFilter.min,
          pricemax: marketFilter.max,
          //searchKey,
        },
      })
      .then((resp) => {
        //LOGGER("wyBPdUnid7", resp.data);
        //console.log(resp.data)
        let { status, list } = resp.data;
        if (status == "OK") {
          // itemList = [...itemList, ...list];
          // setFilteredList([...itemList]);
          // console.log(resp)
          // setTotalItem(payload.count);

          //console.log(list);
          setlistitems(list);
        }
      });
  };

  useEffect((_) => {
    fetchitems([]);
  }, [address]);

  //SORTING ITEMS
  function sortingmachine(a, b) {
    if (orderkey === 0) {
      return b.item.id - a.item.id;
    } else if (orderkey === 1) {
      console.log('좋아요 순서')
      return b.item.countfavors - a.item.countfavors;
    } else if (orderkey === 2) {
    } else if (orderkey === 3) {

      return b.item.pricemax - a.item.pricemax;
    } else if (orderkey === 4) {
      return b.item.pricemin - a.item.pricemin;
    } else if (orderkey === 5) {
    } else if (orderkey === 6) {
    } else if (orderkey === 7) {
      return b.item.countviews - a.item.countviews;
    } else if (orderkey === 8) {
      return a.item.id - b.item.id;
    }
  }

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    setPopupIndex(index);
  }

  const onclickFilterReset = () => {
    dispatch({ type: RESET_FILTER });
    setSearch("");
  };
  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MsearchWallet>
          {toggleFilter ? (
            <Filter off={setToggleFilter} />
          ) : (
            <button
              className="filterBtn mo withBg"
              onClick={() => setToggleFilter(true)}
              style={{zIndex: '10'}}
            >
              <p>Filter</p>
              <img src={filter_icon2} alt="" />
            </button>
          )}

          <section className="innerBox">

            <article className="topBar">
              <div className="sortBox">
                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setItemFilterPopup(true)}
                  >
                    <p>Single Item</p>
                    <img src={I_dnArrow} alt="" />
                  </button>

                  {itemFilterPopup && (
                    <>
                      <SelectPopup
                        off={setItemFilterPopup}
                        contList={D_itemFilter}
                      />
                      <PopupBg off={setItemFilterPopup} />
                    </>
                  )}
                </div>

                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setSortPopup(true)}
                  >
                    <p>Latest</p>
                    <img src={I_dnArrow} alt="" />
                  </button>
                  {sortPopup && (
                    <>
                      <SelectPopup off={setSortPopup} contList={D_sortFilter} />
                      <PopupBg off={setSortPopup} />
                    </>
                  )}
                </div>
              </div>

              <div className="searchBox">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search items, collections, creators"
                />

                <img src={loupe_black} alt="" />
              </div>
            </article>

            <article className="selectedBox">
              <ul className="selectedList">
                <li className="resetBtn" onClick={() => {}}>
                  Filter reset
                </li>

                <li>
                  Klaytn
                  <img src={I_x} alt="" />
                </li>

                <li>
                  <span className="blank" />
                  KLAY
                  <img src={I_x} alt="" />
                </li>
                {/* {filterList.map((cont, index) => (
                  <li key={index} onClick={() => onclickFilterCancel(cont)}>
                    <span className="blank" />
                    {cont}
                    <img src={I_x} alt="" />
                  </li>
                ))} */}
              </ul>
            </article>

            <article className="itemListBox">
              <ul className="itemsList">
              {listitems.length == 0 && "등록된 아이템을 확인할 수 없습니다."}
              {listitems.sort(sortingmachine).map((cont, index) => (
                <SearchWalletItembox key={index} cont={cont} index={index} address={address}/>
                // <li
                //   key={index}
                //   className="itemBox"
                //   onClick={() => {
                //     navigate("/singleItem?itemid=" + cont.item?.itemid);
                //   }}
                // >
                //   {cont.item.typestr == "image" && (
                //     <img className="imageBox" src={cont?.item?.url} />
                //   )}
                //   {cont.item.typestr == "video" && (
                //     <video className="imageBox">
                //       <source src={cont?.item.url} />
                //     </video>
                //   )}
                //   <div className="infoBox">
                //       {popupIndex === index && (
                //         <>
                //           <ul className="morePopup">
                //             <li onClick={() => {
                //               navigate(
                //                 "/saleItem?itemid=" + cont?.item?.itemid
                //               );
                //             }}>Sale</li>
                //             <li>Edit</li>

                //           </ul>
                //           <PopupBg off={setPopupIndex} />
                //         </>
                //       )}

                //       <div className="topBar">
                //         <button
                //           className="likeBtn"
                //           // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                //         >
                //           <img src={heart_off} alt="" />

                //           <p>1,389</p>
                //         </button>

                //         <button
                //           className="moreBtn"
                //           onClick={(e) => onClickMoreBtn(e, index)}
                //         >
                //           <img src={I_3dot} alt="" />
                //         </button>
                //       </div>

                //       <p className="nickname">Renoir</p>
                //       <p className="title">Verger de pommiers</p>
                //     </div>
                //   </li>
                ))}
              </ul>
            </article>
          </section>
        </MsearchWallet>
      </>
    );
  else

  return (
    <>
      {toggleFilter ? (
        <Filter off={setToggleFilter} />
      ) : (
        <button
          className="filterBtn pc withBg"
          onClick={() => setToggleFilter(true)}
          style={{
            position: 'fixed',
            top: '50%'
          }}
        >
          <img src={side_close} alt="" />
        </button>
      )}
      <PsearchWallet>
        <section className="innerBox">
          <article className="topBar">
            <div className="searchBox">
              <img src={loupe_black} alt="" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleEnter}
                placeholder="Search items, collections, creators"
              />
            </div>

            <div className="sortBox">
              <div className="posBox">
                <button
                  className="selectBtn"
                  onClick={() => setItemFilterPopup(true)}
                >
                  <p>Single Item</p>
                  <img src={I_dnArrow} alt="" />
                </button>

                {itemFilterPopup && (
                  <>
                    <SelectPopup
                      off={setItemFilterPopup}
                      contList={D_itemFilter}
                      selectCont={(e) => {
                        handleBundle(e);
                      }}
                    />
                    <PopupBg off={setItemFilterPopup} />
                  </>
                )}
              </div>

              <div className="posBox">
                <button
                  className="selectBtn"
                  onClick={() => setSortPopup(true)}
                  //selectCont={e=>handleSort(e)}
                >
                  <p>{sortFilter[orderkey]}</p>
                  <img src={I_dnArrow} alt="" />
                </button>
                {sortPopup && (
                  <>
                    <SelectPopup
                      off={setSortPopup}
                      contList={sortFilter}
                      selectCont={(e) => handleSort(e)}
                    />
                    <PopupBg off={setSortPopup} />
                  </>
                )}
              </div>
            </div>
          </article>

          <article className="selectedBox">
            <ul className="selectedList">
              <li className="resetBtn" onClick={onclickFilterReset}>
                Filter reset
              </li>
              {Object.keys(marketFilter.status).map((v, i) => {
                if (marketFilter.status[v]) {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        dispatch({
                          type: SET_STATUS_FILTER,
                          payload: { key: v },
                        });
                      }}
                    >
                      <span className="blank" />
                      {v}
                      <img src={I_x} alt="" />
                    </li>
                  );
                }
              })}
              <li>
                Klaytn
                <img src={I_x} alt="" />
              </li>

              <li>
                <span className="blank" />
                KLAY
                <img src={I_x} alt="" />
              </li>
            </ul>
          </article>

          <article className="itemListBox">
            <ul className="itemsList">
              {listitems.length == 0 && "등록된 아이템을 확인할 수 없습니다."}
              {listitems.sort(sortingmachine).map((cont, index) => {
                //console.log(cont.item.countfavors)
                return(
                <SearchWalletItembox cont={cont} index={index} address={address}/>
              )})}
            </ul>
          </article>
        </section>
      </PsearchWallet>
    </>
  );
}

const MsearchWallet = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .innerBox {
    margin: 0 auto;

    .navBar {
      display: flex;
      flex-wrap: wrap;
      margin: 5.55vw;
      border: 2px solid #000;

      button {
        flex: 1;
        min-width: 50%;
        height: 13.33vw;
        font-size: 4.44vw;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 3) {
          border-top: 2px solid #000;
        }
        &:nth-of-type(2n) {
          border-left: 2px solid #000;
        }
      }
    }

    & > .topBar {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      padding: 5.55vw 5.55vw 0 5.55vw;
      border-top: 1px solid #e1e1e1;

      .searchBox {
        display: flex;
        align-items: center;
        gap: 2.22vw;
        height: 13.33vw;
        border: solid 1px #d9d9d9;
        border-radius: 7.77vw;
        padding: 0 4.44vw;

        img {
          width: 5.55vw;
        }

        input {
          flex: 1;
          font-size: 4.44vw;
        }
      }

      .sortBox {
        display: flex;
        gap: 2.22vw;

        .posBox {
          flex: 1;

          button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 13.33vw;
            padding: 0 5.55vw;
            font-size: 3.88vw;
            font-weight: 500;
            border: solid 1px #d9d9d9;
            border-radius: 6.66vw;

            img {
              width: 4.44vw;
            }
          }
        }
      }
    }

    .selectedBox {
      padding: 0 5.55vw;
      margin: 2.77vw 0 0 0;

      .selectedList {
        display: flex;
        flex-wrap: wrap;
        gap: 3.88vw 2.22vw;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.77vw;
          height: 11.66vw;
          padding: 0 5vw;
          font-size: 4.44vw;
          font-weight: 500;
          white-space: nowrap;
          border: solid 1px #d9d9d9;
          border-radius: 12.22vw;
          cursor: pointer;

          &.resetBtn {
            justify-content: center;
            color: #fff;
            background: #000;
            border: none;
          }

          .blank,
          img {
            width: 3.88vw;
          }
        }
      }
    }

    .itemListBox {
      display: flex;
      flex-direction: column;
      margin: 8.33vw 0 0 0;

      .itemsList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;
        padding: 0 5.55vw;

        .itemBox {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: 126.11vw;
          color: #fff;
          border-radius: 5.55vw;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          .imageBox {
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
            padding: 5.55vw;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3),
              rgba(84, 84, 84, 0.3)
            );

            .morePopup {
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.3),
                rgba(84, 84, 84, 0.3)
              );
              border-radius: 2.77vw;
              overflow: hidden;
              right: 2.77vw;
              bottom: 41.66vw;
              position: absolute;
              z-index: 6;

              li {
                display: flex;
                align-items: center;
                height: 8.88vw;
                padding: 0 5vw;
                font-size: 3.88vw;
                font-weight: 500;

                &:nth-of-type(n + 2) {
                  border-top: 1px solid rgba(255, 255, 255, 0.3);
                }

                &:hover {
                  color: #000;
                  background: #fff;
                }
              }
            }

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
              margin: 0.55vw 0 0 0;
              font-size: 7.22vw;
              font-weight: 500;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .nickname {
              margin: 5vw 0 0 0;
              font-size: 5vw;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
`;

const PsearchWallet = styled.div`
  position: relative;
  .innerBox {
    max-width: 1280px;
    margin: 0 auto;

    .navBar {
      display: flex;
      border: 2px solid #000;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 2) {
          border-left: 2px solid #000;
        }
      }
    }

    & > .topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 50px 0 0 0;

      .searchBox {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 480px;
        height: 48px;
        border: solid 1px #d9d9d9;
        border-radius: 28px;
        padding: 0 25px;

        img {
          width: 20px;
        }

        input {
          flex: 1;
          font-size: 16px;
        }
      }

      .sortBox {
        display: flex;
        gap: 16px;

        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 208px;
          height: 48px;
          padding: 0 20px;
          font-size: 18px;
          font-weight: 500;
          border: solid 1px #d9d9d9;
          border-radius: 24px;

          img {
            width: 20px;
          }
        }
      }
    }

    .selectedList {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 20px 0 0 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 168px;
        height: 56px;
        padding: 0 22px;
        font-size: 18px;
        font-weight: 500;
        border: solid 1px #d9d9d9;
        border-radius: 44px;
        cursor: pointer;

        &.resetBtn {
          justify-content: center;
          color: #fff;
          background: #000;
          border: none;
        }

        .blank,
        img {
          width: 14px;
        }
      }
    }
  }

  .itemListBox {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0 0 0;

    .itemsList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .itemBox {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 308px;
        min-width: 308px;
        height: 404px;
        color: #fff;
        border-radius: 20px;
        overflow: hidden;
        cursor: pointer;
        position: relative;

        .imageBox {
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

          .morePopup {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3),
              rgba(84, 84, 84, 0.3)
            );
            border-radius: 10px;
            overflow: hidden;
            right: 10px;
            bottom: 126px;
            position: absolute;
            z-index: 6;

            li {
              display: flex;
              align-items: center;
              height: 32px;
              padding: 0 18px;
              font-size: 14px;
              font-weight: 500;

              &:nth-of-type(n + 2) {
                border-top: 1px solid rgba(255, 255, 255, 0.3);
              }

              &:hover {
                color: #000;
                background: #fff;
              }
            }
          }

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
`;
