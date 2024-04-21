# frozen_string_literal: true

module AuthenticationHelper
  def login_as(user)
    if respond_to? :visit
      visit login_url
      fill_in :name, with: user.name
      fill_in :password, with: 'secret'
      click_button 'Login'
      sleep 1
    else
      post login_url, params: { name: user.name, password: 'secret' }
    end
  end

  def logout
    delete logout_url
  end

  def setup
    login_as users(:one)
  end
end

module ActionDispatch
  class IntegrationTest
    include AuthenticationHelper
  end
end

module ActionDispatch
  class SystemTestCase
    include AuthenticationHelper
  end
end
