import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

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
import { useRef, useState } from "react";

function EditCollection({ store, setConnect }) {
  const navigate = useNavigate();
  const logoRef = useRef();

  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [categoryObj, setCategoryObj] = useState({});
  const [flag, setFlag] = useState(false);

  function onChangeLogo(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setLogo(reader.result);
    };
  }

  function onChangeBanner(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setBanner(reader.result);
    };
  }

  function onClickCategory(category) {
    let dataObj = categoryObj;

    if (dataObj[category]) delete dataObj[category];
    else dataObj[category] = true;

    setCategoryObj(dataObj);
    setFlag(!flag);
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
                <strong>Collection home</strong>
              </div>
              <div class="sell_wrap">
                <div class="create">
                  <h2>Edit Collection</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <h3>
                            Logo{" "}
                            <img
                              src={require("../img/sub/star.png").default}
                              alt=""
                            />
                          </h3>
                          <p>
                            Register the collection logo. Please select an image
                            file.
                            <br />
                            Square image (recommended size 350 x 350)
                          </p>
                          <div class="img logo_img">
                            <div class="line">
                              <input type="file" name="" id="file" />
                              <label for="file">
                                <img
                                  src={
                                    require("../img/sub/logo_img.png").default
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </li>
                        <li>
                          <h3>
                            Collection name{" "}
                            <img
                              src={require("../img/sub/star.png").default}
                              alt=""
                            />
                          </h3>
                          <div class="inputbox">
                            <input
                              type="text"
                              placeholder="Example: A collection of atmospheric night view photos"
                            />
                          </div>
                        </li>
                        <li>
                          <h3>Add Collection Banner</h3>
                          <p class="topno">
                            Register the banner that will appear at the top of
                            the collection home page.
                            <br />
                            The image to characterize the collection is
                            advantageous, and if there is a lot of text, it may
                            be hard to see
                            <br /> depending on the window size.(Recommended
                            size 1400 x 300)
                          </p>
                          <div class="img">
                            <div class="line">
                              <input type="file" name id="file" />
                              <label for="file" class="file_he">
                                <p>
                                  JPG , PNG, ICO etc. Image file (Up to 10mb)
                                </p>
                                <button>Choose File</button>
                              </label>
                            </div>
                          </div>
                        </li>
                        <li>
                          <h3>Collection Description</h3>
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
                          <h3>Category</h3>
                          <p class="topno">
                            You can easily search by selecting a category.
                          </p>
                          <div class="cat">
                            <ul>
                              <li class="ca">
                                <span>Art</span>
                              </li>
                              <li>
                                <span>Music</span>
                              </li>
                              <li>
                                <span>Vitual World</span>
                              </li>
                              <li>
                                <span>Trading Cards</span>
                              </li>
                              <li class="ca">
                                <span>Collectibles</span>
                              </li>
                              <li>
                                <span>Sports</span>
                              </li>
                              <li class="ca">
                                <span>Utility</span>
                              </li>
                              <li>
                                <span>ETC</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div class="top2">
                            <h3>Loyalty setting</h3>
                            <p>
                              Each time an item is resold, you can receive a
                              certain amount of commission. (up to 20%)
                              <br />
                              If not set, it is set to 0%.
                            </p>
                            <div class="inputbox number percent">
                              <input
                                type="text"
                                placeholder=""
                                onkeydown="onlyNumber(this)"
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
              <div class="create_btn side">
                <a onClick={()=>navigate(-1)} class="ls">
                  Save
                </a>
                <a onClick={()=>navigate(-1)} class="rs">
                  Delete collection
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);

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
