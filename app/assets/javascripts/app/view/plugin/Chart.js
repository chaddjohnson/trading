(function(Ext) {

  var exponentialAverage = function(average, previous, multiplier) {
    if (!multiplier) {
      multiplier = 2 / (10 + 1);
    }

    if (!average) {
      average = previous;
    }

    return (Math.round(parseFloat(((previous - average) * multiplier) + average)) * 100 / 100);
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
        this.quoteServiceClient.requestChartData('FB', this.populateChart, this);
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

    populateChart: function(response) {
      var pastChartData = [], index, quote, average;

      for (index in response.data) {
        quote = response.data[index];
        average = exponentialAverage(average, quote.last_price);

        pastChartData.push([
          new Date(quote.timestamp),
          quote.last_price,
          average,
          quote.bid_price,
          quote.ask_price
        ]);
      }

      this.chartData = pastChartData.concat(this.chartData);
    },

    updateChart: function(response) {
      this.chartData.push([new Date(response.data.timestamp),
                           response.data.last_price,
                           this.averagePrice(response.data.last_price),
                           response.data.bid_price,
                           response.data.ask_price]);

      if (!this.chartRendered) {
        this.renderChart();
      }

      if (this.chart) {
        this.chart.updateOptions( { 'file': this.chartData } );
      }
    },

    averagePrice: function(lastPrice) {
      this.average = exponentialAverage(this.average, lastPrice);
      return this.average;
    }
  });

})(Ext);