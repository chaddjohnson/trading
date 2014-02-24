namespace :security do
  task :summarize_chart_data, [:date] => :environment do |t, args|

    date = args[:date] || Date.today.to_s

    TradingCore::WatchListSecurity.all_symbols.each do |symbol|
      security = TradingCore::Security.where(:symbol => symbol).first
      ActiveRecord::Base.connection.execute("CALL generate_chart_quotes(#{security.id}, '#{date}')")
      ActiveRecord::Base.connection.reconnect!
    end

  end
end