class CreateChartQuotes < ActiveRecord::Migration
  def change
    create_table :chart_quotes do |t|
      t.integer  :security_id,  :null => false, :limit => 4
      t.decimal  :last_price,   :null => false, :precision => 10, :scale => 4
      t.decimal  :bid_price,    :null => false, :precision => 10, :scale => 4
      t.decimal  :ask_price,    :null => false, :precision => 10, :scale => 4
      t.integer  :trade_volume, :null => false, :limit => 4
      t.datetime :created_at,   :null => false
    end
  end
end
