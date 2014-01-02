(function(Ext) {

  var changeColor = function(value, record) {
    var cssClass = '';
    
    if (value > 0) {
      cssClass = 'positive';
    }
    else if (value < 0) {
      cssClass = 'negative';
    }
    else {
      cssClass = '';
    }
    
    return '<span class="' + cssClass + '">' + value + '</span>';
  }
  
  var percentChangeColor = function(value, record) {
    var cssClass = '';
    
    if (value > 0) {
      cssClass = 'positive';
    }
    else if (value < 0) {
      cssClass = 'negative';
    }
    else {
      cssClass = '';
    }
    
    return '<span class="' + cssClass + '">' + value + '%</span>';
  }
  
  var commas = function(value, record) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  Ext.define('Trading.view.plugin.WatchList', {
    extend: 'Ext.grid.Panel',
    xtype: 'watch-list',
    
    requires: [
      'Trading.store.Quotes'
    ],
    
    dockedItems: [
      {
        xtype: 'toolbar',
        dock: 'top',
        items: [
          {
            xtype: 'textfield',
            emptyText: 'Symbol...',
            width: 100,
            cls: 'addSymbol'
          },{
            xtype: 'button',
            text: 'Add'
          },{
            xtype: 'tbseparator'
          },{
            xtype: 'combo',
            fieldLabel: 'Monitor',
            labelWidth: 'auto'
          }
        ]
      }
    ],

    viewConfig: {
      stripeRows: true
    },
    
    columns: [
      {
        text: 'Symbol',
        width: 70,
        sortable: true,
        dataIndex: 'symbol'
      },{
        text: 'Last',
        width: 70,
        sortable: true,
        dataIndex: 'last_price',
        align: 'right'
      },{
        text: 'Bid',
        width: 70,
        sortable: true,
        dataIndex: 'bid_price',
        align: 'right'
      },{
        text: 'Ask',
        width: 70,
        sortable: true,
        dataIndex: 'ask_price',
        align: 'right'
      },{
        text: 'Change',
        width: 75,
        sortable: true,
        dataIndex: 'change',
        renderer: changeColor,
        align: 'right'
      },{
        text: 'Change %',
        width: 75,
        sortable: true,
        dataIndex: 'change_percent',
        renderer: percentChangeColor,
        align: 'right'
      },{
        text: 'Avg Volume',
        width: 90,
        sortable: true,
        dataIndex: 'average_volume',
        renderer: commas,
        align: 'right'
      },{
        text: 'Volume',
        width: 90,
        sortable: true,
        dataIndex: 'volume',
        renderer: commas,
        align: 'right'
      },{
        xtype: 'actioncolumn',
        width: 50,
        items: [
          {
            icon: 'assets/icons/buy.png',
            handler: function(grid, rowIndex, columnIndex) {
              if (!confirm('Are you sure you want to buy this security?')) {
                return;
              }
            }
          },{
            icon: 'assets/icons/remove.png',
            handler: function(grid, rowIndex, columnIndex) {
              if (!confirm('Are you sure you want to remove this security?')) {
                return;
              }
            }
          }
        ]
      }
    ],
    
    columnLines: true,
    
    initComponent: function() {
      this.store = Ext.create('Trading.store.Quotes', {
        quoteServiceClient: this.quoteServiceClient
      });
      this.callParent(arguments);

      this.store.addSymbols(this.symbols);
    }
  });

})(Ext);
