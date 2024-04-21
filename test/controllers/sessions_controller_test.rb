# frozen_string_literal: true

require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get login url' do
    get login_url
    assert_response :success
  end

  test 'should login' do
    post login_url, params: { name: 'Dave', password: 'secret' }, as: :json
    assert_redirected_to admin_index_path
    assert_match 'Welcome, Dave', flash[:notice]
  end

  test 'should logout' do
    delete logout_url
    assert_redirected_to root_url
    assert_match 'Logged out', flash[:notice]
  end
end
