class CompanySerializer < ActiveModel::Serializer
  attributes :id
  has_many :charts
end
