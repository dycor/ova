class Post < ApplicationRecord
	validates_presence_of :title, :content, :image
	#acts_as_taggable
	paginates_per 5

	has_many :comments
end