module CurrentCart
  private

  def set_cart
    @cart = Cart.find(session[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    session[:cart_id] = @cart.id
  end

  def ensure_cart_isnt_empty
    if @cart.line_items.empty?
      redirect_to store_index_url, notice: 'Your cart is empty'
    end
  end
end