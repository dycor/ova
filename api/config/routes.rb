Rails.application.routes.draw do
  resources :items
  resources :users
  resources :posts
  resources :tags
  resources :comments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'authenticate', to: 'authentication#authenticate'
  get 'posts/:id/comments', to: 'posts#get_comments'
  get 'users/:id/posts', to: 'users#get_posts'
  get 'search', to: 'posts#searchQuery'
end
