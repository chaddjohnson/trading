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

    requires: [
      'Trading.store.Quotes'
    ],

    pluginSettings: {
      title: 'Chart',
      width: 730,
      height: 350,
      maximizable: true,
      resizable: true,
    },
    
    listeners: {
      afterlayout: function() {
        this.renderChart();
      }
    },

    initComponent: function() {
      this.callParent(arguments);

      this.chartData = [];
      this.chartRendered = false;

      this.quoteServiceClient.onLoggedIn(function() {
        this.quoteServiceClient.streamQuotes('FB', this.updateChart, this);
      }, this);
    },

    renderChart: function() {
      if (this.chart) {
        this.chart.destroy();
      }

      if (this.chartData.length > 0) {
        // TODO Find a better way than recreating the chart, as the
        // visual state of the chart is lost each time this happens.
        this.chart = new Dygraph(
          this.getEl().select('.x-panel-body div').elements[0],
          this.chartData,
          {
            labels: ['Time', 'Price', 'Average', 'Bid', 'Ask'],
            visibility: [true, true, true, true],
            legend: 'always',
            showRangeSelector: true,
            connectSeparatedPoints: true,
            series: {
              'Bid': {
                strokeWidth: 0
              },
              'Ask': {
                strokeWidth: 0
              }
            }
          }
        );
        this.chartRendered = true;
      }
    },

    updateChart: function(response) {
      this.chartData.push([new Date(response.data.timestamp),
                           response.data.last_price,
                           this.averagePrice(response.data),
                           response.data.bid_price,
                           response.data.ask_price]);

      if (!this.chartRendered) {
        this.renderChart();
      }

      if (this.chart) {
        this.chart.updateOptions( { 'file': this.chartData } );
      }
    },

    averagePrice: function(data) {
      if (!this.average) {
        this.average = data.last_price;
      }

      multiplier = 2 / (10 + 1);
      this.average = parseFloat(((data.last_price - this.average) * multiplier) + this.average);

      return this.average;
    }
  });

})(Ext);