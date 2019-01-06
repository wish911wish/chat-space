class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user
  belongs_to :group
  validates   :content, presence: true, unless: :image?
  before_save :set_default

  private
  def set_default
    self.content ||= ""
  end
end
