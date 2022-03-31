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
import side_close from "../../img/sub/side_close.png";
import filter_icon2 from "../../img/sub/filter_icon2.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import { Icons } from "react-toastify";
import MypageFilter from "./mypageFilter";
import {strDot} from "../../util/Util"
import axios from "axios";
import { API } from "../../config/api";
import moment from "moment";
import FixedPrice from "../../router/mint/saleItem/FixedPrice";
import { useTranslation } from "react-i18next";

export default function MyOffers() {
  const {t} = useTranslation(['locale'])
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {userData, walletAddress} = useSelector((state)=> state.user)

  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [detailCategory, setDetailCategory] = useState(0);
  const [nickname, setNickname]=useState('Username')
  const [desc, setDesc]=useState('Description')
  const [imageUrl, setImageUrl] = useState('')
  const [biddingList, setBiddingList] =useState([]);
  const [proposalList, setProposalList] =useState([]);
  const [filter, setFilter] =useState({});
  const [reset, setReset]=useState({});
  useEffect(_=>{
    if(walletAddress){}else{return;}
    axios.get(`${API.API_GET_BIDS}`)
    .then((resp)=>{
      setBiddingList(resp.data.payload)
      console.log(resp)
    })
    if(walletAddress){}else{return;}
    axios.get(`${API.API_GET_PROPOSAL}`)
    .then((resp)=>{
      setProposalList(resp.data.payload)
      console.log(resp)
    })

  }, [])

  useEffect(_=>{
    if(walletAddress){}else{return;}
    if (detailCategory == 1){
      
      axios.get(`${API.API_GET_PROPOSAL}`)
      .then((resp)=>{
        setProposalList(resp.data.payload)
        console.log(resp)
      })
    }else{
    axios.get(`${API.API_GET_BIDS}`)
    .then((resp)=>{
      setBiddingList(resp.data.payload)
      console.log(resp)
    })
  }

  }, [detailCategory])





  if (isMobile)
  return (
    <>
      <DefaultHeader />

      {toggleFilter ? (
        <MypageFilter off={setToggleFilter} />
      ) : (
        <button
          className="filterBtn mo withBg"
          onClick={() => setToggleFilter(true)}
        >
          <p>Filter</p>
          <img src={filter_icon2} alt="" />
        </button>
      )}

      <Moffers>
        <section className="innerBox">

          <article className="detailCategoryArea">
            <ul className="detailCategoryList">
              <li
                className={detailCategory === 0 && "on"}
                onClick={() => setDetailCategory(0)}
              >
                Participation in auction
              </li>
              <li
                className={detailCategory === 1 && "on"}
                onClick={() => setDetailCategory(1)}
              >
                Bid proposal
              </li>
            </ul>
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

          <article className="listBox">
            <ul className="listHeader">
              <li>Item</li>
              <li>Price</li>
              <li>Quantify</li>
              {detailCategory===0 &&(<li>Seller</li>)}
              {detailCategory===1 &&(<li>Bidder</li>)}
              <li>Expiration</li>
              <li>State</li>
            </ul>

            {detailCategory ===0 &&(
              <ul className="list">
                {biddingList.map((cont, index) => {
                  return (
                    <li key={index}>
                      <span>
                        <img className="profImg" src={cont.item.url}/>
                        <p>{cont.item?.titlename}</p>
                      </span>

                      <span>
                        <img className="tokenImg" src={I_klaytn} />
                        <p className="price">{cont.ress.price} KLAY</p>
                      </span>

                      <span>
                        <p>3</p>
                      </span>

                      <span>
                        <img className="profImg" src={cont.sellerInfo.profileimageurl}/>
                        <p>{cont.ress.seller}</p>
                      </span>

                      <span>
                        <p>{moment.unix(cont.ress.expiry).fromNow()}</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>)}

              {detailCategory ===1 &&(
              <ul className="list">
                {proposalList.map((cont, index) => {
                  return (
                    <li key={index}>
                      <span>
                        <img className="profImg" src={cont.item.url}/>
                        <p>{cont.item?.titlename}</p>
                      </span>

                      <span>
                        <img className="tokenImg" src={I_klaytn} />
                        <p className="price">{cont.ress.price} KLAY</p>
                      </span>

                      <span>
                        <p>3</p>
                      </span>

                      <span>
                        <img className="profImg" src={cont.sellerInfo.profileimageurl}/>
                        <p>{cont.ress.seller}</p>
                      </span>

                      <span>
                        <p>{moment.unix(cont.ress.expiry).fromNow()}</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>)}
          </article>
        </section>
      </Moffers>
    </>
  );
else
    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <MypageFilter off={setToggleFilter} setFilter={setFilter} resetFilter={reset}/>
        ) : (
          <button
            className="filterBtn pc withBg"
            style={{
              position: 'fixed',
              top: '50%'
            }}
            onClick={() => setToggleFilter(true)}
          >
            <img src={side_close} alt="" />
          </button>
        )}

        <Poffers>
          <section className="innerBox">

            <ul className="detailCategoryList">
              <li
                className={detailCategory === 0 && "on"}
                onClick={() => setDetailCategory(0)}
              >
                {t('mypage:PARTICIPATED_AUCTION')}
              </li>
              <li
                className={detailCategory === 1 && "on"}
                onClick={() => setDetailCategory(1)}
              >
                {t('mypage:BID_PROPOSAL')}
              </li>
            </ul>

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

            <article className="listBox">
              <ul className="listHeader">
                <li>{t('mypage:ITEM')}</li>
                <li>{t('mypage:PRICE')}</li>
                <li>{t('mypage:QUANTITY')}</li>
                {detailCategory===0 &&(<li>{t('mypage:SELLER')}</li>)}
                {detailCategory===1 &&(<li>{t('mypage:BIDDER')}</li>)}
                
                <li>{t('mypage:EXPIRY')}</li>
                <li>{t('mypage:STATE')}</li>
              </ul>
            {detailCategory ===0 &&(
              <ul className="list">
                {biddingList.map((cont, index) => {
                  return (
                    <li key={index}>
                      <span>
                        <img className="profImg" src={cont.item.url}/>
                        <p>{cont.item?.titlename}</p>
                      </span>

                      <span>
                        <img className="tokenImg" src={I_klaytn} />
                        <p className="price">{cont.ress.price} KLAY</p>
                      </span>

                      <span>
                        <p>1</p>
                      </span>

                      <span>
                        <img className="profImg" src={cont.sellerInfo.profileimageurl}/>
                        <p>{cont.ress.seller}</p>
                      </span>

                      <span>
                        <p>{moment.unix(cont.ress.expiry).fromNow()}</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>)}

              {detailCategory ===1 &&(
              <ul className="list">
                {proposalList.map((cont, index) => {
                  return (
                    <li key={index}>
                      <span>
                        <img className="profImg" src={cont.item.url}/>
                        <p>{cont.item?.titlename}</p>
                      </span>

                      <span>
                        <img className="tokenImg" src={I_klaytn} />
                        <p className="price">{cont.ress.price} KLAY</p>
                      </span>

                      <span>
                        <p>1</p>
                      </span>

                      <span>
                        <img className="profImg" src={cont.sellerInfo.profileimageurl}/>
                        <p>{cont.ress.bidder}</p>
                      </span>

                      <span>
                        <p>{moment.unix(cont.ress.expiry).fromNow()}</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>)}
            </article>
          </section>
        </Poffers>
      </>
    );
}
const Poffers = styled.div`

  position: relative;

  .innerBox {
    max-width: 1280px;
    margin: 0 auto;

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

    .detailCategoryList {
      display: inline-flex;
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
        padding: 0 10px;
        font-size: 18px;
        font-weight: 500;

        li {
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
          width: 224px;
          padding: 0 16px;
        }

        &:nth-of-type(2) {
          width: 224px;
          padding: 0 10px 0 18px;
        }

        &:nth-of-type(3) {
          width: 224px;
          text-align: center;
        }

        &:nth-of-type(4) {
          width: 224px;
          padding: 0 16px;
        }

        &:nth-of-type(5) {
          justify-content: flex-start;
          width: 224px;
          padding: 0 42px;
        }

        &:nth-of-type(6) {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
`;

const Moffers = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .innerBox {
    margin: 0 auto;

    .detailCategoryArea {
      padding: 8.33vw 5.55vw 0 5.55vw;
      border-top: 1px solid #e1e1e1;

      .detailCategoryList {
        display: flex;
        height: 13.33vw;
        font-size: 3.88vw;
        font-weight: 700;
        background: #f6f6f6;
        border-radius: 7.77vw;

        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          border-radius: 7.77vw;
          cursor: pointer;

          &.on {
            color: #fff;
            background: #000;
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

    .listBox {
      display: flex;
      flex-direction: column;
      margin: 5.55vw;
      font-weight: 500;
      border: 1px solid #000;
      border-radius: 5.55vw;
      overflow: scroll;

      .listHeader {
        display: flex;
        align-items: center;
        height: 10vw;
        padding: 0 1.11vw;
        font-size: 3.88vw;
        font-weight: 500;

        li {
        }
      }

      .list {
        padding: 0 1.11vw;
        font-size: 3.88vw;

        li {
          display: flex;
          align-items: center;
          height: 13.33vw;
          border-top: 1px solid #d9d9d9;

          .profImg {
            width: 6.66vw;
            height: 6.66vw;
            object-fit: cover;
            background: #000;
            border-radius: 50%;
          }

          .tokenImg {
            width: 6.66vw;
            height: 6.66vw;
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
        align-items: center;
        gap: 1.11vw;

        &:nth-of-type(1) {
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(2) {
          width: 30.55vw;
          min-width: 30.55vw;
        }

        &:nth-of-type(3) {
          justify-content: center;
          width: 30.55vw;
          min-width: 30.55vw;
          text-align: center;
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
          justify-content: center;
          width: 22.22vw;
          min-width: 22.22vw;
          text-align: center;
        }
      }
    }
  }
`;