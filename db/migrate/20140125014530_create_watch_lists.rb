class CreateWatchLists < ActiveRecord::Migration
  def change
    create_table :watch_lists do |t|
      t.string   :name,       :null => false, :limit => 30
      t.integer  :account_id, :null => false
      t.datetime :created_at, :null => false
    end
  end
end
