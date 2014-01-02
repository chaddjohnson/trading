Ext.define('Trading.view.plugin.Trade', {
  extend: 'Ext.panel.Panel', 
  xtype: 'trade',
  
  pluginSettings: {
    title: 'Trade',
    width: 353,
    height: 350,
    maximizable: false,
    resizable: false
  },
  
  html: 'trade'
});
