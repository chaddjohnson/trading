Ext.define('Trading.view.plugin.News', {
  extend: 'Ext.panel.Panel', 
  xtype: 'news',
  
  pluginSettings: {
    title: 'News',
    width: 353,
    height: 350,
    maximizable: false,
    resizable: true
  },
  
  html: 'news'
});
