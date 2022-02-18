import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

// import "./css/style01.css"; // import "./css/style02.css";

import { useState, useEffect } from "react";
import VerifyAccountPopup from "../../components/mint/saleItem/VerifyAccountPopup";
import queryString from "query-string";
import SetErrorBar from "../../util/SetErrorBar";
import { ERR_MSG, messages } from "../../config/messages";
// import axios from "axios";
import { API } from "../../config/api";
import DatePicker from "react-datepicker";
import {
  getmyaddress,
  LOGGER,
  getrandomint,
  convaj,
  conv_bp_percent,
  ISFINITE,
} from "../../util/common";
import { signOrderData } from "../../util/verifySig";
import { is_eth_address_valid } from "../../util/eth";
import { applytoken } from "../../util/rest";
import { ADDRESSES } from "../../config/addresses";
import {
  TIME_PAGE_TRANSITION_ON_REGISTER,
  PAYMENT_TOKEN_ADDRESS_DEF,
  REFERER_FEE_RATE_DEF,
  MODE_DEV_PROD,
  RULES,
  PAYMEANS_DEF,
} from "../../config/configs";
import { useSearchParams } from "react-router-dom";
import {
  getabistr_forfunction,
  query_nfttoken_balance,
  requesttransaction,
  query_with_arg,
  query_noarg,
} from "../../util/contract-calls";
import moment from "moment";
import PopupBg from "../../components/PopupBg";
import CertificationContractPopup from "../../components/mint/saleItem/CertificationContractPopup";
import NowSalePopup from "../../components/mint/saleItem/NowSalePopup";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import I_ltArw3 from "../../img/icons/I_ltArw3.png";
import I_rtArw from "../../img/icons/I_rtArw.svg";
import FixedPrice from "./saleItem/FixedPrice";
import AuctionBid from "./saleItem/AuctionBid";

export default function SaleFixed() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(0);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [platformFee, setPlatfromFee] = useState(2.5);
  const [royalty, setRoyalty] = useState(5);
  const [itemPrice, setItemPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [endPriceOption, setEndPriceOption] = useState(false);
  const [privateOption, setPrivateOption] = useState(false);
  const [privateAddress, setPrivateAddress] = useState("");
  const [itemdata, setitemdata] = useState({});
  const [sign, setSign] = useState([]);
  const [signError, setSignError] = useState("");
  const [completeSign, setCompleteSign] = useState(true);
  let [daystoclose, setdaystoclose] = useState("3 days later");
  let [expirydays, setexpirydays] = useState("" + 7);
  let [signeddata, setsigneddata] = useState();
  let [itemid, setitemid] = useState();
  let [tokenid, settokenid] = useState();
  let [jsettings, setjsettings] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();
  let [amounttosell, setamounttosell] = useState(0);
  const [listingProcess, setListingProcess] = useState(2);
  let [sellorder, setsellorder] = useState();
  let [mindeposit, setmindeposit] = useState();
  let myaddress = getmyaddress();
  const axios = applytoken();
  let typestr = "COMMON";

  useEffect((_) => {
    let itemprice = getrandomint(12, 17);
    setItemPrice(itemprice);
    setEndPrice(getrandomint(itemprice - 10, itemprice - 2));
    /////
    axios.get(API.API_PLATFORM_SETTINGS).then((resp) => {
      LOGGER("yDc3w8vZgI", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setjsettings(convaj(list, "key_", "value_"));
      }
    });
  }, []);

  const do_dutch_auction = (_) => {
    let tokenid = itemdata?.item?.tokenid;
    if (tokenid) {
    } else {
      SetErrorBar(messages.MSG_DATANOTFOUND);
    } // ; return
    false &&
      query_nfttoken_balance(ADDRESSES.erc1155, myaddress, tokenid).then(
        (resp) => {
          LOGGER("wE2hK5BTA4", resp);
        }
      );
    //		const query_nfttok en_balance = ( contractaddress , address , tokenid )=>{
    if (ISFINITE(+endPrice) && +endPrice < +itemPrice) {
    } else {
      SetErrorBar(messages.MSG_DUTCH_PRICE_TERMS_INVALID);
      return;
    }
    let days = daystoclose.split(/ /)[0];
    let expiry = moment()
      .add(+days, "days")
      .endOf("days")
      .unix();
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.auction_repo_dutch_bulk,
      abikind: "AUCTION_DUTCH_BULK",
      methodname: "begin_auction_batch",
      aargs: [
        ADDRESSES.erc1155, //
        ADDRESSES.zero,
        myaddress,
        [tokenid],
        [1],
        PAYMENT_TOKEN_ADDRESS_DEF,
        itemPrice,
        endPrice,
        5,
        moment().unix(),
        expiry, // moment().add( 5 , 'days' ).unix()
        REFERER_FEE_RATE_DEF,
      ],
    });
    LOGGER("bINmVzlWvR", abistr);
    //		return
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.auction_repo_dutch_bulk,
      data: abistr,
      value: "0x00",
    })
      .then((resp) => {
        LOGGER("", resp);
        let { transactionHash, status } = resp;
        LOGGER("", transactionHash, status);
      })
      .catch((err) => {
        LOGGER("", err);
      });
  };
  /**			 "_target_contract",
				 "_user_proxy_registry",
				 "_holder",
				 "_target_item_ids",
				 "_amounts",
				 "_paymenttoken",
				 "_offer_starting_price",
				 "_offer_end_price" ,
				 "_count_steps_depreciation",
				 "_starting_time",
				 "_expiry",
				 "_referer_feerate",
 */
  const do_fixed_price_spot = (_) => {
    if (amounttosell) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_INPUT);
      return;
    }
    const orderData = {
      seller_address: myaddress,
      amount: amounttosell ? amounttosell : itemdata?.item?.countcopies,
      price: itemPrice,
      //			priceunitaddress :
      asset_contract_ask: ADDRESSES.zero, // "0x000000000000000000000000000000000000",
      priceunitname: PAYMEANS_DEF,
      expiry: expirydays
        ? moment()
            .add(+expirydays, "days")
            .endOf("day")
            .unix()
        : 0,
      itemid,
      tokenid,
      typestr, //			, exp iry
    };
    setsellorder(orderData);
    console.log("", endPriceOption, itemdata);
    console.log("", orderData); //	 return
    signOrderData(orderData).then((respsign) => {
      LOGGER("8pdnEvf9uF", respsign); // , signCallback
      if (respsign) {
      } else {
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        setListingProcess(0);
        return;
      }
      SetErrorBar(messages.MSG_DATA_SIGNED);
      setsigneddata(respsign);
      //			return
      axios
        .post(
          API.API_ORDER_MAKER_SELLER,
          {
            // /orders/maker/seller
            asset_contract_bid: ADDRESSES.erc1155,
            ...orderData,
            ...respsign,
            typestr,
          } // signeddata
        )
        .then((resp) => {
          LOGGER("2UtIKhAjXH", resp.data);
          let { status } = resp.data;
          if (status == "OK") {
            SetErrorBar(messages.MSG_DONE_REGISTERING);
            setListingProcess(2);
            fetchitem(itemid);
            false &&
              setTimeout((_) => {
                MODE_DEV_PROD == 1 && navigate("/marketplace");
              }, TIME_PAGE_TRANSITION_ON_REGISTER);
          }
        });
    });
  };
  const fetchitem = async (itemid) => {
    try {
      const resp = await axios.get(API.API_GET_ITEM_DATA + `/${itemid}`);
      LOGGER("url", API.API_GET_ITEM_DATA);
      LOGGER("", resp.data);
      let { status, respdata } = resp.data;
      if (status === "OK") {
        setitemdata(respdata); // .item
        setRoyalty(respdata.item.authorfee / 100);
        settokenid(respdata.item.tokenid);
      } else {
        SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA);
        setTimeout((_) => {
          navigate("/");
        }, TIME_PAGE_TRANSITION_ON_REGISTER);
      }
    } catch (error) {
      SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA);
      setTimeout((_) => {
        navigate("/");
      }, TIME_PAGE_TRANSITION_ON_REGISTER);
    }
  };
  const handleSalesStart = async () => {
    const myaddress = getmyaddress(); //    const asyncSalesStart = async () => {
    if (endPriceOption) {
      do_dutch_auction();
    } else {
      do_fixed_price_spot();
    } //    };  //  asyncSalesStart();
  };

  // useEffect(() => {
  //   //		const { itemid } = queryString.parse(search);
  //   let itemid = searchParams.get("itemid");
  //   LOGGER("U9Z2CL8cRt", itemid);
  //   if (itemid === undefined) {
  //     SetErrorBar(ERR_MSG.ERR_NO_ITEM_DATA); //      navigate("/");
  //   }
  //   setitemid(itemid);
  //   fetchitem(itemid);
  // }, []); // [ navigate , search ]

  useEffect(() => {
    console.log(signError, sign.length);
    if (signError !== "" && signError !== undefined && signError !== null) {
      setCompleteSign(false);
      setVerifyPopup(false);
      setSign([]);
      setSignError("");
      return;
    }
    if (sign.length === 4) {
      setCompleteSign(true);
      setVerifyPopup(true);
    }
  }, [sign.length]);

  useEffect(
    async (_) => {
      if (myaddress) {
      } else {
        return;
      }
      query_with_arg({
        contractaddress: ADDRESSES.registerproxy,
        abikind: "REGISTER_PROXY",
        methodname: "_registered",
        aargs: [myaddress],
      }).then(async (resp) => {
        LOGGER("", resp);
        if (resp) {
          return;
        } else {
          let respmindeposit = await query_noarg({
            contractaddress: ADDRESSES.registerproxy,
            abikind: "REGISTER_PROXY",
            methodname: "_min_deposit_amount",
          });
          LOGGER("", respmindeposit);
          setmindeposit(respmindeposit);
          setVerifyPopup(true);
        }
      });
    },
    [myaddress]
  );

  if (isMobile)
    return (
      <>
        {verifyPopup && (
          <>
            <VerifyAccountPopup off={setVerifyPopup} mindeposit={mindeposit} />
            <PopupBg bg off={setVerifyPopup} />
          </>
        )}

        {listingProcess === 1 && (
          <>
            <CertificationContractPopup
              off={setListingProcess}
              itemdata={itemdata}
              sellorder={sellorder}
            />
            <PopupBg bg off={setListingProcess} />
          </>
        )}
        {listingProcess === 2 && (
          <>
            <NowSalePopup
              off={setListingProcess}
              itemid={itemid}
              itemdata={itemdata}
            />
            <PopupBg bg off={setListingProcess} />
          </>
        )}
        <MsaleItem>
          <section className="innerBox">
            <article className="contArea">
              <div className="topBar">
                <button className="exitBtn" onClick={() => navigate(-1)}>
                  <img src={I_ltArw3} alt="" />
                </button>

                <span className="profBox">
                  <span className="profImg" />

                  <strong className="title">Henry junior's Item</strong>
                </span>
              </div>

              <div className="contContainer">
                <div className="categoryBox">
                  <strong className="title">Choose a sales method</strong>

                  <ul className="categoryList">
                    <li
                      className={category === 0 && "on"}
                      onClick={() => setCategory(0)}
                    >
                      <div className="leftBox">
                        <strong className="category">Fixed Price</strong>
                        <p className="explain">
                          Sell ​​at a fixed or declining price after a period of
                          time
                        </p>
                      </div>
                    </li>

                    <li
                      className={category === 1 && "on"}
                      onClick={() => setCategory(1)}
                    >
                      <div className="leftBox">
                        <strong className="category">Auction Bid</strong>
                        <p className="explain">Sell ​​to the highest bidder</p>
                      </div>
                    </li>

                    <li
                      className={category === 2 && "on"}
                      // onClick={() => setCategory(2)}
                    >
                      <div className="leftBox">
                        <strong className="category">Bundle Sale</strong>
                        <p className="explain">
                          Selling multiple items together
                        </p>
                      </div>

                      <img className="arwImg" src={I_rtArw} alt="" />
                    </li>
                  </ul>
                </div>

                <div className="contBox">
                  {category === 0 && <FixedPrice />}
                  {category === 1 && <AuctionBid />}
                </div>
              </div>
            </article>

            <article className="infoArea">
              <ul className="infoList">
                <li className="transactionBox">
                  <strong className="infoTitle">Transaction information</strong>
                  <p className="info">
                    The item is posted for sale at 3,339 ETH
                  </p>
                </li>

                <li className="referralBox">
                  <strong className="infoTitle">Referral Fee</strong>
                  <p className="info">
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </li>

                <li className="feeBox">
                  <strong className="infoTitle">Fees</strong>
                  <ul className="feeList">
                    <li>
                      <p className="key">Platform Fee</p>
                      <p className="value">2.5%</p>
                    </li>
                    <li>
                      <p className="key">royalty</p>
                      <p className="value">5%</p>
                    </li>
                    <li>
                      <strong className="key">Total</strong>
                      <strong className="value">7.5%</strong>
                    </li>
                  </ul>
                </li>
              </ul>

              <button className="saleBtn" onClick={() => {}}>
                Sales Start
              </button>
            </article>
          </section>
        </MsaleItem>
      </>
    );
  else
    return (
      <>
        {verifyPopup && (
          <>
            <VerifyAccountPopup off={setVerifyPopup} mindeposit={mindeposit} />
            <PopupBg bg off={setVerifyPopup} />
          </>
        )}

        {listingProcess === 1 && (
          <>
            <CertificationContractPopup
              off={setListingProcess}
              itemdata={itemdata}
              sellorder={sellorder}
            />
            <PopupBg bg off={setListingProcess} />
          </>
        )}
        {listingProcess === 2 && (
          <>
            <NowSalePopup
              off={setListingProcess}
              itemid={itemid}
              itemdata={itemdata}
            />
            <PopupBg bg off={setListingProcess} />
          </>
        )}

        <DefaultHeader />
        <PsaleItem>
          <section className="innerBox">
            <article className="contArea">
              <div className="topBar">
                <button className="exitBtn" onClick={() => navigate(-1)}>
                  <img src={I_ltArw3} alt="" />
                </button>

                <span className="profBox">
                  <span className="profImg" />

                  <strong className="title">Henry junior's Item</strong>
                </span>
              </div>

              <div className="contContainer">
                <div className="categoryBox">
                  <strong className="title">Choose a sales method</strong>

                  <ul className="categoryList">
                    <li
                      className={category === 0 && "on"}
                      onClick={() => setCategory(0)}
                    >
                      <div className="category_titleBox">
                        <strong className="category">Fixed Price</strong>
                      </div>

                      <p className="explain">
                        Sell ​​at a fixed or declining price after a period of
                        time
                      </p>
                    </li>

                    <li
                      className={category === 1 && "on"}
                      onClick={() => setCategory(1)}
                    >
                      <div className="category_titleBox">
                        <strong className="category">Auction Bid</strong>
                      </div>

                      <p className="explain">Sell ​​to the highest bidder</p>
                    </li>

                    <li
                      className={category === 2 && "on"}
                      // onClick={() => setCategory(2)}
                    >
                      <div className="category_titleBox">
                        <span className="blank" />
                        <strong className="category">Bundle Sale</strong>
                        <img src={I_rtArw} alt="" />
                      </div>

                      <p className="explain">
                        Selling multiple
                        <br />
                        items together
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="contBox">
                  {category === 0 && <FixedPrice />}
                  {category === 1 && <AuctionBid />}
                </div>
              </div>
            </article>

            <article className="infoArea">
              <ul className="infoList">
                <li className="transactionBox">
                  <strong className="infoTitle">Transaction information</strong>
                  <p className="info">
                    The item is posted for sale at 3,339 ETH
                  </p>
                </li>

                <li className="referralBox">
                  <strong className="infoTitle">Referral Fee</strong>
                  <p className="info">
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </li>

                <li className="feeBox">
                  <strong className="infoTitle">Fees</strong>
                  <ul className="feeList">
                    <li>
                      <p className="key">Platform Fee</p>
                      <p className="value">2.5%</p>
                    </li>
                    <li>
                      <p className="key">royalty</p>
                      <p className="value">5%</p>
                    </li>
                    <li>
                      <strong className="key">Total</strong>
                      <strong className="value">7.5%</strong>
                    </li>
                  </ul>
                </li>
              </ul>

              <button className="saleBtn" onClick={() => {}}>
                Sales Start
              </button>
            </article>
          </section>
        </PsaleItem>
      </>
    );
}

const MsaleItem = styled.div`
  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 16.66vw;
    padding: 0 0 16.66vw 0;

    & > article {
      &.contArea {
        .title {
          font-size: 5vw;
          font-weight: 900;
        }

        .topBar {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 72px;
          padding: 0 5.55vw;

          .title {
            font-size: 18px;
          }

          .exitBtn {
            img {
              width: 18px;
            }
          }

          .profBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .profImg {
              display: inline-block;
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background: #333;
            }
          }
        }

        .contContainer {
          display: flex;
          flex-direction: column;
          gap: 13.88vw;
          padding: 8.33vw 0 0 0;

          .categoryBox {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;
            padding: 0 5.55vw;

            .categoryList {
              display: flex;
              flex-direction: column;
              gap: 1.66vw;

              li {
                flex: 1;
                display: flex;
                justify-content: space-between;
                height: 17.77vw;
                padding: 2.77vw;
                border: solid 2px #d9d9d9;
                border-radius: 2.22vw;
                cursor: pointer;

                &.on {
                  border: 2px solid #1c7eff;
                }

                .leftBox {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  gap: 1.11vw;

                  .category {
                    font-size: 4.44vw;
                    font-weight: 900;
                  }

                  .explain {
                    font-size: 3.33vw;
                    font-weight: 500;
                    letter-spacing: -0.32px;
                    text-align: center;
                    color: #727272;
                  }
                }

                .arwImg {
                  width: 3.33vw;
                }
              }
            }
          }
        }
      }

      &.infoArea {
        display: flex;
        flex-direction: column;
        gap: 11.11vw;
        padding: 0 5.55vw;

        .infoList {
          & > li {
            display: flex;
            flex-direction: column;
            gap: 3.88vw;
            padding-bottom: 6.66vw;

            &:nth-of-type(n + 2) {
              padding-top: 6.66vw;
              border-top: 1px solid #d9d9d9;
            }

            .infoTitle {
              font-size: 5vw;
              font-weight: 900;
            }

            .info {
              font-size: 3.88vw;
            }

            &.transactionBox {
            }

            &.referralBox {
            }

            &.feeBox {
              .feeList {
                display: flex;
                flex-direction: column;
                gap: 3.33vw;
                font-size: 3.88vw;

                li {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }
        }

        .saleBtn {
          width: 100%;
          height: 15.55vw;
          font-size: 4.44vw;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 12.22vw;
        }
      }
    }
  }
`;

const PsaleItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 120px 0;

  .innerBox {
    padding: 90px 0 0 0;
    display: flex;
    align-items: flex-start;
    gap: 24px;

    & > article {
      background: #fbfbfb;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
      border-radius: 20px;

      &.contArea {
        width: 800px;

        .title {
          font-size: 20px;
          font-weight: 900;
        }

        .topBar {
          display: flex;
          align-items: center;
          gap: 20px;
          height: 82px;
          padding: 0 30px;

          .exitBtn {
            img {
              width: 18px;
            }
          }

          .profBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .profImg {
              display: inline-block;
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background: #333;
            }
          }
        }

        .contContainer {
          display: flex;
          flex-direction: column;
          gap: 38px;
          padding: 54px 36px 50px 36px;
          border-top: 1px solid #d9d9d9;

          .categoryBox {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .categoryList {
              display: flex;
              gap: 10px;

              li {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                height: 120px;
                padding: 22px 26px 0 26px;
                border: solid 1px #d9d9d9;
                border-radius: 8px;
                cursor: pointer;

                &.on {
                  border: 2px solid #1c7eff;
                  padding: 21px 25px 0 25px;
                }

                .category_titleBox {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 9px;

                  .category {
                    font-size: 18px;
                    font-weight: 900;
                  }

                  .blank,
                  img {
                    width: 10px;
                  }
                }

                .explain {
                  font-size: 16px;
                  font-weight: 500;
                  letter-spacing: -0.32px;
                  text-align: center;
                  color: #727272;
                }
              }
            }
          }
        }
      }

      &.infoArea {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 300px;
        padding: 30px 30px 20px 30px;

        .infoList {
          & > li {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding-bottom: 20px;

            &:nth-of-type(n + 2) {
              padding-top: 20px;
              border-top: 1px solid #d9d9d9;
            }

            .infoTitle {
              font-size: 20px;
              font-weight: 900;
            }

            .info {
              font-size: 16px;
            }

            &.transactionBox {
            }

            &.referralBox {
            }

            &.feeBox {
              .feeList {
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-size: 16px;

                li {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }
        }

        .saleBtn {
          width: 100%;
          height: 56px;
          font-size: 22px;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 44px;
        }
      }
    }
  }
`;

/** const signCallback = (error, result) => {
    const temp = [];
    console.log(error, result);
    if (result.error === undefined) {
      const v = "0x" + result.result.substring(2).substring(128, 130);
      const r = "0x" + result.result.substring(2).substring(0, 64);
      const s = "0x" + result.result.substring(2).substring(64, 128);
      temp.push(v, r, s, result.result);
      set Sign(temp);
    } else {
      console.log(error);
      setS ignError(error);
      SetErrorBar(ERR_MSG.ERR_USER_SIGN_CANCELED);
    }
  };
 */
