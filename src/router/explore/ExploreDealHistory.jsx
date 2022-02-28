import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

import sample from "../../img/sub/sample.png";
import I_3dot from "../../img/icons/I_3dot.png";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import I_x from "../../img/icons/I_x.svg";
import heart_off from "../../img/sub/heart_off.png";
import re from "../../img/sub/re.png";
import share from "../../img/sub/share.png";
import loupe_black from "../../img/sub/loupe_black.png";
import exchange from "../../img/sub/exchange.png";
import side_close from "../../img/sub/side_close.png";
import filter_icon2 from "../../img/sub/filter_icon2.png";
import icon_link_on from "../../img/sub/icon_link_on.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import TransactionHistoryFilter from "../../components/mypage/mypageFilter";
import { Icons } from "react-toastify";
import axios from 'axios';

import {API} from '../../config/api'
import moment from "moment";

export default function ExploreDeal() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useSelector((state)=>state.common.isMobile)
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [moMoreObj, setMoMoreObj] = useState({});
  const [dataList, setDataList] = useState([]);
  const [listMore, setListMore] = useState(-1);

  function onClickMoreLessBtn(index) {
    if (listMore === index) setListMore(-1);
    else setListMore(index);
  }

  function editFilterList(category, cont) {
    let dataObj = filterObj;
    dataObj[category] = cont;
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }
  function onclickFilterReset() {
    setFilterObj({});
    setFilterList([]);
  }
  function onclickFilterCancel(cont) {
    let dataObj = filterObj;
    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] == cont) {
        delete dataObj[key];
      }
    }
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }
  function onClickToggleMoreBtn(index) {
    let moreObj = moMoreObj;
    moreObj[index] = !moreObj[index];
    console.log(moreObj);
    setMoMoreObj({ ...moreObj });
  }
  useEffect(() => {
    let token_sec = localStorage.getItem("token");
    axios.defaults.headers.get.token = token_sec;
    axios.defaults.headers.post.token = token_sec;

    axios
      .get(API.API_GET_EXPLORE, {
        params: {
          fieldname: "typestr",
          fieldvalues: "MINT,SALE",
          itemdetail: 1,
        },
      })
      .then((resp) => {
        console.log("MAvjoRxUYM", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setDataList(list);
        }
      });
  }, []);

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <TransactionHistoryFilter off={setToggleFilter} />
        ) : (
          <button
            className="filterBtn mo withBg"
            onClick={() => setToggleFilter(true)}
          >
            <p>Filter</p>
            <img src={filter_icon2} alt="" />
          </button>
        )}

        <MexploreDealHistory>
          <section className="innerBox">
            <article className="selectedArea">
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

            <article className="listArea">
              <ul className="list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cont, index) => {
                  return (
                    <li>
                      <div className="topBar">
                        <div className="leftBox">
                          <span className="profImg" />
                          <div className="textBox">
                            <p className="category">Sale</p>
                            <p className="contTitle">Summer Pool</p>
                            <button
                              className="moreLessBtn"
                              onClick={() => onClickMoreLessBtn(index)}
                            >
                              {listMore === index ? "- less" : "+ More"}
                            </button>
                          </div>
                        </div>

                        <div className="rightBox">
                          <div className="token">
                            <img src={I_klaytn} alt="" />
                            <p>0.005</p>
                          </div>

                          <div className="time">
                            <p>1 minutes left</p>

                            <button className="linkBtn" onClick={() => {}}>
                              <img src={icon_link_on} alt="" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {listMore === index && (
                        <ul className="infoList">
                          <li>
                            <p className="key">Quantity</p>
                            <p className="value">1</p>
                          </li>
                          <li>
                            <p className="key">From</p>
                            <p className="value">VOE83754899999999</p>
                          </li>
                          <li>
                            <p className="key">To</p>
                            <p className="value">TIDREDQ349999999</p>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        </MexploreDealHistory>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <TransactionHistoryFilter off={setToggleFilter} />
        ) : (
          <button
            className="filterBtn pc"
            onClick={() => setToggleFilter(true)}
          >
            <img src={side_close} alt="" />
          </button>
        )}

        <PtransactionHistory
          style={{ padding: toggleFilter && "120px 0 0 350px" }}
        >
          <section className="innerBox">
            <article className="selectedArea">
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

              <button className="transactionalBtn" onClick={() => {}}>
                <img src={exchange} alt="" />
                <p>transactional information</p>
              </button>
            </article>

            <article className="listArea">
              <ul className="listHeader">
                <li>Event</li>
                <li>Item</li>
                <li>Price</li>
                <li>From</li>
                <li>To</li>
                <li>Date</li>
                <li>Quantify</li>
                <li></li>
              </ul>

              <ul className="list">
              {
                dataList.map((cont, index)=>(
                  <li key={index}>
                    <span>{/**EVENTTYPE */}
                      {cont.typestr}
                    </span>

                    <span>{/* itemImage */}
                      <img className="profImg" src={cont.item.url} />
                      <p>{cont.item?.titlename}</p>
                    </span>

                    <span>{/**price*/}
                      <img className="tokenImg" src={I_klaytn} />
                      <p className="price">{cont.price}</p>
                    
                    </span>
                    <span>{/**from */}
                    <img className="profImg"/>
                        <p>{cont.from_}</p>
                    </span>

                    <span>{/**to*/}
                      <img className="profImg" />
                      <p>{cont.to_}</p>
                    </span>

                    <span>{/* date*/}
                      <p>{moment(cont.createdat).fromNow()}</p>
                    </span>

                    <span>{/**quantity*/}
                      <p>{cont.amount}</p>
                    </span>

                    <span>{/**tx Link*/}
                      <button className="" onClick={() => {}}>
                        <img src={icon_link_on} alt="" />
                      </button>
                    </span>
                  </li>
                  ))
                }
              </ul>
            </article>
          </section>
        </PtransactionHistory>
      </>
    );
}

const MexploreDealHistory = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .innerBox {
    margin: 0 auto;

    .selectedArea {
      padding: 5.55vw;

      .selectedList {
        display: flex;
        gap: 3.88vw 2.22vw;
        overflow-x: scroll;

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

    .listArea {
      border-top: 1px solid #e1e1e1;

      .list {
        display: flex;
        flex-direction: column;
        overflow: scroll;

        & > li {
          display: flex;
          flex-direction: column;
          gap: 4.44vw;
          padding: 6.66vw 5.55vw;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .leftBox {
              display: flex;
              gap: 1.11vw;

              .profImg {
                width: 11.11vw;
                height: 11.11vw;
                border-radius: 50%;
                background: #000;
                object-fit: cover;
              }

              .textBox {
                .category {
                  font-size: 3.33vw;
                  color: #b2b2b2;
                }

                .contTitle {
                  font-size: 4.44vw;
                }

                .moreLessBtn {
                  margin: 1.66vw 0 0 0;
                  font-size: 3.33vw;
                  color: #727272;
                }
              }
            }

            .rightBox {
              .token {
                display: flex;
                align-items: center;
                gap: 1.11vw;
                font-size: 3.88vw;
                font-weight: 500;

                img {
                  width: 6.66vw;
                }
              }

              .time {
                display: flex;
                align-items: center;
                font-size: 3.33vw;
                color: #b1b1b1;

                .linkBtn {
                  img {
                    width: 6.66vw;
                  }
                }
              }
            }
          }

          .infoList {
            display: flex;
            background: #fbfbfb;
            border-radius: 2.22vw;

            li {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 1.11vw;
              height: 18.88vw;
              padding: 0 5.55vw;
              font-size: 3.88vw;
              overflow: hidden;

              p {
                width: 100%;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .key {
                color: #727272;
              }
            }
          }
        }
      }

      /* .listHeader li,
      .list li span {
        display: flex;
        align-items: center;
        gap: 1.11vw;

        &:nth-of-type(1) {
          width: 28.33vw;
          min-width: 28.33vw;
        }

        &:nth-of-type(2) {
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(3) {
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(4) {
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(5) {
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(6) {
          width: 30.55vw;
          min-width: 30.55vw;
        }

        &:nth-of-type(7) {
          width: 22.22vw;
          min-width: 22.22vw;
          text-align: center;
        }

        &:nth-of-type(8) {
          justify-content: center;
          width: 22.22vw;
          min-width: 22.22vw;
        }
      } */
    }
  }
`;

const PtransactionHistory = styled.div`
  padding: 120px 0 0 0;
  position: relative;

  .innerBox {
    max-width: 1280px;
    padding: 60px 0;
    margin: 0 auto;

    .selectedArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      .selectedList {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

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

    .transactionalBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      height: 48px;
      padding: 0 14px;
      font-size: 18px;
      font-weight: 500;
      border: 1px solid #d9d9d9;
      border-radius: 44px;

      img {
        width: 24px;
      }
    }
  }

  .listArea {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;
    font-weight: 500;
    border-radius: 20px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);

    .listHeader {
      display: flex;
      align-items: center;
      height: 56px;
      font-size: 18px;
      font-weight: 500;

      li {
      }
    }

    .list {
      font-size: 20px;

      li {
        display: flex;
        align-items: center;
        height: 72px;
        border-top: 1px solid #d9d9d9;

        .profImg {
          width: 38px;
          height: 38px;
          object-fit: cover;
          background: #000;
          border-radius: 50%;
        }

        .tokenImg {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        p {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .listHeader li,
    .list li span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;

      &:nth-of-type(1) {
        width: 120px;
      }

      &:nth-of-type(2) {
        width: 190px;
        padding: 0 16px;
      }

      &:nth-of-type(3) {
        width: 190px;
        padding: 0 16px;
      }

      &:nth-of-type(4) {
        width: 190px;
        padding: 0 16px;
      }

      &:nth-of-type(5) {
        width: 190px;
        padding: 0 16px;
      }

      &:nth-of-type(6) {
        width: 190px;
      }

      &:nth-of-type(7) {
        width: 120px;
        text-align: center;
      }

      &:nth-of-type(8) {
        flex: 1;
      }
    }
  }
`;