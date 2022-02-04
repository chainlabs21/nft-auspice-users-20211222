import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import Myprofcommonheader  from '../components/Myprofcommonheader'
import { useEffect, useState } from "react";
import { applytoken } from "../util/rest";
import { getmyaddress , LOGGER } from "../util/common"
import { API } from '../config/api'
import moment from 'moment'
import { PAYMEANS_DEF } from '../config/configs'
function Referals({ store, setConnect }) {
	const navigate = useNavigate()
	let [ myaddress , setmyaddress ] = useState( getmyaddress() )
	let [ list , setlist ]=useState( [] )
	let [ priceklay , setpriceklay] = useState()
/** 	useEffect(_=>{
		let {priceklay}=store
		if ( priceklay){}
		else {return }
		setpriceklay( priceklay )
	} , [ store.priceklay ])*/
	let axios=applytoken ()
	useEffect(_=>{
		axios.get(`${API.API_TICKERS}/USDT`).then(resp=>{LOGGER( '' , resp.data )
			let { status , list }=resp.data
			if ( status =='OK'){
				setpriceklay ( list[ PAYMEANS_DEF ] ) // 'KLAY'
			}
		})
	} , [] )
	useEffect(_=>{
		if (myaddress){}
		else {return }
		axios.get(API.API_LOGFEEPAYS + `/receiver/${myaddress}/0/10/id/DESC` , 
			{params : {itemdetail : 1
				, filterkey : 'receiverrolestr'
				, filterval : 'REFERER'
			}}).then(resp=>{ LOGGER('' , resp.data 	)
			let { status , list}=resp.data
			if ( status =='OK'){
				setlist ( list )
			}			
		})

	} , [ myaddress ] )
  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home deal_box">
          <div className="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

<Myprofcommonheader />
{/**             <div className="wrap">
              <div className="collection_detail">
                <div className="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div className="home_icons">
                    <a>
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a>
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 className="notop">Henry junior's Item</h2>
                <h3>0x97bc...8cad2</h3>
                <h4>
                  Henry is a mixed-media artist living in the Bay Area and uses
                  <br /> a stream of consciousness approach to his work.
                </h4>
              </div>
            </div>
*/}
            <div className="move off deal mdeal">
              <div className="right_move">
                <div className="real_sec">
                  <ul className="tab">
                    <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li onClick={() => navigate("/liked")}>Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li className="onn">Referals</li>
                  </ul>
                  <div className="referals">
                    <div className="re_text">
                      <span className="refe">Referals</span>
                      <h2>Itemverse Friend Recommendation</h2>
                      <h3>
                        Share your referral link! When a new user who accesses
                        this link purchases a product,
                        <br />
                        an additional 1% of the sales amount is paid. Referral
                        rewards are paid in lump sum every month.
                        <br />
                        However, due to gas cost, only referrals exceeding 0.005
                        KLAY will be processed.
                      </h3>
                    </div>
                    <div className="link">
                      <h4>My Link</h4>
                      <div className="copy">
                        <input type="text" readonly disabled />
                        <span>
                          https://KLAY.io/market/?ref=0x97b155a698d4bdec4c4bf3a92e9071190093cafb
                        </span>
                        <a className="copybtn">
                          <img
                            src={require("../img/sub/btn_copy.png").default}
                          />
                        </a>
                      </div>
                      <h4 className="mlink">Referral Sales History</h4>
                    </div>

                    <div className="ranktable_pc rp2">
                      <div className="scrollBox">
                        <table>
                          <colgroup>
                            <col style={{ width: "*" }} />
                            <col style={{ width: "16%" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Sellers</th>
                              <th>Time Sold</th>
                              <th>Payment Date</th>
                              <th>Payment</th>
                            </tr>
                          </thead>
                          <tbody>
{list.map ( (elem,idx)=>{
return (	<tr key={ idx }>
	<td>
		<div className="name">
			<img				src={ elem.item?.url ||					require("../img/sub/collect_circle.png")						.default				}				alt="" 
				style={{borderRadius:'50%', width:'70px'}}
			/>
			<p>{ elem.item?.titlename }</p>
		</div>
	</td>
	<td>
		<div className="name price">
			<img				src={					require("../img/sub/I_klaytn.svg").default				}				alt=""			/>
			<p>
				{elem.strikeprice } {'KLAY' }<span>(${+ elem.amount * + priceklay })</span>
			</p>
		</div>
	</td>
	<td>1</td>
	<td>
		<div className="name">
			<img				src={ elem.author_mongo?.profileimage || require("../img/sub/collect_circle.png")						.default				}				alt=""			
				style={{borderRadius : '50%' , width: '35px'}}			
			/>
			<p>{ elem.seller }</p>
		</div>
	</td>
	<td>{ moment( elem.createdat ).fromNow() }</td>
	<td>{ elem.createdat }</td>
	<td>{ elem.amount } { elem.amountunit }</td>
</tr>
)
})
}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  #sub {
    .deal_box {
      .move {
        .right_move {
          .real_sec {
            padding: 0;
          }
        }
      }
    }
  }

  .rp2 {
    overflow: hidden;

    .scrollBox {
      height: 100%;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #b7b7b7;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Referals);
