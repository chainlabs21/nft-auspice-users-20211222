 import Web3 from "web3";
import Eth from "web3-eth";

import { getuseraddress } from "../util/common";
import Caver from "caver-js";

import keccak256 from "keccak256";
import axios from "axios";


// const caver = new Caver("https://api.baobab.klaytn.net:8651" );
//const web3 = require ( '../config/configweb3' ) // new Web3(" https://cloudflare-eth.com");
// const eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8546");
//const eth = new Eth(Eth.givenProvider)
//const caver = new Caver(window.klaytn)

export const signOrderData =  (orderData) => {
  const { klaytn } = window;
  const caver = new Caver(klaytn)
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
	const { klaytn, ethereum } = window;
	const web3 = new Web3(ethereum)
  const recoverStr = web3.eth.accounts.recover(signatureObject); //사인풀기
  if (recoverStr === pubKey) {
    return true;
  } else {
    return false;
  }
};

export const writeSig = async (maker, message)=>{
	const { klaytn, ethereum } = window;
  const web3 = new Web3(klaytn)
//   const encoded = web3.eth.abi.encodeParameters(['address', 'uint', 'string'], [maker, type, message])
//   console.log(encoded)
//   const priKey = "0xcaceedbd0912a415744beaea5cf3f2fbca535ca7ccbe0dc780ac005488657132"; //개인키 (maker만 가짐)
// const pubKey = "0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed"; //주소(공개키로 쓰임, maker와 taker 모두 가짐(전송교환했다고 가정))
//   const signatureObject = web3.eth.accounts.sign(web3.utils.sha3(encoded), priKey)
	console.log(maker)
	console.log(message)
	// const msgParams=JSON.stringify({
		
<<<<<<< HEAD
	// })
=======
	})
	//web3.eth.
	

>>>>>>> 71b890109321f7ec39a37ed29ddc4903c033d997
	// web3.currentProvider.sendAsync({
	// 	method: "eth_signTypedData_v4",
	// 	params: [maker, message],
	// 	from: maker
	// })
<<<<<<< HEAD
	const msg=`\n\n 서명을 하시어 Artube 이용약관에 동의해주세요. \n\n 이 과정은 블록체인 트랜잭션을 일으키거나, 가스비가 소모되지 않습니다. \n\n 계정 인증은 24시간 후, 말소됩니다. \n\n 지갑 주소: \n${maker}\n\nNonce:\n${message}`;
	const msgg = `Welcome ${maker} \n\n ${message}`

	const hashed= keccak256(msgg);
	console.log(hashed)
	const signedMsg = await caver.klay.sign(hashed.toString(), maker)
	console.log(signedMsg)
	console.log(caver.utils.recover(hashed.toString(), signedMsg))

	//return signatureObject
	//new Caver().klay.sign(_hashed.toString(), maker).then(console.log)
=======
	//const signedMsg = await caver.klay.sign(message, maker)

	//return signatureObject
};

export const klaywriteSig = async (maker, type, msg)=>{

	const {klaytn} = window;
	const caver = new Caver(klaytn);

	caver.klay.sign(msg, maker);
>>>>>>> 71b890109321f7ec39a37ed29ddc4903c033d997
};


