# frozen_string_literal: true

# class AdminController
class AdminController < ApplicationController
  def index
    @total_orders = Order.count
  end
end
