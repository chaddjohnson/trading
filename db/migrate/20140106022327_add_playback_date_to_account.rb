class AddPlaybackDateToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :playback_date, :date, { :null => true, :after => :account_streamer }
  end
end
