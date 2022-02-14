import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import sample from "../img/sub/sample.png";

import { useRef, useState } from "react";

function CreateCollection({ store, setConnect }) {
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
                <strong>Collection home</strong>
              </div>
              <div className="sell_wrap">
                <div className="create">
                  <h2>Create a new collection</h2>
                  <form action="">
                    <div className="form">
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
                          <div className="img logo_img">
                            <div className="line">
                              <input type="file" id="file" />
                              <label htmlFor="file">
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
                          <div className="inputbox">
                            <input
                              type="text"
                              placeholder="Example: A collection of atmospheric night view photos"
                            />
                          </div>
                        </li>
                        <li>
                          <h3>Add Collection Banner</h3>
                          <p>
                            Register the banner that will appear at the top of
                            the collection home page.
                            <br />
                            The image to characterize the collection is
                            advantageous, and if there is a lot of text, it may
                            be hard to see
                            <br /> depending on the window size.(Recommended
                            size 1400 x 300)
                          </p>
                          <div className="img">
                            <div className="line">
                              <input type="file" name id="file" />
                              <label htmlFor="file" className="file_he">
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
                          <div className="inputbox">
                            <div className="txt">
                              <textarea
                                type="text"
                                placeholder="Example: I took a picture of the night sky centered on the constellations and a night view of the city."
                              ></textarea>
                            </div>
                          </div>
                        </li>
                        <li>
                          <h3>Category</h3>
                          <p>You can easily search by selecting a category.</p>
                          <div className="cat">
                            <ul>
                              <li>
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
                              <li>
                                <span>Collectibles</span>
                              </li>
                              <li>
                                <span>Sports</span>
                              </li>
                              <li>
                                <span>Utility</span>
                              </li>
                              <li>
                                <span>ETC</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="top2">
                            <h3>Royalty setting</h3>
                            <p>
                              Each time an item is resold, you can receive a
                              certain
                              <br className="m" /> amount of commission. (up to
                              20%)
                              <br className="pc" />
                              If not set, it is set to 0%.
                            </p>
                            <div className="inputbox number percent">
                              <input
                                type="text"
                                placeholder=""
                                onKeyDown="onlyNumber(this)"
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
              <div className="create_btn mcrea">
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
