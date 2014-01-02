Ext.define('Trading.store.News', {
  extend: 'Ext.data.Store',
  
  requires: [
    'Trading.model.News'
  ],
  
  model: 'Trading.model.News'
});
