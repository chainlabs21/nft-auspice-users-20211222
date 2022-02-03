import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import nft_arrow from "../img/sub/nft_arrow.png";
import star from "../img/sub/star.png";
import logo_img from "../img/sub/logo_img.png";
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
import CancelPopup from "../components/CancelPopup";
import AuthFailedPopup from "../components/AuthFailedPopup";
import { useState } from "react";
import { useSelector } from "react-redux";

function CreateCollection({ store, setConnect }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loyalty, setLoyalty] = useState("");

  if (isMobile)
    return (
      <McreateCollectionBox>
        <section className="innerBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={nft_arrow} alt="" />
            </button>

            <strong className="title">Collection home</strong>
          </article>

          <article className="contBox">
            <strong className="title">Create a new collection</strong>

            <ul className="contList">
              <li className="logoBox">
                <div className="titleBox">
                  <strong className="contTitle">Logo</strong>
                  <img className="star" src={star} alt="" />
                </div>

                <p className="explain">
                  Register the collection logo. Please select an image file.
                  <br />
                  Square image (recommended size 350 x 350)
                </p>

                <button className="logoBtn" onClick={() => {}}>
                  <div className="innerBox">
                    <img className="initImg" src={logo_img} alt="" />
                  </div>
                </button>
              </li>

              <li className="nameBox">
                <div className="titleBox">
                  <strong className="contTitle">Collection name</strong>
                  <img className="star" src={star} alt="" />
                </div>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: A collection of atmospheric night view photos"
                />
              </li>

              <li className="bannerBox">
                <div className="titleBox">
                  <strong className="contTitle">Add Collection Banner</strong>
                </div>

                <p className="explain">
                  Register the banner that will appear at the top of the
                  collection home page. The image to characterize the collection
                  is advantageous, and if there is a lot of text, it may be hard
                  to see depending on the window size. (Recommended size 1400 x
                  300)
                </p>

                <button className="bannerBtn" onClick={() => {}}>
                  <div className="innerBox">
                    <div className="initBox">
                      <p className="limit">
                        JPG , PNG, ICO etc. Image file (Up to 10mb)
                      </p>
                      <button className="chooseBtn" onClick={() => {}}>
                        Choose File
                      </button>
                    </div>
                  </div>
                </button>
              </li>

              <li className="descriptionBox">
                <div className="titleBox">
                  <strong className="contTitle">Collection Description</strong>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                ></textarea>
              </li>

              <li className="categoryBox">
                <div className="titleBox">
                  <strong className="contTitle">Category</strong>
                </div>

                <p className="explain">
                  You can easily search by selecting a category.
                </p>

                <ul className="categoryList">
                  {categoryList.map((cont, index) => (
                    <li key={index}>{cont}</li>
                  ))}
                </ul>
              </li>

              <li className="loyaltyBox">
                <div className="titleBox">
                  <strong className="contTitle">Loyalty setting</strong>
                </div>

                <p className="explain">
                  Each time an item is resold, you can receive a certain amount
                  of commission. (up to 20%) If not set, it is set to 0%.
                </p>

                <div className="inputBox">
                  <input
                    value={loyalty}
                    onChange={(e) => setLoyalty(e.target.value)}
                    placeholder=""
                  />

                  <p className="unit">%</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="createBtnBox">
            <button className="createBtn" onClick={() => navigate(-1)}>
              Create Collection
            </button>
          </article>
        </section>
      </McreateCollectionBox>
    );
  else
    return (
      <PcreateCollectionBox>
        <section className="innerBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={nft_arrow} alt="" />
            </button>

            <strong className="title">Collection home</strong>
          </article>

          <article className="contBox">
            <strong className="title">Create a new collection</strong>

            <ul className="contList">
              <li className="logoBox">
                <div className="titleBox">
                  <strong className="contTitle">Logo</strong>
                  <img className="star" src={star} alt="" />
                </div>

                <p className="explain">
                  Register the collection logo. Please select an image file.
                  <br />
                  Square image (recommended size 350 x 350)
                </p>

                <button className="logoBtn" onClick={() => {}}>
                  <div className="innerBox">
                    <img className="initImg" src={logo_img} alt="" />
                  </div>
                </button>
              </li>

              <li className="nameBox">
                <div className="titleBox">
                  <strong className="contTitle">Collection name</strong>
                  <img className="star" src={star} alt="" />
                </div>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Example: A collection of atmospheric night view photos"
                />
              </li>

              <li className="bannerBox">
                <div className="titleBox">
                  <strong className="contTitle">Add Collection Banner</strong>
                </div>

                <p className="explain">
                  Register the banner that will appear at the top of the
                  collection home page.
                  <br />
                  The image to characterize the collection is advantageous, and
                  if there is a lot of text, it may be hard to see depending on
                  the window size.(Recommended size 1400 x 300)
                </p>

                <button className="bannerBtn" onClick={() => {}}>
                  <div className="innerBox">
                    <div className="initBox">
                      <p className="limit">
                        JPG , PNG, ICO etc. Image file (Up to 10mb)
                      </p>
                      <button className="chooseBtn" onClick={() => {}}>
                        Choose File
                      </button>
                    </div>
                  </div>
                </button>
              </li>

              <li className="descriptionBox">
                <div className="titleBox">
                  <strong className="contTitle">Collection Description</strong>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                ></textarea>
              </li>

              <li className="categoryBox">
                <div className="titleBox">
                  <strong className="contTitle">Category</strong>
                </div>

                <p className="explain">
                  You can easily search by selecting a category.
                </p>

                <ul className="categoryList">
                  {categoryList.map((cont, index) => (
                    <li key={index}>{cont}</li>
                  ))}
                </ul>
              </li>

              <li className="loyaltyBox">
                <div className="titleBox">
                  <strong className="contTitle">Loyalty setting</strong>
                </div>

                <p className="explain">
                  Each time an item is resold, you can receive a certain amount
                  of commission. (up to 20%) If not set, it is set to 0%.
                </p>

                <div className="inputBox">
                  <input
                    value={loyalty}
                    onChange={(e) => setLoyalty(e.target.value)}
                    placeholder=""
                  />

                  <p className="unit">%</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="createBtnBox">
            <button className="createBtn" onClick={() => navigate(-1)}>
              Create Collection
            </button>
          </article>
        </section>
      </PcreateCollectionBox>
    );
}

const McreateCollectionBox = styled.div`
  & > .innerBox {
    border-radius: 20px;

    .topBar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 72px;
      padding: 0 20px;

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

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 4.16vw;
      padding: 8.33vw 5.55vw 16.66vw 5.55vw;

      & > .title {
        font-size: 6.66vw;
      }

      .contList {
        li {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .titleBox {
            display: flex;
            gap: 2px;

            .contTitle {
              font-size: 5vw;
            }

            .star {
              width: 4.44vw;
              height: 4.44vw !important;
            }
          }

          .explain {
            font-size: 3.88vw;
            line-height: 6.11vw;
            letter-spacing: -0.14vw;
          }

          &.logoBox {
            .logoBtn {
              width: 51.38vw;
              height: 51.38vw;
              padding: 2.22vw;
              border: dashed 2px #d9d9d9;
              border-radius: 50%;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #f6f6f6;
                border-radius: 50%;

                .initImg {
                  width: 19.44vw;
                  height: 19.44vw;
                }
              }
            }
          }

          &.nameBox {
            margin: 13.88vw 0 0 0;

            input {
              height: 13.33vw;
              padding: 0 2.77vw;
              font-size: 3.88vw;
              background-color: #f6f6f6;
              border: none;
              border-radius: 2.22vw;
              letter-spacing: -0.14vw;

              &::placeholder {
                color: #929292;
              }
            }
          }

          &.bannerBox {
            margin: 13.88vw 0 0 0;

            .bannerBtn {
              width: 100%;
              height: 52.22vw;
              margin: 1.66vw 0 0 0;
              padding: 1.38vw;
              border: dashed 2px #d9d9d9;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #f6f6f6;
                border-radius: 2.22vw;

                .initBox {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 8.33vw;

                  .limit {
                    font-size: 3.33vw;
                    color: #7b7b7b;
                  }

                  .chooseBtn {
                    width: 48.88vw;
                    height: 11.11vw;
                    font-size: 4.44vw;
                    color: #fff;
                    font-weight: 500;
                    border-radius: 11.94vw;
                    background: #c5c5c5;
                  }
                }
              }
            }
          }

          &.descriptionBox {
            margin: 13.88vw 0 0 0;

            textarea {
              height: 63.88vw;
              padding: 4.16vw 2.77vw;
              background: #f6f6f6;
              border-radius: 2.22vw;

              &::-webkit-scrollbar {
                width: 16px;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #b7b7b7;
                border-radius: 4px;
                width: 4px;
                border-left: 6px solid #f6f6f6;
                border-right: 6px solid #f6f6f6;
              }
              &::-webkit-scrollbar-track {
                background-color: #d8d8d8;
                border-radius: 4px;
                border: 6px solid #f6f6f6;
              }
            }
          }

          &.categoryBox {
            margin: 13.88vw 0 0 0;

            .categoryList {
              margin: 1.66vw 0 0 0;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 2.22vw 2.77vw;

              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40vw;
                height: 13.33vw;
                font-size: 4.44vw;
                color: #7b7b7b;
                background: #f6f6f6;
                border-radius: 11.94vw;
              }
            }
          }

          &.loyaltyBox {
            margin: 13.88vw 0 0 0;

            .inputBox {
              display: flex;
              align-items: center;
              padding: 0 5.55vw;
              height: 13.33vw;
              font-size: 4.44vw;
              background: #f6f6f6;
              border-radius: 2.22vw;

              input {
                flex: 1;
                min-width: 0;
                font-size: 4.44vw;
                background: none;
                border: none;
              }
            }
          }
        }
      }
    }

    .createBtnBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 5.55vw 13.88vw 5.55vw;

      .createBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15.55vw;
        font-size: 4.44vw;
        font-weight: 500;
        line-height: 4.44vw;
        color: #fff;
        background: #000;
        border-radius: 11.94vw;
      }
    }
  }
`;

const PcreateCollectionBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 218px 0;

  & > .innerBox {
    max-width: 800px;
    border-radius: 20px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

    .topBar {
      display: flex;
      align-items: center;
      gap: 31px;
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

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 53px 36px 38px 36px;
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;

      & > .title {
        font-size: 30px;
        line-height: 30px;
      }

      .contList {
        li {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .titleBox {
            display: flex;
            gap: 2px;

            .contTitle {
              font-size: 20px;
              line-height: 30px;
            }

            .star {
              width: 16px;
              height: 16px !important;
            }
          }

          .explain {
            font-size: 16px;
            line-height: 25px;
          }

          &.logoBox {
            .logoBtn {
              width: 185px;
              height: 185px;
              padding: 8px;
              border: dashed 2px #d9d9d9;
              border-radius: 50%;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #f6f6f6;
                border-radius: 50%;

                .initImg {
                  width: 70px;
                  height: 70px;
                }
              }
            }
          }

          &.nameBox {
            margin: 44px 0 0 0;

            input {
              height: 50px;
              padding: 0 18px 0 20px;
              font-size: 16px;
              background-color: #f6f6f6;
              border: none;
              border-radius: 8px;

              &::placeholder {
                color: #929292;
              }
            }
          }

          &.bannerBox {
            margin: 38px 0 0 0;

            .bannerBtn {
              width: 100%;
              height: 200px;
              padding: 5px;
              border: dashed 2px #d9d9d9;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #f6f6f6;
                border-radius: 8px;

                .initBox {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 30px;

                  .limit {
                    font-size: 20px;
                    color: #7b7b7b;
                  }

                  .chooseBtn {
                    width: 176px;
                    height: 50px;
                    font-size: 18px;
                    color: #fff;
                    font-weight: 500;
                    border-radius: 43px;
                    background: #c5c5c5;
                  }
                }
              }
            }
          }

          &.descriptionBox {
            margin: 38px 0 0 0;

            textarea {
              height: 134px;
              padding: 15px 14px 15px 20px;
              background: #f6f6f6;
              border-radius: 8px;

              &::-webkit-scrollbar {
                width: 16px;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #b7b7b7;
                border-radius: 4px;
                width: 4px;
                border-left: 6px solid #f6f6f6;
                border-right: 6px solid #f6f6f6;
              }
              &::-webkit-scrollbar-track {
                background-color: #d8d8d8;
                border-radius: 4px;
                border: 6px solid #f6f6f6;
              }
            }
          }

          &.categoryBox {
            .categoryList {
              margin: 12px 0 0 0;
              display: flex;
              flex-wrap: wrap;
              gap: 10px 8px;

              li {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 44px;
                padding: 0 40px;
                font-size: 16px;
                color: #7b7b7b;
                background: #f6f6f6;
                border-radius: 80px;
              }
            }
          }

          &.loyaltyBox {
            margin: 38px 0 0 0;

            .inputBox {
              display: flex;
              align-items: center;
              width: 146px;
              height: 50px;
              padding: 0 20px;
              font-size: 16px;
              background: #f6f6f6;
              border-radius: 8px;

              input {
                flex: 1;
                min-width: 0;
                font-size: 16px;
                background: none;
                border: none;
              }
            }
          }
        }
      }
    }

    .createBtnBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 134px;
      padding: 0 30px;

      .createBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 56px;
        color: #fff;
        font-size: 22px;
        font-weight: 500;
        line-height: 22px;
        background: #000;
        border-radius: 43px;
      }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection);

const categoryList = [
  "Art",
  "Music",
  "Vitual World",
  "Trading Cards",
  "Collectibles",
  "Sports",
  "Utility",
  "ETC",
];
