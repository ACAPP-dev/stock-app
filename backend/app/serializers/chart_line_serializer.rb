class ChartLineSerializer < ActiveModel::Serializer
  attributes :id, :date, :open, :high, :low, :close
end
