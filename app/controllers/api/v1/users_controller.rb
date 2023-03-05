# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :verify_authenticity_token, raise: false
      respond_to :json

      def refer
        send_email = UserMailer.refer(
          current_devise_api_user, refer_params[:refer_email],
          refer_params[:refer_link]
        ).deliver_now

        if send_email.message_id
          render json: { message: 'Email Sent Successfully' }, status: :ok
        else
          render json: { message: 'Email Not Sent' }, status: :unprocessable_entity
        end
      end

      private

      def refer_params
        params.permit(:refer_email, :refer_link)
      end
    end
  end
end
