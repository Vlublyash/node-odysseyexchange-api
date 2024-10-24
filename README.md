# node-odysseyexchange-api
node library Odyssey Exchange API


## plan
✅ spot api

☑️ futures api



# install
```cmd
npm i node-odysseyexchange-api
```

# quickstart
```js
const odyssey = require('node-odysseyexchange-api');
let apikey = 'you-api-key';
let secret = 'you-secret-key';
// constructor spot/futures
let spot = new odyssey.spot(apikey, secret);
async function account() {
    let acc = await spot.getAccount(); //await get spot account
    console.log(acc);
}
console.log(odyssey.time()); // time on exchange
console.log(odyssey.ping()); // ping on exchange
account();
```

account:
```json
{
  balances: [
    { asset: 'GRIMACE', free: '0.0000004900', locked: '0.0000000000' },
    { asset: 'USDT', free: '0.000000', locked: '0.0000000000' },
    { asset: 'BTC', free: '0.0000100000', locked: '0.0000000000' }
  ]
}
```

<h3>feedback</h3>

<img src="https://i.ibb.co/xfsM4B2/telegram-2.png" width="16px"><a href="https://t.me/libfordev">*open chat*</a>
