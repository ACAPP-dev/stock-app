class Company < ApplicationRecord
    has_many :watchlist_companies
    has_many :watchlists, through: :watchlist_companies
    has_many :company_charts
    has_many :charts, through: :company_charts
end
