class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]
  before_action :set_user, only: [:show]

  # GET /users
  def index
    @users = User.all

    render json: @users, status: :success #200
  end

  #GET /users/id
  def show

    render json: @user
  end

  #user /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :bad_request #400
    end
  end

  def set_user
    @user = User.find(params[:id])
  end


  def user_params
    params.permit(:name,:email, :password)
  end

end