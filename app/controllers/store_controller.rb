# frozen_string_literal: true

class StoreController < ApplicationController
  include CurrentCart
  skip_before_action :authorize
  before_action :set_cart

  def index
    if params[:locale]
      redirect_to root_path(locale: params[:set_locale])
    else
      @products = Product.order(:title)
    end
  end
end
