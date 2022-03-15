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

export default function MyOffers() {
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






    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <MypageFilter off={setToggleFilter} setFilter={setFilter} resetFilter={reset}/>
        ) : (
          <button
            className="filterBtn pc withBg"
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
                Participation in auction
              </li>
              <li
                className={detailCategory === 1 && "on"}
                onClick={() => setDetailCategory(1)}
              >
                Bid proposal
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