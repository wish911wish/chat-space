require 'rails_helper'
describe Message do
  describe '#create' do

    context 'can save' do
      it "is valid with all items is completed" do
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end

      it "is valid without a content" do
        message = build(:message, content: "")
        message.valid?
        expect(message).to be_valid
      end

      it "is valid without a image" do
        message = build(:message, image: "")
        message.valid?
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without content and image" do
        message = build(:message, content: "", image: "")
        message.valid?
        expect(message.errors[:content][0]).to include("入力してください")
      end

      it "is invalid without a group_id" do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group][0]).to include("入力してください")
      end

      it "is invalid without a user_id" do
        message = build(:message, user_id: "")
        message.valid?
        expect(message.errors[:user][0]).to include("入力してください")
      end
    end

  end
end
