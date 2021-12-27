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
import { useState } from "react";

function CreateItem({ store, setConnect }) {
  const navigate = useNavigate();

  const [item, setItem] = useState("");

  function onChangeItem(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setItem(reader.result);
    };
  }

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
                                onChange={(e) =>
                                  onChangeItem(e.target.files[0])
                                }
                              />

                              <label
                                for="file"
                                style={{
                                  padding: item && 0,
                                }}
                              >
                                {item ? (
                                  <img src={item} alt="" />
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
                          <h3>
                            Name{" "}
                            <img
                              src={require("../img/sub/star.png").default}
                              alt=""
                            />
                          </h3>
                          <div class="inputbox">
                            <input
                              type="text"
                              placeholder="Example: A item of atmospheric night view photos"
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
                                placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                              ></textarea>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Unlocked content</h3>
                            <div class="toggle">
                              <input type="checkbox" name="" id="toggle" />
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
                            />
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Freezing metadata</h3>
                            <div class="toggle">
                              <input type="checkbox" name="" id="toggle2" />
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
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div class="create_btn">
                <a onClick={() => navigate(-1)}>Create Item</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
