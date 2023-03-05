class User < ApplicationRecord
  has_many :referred_users, class_name: 'User', foreign_key: 'referred_by_id'
  belongs_to :referred_by, class_name: 'User'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :api
end
