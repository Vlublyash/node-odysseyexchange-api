const request = require('request');
const crypto = require('crypto');
//const EventEmitter = require('eventemitter3');

class spot {
  /**
   * request method
   *
   * @class OdyExchange
   * @constructor
   * @param {String} api key
   * @param {String} secret key
   * @see https://docs.odyssey.trade/
   */
  constructor(apikey, secretKey) {
    this.apikey = apikey;
    this.secretKey = secretKey;
  }
  /**
   * Generates url with apikey and secretkey
   * @param  {String} path
   * @param  {String} api type
   * @return {String} url
   * @see https://docs.odyssey.trade/
   */
  _buildURL(_path, form={}) {
    let query = '';
    if(form.symbol) {query+= '?symbol='+form.symbol}
    if(form.limit) {query+= '?limit='+form.limit}
    let url = 'https://openapi.odyssey.trade/sapi/v1/'+_path+query;
    return url;
  }

  /**
   * Generates sign with secretKey
   * @param  {String} timestamp
   * @param  {String} method
   * @param  {String} path
   * @return {String} signature
   * @see https://docs.odyssey.trade/
   */
  _signature(_timestamp,_method,_path, form={}) {
    let query = '';
    if(form.symbol) {query+= '?symbol='+form.symbol}
    if(form.limit) {query+= '?limit='+form.limit}
    return crypto.createHmac('sha256', this.secretKey).update(`${_timestamp}${_method}${_path}${query}`).digest('hex').toString();
  }
  /**
   * Make request against the API
   * @param  {String} _method request
   * @param  {String} _path API endpoint
   * @return {object}
   */
  _req(_method, _path, form={}) {
    if (!this.apikey) {
      return console.log('FATAL ERROR: apiKey not provided!');
    }

    let timestamp = Date.now();
    let sign = this._signature(timestamp,_method,`/sapi/v1/${_path}`,form);
    let options = {
      'method': _method,
      'headers': {
        'x-ch-sign': sign,
        'x-ch-apikey': this.apikey,
        'x-ch-ts': timestamp
      }
    }

    return fetch(this._buildURL(_path, form), options).then(response => {
      if (response.ok) {
          return response.json();
      }
    }).catch(err => console.error(err));
  }

  /** API methods */

  /** GET method **/
  /**
   * get spot account object.
   * @return {Promise} On success, the sent Account object is returned
   * @see https://docs.odyssey.trade/
   */
  getAccount() {
    return this._req('GET','account');
  }
  /**
   * get spot symbols list.
   * @return {Promise} On success, the sent symbols list object is returned
   * @see https://docs.odyssey.trade/
   */
  getSymbols() {
    return this._req('GET', 'symbols');
  }
  getDepth(limit, ticker) {
    return this._req('GET', 'depth', {
      limit: limit,
      ticker: ticker
    });
  }
  getTicker(contractName) {
    return this._req('GET', 'ticker', {
      contractName: contractName
    })
  }
  getTrades(symbol) {
    return this._req('GET', 'trades', {
      symbol: symbol
    })
  }
  getKlines(contractName, interval, limit) {
    return this._req('GET', 'klines', {
      contractName: contractName,
      interval: interval,
      limit: limit
    })
  }
  getOrder(orderId, contractName, clientOrderId) {
    return this._req('GET', 'order', {
      orderId: orderId,
      contractName: contractName,
      clientOrderId: clientOrderId
    })
  }

  /** POST method **/
  createOrder(body = {}) {
    return this._req('POST', 'order', { body });
  }
  testNewOrder(body = {}) {
    return this._req('POST', 'order/test', { body });
  }
  batchOrders(body = {}) {
    return this._req('POST', 'batchOrders', { body });
  }
  cancelOrder(body = {}) {
    return this._req('POST', 'cancel', { body });
  }
  batchCancel(body = {}) {
    return this._req('POST', 'batchCancel', { body });
  }

  getOpenOrders(contractName) {
    return this._req('GET', 'openOrders')
  }
  getMyTrades(symbol, limit, fromId) {
    return this._req('GET', 'myTrades')
  }
}
/** test api **/
function buildUrl(path, form={}) {
  let query = '';
  if(form.symbol) {query+= '?symbol='+form.symbol}
  if(form.limit) {query+= '?limit='+form.limit}
  let url = 'https://openapi.odyssey.trade/open/api/'+path+query;
  return url;
}
async function reqst(methd, _path, form={}) {
  let url = 'https://openapi.odyssey.trade/open/api/'+_path+'?symbol='+form.symbol;
  var options = {
      'Content-Type': 'application/json',
      'method': methd
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
function getRecords(symbol) {
  return reqst('GET', 'get_records', { symbol: symbol })
}
function getTicker(symbol) {
  return reqst('GET', 'get_ticker', { symbol: symbol })
}
function getTrades(symbol){
  var opts = {
    'method': 'GET',
    'url': 'https://openapi.odyssey.trade/open/api/get_trades?symbol='+symbol,
  };
  request(opts, function (error, response) {
    if (error) throw new Error(error);
      return response.body;
  });
}//marketDept() {}

/** GET ping/time **/
function ping() {
  var opts = {
    'method': 'GET',
    'url': 'https://openapi.odyssey.trade/sapi/v1/ping',
  };
  request(opts, function (error, response) {
    console.log(response.body)
      return response.body;
  });
}
function time() {
  var opts = {
    'method': 'GET',
    'url': 'https://openapi.odyssey.trade/sapi/v1/time',
  };
  request(opts, function (error, response) {
    console.log(response.body)
    return response.body;
  });
}

/* module exports */
module.exports.ping = ping;
module.exports.time = time;

module.exports.spot = spot;
//module.exports.futures = futures;
module.exports.open = {getTicker, getRecords, getTrades};