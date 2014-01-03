class AddAccountApiToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :account_api, :string, { :null => false, :default => 'simulation', :after => :balance }
  end
end
