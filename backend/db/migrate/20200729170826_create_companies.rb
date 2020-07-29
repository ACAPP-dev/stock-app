class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :ticker
      t.string :name
      t.string :country
      t.string :exchange
      t.string :market_cap
      t.string :outstanding_shares
      t.string :web_url
      t.string :logo
      t.string :industry
      t.string :three_month_trading_volume
      t.string :fifty_two_week_high
      t.string :fifty_two_week_high_date
      t.string :fifty_two_week_low
      t.string :fifty_two_week_low_date

      t.timestamps
    end
  end
end
