import moment from "moment";
import faker from "faker";

const categoryList = [
  "Art",
  "Music",
  "Virtual World",
  "Trading Cards",
  "Collectibles",
  "Sports",
  "Utility",
  "ETC",
];

const fakeWalletAddress = "0xb854baeb10740d5736e06c119e132bfa7d617e70";
export const generateItems = (count) => {
  const temp = [];

  for (let i = 0; i < count; i++) {
    const randNum = Math.floor(Math.random() * 8);
    const randCate = [];
    randCate.push(categoryList[randNum]);
    const items = {
      id: i,
      createdat: moment().format("YYYY-MM-DD"),
      updatedat: null,
      itemid: faker.company.companyName(),
      is1copyonly: 1,
      countcopies: 0,
      owner: faker.name.findName(),
      imgsrc: faker.image.image(),
      author: "",
      authorfee: 30,
      countfavors: Math.floor(Math.random(3000) * 10000),
      type: 1,
      typestr: "?",
      tokenid: "1",
      decimals: 18,
      totalSupply: 20000000000,
      uuid: i,
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: Math.floor(Math.random() * 100 + 1),
      categorystr: randCate,
      status: [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)],
      chains: "Klaytn",
      salescoin: "Klay",
    };
    temp.push(items);
  }
  return temp;
};

export const singleItem = {
  id: 1,
  auctionExpiry: moment().add(12, "hours").add(10, "seconds").format(),
  // auctionExpiry: moment().format(),
  currentBid: 2.867,
  currentUSD: 1234.25,
  likerList: [
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
    },
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
    },
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
    },
  ],
  ownerList: [
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
      itemCount: Math.floor(Math.random() * 50),
    },
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
      itemCount: Math.floor(Math.random() * 50),
    },
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
      itemCount: Math.floor(Math.random() * 50),
    },
    {
      name: faker.name.findName(),
      address: "0xaeC2f4Dd8b08EeF0C71B02F97978106D875463Ed",
      itemCount: Math.floor(Math.random() * 50),
    },
  ],
  fragmentCount: 30,
  views: 1100000,
  desc: "This is a collection of digitals produced on April 28th, with beautiful night views. It's about the harmony of neon signs. It's an expresstion of modern art. on April 28th, with beautiful night views. It's about the harmony of neon signs. It's an expresstion of modern art.",
  priceHistory: [],
  offerHistory: [
    {
      name: faker.name.findName(),
      tokenprice: (Math.random() * 10).toFixed(2),
      address: fakeWalletAddress,
      createdat: moment().format("hh:mm"),
    },
    {
      name: faker.name.findName(),
      tokenprice: (Math.random() * 10).toFixed(2),
      address: fakeWalletAddress,
      createdat: moment().format("hh:mm"),
    },
    {
      name: faker.name.findName(),
      tokenprice: (Math.random() * 10).toFixed(2),
      address: fakeWalletAddress,
      createdat: moment().format("hh:mm"),
    },
    {
      name: faker.name.findName(),
      tokenprice: (Math.random() * 10).toFixed(2),
      address: fakeWalletAddress,
      createdat: moment().format("hh:mm"),
    },
  ],
  salesStatus: [
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      seller: faker.name.findName(),
      expired: moment().add(6, "days").format(),
      kind: "Purchase",
    },
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      seller: faker.name.findName(),
      expired: moment().add(6, "days").format(),
      kind: "Purchase",
    },
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      seller: faker.name.findName(),
      expired: moment().add(6, "days").format(),
      kind: "Purchase",
    },
  ],
  purchaseStatus: [
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      buyer: faker.name.findName(),
      expired: moment().add(3, "days").format(),
    },
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      buyer: faker.name.findName(),
      expired: moment().add(3, "days").format(),
    },
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      buyer: faker.name.findName(),
      expired: moment().add(3, "days").format(),
    },
    {
      tokenprice: (Math.random() * 10).toFixed(2),
      priceusd: (Math.random() * 100 + 3).toFixed(2),
      buyer: faker.name.findName(),
      expired: moment().add(3, "days").format(),
    },
  ],
  transactionHistory: [
    {
      event: "sale",
      tokenprice: (Math.random() * 10).toFixed(2),
      date: moment().add(3, "months").format(),
      from: fakeWalletAddress,
      to: fakeWalletAddress,
      chainOn: false,
    },
    {
      event: "sale",
      tokenprice: (Math.random() * 10).toFixed(2),
      date: moment().add(3, "months").format(),
      from: fakeWalletAddress,
      to: fakeWalletAddress,
      chainOn: true,
    },
    {
      event: "purchase",
      tokenprice: (Math.random() * 10).toFixed(2),
      date: moment().add(3, "months").format(),
      from: fakeWalletAddress,
      to: fakeWalletAddress,
      chainOn: true,
    },
    {
      event: "sale",
      tokenprice: (Math.random() * 10).toFixed(2),
      date: moment().add(3, "months").format(),
      from: fakeWalletAddress,
      to: fakeWalletAddress,
      chainOn: false,
    },
  ],
  chainInformation: [
    {
      contract: fakeWalletAddress,
      tokenId: fakeWalletAddress,
      chain: "klaytn",
    },
  ],
};
