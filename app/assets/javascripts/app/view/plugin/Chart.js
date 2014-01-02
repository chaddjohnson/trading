Ext.define('Trading.view.plugin.Chart', {
  extend: 'Ext.panel.Panel', 
  xtype: 'stock-chart',
  
  pluginSettings: {
    title: 'Chart',
    width: 730,
    height: 350,
    maximizable: true,
    resizable: true
  },
  
  html: 'chart'
});
