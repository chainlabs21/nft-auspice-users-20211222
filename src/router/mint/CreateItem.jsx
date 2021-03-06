import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import { generateSlug } from "random-word-slugs";
import ConfirmationPopup from "../../components/ConfirmationPopup"
import {
  query_noarg,
  getabistr_forfunction,
  requesttransaction,
  query_with_arg,
} from "../../util/contract-calls";

import { useEffect, useRef, useState } from "react";
import {
  encodeBase64File,
  LOGGER,
  getrandomint,
  ISFINITE,
  getmyaddress,
  conv_percent_bp,
} from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import { ERR_MSG, messages } from "../../config/messages";
// import axios from "axios";
import { API } from "../../config/api";
import { useSelector } from "react-redux";
import moment from "moment";
import { ADDRESSES } from "../../config/addresses";
import { applytoken } from "../../util/rest";
import { get_random_ipfs } from "../../util/ipfscid";
import awaitTransactionMined from "await-transaction-mined";
import { web3 } from "../../config/configweb3";
import {
  TX_POLL_OPTIONS,
  PAYMEANS_DEF,
  NETTYPE,
  TIME_PAGE_TRANSITION_DEF,
} from "../../config/configs";
import {} from "../../util/store";
import CertificationContractPopup from "../../components/mint/saleItem/CertificationContractPopup";
import PopupBg from "../../components/PopupBg";
import NowSalePopup from "../../components/mint/saleItem/NowSalePopup";
import DefaultHeader from "../../components/header/DefaultHeader";


import I_ltArw3 from "../../img/icons/I_ltArw3.png";
import star from "../../img/sub/star.png";
import { useTranslation } from "react-i18next";

const kiloBytes = 1024;
const megaBytes = 1024 * kiloBytes;
const fileTypeList = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "mp4",
  "webm",
  "mp3",
  "wav",
  "ogg",
];
const MAP_fileextension_contentype = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  svg: "image",
  mp4: "video",
  webm: "video",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
};
export default function CreateItem({ store, setConnect }) {
  const {t} = useTranslation(['locale'])
  const navigate = useNavigate();

  const itemInputRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {isloggedin} = useSelector((state) => state.user);
  const {walletAddress} = useSelector((state) => state.user);
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unlockToggle, setUnlockToggle] = useState();
  const [unlockText, setUnlockText] = useState("");
  const [copy, setCopy] = useState(1);
  const [freezeToggle, setFreezeToggle] = useState(false);

  const [nameChk, setNameChk] = useState(false);
  const [fileChk, setFileChk] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState("");
  const [countcopies, setcountcopies] = useState(1);
  const [freezing, setFreezing] = useState(false);
  const [activePubl, setActivePubl] = useState(false);
  const [royal, setRoyal] = useState(0);
  const [curCategory, setCurCategory] = useState("");
  const [fileResp, setFileResp] = useState({});
  const [categories, setCategories] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [fileViewType, setFileViewType] = useState("image");
  let [royaltymax, setroyaltymax] = useState(0);
  let [urlmetadata, seturlmetadata] = useState();
  let [urlfile, seturlfile] = useState();
  let [itemid, setitemid] = useState();
  let [daystoclose, setdaystoclose] = useState();
  let axios = applytoken();
  let [myaddress, setmyaddress] = useState(getmyaddress());
  const [listingProcess, setListingProcess] = useState(0);
  const [submitReady, setSubmitReady]=useState(true);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState()


  useEffect(()=>{
    if(!isloggedin){SetErrorBar('???????????? ????????? ?????????.');navigate('/');return;}
  })
  useEffect(()=>{
    if (nameChk && fileChk && description){
      setSubmitReady(false)
    }
  },[nameChk, fileChk, description])

  const on_request_tx_mint_onchain = async (_) => {
    //let my address = getm yaddress()
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_TO_WALLET);
      return;
    }
    let random_ipfscid = itemid || "__" + get_random_ipfs();
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.erc1155,
      abikind: "ERC1155",
      methodname: "mint",
      aargs: [myaddress, random_ipfscid, copy, royal, 0, "0x00"],
    });
    LOGGER("JwE5ZF6jav", abistr, random_ipfscid);
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_TO_WALLET);
      return;
    }
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.erc1155,
      data: abistr,
      value: "0x00",
    }).then((resp) => {
      LOGGER("", resp);
      let { transactionHash: txhash, status } = resp;
      if (status) {
      } else {
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        return;
      }
      SetErrorBar(messages.MSG_TX_REQUEST_SENT);
      query_with_arg({
        contractaddress: ADDRESSES.erc1155,
        abikind: "ERC1155",
        methodname: "_itemhash_tokenid",
        aargs: [random_ipfscid],
      }).then((resp) => {
        LOGGER("UaSEEYwCnu", resp);
        let tokenid = resp;
        let reqbody = {
          url: urlfile,
          //					, price
          tokenid,
          titlename: name,
          description: description,
          //					, keywords
          priceunit: PAYMEANS_DEF,
          metadataurl: urlmetadata,
          contract: ADDRESSES.erc1155,
          nettype: NETTYPE,
          paymeans: PAYMEANS_DEF,
          //					, expiry
          //				, expirychar
          categorystr: curCategory, //    , originatorfeeinbp
          author: myaddress,
          authorfee: conv_percent_bp(royal),
          countcopies: copy,
        };
        if (resp) {
          axios
            .post(
              `${API.API_REPORT_TX_MINT}/${itemid}/${txhash}/${myaddress}`,
              reqbody
            ) // t/:hexid/:txhash/:address'
            .then((resp) => {
              LOGGER("", resp.data);
              let { status } = resp.data;
              if (status == "OK") {
                SetErrorBar(messages.MSG_DONE_REGISTERING);
                setTimeout((_) => {
                  navigate(`/saleitem?itemid=${itemid}`);
                }, TIME_PAGE_TRANSITION_DEF);
              }
            });
          alert(`tokenid:${resp}`);
        }
      });
      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then((minedtxreceipt) => {
          LOGGER("f9slc6vfyh", minedtxreceipt); //				Setislo ader(false);
        });
    });
    // tx ok : https://baobab.scope.klaytn.com/tx/0x1c69e43e3dd606415bab7aa6420b2632cee1d47d74dcb353ee6dd3e014bad2fa :gas used-208,171
  };
  const on_post_metadata = async (_) => {
    try {
      const metaData = {
        title: name,
        description: description,
        address: walletAddress,
        originator: walletAddress,
        category: curCategory,
        authorroyalty: parseInt((royal * 100).toFixed(0)),
        url: fileResp,
        datahash: itemid, // fil eResp.res pdata,
        timestamp: moment().format(),
        unixtime: moment().unix(),
        unlockcontent: unlocked === true ? 1 : 0,
        unlockedcontent: unlockedContent,
        countcopies: copy,
        freezemetadata: freezing === true ? 1 : 0,
        originator: myaddress,
        author: myaddress,
        typestr: fileViewType 
      };
      const metaResp = await axios.post(
        API.API_ITEM_SAVE_META + `/${itemid}`, // fileR esp.resp data
        metaData
      );
      LOGGER("rbPatKJrSt", metaResp.data);
      let { status, message } = metaResp.data;
      if (status == "OK") {
        const metaResult = metaResp.data;
        seturlmetadata(metaResult.payload.url);
        console.log(metaResult.payload.url)
        SetErrorBar(messages.MSG_DONE_REGISTERING);
      } else {
        if (message == "DATA-DUPLICATE") {
          SetErrorBar(messages.MSG_DUPLICATE_ITEM);
          return;
        }
        SetErrorBar(messages.MSG_REGISTER_FAILED);
      }
    } catch (err) {
      LOGGER(err);
    }
  };
  const on_request_lazy_mint = async (_) => {
    const body = {
      url: fileResp,
      titlename: name,
      description: description,
      priceunit: PAYMEANS_DEF,
      itemid: itemid, // fileR esp.respd ata
      metadataurl: urlmetadata,
      contract: ADDRESSES.erc1155,
      nettype: NETTYPE,
      paymeans: PAYMEANS_DEF,
      categorystr: curCategory,
      author: myaddress, // walletAddress ,
      authorfee: conv_percent_bp(royal), //parseInt( ( royal * 100 ).toFixed(0) )
      countcopies: copy,
      typestr: fileViewType,
      //	amount: 1,
      //		decimals: 18,
      //			expiry: 0,
    };
    const resp = await axios.post(API.API_LAZY_MINT, body);
    if (resp.data.status === "OK") {
      SetErrorBar(messages.MSG_DONE_REGISTERING);
      //UPLOADING
      setTimeout((_) => {
        //UPLOADING DONE
        navigate(`/saleitem?itemid=${itemid}`);
      }, TIME_PAGE_TRANSITION_DEF);
    } else {
      SetErrorBar(messages.MSG_REGISTER_FAILED);
    }
  };

  const checkbeforesubmit=()=>{


    window.klaytn.enable().then((account)=>{
      if(walletAddress == account[0]){
        handleCreateItem()
      }
    })
  }



  const onChangeItem = async (file) => {
    if (!file) {
      return;
    }
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();
    let typeToggle = false;
    fileTypeList.forEach((v) => {
      if (fileType === v) {
        typeToggle = true;
      }
    });
    if (!typeToggle) {
      setErrorMsg(t('emsg:NOT_SUPPORTED_FILE_TYPE'));
          setErrorPopup(true); 
      return;
    }
    let contenttype;
    if ((contenttype = MAP_fileextension_contentype[fileType])) {
      setFileViewType(contenttype);
    } else {
      setFileViewType("image");
    }
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
    let filesize = file.size;
    if (file && filesize > 0) {
      setFileChk(true);
      try {
        if (file.size>40*megaBytes){}
        if (filesize <= 40 * megaBytes) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          formData.append("username", myaddress);
          const resp = await axios.post(API.API_ITEM_UPLOAD_OVER, formData);
          LOGGER("eERWguRnGR", resp.data);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            setitemid(respdata);
            setFileResp(resp.data.payload.url);
            console.log(resp.data)
            setItem(payload.url);
            setErrorMsg(t('emsg:FILE_UPLOADED'));
            setErrorPopup(true); 
          }
        } else {
          setErrorMsg(t('emsg:FILE_SIZE_EXCEED'));
          setErrorPopup(true); 
          return;
        }
      } catch (error) {
        setErrorMsg(t('emsg:FILE_UPLOAD_FAILED'));
          setErrorPopup(true); 
        console.log(error);
      }
    }
  };
  const handleCreateItem = () => {
    const asyncCreateItem = async () => {
      await on_post_metadata();
      if (activePubl) {
        // TODO          // transaction here ( mint )

        on_request_tx_mint_onchain();
      } else {
        on_request_lazy_mint();
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
  };

  useEffect((_) => {
    query_noarg({
      contractaddress: ADDRESSES.admin,
      abikind: "ADMIN",
      methodname: "_author_royalty_max",
    }).then((resp) => {
      LOGGER("6ldBJAuZEs", resp);
      if (resp && ISFINITE(+resp)) {
        setroyaltymax("" + resp / 100);
      } else {
      }
    });
    //    let token_sec = localStorage.getItem("token");
    //  axios.defaults.headers.get.token = token_sec;
    // axios.defaults.headers.p ost.token = token_sec;
  }, []);

  useEffect(() => {
    if (!name) {
      setNameChk(false);
    } else {
      setNameChk(true);
    }
  }, [name]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const asyncGetCategories = async () => {
      try {
        const resp = await axios.get(API.API_GET_ITEM_CATEGORIES);
        LOGGER("pJS3rFJaac", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setCategories(list);
          setCurCategory(list[0].category);
        }
      } catch (error) {
        alert(ERR_MSG.ERR_CANNOT_GET_CATEGORIES);
        console.log(error);
      }
    };
    asyncGetCategories();
  }, []);

  useEffect(()=>{
    if (royal>10){
      setRoyal(10)
    }
  },[royal])

  if (isMobile)
    return (
      <>
        <McreateItemBox>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw3} alt="" />
              </button>

              <strong className="title">{t('createitem:ITEMS_HOME')}</strong>
            </article>

            <article className="contArea">
              <strong className="mainTitle">{t('createitem:CREATE_NEW_ITEM')}</strong>

              <ul className="contList">
                <li className="imgContainer">
                  <div className="titleBox">
                    <strong className="title">
                    {t('createitem:UPLOAD_TITLE')}
                    </strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="imgBox">
                    <div className="imgContainer_innerBox">
                    {item?(<>
                      {fileViewType =="video" &&(<video style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/>)}
                      {fileViewType =="image" &&(<img style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/>)}
                      {fileViewType =="audio" &&(<audio controls><source style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/></audio>)}
                      
                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        onChange={(e) => onChangeItem(e.target.files[0])}
                        accept="image/*, video/mp4, audio/*"
                      />
                      </>):(
                        <>
                      <p className="explain">
                      {t('createitem:UPLOAD_EXPLAIN')}
                      </p>

                      <button
                        className="imgContainer_chooseBtn"
                        onClick={() => itemInputRef.current.click()}
                      >
                        {t('createitem:CHOOSE_FILE')}
                      </button>

                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        onChange={(e) => onChangeItem(e.target.files[0])}
                        accept="image/*, video/mp4, audio/*"
                      />
                      </>)
                    }
                    </div>
                  </div>
                </li>

                <li className="categoryBox"> {/*{style={{display: 'none'}}>} */}
                  <div className="titleBox">
                      <strong className="title">{t('createitem:CATEGORY')}</strong>
                    </div>
                          <p className="explain">{t('createitem:CATEGORY_EXPLAIN')}</p>
                          <div className="categoryList">
                            <ul>
                              {categories.map((cate, idx) => (
                                
                                <li
                                  key={idx}
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

                <li className="nameBox">
                  <div className="titleBox">
                    <strong className="title">{t('createitem:NAME')}</strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="inputBox">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('createitem:NAME_HOLDER')}
                    />
                  </div>
                </li>

                <li className="descriptionBox">
                  <div className="titleBox">
                    <strong className="title">{t('createitem:ITEM_DESC')}</strong>
                  </div>

                  <p className="explain">
                  {t('createitem:ITEM_DESC_EXPLAIN')}
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t('createitem:ITEM_DESC_HOLDER')}
                    />
                  </div>
                </li>

                <li className="unlockBox" style={{display: 'none'}}>
                  <div className="titleBox toggleBox">
                    <strong className="title">Unlocked content</strong>
                    <button
                      className={unlockToggle ? "toggleBtn on" : "toggleBtn"}
                      onClick={() => setUnlockToggle(!unlockToggle)}
                    >
                      <span />
                    </button>
                  </div>

                  <p className="explain">
                    Set the content that can only be shown to the item owner.
                    For example, if you want to give the owner a physical
                    certificate, register my contact information (email,
                    address, phone number, etc.) so that they can be contacted.
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={unlockText}
                      onChange={(e) => setUnlockText(e.target.value)}
                      placeholder="Reveal codes, links, access keys, contact information, etc. to be redeemed only to the item owner"
                    />
                  </div>
                </li>

                <li className="copyBox">
                  <div className="titleBox toggleBox">
                    <strong className="title">
                    {t('createitem:COPIES')}
                    </strong>
                  </div>

                  <p className="explain">
                  {t('createitem:COPIES_EXPLAIN')}
                  </p>

                  <div className="inputBox">
                    <input
                      value={copy}
                      onChange={(e) => setCopy(e.target.value)}
                    />
                  </div>
                </li>

                <li className="freezeBox" style={{display: 'none'}}>
                  <div className="titleBox toggleBox">
                    <strong className="title">Freezing metadata</strong>
                    <button
                      className={freezeToggle ? "toggleBtn on" : "toggleBtn"}
                      onClick={() => setFreezeToggle(!freezeToggle)}
                    >
                      <span />
                    </button>
                  </div>

                  <p className="explain">
                    Fixes metadata and stores it permanently in file storage
                    (IPFS).
                    <br /> Once selected, it cannot be edited or removed.
                  </p>
                </li>
              </ul>
            </article>

            <article className="btnArea">
            <button className={!(nameChk && fileChk)?"dcreateBtn":"createBtn"} disabled={!(nameChk && fileChk)} onClick={() => {checkbeforesubmit()}}>
              {t('createitem:CREATE_ITEM')}
              </button>
            </article>
          </section>
        </McreateItemBox>
      </>
    );
  else
    return (
      <>
      {errorPopup&& (
                    <>
                    <ConfirmationPopup 
                        content = {errorMsg}
                        off={setErrorPopup}
                      />
                      <PopupBg off={setErrorPopup} />
                    </>
                  )}
      
        <DefaultHeader />
        <PcreateItemBox>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw3} alt="" />
              </button>

              <strong className="title">{t('createitem:ITEMS_HOME')}</strong>
            </article>

            <article className="contArea">
              <strong className="mainTitle">{t('createitem:CREATE_NEW_ITEM')}</strong>

              <ul className="contList">
                <li className="imgContainer">
                  <div className="titleBox">
                    <strong className="title">
                    {t('createitem:UPLOAD_TITLE')}
                    </strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="imgBox">
                    <div className="imgContainer_innerBox">
                      {item?(<>
                      {fileViewType =="video" &&(<video style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/>)}
                      {fileViewType =="image" &&(<img style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/>)}
                      {fileViewType =="audio" &&(<audio controls><source style={{width: '100%'}} onClick={() => itemInputRef.current.click()} src={item}/></audio>)}
                      
                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        onChange={(e) => onChangeItem(e.target.files[0])}
                        accept="image/*, video/mp4, audio/*"
                      />
                      </>):(
                        <>
                      <p className="explain">
                      {t('createitem:UPLOAD_EXPLAIN')}
                      </p>

                      <button
                        className="imgContainer_chooseBtn"
                        onClick={() => itemInputRef.current.click()}
                      >
                        {t('createitem:CHOOSE_FILE')}
                      </button>

                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        onChange={(e) => onChangeItem(e.target.files[0])}
                        accept="image/*, video/mp4, audio/*"
                      />
                      </>)
                    }
                    </div>
                  </div>
                </li>


                 <li className="categoryBox"> {/*{style={{display: 'none'}}>} */}
                  <div className="titleBox">
                      <strong className="title">{t('createitem:CATEGORY')}</strong>
                    </div>
                          <p>{t('createitem:CATEGORY_EXPLAIN')}</p>
                          <div className="categoryList">
                            <ul>
                              {categories.map((cate, idx) => (
                                
                                <li
                                  key={idx}
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





                <li className="nameBox">
                  <div className="titleBox">
                    <strong className="title">{t('createitem:NAME')}</strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="inputBox">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('createitem:NAME_HOLDER')}
                    />
                  </div>
                </li>

                <li className="descriptionBox">
                  <div className="titleBox">
                    <strong className="title">{t('createitem:ITEM_DESC')}</strong>
                  </div>

                  <p className="explain">
                  {t('createitem:ITEM_DESC_EXPLAIN')}
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t('createitem:ITEM_DESC_HOLDER')}
                    />
                  </div>
                </li>

                <li className="unlockBox" style={{display: 'none'}}>
                  <div className="titleBox toggleBox">
                    <strong className="title">Unlocked content</strong>
                    <button
                      className={unlockToggle ? "toggleBtn on" : "toggleBtn"}
                      onClick={() => setUnlockToggle(!unlockToggle)}
                    >
                      <span />
                    </button>
                  </div>

                  <p className="explain">
                    Set the content that can only be shown to the item owner.
                    For example, if you want to give the owner a physical
                    certificate, register my contact information (email,
                    address, phone number, etc.) so that they can be contacted.
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={unlockText}
                      onChange={(e) => setUnlockText(e.target.value)}
                      placeholder="Reveal codes, links, access keys, contact information, etc. to be redeemed only to the item owner"
                    />
                  </div>
                </li>

                <li className="copyBox">
                  <div className="titleBox toggleBox">
                    <strong className="title">
                    {t('createitem:COPIES')}
                    </strong>
                  </div>

                  <p className="explain">
                  {t('createitem:COPIES_EXPLAIN')}
                  </p>

                  <div className="inputBox">
                    <input
                      value={copy}
                      onChange={(e) => setCopy(e.target.value)}
                    />
                  </div>
                </li>

                {/**ACTUALLY THIS IS ROYALTY SETTING */}
                <li className="copyBox">
                  <div className="titleBox toggleBox">
                    <strong className="title">
                    Royalty setting
                    </strong>
                  </div>

                  <p className="explain">
                  Each time an item is resold, you can receive a certain amount of commission. (up to 10%)
                  <br/>If not set, it is set to 0%.
                  </p>

                  <div className="inputBox">
                    <input
                    type="number"
                      value={royal}
                      onChange={(e) => setRoyal(e.target.value)}
                    />
                    <span>%</span>
                  </div>
                </li>


                <li className="freezeBox" style={{display: 'none'}}>
                  <div className="titleBox toggleBox">
                    <strong className="title">Freezing metadata</strong>
                    <button
                      className={freezeToggle ? "toggleBtn on" : "toggleBtn"}
                      onClick={() => setFreezeToggle(!freezeToggle)}
                    >
                      <span />
                    </button>
                  </div>

                  <p className="explain">
                    Fixes metadata and stores it permanently in file storage
                    (IPFS).
                    <br /> Once selected, it cannot be edited or removed.
                  </p>
                </li>
              </ul>
            </article>

            <article className="btnArea">
              <button className={!(nameChk && fileChk)?"dcreateBtn":"createBtn"} disabled={!(nameChk && fileChk)} onClick={() => {checkbeforesubmit()}}>
              {t('createitem:CREATE_ITEM')}
              </button>
            </article>
          </section>
        </PcreateItemBox>
      </>
    );
}
const McreateItemBox = styled.div`
  display: flex;
  justify-content: center;

  .innerBox {
    padding: 6.66vw 0 11.11vw 0;

    .topBar {
      display: flex;
      align-items: center;
      gap: 2.22vw;
      height: 6.11vw;
      padding: 0 5.55vw;

      .exitBtn {
        img {
          width: 5vw;
        }
      }

      .title {
        font-size: 5vw;
        line-height: 5vw;
      }
    }

    .contArea {
      padding: 15.27vw 5.55vw 13.88vw 5.55vw;

      .mainTitle {
        font-size: 6.66vw;
      }

      .contList {
        display: flex;
        flex-direction: column;
        gap: 13.88vw;
        margin: 4.44vw 0 0 0;

        input,
        textarea {
          font-size: 3.88vw;
        }

        input {
          flex: 1;
          height: 13.33vw;
          border-radius: 8px;

          &.nospace {
            padding: 0;
          }
        }

        .textareaBox {
          padding: 4.44vw 2.22vw 4.44vw 5.55vw;
          height: 63.88vw;
          background-color: #f6f6f6;
          border-radius: 2.22vw;

          textarea {
            width: 100%;
            height: 100%;
            padding: 0 1.11vw 0 0;
            background-color: #f6f6f6;

            &::-webkit-scrollbar {
              width: 4px;
              border: 5px solid #f6f6f6;
            }

            &::-webkit-scrollbar-thumb {
              width: 4px;
              background: #b7b7b7;
              border-radius: 4px;
            }

            &::-webkit-scrollbar-track {
              background: #f4f2f2;
              border-radius: 4px;
            }
          }
        }

        .inputBox {
          display: flex;
          align-items: center;
          padding: 0 2.77vw;
          border-radius: 2.22vw;
          background-color: #f6f6f6;
        }

        .explain {
          font-size: 3.88vw;
          line-height: 5.55vw;
        }

        li {
          display: flex;
          flex-direction: column;
          gap: 5.55vw;

          .titleBox {
            height: 6.66vw;

            .title {
              font-size: 5vw;
              line-height: 6.66vw;
              letter-spacing: -0.6px;
            }

            img {
              width: 4.44vw;
            }

            &.toggleBox {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .toggleBtn {
                display: flex;
                align-items: center;
                padding: 0.55vw;
                width: 11.11vw;
                height: 6.11vw;
                border-radius: 4.44vw;
                background: #d9d9d9;
                transition: all 0.2s;

                span {
                  display: inline-block;
                  width: 5vw;
                  height: 5vw;
                  background: #fff;
                  border-radius: 50%;
                  transition: all 0.2s;
                }

                &.on {
                  background: #4d4d4d;

                  span {
                    margin: 0 0 0 5vw;
                  }
                }
              }
            }
          }

          &.imgContainer {
            .imgBox {
              height: 51.66vw;
              padding: 1.38vw;
              border: dashed 2px #d9d9d9;
              border-radius: 2.22vw;

              .imgContainer_innerBox {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 5vw;
                width: 100%;
                height: 100%;
                border-radius: 2.22vw;
                background: #f6f6f6;
                position: relative;

                .explain {
                  width: 58vw;
                  font-size: 3.33vw;
                  font-weight: 500;
                  text-align: center;
                  color: #7a7a7a;
                }

                .imgContainer_chooseBtn {
                  width: 48.88vw;
                  height: 13.33vw;
                  border-radius: 12.22vw;
                  font-size: 4.44vw;
                  font-weight: 500;
                  color: #fff;
                  background: #c5c5c5;
                }
              }
            }
          }

          &.nameBox {
          }

          &.categoryBox{
            ul{
              display: flex;
              flex-wrap: wrap;
              margin: 0vw 0 0 0;
              border-radius: 4vw;
              background: #f6f6f6;
              li{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 25vw;
                height: 8vw;
                padding: 0 35px;
                font-size: 4.33vw;
                font-weight: 500;
                white-space: nowrap;
                border-radius: 4vw;
                cursor: pointer;
              }
            }
          }

          &.descriptionBox {
          }

          &.unlockBox {
          }

          &.copyBox {
          }

          &.freezeBox {
          }
        }
      }
    }

    .btnArea {
      padding: 0 5.55vw;

      .createBtn {
        width: 100%;
        height: 15.55vw;
        font-size: 4.44vw;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 44px;
      }
      .dcreateBtn {
        width: 100%;
        height: 15.55vw;
        font-size: 4.44vw;
        font-weight: 500;
        color: #fff;
        background: #ccc;
        border-radius: 44px;
      }

    }
  }
`;

const PcreateItemBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 210px 0 120px 0;

  .innerBox {
    width: 100%;
    max-width: 800px;
    border-radius: 20px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;

    .topBar {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 82px;
      padding: 0 30px;

      .exitBtn {
        img {
          width: 18px;
        }
      }

      .title {
        font-size: 20px;
        line-height: 20px;
      }
    }

    .contArea {
      padding: 54px 36px 38px 36px;

      .mainTitle {
        font-size: 30px;
      }

      .contList {
        display: flex;
        flex-direction: column;
        gap: 38px;
        margin: 50px 0 0 0;

        input,
        textarea {
          font-size: 16px;
        }

        input {
          flex: 1;
          height: 50px;
          border-radius: 8px;

          &.nospace {
            padding: 0;
          }
        }

        .textareaBox {
          padding: 15px 6px 15px 20px;
          height: 134px;
          background-color: #f6f6f6;
          border-radius: 8px;

          textarea {
            width: 100%;
            height: 100%;
            padding: 0 4px 0 0;
            background-color: #f6f6f6;

            &::-webkit-scrollbar {
              width: 4px;
              border: 5px solid #f6f6f6;
            }

            &::-webkit-scrollbar-thumb {
              width: 4px;
              background: #b7b7b7;
              border-radius: 4px;
            }

            &::-webkit-scrollbar-track {
              background: #f4f2f2;
              border-radius: 4px;
            }
          }
        }

        .inputBox {
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-radius: 8px;
          background-color: #f6f6f6;
        }

        .explain {
          font-size: 16px;
          line-height: 22px;
        }

        li {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .titleBox {
            height: 26px;

            .title {
              font-size: 20px;
              line-height: 26px;
            }

            img {
              width: 16px;
            }

            &.toggleBox {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .toggleBtn {
                display: flex;
                padding: 3px;
                width: 50px;
                height: 26px;
                border-radius: 24px;
                background: #d9d9d9;
                transition: all 0.2s;

                span {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  background: #fff;
                  border-radius: 50%;
                  transition: all 0.2s;
                }

                &.on {
                  background: #4d4d4d;

                  span {
                    margin: 0 0 0 24px;
                  }
                }
              }
            }
          }

          &.imgContainer {
            .imgBox {
              min-height: 202px;
              padding: 5px;
              border: dashed 2px #d9d9d9;
              border-radius: 8px;

              .imgContainer_innerBox {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 18px;
                width: 100%;
                min-height: 202px;
                border-radius: 8px;
                background: #f6f6f6;
                position: relative;

                .explain {
                  width: 400px;
                  font-size: 20px;
                  font-weight: 500;
                  text-align: center;
                  color: #7a7a7a;
                }

                .imgContainer_chooseBtn {
                  width: 176px;
                  height: 50px;
                  border-radius: 44px;
                  font-size: 18px;
                  font-weight: 500;
                  color: #fff;
                  background: #c5c5c5;
                }
              }
            }
          }

          &.nameBox {
          }
          &.categoryBox{
            ul{
              display: flex;
      flex-wrap: wrap;
      margin: 30px 0 0 0;
      border-radius: 28px;
      background: #f6f6f6;
              li{
                flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 180px;
        height: 56px;
        padding: 0 35px;
        font-size: 18px;
        font-weight: 700;
        white-space: nowrap;
        border-radius: 28px;
        cursor: pointer;
              }
            }
          }

          &.descriptionBox {
          }

          &.unlockBox {
            .explain {
              width: 554px;
            }
          }

          &.copyBox {
            .inputBox {
              width: 146px;
            }
          }

          &.freezeBox {
          }
        }
      }
    }

    .btnArea {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 134px;
      padding: 0 36px;
      border-top: 1px solid #d9d9d9;

      .createBtn {
        width: 176px;
        height: 56px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 44px;
        text-align: center;
        padding-top: auto;
        
      }
      .dcreateBtn {
        width: 176px;
        height: 56px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #ccc;
        border-radius: 44px;
        text-align: center;
        padding-top: auto;
        
      }
    }
  }
`;
