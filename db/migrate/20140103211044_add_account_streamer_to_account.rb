class AddAccountStreamerToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :account_streamer, :string, { :null => false, :default => 'generated', :after => :account_api }
  end
end
