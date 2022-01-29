import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { LOGGER } from "../util/common";
import moment from 'moment'

export default function ItemLikePopup({ off }) {
  const { itemId } = useParams();
  const limit = 10000;
  const [data, setData] = useState([]);

  const convertLongString = (startLength, endLength, str) => {
    if (!str) return;
    const head = str.substring(0, startLength);
    const spread = "......";
    const tail = str.substring(str.length - endLength, str.length);
    return head + spread + tail;
  };

  useEffect(() => {
    axios
      .get(`${API.API_GET_LIKE_LIST}/${itemId}/0/${limit}/id/DESC`)
			.then((res) => {         LOGGER( '' , res.data );
				let { status , list }=res.data
				if (status =='OK' ){
					setData( list)
				}        
      });
  }, []);

  return (
    <div class="popup info" id="info_popup" style={{ display: "block" }}>
      <div class="box_wrap wrap2">
        <a onClick={() => off()} class="close close2" id="info_close">
          <img src={require("../img/sub/icon_close.png").default} alt="close" />
        </a>
        <div class="poptitle">
          <h2>Liked by</h2>
        </div>
        <div class="list_bottom">
          <ul class="container popcon">
            {data.map((v, i) => (
              <li key={i}>
                <span class="pop_profile"></span>
                <h3>
                  {v.nickname}
                  <br />
                  <span>{convertLongString(8, 0, v.username)}</span>
									<span style={{textAlign:'right' , marginRight:'0px' }}>{ moment( v.createdat ).fromNow() } </span>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
