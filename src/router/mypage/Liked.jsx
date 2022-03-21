import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import collect_img from "../../img/sub/collect_img.png";
import collect_img2 from "../../img/sub/collect_img2.png";
import collect_img3 from "../../img/sub/collect_img3.png";
import collect_img4 from "../../img/sub/collect_img4.png";
import s2 from "../../img/sub/s2.png";
import s3 from "../../img/sub/s3.png";
import s4 from "../../img/sub/s4.png";
import s5 from "../../img/sub/s5.png";
import s9 from "../../img/sub/s9.png";
import s8 from "../../img/sub/s8.png";
import sample from "../../img/sub/sample.png";
import click1 from "../../img/sub/click1.png";
import home_bg from "../../img/sub/home_bg.png";
import heart_on from "../../img/sub/heart_on.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_copyWhite from "../../img/icons/I_copyWhite.png";

import Myprofcommonheader from "../../components/Myprofcommonheader";
import { useEffect, useState } from "react";
import { applytoken } from "../../util/rest";
import { getmyaddress, LOGGER } from "../../util/common";
import { API } from "../../config/api";
import moment from "moment";
import { PAYMEANS_DEF } from "../../config/configs";
import DefaultHeader from "../../components/header/DefaultHeader";
import re from "../../img/sub/re.png";
import share from "../../img/sub/share.png";
import { D_categoryList } from "../../data/D_mypage";
import { strDot } from "../../util/Util"
import axios from 'axios';

export default function Liked() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {userData, walletAddress} = useSelector((state)=>state.user)
  const [listitems, setlistitems] = useState([]);
  const [nickname, setNickname]=useState('Username')
  const [desc, setDesc]=useState('Description')
  const [imageUrl, setImageUrl] = useState('')
  const [ loaded, setloaded] = useState([])

  useEffect(()=>{
    if (userData instanceof Object && userData['myinfo_maria'] !== undefined){
      setNickname(userData.myinfo_maria.nickname)
      setDesc(userData.myinfo_maria.description)
      setImageUrl(userData.myinfo_maria.profileimageurl)
    }
  }, [userData])


  const isMobile = useSelector((state) => state.common.isMobile);

  let axios = applytoken();
  let myaddress = getmyaddress();
  let [list, setlist] = useState([]);
  useEffect((_) => {
    console.log(walletAddress)
    axios
      .get(API.API_USER_FAVORITES+`/username/${walletAddress}/0/100/id/DESC`,
        { params: { itemdetail: 1 } }
      )
      .then((resp) => {
        LOGGER("zz", resp.data);
        let { status ,list} = resp.data;
        if (status == "OK") {
          setlist(list);
          console.log(list)
        }
      });
  },[]);

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <Mliked>
          <header className="myProfHeader">
            <div
              className="bg"
              style={{
                backgroundImage: `url(${home_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="contBox">
              <span className="profImg" />
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">Henry juniors' Items</strong>
                <p className="address">0x97bc...8cad2</p>
                <p className="introduce">
                  Henry is a mixed-media artist living in the Bay Area and users
                  a stream of consciousness approach to his work
                </p>
              </div>
            </div>
          </header>

          <section className="innerBox">
            <nav className="navBar">
              {D_categoryList.map((nav, index) => (
                <button
                  key={index}
                  className={nav.url === pathname && "on"}
                  onClick={() => navigate(nav.url)}
                >
                  {nav.text}
                </button>
              ))}
            </nav>

            <article className="itemListBox">
              <ul className="itemsList">
                {[1, 2, 3, 4, 5].map((cont, index) => (
                  <li
                    key={index}
                    class="itemBox"
                    onClick={() => {}}
                    style={{
                      backgroundImage: `url(${cont.item?.url})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="infoBox">
                      <div className="topBar">
                        <button
                          className="likeBtn"
                          // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                        >
                          <img src={heart_on} alt="" />

                          <p>11</p>
                        </button>
                      </div>

                      <p className="nickname">Renoir</p>
                      <p className="title">Verger de pommiers</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </Mliked>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        <Pliked>
          <header className="myProfHeader">
            <div
              className="bg"
              style={{
                backgroundImage: `url(${home_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="contBox">
            <img className="profImg" src={imageUrl}/>
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">{nickname}'s Items</strong>
                <p className="address">{strDot(walletAddress, 5, 5)}</p>
                <p className="introduce">
                {desc}
                </p>
              </div>
            </div>
          </header>

          <section className="innerBox">
            <nav className="navBar">
              {D_categoryList.map((nav, index) => (
                <button
                  key={index}
                  className={nav.url === pathname && "on"}
                  onClick={() => navigate(nav.url)}
                >
                  {nav.text}
                </button>
              ))}
            </nav>

            <article className="itemListBox">
              <ul className="itemsList">
                {list.map((cont, index) => (
                  <li
                    key={index}
                    class="itemBox"
                    onClick={() => {navigate("/singleitem?itemid="+cont.item.itemid)}}
                  >
                  {cont.item.typestr=="image"&&(<img className="imageBox" src={cont?.item?.url}/>)}
                  {cont.item.typestr=="video"&&(<video className="imageBox"><source src={cont?.item.url}/></video> )}
                    <div className="infoBox">
                      <div className="topBar">
                        <button
                          className="likeBtn"
                          // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                        >
                          <img src={heart_on} alt="" />

                          <p>{cont.item.countfavors}</p>
                        </button>
                      </div>

                      <p className="nickname">{cont.author.nickname}</p>
                      <p className="title">{cont.item.titlename}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </Pliked>
      </>
    );
}

const Mliked = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .myProfHeader {
    .bg {
      height: 38.88vw;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 5.55vw;

      .profImg {
        width: 27.77vw;
        height: 27.77vw;
        border-radius: 50%;
        background: #000;
        top: -13.88vw;
        position: absolute;
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 16.11vw;
        gap: 1.11vw;

        button {
          img {
            width: 5.5vw;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.77vw;
        padding: 3.33vw 0 0 0;

        .title {
          font-size: 6.11vw;
        }

        .address {
          font-size: 3.88vw;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          font-size: 3.88vw;
          line-height: 5.55vw;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }

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

    .itemListBox {
      display: flex;
      flex-direction: column;
      padding: 13.88vw 0 0 0;
      border-top: 1px solid #e1e1e1;

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

          .infoBox {
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

const Pliked = styled.div`
  padding: 120px 0 0 0;
  position: relative;

  .myProfHeader {
    .bg {
      height: 320px;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      max-width: 1280px;
      margin: 0 auto;

      .profImg {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #000;
        top: -70px;
        position: absolute;
      }

      .tokenImg {
        width: 26px;
        height: 26px;
        object-fit: contain;
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 84px;
        gap: 20px;

        button {
          img {
            width: 24px;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 36px 0 0 0;

        .title {
          font-size: 32px;
        }

        .address {
          font-size: 18px;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          width: 460px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }

  .innerBox {
    max-width: 1280px;
    padding: 100px 0;
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

    .itemListBox {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin: 50px 0 0 0;

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
  }
`;
