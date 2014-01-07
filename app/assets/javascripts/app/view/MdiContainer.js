Ext.define('Trading.view.MdiContainer', {
  extend: 'Ext.panel.Panel', 
  xtype: 'mdi-container',

  requires: [
    'Trading.view.PluginWindow',
    'Trading.view.plugin.WatchLists',
    'Trading.view.plugin.AccountInfo',
    'Trading.view.plugin.Chart',
    'Trading.view.plugin.News',
    'Trading.view.plugin.Trade'
  ],
  
  cls: 'mdi-container',
  
  layout: 'fit',
  
  listeners: {
    boxready: function(panel) {
      this.initPlugins();
    }
  },
  
  initPlugins: function() {
    var plugins = [ 'WatchLists', 'AccountInfo', 'Chart', 'News', 'Trade' ];
    var view = this;
    Ext.Array.each(plugins, function(name, index) {
      var plugin = Ext.create('Trading.view.plugin.' + name, {
        quoteServiceClient: view.quoteServiceClient
      });
      var pluginWindow = Ext.create('Trading.view.PluginWindow', {
        title: plugin.pluginSettings.title,
        width: plugin.pluginSettings.width || 500,
        height: plugin.pluginSettings.height || 500,
        maximizable: plugin.pluginSettings.maximizable || false,
        resizable: plugin.pluginSettings.resizable || false
      });
      
      // Add plugin to window.
      pluginWindow.add(plugin);
      
      // Add window to container and show it.
      view.add(pluginWindow);
      pluginWindow.show();
    });
  }
});
