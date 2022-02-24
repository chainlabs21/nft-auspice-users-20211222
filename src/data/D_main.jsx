import category_art from "../img/main/category_art.png";
import category_music from "../img/main/category_music.png";
import category_virtualworld from "../img/main/category_virtualworld.png";
import category_tradingcards from "../img/main/category_tradingcards.png";
import category_collectibles from "../img/main/category_collectibles.png";
import category_sports from "../img/main/category_sports.png";
import category_utility from "../img/main/category_utility.png";
import category_etc from "../img/main/category_etc.png";
import users_list01 from "../img/main/users_list01.png";
import users_list02 from "../img/main/users_list02.png";
import users_list03 from "../img/main/users_list03.png";
import users_list04 from "../img/main/users_list04.png";

export const D_categoryList = [
  {
    img: category_art,
    text: "Digital Art",
    state: "Art",
    code: "art"
  },
  {
    img: category_music,
    text: "Music",
    state: "Music",
    code:"Music"
  },
  {
    img: category_virtualworld,
    text: "Virtual World",
    state: "Virtual World",
    code: "virtual world"
  },
  {
    img: category_tradingcards,
    text: "Trading Cards",
    state: "Trading Cards",
    code: "trading cards"
  },
  {
    img: category_collectibles,
    text: "Collectibles",
    state: "Collectibles",
    code: "collectibles"
  },
  {
    img: category_sports,
    text: "Sports",
    state: "Sports",
    code: "sports"
  },
  {
    img: category_utility,
    text: "Utility",
    state: "Utility",
    code: "utility"
  },
  {
    img: category_etc,
    text: "ETC",
    state: "ETC",
    code: "etc"
  },
];

export const D_Tips = [
  {
    img: users_list01,
    title: "Basic Guide",
    explain: "Before Participating in NFT Collection",
  },
  {
    img: users_list02,
    title: "Buy NFTs",
    explain: "Discover and buy promising NFTs",
  },
  {
    img: users_list03,
    title: "production and sales",
    explain: "Easy-to-follow NFT production and sales",
  },
  {
    img: users_list04,
    title: "Itemverse Market",
    explain: "5 reasons to sell your NFTs on Itemverse",
  },
];

export const D_navList = [
  {
    title: "MARKET",
    detailNav: [
      { text: "All about NFT", url: "/marketplace", code: "all" },
      { text: "Digital art", url: "/marketplace", code: "art" },
      { text: "Trading cards", url: "/marketplace", code: "trading cards" },
      { text: "Music", url: "/marketplace", code: "Music" },
      { text: "Virtual worlds", url: "/marketplace", code: "virtual world" },
      { text: "Utility", url: "/marketplace", code: "utility" },
      { text: "Sports", url: "/marketplace", code: "sports" },
      { text: "ETC", url: "/marketplace", code: "etc" },
    ],
  },
  {
    title: "MY ACCOUNT",
    detailNav: [
      { text: "Profile Setting", url: "/searchwallet" },
      //{ text: "My Collection", url: "/" },
      { text: "My Favourite", url: "/liked" },
      { text: "Account Setting", url: "/generalsettings" },
    ],
  },
  {
    title: "EXPLORE",
    detailNav: [
      { text: "User Ranking", url: "/ranking" },
      { text: "Transaction details", url: "/exploredeal" },
    ],
  },
];
