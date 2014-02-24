namespace :security do
  task :set_close_prices, [:date] => :environment do |t, args|

    date = args[:date] || Date.today.to_s

    TradingCore::WatchListSecurity.all_symbols.each do |symbol|
      security = TradingCore::Security.where(:symbol => symbol).first
      quote = TradingCore::Quote.where('date < ?', date) \
                                .where(:security_id => security.id) \
                                .order('id DESC') \
                                .first
      quote = TradingCore::Quote.where('date = ?', date) \
                          .where(:security_id => security.id) \
                          .order('id ASC') \
                          .first if !quote

      TradingCore::SecurityClosePrice.create!({
        :security_id => security.id,
        :date        => date,
        :price       => quote.last_price
      })
    end

  end
end