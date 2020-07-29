class CreateTickers < ActiveRecord::Migration[6.0]
  def change
    create_table :tickers do |t|
      t.string :ticker
      t.string :ticker_name

      t.timestamps
    end
  end
end
