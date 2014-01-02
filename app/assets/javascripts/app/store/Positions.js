Ext.define('Trading.store.Positions', {
  extend: 'Ext.data.Store',
  
  requires: [
    'Trading.model.Position'
  ],
  
  model: 'Trading.model.Position'
});
