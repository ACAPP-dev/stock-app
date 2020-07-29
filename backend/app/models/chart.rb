class Chart < ApplicationRecord
    has_many :company_charts
    has_many :companies, through: :company_charts

end
