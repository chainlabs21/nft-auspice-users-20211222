import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from "../../util/Util";
import moment from "moment";
import axios from "axios";
import { API } from "../../config/api";
import { LOGGER, gettimestr, get_deltatime_str } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";

import I_klaytn from "../../img/sub/I_klaytn.svg"

export default function SitemItems({ val, index }) {
  const navigate = useNavigate();
  const [ilikethisitem, setIlikethisitem] = useState(false);
  useEffect(()=>{console.log(val)},[])
  

  return (
    <PBitemItems>
      <li className="swiperContBox">
        <span
          className="itemImg"
          style={{
            backgroundImage: `url(${val.item.url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="infoContainer">
          <div className="titleBox">
            <strong className="title">{val.item.titlename}</strong>
            <strong>{val.item.author_info.nickname}</strong>
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
                          <img src={I_klaytn} />
                          <strong>{val.askpricestats?.min} KLAY</strong>
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
                  onClick={() => navigate(`/singleitem?itemid=${val.itemid}`)}
                >
                  View Item
                </button>
                <button
                  className="bidBtn"
                  onClick={() => navigate(`/singleitem?itemid=${val.itemid}`)}
                >
                  Place a Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </PBitemItems>
  );
}
const PBitemItems = styled.div`


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
      
`;
