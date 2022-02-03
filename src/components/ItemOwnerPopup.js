import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";

export default function ItemOwnerPopup({ off }) {
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
      .get(`${API.API_GET_OWNER_LIST}/${itemId}/0/${limit}/id/DESC`)
      .then((res) => {
        console.log(res.data.list);
        setData(res.data.list);
      });
  }, []);

  return (
    <div class="popup info" id="info_popup" style={{ display: "block" }}>
      <div class="box_wrap wrap2">
        <a onClick={() => off()} class="close close2" id="info_close">
          <img src={require("../img/sub/icon_close.png").default} alt="close" />
        </a>
        <div class="poptitle">
          <h2>Owner List</h2>
        </div>
        <div class="list_bottom">
          <ul class="container popcon">
            {data.map((v, i) => (
              <li key={i}>
                <span class="pop_profile"></span>
                <h3>
                  {v.nickname}
                  <br />
                  <span>{convertLongString(8, 8, v.username)}</span>
                </h3>
                <p>
                  <a>{v.amount} Items</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
