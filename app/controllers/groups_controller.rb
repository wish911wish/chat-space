class GroupsController < ApplicationController

  def create
    # ids2 = params[:group][:user_ids]
    # ids3 = params.require(:group)
    # ids4 = params.require(:group).permit(:name, :user_ids)
    # ids5 = params.require(:group).permit(user_ids: [])
    # idss = params.require(:group).permit(:name, user_ids: [])
    # ids6 = params.require(:group).permit(user_ids: []).require(:user_ids)
    # ids7 = params.require(:group).permit(user_ids: [])[:user_ids]
    # Group.create(name: group_params[:name])
    group = Group.create(group_params_name)

    create_member(group_params_user_ids[:user_ids], group.id)

    redirect_to root_path
  end

  def new
    @group = Group.new
  end

  def edit

  end

  def update
  end

  private
  def group_params_name
    params.require(:group).permit(:name)
  end

  def group_params_user_ids
    params.require(:group).permit(user_ids: [])
  end

  def create_member(users, group_id)
    users.each do |user_id|
      Member.create(user_id: user_id, group_id: group_id)
    end
  end

end
