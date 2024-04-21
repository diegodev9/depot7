# frozen_string_literal: true

require 'test_helper'

class SupportMailboxTest < ActionMailbox::TestCase
  test 'we create a SupportRequest when we get a support email' do
    mail_from = 'chris@somwhere.net'
    mail_subject = 'Need help'
    mail_body = "I can't figure out how to check out!!"

    receive_inbound_email_from_mail(
      to: 'support@example.com',
      from: mail_from,
      subject: mail_subject,
      body: mail_body
    )

    support_request = SupportRequest.last
    assert_equal mail_from, support_request.email
    assert_equal mail_subject, support_request.subject
    assert_equal mail_body, support_request.body
    assert_nil support_request.order
  end

  test 'we create a SupportRequest with the most recent order' do
    recent_order = orders(:one)
    orders(:another_one)
    orders(:other_customer)

    subject_email = 'Need help'
    body_email = "I can't figure out how to check out!!"

    receive_inbound_email_from_mail(
      to: 'support@example.com',
      from: recent_order.email,
      subject: subject_email,
      body: body_email
    )

    support_request = SupportRequest.last
    assert_equal recent_order.email, support_request.email
    assert_equal subject_email, support_request.subject
    assert_equal body_email, support_request.body
    assert_equal recent_order, support_request.order
  end
end
