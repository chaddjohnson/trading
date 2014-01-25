define(['class'], function(Class) {
  'use strict';

  var types = {
    login           : 1,
    account_info    : 2,
    account_update  : 3,
    quote           : 4,
    stream_quotes   : 5,
    positions       : 6,
    position_add    : 7,
    position_update : 8,
    orders          : 9,
    order_add       : 10,
    order_update    : 11,
    buy             : 12,
    sell            : 13,
    history         : 14,
    history_add     : 15,
    chart_data      : 16
  };
  
  var send = function(self, type, data) {
    data = data || null;
    var message = JSON.stringify({ type: type, data: data });
    self.socket.send(message);
    //console.log('QuoteService: Sending -- ' + message);
  };
  
  var registerCallback = function(self, key, callback, context) {
    self.callbacks[key] = self.callbacks[key] || [];
    self.callbacks[key].push({ callback: callback, context: context });
  };

  return Class.extend({
    init: function(parameters) {
      parameters = parameters || {};
      if (typeof parameters.server == 'undefined' || typeof parameters.port == 'undefined') {
        throw 'server and port must be defined for QuoteService';
      }
      
      var self = this;

      this.callbacks = {};
      this.connectedCallbacks = [];
      this.loggedInCallbacks = [];
      
      this.socket = new WebSocket('ws://' + parameters.server + ':' + parameters.port);
      
      this.socket.onclose = function() {
        console.log('QuoteService: Socket closed');
      }
      
      this.isConnected = false;
      this.loggedIn = false;
      
      this.socket.onopen = function() {
        self.isConnected = true;
        console.log('QuoteService: Socket connected');

        // Call post-connect callbacks.
        for (var index in self.connectedCallbacks) {
          var callbackInfo = self.connectedCallbacks[index];
          callbackInfo.callback.call(callbackInfo.context || window);
        }
      }
      
      this.socket.onmessage = function(message) {
        //console.log('QuoteService: Received -- ' + message.data);
        var data = JSON.parse(message.data);

        // Invoke appropriate callbacks with data.
        var key = data.type;
        if (!!data.data.symbol || !!data.symbol) {
          key += '-' + (data.data.symbol || data.symbol);
        }

        // Call each callback associated with the key.
        for (var index in self.callbacks[key]) {
          var callbackInfo = self.callbacks[key][index];
          callbackInfo.callback.call(callbackInfo.context || window, data);
        }
      }
    },
    
    onConnected: function(callback, context) {
      if (this.isConnected) {
        callback.call(context || window);
        return;
      }
      
      this.connectedCallbacks.push({ callback: callback, context: context });
    },
    
    // TODO Require more than token.
    login: function(token) {
      var callback = function(response) {
        this.loggedIn = response.data.logged_in;

        // Don't call post-login callbacks if login was unsuccessful.
        if (!this.loggedIn) {
          return;
        }

        // Call post-login callbacks.
        for (var index in this.loggedInCallbacks) {
          var callbackInfo = this.loggedInCallbacks[index];
          callbackInfo.callback.call(callbackInfo.context || window);
        }
      };

      registerCallback(this, types.login, callback, this);
      var data = { token: token };
      send(this, types.login, data);
    },
    
    onLoggedIn: function(callback, context) {
      if (this.isConnected && this.loggedIn) {
        callback.call(context || window);
        return;
      }
      
      this.loggedInCallbacks.push({ callback: callback, context: context });
    },
    
    requestQuote: function(symbol, callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::requestQuote() requires login';
      }

      var data = { symbol: symbol };
      //console.log('QuoteService: Requesting quote for symbol -- ' + symbol);
      send(this, types.quote, data);

      // Register the callback for this API function and symbol.
      var key = types.quote + '-' + symbol;
      registerCallback(this, key, callback, context);
    },
    
    streamQuotes: function(symbols, callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::accountInfo() requires login';
      }

      if (!(symbols instanceof Array)) {
        symbols = [symbols];
      }

      var data = { symbols: symbols };
      send(this, types.stream_quotes, data);
      
      // Register the callback for this API function and each symbol.
      for (var index in symbols) {
        var key = types.stream_quotes + '-' + symbols[index];
        registerCallback(this, key, callback, context);
      }
    },

    requestChartData: function(symbol, callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::requestChartData() requires login';
      }

      var data = { symbol: symbol };
      //console.log('QuoteService: Requesting chart data for symbol -- ' + symbol);
      send(this, types.chart_data, data);

      // Register the callback for this API function and symbol.
      var key = types.chart_data + '-' + symbol;
      registerCallback(this, key, callback, context);
    },
    
    accountInfo: function(callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::accountInfo() requires login';
      }

      send(this, types.account_info);
      registerCallback(this, types.account_info, callback, context);
    },
    
    history: function(callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::history() requires login';
      }

      send(this, types.history);
      registerCallback(this, types.history, callback, context);
    },
    
    positions: function(callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::positions() requires login';
      }

      send(this, types.positions);
      registerCallback(this, types.positions, callback, context);
    },
    
    orders: function(callback, context) {
      if (!this.isConnected || !this.loggedIn) {
        throw 'QuoteService::orders() requires login';
      }

      send(this, types.orders);
      registerCallback(this, types.orders, callback, context);
    }
  });

});