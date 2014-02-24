class CreateSecurityClosePrices < ActiveRecord::Migration
  def change
    create_table :security_close_prices do |t|
      t.integer   :security_id, :null => false
      t.date      :date,        :null => false
      t.decimal   :price,       :null => false, :precision => 10, :scale => 4
    end
  end
end
