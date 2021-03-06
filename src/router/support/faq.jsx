import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  D_dateList,
  D_instructionList,
  D_timeList,
} from "../../data/D_saleItem";
import I_ltArw3 from "../../img/icons/I_ltArw3.png"

import { useState, useEffect, useLayoutEffect } from "react";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import moment from "moment";
import { API } from "../../config/api";
import { putCommaAtPrice } from "../../util/Util";
import { applytoken } from "../../util/rest";
import { get_deltatime_str, LOGGER } from "../../util/common";
import { PAYMEANS_DEF } from "../../config/configs";
import { useSelector, useDispatch } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import Filter from "../../components/common/DefaultFilter";
import {
  RESET_FILTER,
  SET_CATEGORY,
  SET_STATUS_FILTER,
  SET_SEARCH,
} from "../../reducers/filterReducer";
import {
  D_categoryList,
  D_itemFilter,
  D_sortFilter,
} from "../../data/D_marketPlace";
import { D_SStatusList } from "../../data/D_filter";
import SelectPopup from "../../components/SelectPopup";
import PopupBg from "../../components/PopupBg";
import Marketitembox from "../../components/market/Marketitembox";
import Pagination from "../../components/support/Pagination";
import axios from "axios";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
//"<figure class="image"><img src="http://itemverse1.net/resource/notice/1648194226-geU1Xe.png"></figure>"
//import "./style2.css";


export default function FAQ() {
  const { t }  = useTranslation(['locale'])
  const D_Category = ["제목", "본문"];
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [totalNotice, setTotalNotice] = useState(100);
  
  const [totalPage, setTotalPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [announces, setAnnounces] = useState([]);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(0);
  const [categories, setCategories]=useState([])
  const [curCategory, setCurCategory] = useState(0)
  const [list, setList] = useState([])
  // useEffect(()=>{
  //   i18n.changeLanguage('ko')
  // },[])


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/faq/categories`,{
      params:{
        filter:[0]
      }
    }).then((resp) => {
      console.log(resp);
      setCategories(resp.data.resp)

    });

    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/faq/allitems`, {
      params:{
        filter:[0]
      }
    }).then((resp)=>{console.log(resp); setList(resp.data.resp)})
  }, []);

  useEffect(()=>{
    console.log(curCategory)
    if (curCategory==0)
    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/faq/allitems`, {
      params:{
        filter:[0]
      }
    }).then((resp)=>{console.log(resp);setList(resp.data.resp)})
    else
    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/faq/items`, {
      params:{
        filter:[0, curCategory]
      }
    }).then((resp)=>{console.log(resp);setList(resp.data.resp)})
  },[curCategory])

  if (isMobile)
    return (
      <>
        <Mannouncements>
          <section className="mopupBox">
          <strong className="title" style={{fontSize:'3vh', fontWeight: 'bold'}}>
            <img style={{height: '2vh'}} src={I_ltArw3} onClick={()=>{navigate('/'); console.log('help')}}/>  {t('faq:FAQ')}
            </strong>
            <p className="subtitle">
            {t('faq:FAQ_DESC')}
            </p>
            <div className="search">
            <div className="posBox">
                <button
                  className="selectBtn"
                  onClick={() => setCategoryPopup(true)}
                >
                  <p>{D_Category[selected]}</p>
                  <img src={I_dnArrow} alt="" />
                </button>
                {categoryPopup && (
                  <>
                    <SelectPopup
                      off={setCategoryPopup}
                      contList={D_Category}
                      selectCont={setSelected}
                    />
                    <PopupBg off={setCategoryPopup} />
                  </>
                )}
              </div>
              <div className="searchBox">
                <input
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder=""
                />
              </div>
              </div>
              <div className="categoryBox"> {/*{style={{display: 'none'}}>} */}
                          <div className="categoryList">
                            <ul>
                            <li onClick={() => {
                                    setCurCategory(0);
                                  }}
                                  style={
                                    curCategory === 0
                                      ? {
                                          backgroundColor: "#222",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <span>{t('faq:ALL')}</span>
                                </li>
                              {categories.map((cate, idx) => (
                                
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setCurCategory(cate.id);
                                  }}
                                  style={
                                    curCategory === cate.id
                                      ? {
                                          backgroundColor: "#222",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <span>{cate.textdisp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="contentBody">
              <div className="instructionBox">
                
                {list.map((v, i)=>{return(
                  <details className="instructionDetail">
                  <summary className="instructionSummary">
                    <div className="catAndTitle">
                      <div className="category">
                        <strong>{v.category_info.textdisp}</strong>
                      </div>
                      <div className="textBox">
                        {v.title}
                      </div>
                    </div>

                    <img className="arwImg" src={I_dnArrow} alt="" />
                  </summary>

                  <div className="content">
                  {v.description}

                  </div>
                </details>)
                })}
                
                

              </div>
            </div>

          </section>


        </Mannouncements>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <Pannouncements>
          <section className="popupBox">
            <strong className="title" style={{fontSize:'24px', fontWeight: 'bold'}}>{t('faq:FAQ')}</strong>
            <p className="subtitle">
            {t('faq:FAQ_DESC')}
            </p>
            <div className="midHeader">
              <p className="description">

              </p>

              <div className="posBox">
                <button
                  className="selectBtn"
                  onClick={() => setCategoryPopup(true)}
                >
                  <p>{D_Category[selected]}</p>
                  <img src={I_dnArrow} alt="" />
                </button>
                {categoryPopup && (
                  <>
                    <SelectPopup
                      off={setCategoryPopup}
                      contList={D_Category}
                      selectCont={setSelected}
                    />
                    <PopupBg off={setCategoryPopup} />
                  </>
                )}
              </div>

              <div className="searchBox">
                <input
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="categoryBox"> {/*{style={{display: 'none'}}>} */}
                          <div className="categoryList">
                            <ul>
                            <li onClick={() => {
                                    setCurCategory(0);
                                  }}
                                  style={
                                    curCategory === 0
                                      ? {
                                          backgroundColor: "#222",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <span>{t('faq:ALL')}</span>
                                </li>
                              {categories.map((cate, idx) => (
                                
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setCurCategory(cate.id);
                                  }}
                                  style={
                                    curCategory === cate.id
                                      ? {
                                          backgroundColor: "#222",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <span>{cate.textdisp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>






            <div className="contentBody">
              <div className="instructionBox">
                
                {list.map((v, i)=>{return(
                  <details className="instructionDetail">
                  <summary className="instructionSummary">
                    <div className="category">
                      <strong>{v.category_info.textdisp}</strong>
                    </div>
                    <div className="textBox">
                      {v.title}
                    </div>

                    <img className="arwImg" src={I_dnArrow} alt="" />
                  </summary>

                  <div className="content">
                  {v.description}

                  </div>
                </details>)
                })}
                
                

              </div>
            </div>
            
            {/* <ul className="Pagination">
              <li className="img leArrw">
                <img src={I_leArrow} />
              </li>
              <li className="img lArrw">
                <img src={I_lArrow} />
              </li>
              {[1, 2, 3, 4, 5].map((v, i) => {
                return <li className={currentPage == v ? "on" : ""}>{v}</li>;
              })}
              <li className="img rArrw">
                <img className="flip" src={I_lArrow} />
              </li>
              <li className="img reArrw">
                <img className="flip" src={I_leArrow} />
              </li>
            </ul> */}
          </section>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div`
padding: 5vw;
.subtitle{
  margin-top: 4vh;
  font-size: 4vw;
  font-weight: 500;
}
.search{
  display: flex;
  margin-top: 4vh;
  justify-content: space-between;
.posBox {
        display: flex;
        justify-content: flex-start;

        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 30vw;
          height: 6vh;
          padding: 0 4.5vw;
          font-size: 4.3vw;
          font-weight: 500;
          border: solid 1px #d9d9d9;
          border-radius: 8px;

          img {
            width: 20px;
          }
        }
      }
      .searchBox {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        

        input {
          //overflow: auto;
          width: 56vw;
          height: 6vh;
          padding: 0 12px;
          font-size: 16px;
          //text-align: end;
          background: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
        }
      }
    }
    .categoryBox{
      ul{
        display: flex;
        //flex-wrap: wrap;
        overflow-x: scroll;
        margin: 3vh 0 3vh 0;
        border-radius: 3vh;
        background: #f6f6f6;
        &::-webkit-scrollbar {
  display: none;
}
        li{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 30vw;
          height: 6vh;
          padding: 0 35px;
          font-size: 18px;
          font-weight: 700;
          white-space: nowrap;
          border-radius: 3vh;
          cursor: pointer;
        }
      }
    }
    
    .description {
        display: flex;
        margin-top: 3vh;
        flex: 1;
        line-height: 5vh;
        vertical-align: middle;
        font-size: 4vw;
        font-weight: 500;
      }
      p {
        .highlighted {
          color: #1c7eff;
        }
      }
      .contentBody {
      //padding-top: 46px;
      .instructionBox {
        .instructionDetail {
          border: solid 1px #d9d9d9;
          border-radius: 2vw;
  
          &[open] {
            border-radius: 2vw;
            border: solid 2px #1c7eff;
            background-color: #fbfbfb;
            summary {
              .arwImg {
                transform: rotate(180deg);
              }
            }
          }
  
          .instructionSummary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            //height: 80px;
            padding: 3vw;
            .catAndTitle{
              .category{
              display: flex;
              justify-content: flex-start;
              //width: 131px;
              font-size: 3.5vw;
              font-weight: bold;
              color: #727272;
            }
  
            .textBox {
              display: flex;
              justify-content: flex-start;
              width: 100%;
              font-size: 3.5vw;
              font-weight: bold;
            }

            }
           
  
            .arwImg {
              justify-content: flex-end;
              width: 3.3vw;
            }
          }
  
          .content{
            display: flex;
            flex-direction: column;
            gap: 8px;
            //padding: 16px 20px;
            padding-left: 3vw;
            padding-bottom: 3vw;
            padding-right: 3vw;
            font-size: 3.5vw;
            font-weight: normal;
            //border-top: 1px solid #d9d9d9;
          }
        }
        .instructionDetail + .instructionDetail{
          margin-top: 10px;
        }
      }
    }
`;

const Pannouncements = styled.div`
  padding-top: 180px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  //align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  //background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    //margin-top: 120px;
    display: flex;
    flex-direction: column;
    width: 1024px;
    //min-height: 80vh;
    height: 1000px;
    //max-height: 1000px;
    padding: 60px 35px 64px 35px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      font-size: 22px;
      color: #000000;
      font-weight: bold;
    }
    .subtitle {
      font-size: 18px;
      color: #000000;
      margin-top: 10px;
      font-weight: 500;
    }
    .midHeader {
      display: flex;
      justify-content: flex-start;
      margin-top: 25px;
      height: 48px;
      vertical-align: middle;
      .description {
        display: flex;
        flex: 1;
        line-height: 48px;
        vertical-align: middle;
        font-size: 16px;
        font-weight: 500;
      }
      p {
        .highlighted {
          color: #1c7eff;
        }
      }
      .posBox {
        display: flex;
        //gap: 16px;
        flex: 0;
        justify-content: flex-end;

        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 146px;
          height: 48px;
          padding: 0 20px;
          font-size: 18px;
          font-weight: 500;
          border: solid 1px #d9d9d9;
          border-radius: 8px;

          img {
            width: 20px;
          }
        }
      }

      .searchBox {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        max-width: 283px;

        //border: solid 1px #d9d9d9;
        
        //overflow: auto;
        

        input {
          //overflow: auto;
          width: 273px;
          height: 50px;
          padding: 0 12px;
          font-size: 16px;
          //text-align: end;
          background: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
        }
      }
    }

    .categoryBox{
      ul{
        display: flex;
flex-wrap: wrap;
margin: 30px 0 0 0;
border-radius: 28px;
background: #f6f6f6;
        li{
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
        }
      }
    }
    .contentBody {
      padding-top: 46px;
      .instructionBox {
        .instructionDetail {
          border: solid 1px #d9d9d9;
          border-radius: 8px;
  
          &[open] {
            border-radius: 8px;
            border: solid 2px #1c7eff;
            background-color: #fbfbfb;
            summary {
              .arwImg {
                transform: rotate(180deg);
              }
            }
          }
  
          .instructionSummary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            padding: 0 20px;

            .category{
              display: flex;
              justify-content: flex-start;
              width: 131px;
              font-size: 18px;
              font-weight: bold;
              color: #727272;
            }
  
            .textBox {
              display: flex;
              justify-content: flex-start;
              width: 100%;
              font-size: 18px;
              font-weight: bold;
            }
  
            .arwImg {
              justify-content: flex-end;
              width: 24px;
            }
          }
  
          .content{
            display: flex;
            flex-direction: column;
            gap: 8px;
            //padding: 16px 20px;
            
            padding-bottom: 20px;
            padding-left: 131px;
            padding-right: 50px;
            font-size: 16px;
            font-weight: normal;
            //border-top: 1px solid #d9d9d9;
          }
        }
        .instructionDetail + .instructionDetail{
          margin-top: 10px;
        }
      }
    }
    .Pagination {
      text-align: center;
      margin-top: 55px;
      .on {
        color: #000;
      }
      li:hover {
        color: #2A2727;
      }
      li {
        cursor: pointer;
        line-height: 32px;
        vertical-align: middle;
        flex-direction: row;
        align-items: center;
        color: #cecdcd;
        display: inline;
        font-size: 16px;
        font-weight: normal;
        .flip{
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        }
        img{
          line-height: 32px;
        vertical-align: middle;
        }
      }
      li + li {
        margin-left: 22px;
      }
      .img + .img {
        margin-left: 8px;
      }

    }
  }
`;

