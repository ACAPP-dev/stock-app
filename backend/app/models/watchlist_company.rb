class WatchlistCompany < ApplicationRecord
    belongs_to :watchlist 
    belongs_to :company 
end
