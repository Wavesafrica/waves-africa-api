/**
 * Module dependencies
 */
const axios = require('axios');

// ...


/**
 * rwf/index.js
 *
 * Index rwf.
 */
module.exports = async function index(req, res) {
  const config = {
    headers: {'Authorization': 'Apikey ee05c52992071556a818f4f0b2c08d21f9cc815afb499e65bbfd34a220ae0cd7'}
  };
  axios.all([
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=WAVES&tsyms=USD', config),
    axios.get('https://free.currconv.com/api/v7/convert?q=USD_RWF&compact=ultra&apiKey=3ea8e1b98e3f3fb48b2e')
  ]).then(axios.spread((waves, currency) => {
    const price = waves.data.USD * currency.data.USD_RWF;
    res.status(200).json({WAVES_RWF: price.toFixed(2)});
  }))
  .catch(error => {
    sails.log(error);
    res.status(500).json({message: "Something went wrong and it's not your fault"});
  });

};
