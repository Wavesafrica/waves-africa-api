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
      let price = jsonResponse.USD_NGN;
      const amount = inputs.amount || 1;
      if (!_.isUndefined(amount) && !isNaN(Number(amount))) {
        price = price * parseFloat(amount);
      }
      exits.success(price);
    } catch (error) {
      throw error;
    }
  },
};
