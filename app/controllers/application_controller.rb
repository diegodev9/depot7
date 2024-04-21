# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_i18n_locale_from_params
  before_action :authorize

  protected

  def authorize
    if [Mime[:html], Mime[:turbo_stream]].include? request.format
      redirect_to login_url, notice: 'Please log in' unless User.find_by(id: session[:user_id])
    else
      authenticate_or_request_with_http_basic do |username, password|
        user = User.find_by(name: username)
        user&.authenticate(password)
      end
    end
  end

  def set_i18n_locale_from_params
    return unless params[:locale]

    if I18n.available_locales.map(&:to_s).include?(params[:locale])
      I18n.locale = params[:locale]
    else
      flash.now[:notice] = "#{params[:locale]} translation not available"
      logger.error flash.now[:notice]
    end
  end
end
