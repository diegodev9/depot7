# frozen_string_literal: true

class AddPriceToLineItems < ActiveRecord::Migration[7.1]
  def change
    add_column :line_items, :price, :float
  end
end
