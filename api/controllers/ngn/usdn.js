const fetch = require("node-fetch");
module.exports = {
  friendlyName: "Usdn",

  description: "Usdn ngn.",

  inputs: {
    amount: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "retrieved USDN",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const response = await fetch(
        "https://free.currconv.com/api/v7/convert?q=USD_NGN&compact=ultra&apiKey=3ea8e1b98e3f3fb48b2e"
      );
      const jsonResponse = await response.json();
      sails.log(jsonResponse);
      let price = jsonResponse.USD_NGN;
      const amount = inputs.amount || 1;
      if (!_.isUndefined(amount) && !isNaN(Number(amount))) {
        price = price * parseFloat(amount);
      }
      exits.success({ USDN_NGN: price });
    } catch (error) {
      sails.log(error);
    }
  },
};
