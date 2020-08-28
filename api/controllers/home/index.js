const apiInfo = require("../../../package.json");
module.exports = {
  friendlyName: "Index",

  description: "Index home.",

  inputs: {},

  exits: {},

  fn: async function (_, exits) {
    // All done.
    return exits.success({
      message: `Welcome to Waves Africa Web Service ${apiInfo.version}`,
      baseUrl: "https://waves-africa-api.herokuapp.com",
      docsUrl:
        "https://documenter.getpostman.com/view/4151223/S1Lzvm8t?version=latest",
    });
  },
};
