# frozen_string_literal: true

Rails.application.routes.draw do
  # gets
  get 'admin/index', to: 'admin#index'
  get 'up' => 'rails/health#show', as: :rails_health_check

  # controllers
  controller :sessions do
    get 'login', to: 'sessions#new'
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
  end

  # START_HIGHLIGHT
  resources :support_requests, only: %i[index update]
  # END_HIGHLIGHT

  resources :users
  resources :products do
    get :who_bought, on: :member
  end

  scope '(:locale)' do
    resources :orders
    resources :line_items
    resources :carts

    root 'store#index'
  end
end
