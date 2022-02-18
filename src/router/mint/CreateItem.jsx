import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import { generateSlug } from "random-word-slugs";
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
  const navigate = useNavigate();

  const itemInputRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);
  const userAddress = useSelector((state) => state.wallet.address);
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
      aargs: [myaddress, random_ipfscid, countcopies, royal, 0, "0x00"],
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
          countcopies,
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
      //			return
      //			let txhash = resp.transactionHash
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
        address: userAddress,
        originator: userAddress,
        category: curCategory,
        authorroyalty: parseInt((royal * 100).toFixed(0)),
        url: fileResp.payload.url,
        datahash: itemid, // fil eResp.res pdata,
        timestamp: moment().format(),
        unixtime: moment().unix(),
        unlockcontent: unlocked === true ? 1 : 0,
        unlockedcontent: unlockedContent,
        countcopies: countcopies,
        freezemetadata: freezing === true ? 1 : 0,
        originator: myaddress,
        author: myaddress,
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
      url: urlfile,
      titlename: name,
      description: description,
      priceunit: PAYMEANS_DEF,
      itemid: itemid, // fileR esp.respd ata
      metadataurl: urlmetadata,
      contract: ADDRESSES.erc1155,
      nettype: NETTYPE,
      paymeans: PAYMEANS_DEF,
      categorystr: curCategory,
      author: myaddress, // userAddress ,
      authorfee: conv_percent_bp(royal), //parseInt( ( royal * 100 ).toFixed(0) )
      countcopies,
      //	amount: 1,
      //		decimals: 18,
      //			expiry: 0,
    };
    const resp = await axios.post(API.API_LAZY_MINT, body);
    if (resp.data.status === "OK") {
      SetErrorBar(messages.MSG_DONE_REGISTERING);
      setTimeout((_) => {
        navigate(`/saleitem?itemid=${itemid}`);
      }, TIME_PAGE_TRANSITION_DEF);
    } else {
      SetErrorBar(messages.MSG_REGISTER_FAILED);
    }
  };
  const onChangeItem = async (file) => {
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
        if (file.size <= 4 * megaBytes) {
          // file size < 4mb
          const base64 = await encodeBase64File(file);
          const base64Data = {
            datainbase64: base64,
            filename: file.name,
            username: myaddress,
          };
          LOGGER("ojuEGTDeEU", base64Data);
          //					return
          const resp = await axios.post(API.API_ITEM_UPLOAD_BASE64, base64Data);
          LOGGER("xG6MsNdQhX", resp.data);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            setitemid(respdata);
            setFileResp(resp.data);
            setItem(payload.url);
            seturlfile(payload.url);
          }
          return;
        } else if (filesize <= 40 * megaBytes) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          formData.append("username", myaddress);
          const resp = await axios.post(API.API_ITEM_UPLOAD_OVER, formData);
          LOGGER("eERWguRnGR", resp.data);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            setitemid(respdata);
            setFileResp(resp.data);
            setItem(payload.url);
          }
        } else {
          SetErrorBar(ERR_MSG.ERR_FILE_SIZE_EXCEEDED);
          return;
        }
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_FILE_UPLOAD_FAILED);
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

  if (isMobile)
    return (
      <>
        <McreateItemBox>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw3} alt="" />
              </button>

              <strong className="title">Items home</strong>
            </article>

            <article className="contArea">
              <strong className="mainTitle">Create a new item</strong>

              <ul className="contList">
                <li className="imgContainer">
                  <div className="titleBox">
                    <strong className="title">
                      Add images, video, audio and modeling
                    </strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="imgBox">
                    <div className="imgContainer_innerBox">
                      <p className="explain">
                        JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG etc. (Up to
                        40mb)
                      </p>

                      <button
                        className="imgContainer_chooseBtn"
                        onClick={() => itemInputRef.current.click()}
                      >
                        Choose File
                      </button>

                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        value={item}
                        onChange={(e) => onChangeItem(e.target.value)}
                      />
                    </div>
                  </div>
                </li>

                <li className="nameBox">
                  <div className="titleBox">
                    <strong className="title">Name</strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="inputBox">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Example: A collection of atmospheric night view photos"
                    />
                  </div>
                </li>

                <li className="descriptionBox">
                  <div className="titleBox">
                    <strong className="title">Item Description</strong>
                  </div>

                  <p className="explain">
                    Please enter a description that best describes the
                    characteristics of the item.
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                    />
                  </div>
                </li>

                <li className="unlockBox">
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
                      Number of copies to be issued
                    </strong>
                  </div>

                  <p className="explain">
                    The number of copies that can be issued. If you set
                    multiple, one item will be sold to multiple customers.
                  </p>

                  <div className="inputBox">
                    <input
                      value={copy}
                      onChange={(e) => setCopy(e.target.value)}
                    />
                  </div>
                </li>

                <li className="freezeBox">
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
              <button className="createBtn" onClick={() => {}}>
                Create Item
              </button>
            </article>
          </section>
        </McreateItemBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <PcreateItemBox>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw3} alt="" />
              </button>

              <strong className="title">Items home</strong>
            </article>

            <article className="contArea">
              <strong className="mainTitle">Create a new item</strong>

              <ul className="contList">
                <li className="imgContainer">
                  <div className="titleBox">
                    <strong className="title">
                      Add images, video, audio and modeling
                    </strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="imgBox">
                    <div className="imgContainer_innerBox">
                      <p className="explain">
                        JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG etc. (Up to
                        40mb)
                      </p>

                      <button
                        className="imgContainer_chooseBtn"
                        onClick={() => itemInputRef.current.click()}
                      >
                        Choose File
                      </button>

                      <input
                        className="nospace"
                        type="file"
                        ref={itemInputRef}
                        value={item}
                        onChange={(e) => onChangeItem(e.target.value)}
                      />
                    </div>
                  </div>
                </li>

                <li className="nameBox">
                  <div className="titleBox">
                    <strong className="title">Name</strong>
                    <img src={star} alt="" />
                  </div>

                  <div className="inputBox">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Example: A collection of atmospheric night view photos"
                    />
                  </div>
                </li>

                <li className="descriptionBox">
                  <div className="titleBox">
                    <strong className="title">Item Description</strong>
                  </div>

                  <p className="explain">
                    Please enter a description that best describes the
                    characteristics of the item.
                  </p>

                  <div className="textareaBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                    />
                  </div>
                </li>

                <li className="unlockBox">
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
                      Number of copies to be issued
                    </strong>
                  </div>

                  <p className="explain">
                    The number of copies that can be issued. If you set
                    multiple, one item will be sold to multiple customers.
                  </p>

                  <div className="inputBox">
                    <input
                      value={copy}
                      onChange={(e) => setCopy(e.target.value)}
                    />
                  </div>
                </li>

                <li className="freezeBox">
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
              <button className="createBtn" onClick={() => {}}>
                Create Item
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
              height: 202px;
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
                height: 100%;
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
      }
    }
  }
`;
