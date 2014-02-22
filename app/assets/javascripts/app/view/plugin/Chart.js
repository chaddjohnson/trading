(function(Ext) {

  var exponentialAverage = function(average, previous, multiplier) {
    if (!multiplier) {
      multiplier = 2 / (10 + 1);
    }

    if (!average) {
      average = previous;
    }

    return ((parseFloat(((previous - average) * multiplier) + average)) * 100) / 100;
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
      this.previousTimestamp = null;
      this.currentTickValue = 0;
      this.tickReferences = {};

      this.quoteServiceClient.onLoggedIn(function() {
        // TODO Remove hardcoding of symbol.
        this.quoteServiceClient.requestChartData('FB', this.populateChart, this);
        this.quoteServiceClient.streamQuotes('FB', this.updateChart, this);
      }, this);
    },

    renderChart: function() {
      var self = this;

      if (self.chart) {
        self.chart.destroy();
      }

      if (self.chartData.length > 0) {
        // TODO Find a better way than recreating the chart, as the
        // visual state of the chart is lost each time this happens.
        self.chart = new Dygraph(
          self.getEl().select('.x-panel-body div').elements[0],
          self.chartData,
          {
            labels: ['Time', 'Price', 'Bid', 'Ask'],
            visibility: [true, true, true],
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
            },
            xAxisLabelWidth: 100,
            axes: {
              x: {
                valueFormatter: (function(tickValue) {
                  var tickReference = self.tickReference(tickValue);
                  return tickReference.getHours() + ':' + tickReference.getMinutes();
                }).bind(self),
                axisLabelFormatter: (function(tickValue) {
                  var tickReference = self.tickReference(tickValue);
                  return tickReference.getHours() + ':' + tickReference.getMinutes();
                }).bind(self),
                pixelsPerLabel: 100,
              }
            }
          }
        );
        this.chartRendered = true;
      }
    },

    populateChart: function(response) {
      var pastChartData = [], index, quote;

      for (index in response.data) {
        quote = response.data[index];
        pastChartData.push([
          this.tickValue(new Date(quote.timestamp)),
          quote.last_price,
          quote.bid_price,
          quote.ask_price
        ]);
      }

      this.chartData = pastChartData.concat(this.chartData);

      if (!this.chartRendered) {
        this.renderChart();
      }
    },

    updateChart: function(response) {
      return;
      this.chartData.push([this.tickValue(new Date(response.data.timestamp)),
                           response.data.last_price,
                           response.data.bid_price,
                           response.data.ask_price]);

      if (!this.chartRendered) {
        this.renderChart();
      }

      if (this.chart) {
        this.chart.updateOptions({ 'file': this.chartData });
      }
    },

    tickReference: function(tickValue) {
      var tickReference, i;

      // Determine if the tickValue is already in tickReferences, and return that if it's found.
      if (tickReference = this.tickReferences[tickValue]) {
        return tickReference;
      }

      // Find the available tickReference prior to the requested one.
      for (i=tickValue; i>=0; i--) {
        if (this.tickReferences[i]) {
          // Return a calculated date.
          return new Date(this.tickReferences[i].getTime() + (tickValue - i));
        }
      }
    },

    tickValue: function(timestamp) {
      var i;

      if (!this.previousTimestamp) {
        // Set initial value for previousTimestamp.
        this.previousTimestamp = timestamp;
      }

      if (this.previousTimestamp.getDate() == timestamp.getDate()) {
        this.currentTickValue += timestamp.getTime() - this.previousTimestamp.getTime();
      }
      else {
        // Set distance between days to one second.
        this.currentTickValue += 1000;
      }

      this.tickReferences[this.currentTickValue] = timestamp;

      this.previousTimestamp = timestamp;
      return this.currentTickValue;
    },

    averagePrice: function(lastPrice) {
      this.average = exponentialAverage(this.average, lastPrice);
      return this.average;
    }
  });

})(Ext);