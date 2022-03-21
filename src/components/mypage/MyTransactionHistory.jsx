import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import {
  D_chainList,
  D_coinList,
  D_filterList,
  D_transactionStatusList,
} from "../../data/D_filter";

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
import icon_link_on from "../../img/sub/icon_link_on.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import { applytoken } from "../../util/rest";
import {LOGGER} from '../../util/common';
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
import { strDot } from "../../util/Util";
import moment from "moment";

export default function MyTransactionHistory({address}) {
  const EVENT_MAP={
    CLOSE_SALE: "BOUGHT"
  }
  const FILTER_MAP={
    1:'Listing',
    2: 'Sale',
    4: 'Bid'
  }
  //const {userData, isloggedin, walletAddress} = useSelector((state) => state.user);
  const isMobile = useSelector((state)=>state.common.isMobile)
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [moMoreObj, setMoMoreObj] = useState({});
  const [dataList, setDataList] = useState([]);
  const [unit, setUnit] = useState("USD");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [priceFilterToggle, setPriceFilterToggle] = useState(false);
  const [callEffect, setCallEffect] = useState(false);
  const [pricePopup, setPricePopup] = useState(false);
  const [nickname, setNickname]=useState('Username')
  const [desc, setDesc]=useState('Description')
  const [imageUrl, setImageUrl] = useState('')
  const [statusFilter, setStatusFilter]=useState({});
  const [reset, setReset]=useState({});

  let axios = applytoken();
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

  function onStatusFilterReset(){
    setReset({});
  }

  function setFilter(e){
    console.log(e)
    setStatusFilter(e)
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

  useEffect(()=>{
    console.log(address)
  },[address])

  useEffect(
    (_) => {
      axios
        .get(
           'http://itemverse1.net:32287/transactions/history'
           ,
           {
             params: { username: address },
           }
        )
        .then((resp) => {
          LOGGER("", resp);
          //let { status, list } = resp.data;
          if (resp.data.status == "OK") {
          console.log(resp)
            setDataList(resp.data.list);
          }
        }); //		,  : `${apiServer}/queries/rows/transactions` // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
    },
    [address]
  );
    return (
      <>
      {
        toggleFilter ? (
          <TransactionHistoryFilter off={setToggleFilter} setFilter={setFilter} resetFilter={reset}/>
        ) : (
          <button
            className="filterBtn pc withBg"
            onClick={() => setToggleFilter(true)}
            style={{
              top: "30%",
              marginLeft:"-6px",
              position: "sticky"
          }}
          >
            <img src={side_close} alt="" />
          </button>
        )}
        <PtransactionHistory>
          

          <section className="innerBox">

            <article className="selectedBox">
              <ul className="selectedList">
                <li className="resetBtn" onClick={() => {onStatusFilterReset()}}>
                  Filter reset
                </li>

                <li>
                <img src={I_klaytn} alt="" />
                  Klaytn
                  <img src={I_x} alt="" />
                </li>
                { Object.keys(statusFilter)
                .map((v, i)=>{
                  if (statusFilter[v]){
                    return(<li key={i} onClick={() => {setReset({...statusFilter, [v]: !statusFilter[v]})}}>
                        <span className="blank" />
                        {FILTER_MAP[v]}
                        <img src={I_x} alt="" />
                      </li>);
                    }
                  })
                }
                {/* {D_transactionStatusList[]
                   && (
                    <li onClick={onStatusFilterReset}>
                  <span className="blank" />
                  {statusFilter.key}
                  <img src={I_x} alt="" />
                </li>
                  )
                } */}
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
                      <span>{/**EVENTTYPEEVENT_MAP[cont.transaction.typestr]*/cont.buyer == address?"BOUGHT":"SOLD"}</span>
                      <span onClick={()=>{navigate(
                                      `/singleitem?itemid=${cont.itemid}`
                                    );}}>{/* itemImage */}
                        {cont.item_info?.typestr=='image'&&(<img className="profImg" src={cont.item_info.url}/>)}
                        {cont.item_info?.typestr=='video'&&(<video className="profImg" src={cont.item_info.url}/>)}
                        <p>{cont.itemid}</p>
                      </span>
                      <span>{/**price*/}
                      <img className="tokenImg" src={I_klaytn} />
                        <p className="price">{cont.price} KLAY</p></span>
                      <span>{/**from */}
                      <img className="profImg" src={cont.seller_info?.profileimageurl}/>
                        <p>{cont.seller}</p>
                      </span>
                      <span>{/**to*/}
                      <img className="profImg" src={cont.buyer_info?.profileimageurl}/>
                        <p>{cont.buyer}</p></span>
                      <span>{/* date*/}
                        <p>{moment(cont.createdat).fromNow()}</p>
                      </span>
                      <span>{/**quantity*/}
                      {cont.amount}</span>
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

const MtransactionHistory = styled.div`
  position: relative;

  .innerBox {
    margin: 0 auto;

    .selectedBox {
      padding: 5.55vw 5.55vw 0 5.55vw;
      margin: 2.77vw 0 0 0;
      border-top: 1px solid #e1e1e1;

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
        height: 11.66vw;
        padding: 0 1.11vw;
        font-size: 3.88vw;

        li {
        }
      }

      .list {
        padding: 0 1.11vw;

        li {
          display: flex;
          align-items: center;
          height: 13.33vw;
          border-top: 1px solid #d9d9d9;
          font-size: 3.88vw;

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
      }
    }
  }
`;

const PtransactionHistory = styled.div`
  position: relative;

  .innerBox {
    max-width: 1280px;
    margin: 0 auto;

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
