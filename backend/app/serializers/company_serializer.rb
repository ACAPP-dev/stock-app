class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :exchange, :market_cap, 
    :outstanding_shares, :web_url, :logo, :industry, :three_month_trading_volume,
    :fifty_two_week_high, :fifty_two_week_high_date, :fifty_two_week_low,
    :fifty_two_week_low_date

  has_many :charts
  
end