/**
 * Module dependencies
 */
const telegram = require('telegram-bot-api');
const axios = require('axios');

const api = new telegram({
  token: '882077706:AAFyPuTfQulvjdTDfTb4q2MZ1HVWMkrQYBM',
  updates: {
    enabled: true
  }
});
// ...


/**
 * bot/index.js
 *
 * Index bot.
 */
module.exports = async function index(req, res) {
  api.on('message', message => {
    if (message.text == '/price ngn' || message.text == '/price waves ngn') {
        axios.get("https://waves-africa-api.herokuapp.com/ngn").then(response => {
          api.sendMessage({
            chat_id: message.chat.id,
            message: `
                Price for Waves (WAVES):
                NGN: \t ₦${response.WAVES_NGN}`
          }).then(data => {
            res.status(200).json(data);
            console.log(data);
          });
        });
    }
  });
};
