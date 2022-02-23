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
import home_bg from "../../img/sub/home_bg.png";
import exchange_gray from "../../img/sub/exchange_gray.png";
import crown from "../../img/sub/crown.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import ex_next from "../../img/sub/ex_next.png";

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import { Icons } from "react-toastify";
import MypageFilter from "../../components/mypage/mypageFilter";
import { D_rankCategoryList } from "../../data/D_explore";
<<<<<<< HEAD
import { applytoken } from "../../util/rest";
import { API } from "../../config/api";
import { LOGGER } from "../../util/common";
=======
>>>>>>> f659390 (done publishing)

export default function Ranking() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [detailCategory, setDetailCategory] = useState(0);
  const [volumeToggle, setVolumeToggle] = useState(false);
  const [listMore, setListMore] = useState(-1);
  const [beforAfterToggle, setBeforeAfterToggle] = useState(false);
<<<<<<< HEAD
  const [category, setCategory] = useState();
	let [ list , setlist ]=useState( [] )
	let axios=applytoken()
	useEffect( ()=>{ 
		axios.get( 'http://itemverse1.net:32287/queries/rows/logorders/isprivate/0/0/100/price/DESC' , {params : { userdetail : 1 }}).then(resp=>{ 
      LOGGER( 'q25Sf2Htg1' , resp.data )
			let { status , list }= resp.data
			if ( status == 'OK'){
				setlist ( list )
			}
		})
	},[])
=======
>>>>>>> f659390 (done publishing)

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MrankingBox>
          <section className="innerBox">
            <ul className="detailCategoryList">
              {D_rankCategoryList.map((cont, index) => (
                <li
                  className={detailCategory === index && "on"}
                  onClick={() => setDetailCategory(index)}
                >
                  {cont}
                </li>
              ))}
            </ul>

            <article className="titleArea">
              <strong className="title">Rankings</strong>
              <p className="explain">
                We publish the best collections every hour by analyzing multiple
                indicators from multiple angles
              </p>
            </article>

            <article className="listBox">
              <div className="topBar">
                <button className="replaceBtn" onClick={() => {}}>
                  <img src={exchange_gray} alt="" />
                  <p>Replace</p>
                </button>
              </div>

              <ul className="list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cont, index) => {
                  return (
                    <li>
                      <div className="topBar">
                        <div className="leftBox">
                          <p className="rank">{index + 1}</p>
                          <span className="profImgBox posBox">
                            {index === 0 && (
                              <img className="crown" src={crown} alt="" />
                            )}
                            <span className="profImg" />
                          </span>

                          <div className="textBox">
<<<<<<< HEAD
                            <p className="title">{cont.itemid}</p>
=======
                            <p className="title">Summer Pool</p>
>>>>>>> f659390 (done publishing)
                            <button
                              className="moreLessBtn"
                              onClick={() => setListMore(index)}
                            >
                              {listMore === index ? "- Less" : "+ More"}
                            </button>
                          </div>
                        </div>

                        <div className="rightBox">
                          <div className="token">
                            <img className="tokenImg" src={I_klaytn} alt="" />
                            <p>45,323</p>
                          </div>
                          <p className="percent">250.33%</p>
                        </div>
                      </div>

                      {listMore === index && (
                        <ul className="detailList">
                          <li>
                            <p className="key">7d trading volume</p>
                            <p className="value">88.01 KLAY</p>
                          </li>
                          <hr />
                          <li>
                            <p className="key">Average price</p>
                            <p className="value">156.37</p>
                          </li>
                          <hr />
                          <li>
                            <p className="key">Owner</p>
                            <p className="value">4,325</p>
                          </li>
                          <hr />
                          <li>
                            <p className="key">Number of items</p>
                            <p className="value">256</p>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>

          <footer>
            <button
              className={beforAfterToggle ? "beforeBtn on" : "beforeBtn"}
              onClick={() => setBeforeAfterToggle(false)}
            >
              <img src={ex_next} alt="" />
              <p>1 ~ 100</p>
            </button>
            <button
              className={beforAfterToggle ? "afterBtn" : "afterBtn on"}
              onClick={() => setBeforeAfterToggle(true)}
            >
              <p>101 ~ 200</p>
              <img src={ex_next} alt="" />
            </button>
          </footer>
        </MrankingBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        <PrankingBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">Rankings</strong>
              <p className="explain">
                We publish the best collections every hour by analyzing multiple
                indicators from multiple angles
              </p>
            </article>

            <ul className="detailCategoryList">
              {D_rankCategoryList.map((cont, index) => (
                <li
                  className={detailCategory === index && "on"}
                  onClick={() => setDetailCategory(index)}
                >
                  {cont}
                </li>
              ))}
            </ul>

            <article className="listBox">
              <ul className="listHeader">
                <li>Rank</li>
                <li>Collection</li>
                <li>
                  Total volume
                  <button
                    className={volumeToggle ? "volumeBtn on" : "volumeBtn"}
                    onClick={() => setVolumeToggle(!volumeToggle)}
                  >
                    <img src={I_dnArrow} alt="" />
                  </button>
                </li>
                <li>
                  7day
                  <br />
                  tranding volume
                </li>
                <li>
                  7day
                  <br />
                  change
                </li>
                <li>
                  Average
                  <br />
                  price
                </li>
                <li>Owner</li>
                <li>
                  Number
                  <br />
                  of items
                </li>
              </ul>

              <ul className="list">
<<<<<<< HEAD
                {list.map((cont, index) => {
=======
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cont, index) => {
>>>>>>> f659390 (done publishing)
                  return (
                    <li>
                      <span>
                        <div className={index === 0 ? "numBox" : ""}>
                          {index + 1}
                          {index === 0 && <img src={crown} alt="" />}
                        </div>
                      </span>
                      <span>
<<<<<<< HEAD
                        <img className="profImg"/>
                        <p>{cont.itemid}</p>
                      </span>

                      <span>
                        <p>{cont.price} KLAY</p>
=======
                        <img className="profImg" />
                        <p>Summer Pool</p>
                      </span>

                      <span>
                        <p>45,323 KLAY</p>
>>>>>>> f659390 (done publishing)
                      </span>

                      <span>
                        <p>88.01 KLAY</p>
                      </span>

                      <span>
                        <p>250.33%</p>
                      </span>

                      <span>
                        <p>156.37</p>
                      </span>

                      <span>
                        <p>4,325</p>
                      </span>

                      <span>
                        <p>256</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        </PrankingBox>
      </>
    );
}

const MrankingBox = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .innerBox {
    .detailCategoryList {
      display: flex;
      gap: 3.88vw;
      height: 10.55vw;
      font-size: 3.33vw;
      font-weight: 700;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 17.77vw;
        height: 100%;

        white-space: nowrap;
        cursor: pointer;

        &.on {
          border-bottom: 2px solid #000;
        }
      }
    }

    .titleArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.5vw;
      margin: 8.88vw 8.88vw 0 8.88vw;

      .title {
        font-size: 6.11vw;
      }

      .explain {
        font-size: 3.88vw;
        line-height: 5vw;
        letter-spacing: -0.28px;
        color: #b1b1b1;
      }
    }

    .listBox {
      display: flex;
      flex-direction: column;
      margin: 5.55vw 0 0 0;

      & > .topBar {
        display: flex;
        justify-content: flex-end;
        padding: 0 5.55vw 1.11vw 5.55vw;

        .replaceBtn {
          display: flex;
          align-items: center;
          font-size: 3.88vw;
          font-weight: 500;
          color: #727272;

          img {
            width: 6.66vw;
          }
        }
      }

      .list {
        overflow-y: scroll;
        border-top: 1px solid #d9d9d9;
        padding: 0 0 20vw 0;

        & > li {
          padding: 2.22vw 5.55vw;
          border-bottom: 1px solid #d9d9d9;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 25.55vw;

            .leftBox {
              display: flex;
              width: 52vw;

              .rank {
                flex: 1;
                text-align: center;
                font-size: 4.44vw;
                font-weight: 500;
                line-height: 11.11vw;
              }

              .profImgBox {
                position: relative;

                .crown {
                  width: 4.16vw;
                  height: 4.16vw;
                  top: -1vw;
                  left: 0;
                  position: absolute;
                }

                .profImg {
                  display: block;
                  width: 11.11vw;
                  height: 11.11vw;
                  object-fit: cover;
                  background: #aaa;
                  border-radius: 50%;
                }
              }

              .textBox {
                margin: 0 0 0 1.11vw;

                .title {
                  font-size: 4.44vw;
                  font-weight: 500;
                  line-height: 8.33vw;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }

            .rightBox {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 2.22vw;

              .token {
                display: flex;
                align-items: center;
                gap: 1.11vw;
                font-size: 3.88vw;
                font-weight: 500;

                .tokenImg {
                  width: 6.66vw;
                  height: 6.66vw;
                  object-fit: contain;
                }
              }

              .percent {
                font-size: 3.33vw;
                font-weight: 500;
                color: #1c7eff;
              }
            }
          }

          .detailList {
            display: flex;
            align-items: center;
            height: 18.88vw;
            background: #fbfbfb;
            border-radius: 2.22vw;
            overflow-x: scroll;

            li {
              display: flex;
              flex-direction: column;
              gap: 1.11vw;
              min-width: 49.94vw;
              font-size: 3.88vw;
              text-align: center;

              .key {
                color: #727272;
              }

              .value {
              }
            }

            hr {
              min-width: 1px;
              height: 3.88vw;
              background: #d9d9d9;
            }
          }
        }
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 13.88vw;
    height: 20vw;
    background: #fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 3;

    button {
      display: flex;
      align-items: center;
      gap: 1.66vw;
      font-size: 4.44vw;
      font-weight: 500;
      opacity: 0.5;

      img {
        width: 6.66vw;
      }

      &.beforeBtn {
        img {
          transform: rotate(180deg);
        }
      }

      &.on {
        opacity: 1;
      }
    }
  }
`;

const PrankingBox = styled.div`
  padding: 120px 0 0 0;
  position: relative;

  .innerBox {
    max-width: 1164px;
    padding: 52px 0;
    margin: 0 auto;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .title {
        font-size: 30px;
      }

      .explain {
        font-size: 20px;
      }
    }

    .detailCategoryList {
      display: flex;
      height: 56px;
      margin: 50px 0 0 0;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 700;
      background: #f6f6f6;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 100%;
        border-radius: 28px;
        cursor: pointer;

        &.on {
          color: #fff;
          background: #000;
        }
      }
    }

    .listBox {
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
        line-height: 18px;
        font-weight: 700;

        li {
          .volumeBtn {
            img {
              width: 14px;
            }

            &.on {
              img {
                transform: rotate(180deg);
              }
            }
          }
        }
      }

      .list {
        padding: 0 10px;
        font-size: 20px;

        li {
          display: flex;
          align-items: center;
          height: 72px;
          border-top: 1px solid #d9d9d9;

          .numBox {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
            position: relative;
            overflow: visible;

            img {
              width: 15px;
              height: 15px;
              top: -7px;
              right: -7px;
              position: absolute;
            }
          }

          .profImg {
            width: 38px;
            height: 38px;
            object-fit: cover;
            background: #000;
            border-radius: 50%;
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
      .list li > span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        text-align: center;

        &:nth-of-type(1) {
          width: 90px;
        }

        &:nth-of-type(2) {
          width: 162px;
          padding: 0 10px 0 16px;
        }

        &:nth-of-type(3) {
          width: 176px;
          padding: 0 16px;
        }

        &:nth-of-type(4) {
          width: 176px;
          padding: 0 16px;
        }

        &:nth-of-type(5) {
          width: 176px;
          padding: 0 16px;
        }

        &:nth-of-type(6) {
          width: 130px;
          padding: 0 16px;
        }

        &:nth-of-type(7) {
          width: 120px;
          padding: 0 16px;
        }

        &:nth-of-type(8) {
          flex: 1;
          padding: 0 16px;
        }
      }
    }
  }
<<<<<<< HEAD
`;
=======
`;
>>>>>>> f659390 (done publishing)
