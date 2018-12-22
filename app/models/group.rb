class Group < ApplicationRecord
  has_many    :users, through: :members
  has_many    :members
  has_many    :messages
  validate    :add_error_messages

  def add_error_messages
    if name.blank?
      errors[:base] << "グループ名を入力してください。"
    end
  end

end
