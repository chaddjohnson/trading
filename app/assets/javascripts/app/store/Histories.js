Ext.define('Trading.store.Histories', {
  extend: 'Ext.data.Store',
  
  requires: [
    'Trading.model.History'
  ],
  
  model: 'Trading.model.History'
});
