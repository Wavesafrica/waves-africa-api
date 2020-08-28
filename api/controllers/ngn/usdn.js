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
      const price = await sails.helpers.getUsdnPrice.with({
        amount: inputs.amount,
        currencyCode: "NGN",
      });
      return exits.success({ USDN_NGN: price });
    } catch (error) {
      sails.log(error);
    }
  },
};
