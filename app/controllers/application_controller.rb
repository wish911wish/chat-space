class ApplicationController < ActionController::Base
  protect_from_forgery with: :
  before_action :authenticate_user!
end
