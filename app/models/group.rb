class Group < ApplicationRecord
  has_many :users, through: :members
  has_many :members
  varidates :name, presence: true
end
