const LOGGER = console.log;
const DebugMode = false;

const requesttransaction = async (jreqdata) => {
  let { from, to, data, value } = jreqdata;
  let { klaytn } = window;
  const txparams = {
		from: from,
		to: to,
		data: data,
    value: value, // '0x00'
  };
  let resp;
  try {
    resp = await klaytn.request({
      method: "eth_sendTransaction",
      params: [txparams],
    });
    DebugMode && LOGGER("1F9jVI8LrL", resp);
    return resp;
  } catch (err) {
    DebugMode && LOGGER("kkm1TWXecH", err);
    return null;
  }
};

export { requesttransaction };
