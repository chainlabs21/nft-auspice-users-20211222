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

const Myprofcommonheader=({store})=>{
	let axios= applytoken()
	let [ myinfo_maria , setmyinfo_maria ] =useState()
	let [ myinfo_mongo , setmyinfo_mongo ] = useState()
	let myaddress = getmyaddress ()
	let navigate = useNavigate();

	useEffect( _=>{
		axios.get( `${API.API_GET_MY_INFO}` ).then(resp=>{ LOGGER( 'up9xNJ6kwp' , resp.data )
			let { status , payload }=resp.data
			if ( status=='OK' ){
				setmyinfo_maria ( payload.maria )
				setmyinfo_mongo ( payload.mongo )
			} else {}
		})
/** 		axios.get( `${API.API_MYITEMS}/${myaddress}/0/10/id/DESC`).then(resp=>{ LOGGER( 'wyBPdUnid7' , resp.data )
			let { status , list }=resp.data 
			if ( status =='OK' ){
				setlistitems( list )
			}
		})*/
	} , [] )

	return (
							<div className="wrap">
							<div className="collection_detail">
								<div className="pro_img">
									<img src={ myinfo_mongo?.profileimage || require("../img/sub/home_profile.png").default} />
									<div className="home_icons">
										<a onClick={_=>{ 										navigate('/generalsettings') 									}}>
											<img src={require("../img/sub/re.png").default} />
										</a>
										<a onClick={_=>{
	onClickCopy( window.location.href )
	SetErrorBar( messages.MSG_COPIED)
										}}>
											<img src={require("../img/sub/share.png").default} />
										</a>
									</div>
								</div>
								<h2 className="notop">{myinfo_maria?.nickname }'s Collection</h2>
								<h3>{strDot( myaddress , 4 , 4 )}</h3>
								<h4> { myinfo_mongo?.description }
	{/**                   Henry is a mixed-media artist living in the
									<br className="mo" /> Bay Area and uses
									<br className="pc" />a stream of consciousness
									<br className="mo" /> approach to his work.
	*/}
								</h4>
							</div>
						</div>
	)
}
function mapStateToProps(state) {
  return { store: state };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)( Myprofcommonheader )
