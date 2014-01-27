class AddIndexesToQuotes < ActiveRecord::Migration
  def change
    add_index :quotes, [:security_id, :date]
  end
end
