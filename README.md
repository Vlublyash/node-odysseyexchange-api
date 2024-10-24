# node-odysseyexchange-api
node library Odyssey Exchange API


# plan‼️
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
let odyex = odyssey(apikey, secret);
//skit
const acc = await odyex.getAccount();
console.log(acc);
```

response:
```json
{}
```
<h3>feedback</h3>

<img src="https://i.ibb.co/xfsM4B2/telegram-2.png" width="16px"><a href="https://t.me/libfordev">*open chat*</a>
