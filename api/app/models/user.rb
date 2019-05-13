class User < ApplicationRecord
  validates_presence_of :name,:firstname,:email, :password ,:description
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  has_secure_password
end