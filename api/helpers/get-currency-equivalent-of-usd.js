const fetch = require("node-fetch");
module.exports = {
  friendlyName: "Get currency equivalent of USD",

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
      outputFriendlyName: "Usdn price",
    },
  },

  fn: async function (inputs, exits) {
    // Get usdn price.
    try {
      const freeCurApiKey =
        sails.config.freeCurApiKey || process.env.FREE_CUR_API_KEY;
      var response = await fetch(
        `https://free.currconv.com/api/v7/convert?q=USD_${inputs.currencyCode}&compact=ultra&apiKey=${freeCurApiKey}`
      );

      const jsonResponse = await response.json();
      const key = `USD_${inputs.currencyCode}`;
      let price = jsonResponse[key];
      var amount =
        !_.isUndefined(inputs.amount) && !isNaN(Number(inputs.amount))
          ? inputs.amount
          : 1;

      price = price * parseFloat(amount);

      exits.success(price.toFixed(2));
    } catch (error) {
      throw error;
    }
  },
};
