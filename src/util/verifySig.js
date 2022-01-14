import Web3 from "web3";
import Eth from "web3-eth";
const web3 = new Web3("https://cloudflare-eth.com");

const eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8546");

export const signOrderData = async (orderData) => {
  const encoded = web3.eth.abi.encodeParameters(
    ["address", "uint"],
    [orderData.originator, orderData.numCopies]
  );

  const privateKey =
    "0x4eea1133bce8837e6b37088fd5f21364b33685c2dd685b01db6b8cfac93ba5e4";
  const signatureObject = web3.eth.accounts.sign(
    web3.utils.sha3(encoded),
    privateKey
  );
  return new Promise((res, rej) => {
    if (signatureObject) {
      res(signatureObject);
    } else {
      rej(null);
    }
  });
};

export const verifySig = (signatureObject, pubKey) => {
  const recoverStr = web3.eth.accounts.recover(signatureObject); //사인풀기
  if (recoverStr === pubKey) {
    return true;
  } else {
    return false;
  }
};
