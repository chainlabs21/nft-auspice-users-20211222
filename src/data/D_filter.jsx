import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import rock from "../img/sub/rock.png";

export const D_statusList = [
  { key: "Buy Now", id: "buynow", value: 4 },
  { key: "On Auction", id: "onauction",value: 8 },
  { key: "New", id: "new",value: 1 },
  { key: "Has Offers", id: "hasoffers",value: 2 },
]
  
  
  export const D_SStatusList = {
    "Buy Now":{ id: "buynow", value: 4 },
    "On Auction":{id: "onauction",value: 8 },
    "New":{id: "new",value: 1 },
    "Has Offers":{id: "hasoffers",value: 2 },
  };

export const D_transactionStatusList = [
  { key: "Listing", value: 1 },
  { key: "Sale", value: 2 },
  { key: "Bid", value: 4 },
];

export const D_filterList = [
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
];

export const D_chainList = [
  {
    img: rock,
    name: "Klaytn",
  },
];
export const D_coinList = ["Klay"];
