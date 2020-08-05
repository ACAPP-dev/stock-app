class WatchlistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :description
  has_many :companies
end
