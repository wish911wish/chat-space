class MessagesController < ApplicationController
  def index
    @groups = current_user.groups.order("created_at DESC")
  end
end
