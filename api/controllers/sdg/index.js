module.exports = {
  friendlyName: "Index",

  description: "Index SDG.",

  inputs: {
    amount: {
      type: "number",
    },
  },

  exits: {
    operationalError: {
      statusCode: 400,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const price = await sails.helpers.getWavesPriceInCurrency.with({
        amount: inputs.amount,
        currencyCode: "SDG",
      });

      exits.success({ WAVES_SDG: price });
    } catch (error) {
      sails.log(error);
      if (error.isOperationalError) {
        return exits.operationalError({
          message: "Something went wrong",
          error: error.raw,
        });
      }
      return exits.error({
        message: "Something went wrong",
        error: error.message,
      });
    }
  },
};
