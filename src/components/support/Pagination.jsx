import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useState, useEffect, useLayoutEffect } from "react";
import I_lArrow from "../../img/icons/I_lArrow.svg";
import I_leArrow from "../../img/icons/I_leArrow.svg";
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

import axios from "axios";
export default function Pagination({ totalPage, currentPage }) {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [totalNotice, setTotalNotice] = useState(100);
  //const [totalPage, setTotalPage] = useState(10);
  //const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [paginationpaging, setPaginationpaging] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [announces, setAnnounces] = useState([]);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    currentPage(page);
    if (page > totalPage) {
      setPage(totalPage);
    }
    if (page < 1) {
      setPage(1);
    }
    if (page + 2 < totalPage && page > 2) {
      setPaginationpaging(paginationpaging + 1);
    }
    //if (page-2<totalPage && page>2){setPaginationpaging(paginationpaging-1)}
  }, [page, paginationpaging]);

  useEffect(() => {
    axios.get(`${API.API_GET_ANNOUNCES}`).then((resp) => {
      console.log(resp);
      let { list } = resp.data;
      if (list) {
        setAnnounces(list);
      }
    });
  }, []);

  if (isMobile)
    return (
      <>
      <Pannouncements>
        <ul className="Pagination">
          <li
            className="img leArrw"
            onClick={() => {
              setPage(1);
            }}
          >
            <img src={I_leArrow} />
          </li>
          <li
            className="img lArrw"
            onClick={() => {
              page > 1 && setPage(page - 1);
            }}
          >
            <img src={I_lArrow} />
          </li>
          {[...Array(totalPage)].map((v, i) => {
            //if(i<paginationpaging || i>paginationpaging+4){return;}

            if(page<3){
                if(i<5)
              return (
                  <li
                    className={page == i + 1 ? "on" : ""}
                    onClick={() => {
                      setPage(i + 1);
                      setPaginationpaging(0);
                    }}
                  >
                    {i + 1}
                  </li>
                );
            }else if(page<totalPage-2){
            
              if (i > page - 4 && page + 2 > i) {
                return (
                  <li
                    className={page == i + 1 ? "on" : ""}
                    onClick={() => {
                      setPage(i + 1);
                      setPaginationpaging(0);
                    }}
                  >
                    {i + 1}
                  </li>
                );
              }
          }else{
              if(i>totalPage-6)
              return (
                  <li
                    className={page == i + 1 ? "on" : ""}
                    onClick={() => {
                      setPage(i + 1);
                      setPaginationpaging(0);
                    }}
                  >
                    {i + 1}
                  </li>
                );
          }
            
          })}
          <li
            className="img rArrw"
            onClick={() => {
              page < totalPage && setPage(page + 1);
            }}
          >
            <img className="flip" src={I_lArrow} />
          </li>
          <li
            className="img reArrw"
            onClick={() => {
              setPage(totalPage);
            }}
          >
            <img className="flip" src={I_leArrow} />
          </li>
        </ul>
      </Pannouncements>
    </>
    );
  else
    return (
      <>
        <Pannouncements>
          <ul className="Pagination">
            <li
              className="img leArrw"
              onClick={() => {
                setPage(1);
              }}
            >
              <img src={I_leArrow} />
            </li>
            <li
              className="img lArrw"
              onClick={() => {
                page > 1 && setPage(page - 1);
              }}
            >
              <img src={I_lArrow} />
            </li>
            {[...Array(totalPage)].map((v, i) => {
              //if(i<paginationpaging || i>paginationpaging+4){return;}

              if(page<3){
                  if(i<5)
                return (
                    <li
                      className={page == i + 1 ? "on" : ""}
                      onClick={() => {
                        setPage(i + 1);
                        setPaginationpaging(0);
                      }}
                    >
                      {i + 1}
                    </li>
                  );
              }else if(page<totalPage-2){
              
                if (i > page - 4 && page + 2 > i) {
                  return (
                    <li
                      className={page == i + 1 ? "on" : ""}
                      onClick={() => {
                        setPage(i + 1);
                        setPaginationpaging(0);
                      }}
                    >
                      {i + 1}
                    </li>
                  );
                }
            }else{
                if(i>totalPage-6)
                return (
                    <li
                      className={page == i + 1 ? "on" : ""}
                      onClick={() => {
                        setPage(i + 1);
                        setPaginationpaging(0);
                      }}
                    >
                      {i + 1}
                    </li>
                  );
            }
              
            })}
            <li
              className="img rArrw"
              onClick={() => {
                page < totalPage && setPage(page + 1);
              }}
            >
              <img className="flip" src={I_lArrow} />
            </li>
            <li
              className="img reArrw"
              onClick={() => {
                setPage(totalPage);
              }}
            >
              <img className="flip" src={I_leArrow} />
            </li>
          </ul>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div``;

const Pannouncements = styled.div`
  .Pagination {
    text-align: center;
    margin-top: 55px;
    .on {
      color: #000;
    }
    li:hover {
      color: #2a2727;
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
      .flip {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
    }
    li + li {
      margin-left: 22px;
    }
    .img + .img {
      margin-left: 8px;
    }
  }
`;
