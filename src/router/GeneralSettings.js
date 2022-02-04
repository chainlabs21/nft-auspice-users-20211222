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
import { API } from  '../config/api'
import { useState, useEffect } from 'react'
import { LOGGER, STRINGER } from "../util/common";
import { applytoken } from "../util/rest"
import { getmyaddress , getrandomwords } from '../util/common'
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../config/messages";
import { generateSlug } from  'random-word-slugs'
import { strDot } from "../util/Util";
import Settingssidepanel from '../components/Settingssidepanel'

function GeneralSettings({ store, setConnect }) {
	const navigate = useNavigate();	
	let [ description , setdescription ]= useState( '' )
	let [ nickname , setnickname ] = useState( '' )
	let [ email , setemail ] = useState( '' )
	let axios=applytoken()
	let [ myaddress , setmyaddress ] = useState( getmyaddress())
	const onclicksave = _=>{
		LOGGER( '' , nickname , description )
		let reqbody={
			description
			, nickname
		}
		axios.put(`${API.API_MYINFO}` , reqbody ).then(resp=>{ LOGGER( '' , resp.data ) // }/users/user/myinfo`
			let { status}=resp.data
			if ( status == 'OK'){
				SetErrorBar (messages.MSG_DONE_REGISTERING )
				return
			}
		})
	}
	useEffect( _=>{
		LOGGER( '' , myaddress )
		axios.get( `${API.API_USER_INFO}/${myaddress}` ).then(resp=>{			LOGGER ( '' , resp.data )
			let { status , payload }=resp.data
			if ( status =='OK'){
				let { maria : myinfo_maria , mongo : myinfo_mongo }=payload
				setemail ( myinfo_maria?.email )
			}
		})
		setnickname ( generateSlug(3, {format:'camel'}) )
		setdescription ( 			STRINGER( getrandomwords (12)			 ))
	} , [] )
  return (
    <GeneralSettingsBox>
      <section id="sub">
        <article class="wallet_wrap">
          <div class="move on">

              <div class="left_move wallet_left">
              <div class="mwallet">
								<a onClick={() => { navigate(-1)
								} } >Account settings</a>
              </div>
              <form>
                <div class="w1" onClick={() => navigate("/mywallet")}>
                  <h3>
                    My wallet<span>{ strDot( myaddress , 6, 2 )}</span>
                  </h3>
                </div>
                <div class="w2 on">
                  <h3>General settings</h3>
                </div>
                <div
                  class="w3"
                  onClick={() => navigate("/notificationsettings")}
                >
                  <h3>Notification settings</h3>
                </div>
              </form>
						</div>
{/**  <Settingssidepanel />*/}

            <div class="right_move wallet_right">
              <h2>General settings</h2>
              <div class="mwr">
                <div class="wr togpad">
                  <ul>
                    <li>
                      <h4>Nickname</h4>
                      <input
                        type="text"
												placeholder="Please enter your nickname"
												value={ nickname }
                      />
                    </li>
                    <li>
                      <h4>About me</h4>
                      <textarea
                        type="text"
												placeholder="write my introduction"
												value={ description }
                      ></textarea>
                    </li>
                    <li>
                      <h4>Email Address</h4>
                      <input type="text" placeholder="Input email address" 
												value={email}
											/>
                    </li>
                  </ul>
                  <a onClick={() => {
										onclicksave()
										// navigate(-1)
									} }									class="wbtn">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </GeneralSettingsBox>
  );
}

const GeneralSettingsBox = styled.div`
  .wr {
    padding: 52px 0 0 0;
  }

  .w1,.w2,.w3{
    cursor: pointer;
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
export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);

// http://itemverse1.net:36119/users/user/myinfo
// {"description":"abcde","nickname":"fghij"}
