require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "refer" do
    mail = UserMailer.refer
    assert_equal "Refer", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
