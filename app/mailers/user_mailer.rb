class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.refer.subject
  #
  def refer(from, to_email, refer_link)
    @from_email = from.email
    @to_email = to_email
    @refer_link = refer_link

    mail to: to_email
  end
end
