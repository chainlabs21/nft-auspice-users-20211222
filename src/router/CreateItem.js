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

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useEffect, useState } from "react";
import { encodeBase64File } from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { ERR_MSG } from "../config/messages";
import axios from "axios";
import { API } from "../config/api";
import { useSelector } from "react-redux";
import moment from "moment";
import { signOrderData } from "../util/verifySig";
import { generateRandomString } from "../util/Util";

const kiloBytes = 1024;
const megaBytes = 1024 * kiloBytes;
const fileTypeList = [
  "jpg",
  "png",
  "gif",
  "svg",
  "mp4",
  "webm",
  "mp3",
  "wav",
  "ogg",
];

function CreateItem({ store, setConnect }) {
  const navigate = useNavigate();
  const userAddress = useSelector((state) => state.wallet.address);

  const [item, setItem] = useState("");
  const [nameChk, setNameChk] = useState(false);
  const [fileChk, setFileChk] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState("");
  const [numCopies, setNumCopies] = useState(1);
  const [freezing, setFreezing] = useState(false);
  const [activePubl, setActivePubl] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royal, setRoyal] = useState(0);
  const [curCategory, setCurCategory] = useState("");
  const [fileResp, setFileResp] = useState({});
  const [categories, setCategories] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [fileViewType, setFileViewType] = useState("image");

  function onChangeItem(file) {
    /*
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setItem(reader.result);
    };
	*/
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

    switch (fileType) {
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
    }

    if (file && file.size > 0) {
      setFileChk(true);
      try {
        // file size < 4mb
        if (file.size < 4 * megaBytes) {
          const base64 = await encodeBase64File(file);
          const base64Data = {
            datainbase64: base64,
            filename: file.name,
          };
          const resp = await axios.post(API.API_ITEM_UPLOAD_BASE64, base64Data);
          setFileResp(resp.data);
          setItem(resp.data.payload.url);
        } else {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          const resp = await axios.post(API.API_ITEM_UPLOAD_OVER, formData);
          console.log(resp);
          setFileResp(resp.data);
          setItem(resp.data.payload.url);
        }
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_FILE_UPLOAD_FAILED);
        console.log(error);
      }
    }
  };
  const handleCreateItem = () => {
    const asyncCreateItem = async () => {
      try {
        const metaData = {
          title: name,
          description: desc,
          address: userAddress,
          originator: userAddress,
          category: curCategory,
          authorroyalty: parseInt((royal * 100).toFixed(0)),
          url: fileResp.payload.url,
          datahash: fileResp.respdata,
          timestamp: moment().format(),
          unixtime: moment().unix(),
          unlockcontent: unlocked === true ? 1 : 0,
          unlockedcontent: unlockedContent,
          countcopies: numCopies,
          freezemetadata: freezing === true ? 1 : 0,
        };
        const metaResp = await axios.post(
          API.API_ITEM_SAVE_META + `/${fileResp.respdata}`,
          metaData
        );

        const metaResult = metaResp.data;

        if (activePubl) {
          // TODO
          // transaction here ( mint )
          const mokupRndTxHash = "0x" + generateRandomString(63);
          const mokupRndContract = "0x" + generateRandomString(40);
          const mokupRndPaymeans = "0x" + generateRandomString(40);
          const body = {
            url: fileResp.payload.url,
            price: 0,
            titlename: name,
            description: desc,
            keywords: "",
            priceunit: "KLAY",
            metadataurl: metaResult.payload.url,
            contract: mokupRndContract.trim(),
            nettype: "klaytn-testnet",
            paymeans: mokupRndPaymeans.trim(),
            expiry: 1644791196,
            expirychar: moment().format(),
            categorystr: curCategory,
            originatorfeeinbp: 500,
            activeorlazymint: activePubl,
          };

          const resp = await axios.post(
            API.API_MINT_TX_REPORT +
              `/${fileResp.respdata}/${mokupRndTxHash.trim()}/${userAddress}`,
            body
          );
          if (resp.data.status === "OK") {
            navigate(`/salefixed?id=${fileResp.respdata}`);
          }
        } else {
          const body = {
            itemid: fileResp.respdata,
            countcopies: numCopies,
            amount: 1,
            decimals: 18,
            expiry: 0,
            categorystr: curCategory,
            author: userAddress,
            authorfee: parseInt((royal * 100).toFixed(0)),
          };
          const resp = await axios.post(API.API_LAZY_MINT, body);
          if (resp.data.status === "OK") {
            navigate(`/salefixed?id=${fileResp.respdata}`);
          }
        }
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_CREATE_ITEM_FAILED);
        console.log(error);
      }
    };
    if (nameChk && fileChk) {
      asyncCreateItem();
    } else {
      SetErrorBar(ERR_MSG.ERR_PLEASE_COMPLETE_REQUIRE);
    }
  };
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
        setCategories(resp.data.list);
        setCurCategory(resp.data.list[0].category);
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
                              {categories.map((cate) => (
                                <li
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
                              value={numCopies}
                              onChange={(e) => {
                                setNumCopies(e.target.value);
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
                              <br class="m" /> amount of commission. (up to 20%)
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
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div class="create_btn">
                <a onClick={handleCreateItem}>Create Item</a>
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
