Ext.define('Trading.view.Application', {
  extend: 'Ext.container.Viewport',
  
  requires: [
    'Trading.view.Account',
    'Trading.view.MdiContainer'
  ],
  
  layout: 'border',
  
  initComponent: function() {
    this.callParent(arguments);
    
    this.add([
      {
        region: 'north',
        xtype: 'account',
        flex: 1,
        quoteServiceClient: this.quoteServiceClient
      },{
        region: 'center',
        xtype: 'mdi-container',
        flex: 12,
        quoteServiceClient: this.quoteServiceClient
      }
    ]);
  }
});
