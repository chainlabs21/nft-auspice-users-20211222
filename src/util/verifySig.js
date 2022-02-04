// import Web3 from "web3";
import Eth from "web3-eth";
import { getuseraddress } from "../util/common";
import Caver from "caver-js";
import keccak256 from "keccak256";
import axios from "axios";

// const caver = new Caver("https://api.baobab.klaytn.net:8651" );
const web3 = require ( '../config/configweb3' ) // new Web3(" https://cloudflare-eth.com");
// const eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8546");

export const signOrderData =  (orderData) => {
  const { klaytn } = window;
  const useraddr = getuseraddress();
  const rawdata_to_sign = JSON.stringify(orderData);
	const rawdatahash = keccak256(rawdata_to_sign).toString("hex");
	return new Promise ( (resolve,reject)=>{
		klaytn.sendAsync(
			{
				method: "klay_sign",
				params: [useraddr, rawdatahash],
				id: 1,
			},
			(error, result) => {			console.log( error , result);			
				if (error){ resolve(null) ; return }
				if ( result.error && result.error.code ){ resolve(null) ; return }
				const sig_v = "0x" + result.result.substring(2).substring(128, 130);
				const sig_r = "0x" + result.result.substring(2).substring(0, 64);
				const sig_s = "0x" + result.result.substring(2).substring(64, 128);
//				console.log(v, r, s);
				resolve ( { sig_r,sig_s,sig_v, rawdata_to_sign , rawdatahash , signaturestr : result.result })
				try {        if (error === null) {        }
				} catch (error) {}
			}
		);
	})
};

export const verifySig = (signatureObject, pubKey) => {
  const recoverStr = web3.eth.accounts.recover(signatureObject); //사인풀기
  if (recoverStr === pubKey) {
    return true;
  } else {
    return false;
  }
};
