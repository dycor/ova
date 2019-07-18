class PostsController < ApplicationController
	skip_before_action :authenticate_request, only: [:index, :show,:searchQuery, :get_comments]
	before_action :set_post, only: [:update, :destroy, :show, :get_comments]

	# GET /posts
	def index
		@posts = Post.page(params[:page]).per(params[:limit])

		render json: @posts, status: :success #200
	end

	# GET /search
	def searchQuery
		@posts = Post.search(params[:query])

		render json: @posts, status: :success #200
	end

	#GET /posts/id
	def show
		render json: @post
	end

	#POST /posts
	def create

		@post = Post.new(post_params)

		if @post.save
			render json: @post, status: :created, location: @post
		else
			render json: @post.errors, status: :bad_request #400
		end
	end


	#PATH / PUT / posts/:id
	def update
		if @post.update(post_params)
			render json: @post, status: :success
		else
			render json: @post.errors, status: :unprocessable_entity #422
		end
	end

	#DELETE /posts/:id

	def destroy
		@post.destroy
    end

	# GET /posts/:id/comments
	def get_comments
		render json: @post.comments
	end


    def set_post
		@post = Post.find(params[:id])
	end

    def post_params
		params.permit(:title, :content, :user_id)
	end
end
