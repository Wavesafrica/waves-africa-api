module.exports = {
  friendlyName: "Index",

  description: "Index ghs.",

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

  fn: async function (inputs) {
    try {
      const price = await sails.helpers.getWavesPriceInCurrency.with({
        amount: inputs.amount,
        currencyCode: "GHS",
      });

      exits.success({ WAVES_GHS: price });
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
