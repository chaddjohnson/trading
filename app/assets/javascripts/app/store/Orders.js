Ext.define('Trading.store.Orders', {
  extend: 'Ext.data.Store',
  
  requires: [
    'Trading.model.Order'
  ],
  
  model: 'Trading.model.Order'
});
