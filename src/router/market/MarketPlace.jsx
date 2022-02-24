import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import collect_img from "../../img/sub/collect_img.png";
import collect_img2 from "../../img/sub/collect_img2.png";
import collect_img3 from "../../img/sub/collect_img3.png";
import collect_img4 from "../../img/sub/collect_img4.png";

import side_close from "../../img/sub/side_close.png";
import rock from "../../img/sub/rock.png";
import filter_icon from "../../img/sub/filter_icon.png";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import loupe from "../../img/sub/loupe.png";
import heart_off from "../../img/sub/heart_off.png";
import heart_on from "../../img/sub/heart_on.png";
import star_off from "../../img/sub/star_off.png";
import star_on from "../../img/sub/star_on.png";
import I_x from "../../img/icons/I_x.svg";
import filter_icon2 from "../../img/sub/filter_icon2.png";

import { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import { API } from "../../config/api";
import { putCommaAtPrice } from "../../util/Util";
import { applytoken } from "../../util/rest";
import { get_deltatime_str, LOGGER } from "../../util/common";
import { PAYMEANS_DEF } from "../../config/configs";
import { useSelector, useDispatch } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import Filter from "../../components/common/DefaultFilter";
import { RESET_FILTER, SET_CATEGORY } from "../../reducers/filterReducer"
import {
  D_categoryList,
  D_itemFilter,
  D_sortFilter,
} from "../../data/D_marketPlace";
import SelectPopup from "../../components/SelectPopup";
import PopupBg from "../../components/PopupBg";
import axios from 'axios'
export default function MarketPlace() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
 // const history = useHistory();
 // const location = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  let loadingBusy = false;
  let itemIndex = 0;
  let itemList = [];
  const Categories={
    ALL: 'all'
    , ART: 'art'
    , MUSIC: 'Music'
    , VIRTUALWORLD: 'virtual world'
    , TRADINGCARDS: 'trading cards'
    , COLLECTIBLES: 'collectibles'
    , SPORTS: 'sports'
    , UTILITY: 'utility'
    , ETC: 'etc'
  }

  const [toggleFilter, setToggleFilter] = useState(false);
  const [itemFilterPopup, setItemFilterPopup] = useState(false);
  const [sortPopup, setSortPopup] = useState(false);
  const [category, setCategory] = useState('all')//searchParams.get("category"));
  //const[setFilter, setFilterME]=useState('');
  
  
  //const [categoryFilter, setCategoryFilter] = useState(Categories.ALL);
  const [statusFilter, setStatusFilter] = useState([])
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [callEffect, setCallEffect] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [unit, setUnit] = useState("KLAY");
  const [pricePopup, setPricePopup] = useState(false);
  const [searchKey, setSearchKey] = useState(params.searchKey);
  const {marketFilter} = useSelector((state) => state.filter);
  
  useEffect(()=>{
    getItem(marketFilter.category)
    console.log(marketFilter.category)
  },[marketFilter])

  const handleCategory=(a)=>{
    dispatch({type: SET_CATEGORY, payload: {value: a}});
    //setSearchParams({"category": a})
  }


  const onclickFilterReset = () => {
    dispatch({type: RESET_FILTER});

  };

  function windowScrollHander() {
    
    if (
      window.scrollY + window.innerHeight > document.body.clientHeight - 200 &&
      !loadingBusy
    ) {
      console.log(marketFilter.category)
      loadingBusy = true;
      itemIndex += 10;
      getItem(marketFilter.category, itemIndex);
    }
  }

async function getItem(icategory, itemIndex = 0) {
    const filterKeys = Object.keys(filterObj);
    
    //*
    //let selectedStatus = 0;

    //filterKeys.map((e) => {//
    //  if (e.indexOf("status") !== -1) selectedStatus += e.slice(6) * 1;
    //});
    

    await axios
      .get(`${API.API_MERCHANDISES_LIST}/${itemIndex}/${100}`, {
        params: {
          categorystr: icategory,
          salestatus: marketFilter.status,
          pricemin: marketFilter.min,
          pricemax: marketFilter.max,
          //searchKey,
        },
      })
      .then((resp) => {
        //LOGGER("wgNCeNKxXL", resp.data);
        let { status, list, payload } = resp.data;
        if (status == "OK") {
          itemList = [...itemList, ...list];
          setFilteredList([...itemList]);
          setTotalItem(payload.count);
          loadingBusy = false;
        }
      });
  }
/*
  useEffect(() => {
    
    window.addEventListener("scroll", windowScrollHander);
    return()=>{
      window.removeEventListener('scroll', windowScrollHander)
    }
  }, []);


  let axios = applytoken();
  const handleCateFilter = (category) => {
    editFilterList("category", category);
    setCategoryFilter(category);
  };

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
  function onClickOption() {
    setFromPrice("");
    setToPrice("");
    setCallEffect(!callEffect);
    setPricePopup(false);
  }
//Filter List
  const editFilterList = (category, cont) => {
    let dataObj = filterObj;
    dataObj[category] = cont;
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  };



  const onclickFilterCancel = (cont) => {
    let dataObj = filterObj;

    for (let key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] === cont) {
        delete dataObj[key];
      }
    }
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  };

  

  useLayoutEffect(() => {
    setSearchKey(params.searchKey);
    if (searchKey) editFilterList("searchKey", params.searchKey);
  }, [params]);

  useEffect(() => {
    console.log(filterList)
    getItem();
  }, [filterList, callEffect]);
*/
  if (isMobile)
    return (
      <>
        <DefaultHeader />
        {toggleFilter ? (
          <Filter toggle={toggleFilter}  off={setToggleFilter}/>
        ) : (
          <button
            className="filterBtn mo"
            onClick={() => setToggleFilter(true)}
          >
            <p>Filter</p>
            <img src={filter_icon2} alt="" />
          </button>
        )}

        <MmarketPlaceBox>
          <section className="innerBox">
            <article className="topBar">
              <p className="total">
                Total {totalItem.toLocaleString("eu", "US")}
              </p>

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
            </article>

            <article className="selectedBox">
              <ul className="selectedList">
                <li className="resetBtn" onClick={onclickFilterReset}>
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

            <ul className="itemList">
              {filteredList.map((v, i) => (
                <li
                  key={i}
                  class="itemBox"
                  onClick={() =>
                    navigate(`/singleitem?itemid=${v.item.itemid}`)
                  }
                  style={{
                    backgroundImage: `url(${v.item?.url})`,
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
                        <img
                          src={v.ilikethisitem ? heart_on : heart_off}
                          alt=""
                        />

                        <p>{v?.item?.countfavors}</p>
                      </button>

                      <button
                        className="bookmarkBtn"
                        // onClick={(e) => onClickBookMarkBtn(e, cont.itemid)}
                      >
                        <img src={v.ididbookmark ? star_on : star_off} alt="" />
                      </button>
                    </div>

                    <p className="title">{v.item?.titlename}</p>
                    <p className="nickname">{v.author?.nickname}</p>

                    <div className="etcBox">
                      <p className="time">
                        {moment.unix(v.minpriceorder?.expiry).fromNow() ||
                          get_deltatime_str(v.minpriceorder?.expiry)}
                      </p>

                      <strong className="priceBox">
                        {putCommaAtPrice(v.askpricestats?.min)} KLAY
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </MmarketPlaceBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        {toggleFilter ? (
          <Filter 
          off={setToggleFilter} 
          
          />
        ) : (
          <button
            className="filterBtn pc"
            onClick={() => setToggleFilter(true)}
          >
            <img src={side_close} alt="" />
          </button>
        )}

        <PmarketPlaceBox
          style={{ padding: toggleFilter && "120px  30px 0 380px" }}
        >
          <section className="innerBox">
            <article className="topBar">
              <p className="total">
                Total {totalItem.toLocaleString("eu", "US")}
              </p>

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
            </article>

            <ul className="cateogryList">
              {D_categoryList.map((cont, index) => (
                <li key={index} className={(marketFilter.category==cont.code)?'on':''} onClick={()=>{handleCategory(cont.code)  }}>{cont.name}</li>
              ))}
            </ul>

            <article className="selectedBox">
              <strong className="title">Selected Filter</strong>
              <ul className="selectedList">
                <li className="resetBtn" onClick={onclickFilterReset}>
                  Filter reset
                </li>


                { Object.keys(marketFilter.status).map((v, i)=>{
                  if (marketFilter.status[v]){
                    return(<li key={i} onClick={() => {}}>
                        <span className="blank" />
                        {v}
                        <img src={I_x} alt="" />
                      </li>);
                    }
                  })
                }

                <li>
                  <span className="blank" />
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

            <ul className="itemList">
              {filteredList.map((v, i) => (
                <li
                  key={i}
                  class="itemBox"
                  onClick={() =>
                    navigate(`/singleitem?itemid=${v.item.itemid}`)
                  }
                  style={{
                    backgroundImage: `url(${v.item?.url})`,
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
                        <img
                          src={v.ilikethisitem ? heart_on : heart_off}
                          alt=""
                        />

                        <p>{v?.item?.countfavors}</p>
                      </button>

                      <button
                        className="bookmarkBtn"
                        // onClick={(e) => onClickBookMarkBtn(e, cont.itemid)}
                      >
                        <img src={v.ididbookmark ? star_on : star_off} alt="" />
                      </button>
                    </div>

                    <p className="title">{v.item?.titlename}</p>
                    <p className="nickname">{v.author?.nickname}</p>

                    <div className="etcBox">
                      <p className="time">
                        {moment.unix(v.minpriceorder?.expiry).fromNow() ||
                          get_deltatime_str(v.minpriceorder?.expiry)}
                      </p>

                      <strong className="priceBox">
                        {putCommaAtPrice(v.askpricestats?.min)} KLAY
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </PmarketPlaceBox>
      </>
    );
}

const MmarketPlaceBox = styled.div`
  padding: 72px 0 0 0;
  height: 100vh;
  overflow-y: scroll;

  .innerBox {
    padding: 6.66vw 5.55vw 0 5.55vw;

    & > .topBar {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;

      .total {
        font-size: 3.88vw;
        font-weight: 700;
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
            padding: 0 20px;
            font-size: 3.88vw;
            font-weight: 500;
            border: solid 1px #d9d9d9;
            border-radius: 6.66vw;

            img {
              width: 20px;
            }
          }
        }
      }
    }

    .selectedBox {
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

    .itemList {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      margin: 5.55vw 0 0 0;

      .itemBox {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        height: 125.83vw;
        color: #fff;
        border-radius: 5.55vw;
        overflow: hidden;
        cursor: pointer;

        .infoBox {
          width: 100%;
          padding: 5.5vw 4.4vw;
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
              width: 5.5vw;
            }

            .likeBtn {
              display: flex;
              align-items: center;
              gap: 8px;
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
            margin: 0.83vw 0 0 0;
            font-size: 5vw;
            font-weight: 500;
          }

          .etcBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 6.66vw;
            margin: 1.66vw 0 0 0;

            .time {
              font-size: 3.88vw;
              font-weight: 500;
              color: #e5e5e5;
            }

            .priceBox {
              font-size: 5vw;
            }
          }
        }
      }
    }
  }
`;

const PmarketPlaceBox = styled.div`
  padding: 120px 0 0 0;

  .innerBox {
    padding: 50px 0 0 0;
    max-width: 1280px;
    margin: 0 auto;

    .topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .total {
        font-size: 18px;
        font-weight: 700;
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

    .cateogryList {
      display: flex;
      flex-wrap: wrap;
      margin: 30px 0 0 0;
      border-radius: 28px;
      background: #f6f6f6;

      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 180px;
        height: 56px;
        padding: 0 35px;
        font-size: 18px;
        font-weight: 700;
        white-space: nowrap;
        border-radius: 28px;
        cursor: pointer;

        &.on {
          color: #fff;
          background: #000;
        }
      }
    }

    .selectedBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 42px 0 0 0;

      .title {
        font-size: 18px;
        font-weight: 700;
      }

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

    .itemList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin: 50px 0 0 0;

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
    }
  }
`;
