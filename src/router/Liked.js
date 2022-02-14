import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import { useState, useEffect } from "react";
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




// import "./css/style01.css";// import "./css/style02.css";



import Myprofcommonheader from "../components/Myprofcommonheader";
import { applytoken } from "../util/rest";
import { API } from "../config/api";
import { LOGGER, getmyaddress } from "../util/common";
import { putCommaAtPrice } from "../util/Util";

function Liked({ store, setConnect }) {
  const navigate = useNavigate();
  let axios = applytoken();
  let myaddress = getmyaddress();
  let [list, setlist] = useState([]);
  useEffect((_) => {
    axios
      .get(
        API.API_USER_FAVORITES +
        `/username/${myaddress}/0/100/id/DESC`,
        { params: { itemdetail: 1 } }
      )
      .then((resp) => {
        LOGGER("", resp.data);
        let { status ,list} = resp.data;
        if (status == "OK") {
          setlist(list);
        }
      });
  }, []);
  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home">
          <div className="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />
            <Myprofcommonheader />
            
            <div className="move off">
              <div className="right_move">
                <div className="real_sec">
                  <ul className="tab">
                    <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li className="onn">Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li onClick={() => navigate("/referals")}>Referals</li>
                  </ul>

                  <div className="move_item" style={{ marginBottom: "100px" }}>
                    <ol className="item move_li">
                      <div>
                        <span>
                          {list.map((elem, idx) => (
                            <li key={idx}>
                              <a
                                onClick={() =>
                                  navigate(`/singleitem?itemid=${elem.itemid}`)
                                }
                                style={{ backgroundImage: `url(${elem.item.url})` }}
                              >
                                <div className="on">
                                  <ul>
                                    <li className="heart on">{putCommaAtPrice(elem.item.countfavors)}</li>
                                  </ul>
                                  <span>{elem.item.nickname} </span>
                                  <div>{elem.item.titlename}</div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </span>
                      </div>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .item {
    div {
      span {
        li {
          a {
            & > .on {
              height: 138px;
              padding-bottom: 25px;

              ul {
                font-size: 14px;
              }

              span {
                margin: 11px 0 0 0;
                font-size: 18px;
                line-height: 24px;
              }

              div {
                margin: 4px 0 0 0;
                font-size: 22px;
                line-height: 30px;
              }
            }
          }
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Liked);
