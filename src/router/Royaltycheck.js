import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import s2 from "../img/sub/s2.png";
import s6 from "../img/sub/s6.png";
import s7 from "../img/sub/s7.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";
// import "./css/style01.css";
// import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { getmyaddress , LOGGER } from '../util/common'
import { API } from "../config/api";
import { useEffect, useState } from "react";
import { applytoken } from "../util/rest";
import moment from 'moment'
import SetErrorBar from '../util/SetErrorBar'
import { messages} from '../config/messages'

function Royaltycheck({ store, setConnect }) {
  const navigate = useNavigate ()
	let [ myaddress , setmyaddress ]=useState( getmyaddress() )
	let [ list , setlist]= useState( [] )
	let axios=applytoken()
	const fetchitems=_=>{
		if ( myaddress){}
		else {return }
		axios.get(API.API_LOGFEEPAYS + `/receiver/${myaddress}/0/10/id/DESC` , 
			{ params : {itemdetail : 1
				, filterkey : 'receiverrolestr'
				, filterval : 'AUTHOR'
			}}).then(resp=>{ LOGGER('' , resp.data 	)
			let { status , list }=resp.data
			if ( status =='OK'){
				if (list && list.length){}
				else {SetErrorBar( messages.MSG_NO_TX_FOUND ); return }
				setlist ( list )
			}
		})
	}
	useEffect(_=>{
		fetchitems()
	} , [myaddress ] )
  return (
    <SignPopupBox>
      <section id="sub">
        <article class="ntfsell_box">
          <div class="sellbg">
            <div class="ntfsell_con">
              <div class="top1">
                <a onClick={() => navigate(-1)}>
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>{ myaddress}</strong>
              </div>
              <div class="sell_wrap sell_wrap2">
                <div class="create">
                  <p class="loyal">Royalty check</p>
                  <h2 class="notop">{ }</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <p>
                            The payment is only paid when more than 0.1 KLAY has
                            been accumulated, and deposits are made in batches
                            every month. Deposit date and time are subject to
                            change.
                          </p>
                          <div class="exc">
                            <a class="cso">Change sort order</a>
                          </div>
                          <div class="loytable con3">
                            <table>
                              <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th>Sale Price</th>
                                  <th>Quantity</th>
                                  <th>Pay royalties</th>
                                  <th>Payment date</th>
                                </tr>
                              </thead>
                              <tbody>

{list.map((elem,idx)=>{return(
	<tr key={ idx }>
	<td class="ig"
		style={{backgroundImage : `url(${elem.item?.url})`  ,borderRadius:'50%' , width:'40px'  }}
	>{ elem.item?.titlename }</td>
	<td>
		<img
			src={ 				require("../img/sub/rstone.png").default			}
			alt="stone"
		/>
		{ elem?.strikeprice? (+elem?.strikeprice).toFixed(4) : '' }
	</td>
	<td>2</td>
	<td>
		<img
			src={				require("../img/sub/rstone.png").default			}			alt="stone"
		/>
		{  elem.amount }
	</td>
	<td>{ moment(elem.createdat).fromNow()  }</td>
</tr>
)
})}																

                              </tbody>
                            </table>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Royaltycheck);
