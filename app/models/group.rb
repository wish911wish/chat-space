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

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content.present? ? last_message.content : "画像が投稿されています。"
    else
      "まだメッセージはありません。"
    end
  end

end
