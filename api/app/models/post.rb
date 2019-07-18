class Post < ApplicationRecord
	validates_presence_of :title, :content, :image, :user_id
	#acts_as_taggable
	paginates_per 5

	has_many :comments
	belongs_to :user
end