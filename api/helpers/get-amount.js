module.exports = {
  sync: true,
  friendlyName: "Get amount",

  description: "",

  inputs: {
    amount: {
      type: "string",
    },
  },

  exits: {
    success: {
      outputFriendlyName: "Amount",
    },
  },

  fn: function (inputs) {
    // Get amount.
    var amount =
      !_.isUndefined(inputs.amount) && !isNaN(Number(inputs.amount))
        ? inputs.amount
        : 1;
    // TODO

    // Send back the result through the success exit.
    return amount;
  },
};
