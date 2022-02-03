import Web3 from "web3";
import Eth from "web3-eth";
import { getuseraddress } from "../util/common";
import Caver from "caver-js";
import keccak256 from "keccak256";
import axios from "axios";

const caver = new Caver("https://api.baobab.klaytn.net:8651");
const web3 = new Web3("https://cloudflare-eth.com");
const eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8546");

export const signOrderData = async (orderData) => {
  const { klaytn } = window;
  const useraddr = getuseraddress();

  const stringified = JSON.stringify(orderData);

  const hashed = keccak256(stringified).toString("hex");

  klaytn.sendAsync(
    {
      method: "klay_sign",
      params: [useraddr, hashed],
      id: 1,
    },
    async (error, result) => {
      console.log(result);
      const v = "0x" + result.result.substring(2).substring(128, 130);
      const r = "0x" + result.result.substring(2).substring(0, 64);
      const s = "0x" + result.result.substring(2).substring(64, 128);
      console.log(v, r, s);
      try {
        if (error === null) {
        }
      } catch (error) {}
    }
  );
};

export const verifySig = (signatureObject, pubKey) => {
  const recoverStr = web3.eth.accounts.recover(signatureObject); //사인풀기
  if (recoverStr === pubKey) {
    return true;
  } else {
    return false;
  }
};
