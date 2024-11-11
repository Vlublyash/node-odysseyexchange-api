const odyssey = require('node-odysseyexchange-api');
const apikey = `you-api-key`;
const secret = `you-secret-key`;
const spot = new odyssey.spot(apikey,secret); // only spot

//get account
spot.getAccount().then(function(result) {
	console.log(result);
});

//get time on exchange
console.log(odyssey.time());

//get ticker
let ticker = odyssey.open.getTicker('BTCUSDT').then(function(result) {
	console.log(result.data);
});