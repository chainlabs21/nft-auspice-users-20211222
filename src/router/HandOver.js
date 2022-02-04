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
import ho_img from "../img/sub/ho_img.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { get_last_part_of_path, LOGGER, ISFINITE } from '../util/common'
import { applytoken } from '../util/rest'
import { API } from '../config/api'
import { useEffect , useState } from "react";
import { useSearchParams } from "react-router-dom";
import {is_eth_address_valid} from '../util/eth'
import { getabistr_forfunction, requesttransaction } from "../util/contract-calls"
import { getmyaddress } from '../util/common'
import { messages } from '../config/messages'
import { ADDRESSES } from '../config/addresses'
import SetErrorBar from '../util/SetErrorBar'
import { query_with_arg } from '../util/contract-calls'
import moment from 'moment'
function HandOver({ store, setConnect }) {
	const navigate = useNavigate() //	let itemid =get_last_part_of_path ( window.location.href )  //	let itemid
	let axios=applytoken()
	let [ itemdata , setitemdata ] = useState()
	let [ searchParams, setSearchParams ] = useSearchParams()
	let [ itemid , setitemid ] = useState ( searchParams.get('itemid') )
	let [ address_rcv, setaddress_rcv]=useState('')
	let [ isaddressvalid , setisaddressvalid]=useState( true )

	let [ amounttosend , setamounttosend] = useState()
	let [ isamountvalid , setisamountvalid] = useState( true ) 
	let [ myaddress , setmyaddress] = useState ( getmyaddress() )
	let [ mybalance , setmybalance]=useState( )
	let [ ispageaccessvalid , setispageaccessvalid]=useState( true )
//	LOGGER( 'TnCW2Q2S8L' , itemid )
	useEffect(_=>{ //		let atkns= window.location.href.split(/=/) 	//	let itemid=atkns[atkns.length-1]
		LOGGER( 'TnCW2Q2S8L' , itemid ) //		setitemid( itemid )
		axios.get(`${API.API_GET_ITEM_DATA}/${itemid}`).then(resp=>{ LOGGER( 'oMzpzA49WV' , resp.data )
			let { status , respdata }=resp.data
			if ( status =='OK' ) {
				setitemdata( respdata )
				if ( respdata.item?.tokenid ){}
				else {SetErrorBar ( messages.MSG_PLEASE_TX_ONCHAIN );
					setispageaccessvalid ( false )
					return }
				query_with_arg ({ contractaddress : ADDRESSES.erc1155 
					, abikind : 'ERC1155' 
					, methodname : 'balanceOf' 
					, aargs : [ myaddress
						, respdata.item?.tokenid
				 	]				}).then(resp=>{
					LOGGER('' , resp )
					setmybalance ( resp )
				})
				}
			})
	} , [] )
  async function onClickSendBtn() {
		if ( myaddress){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ); return }
		let aargs = [ myaddress
			, address_rcv
			, itemdata?.item?.tokenid
			, amounttosend
			, '0x00'
		]
//		LOGGER('' , aargs)
	//	return 
		let abistr = getabistr_forfunction( {
			contractaddress : ADDRESSES.erc1155
			, abikind : 'ERC1155'
			, methodname : 'safeTransferFrom'
			, aargs
		} )
		LOGGER( '' , abistr )
		requesttransaction( { from : myaddress
			, to : ADDRESSES.erc1155
			, data : abistr
			, value : '0x00'
		}).then(resp=>{ LOGGER( '' , resp )
			let { transactionHash , status } = resp
			LOGGER( 'qrXkVAqkKu' , transactionHash , status )
			if ( status ){

			}
		}).catch(err =>{
			LOGGER( 'FdNPZN8Dxa' , err )
		})

		/** 		function safeTransferFrom (
			address from,
			address to,
			uint256 id,
			uint256 amount,
			bytes calldata data
		) external ;
	*/
	return 
		const { klaytn } = window;
    const transactionParameters = {
      from: klaytn.selectedAddress,
      to: "0x3e125F5D532D2C8CAbffE5cD2d7aBdAe2FEF0087",
      id: 1,
      amount: 1,
    }
    klaytn.sendAsync(
      {
        method: "klay_sendTransaction",
        params: [transactionParameters],
        from: klaytn.selectedAddress,
      },
      (res, err, a, b, c, d) => console.log(res, err, "a",a, "b",b,"c", c,"d", d)
    );
  }

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="ntfsell_box">
          <div className="sellbg">
            <div className="ntfsell_con">
              <div className="top1">
                <a onClick={() => navigate(-1)}>
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>Profile home</strong>
              </div>
              <div className="sell_wrap ho_wrap">
                <div className="create">
                  <h2>Hand Over</h2>
                  <form action="">
                    <div className="form">
                      <ul>
                        <li>
                          <div className="ho">
                            <ol>
                              <li>
                                <span
                                  className="hoimg"
                                  style={{
                                    backgroundImage: `url(${itemdata?.item?.url})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                ></span>
                                <div className="ho_info">
                                  <h3>{ ' '}</h3>{/** renoir collection */}
                                  <h4>{ itemdata?.item?.titlename }</h4>
																	<h5>{ itemdata?.item?.description } </h5>
																	<h5>{ moment( itemdata?.item?.createdat ).fromNow() }</h5>
																	<h5>&nbsp;</h5>
																	<h5> You have {mybalance} of token #{ itemdata?.item?.tokenid }</h5>
                                  
                                </div>
                              </li>

                            </ol>
                          </div>
                        </li>
                        <li className="padline">
                          <h3>
                            Enter your ERC20 wallet address or ENS name to send.
                          </h3>
                          <p className="sma">
                            Gas charges are incurred when transferring.
                          </p>
                          <div className="inputbox">
                            <input															disabled ={ispageaccessvalid ? false : true }
															value={address_rcv}
                              type="text"
															placeholder="Ex) 0x8df35...   or   wallet001.KLAY"
															onChange={evt=>{
																let {value} =evt.target
																setaddress_rcv ( value )
																if ( value && value.length ){
																	if (is_eth_address_valid ( value )){	setisaddressvalid(true ) }
																	else {	setisaddressvalid(false )}
																}
																else {setisaddressvalid( true )
																}																
															}}
                            />														
                          </div>
													<span style={{color:'red',fontSize:'12px'}}>{ isaddressvalid? '' : 'Invalid address'} </span>
                        </li>

                        <li className="padline">
                          <h3>
                            Amount
                          </h3>
                          <div className="inputbox">
														<input disabled ={ispageaccessvalid ? false : true }
															style={{textAlign:'right'}}
															value={ amounttosend }
                              type="text"
															placeholder={`max (${mybalance})` }
															onChange={evt=>{
																let {value} =evt.target
																if ( ISFINITE(+value)){}
																else {SetErrorBar(messages.MSG_INPUT_NUMBERS_ONLY); return }
																if ( mybalance && +value <= mybalance ){setisamountvalid (true)}
																else {setisamountvalid(false) ; return}
																setamounttosend( value )
															}}
                            />														
                          </div>
													<span style={{color:'red',fontSize:'12px'}}>{ isamountvalid ? '' : 'Amount exceeds balance'} </span>
                        </li>
												
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="create_btn send_btn">
                <a onClick={onClickSendBtn} className="send">
                  Send
                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandOver);
    // let { from, to, data, value } = jreqdata;
    // let { ethereum } = window;
    // const txparams = {
    //   to: to,
    //   from: from,
    //   value: value, // '0x00'
    //   data: data,
    // };
    // let resp;
    // try {
    //   resp = await ethereum.request({
    //     method: "eth_sendTransaction",
    //     params: [txparams],
    //   });
    //   DebugMode && LOGGER("1F9jVI8LrL", resp);
    //   return resp;
    // } catch (err) {
    //   DebugMode && LOGGER("kkm1TWXecH", err);
    //   return null;
    // }
