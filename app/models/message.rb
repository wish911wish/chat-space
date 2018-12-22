class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validate   :content, presence: true, unless: :image?
end
