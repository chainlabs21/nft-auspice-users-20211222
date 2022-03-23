import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useState, useEffect, useLayoutEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Marketitembox from "../../components/market/Marketitembox"

import axios from 'axios'
export default function MarketPlace({itemSort}) {
  
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

 // const history = useHistory();
  const location = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  let loadingBusy = false;
  let itemIndex = 0;
  let itemList = [];
  const [toggleFilter, setToggleFilter] = useState(false);
  const [itemFilterPopup, setItemFilterPopup] = useState(false);
  const [sortPopup, setSortPopup] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams({})
  const [category, setCategory] = useState();
  const [filteredList, setFilteredList] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [searchKey, setSearchKey] = useState(params.searchKey);
  const {marketFilter} = useSelector((state) => state.filter);
  const searchKeyy = useSelector((state)=>state.filter.search) 
  const [fromHeader, setFromHeader] = useState('');
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1])
  const [iindex, setiindex] = useState(0)
  const [filters, setFilters] = useState()
  const [filterprops, setFilterprops] =useState()
  const [itemSort, setItemSort] =useState(0);
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [categoryPopup, setCategoryPopup] = useState(false)
  const [categoryGroup, setCategoryGroup] = useState([])

  function sortingmachine(a, b){
    if (itemSort===0){
      return (b.item.id - a.item.id)
    }else if (itemSort === 1){
    return (b.item.countfavors - a.item.countfavors)
    }else if(itemSort ===2){

    }else if(itemSort ===3){
      return (b.item.pricemax - a.item.pricemax)
    }else if(itemSort ===4){
      return (b.item.pricemin - a.item.pricemin)
    }else if(itemSort ===5){
      
    }
    else if(itemSort ===6){
      
    }
    else if(itemSort ===7){
      return (b.item.countviews - a.item.countviews)
    }else if(itemSort ===8){
      return (a.item.id - b.item.id)
    }else{
      return a, b
    }
  }

//GET CATEGORIES
  if (isMobile)
    return (
      <>
        <MMarketitemList>
          <section className="innerBox">
            <ul className="itemList">
              {filteredList
              .sort(sortingmachine)
              .map((v, i) => (
                <Marketitembox cont={v} index={i} address={v.item.author}/>
              ))}
              {(iindex<totalItem)?(<button className="more" onClick={()=>{handleMore()}}>MORE</button>):(<>{iindex} 중에 {totalItem}</>)}
            </ul>
          </section>
        </MMarketitemList>
      </>
    );
  else
    return (
      <>

        <PMarketitemList>
            <ul className="itemList">
            {(filteredList.length==0) && 
                ('검색 결과가 없습니다.')
                }
              {filteredList
              .sort(sortingmachine)
              .map((v, i) => (
                <Marketitembox cont={v} index={i} address={v.item.author}/>
              ))}
              {(iindex<totalItem)?(<button className="more" onClick={()=>{handleMore()}}>MORE</button>):(<>{iindex} 중에 {totalItem}</>)}
            </ul>
            <div ref={setTarget}>
              {isLoaded && 'Loading'}
            </div>
        </PMarketitemList>
      </>
    );
}

const MMarketitemList = styled.div`
  

    .itemList {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      margin: 5.55vw 0 0 0;
      

      .itemBox {
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: flex-end;
        height: 125.83vw;
        color: #fff;
        border-radius: 5.55vw;
        overflow: hidden;
        cursor: pointer;

        .imageBox{
          background-repeat: "no-repeat";
          background-position: "center";
          background-size: "cover";
          //object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
          height: 100%;
          width: 100%;

        }

        .infoBox {
          z-index: 5;
          width: 100%;
          padding: 5.5vw 4.4vw;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(84, 84, 84, 0.3)
          );

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
              width: 5.5vw;
            }

            .likeBtn {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 3.88vw;
              font-weight: 500;
              line-height: 3.88vw;
              color: #fff;
            }

            .bookmarkBtn {
            }
          }

          .title {
            margin: 10px 0 0 0;
            font-size: 7.22vw;
            font-weight: 500;
            line-height: 10vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .nickname {
            margin: 0.83vw 0 0 0;
            font-size: 5vw;
            font-weight: 500;
          }

          .etcBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 6.66vw;
            margin: 1.66vw 0 0 0;

            .time {
              font-size: 3.88vw;
              font-weight: 500;
              color: #e5e5e5;
            }

            .priceBox {
              font-size: 5vw;
            }
          }
        }
      }
      .more{
        font-size: 48px;
              font-weight: 500;
              justify-content: center;
        align-items: center;
        color: white;
        display: flex;
      flex-wrap: wrap;
      margin: 32px auto;
      width: 100%;
      border-radius: 28px;
      background: #000;
      }
    }
`;

const PMarketitemList = styled.div`

    .itemList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin: 50px 0 0 0;

      .itemBox {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 308px;
        min-width: 308px;
        height: 404px;
        color: #fff;
        border-radius: 20px;
        overflow: hidden;
        cursor: pointer;
        
        .imageBox{

          //background-repeat: "no-repeat";
          //background-position: "center";
          //background-size: "cover";
          //object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
          height: 100%;
          width: 100%;

        }

        .infoBox {
          z-index: 9;
          width: 100%;
          padding: 16px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(84, 84, 84, 0.3)
          );

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
              width: 20px;
            }

            .likeBtn {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              font-weight: 500;
              line-height: 14px;
              color: #fff;
            }

            .bookmarkBtn {
            }
          }

          .title {
            margin: 10px 0 0 0;
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .nickname {
            margin: 4px 0 0 0;
            font-size: 14px;
            font-weight: 500;
          }

          .etcBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 22px;
            margin: 12px 0 0 0;

            .time {
              font-size: 14px;
              font-weight: 500;
              color: #e5e5e5;
            }

            .priceBox {
              font-size: 18px;
            }
          }
        }
      }
      .more{
        font-size: 48px;
              font-weight: 500;
              justify-content: center;
        align-items: center;
        color: white;
        display: flex;
      flex-wrap: wrap;
      margin: 32px auto;
      width: 100%;
      border-radius: 28px;
      background: #000;
      }
    }
  
`;
