const fetch = require("node-fetch");
module.exports = {
  friendlyName: "Get waves price in currency",

  description: "",

  inputs: {
    amount: {
      type: "number",
    },
    currencyCode: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: "Waves price in currency",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const cryptoCompareApiKey =
        sails.config.cryptoCompareApiKey || process.env.CRYPTO_COMPARE_API_KEY;
      const cryptoCompareHeader = {
        headers: { Authorization: `Apikey ${cryptoCompareApiKey}` },
      };

      const cryptoCompareResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=WAVES&tsyms=USD",
        cryptoCompareHeader
      );
      const wavesPriceInDollar = await cryptoCompareResponse.json();

      const currencyEquivalentInUsd = await sails.helpers.getCurrencyEquivalentOfUsd.with(
        {
          amount: inputs.amount,
          currencyCode: inputs.currencyCode,
        }
      );
      var price = wavesPriceInDollar.USD * currencyEquivalentInUsd;

      var amount = inputs.amount || 1;

      if (!_.isUndefined(amount) && !isNaN(Number(amount))) {
        price = price * parseFloat(amount);
      }
      exits.success(price.toFixed(2));
    } catch (error) {
      throw error;
    }
  },
};
