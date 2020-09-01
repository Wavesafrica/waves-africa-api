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
      const wavesPriceInDollar = await sails.helpers.getWavesPriceInUsd();

      const currencyEquivalentInUsd = await sails.helpers.getCurrencyEquivalentOfUsd.with(
        {
          amount: inputs.amount,
          currencyCode: inputs.currencyCode,
        }
      );
      var price = wavesPriceInDollar * currencyEquivalentInUsd;

      var amount = sails.helpers.getAmount(inputs.amount);

      price = price * parseFloat(amount);
      exits.success(price.toFixed(2));
    } catch (error) {
      throw error;
    }
  },
};
