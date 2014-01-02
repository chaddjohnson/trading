Ext.define('Trading.store.Quotes', {
  extend: 'Ext.data.Store',
  
  requires: [
    'Trading.model.Quote'
  ],
  
  model: 'Trading.model.Quote',
  
  constructor: function(config) {
    Trading.store.Quotes.superclass.constructor.call(this, config);
    this.symbols = [];
  },
  
  addSymbols: function(symbols) {
    this.symbols = this.symbols.concat(symbols);
    
    this.quoteServiceClient.onLoggedIn(function() {
      this.quoteServiceClient.streamQuotes(symbols, this.updateSymbols, this);
    }, this);
  },
  
  updateSymbols: function(response) {
    if (this.symbols.indexOf(response.data['symbol']) == -1) {
      return;
    }
    
    var record = this.findRecord('symbol', response.data['symbol']);

    if (record != null) {
      record.set(response.data);
    }
    else {
      this.add(response.data);
    }
  }
});
