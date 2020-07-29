class CreateWatchlistCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :watchlist_companies do |t|
      t.integer :watchlist_id
      t.integer :company_id

      t.timestamps
    end
  end
end
