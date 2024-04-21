# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authorize

  def new; end

  def create
    user = User.find_by(name: params[:name])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to admin_index_url, notice: "Welcome, #{user.name}"
    else
      Rails.logger << 'invalid password'
      redirect_to login_url, alert: 'Invalid user/password combination'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: 'Logged out'
  end
end
