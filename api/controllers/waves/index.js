module.exports = {
  friendlyName: "Index",

  description: "Index dzd.",

  inputs: {},

  exits: {
    operationalError: {
      statusCode: 400,
    },
  },

  fn: async function (_, exits) {
    try {
      const price = await sails.helpers.getWavesPriceInUsd();
      exits.success({ WAVES_USD: price });
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
