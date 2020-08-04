class ChartSerializer < ActiveModel::Serializer
  attributes :id, :chart_type
  has_many :chart_lines
  
end
