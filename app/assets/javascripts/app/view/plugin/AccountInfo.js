Ext.define('Trading.view.plugin.AccountInfo', {
  extend: 'Ext.tab.Panel', 
  xtype: 'account-info',
  
  requires: [
    'Trading.view.plugin.Positions',
    'Trading.view.plugin.Orders',
    'Trading.view.plugin.History'
  ],
  
  pluginSettings: {
    title: 'Account',
    width: 707,
    height: 387,
    maximizable: true,
    resizable: true
  },
  
  items: [
    {
      xtype: 'positions',
      title: 'Positions'
    },{
      xtype: 'orders',
      title: 'Orders'
    },{
      xtype: 'history',
      title: 'History'
    }
  ]
});
