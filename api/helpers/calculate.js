module.exports = {


  friendlyName: 'Calculate',


  description: 'Calculate something.',


  inputs: {
    unitPrice: {
      type: 'number'
    },
    amount: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    badValues: {
      description: 'Values passed are not valid'
    }

  },


  fn: function (inputs, exits) {
    // TODO
    var amount = inputs.amount || 1;

    if (!_.isUndefined(amount) && !isNaN(Number(amount))) {
      const calculatedAmount = inputs.unitPrice * parseFloat(amount);
      console.log(calculatedAmount);
      return exits.success(calculatedAmount);
    }
  }


};

