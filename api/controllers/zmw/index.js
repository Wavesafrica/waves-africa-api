/**
 * Module dependencies
 */
const axios = require('axios');
// ...


/**
 * zmw/index.js
 *
 * Index zmw.
 */
module.exports = async function index(req, res) {
  const config = {
    headers: {'Authorization': 'Apikey ee05c52992071556a818f4f0b2c08d21f9cc815afb499e65bbfd34a220ae0cd7'}
  };
  axios.all([
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=WAVES&tsyms=USD', config),
    axios.get('https://free.currconv.com/api/v7/convert?q=USD_ZMW&compact=ultra&apiKey=3ea8e1b98e3f3fb48b2e')
  ]).then(axios.spread((waves, currency) => {
    var price = waves.data.USD * currency.data.USD_ZMW;

    const data = req.allParams();

    var amount = data.amount || 1;

    if (!_.isUndefined(amount) && !isNaN(Number(amount))) {
      price = price * parseFloat(amount);
    }

    res.status(200).json({WAVES_ZMW: price.toFixed(2)});
  }))
  .catch(error => {
    sails.log(error);
    res.status(500).json({message: 'Something went wrong and it\'s not your fault'});
  });

};
