import mnemonicwords from "mnemonic-words";
const LOGGER = console.log
const STRINGER=JSON.stringify
const PARSER=JSON.parse
const ISFINITE=Number.isFinite
function generaterandomstr (length) {
  var result           = '';  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {     result += characters.charAt(Math.floor(Math.random() * charactersLength))  }
  return result
}
const getrandomint = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomElementsFromArray = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
const getrandomwords = (N) => {
  return getRandomElementsFromArray(mnemonicwords, N);
};
const getuseraddress = () => {
  return window.klaytn ? window.klaytn.selectedAddress : null;
  // return window.ethereum ? window.ethereum.selectedAddress : null;
};
const getmyaddress = getuseraddress
export const encodeBase64ImageFile = (image) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    // convert the file to base64 text
    reader.readAsDataURL(image);
    // on reader load somthing...
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const encodeBase64File = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    // convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export { LOGGER,
	STRINGER 
	, PARSER
	, ISFINITE
	, generaterandomstr
	, getrandomint, getRandomElementsFromArray, getrandomwords 
	, getuseraddress
	, getmyaddress
}
