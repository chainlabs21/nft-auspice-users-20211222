import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icons/I_x.svg";
import { useState, useEffect, useLayoutEffect } from "react";
import I_Chk from "../../img/icons/I_noticeChk.png";
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
import Pagination from "../../components/support/Pagination";
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
const D_Category = ["제목", "본문"];
export default function PopupNotice({ off, content, index, id }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [totalNotice, setTotalNotice] = useState(
    '<figure class="image"><img src="http://itemverse1.net/resource/notice/1648205560-cMC3gm.png"></figure>'
  );

  useEffect(() => {
    axios.get(`${API.API_GET_ANNOUNCES}`).then((resp) => {});
  }, []);

  function closeForaDay() {
    let itemObj = {
      value: true,
      expire: Date.now() + 86400000,
    };
    const itemString = JSON.stringify(itemObj);

    localStorage.setItem(`disableNoticePopup${index}`, itemString);
    off(index);
  }

  if (isMobile)
    return (
      <>
        <Mannouncements>
        <div className="container">
            <div className="topBar">
              <div className="closeBtn" onClick={() => off(index)}>
                <img src={I_x} style={{ width: "14px" }} />
              </div>
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: totalNotice }}
            />
            <div className="footer">
              <p className="idontwantBtn" onClick={closeForaDay}>
                <img src={I_Chk} />
                24시간 동안 보지 않기
              </p>
            </div>
          </div>
        </Mannouncements>
      </>
    );
  else
    return (
      <>
        <Pannouncements>
          <div className="container">
            <div className="topBar">
              <div className="closeBtn" onClick={() => off(index)}>
                <img src={I_x} style={{ width: "14px" }} />
              </div>
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: totalNotice }}
            />
            <div className="footer">
              <p className="idontwantBtn" onClick={closeForaDay}>
                <img src={I_Chk} />
                24시간 동안 보지 않기
              </p>
            </div>
          </div>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div`
z-index: 10000;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  /* background-color: rgba(0, 0, 0, 0.8); */

  .container {
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;

    .topBar {
      justify-content: flex-end;
      display: flex;
      width: 100%;
      .closeBtn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-bottom: 10px;

        &:hover {
          background-color: #000;
          color: #fff;
          img {
            filter: invert(100%);
          }
        }
      }
    }
    .content {
      display: flex;
      overflow: hidden;
      height: 60vh;
      border-radius: 21px;
      .image {
        //max-height: 60vh;
        img {
          height: 60vh;
        }
      }
    }
    .footer {
      display: flex;
      p {
        cursor: pointer;
        margin-top: 10px;
        color: white;
        line-height: 24px;
        vertical-align: middle;
        align-items: center;
        font-weight: normal;
        img {
          vertical-align: middle;
          width: 24px;
          filter: invert(100%);
          margin-right: 8px;
        }
      }
    }
  }`;

const Pannouncements = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  /* background-color: rgba(0, 0, 0, 0.3); */

  .container {
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;

    .topBar {
      justify-content: flex-end;
      display: flex;
      width: 100%;
      .closeBtn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-bottom: 10px;

        &:hover {
          background-color: #000;
          color: #fff;
          img {
            filter: invert(100%);
          }
        }
      }
    }
    .content {
      display: flex;
      overflow: hidden;
      height: 60vh;
      border-radius: 21px;
      .image {
        //max-height: 60vh;
        img {
          height: 60vh;
        }
      }
    }
    .footer {
      display: flex;
      p {
        cursor: pointer;
        margin-top: 10px;
        color: white;
        line-height: 24px;
        vertical-align: middle;
        align-items: center;
        font-weight: normal;
        img {
          vertical-align: middle;
          width: 24px;
          filter: invert(100%);
          margin-right: 8px;
        }
      }
    }
  }
`;
