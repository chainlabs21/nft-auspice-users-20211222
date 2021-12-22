
import mnemonicwords from 'mnemonic-words'
const LOGGER=console.log
const getrandomint=(min,max)=>{
	return Math.floor(Math.random() *(max-min))  + min
}
const getRandomElementsFromArray =(arr, n)=> {
	var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
	if (n > len)
			{throw new RangeError("getRandom: more elements taken than available")}
	while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}
const getrandomwords=N=>{
	return getRandomElementsFromArray(mnemonicwords , N)
}

export {LOGGER
	, getrandomint
	, getRandomElementsFromArray
	, getrandomwords
}
