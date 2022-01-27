import { web3 } from "../config/configweb3";
// import { abierc20 } from "../contracts/abi/erc20";
// import { abierc721extended } from "../contracts/abi/erc721extended";
// import { abiadmin } from "../contracts/abi/adminconfigs";
import { LOGGER } from "./common";
import { getuseraddress } from "./common";
import SetErrorBar from "./SetErrorBar";
import { ERR_MSG, messages } from "../config/messages";
import sha256 from 'js-sha256'
import { abi as abi_admin } from '../contracts-abi/IAdmin'
import { abi as abi_erc1155 } from '../contracts-abi/IERC1155'
import { abi as abi_auction_repo_dutch_bulk } from '../contracts-abi/IAuctionRepoDutchBulk'
import { abi as abi_auction_repo_english } from '../contracts-abi/IAuctionRepoEnglish'

import { abi as abi_matcher_simple } from '../contracts-abi/IMatcher-simple'
// import { getweirep } from '../utils/eth'
// import { DebugMode } from '../configs/configs'
// import { requesttransaction } from "../services/kaikas"
import Caver from 'caver-js'
let caver 
if ( window.klaytn ){	caver = new Caver ( window.klaytn ) }
else { caver = null }
const jcontracts = {};
const MAP_STR_ABI = {
		ADMIN : abi_admin
	, ERC1155 : abi_erc1155
	, AUCTION_DUTCH_BULK : abi_auction_repo_dutch_bulk
	, AUCTION_ENGLISH : abi_auction_repo_english
	, MATCHER_SIMPLE : abi_matcher_simple
}
const query_noarg = jargs=>{ // {contractaddress , abikind , methodname  }=
	let {contractaddress , abikind , methodname  }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	let sig = sha256 (contractaddress + methodname )
	if( jcontracts[ sig ]){ 
		contract = jcontracts[ sig ] }
	else {
		contract = new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    
		jcontracts[ sig ] = contract 
	}
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ]( ).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_noargs = query_noarg
const query_with_arg = jargs=> {  // {contractaddress , methodname , aargs }=jargs
	let { contractaddress , abikind , methodname , aargs }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	let sig = sha256 (contractaddress + methodname )
	if( jcontracts[ sig ]){ 
		contract=jcontracts[ sig ] }
	else {
		contract = new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    
		jcontracts[ sig ] = contract 
	}
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](	... aargs		).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const getabistr_forfunction = (jargs) => {
  let { contractaddress, abikind, methodname, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return contract.methods[methodname](...aargs).encodeABI();
};
const requesttransaction=async jdata=>{
	if ( caver ){}
	else {
		SetErrorBar( messages.MSG_PLEASE_CONNECT_TO_WALLET )
		LOGGER(`caver not found` ); return null 
	}
	let { from , to , data , value } = jdata
	let resp = await caver.klay.sendTransaction ({
		from // : myaddress
		, to // : ADDRESSES.erc20 // ''
		, data // : abistr
		, value // : '0x00'
		, gas: 250000, // 25000
	})
	return resp
}
const query_eth_balance = useraddress =>{
	return new Promise((resolve,reject)=>{
		web3.eth.getBalance( useraddress ).then(resp=>{
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
export {
	getabistr_forfunction
	, requesttransaction
	, query_eth_balance
}
export const kaikasEnabled = () => {
  if (window.klaytn) {
    return window.klaytn._kaikas.isEnabled();
  }
  return false;
};
/** export const tx_logger = async (to, auxdata, method, txhash) => {
  let typestr = "";
  const from = getuseraddress();
  switch (method) {
    case "set_pause":
      typestr = "PAUSE";
      break;
    default:
      typestr = "NONE";
  }
  const log = {
    _from: from,
    _to: to,
    status: 1,
    typestr: typestr,
    auxdata: JSON.stringify(auxdata),
  };
  try {
    const resp = await axios.post(API.API_TX + `/${txhash}`, log);
    return resp;
  } catch (error) {
    console.log(error);
  }
} */
export const call_contractValue = async (method, targetAddr, args = []) => {
  let resp;
  if (args.length > 0) {
    resp = await query_with_arg({
      contractaddress: targetAddr[targetAddr.abikind],
      abikind: targetAddr.abikind,
      methodname: method,
      aargs: args,
    });
  } else {
    resp = await query_noarg({
      contractaddress: targetAddr[targetAddr.abikind],
      abikind: targetAddr.abikind,
      methodname: method,
    });
  }
  return new Promise((res, rej) => {
    if (resp !== undefined) {
      res(resp);
    } else {
      rej(new Error("Can't receive data from contract"));
    }
  });
}
const query_nfttoken_balance = ( contractaddress , address , tokenid )=>{
	query_with_arg({ contractaddress , abikind : 'ERC1155' 
		, methodname : 'balanceOf' , aargs : [ address , tokenid ] 
	}).then(resp=>{
		return new Promise ( (resolve,reject)=>{
			if (resp){resolve( resp ) }
			else {resolve ( null )}
		})
	}) //	function balanceOf(address _owner, uint256 _id) external view returns (uint256)
}

export { // access_data	,
	 query_with_arg
	, query_noargs
	, query_noarg	
	, query_nfttoken_balance
//	, query_decimals 
};
/**
 * export const check_owner = async () => {
  try {
    const resp = await call_contractValue("owner", ADDRESSES);
    const userAddr = getuseraddress();
    return new Promise((res, rej) => {
      if (resp.toLowerCase() !== userAddr.toLowerCase()) {
        return rej(false);
      } else {
        return res(true);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
   const access_data = (jargs) => {
  let { contractaddress, variablename, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(abierc20, contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[variablename](aargs[0])
      .call((err, resp) => {
        LOGGER("", err, resp);
        if (err) {
          resolve(null);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });    /** 		contract[variablename].call( aargs[0] , (err,resp)=>{LOGGER('' , err,resp)		if(err){resolve(null);return}		resolve(resp)}).catch(err=>{resolve(null)})})
  });
}; */
/**const query_decimals = (jargs) => {
  let { contractaddress } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(abierc20, contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods
      .decimals()
      .call((err, resp) => {
        LOGGER("", err, resp);
        if (err) {
          resolve(null);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
}; */
/**  export const call_contract = async (method, arg, contractaddress ) => { // targetAddr
  const myAddr = getuseraddress();
  if (!myAddr) {
    SetErrorBar(ERR_MSG.ERR_PLEASE_CONNECT_WALLET);
    return;
  }
  const abistr = getabistr_forfunction({
    contractaddress , // : targetAddr[targetAddr.abikind],
    abikind: targetAddr.abikind ,
    methodname: method,
    aargs: arg,
  });
  const resp = await requesttransaction({
    from: myAddr,
    to: targetAddr[targetAddr.abikind],
		data: abistr,
		value : '0x00'
  });
  return new Promise((resolve , reject ) => {
    if (resp) {
      resolve (resp);
    } else {
      resolve ( null ) // new Error("User denied request"));
      SetErrorBar("User denied request");
    }
  });
}; */
