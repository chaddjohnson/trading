class AddAverageVolumeToQuotes < ActiveRecord::Migration
  def change
    add_column :quotes, :average_volume, :integer, { :null => false, :after => :cumulative_volume }
  end
end
