class Watchlist < ApplicationRecord
    belongs_to :user
    has_many :watchlist_companies
    has_many :companies, through: :watchlist_companies

end
