class Company < ApplicationRecord
    has_many :watchlist_companies
    has_many :watchlists, through: :watchlist_companies
    has_many :charts
end
