Ext.define('Trading.view.plugin.WatchLists', {
  extend: 'Ext.tab.Panel', 
  xtype: 'watch-lists',
  
  requires: [
    'Trading.view.plugin.WatchList',
  ],
  
  pluginSettings: {
    title: 'Watch Lists',
    width: 730,
    height: 387,
    maximizable: true,
    resizable: true
  },
  
  initComponent: function() {
    this.callParent(arguments);
    
    this.add([
      {
        xtype: 'watch-list',
        title: 'High-Cap',
        //symbols: ['AMZN','VIPS','FB','AAPL','OAS'],
        symbols: ['GOOG','FB','TWTR','AMZN','V','XOM','AAPL','INTC','CSCO','PCLN','GE'],
        quoteServiceClient: this.quoteServiceClient
      }
      // ,{
      //   xtype: 'watch-list',
      //   title: 'Day Trading',
      //   //symbols: ['HTCH','HXM','EXPE','SWI','TSYS','ZNGA','OUTR'],
      //   symbols: ['AMZN','VIPS','FB','AAPL','OAS','HTCH','HXM','EXPE','SWI','TSYS','ZNGA','OUTR','CRUS','TPX','BAS','NTGR','DECK','SMTC','TGI','VRTX','DLR','EVC','SLT','MTSN','HSOL'],
      //   quoteServiceClient: this.quoteServiceClient
      // },{
      //   xtype: 'watch-list',
      //   title: 'Indexes',
      //   //symbols: ['CRUS','TPX','BAS','NTGR','DECK','SMTC','TGI','VRTX','DLR','EVC','SLT','MTSN','HSOL'],
      //   symbols: ['AMZN','VIPS','FB','AAPL','OAS','HTCH','HXM','EXPE','SWI','TSYS','ZNGA','OUTR','CRUS','TPX','BAS','NTGR','DECK','SMTC','TGI','VRTX','DLR','EVC','SLT','MTSN','HSOL'],
      //   quoteServiceClient: this.quoteServiceClient
      // }
    ]);
  }
});
