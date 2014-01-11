(function(Ext) {

  function data_stocks() {
  return "" +
    "Time,Price,Average\n" +
    "2014/01/10 08:30,50.1,50.09\n" +
    "2014/01/10 09:00,50.12,50.1\n" +
    "2014/01/10 09:00,50.14,50.11\n" +
    "2014/01/10 09:30,50.15,50.12\n" +
    "2014/01/10 09:30,50.18,50.14";
  }

  Ext.define('Trading.view.plugin.Chart', {
    extend: 'Ext.panel.Panel', 
    xtype: 'stock-chart',

    pluginSettings: {
      title: 'Chart',
      width: 730,
      height: 350,
      maximizable: true,
      resizable: true,
    },
    
    listeners: {
      afterlayout: function() {
        if (this.graph) {
          this.graph.destroy();
        }

        // TODO Find a better way than recreating the graph, as the
        // visual state of the graph is lost each time this happens.
        this.graph = new Dygraph(
          this.getEl().select('.x-panel-body div').elements[0],
          data_stocks,
          {
            showRangeSelector: true
          }
        );
      }
    },
  });

})(Ext);