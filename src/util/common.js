import mnemonicwords from "mnemonic-words";
import SetErrorBar from '../util/SetErrorBar'
const LOGGER = console.log
const STRINGER=JSON.stringify
const PARSER=JSON.parse
const ISFINITE=Number.isFinite
const moment=require('moment')
const KEYS=Object.keys

const get_last_part_of_path = str=>{
	return str.substr(str.lastIndexOf('/')+1)
}
let EPOCHYEAR = 1970; //		const diff_cal_unix=(d0,d1)=>{
const gettimestr= str =>{
	return moment( str).format( 'YYYY-MM-DD HH:mm:ss' )
}
const get_deltatime_tkns_unixarg = unixtime01 =>{ // assumed  a future time point
// 	moment(		moment(itemData.sale.expirychar).diff(moment())	).format("YYYY-MM-DD HH:mm:ss")
	let dtimestr = moment.unix ( ( moment.unix ( +unixtime01) - moment().unix() ) / 1000 ).format( "YYYY-MM-DD HH:mm:ss" )
	let atkns = dtimestr.split( /[-\s:]/ )
	atkns[0] = 0 // +atkns[0] - EPOCHYEAR;
	atkns[1] = +atkns[1] - 1
	atkns[2] = +atkns[2] - 1 //	setdeltatime(atkns)
	return atkns
}
const get_deltatime_str= unixtime01=>{ LOGGER( 'uK0U16mQDC' , unixtime01 ) 
	if ( unixtime01 && ISFINITE (+unixtime01)){}
	else {return null }
	let atkns = get_deltatime_tkns_unixarg ( unixtime01 )
	return `${atkns[0]}년 ${atkns[1]}월 ${atkns[2]}일 ${atkns[3]}시 ${atkns[4]}분 ${atkns[5]}초`
}
const getMaxMinAvg = arr => {
	 if ( arr && arr.length ){}
	 else {return [ null , null , null ]}
	let max = arr[0];
	let min = arr[0];
	let sum = arr[0];
	for (var i = 1; i < arr.length; i++){
		if (arr[i] > max){
			max = arr[i]
		}
		if (arr[i] < min){
			min = arr[i];
		}
		sum = sum + arr[i];
	}
	return [max, min, sum / arr.length ]
}
function onClickCopy ( copyText ) {
	const textArea = document.createElement("textarea");
	document.body.appendChild(textArea);
//	const copyText = `${url}/${document.location.hash}`;
	textArea.value = copyText;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
	SetErrorBar("Link Copied!");
}
const conv_bp_percent=arg=>ISFINITE(+arg) ? (+arg/100).toFixed(1) : null
const conv_percent_bp = arg=>parseInt(( arg * 100).toFixed(0))
const convaj=(arr,keyname,valuename)=>{
  let jdata={}
  arr.forEach(elem=>{
    jdata[elem[keyname]] = elem[valuename]
  })
  return jdata
}
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

export { 
	getMaxMinAvg
	, gettimestr
	, get_last_part_of_path
	, onClickCopy 
	, conv_bp_percent ,
	conv_percent_bp ,
	convaj,
	LOGGER,
	STRINGER 
	, PARSER
	, ISFINITE
	, KEYS
	, generaterandomstr
	, getrandomint, getRandomElementsFromArray, getrandomwords 
	, getuseraddress
	, getmyaddress
	, get_deltatime_str 
	, get_deltatime_tkns_unixarg
}
