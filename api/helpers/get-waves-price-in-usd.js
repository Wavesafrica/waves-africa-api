const fetch = require("node-fetch");
module.exports = {
  friendlyName: "Get waves price in usd",

  description: "",

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: "Waves price in usd",
    },
  },

  fn: async function (inputs) {
    // Get waves price in usd.
    const cryptoCompareApiKey =
      sails.config.cryptoCompareApiKey || process.env.CRYPTO_COMPARE_API_KEY;
    const cryptoCompareHeader = {
      headers: { Authorization: `Apikey ${cryptoCompareApiKey}` },
    };

    const cryptoCompareResponse = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=WAVES&tsyms=USD",
      cryptoCompareHeader
    );
    const jsonResponse = await cryptoCompareResponse.json();
    const wavesPriceInUsd = jsonResponse.USD;
    return wavesPriceInUsd.toFixed(2);
  },
};
