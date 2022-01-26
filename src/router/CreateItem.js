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
import { generateSlug } from  'random-word-slugs'
import { query_noarg , getabistr_forfunction, requesttransaction, query_with_arg } from '../util/contract-calls'
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useEffect, useState } from "react";
import { encodeBase64File, LOGGER , getrandomint , ISFINITE, getmyaddress } from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { ERR_MSG, messages } from "../config/messages";
// import axios from "axios";
import { API } from "../config/api";
import { useSelector } from "react-redux";
import moment from "moment";
import { signOrderData } from "../util/verifySig";
import { generateRandomString } from "../util/Util";
import { ADDRESSES } from '../config/addresses'
import { applytoken } from '../util/rest'
import { get_random_ipfs } from '../util/ipfscid'
import awaitTransactionMined from "await-transaction-mined";
import { web3 } from '../config/configweb3'
import { TX_POLL_OPTIONS } from '../config/configs'
const kiloBytes = 1024;
const megaBytes = 1024 * kiloBytes;
const fileTypeList = [  "jpg",  "png",  "gif",  "svg",  "mp4",  "webm",  "mp3",  "wav",  "ogg" ];
const MAP_fileextension_contentype ={	jpg : 'image', png : 'image', gif : 'image', svg : 'image', mp4 : 'video'
	, webm : 'video', mp3 : 'audio', wav : 'audio', ogg : 'audio'
}
function CreateItem({ store, setConnect }) {
  const navigate = useNavigate();
  const userAddress = useSelector((state) => state.wallet.address);
  const [item, setItem] = useState("");
  const [nameChk, setNameChk] = useState(false);
  const [fileChk, setFileChk] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [ unlockedContent, setUnlockedContent] = useState("");
  const [ countcopies, setcountcopies] = useState(1);
  const [freezing, setFreezing] = useState(false);
  const [ activePubl , setActivePubl] = useState(false);
  const [ name, setName] = useState("");
  const [ desc, setDesc] = useState("");
  const [ royal, setRoyal] = useState(0);
  const [ curCategory, setCurCategory ] = useState("");
  const [ fileResp, setFileResp] = useState({});
  const [ categories, setCategories] = useState([]);
  const [ isUpload, setIsUpload] = useState(false);
	const [ fileViewType, setFileViewType] = useState("image")
	let [ royaltymax , setroyaltymax ] = useState( 0 )
	let [ urlmetadata , seturlmetadata ] = useState ()
	let [ urlfile , seturlfile ] = useState()
	let [ itemid , setitemid ]=useState()
	let [ daystoclose , setdaystoclose]=useState( )
	let axios = applytoken() 
	let myaddress = getmyaddress ()
//	axios=applyt oken(axios)
  function onChangeItem(file) {    /*    let reader = new FileReader();    reader.readAsDataURL(file);    reader.onload = function () {      setItem(reader.result);    };	*/
	}
	const on_request_tx_mint=async _=>{	 //let my address = getm yaddress()
		if (myaddress){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET); return}
		let random_ipfscid ='__'+ get_random_ipfs ()
		let abistr = getabistr_forfunction ({ 
			contractaddress : ADDRESSES.erc1155
			, abikind : 'ERC1155'
			, methodname : 'mint'
			, aargs : [ myaddress 
				, random_ipfscid
				, countcopies
				, royal
				, 0
				, '0x00'
			]
		}) ; LOGGER ( 'JwE5ZF6jav' , abistr, random_ipfscid )		
		if ( myaddress ){}
		else {SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET ) ; return }
		requesttransaction({ 
				from : myaddress
			, to : ADDRESSES.erc1155
			, data : abistr
			, value : '0x00'
		}).then(resp=>{
			LOGGER( '' , resp )
			if (resp) {}
			else {SetErrorBar (messages.MSG_USER_DENIED_TX ); return }
			SetErrorBar ( messages.MSG_TX_REQUEST_SENT )
			query_with_arg ({contractaddress : ADDRESSES.erc1155 
				, abikind : 'ERC1155' 
				, methodname : '_itemhash_tokenid' 
				, aargs : [ random_ipfscid ]
			}).then(resp=>{
				LOGGER( 'UaSEEYwCnu' , resp )
			})
//			return
			let txhash = resp.transactionHash
			awaitTransactionMined
			.awaitTx( web3, txhash, TX_POLL_OPTIONS )
			.then((minedtxreceipt) => {
				LOGGER( "f9slc6vfyh" , minedtxreceipt)			//				Setisloader(false);
			})
		})
// tx ok : https://baobab.scope.klaytn.com/tx/0x1c69e43e3dd606415bab7aa6420b2632cee1d47d74dcb353ee6dd3e014bad2fa :gas used-208,171
	}
	const on_post_metadata=async _=>{
		try {
			const metaData = {
				title: name,
				description: desc,
				address: userAddress,
				originator: userAddress,
				category: curCategory,
				authorroyalty: parseInt((royal * 100).toFixed(0)),
				url: fileResp.payload.url,
				datahash: itemid , // fil eResp.res pdata,
				timestamp: moment().format(),
				unixtime: moment().unix(),
				unlockcontent: unlocked === true ? 1 : 0,
				unlockedcontent: unlockedContent,
				countcopies: countcopies,
				freezemetadata: freezing === true ? 1 : 0,
				originator : myaddress
				, author : myaddress
			};
			const metaResp = await axios.post (
				API.API_ITEM_SAVE_META + `/${itemid}`, // fileR esp.resp data
				metaData
			) ; LOGGER( 'rbPatKJrSt' , metaResp.data )
			let { status , }= metaResp.data
			if ( status == 'OK'){
				const metaResult = metaResp.data
				seturlmetadata ( metaResult.payload.url )
				SetErrorBar( messages.MSG_DONE_REGISTERING )				
			}
			else {SetErrorBar (messages.MSG_REGISTER_FAILED )}
		} catch(err){			LOGGER(err)
		}
	}
	const on_request_lazy_mint = async _ =>{
		const body = {
			itemid: itemid , // fileR esp.respd ata
			countcopies: countcopies,
			amount: 1,
			decimals: 18,
			expiry: 0,
			categorystr: curCategory ,
			author: myaddress , // userAddress ,
			authorfee: parseInt( ( royal * 100 ).toFixed(0) ) ,
			metadataurl : urlmetadata
			, url : urlfile
			, titlename : name
			, description : desc
		}
		const resp = await axios.post( API.API_LAZY_MINT, body )
		if (resp.data.status === "OK") {
			navigate(`/salefixed?itemid=${itemid}`); // fileRes p.resp data
		}
	}
  const fileUpload = async (file) => {
    if (!file) {
      return;
    }
    const fileLength = file.name.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();
    let typeToggle = false;
    fileTypeList.forEach((v) => {
      if (fileType === v) {
        typeToggle = true;
      }
    });
    if (!typeToggle) {
      SetErrorBar(ERR_MSG.ERR_NO_SUPPORT_FILE_TYPE);
      return;
		}
		let contenttype
		if ( contenttype = MAP_fileextension_contentype[ fileType] ){ setFileViewType( contenttype ) }
		else { setFileViewType( 'image' ) }
/**     switch (fileType) {
      case "jpg":
      case "png":
      case "gif":
      case "svg":
        setFileViewType("image");
        break;
      case "mp4":
      case "webm":
        setFileViewType("video");
        break;
      case "mp3":
      case "wav":
      case "ogg":
        setFileViewType("audio");
        break;
      default:
        setFileViewType("image");
    } */
		let filesize = file.size
    if (file && filesize > 0) {
      setFileChk(true);
      try {        
        if (file.size <= 4 * megaBytes) {	// file size < 4mb
          const base64 = await encodeBase64File(file);
          const base64Data = {
            datainbase64: base64,
            filename: file.name,
					}
					LOGGER ( 'ojuEGTDeEU' , base64Data , ) 
//					return 
					const resp = await axios.post(API.API_ITEM_UPLOAD_BASE64, base64Data); LOGGER ( 'xG6MsNdQhX' , resp.data )
					let { status , payload , respdata } = resp.data
					if ( status =='OK' ) {
						setitemid ( respdata ) 
						setFileResp( resp.data )
						setItem ( payload.url )	
						seturlfile ( payload.url )
					}
					return
        } else if (filesize <= 40* megaBytes ) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
					const resp = await axios.post(API.API_ITEM_UPLOAD_OVER, formData); LOGGER ( 'eERWguRnGR' , resp.data ) 
					let { status , payload , respdata }=resp.data
					if ( status == 'OK'){
						setitemid ( respdata )
						setFileResp( resp.data )
						setItem( payload.url)
					}
        } else {
					SetErrorBar( ERR_MSG.ERR_FILE_SIZE_EXCEEDED )
					return
				}
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_FILE_UPLOAD_FAILED);
        console.log(error)
      }
    }
  }
  const handleCreateItem = () => {
    const asyncCreateItem = async () => {
			await on_post_metadata ()
        if ( activePubl ) {          // TODO          // transaction here ( mint )
					on_request_tx_mint()
        } else {
					on_request_lazy_mint()
        }
/**       } catch (error) {
        SetErrorBar(ERR_MSG.ERR_CREATE_ITEM_FAILED);
        console.log(error);
      }*/
    };
    if (nameChk && fileChk) {
      asyncCreateItem();
    } else {
      SetErrorBar(ERR_MSG.ERR_PLEASE_COMPLETE_REQUIRE);
    }
	}
	useEffect(_=>{
		query_noarg({contractaddress :ADDRESSES.admin
			, abikind : 'ADMIN'
			, methodname : '_author_royalty_max'
		}).then(resp=>{ LOGGER ( '6ldBJAuZEs' , resp )
			if ( resp && ISFINITE(+resp) ){
				setroyaltymax ( ''+(resp / 100 ))
			} else {}
		}) 
	}
	, [] )
	useEffect(_=>{
		setName (''+ generateSlug(3, {format:'sentence'}) )
		setDesc(''+		 generateSlug(5, {format:'sentence'}) )
		setRoyal ( getrandomint( 1 , 10 ) )
		setcountcopies ( getrandomint ( 1, 13 ))
		setdaystoclose ( getrandomint (7 , 60 ))
	} , [ ] )
  useEffect(() => {
    if (name.length > 0) {
      setNameChk(true);
    } else {
      setNameChk(false);
    }
  }, [name]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const asyncGetCategories = async () => {
      try {
				const resp = await axios.get(API.API_GET_ITEM_CATEGORIES);
				LOGGER( 'pJS3rFJaac' , resp.data )
				let { status , list }=resp.data 
				if ( status =='OK'){
					setCategories( list)
					setCurCategory( list[0].category )
				}
      } catch (error) {
        alert(ERR_MSG.ERR_CANNOT_GET_CATEGORIES);
        console.log(error);
      }
    };
    asyncGetCategories();
  }, []);

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
                <strong>Items home</strong>
              </div>
              <div class="sell_wrap">
                <div class="create">
                  <h2>Create a new item</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <h3>
                            Add images, video, audio and modeling{" "}
                            <img
                              src={require("../img/sub/star.png").default}
                              alt=""
                            />
                          </h3>
                          <div class="img">
                            <div class="line">
                              <input
                                type="file"
                                name
                                id="file"
                                onChange={(e) => {
                                  onChangeItem(e.target.files[0]);
                                  fileUpload(e.target.files[0]);
                                }}
                              />

                              <label
                                for="file"
                                style={{
                                  padding: item && 0,
                                }}
                              >
                                {item ? (
                                  <>
                                    {fileViewType === "image" ? (
                                      <img src={item} alt="" />
                                    ) : (
                                      <video
                                        src={item}
                                        autoPlay
                                        muted
                                        controls
                                        loop
                                        heigth="auto"
                                        width="100%"
                                      ></video>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <p>
                                      JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                                      <br />
                                      OGG etc. (Up to 40mb)
                                    </p>
                                    <button>Choose File</button>
                                  </>
                                )}
                              </label>
                            </div>
                          </div>
                        </li>
                        <li>
                          <h3>Category</h3>
                          <p>You can easily search by selecting a category.</p>
                          <div class="cat">
                            <ul>
                              {categories.map((cate, idx ) => (
                                <li key={idx}
                                  onClick={() => {
                                    setCurCategory(cate.category);
                                  }}
                                  style={
                                    curCategory === cate.category
                                      ? {
                                          backgroundColor: "black",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <span>{cate.category}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                        <li>
                          <h3>
                            Name{" "}
                            <img
                              src={require("../img/sub/star.png").default}
                              alt=""
                            />
                          </h3>
                          <div class="inputbox">
                            <input
                              value={name}
                              type="text"
                              placeholder="Example: A item of atmospheric night view photos"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <h3>Item Description</h3>
                          <p>
                            Please enter a description that best describes the
                            characteristics of the item.
                          </p>
                          <div class="inputbox">
                            <div class="txt">
                              <textarea
                                type="text"
                                value={desc}
                                onChange={(e) => {
                                  setDesc(e.target.value);
                                }}
                                placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                              ></textarea>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Unlocked content</h3>
                            <div class="toggle">
                              <input
                                type="checkbox"
                                checked={unlocked}
                                onChange={(e) => {
                                  setUnlocked(e.target.checked);
                                }}
                                name=""
                                id="toggle"
                              />
                              <label for="toggle"></label>
                            </div>
                          </div>
                          <p>
                            Set the content that can only be shown to the item
                            owner. For example,
                            <br />
                            if you want to give the owner a physical
                            certificate, register my contact information
                            <br />
                            (email, address, phone number, etc.) so that they
                            can be contacted.
                          </p>
                          <div class="inputbox">
                            <div class="txt">
                              <textarea
                                type="text"
                                value={unlockedContent}
                                onChange={(e) => {
                                  setUnlockedContent(e.target.value);
                                }}
                                placeholder="Reveal codes, links, access keys, contact information, etc. to be redeemed only to the item owner"
                              ></textarea>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Number of copies to be issued</h3>
                          </div>
                          <p>
                            The number of copies that can be issued. If you set
                            multiple, one item will be sold to multiple
                            customers.
                          </p>
                          <div class="inputbox number">
                            <input
                              type="text"
                              placeholder=""
                              onkeydown="onlyNumber(this)"
                              value={countcopies}
                              onChange={(e) => {
																let {value}=e.target
																if (ISFINITE(+value)){}
																else {SetErrorBar ( messages.MSG_INPUT_NUMBERS_ONLY ) ; return }
                                setcountcopies( value ) // e.target.
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Freezing metadata</h3>
                            <div class="toggle">
                              <input
                                type="checkbox"
                                name=""
                                id="toggle2"
                                checked={freezing}
                                onChange={(e) => {
                                  setFreezing(e.target.checked);
                                }}
                              />
                              <label for="toggle2"></label>
                            </div>
                          </div>
                          <p>
                            Fixes metadata and stores it permanently in file
                            storage (IPFS).
                            <br />
                            Once selected, it cannot be edited or removed.
                          </p>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Active Publish</h3>
                            <div class="toggle">
                              <input
                                type="checkbox"
                                name=""
                                id="toggle3"
                                checked={activePubl}
                                onChange={(e) => {
                                  setActivePubl(e.target.checked);
                                }}
                              />
                              <label for="toggle3"></label>
                            </div>
                          </div>
                          <p>
                            Determine whether active publishing is possible.
                            <br />
                            The default is Lazy publishing, and additional
                            charges may be incurred if you do actvie publishing.
                          </p>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Royalty setting</h3>
                            <p>
                              Each time an item is resold, you can receive a
                              certain
                              <br class="m" /> amount of commission. (up to {royaltymax}%)
                              <br class="pc" />
                              If not set, it is set to 0%.
                            </p>
                            <div class="inputbox number percent">
                              <input
                                type="text"
                                placeholder=""
                                onkeydown="onlyNumber(this)"
                                value={royal}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  if (value > 20) {
                                    value = 20;
                                  } else if (value < 0) {
                                    value = 0;
                                  }
                                  setRoyal(value);
                                }}
                              />
                              <span>%</span>

                            </div>
                          </div>
                        </li>

{/**                         <li>
                          <div class="top2">
                            <h3>Expiry</h3>
                            <p>
															Number of days till expiry
                            </p>
                            <div class="inputbox number percent">
                              <input
                                type="text"
                                placeholder=""
                                onkeydown="onlyNumber(this)"
                                value={royal}
																onChange={(e) => { LOGGER()
																	let {value}=e.target
																	if (ISFINITE( +value)){}
																	else {SetErrorBar (messages.MSG_INPUT_NUMBERS_ONLY); return }
																	setdaystoclose ( value )
                                }}
                              />
                              <span></span>
                            </div>
                          </div>
                        </li>*/}

                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div class="create_btn">
                <a onClick={handleCreateItem}>Create Item</a>
              </div>

              <div class="create_btn">
								<a onClick={async _=>{LOGGER( 'rsNxLMScQI' )
									on_post_metadata()
								}}>{ 'Register metadata' }</a>
              </div>

              <div class="create_btn">
								<a onClick={_=>{LOGGER( 'MOdR4DlcH9' )
									if (activePubl){ on_request_tx_mint () }
									else 	{ on_request_lazy_mint() }
								}}>{ activePubl ? 'Mint item->chain' : 'Register Item->server' }</a>
              </div>

            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}
const SignPopupBox = styled.div``;
export default CreateItem;
// import "./css/style01.css";
// import "./css/style02.css";

const requesttransaction_response={
	blockHash: "0x76279a841587951c6f92cf88ed85cbf97f6fb8025f162e1dfdb8cd86a086a860"
	,blockNumber: 81380202
	,contractAddress: null
	,from: "0x90033484a520b20169b60f131b4e2f7f46923faf"
	,gas: "0x3d090"
	,gasPrice: "0x5d21dba00"
	,gasUsed: 208171
	,input: "0x1178e3cc00000000000000000000000090033484a520b20169b60f131b4e2f7f46923faf00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000305f5f516d5243335644724c6232596e33454176586134695035324e394a6778736b3845467061347158776153764647550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
	,logs: '' // [{…}]
	,logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000002000000000000000000000000000000000000000000000001000000000000000000000000000020000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000800000000000000000000000000000000000000000000000000000008000000000000000008000000000000000020000000000000000000000000000000000000000800000000000000080000000000"
	,nonce: "0x19"
	,senderTxHash: "0x24c4435310d4c977d9cac82177de19c7c9b674135b3cb8265c46a320734d2d79"
	,signatures: '' // [{…}]
	,status: true
	,to: "0xb7aa9cd318e97f42a477dc1d9185fdec5503e9b5"
	,transactionHash: "0x24c4435310d4c977d9cac82177de19c7c9b674135b3cb8265c46a320734d2d79"
	,transactionIndex: 0
	,type: "TxTypeLegacyTransaction"
	,typeInt: 0
	,value: "0x0"
}
/**	const on_request_tx_mint_mockup=async _=>{
		const mokupRndTxHash = "0x" + generateRandomString(63);
		const mokupRndContract = "0x" + generateRandomString(40);
		const mokupRndPaymeans = "0x" + generateRandomString(40);
		const body = {
			url: fileResp.payload.url,
			price: 0,
			tit lename: name,
			descr iption: desc,
			keywords: "",
			priceunit: "KLAY",
			metadataurl: urlmetadata , // metaResult.payload.url ,
			contract: mokupRndContract.trim(),
			nettype: "klaytn-testnet",
			paymeans: mokupRndPaymeans.trim(),
			expiry: 1644791196,
			expirychar: moment().format(),
			categorystr: curCategory,
			originatorfeeinbp: 500,
			activeorlazymint: activ ePubl,
		};
		const resp = await axios.post(
			API.API_MINT_TX_REPORT +				`/${itemid}/${mokupRndTxHash.trim()}/${userAddress}`,			body // file Resp.resp data
		);
		if (resp.data.status === "OK") {
			navigate(`/salefixed?itemid=${itemid}`) // fileR esp.resp data
		}
	}
 */