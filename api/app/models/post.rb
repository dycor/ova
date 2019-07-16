class Post < ApplicationRecord
	validates_presence_of :title, :content, :image
	acts_as_taggable
	
	has_many :comments
end