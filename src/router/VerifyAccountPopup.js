import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import s1 from "../img/sub/s2.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";



 // import "./css/style01.css"; // import "./css/style02.css";



import { LOGGER
	, getmyaddress
} from '../util/common'
import { requesttransaction, getabistr_forfunction } from "../util/contract-calls";
import { ADDRESSES } from '../config/addresses'
import { useState } from 'react'
import SetErrorBar from '../util/SetErrorBar'
import { messages } from '../config/messages'
import { TIME_PAGE_TRANSITION_DEF , NETTYPE, PAYMEANS_DEF } from "../config/configs";
import { applytoken } from "../util/rest";
import { API } from "../config/api";

function VerifyAccountPopup({ store, off , mindeposit }) {
	const navigate = useNavigate();
	let [myaddress, setmyaddress] = useState( getmyaddress());
	let axios=applytoken()
	const onclick_register_proxy=_=>{		LOGGER('abc')
		let abistr = getabistr_forfunction ({
			contractaddress : ADDRESSES.registerproxy
			, abikind : 'REGISTER_PROXY'
			, methodname : 'register'
			, aargs : [ myaddress	, mindeposit ]
		}) ; LOGGER ( '' , abistr )
		requesttransaction( {
			from: myaddress ,
      to: ADDRESSES.registerproxy , // erc1155
      data: abistr,
      value: mindeposit ,
		}).then(resp=>{
			LOGGER( "", resp);
      let { transactionHash: txhash, status } = resp
      if (status) {
				let reqbody={
					username : myaddress
					 , address : myaddress
					 , feeamount : mindeposit
					 , priceunit : PAYMEANS_DEF
					 , nettype : NETTYPE 
				}
				axios.post ( API.API_REPORT_TX_REGISTER_PROXY + `/${txhash}`, reqbody ).then(resp=>{ LOGGER('' , resp.data )
					let { status , }=resp.data
					if ( status =='OK'){
						SetErrorBar( messages.MSG_DONE_REGISTERING )						
					}
				})
      } else {
				SetErrorBar(messages.MSG_USER_DENIED_TX);
				setTimeout(_=>{
					navigate ( -1 )
				}, TIME_PAGE_TRANSITION_DEF ) 
        return;
      }
      SetErrorBar(messages.MSG_TX_REQUEST_SENT);
			off()
		}).catch(err=>{
			LOGGER( err )
			SetErrorBar ( messages.MSG_USER_DENIED_TX )
			navigate ( -1 )
		})
	}
  return (
    <SignPopupBox>
      <div className="popup info" id="info_popup">
        <div className="box_wrap guidance">
          <div className="top4">
            <strong>Guidance on how to verify your account</strong>
            <a onClick={() => off()} className="close" id="info_close">
              <img src={require("../img/sub/icon_close.png").default} alt="" />
            </a>
          </div>
          <div className="howto">
            <p>
              Please check the connected external wallet and complete the
              transaction.
              <br />
              The contract approval process is performed only once per account
              <br />
              for the first time.
            </p>
            <div className="img_m">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <div className="inst_con">
              <div className="instrucion line1">
                <div className="dropdown on">
                  <a>
                    <span></span>
                  </a>
                  <div className="bot_title">
                    <strong>Instruction</strong>
                    <p>
                      When you sell items for the first time in your account,
                      you need to go
                      <br />
                      through the contract approval process.
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      - If you are trading for the first time, you will need to
                      reset your account. The process
                      <br /> &nbsp;&nbsp;of sending 0 Klaytn to verify that the
                      account is a valid account proceeds.
                      <br />
                    </p>
                    <p>
                      - Please complete the signature to create a sales list.
                      <br />
                    </p>
                    <p>
                      - Gas fee is paid only for the first time, and subsequent
                      listings are supported
                      <br />
                      &nbsp; free of charge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
<div>
	<button style={{border:'2px'}} onClick={_=>{
		onclick_register_proxy ()
	}	}>Set up your proxy

	</button>
</div>
            <div className="img_pc">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <p>
              Please wait until this process is complete. Depending on the
              Klaytn
              <br />
              mainnet and gas
              <br /> price quotes, it can take from a few minutes to
              <br /> several hours.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccountPopup);
