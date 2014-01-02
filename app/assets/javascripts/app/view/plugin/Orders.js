(function(Ext) {

  Ext.define('Trading.view.plugin.Orders', {
    extend: 'Ext.grid.Panel', 
    xtype: 'orders',
    
    requires: [
      'Trading.store.Orders'
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
        dataIndex: 'buy_price'
      },{
        text: 'Gain',
        width: 65,
        sortable: true,
        dataIndex: 'gain'
      },{
        text: 'Gain %',
        width: 65,
        sortable: true,
        dataIndex: 'gain_percent'
      }
    ],
    
    initComponent: function() {
      this.callParent(arguments);
      this.store = Ext.create('Trading.store.Orders');
    }
  });

})(Ext);
