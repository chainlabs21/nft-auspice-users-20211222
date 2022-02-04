import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import { useState , useEffect } from 'react'
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
import ho_img from "../img/sub/ho_img.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";
// import "./css/style01.css";// import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import Myprofcommonheader  from '../components/Myprofcommonheader'
import { applytoken } from "../util/rest"
import { API } from "../config/api";
import { LOGGER , getmyaddress } from "../util/common";

function Liked({ store, setConnect }) {
  const navigate = useNavigate();
	let axios=applytoken ()
	let myaddress = getmyaddress () 
	let [ list , setlist ] = useState( [] )
	useEffect( _=>{
		axios.get( API.API_USER_FAVORITES +`/username/${myaddress}/0/100/id/DESC`).then(resp=>{ LOGGER('' , resp.data )
			let { status , } = resp.data
			if ( status =='OK' ){
				setlist ( list )
			}
		})
	} , [] )
  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home">
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
                  Henry is a mixed-media artist living in the
                  <br className="mo" /> Bay Area and uses
                  <br className="pc" />a stream of consciousness
                  <br className="mo" /> approach to his work.
                </h4>
              </div>
            </div>
*/}
            <div className="move off">
              <div className="left_move">
                <form>
                  <div className="filter">
                    <h3 className="filt">
                      <img
                        src={require("../img/sub/filter_icon.png").default}
                      />
                      Filter
                    </h3>
                    <img
                      src={require("../img/sub/filter_close.png").default}
                      className="fc"
                    />
                  </div>
                  <div className="fold status">
                    <h3 className="slide_tt">
                      Status
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        className="slide_up"
                      />
                    </h3>
                    <div className="open status">
                      <ul>
                        <li className="on">Buy Now</li>
                        <li>On Auction</li>
                        <li>New</li>
                        <li>Has Offers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="fold">
                    <h3 className="slide_tt">
                      Price
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        className="slide_up"
                      />
                    </h3>
                    <div className="open">
                      <select>
                        <option disabled selected hidden>
                          United States Dollars (USD)
                        </option>
                        <option>100</option>
                      </select>
                      <div className="price_area">
                        <input type="text" />
                        <input type="text" />
                      </div>
                      <a className="slide_btn">Apply</a>
                    </div>
                  </div>

                  <div className="fold">
                    <h3 className="slide_tt">
                      Items
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        className="slide_up"
                      />
                    </h3>
                    <div className="open collection">
                      <input
                        type="text"
                        placeholder="Filter"
                        className="s_search"
                      />
                      <ul>
                        <li
                          className="collec_img"
                          style={{ backgroundImage: `url(${collect_img})` }}
                        >
                          <span>Item 01</span>
                        </li>
                        <li
                          className="collec_img"
                          style={{ backgroundImage: `url(${collect_img2})` }}
                        >
                          <span>Item 02</span>
                        </li>
                        <li
                          className="collec_img"
                          style={{ backgroundImage: `url(${collect_img3})` }}
                        >
                          <span>Item 03</span>
                        </li>
                        <li
                          className="collec_img"
                          style={{ backgroundImage: `url(${collect_img4})` }}
                        >
                          <span>Item 04</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="fold">
                    <h3 className="slide_tt">
                      Chains
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        className="slide_up"
                      />
                    </h3>

                    <div className="open">
                      <ul>
                        <li className="ra">
                          <input type="radio" id="rad2" name="rad" />
                          <label for="rad2">
                            <img src={require("../img/sub/rock.png").default} />
                            Klaytn
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="fold">
                    <h3 className="slide_tt">
                      Sales Coin
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        className="slide_up"
                      />
                    </h3>
                    <div className="open">
                      <input
                        type="text"
                        placeholder="Filter"
                        className="s_search"
                      />
                      <ul>
                        <li className="ra">
                          <input type="radio" id="rad3" name="rad2" />
                          <label for="rad3">KLAY</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
              <div className="right_move">
                <div className="real_sec">
                  <ul className="tab">
                    <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li className="onn">Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li onClick={() => navigate("/referals")}>Referals</li>
                  </ul>

                  <div className="move_item" style={{ marginBottom: "100px" }}>
                    <ol className="item move_li">
                      <div>
												<span>
											<li >
		<a
			onClick={() => navigate(`/singleitem/${''}`)}
			style={{ backgroundImage: `url(${sample})` }}
		>
			<div className="on">
				<ul>
					<li className="heart off">1,389</li>
				</ul>
				<span>{ ''} </span>
				<div>Place Saint-Marc</div>
			</div>
		</a>
	</li>
{list.map ( (elem, idx) =>(

	<li key={idx}>
		<a
			onClick={() => navigate(`/singleitem?itemid=${elem.itemid}`)}
			style={{ backgroundImage: `url(${sample})` }}
		>
			<div className="on">
				<ul>
					<li className="heart off">1,389</li>
				</ul>
				<span>{ elem.itemid } </span>
				<div>Place Saint-Marc</div>
			</div>
		</a>
	</li>
	))}

	</span>
                      </div>
                    </ol>
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
  .item {
    div {
      span {
        li {
          a {
            & > .on {
              height: 138px;
              padding-bottom: 25px;

              ul {
                font-size: 14px;
              }

              span {
                margin: 11px 0 0 0;
                font-size: 18px;
                line-height: 24px;
              }

              div {
                margin: 4px 0 0 0;
                font-size: 22px;
                line-height: 30px;
              }
            }
          }
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Liked);
