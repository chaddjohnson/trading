(function(Ext) {

  Ext.define('Trading.view.plugin.History', {
    extend: 'Ext.grid.Panel', 
    xtype: 'history',
    
    requires: [
      'Trading.store.Histories'
    ],
    
    viewConfig: {
      stripeRows: true
    },
    
    columns: [
      {
        text: 'Symbol',
        width: 65,
        sortable: true,
        dataIndex: 'symbol'
      },{
        text: 'Cost',
        width: 65,
        sortable: true,
        dataIndex: 'cost_basis'
      },{
        text: 'Buy Date',
        width: 75,
        sortable: true,
        dataIndex: 'buy_date'
      },{
        text: 'Buy Price',
        width: 65,
        sortable: true,
        dataIndex: 'buy_orice'
      },{
        text: 'Sell Date',
        width: 75,
        sortable: true,
        dataIndex: 'sell_date'
      },{
        text: 'Sell Price',
        width: 65,
        sortable: true,
        dataIndex: 'sell_orice'
      },{
        text: 'Profit',
        width: 65,
        sortable: true,
        dataIndex: 'profit'
      },{
        text: 'Profit %',
        width: 65,
        sortable: true,
        dataIndex: 'profit_percent'
      }
    ],
    
    initComponent: function() {
      this.callParent(arguments);
      this.store = Ext.create('Trading.store.Histories');
    }
  });

})(Ext);
