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

const fakeWalletAddress = "0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed";
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
