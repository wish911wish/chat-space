class MessagesController < ApplicationController
  before_action :set_group, only: [:index]

  def index
    @messages = @group.messages
  end

  def create
    Message.create(content: message_params[:content], image: message_params[:image], group_id: params[:group_id], user_id: current_user.id)
    redirect_to group_messages_path(params[:group_id])
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:content, :image)
  end
end
