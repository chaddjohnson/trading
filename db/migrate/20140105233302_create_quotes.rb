class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.integer  :security_id,       :null => false, :limit => 4
      t.decimal  :last_price,        :null => false, :precision => 10, :scale => 4
      t.decimal  :bid_price,         :null => false, :precision => 10, :scale => 4
      t.decimal  :ask_price,         :null => false, :precision => 10, :scale => 4
      t.date     :date,              :null => false
      t.datetime :timestamp,         :null => false
      t.integer  :trade_volume,      :null => false, :limit => 4
      t.integer  :cumulative_volume, :null => false, :limit => 4
      t.datetime :created_at,        :null => false
    end
  end
end
