class CreateWatchListSecurities < ActiveRecord::Migration
  def change
    create_table :watch_list_securities do |t|
      t.integer   :watch_list_id, :null => false
      t.integer   :security_id,   :null => false
      t.timestamp :created_at,    :null => false
    end

    add_index :watch_list_securities, [:watch_list_id, :security_id], :unique => true
  end
end
