import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";

export default function ItemOwnerPopup({ off , itemid }) {
//  const { itemId } = useParams();
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
		if (itemid ){}
		else {return }
    axios
      .get(`${API.API_GET_OWNER_LIST}/${itemid}/0/${limit}/id/DESC` , { params : { userdetail : 1 }})
			.then((res) => {         console.log('uZbHfdImsi' , res.data )
				let { status , list }=res.data 
				if ( status =='OK'){
					setData( list);
				}        
      });
  }, [ itemid ]);

  return (
    <div className="popup info" id="info_popup" style={{ display: "block" }}>
      <div className="box_wrap wrap2">
        <a onClick={() => off()} className="close close2" id="info_close">
          <img src={require("../img/sub/icon_close.png").default} alt="close" />
        </a>
        <div className="poptitle">
          <h2>Owner List</h2>
        </div>
        <div className="list_bottom">
          <ul className="container popcon">
            {data.map((v, i) => (
              <li key={i}>
                <span className="pop_profile" style={{backgroundImage: ``}}></span>
                <h3>
                  {v.nickname}
                  <br />
                  <span>{convertLongString(8, 8, v.username)}</span>
                </h3>
                <p>
                  <a>{v.amount} {+v.amount>1? 'Items':'Item'}</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
