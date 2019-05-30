class Post < ApplicationRecord
	validates_presence_of :title, :content, :image, :tags

end