class Chart < ApplicationRecord
    belongs_to :company
    has_many :chart_lines, :dependent => :destroy

end
