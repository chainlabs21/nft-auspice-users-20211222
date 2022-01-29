
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useEffect , useRef, useState } from "react"
import { API } from '../config/api'
import { applytoken } from '../util/rest'
import { LOGGER , onClickCopy , getmyaddress }  from '../util/common'
import SetErrorBar from '../util/SetErrorBar'
import { messages} from '../config/messages'
import { strDot } from '../util/Util'
import { useNavigate } from "react-router";
// import { getmyaddress } from '../util/common'
const Settingssidepanel=({store})=>{
	let myaddress = getmyaddress()
	let navigate = useNavigate()
// return (
	return (
		<>
		<div class="left_move wallet_left">
						<div class="mwallet">
							<a onClick={() => { navigate(-1)
							} } >Account settings</a>
						</div>
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
		</>
	)
}

function mapStateToProps(state) {
  return { store: state };
}
function mapDispatchToProps(dispatch) {
  return {
//    setConnect: () => dispatch(setConnect()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)( Settingssidepanel )
