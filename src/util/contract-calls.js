import { web3 } from "../configs/configweb3";
import { abierc20 } from "../contracts/abi/erc20";
import { abierc721extended } from "../contracts/abi/erc721extended";
import { abiadmin } from "../contracts/abi/adminconfigs";
import { LOGGER } from "./common";
import { getuseraddress } from "./common";
import SetErrorBar from "./SetErrorBar";
import { ERR_MSG } from "../config/messages";
// import { getweirep } from '../utils/eth'
// import { DebugMode } from '../configs/configs'
import { requesttransaction } from "../services/kaikas";
const jcontracts = {};
const MAP_STR_ABI = {};

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
      });
    /** 		contract[variablename].call( aargs[0] , (err,resp)=>{LOGGER('' , err,resp)
		if(err){resolve(null);return}
		resolve(resp)
	}).catch(err=>{resolve(null)})
})*/
  });
};
const query_with_arg = (jargs) => {
  // {contractaddress , methodname , aargs }=jargs
  let { contractaddress, methodname, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(abierc20, contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname](aargs)
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
};
const query_noargs = (jargs) => {
  let { contractaddress, methodname } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(abierc20, contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname]()
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
};
const query_decimals = (jargs) => {
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
};
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
export const kaikasEnabled = () => {
  if (window.klaytn) {
    return window.klaytn._kaikas.isEnabled();
  }
  return false;
};

export const call_contract = async (method, arg, targetAddr) => {
  const myAddr = getuseraddress();

  if (!myAddr) {
    SetErrorBar(ERR_MSG.ERR_PLEASE_CONNECT_WALLET);
    return;
  }

  const abistr = getabistr_forfunction({
    contractaddress: targetAddr[targetAddr.abikind],
    abikind: targetAddr.abikind,
    methodname: method,
    aargs: arg,
  });

  const resp = await requesttransaction({
    from: myAddr,
    to: targetAddr[targetAddr.abikind],
    data: abistr,
  });
  return new Promise((res, rej) => {
    if (resp) {
      res(resp);
    } else {
      rej(new Error("User denied request"));
      SetErrorBar("User denied request");
    }
  });
};
export const tx_logger = async (to, auxdata, method, txhash) => {
  let typestr = "";
  const from = getuseraddress();
  switch (method) {
    case "set_pause":
      typestr = "PAUSE";
      break;
    case "transfer":
      typestr = "TRANSFER";
      break;
    case "massTransfer":
      typestr = "MASS_TRANSFER";
      break;
    case "burn":
      typestr = "BURN";
      break;
    case "set_locked":
      typestr = "LOCK";
      break;
    case "set_timelockexpiry":
      typestr = "TIMELOCK";
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
};
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
};
export const check_owner = async () => {
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
export { access_data, query_with_arg, query_noargs, query_decimals };
