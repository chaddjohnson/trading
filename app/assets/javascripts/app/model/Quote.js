Ext.define('Trading.model.Quote', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'symbol',            type: 'string',          convert: null },
    { name: 'ask_price',         type: 'float',           convert: null },
    { name: 'bid_price',         type: 'float',           convert: null },
    { name: 'last_price',        type: 'float',           convert: null },
    { name: 'previous_close',    type: 'previous_close',  convert: null },
    { name: 'change',            type: 'float',           convert: null },
    { name: 'change_percent',    type: 'float',           convert: null },
    { name: 'trade_volume',      type: 'int',             convert: null },
    { name: 'average_volume',    type: 'int',             convert: null },
    { name: 'cumulative_volume', type: 'int',             convert: null }
  ]
});
